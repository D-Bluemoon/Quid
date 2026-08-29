# Deploying Quid to Vercel (monorepo)

Repo layout:

```
Quid/
├── vercel.json       ← routes + services (required)
├── frontend/         ← Next.js 16
└── backend/          ← NestJS 11 + Prisma + PostgreSQL
```

## How routing works

| Public URL | Service | NestJS route (after `setGlobalPrefix('api')`) |
|------------|---------|-----------------------------------------------|
| `https://your-app.vercel.app/` | frontend (Next.js) | — |
| `https://your-app.vercel.app/api/auth/challenge` | backend (NestJS) | `GET /api/auth/challenge` |
| `https://your-app.vercel.app/api/users/me` | backend | `GET /api/users/me` |
| `https://your-app.vercel.app/api/health` | backend | `GET /api/health` |

`vercel.json` rewrites `/api/*` to the NestJS service; everything else goes to Next.js.

The frontend does **not** need `NEXT_PUBLIC_API_URL` on Vercel — the browser calls same-origin `/api/...` automatically.

## `vercel.json` (already in repo)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "frontend": {
      "root": "frontend",
      "framework": "nextjs"
    },
    "backend": {
      "root": "backend",
      "framework": "nestjs"
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": { "service": "backend" } },
    { "source": "/(.*)", "destination": { "service": "frontend" } }
  ]
}
```

After pushing, click **Refresh** in the Vercel import UI.

### Backend build (automatic)

Vercel detects `backend/src/main.ts` and runs:

- `npm install`
- `npm run build` → `prebuild` runs `prisma generate`, then `nest build` → `dist/main.js`
- Runtime: NestJS as a Vercel Function (Fluid compute)

You do **not** need a custom `startCommand` — Vercel uses `bootstrap()` in `main.ts`.

## Vercel environment variables

Set these on the **project** (both services share project env):

### Backend (required for API to work)

| Variable | Example | Notes |
|----------|---------|--------|
| `DATABASE_URL` | `postgresql://...` | Neon, Supabase, or Vercel Postgres |
| `JWT_SECRET` | long random string | Auth tokens |
| `STELLAR_SERVER_SECRET` | `S...` | SEP-10 server key |
| `HOME_DOMAIN` | `your-app.vercel.app` | Your Vercel hostname |
| `WEB_AUTH_DOMAIN` | `your-app.vercel.app` | Same as `HOME_DOMAIN` for SEP-10 |
| `STELLAR_NETWORK` | `Test SDF Network ; September 2015` | Testnet passphrase |

`PORT` is set by Vercel automatically — do not override.

### Frontend (optional)

| Variable | When to set |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | **Leave unset** on Vercel (uses `/api`) |
| `NEXT_PUBLIC_HORIZON_URL` | Stellar testnet/mainnet |
| `NEXT_PUBLIC_QUID_STORE_ID` | After contract deploy |

### Database migrations

Run once after first deploy (from your machine or CI):

```bash
cd backend
DATABASE_URL="your-production-url" npm run prisma:migrate:deploy
```

Or connect Neon/Supabase and run migrations from their SQL console using Prisma migrate.

## Local development

### Frontend only (no backend)

Remove or comment out `NEXT_PUBLIC_API_URL` in `frontend/.env`. Onboarding saves roles locally; dashboards work with mock data.

### Full stack locally

```bash
# Terminal 1 — backend (port 3001)
cd backend
cp .env.example .env   # edit DATABASE_URL, JWT_SECRET, Stellar keys
npm install
npm run prisma:migrate
npm run start:dev

# Terminal 2 — frontend (port 3000)
cd frontend
# frontend/.env:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api
npm install
npm run dev
```

Backend routes are under `/api` (e.g. `http://localhost:3001/api/health`).

### Local with Vercel CLI (matches production routing)

Requires Vercel CLI **≥ 48.4.0**:

```bash
npm i -g vercel
cd Quid
vercel dev
```

## Troubleshooting

### “Failed to fetch” on account type (local)

- Backend not running → start `backend` with `npm run start:dev`, **or** remove `NEXT_PUBLIC_API_URL` for frontend-only mode.
- Wrong API URL → must be `http://localhost:3001/api` (includes `/api` prefix).

The app falls back to local role storage if the API is unreachable, so you can still click **Continue**.

### Vercel build fails on backend

- Check `DATABASE_URL` is set (needed for `prisma generate` in some setups).
- Check build logs for Prisma / Nest compile errors.

### SEP-10 auth fails in production

- `HOME_DOMAIN` and `WEB_AUTH_DOMAIN` must match your live hostname (no `https://` prefix).
- `STELLAR_SERVER_SECRET` must be a valid Stellar secret key.

### `@nestjs/schedule` cron jobs

Scheduled tasks in NestJS may not run reliably on serverless. Prefer Vercel Cron hitting an HTTP route for production cron.

## Why not deploy backend elsewhere?

NestJS + PostgreSQL + Prisma works on Vercel Services, but long-running jobs and heavy DB pooling are easier on Railway/Render. For Quid MVP, Vercel Services keeps one domain and simpler routing.
