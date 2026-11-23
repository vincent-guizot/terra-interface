# Core architecture

Core is an Express JavaScript ES-module modular backend using Prisma and PostgreSQL.

```text
core/
  src/
    app.js
    server.js
    routes/v1/index.js
    modules/
    constants/
    common/events/
    config/
    controllers/
    middlewares/
    prisma/prisma.service.js
    utils/response.js
  prisma/
    schema.prisma
    data/
    seeders/
      tables/
      registry.js
      run-seeders.js
      seed-table.js
      seed.js
  scripts/
  tests/
  docs/
```

## Request flow

app.js configures Helmet, CORS, JSON parsing, logging and API rate limiting, then mounts routes and the final not-found/error handlers. server.js owns listening. Domain routers delegate to controllers or services; repository modules exist for some domains, not every domain.

The actual mount is /api/v1 in routes/index.js. API_PREFIX exists in environment configuration but does not currently change that mount. Do not assume setting it relocates the API.

## Contracts and validation

src/utils/response.js formats successful and failed REST responses. DTO classes and TypeScript decorators are no longer required by this runtime. JavaScript alone does not validate incoming data: current validation lives in individual handlers/services and must be checked per endpoint. The JSON Schema describes the response envelope, not all domain input/output payloads.

No authentication middleware or Swagger UI is mounted by the current application. Avoid treating documented 401/403 conventions as implemented access control. See [API contracts](api-contracts.md) and [Core response contract](../core/docs/api-response-contract.md).

## State and events

The Prisma singleton resolves DATABASE_URL or local PG variables. Domain services may also use canonical fixtures and in-memory fallbacks. The resource service currently serves constant-backed data rather than a persisted resource-flow ledger. The event bus and listeners execute in this Node process and do not provide durable delivery.

Keep domain constants in src/constants/, and keep reference fixtures distinct from actual persisted transaction state. Per-table JSON seeders are explicit demo tooling; they are not production initialization data.

## Operations and checks

See [Core setup](../core/docs/README.md), [database and seeding](../core/docs/database-and-seeding.md), and [testing and troubleshooting](../core/docs/testing-and-operations.md). The build script checks source syntax/imports and does not compile TypeScript.
