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
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT ? Number(process.env.PORT) : 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
