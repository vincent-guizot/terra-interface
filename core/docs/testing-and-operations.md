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

## Known contract gap

The universal-batch transition route currently passes an object to a service expecting separate newStatus and reason arguments. Track a focused code fix with an HTTP regression test; do not claim that route's happy path is covered by service-level invariant tests alone.
