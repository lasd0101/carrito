import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { productsRouter } from './modules/products.js';
import { usersRouter } from './modules/users.js';
import { rewardsRouter } from './modules/rewards.js';
import { healthRouter } from './routes/health.js';

export function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/api', healthRouter);
  app.use('/api', productsRouter);
  app.use('/api', usersRouter);
  app.use('/api', rewardsRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}