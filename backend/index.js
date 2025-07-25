import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {/* Connected to MongoDB */})
  .catch(() => {/* MongoDB connection error */});

const PORT = process.env.PORT ? Number(process.env.PORT) : 5001;
app.listen(PORT, () => {
  /* Server running */
});

mongoose.connection.on('connected', () => {
  /* MongoDB connection established */
});
mongoose.connection.on('error', () => {
  /* MongoDB connection error */
});
