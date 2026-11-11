import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import requireAuth from '../middleware/auth.js';

const router = Router();
const createToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
const validPhone = (phone) => /^\+?[0-9\s()-]{7,30}$/.test(phone || '');

router.post('/register', async (request, response, next) => {
  try {
    const { name, email, password, phone, role } = request.body;
    if (!name?.trim() || !email?.trim() || !password || !phone || !role) {
      return response.status(400).json({ message: 'Please complete all required fields.' });
    }
    if (name.trim().length < 2 || password.length < 8 || !validPhone(phone) || !['Doctor', 'Patient'].includes(role)) {
      return response.status(400).json({ message: 'Check your name, phone, role, and password requirements.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) return response.status(409).json({ message: 'An account with this email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: hashedPassword, phone: phone.trim(), role });
    return response.status(201).json({ authtoken: createToken(user.id) });
  } catch (error) {
    if (error.code === 11000) return response.status(409).json({ message: 'An account with this email already exists.' });
    return next(error);
  }
});

router.post('/login', async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email?.trim() || !password) return response.status(400).json({ message: 'Email and password are required.' });
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return response.status(401).json({ message: 'Email or password is incorrect.' });
    }
    return response.json({
      authtoken: createToken(user.id),
      userName: user.name,
      user: { name: user.name, email: user.email, phone: user.phone, role: user.role },
    });
  } catch (error) {
    return next(error);
  }
});

router.put('/user', requireAuth, async (request, response, next) => {
  try {
    const { name, phone } = request.body;
    if (!name?.trim() || name.trim().length < 2 || !validPhone(phone)) {
      return response.status(400).json({ message: 'Enter a valid name and phone number.' });
    }
    const user = await User.findByIdAndUpdate(
      request.userId,
      { $set: { name: name.trim(), phone: phone.trim() } },
      { new: true, runValidators: true, select: '-password' },
    );
    if (!user) return response.status(404).json({ message: 'User account not found.' });
    return response.json({ user: { name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (error) {
    return next(error);
  }
});

export default router;