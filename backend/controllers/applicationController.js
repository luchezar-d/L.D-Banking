import s3 from '../../utils/s3Client.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import Application from '../models/Application.js';
import { createSalesforceRecord } from '../../utils/salesforce.js';
import { runKycCheck } from '../../utils/kyc.js';
import { publishLoanEvent } from '../../utils/awsEventBridge.js';
import Honeybadger from '@honeybadger-io/js';

export const uploadKycDocument = async (req, res) => {
    // ...existing code from original file...
};

export const applyForProduct = async (req, res) => {
    // ...existing code from original file...
};

export const getAllApplications = async (req, res) => {
    // ...existing code from original file...
};

export const acceptOffer = async (req, res) => {
    // ...existing code from original file...
};

export const getApplicationById = async (req, res) => {
    // ...existing code from original file...
};

export const deleteApplication = async (req, res) => {
    // ...existing code from original file...
};

export const deleteAllApplications = async (req, res) => {
    // ...existing code from original file...
};
