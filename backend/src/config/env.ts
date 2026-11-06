import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function optional(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim() !== '' ? value : fallback;
}

export const env = {
  port: Number(optional('PORT', '3001')),
  apiKey: process.env.API_KEY ?? '',
  secretKey: process.env.SECRET_KEY ?? '',
  databaseUrl: required('DATABASE_URL'),
};

if (Number.isNaN(env.port)) {
  throw new Error(`PORT must be a number, got: ${process.env.PORT}`);
}