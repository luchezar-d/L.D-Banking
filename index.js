import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import applicationRoutes from './backend/routes/applications.js';
import authRoutes from './backend/routes/auth.js';
import cors from 'cors';
import Honeybadger from '@honeybadger-io/js';
dotenv.config();

Honeybadger.configure({
  apiKey: process.env.HONEYBADGER_API_KEY,
  environment: process.env.NODE_ENV || 'development',
});

const app = express();
app.use(Honeybadger.requestHandler);
app.use(express.json());
app.use(cors());

app.use('/api', applicationRoutes);
app.use('/api/auth', authRoutes);

// Serve static frontend build
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'my-banking-frontend/dist')));

app.get('*', (req, res) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'my-banking-frontend/dist/index.html'));
  }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use(Honeybadger.errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
