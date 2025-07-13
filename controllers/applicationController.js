import Application from '../models/Application.js';
import { sendOfferEmail } from '../utils/email.js';
import { createSalesforceRecord } from '../utils/salesforce.js';
import { runKycCheck } from '../utils/kyc.js';
import { publishLoanEvent } from '../utils/awsEventBridge.js';
import Honeybadger from '@honeybadger-io/js';

export const applyForProduct = async (req, res) => {
    try {
        // Validate required fields
        const requiredFields = ['fullName', 'email', 'city', 'postalCode', 'productType', 'amount'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `Missing required field: ${field}` });
            }
        }

        // Always set status to "Offer Made" on creation
        const app = new Application({
            ...req.body,
            status: "Offer Made"
        });
        await app.save();

        // Call Salesforce & email logic
        await createSalesforceRecord(app);
        await sendOfferEmail(app);

        // Publish event to AWS EventBridge with full payload
        await publishLoanEvent("LoanOfferMade", {
            applicationId: app._id,
            ...app.toObject() // spread all fields (fullName, email, city, etc)
        });

        // Generate the offer URL
        const offerUrl = `http://localhost:5173/offer/${app._id}`;

        res.json({ 
            message: '✅ Application saved & processing started', 
            app,
            offerUrl
        });
    } catch (err) {
        console.error(err);
        Honeybadger.notify(err, {
            context: {
                endpoint: '/api/apply',
                body: req.body,
            }
        });
        res.status(500).json({ error: '❌ Failed to process application' });
    }
};

export const getAllApplications = async (req, res) => {
    try {
        const apps = await Application.find();
        res.json(apps);
    } catch (err) {
        console.error(err);
        Honeybadger.notify(err, {
            context: {
                endpoint: '/api/applications',
                body: req.body,
                query: req.query,
                params: req.params,
            }
        });
        res.status(500).json({ error: '❌ Failed to fetch applications' });
    }
};

export const acceptOffer = async (req, res) => {
    try {
        const appId = req.params.id;
        const app = await Application.findById(appId);

        if (!app) {
            return res.status(404).json({ error: '❌ Application not found' });
        }

        const kyc = await runKycCheck(app);
        app.kycResult = kyc.status;

        if (kyc.status === 'approved') {
            app.status = 'KYC Approved';
            await createSalesforceRecord({ ...app.toObject(), stage: 'KYC Approved' });
        } else {
            app.status = 'Rejected';
            await createSalesforceRecord({ ...app.toObject(), stage: 'Rejected' });
        }

        await app.save();

        res.json({
            message: `✅ KYC completed: ${kyc.status}`,
            app
        });
    } catch (err) {
        console.error(err);
        Honeybadger.notify(err, {
            context: {
                endpoint: '/api/offer/:id/accept',
                appId: req.params.id,
                body: req.body,
                query: req.query,
                params: req.params,
            }
        });
        res.status(500).json({ error: '❌ Failed to process KYC' });
    }
};

export const getApplicationById = async (req, res) => {
    try {
        const app = await Application.findById(req.params.id);
        if (!app) return res.status(404).json({ error: 'Application not found' });
        res.json(app);
    } catch (err) {
        console.error(err);
        Honeybadger.notify(err, {
            context: {
                endpoint: '/api/applications/:id',
                appId: req.params.id,
                body: req.body,
                query: req.query,
                params: req.params,
            }
        });
        res.status(500).json({ error: 'Failed to fetch application' });
    }
};
