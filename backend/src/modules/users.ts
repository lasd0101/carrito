import { Router } from 'express';
import { pool } from '../db/connection.js';
import { NotFoundError } from '../errors/AppError.js';

export const usersRouter = Router();
const DEMO_USER_ID = 'u1';

usersRouter.get('/users/me', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name, points FROM users WHERE id = $1',
    [DEMO_USER_ID],
  );
  if (!rows[0]) throw NotFoundError('User not exists.');
  res.json({ data: rows[0] });
});