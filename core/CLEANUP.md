# Core source layout

Core is JavaScript ESM. `src/server.js` starts the server; `src/app.js` configures Express without opening a port. All repositories and domain services use the singleton Prisma client in `src/prisma/prisma.service.js`. The remaining fixed SQL queries bind parameters through Prisma; there is no separate `pg` pool.

The previous Nest module/controller/filter/interceptor files and unused DTOs were removed after checking application, test and seed entry points. The active cultivation recipes remain in `pest-control.recipes.js`. Existing domain calculations, event listeners, gateway ingestion and legacy API paths remain available alongside the newer summary routes. The modern and compatibility routes share domain service instances, including the telemetry SSE source.

Tests live in `tests/`:

- `npm run test:invariants`: eight domain invariant suites.
- `npm run test:http`: Express health, error and endpoint smoke checks.
- `npm test`: both groups.
- `npm run build`: JavaScript syntax and local import validation; no transpilation.
- `npm run prisma:generate`: generate the Prisma client before using a clean installation.
- `npm run prisma:seed`: seed through JavaScript modules.

Set `DATABASE_URL`, or configure the existing `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, and `PGDATABASE` variables for the local connection. The existing startup policy still requires a successful database connection. Domain demo fallbacks already present in the project remain in place; smoke checks against degraded health are not proof of live database operations.
