import multer from 'multer';
import path from 'node:path';
import fs from 'fs-extra';
import { config } from '../config.js';

const allowed = {
  profile: ['image/jpeg', 'image/png', 'image/webp'],
  project: ['image/jpeg', 'image/png', 'image/webp'],
  resume: ['application/pdf']
};

export function uploader(type) {
  const folder = type === 'project' ? 'projects' : type;
  const destination = path.join(config.uploadDir, folder);

  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      await fs.ensureDir(destination);
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${type}-${Date.now()}${ext}`);
    }
  });

  return multer({
    storage,
    limits: { fileSize: type === 'resume' ? 10 * 1024 * 1024 : 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (!allowed[type].includes(file.mimetype)) {
        return cb(new Error('Invalid file type'));
      }
      cb(null, true);
    }
  });
}
