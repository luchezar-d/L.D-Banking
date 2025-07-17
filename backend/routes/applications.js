
import express from 'express';
import { applyForProduct, getAllApplications, acceptOffer, getApplicationById, deleteApplication, deleteAllApplications, uploadKycDocument } from '../controllers/applicationController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// @copilot debug: Add fallback test route
router.get('/ping', (req, res) => {
  console.log('GET /api/ping route hit');
  res.json({ message: 'pong' });
});

router.post('/apply', applyForProduct);
router.get('/applications', getAllApplications);
router.delete('/applications/:id', deleteApplication);
router.delete('/applications', deleteAllApplications);
router.post('/offer/:id/accept', acceptOffer);
router.post('/offer/:id/upload', upload.single('kycDocument'), uploadKycDocument);
router.get('/applications/:id', getApplicationById);

export default router;
