# TripIt — Full-Stack PostgreSQL

This project keeps the TripIt frontend and adds a Prisma/PostgreSQL backend. Docker is not required.

## 1. Requirements

- Node.js 20+
- PostgreSQL 14+
- npm

## 2. Create the database

Create a PostgreSQL database named `tripit` using pgAdmin or psql:

```sql
CREATE DATABASE tripit;
```

## 3. Configure environment

Copy `.env.example` to `.env` and replace `YOUR_POSTGRES_PASSWORD` with your local PostgreSQL password.

Example:

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/tripit?schema=public"
AUTH_SECRET="tripit-local-development-secret-change-this"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

If your PostgreSQL username, password, port, or database name differs, update the connection string accordingly.

## 4. Install and initialize

Run these commands from the `tripit_work` directory:

```powershell
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Open http://localhost:3000.

## Demo account

Email: `demo@tripit.local`

Password: `TripIt123!`

## Useful commands

```powershell
npm run lint
npm run build
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:reset
```

## Deployment

For Vercel, create a hosted PostgreSQL database such as Neon and set `DATABASE_URL`, `AUTH_SECRET`, and `NEXT_PUBLIC_APP_URL` in the Vercel project environment variables. Run Prisma migrations against the deployment database before using the app.

## Important

This is a demo travel platform. Flight prices and demo payments are not real-time airline pricing or real payment processing.


## Reliable local PostgreSQL setup

This version uses PostgreSQL directly; Docker is not required. If you have an old/partial `tripit` database from an earlier attempt, run the reset command once.

1. Create PostgreSQL database `tripit` and create `.env` from `.env.example`.
2. Install dependencies: `npm install`
3. Generate Prisma client: `npx prisma generate`
4. For a clean local database: `npm run db:reset`
   - This recreates the schema with `prisma db push --force-reset` and then seeds demo data.
5. Start: `npm run dev`

For a database you want to preserve, use `npm run db:setup` instead of `db:reset`.

Demo account: `demo@tripit.local` / `TripIt123!`

If a page says `Request failed`, check the terminal running `npm run dev`; API errors now return a useful message instead of the generic message.
