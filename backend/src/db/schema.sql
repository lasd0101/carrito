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

