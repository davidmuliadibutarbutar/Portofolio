import { cp, copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(scriptDir, '../../backend/uploads');
const destination = path.resolve(scriptDir, '../dist/uploads');
const dataSource = path.resolve(scriptDir, '../../backend/data');
const dataDestination = path.resolve(scriptDir, '../dist/data');
const publicCollections = [
  'profile',
  'projects',
  'experience',
  'skills',
  'education',
  'publications',
  'certifications',
  'languages'
];

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
await mkdir(dataDestination, { recursive: true });
await Promise.all(
  publicCollections.map((name) =>
    copyFile(
      path.join(dataSource, `${name}.json`),
      path.join(dataDestination, `${name}.json`)
    )
  )
);

console.log('Copied portfolio data and uploads into the frontend build.');
