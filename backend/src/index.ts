import express from 'express';
import { env } from './config/env.js';

const app = express();
const port = env.port;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`API en http://localhost:${port}`);
});