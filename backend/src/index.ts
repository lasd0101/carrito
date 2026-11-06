import { env } from './config/env.js';
import { initDb } from './db/connection.js';
import { buildApp } from './app.js';

async function main() {
  await initDb();
  buildApp().listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

main().catch((e) => { console.error('[fatal]', e); process.exit(1); });