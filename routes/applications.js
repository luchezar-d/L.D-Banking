import express from 'express';
import { applyForProduct, getAllApplications, acceptOffer, getApplicationById } from '../controllers/applicationController.js';
import multer from 'multer';
import { uploadKycDocument } from '../controllers/applicationController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/apply', applyForProduct);
router.get('/applications', getAllApplications);
router.post('/offer/:id/accept', acceptOffer);
router.post('/offer/:id/upload', upload.single('kycDocument'), uploadKycDocument);
router.get('/applications/:id', getApplicationById);

export default router;
