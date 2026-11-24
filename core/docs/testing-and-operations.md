# Testing and operations

Run commands from the repository root.

| Command | Scope |
| --- | --- |
| npm run build:core | JavaScript syntax and local import checks |
| npm run test:invariants --workspace terra-core | Eight domain invariant suites |
| npm run test:seeders --workspace terra-core | Fixture coverage, reuse and simulated rollback |
| npm run test:http --workspace terra-core | HTTP smoke, response contract and router/SSE checks |
| npm test --workspace terra-core | All Core suites above |
| npm run db:test --workspace terra-core | Configured database connection check |

HTTP tests may use mocked services or accept degraded health. They do not certify persisted writes against a real PostgreSQL server. Run database checks against an isolated test database before claiming full integration verification.

## Health and failures

GET /api/health and GET /health expose monitoring fields. Healthy is 200; failed database health is 503. A fixture-backed domain response can still return 200 while the database is unavailable. Unexpected errors return a generic failure envelope; inspect server logs for the underlying error rather than exposing exception details to clients.

Check DATABASE_URL or the PG variables if authentication fails. Check CORS_ORIGIN and VITE_API_BASE_URL for frontend connection problems. CORS is an origin policy, not authentication.

## Streaming and deployment

Telemetry streams use text/event-stream snapshots, not the REST envelope. Ensure proxies permit long-lived connections and avoid response buffering. The in-process event bus and memory fallbacks reset with the Node process; they are not a persistent queue or durable database replacement.

app.js currently trusts one proxy hop. Review proxy topology before external hosting. Configure TLS, process lifecycle, database backups, secrets and access control for the actual environment. The current application does not mount authentication middleware. Build and test success alone is not a deployment security review.

## Batch transition coverage

The HTTP contract suite exercises the transition route with a mock Prisma client. To test real persistence, provision a disposable local database named terra_interface_test. Set DATABASE_URL for migrate deploy and TERRA_TEST_DATABASE_URL for the test to the same dedicated local database. From the repository root:

```sh
npx prisma migrate deploy --schema core/prisma/schema.prisma
node --test core/tests/batch-persistence.test.js
```

The opt-in test uses PostgreSQL directly and starts two independent Core app processes. It checks persisted status, status history and audit logs after restart and that a rejected transition adds no log rows. The test adds temporary constraints to force failures while saving a stock movement and a harvest audit entry. It verifies rollback and retries the same harvest request. The database user needs permission to alter these test tables. It removes its batch fixture afterward and skips when TERRA_TEST_DATABASE_URL is unset. Core may initialize its default AI recommendations in the disposable database on startup.
