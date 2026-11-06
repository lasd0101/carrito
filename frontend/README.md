# Catálogo con sistema de recompensas

Mini e-commerce con catálogo de productos y filtros. Los usuarios acumulan puntos al interactuar con la tienda.

## Stack

| Capa | Tecnología |
|---|---|
| Backend | Node.js + Express 5 + TypeScript |
| Persistencia | PostgreSQL (`pg`) |
| Validación | Zod |
| Frontend | React 18 + Vite + TypeScript |
| Estilos | Tailwind CSS v4 |

## Requisitos previos

- Node.js 20+
- PostgreSQL 14+ corriendo localmente
- Una base de datos creada: `createdb carrito`
- Correr schema.sql que está en `backend/src/db/schema.sql`

## Ejecución

### Backend

```bash
cd backend
npm install
cp .env.example .env               
npm run dev

cd frontend
npm install
npm run dev 