import s3 from '../../utils/s3Client.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import Application from '../models/Application.js';
import { createSalesforceRecord } from '../../utils/salesforce.js';
import { runKycCheck } from '../../utils/kyc.js';
import { publishLoanEvent } from '../../utils/awsEventBridge.js';
import Honeybadger from '@honeybadger-io/js';

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
    const { fullName, email, city, postalCode, productType, amount } = req.body;
    if (!fullName || !email || !city || !postalCode || !productType || !amount) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const app = new Application({ fullName, email, city, postalCode, productType, amount });
    await app.save();
    res.status(201).json({ message: 'Application submitted!', app });
  } catch (err) {
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
    
};

export const deleteAllApplications = async (req, res) => {
    
};
