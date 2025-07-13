import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    productType: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Applied' },
    kycResult: { type: String },
    kycDocumentUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);
