import { Router } from 'express';
import { read, write } from '../services/jsonDB.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  res.json(await read('profile'));
});

router.put('/', requireAuth, async (req, res) => {
  const payload = req.body || {};
  if (!payload.name || !payload.email) return res.status(400).json({ message: 'Name and email are required' });
  res.json(await write('profile', payload));
});

export default router;
