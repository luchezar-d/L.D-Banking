import s3 from '../../utils/s3Client.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import Application from '../models/Application.js';
import { createSalesforceRecord } from '../../utils/salesforce.js';
import { runKycCheck } from '../../utils/kyc.js';
import { publishLoanEvent } from '../../utils/awsEventBridge.js';
import Honeybadger from '@honeybadger-io/js';
import axios from 'axios';

export const uploadKycDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { nationality, isPublicFigure, additionalInfo } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    
    const fileName = `kyc/${id}/${Date.now()}_${req.file.originalname}`;
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    await s3.send(new PutObjectCommand(uploadParams));
    const kycDocumentUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    
    const app = await Application.findByIdAndUpdate(
      id,
      {
        kycDocumentUrl,
        nationality,
        isPublicFigure,
        additionalInfo,
        kycResult: 'pending',
      },
      { new: true }
    );
    if (!app) {
      return res.status(404).json({ error: 'Application not found.' });
    }
    res.json({ message: 'KYC document uploaded.', app });
  } catch (err) {
    Honeybadger.notify(err);
    res.status(500).json({ error: 'Failed to upload KYC document.' });
  }
};

export const applyForProduct = async (req, res) => {
  try {
    const { productType, loanUUID, account, contact, loan } = req.body;
    
    // Validate required top-level fields
    if (!productType || !loanUUID) {
      return res.status(400).json({ error: 'Product type and loan UUID are required.' });
    }
    
    // Validate required nested fields
    if (!account || !account.uuid || !account.name || !account.type || !account.industry) {
      return res.status(400).json({ error: 'Complete account information is required (uuid, name, type, industry).' });
    }
    if (!contact || !contact.uuid || !contact.firstName || !contact.lastName || !contact.email) {
      return res.status(400).json({ error: 'Complete contact information is required (uuid, firstName, lastName, email).' });
    }
    if (!loan || !loan.amount || !loan.termMonths || !loan.interestRate || !loan.purpose) {
      return res.status(400).json({ error: 'Complete loan information is required (amount, termMonths, interestRate, purpose).' });
    }
    
    // Create and save application to MongoDB
    const app = new Application({ productType, loanUUID, account, contact, loan });
    await app.save();
    console.log("✅ Application saved to MongoDB:", app._id);
    
    // Create event payload for EventBridge (existing flow) - COMMENTED OUT to avoid conflicts
    // Since we're now using direct Lambda calls, EventBridge publishing can cause conflicts
    /*
    const eventPayload = {
      applicationId: app._id,
      loanUUID: app.loanUUID,
      companyName: app.account.name,
      companyType: app.account.type,
      industry: app.account.industry,
      firstName: app.contact.firstName,
      lastName: app.contact.lastName,
      email: app.contact.email,
      productType: app.productType,
      loanAmount: app.loan.amount,
      termMonths: app.loan.termMonths,
      interestRate: app.loan.interestRate,
      purpose: app.loan.purpose,
      status: app.status || 'Offer Made',
      createdAt: app.createdAt,
    };
    
    // Publish to EventBridge (existing flow)
    try {
      const result = await publishLoanEvent('LoanOfferMade', eventPayload);
      console.log("✅ Event published to EventBridge:", JSON.stringify(result));
    } catch (eventErr) {
      Honeybadger.notify(eventErr);
      console.error("❌ Error publishing event to EventBridge:", eventErr);
    }
    */
    
    // NEW: Forward structured payload directly to AWS Lambda
    const lambdaPayload = {
      productType: app.productType,
      loanUUID: app.loanUUID,
      account: app.account,
      contact: app.contact,
      loan: app.loan
    };
    
    try {
      console.log("🚀 Forwarding to AWS Lambda:", JSON.stringify(lambdaPayload));
      const lambdaResponse = await axios.post(
        'https://k3vah56dgk.execute-api.eu-west-1.amazonaws.com/prod/handleLoanEvents',
        lambdaPayload,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 15000 // Increased timeout to 15 seconds
        }
      );
      
      // Update application with successful sync status
      const responseData = lambdaResponse.data;
      
      // Check if the response indicates success with the NEW Salesforce API format
      const salesforceResponse = responseData.salesforceResponse;
      const isSuccess = salesforceResponse?.success;
      const records = salesforceResponse?.records || [];
      
      if (isSuccess && records.length === 3) {
        // Complete success - all 3 records (Account, Contact, Opportunity) created
        const accountRecord = records.find(r => r.objectType === 'Account');
        const contactRecord = records.find(r => r.objectType === 'Contact');
        const opportunityRecord = records.find(r => r.objectType === 'Opportunity');
        
        await Application.findByIdAndUpdate(app._id, {
          salesforceSyncStatus: 'success',
          salesforceSyncedAt: new Date()
        });
        console.log("✅ Complete Salesforce sync success:", {
          account: accountRecord?.recordId,
          contact: contactRecord?.recordId,
          opportunity: opportunityRecord?.recordId
        });
        
      } else {
        // Partial success or failure
        await Application.findByIdAndUpdate(app._id, {
          salesforceSyncStatus: 'failed', 
          salesforceSyncError: `Sync issue: success=${isSuccess}, recordCount=${records.length}, expected=3`
        });
        console.log("⚠️ Salesforce sync issue:", {
          success: isSuccess,
          recordCount: records.length,
          records: records
        });
      }
      
      console.log("✅ AWS Lambda response:", JSON.stringify(lambdaResponse.data));
      
    } catch (lambdaErr) {
      // Enhanced error logging
      console.error("❌ AWS Lambda Error Details:");
      console.error("- Status:", lambdaErr.response?.status);
      console.error("- Status Text:", lambdaErr.response?.statusText);
      console.error("- Response Data:", JSON.stringify(lambdaErr.response?.data));
      console.error("- Request Config:", JSON.stringify({
        url: lambdaErr.config?.url,
        method: lambdaErr.config?.method,
        timeout: lambdaErr.config?.timeout
      }));
      console.error("- Error Message:", lambdaErr.message);
      
      // Update application with failed sync status and detailed error
      const errorDetails = {
        status: lambdaErr.response?.status,
        statusText: lambdaErr.response?.statusText,
        message: lambdaErr.message,
        responseData: lambdaErr.response?.data
      };
      
      await Application.findByIdAndUpdate(app._id, {
        salesforceSyncStatus: 'failed',
        salesforceSyncError: JSON.stringify(errorDetails)
      });
      
      Honeybadger.notify(lambdaErr, {
        context: {
          applicationId: app._id,
          lambdaPayload: lambdaPayload,
          errorDetails: errorDetails
        }
      });
      
      // Don't fail the entire request if Lambda fails - data is still saved to MongoDB
      console.log("⚠️ Lambda sync failed, but application was saved to MongoDB");
    }
    
    res.status(201).json({ 
      message: 'Application submitted successfully!', 
      app: app,
      salesforceSyncStatus: app.salesforceSyncStatus 
    });
    
  } catch (err) {
    console.error("❌ Error saving application:", err);
    Honeybadger.notify(err);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
};

import mongoose from 'mongoose';

export const getAllApplications = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ error: 'Database not connected' });
  }
  try {
    const apps = await Application.find();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};
export const ping = (req, res) => {
  res.json({ message: 'pong' });
};

export const acceptOffer = async (req, res) => {
  try {
    const { id } = req.params;
    
    const app = await Application.findByIdAndUpdate(
      id,
      { status: 'Offer Accepted', kycResult: 'pending' },
      { new: true }
    );
    if (!app) {
      return res.status(404).json({ error: 'Application not found.' });
    }
    
    res.json({ message: 'Offer accepted.', app });
  } catch (err) {
    Honeybadger.notify(err);
    res.status(500).json({ error: 'Failed to accept offer.' });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch application' });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Application.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Application not found.' });
    }
    res.json({ message: 'Application deleted.' });
  } catch (err) {
    Honeybadger.notify(err);
    res.status(500).json({ error: 'Failed to delete application.' });
  }
};

export const deleteAllApplications = async (req, res) => {
  try {
    await Application.deleteMany({});
    res.json({ message: 'All applications deleted.' });
  } catch (err) {
    Honeybadger.notify(err);
    res.status(500).json({ error: 'Failed to delete all applications.' });
  }
};
