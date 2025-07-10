import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import applicationRoutes from './routes/applications.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', applicationRoutes);  // 🚀 THIS LINE wires /api

app.get('/', (req, res) => {
    res.send('✅ Banking API is running!');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
