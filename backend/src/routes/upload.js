import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { uploader } from '../middleware/upload.js';

const router = Router();

for (const type of ['profile', 'project', 'resume']) {
  router.post(`/${type}`, requireAuth, uploader(type).single('file'), (req, res) => {
    const folder = type === 'project' ? 'projects' : type;
    res.json({
      success: true,
      filePath: `/uploads/${folder}/${req.file.filename}`
    });
  });
}

export default router;
