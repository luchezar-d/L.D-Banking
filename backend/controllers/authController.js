import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, isAdmin: user.isAdmin });
};

export const register = async (req, res) => {
  if (!req.user || !req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  const { email, password, isAdmin } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const user = new User({ email, password, isAdmin: !!isAdmin });
    await user.save();
    res.status(201).json({ message: 'User created', user: { email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
