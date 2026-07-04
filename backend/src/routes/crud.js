import { Router } from 'express';
import { create, findById, read, remove, update } from '../services/jsonDB.js';
import { requireAuth } from '../middleware/auth.js';

const requiredFields = {
  projects: ['title', 'description'],
  experience: ['company', 'position'],
  skills: ['name', 'category'],
  education: ['institution', 'degree'],
  publications: ['title'],
  certifications: ['name'],
  languages: ['name', 'level']
};

export function crudRouter(collection) {
  const router = Router();

  router.get('/', async (req, res) => {
    res.json(await read(collection));
  });

  router.get('/:id', async (req, res) => {
    const item = await findById(collection, req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  });

  router.post('/', requireAuth, async (req, res) => {
    const missing = (requiredFields[collection] || []).filter((field) => !req.body?.[field]);
    if (missing.length) return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
    res.status(201).json(await create(collection, req.body));
  });

  router.put('/:id', requireAuth, async (req, res) => {
    const item = await update(collection, req.params.id, req.body || {});
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  });

  router.delete('/:id', requireAuth, async (req, res) => {
    const deleted = await remove(collection, req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.status(204).end();
  });

  return router;
}
