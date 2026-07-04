import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { read, write } from '../services/jsonDB.js';
import { config } from '../config.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false
});

function sign(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
}

router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

  const users = await read('users');
  const user = users.find((item) => item.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    token: sign(user),
    user: { id: user.id, username: user.username, role: user.role }
  });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

router.post('/refresh', requireAuth, (req, res) => {
  res.json({ token: sign(req.user) });
});

router.put('/change-password', requireAuth, async (req, res) => {
  const { password } = req.body || {};
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters' });
  }

  const users = await read('users');
  const index = users.findIndex((item) => item.id === req.user.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index] = {
    ...users[index],
    password: await bcrypt.hash(password, 10),
    updatedAt: new Date().toISOString()
  };
  await write('users', users);

  res.json({ message: 'Password changed successfully' });
});

export default router;
