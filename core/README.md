# Terra Core

JavaScript ESM backend using Express and Prisma.

## Structure

- `src/server.js`: environment setup, database startup check, HTTP listener and shutdown.
- `src/app.js`: middleware and router composition.
- `src/routes/`: versioned API registration.
- `src/modules/`: domain routers, controllers, services and repositories.
- `src/prisma/prisma.service.js`: shared Prisma client.
- `src/config/database.js`: health checks and fixed parameterized queries through Prisma.
- `src/common/events/`: domain events, audit and listeners.
- `tests/invariants/`: eight domain regression suites.
- `tests/runner.js`: HTTP smoke checks.
- `tests/router-contract.test.js`: operational endpoint and SSE regression checks.
- `prisma/`: schema and JavaScript seeders.

## Commands

Run these in `core/` (or with `npm --prefix core`):

```sh
npm install
npm run prisma:generate
npm run dev
npm start
npm run build
npm test
npm run test:invariants
npm run test:http
npm run db:test
npm run prisma:seed
```

The build command checks JavaScript syntax and local imports; no compilation is required.
See `.env.example` for connection configuration. A valid `DATABASE_URL` takes priority; otherwise the existing local `PG*` settings are used, including port 1000. Startup requires a successful database check.

See [CLEANUP.md](CLEANUP.md) for the cleanup boundaries and compatibility guarantees. Existing domain demo fallbacks remain; passing HTTP checks with degraded database health does not establish successful live persistence.
