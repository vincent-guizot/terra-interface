# Database and demo seeders

## Connection

src/prisma/prisma.service.js exports the shared Prisma client and databaseUrl. DATABASE_URL takes precedence; PGHOST, PGPORT, PGDATABASE, PGUSER and PGPASSWORD provide the fallback. The default fallback port is 1000; Docker Compose uses 5432. Never publish real connection strings in logs, docs or PRs.

From the repository root:

```sh
npm run prisma:generate --workspace terra-core
npm run prisma:migrate --workspace terra-core
npm run db:test --workspace terra-core
```

migrate dev is a development command. The repository currently has no checked-in prisma/migrations/ history. On a new development database this command creates migration files; review and commit them in a dedicated database change. Existing databases need an explicit baseline/migration plan before deployment. A successful source check does not validate database migration compatibility.

## Fixture layout

- prisma/data/: one JSON fixture per model.
- prisma/seeders/tables/: one seeder per Prisma delegate.
- registry.js: explicit dependency order for all 37 tables.
- seed-table.js: identity, reference resolution, record creation/reuse.
- run-seeders.js: validation and transactional orchestration.
- seed.js: CLI entry point.

The demo dataset contains 82 records. Each fixture record has a key, demo: true, data, and optionally match. References use {"$ref":{"table":"zone","key":"Z-01"}} and resolve against records already seeded. Metadata fields are not inserted as model columns.

```sh
npm run prisma:seed:check --workspace terra-core
npm run test:seeders --workspace terra-core
```

The check validates model coverage, required scalar fields, types, enum/date values and reference order without writing to a database. Tests use a simulated database, including reruns and transaction rollback.

## Explicit demo insertion

```sh
npm run prisma:seed --workspace terra-core
```

The npm command supplies --demo; direct CLI invocation requires that flag to write. The runner validates first, then executes all table seeders within a transaction with a 60-second timeout. It creates missing records and reuses records matched by match or deterministic ID; it does not overwrite edited records or reset existing balances. Matching depends on the fixture's natural-key criteria, so review match changes before rerunning.

There is no automatic removal or production-data conversion step. Demo records must not be treated as observed transactions or telemetry. Check the destination database before invoking db:setup as well, because that script performs initialization and demo seeding.
