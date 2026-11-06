CREATE TABLE IF NOT EXISTS products (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  price       NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  category    TEXT NOT NULL,
  image_url   TEXT NOT NULL,
  stock       INTEGER NOT NULL CHECK (stock >= 0)
);

CREATE TABLE IF NOT EXISTS users (
  id      TEXT PRIMARY KEY,
  name    TEXT NOT NULL,
  points  INTEGER NOT NULL DEFAULT 0 CHECK (points >= 0)
);

CREATE TABLE IF NOT EXISTS reward_events (
  id              TEXT PRIMARY KEY,
  user_id         TEXT NOT NULL REFERENCES users(id),
  action          TEXT NOT NULL,
  product_id      TEXT REFERENCES products(id),
  order_id        TEXT,
  points          INTEGER NOT NULL,
  idempotency_key TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, idempotency_key)
);

INSERT INTO products (id, name, price, category, image_url, stock) VALUES
  ('p1',  'Auriculares Bluetooth',   59000, 'tecnología', 'https://picsum.photos/seed/p1/400',  12),
  ('p2',  'Teclado Mecánico',        89000, 'tecnología', 'https://picsum.photos/seed/p2/400',   8),
  ('p3',  'Monitor 27"',            249000, 'tecnología', 'https://picsum.photos/seed/p3/400',   5),
  ('p4',  'Clean Code',              32500, 'libros',       'https://picsum.photos/seed/p4/400',  20),
  ('p5',  'The Pragmatic Programmer',39900, 'libros',       'https://picsum.photos/seed/p5/400',  15),
  ('p6',  'Camiseta Dev',            19990, 'ropa',    'https://picsum.photos/seed/p6/400',  30),
  ('p7',  'Hoodie Node',             49000, 'ropa',    'https://picsum.photos/seed/p7/400',  10),
  ('p8',  'Lámpara de escritorio',   24900, 'hogar',        'https://picsum.photos/seed/p8/400',  18),
  ('p9',  'Taza Programmer',         12000, 'hogar',        'https://picsum.photos/seed/p9/400',  40),
  ('p10', 'Mouse Inalámbrico',       34990, 'tecnología', 'https://picsum.photos/seed/p10/400', 22),
  ('p11', 'Refactoring',             42000, 'libros',       'https://picsum.photos/seed/p11/400',  7),
  ('p12', 'Sudadera TypeScript',     55000, 'ropa',    'https://picsum.photos/seed/p12/400',  9);

  INSERT INTO users (id, name, points) VALUES
  ('u1', 'user test', 0);