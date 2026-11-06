import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { pool } from '../db/connection.js';
import { ConflictError, NotFoundError } from '../errors/AppError.js';
import { REWARD_ACTIONS, pointsFor } from './rewards.rules.js';

export const rewardsRouter = Router();
const DEMO_USER_ID = 'u1';

const rewardBody = z.object({
  action: z.enum(REWARD_ACTIONS),
  productId: z.string().min(1),
});

rewardsRouter.post('/rewards', async (req, res) => {
  const { action, productId } = rewardBody.parse(req.body);

  const product = await pool.query('SELECT id FROM products WHERE id = $1', [productId]);
  if (!product.rows[0]) throw NotFoundError('Product not found');

  const points = pointsFor(action);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    try {
      await client.query(
        'INSERT INTO reward_events (id, user_id, action, product_id, points) VALUES ($1,$2,$3,$4,$5)',
        [randomUUID(), DEMO_USER_ID, action, productId, points],
      );
    } catch (err: any) {
      if (err.code === '23505') {
        throw ConflictError(`Reward for ${action} on this product already claimed`);
      }
      throw err;
    }
    await client.query(
      'UPDATE users SET points = points + $1 WHERE id = $2',
      [points, DEMO_USER_ID],
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }

  const { rows } = await pool.query(
    'SELECT id, name, points FROM users WHERE id = $1',
    [DEMO_USER_ID],
  );
  res.status(201).json({ data: { pointsAwarded: points, user: rows[0] } });
});