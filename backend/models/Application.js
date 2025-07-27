// Moved from root models/Application.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    // Product and Loan UUID
    productType: { type: String, required: true, enum: ['Loan', 'Flash Credit', 'Credit Card'] },
    loanUUID: { type: String, required: true, unique: true },
    
    // Account Information with UUID
    account: {
        uuid: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true, enum: ['Customer', 'Partner', 'Prospect'] },
        industry: { type: String, required: true }
    },
    
    // Contact Information with UUID
    contact: {
        uuid: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true }
    },
    
    // Loan Information
    loan: {
        amount: { type: Number, required: true },
        termMonths: { type: Number, required: true },
        interestRate: { type: Number, required: true },
        purpose: { type: String, required: true }
    },
    
    // Application Status and Metadata
    status: { type: String, default: 'Applied' },
    kycResult: { type: String },
    kycDocumentUrl: { type: String },
    nationality: { type: String },
    isPublicFigure: { type: Boolean },
    additionalInfo: { type: String },
    
    // Salesforce Sync Status
    salesforceSyncStatus: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    salesforceSyncError: { type: String },
    salesforceSyncedAt: { type: Date },
    
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);
