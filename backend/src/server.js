import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import uploadRoutes from './routes/upload.js';
import { crudRouter } from './routes/crud.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(__dirname, '../../frontend/dist');

await fs.ensureDir(config.dataDir);
await fs.ensureDir(config.uploadDir);

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(config.uploadDir));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/upload', uploadRoutes);

for (const collection of ['projects', 'experience', 'skills', 'education', 'publications', 'certifications', 'languages']) {
  app.use(`/api/${collection}`, crudRouter(collection));
}

if (await fs.pathExists(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`Portfolio API running at http://localhost:${config.port}/api`);
  });
}

export default app;
