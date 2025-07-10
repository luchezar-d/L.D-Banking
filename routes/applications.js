import express from 'express';
import { applyForProduct, getAllApplications, acceptOffer, getApplicationById } from '../controllers/applicationController.js';


const router = express.Router();

router.post('/apply', (req, res, next) => {
    console.log('🔥 POST /api/apply hit!');
    return applyForProduct(req, res, next);
});

router.get('/applications', (req, res, next) => {
    console.log('🔥 GET /api/applications hit!');
    return getAllApplications(req, res, next);
});

router.post('/offer/:id/accept', (req, res, next) => {
    console.log(`🔥 POST /api/offer/${req.params.id}/accept hit!`);
    return acceptOffer(req, res, next);
});

router.get('/applications/:id', getApplicationById);

export default router;
