import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    city: String,
    postalCode: String,
    productType: String, // Loan, Flash Credit, Credit Card
    status: { type: String, default: 'Applied' },
    kycResult: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);
