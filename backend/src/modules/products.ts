import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db/connection.js';

export const productsRouter = Router();

const listQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  category: z.string().optional(),
  q: z.string().optional(),
});

productsRouter.get('/products', async (req, res) => {
  const { page, limit, category, q } = listQuery.parse(req.query);
  const offset = (page - 1) * limit;

  const clauses: string[] = [];
  const params: unknown[] = [];
  if (category) { params.push(category); clauses.push(`category = $${params.length}`); }
  if (q)        { params.push(`%${q}%`);   clauses.push(`name ILIKE $${params.length}`); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';

  const { rows } = await pool.query(
    `SELECT id, name, price, category, image_url AS image, stock
     FROM products ${where}
     ORDER BY name
     LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset],
  );

  const countRes = await pool.query<{ n: string }>(
    `SELECT COUNT(*)::int AS n FROM products ${where}`,
    params,
  );
  const total = parseInt(countRes.rows[0].n, 10);

  res.json({
    data: rows,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

productsRouter.get('/categories', async (_req, res) => {
  const { rows } = await pool.query<{ category: string }>(
    'SELECT DISTINCT category FROM products ORDER BY category',
  );
  res.json({ data: rows.map(r => r.category) });
});