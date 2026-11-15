# Implementation roadmap

## Current foundation

Vite React Console, Express JavaScript Core, Prisma schema, domain constants, shared UI primitives, per-table demo seeders and REST envelope contracts are present. For the actual mounted endpoints see [API contracts](api-contracts.md).

## Remaining work and acceptance criteria

| Area | Next work | Evidence needed before calling it complete |
| --- | --- | --- |
| Persistence | Identify constant-backed/in-memory reads and writes and implement durable behavior per domain | Integration tests against PostgreSQL, including restart persistence and failed-write rollback |
| Migrations | Establish a reviewed Prisma migration history; none is currently checked in | Fresh-database setup and an explicit baseline plan for existing databases |
| Request contracts | Define and validate domain payloads in JavaScript | Negative tests for missing fields, invalid enums, bounds and malformed values |
| Batch operations | Resolve the transition handler/service signature mismatch | HTTP test proving a legal transition succeeds and illegal transitions fail |
| Inventory | Reconcile memory fallbacks, cached balances and persisted movements | Tests comparing balances to movement totals, including repeated requests and concurrency |
| Events | Decide delivery/retry requirements | Tests for duplicate events, subscriber failures and process restarts if durability is required |
| Console | Verify operational drawers, data-source indicators and remaining MUI views | Browser checks for loading, empty, failure and persisted-success states |
| Access control | Define authentication and authorization requirements before external exposure | Permission and rejection tests for protected operations |
| Deployment | Configure SPA fallback, Core process, secrets and database migrations | Clean install/build, health checks and documented rollback on the target environment |

## Routine verification

Use [local setup and checks](getting-started.md). Source checks and mocked test results are scoped evidence. A degraded health response and a working fixture-backed dashboard do not establish production readiness. Keep outstanding issues visible rather than upgrading a design requirement to an implemented guarantee.
