import fs from 'fs-extra';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { config } from '../config.js';

const fileFor = (collection) => path.join(config.dataDir, `${collection}.json`);

export async function ensureCollection(collection, fallback = []) {
  await fs.ensureDir(config.dataDir);
  const file = fileFor(collection);
  if (!(await fs.pathExists(file))) {
    await fs.writeJson(file, fallback, { spaces: 2 });
  }
}

export async function read(collection) {
  await ensureCollection(collection);
  return fs.readJson(fileFor(collection));
}

export async function write(collection, data) {
  await fs.ensureDir(config.dataDir);
  await fs.writeJson(fileFor(collection), data, { spaces: 2 });
  return data;
}

export async function findById(collection, id) {
  const data = await read(collection);
  return Array.isArray(data) ? data.find((item) => item.id === id || item.slug === id) : null;
}

export async function create(collection, payload) {
  const data = await read(collection);
  const item = {
    id: payload.id || randomUUID(),
    ...payload,
    createdAt: payload.createdAt || new Date().toISOString()
  };
  data.unshift(item);
  await write(collection, data);
  return item;
}

export async function update(collection, id, payload) {
  const data = await read(collection);
  const index = data.findIndex((item) => item.id === id || item.slug === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...payload, id: data[index].id, updatedAt: new Date().toISOString() };
  await write(collection, data);
  return data[index];
}

export async function remove(collection, id) {
  const data = await read(collection);
  const next = data.filter((item) => item.id !== id && item.slug !== id);
  if (next.length === data.length) return false;
  await write(collection, next);
  return true;
}
