import { Pool } from 'pg';
import fs from 'node:fs';
import { env } from '../config/env.js';

export const pool = new Pool({ connectionString: env.databaseUrl });

export async function initDb(): Promise<void> {
  const schema = fs.readFileSync(
    new URL('./schema.sql', import.meta.url),
    'utf8',
  );
  await pool.query(schema);
  console.log('[db] PostgreSQL schema ready');
}

export async function closeDb(): Promise<void> {
  await pool.end();
}