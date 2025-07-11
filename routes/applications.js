import express from 'express';
import { applyForProduct, getAllApplications, acceptOffer, getApplicationById } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/apply', applyForProduct);
router.get('/applications', getAllApplications);
router.post('/offer/:id/accept', acceptOffer);
router.get('/applications/:id', getApplicationById);

export default router;
