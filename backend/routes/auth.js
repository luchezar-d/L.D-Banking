import express from 'express';
import { login, register } from '../controllers/authController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', verifyToken, register);

export default router;
