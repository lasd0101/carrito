import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { healthRouter } from './routes/health.js';

export function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/api', healthRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
