# Terra Interface

Personal Home Operating System for managing homestead production, resource flows, inventory and telemetry. Vincent's Farm is the canonical 300 m² design used by the reference data and demo fixtures.

## Stack and structure

The repository is an npm workspace with two JavaScript applications:

```text
terra-interface/
  console/
    src/
      app/          # Startup, providers, Redux, routing and store
      components/   # Shared UI, layouts and visualizations
      features/     # Domain pages and operational drawers
      data/         # Static reference data and options by domain
      helpers/      # Reusable functions
      hooks/
      services/
    tests/
  core/
    src/
      app.js        # Configured Express application
      server.js     # Database check and HTTP listener
      routes/
      modules/
      constants/
      common/events/
      prisma/
      middlewares/
    prisma/
      schema.prisma
      data/         # Explicit demo JSON per model
      seeders/      # Per-table seeders and transaction runner
    tests/
    docs/
  docs/             # Cross-application architecture and operating guides
  package.json
  package-lock.json
  docker-compose.yml
```

Console uses Vite, React, React Router, Redux Toolkit and TanStack Query. Shared UI primitives use Radix/shadcn-style components and Tailwind; existing feature views also use MUI/Emotion. Core uses Express, Prisma and PostgreSQL with REST and SSE endpoints. Redis is available in Compose but is not currently required by the backend.

## Getting started

Use a maintained Node.js release compatible with the installed packages and npm with workspace support. From the repository root:

```sh
npm ci
npm run prisma:generate --workspace terra-core
```

Copy console/.env.example to console/.env and core/.env.example to core/.env. Configure the database explicitly: the local PG fallback uses port 1000, while Docker Compose exposes PostgreSQL at 5432. See [the setup guide](docs/getting-started.md) before initializing a database or inserting demo data.

Run the applications in separate terminals:

```sh
npm run dev:core
npm run dev:console
```

Console is configured for http://localhost:3000; Core defaults to http://localhost:4000. Core's server entry point checks database connectivity before listening and exits if that check fails. GET /api/health is the monitoring endpoint after startup.

## Checks

```sh
npm run lint
npm run build:core
npm run build:console
npm test --workspace terra-console
npm test --workspace terra-core
```

The root npm test runs Core tests only. Core build checks JavaScript syntax/imports; Console build produces console/dist/. Test suites cover invariants, seed data, HTTP contracts and selected UI/client behavior. Mock and fallback tests do not prove live PostgreSQL persistence or installed device behavior.

## Documentation

Start with [docs/README.md](docs/README.md):

- [Architecture overview](docs/architecture-overview.md)
- [Local setup](docs/getting-started.md) and [environment variables](docs/configuration.md)
- [API routes and contracts](docs/api-contracts.md)
- [Database reference](docs/database-erd.md)
- [Deployment](docs/deployment.md) and [contributing](docs/contributing.md)
- [Core documentation](core/docs/README.md)
- [Known gaps and roadmap](docs/implementation-roadmap.md)

Domain services currently mix Prisma persistence, canonical data and in-memory behavior. Review the relevant service before treating a successful response as a durable write. The current app does not mount Swagger UI or authentication middleware. The universal-batch transition route has a documented argument mismatch, and there is no checked-in Prisma migration history. See the roadmap for the required follow-up work.

The homestead dimensions and ecological targets in the design documents are reference specifications, not independently verified construction or live telemetry.

Developed by Vincent Guizot.
