import Application from '../models/Application.js';
import { sendOfferEmail } from '../utils/email.js';
import { createSalesforceRecord } from '../utils/salesforce.js';
import { runKycCheck } from '../utils/kyc.js';

export const applyForProduct = async (req, res) => {
    try {
        const app = new Application(req.body);
        await app.save();

        await createSalesforceRecord(app);
        await sendOfferEmail(app);

        // Generate the offer URL
        const offerUrl = `http://localhost:5173/offer/${app._id}`;

        res.json({ 
            message: '✅ Application saved & processing started', 
            app,
            offerUrl
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '❌ Failed to process application' });
    }
};

export const getAllApplications = async (req, res) => {
    try {
        const apps = await Application.find();
        res.json(apps);
    } catch (err) {
        console.error(err);
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
        res.status(500).json({ error: 'Failed to fetch application' });
    }
};

