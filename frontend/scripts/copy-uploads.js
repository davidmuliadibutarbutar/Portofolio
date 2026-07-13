import { cp, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(scriptDir, '../../backend/uploads');
const destination = path.resolve(scriptDir, '../dist/uploads');

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });

console.log('Copied portfolio uploads into the frontend build.');
