# Local setup and verification

## Prerequisites

Use a maintained Node.js version supported by the installed Vite and Prisma versions, npm with workspace support, and PostgreSQL for persistent operations. Run the commands below from the repository root.

```sh
npm ci
npm run prisma:generate --workspace terra-core
```

The root lockfile resolves both npm workspaces. The package-level lockfiles support standalone installs inside console/ or core/; refresh them when their respective manifests change. Do not mix root and standalone installation strategies within the same dependency installation.

See [configuration](configuration.md) for the exact defaults and Prisma CLI environment behavior.

Copy console/.env.example to console/.env and core/.env.example to core/.env. Keep real credentials outside version control.

## Database configuration

Core prefers DATABASE_URL. Otherwise it builds a PostgreSQL URL from PGHOST, PGPORT, PGDATABASE, PGUSER and PGPASSWORD. The fallback port is 1000, whereas docker-compose.yml exposes PostgreSQL at 5432. Configure the connection explicitly when using Docker:

```sh
docker compose up -d postgres
```

For that local Docker service, use DATABASE_URL=postgresql://terra:terra_secret@localhost:5432/terra_interface in core/.env. These are development credentials from docker-compose.yml; replace them for other environments. Redis is included in Compose, but Core does not currently require a Redis client.

```sh
npm run prisma:migrate --workspace terra-core
npm run prisma:seed:check --workspace terra-core
```

Migrations modify the configured database. Review the destination and migration changes before running them. Demo seeding is optional and writes sample records:

```sh
npm run prisma:seed --workspace terra-core
```

See [Core database and seeding](../core/docs/database-and-seeding.md). Do not run demo seeding against production data.

## Run the applications

Use separate terminals:

```sh
npm run dev:core
npm run dev:console
```

Core defaults to http://localhost:4000. Console is configured for http://localhost:3000 in vite.config.js. Set VITE_API_BASE_URL=http://localhost:4000/api/v1 and include the actual frontend origin in Core's CORS_ORIGIN. Restart the frontend after changing VITE_ variables; they are public build-time configuration, never secrets.

The server entry point checks the database before listening and exits if it cannot connect. After successful startup, GET /api/health reports 200 for a healthy database or 503 for degraded health. Some domain services return canonical or in-memory data when persistence is unavailable; a successful dashboard request alone does not prove database connectivity.

## Checks

```sh
npm run lint
npm run build:console
npm run build:core
npm test --workspace terra-console
npm test --workspace terra-core
```

Core build checks JavaScript syntax and local imports; it does not emit a compiled server bundle. Core tests include invariant, seeder and HTTP/contract tests. Mock-based tests and degraded-health smoke checks do not replace real database integration tests. Vite preview is a local preview server; production hosting needs an SPA history fallback and separately running Core.
