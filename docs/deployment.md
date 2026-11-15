# Build and deployment

This guide describes how the current applications fit together. No deployment provider or automatic release workflow is configured by these documentation changes.

## Build artifacts and processes

```sh
npm ci
npm run prisma:generate --workspace terra-core
npm run build:core
npm run build:console
```

Core's build checks source files; it does not emit a dist server. Start the backend from its source with npm start --workspace terra-core, using a process supervisor appropriate to the host. The server checks database connectivity before app.listen and exits with status 1 if that check fails.

Console's static artifact is console/dist/. Configure VITE_API_BASE_URL for the environment before building because its value is included in the bundle. npm run start:console launches Vite preview for local inspection; it is not the production deployment process.

## Routing

Serve Console assets from the static host and route non-file browser paths back to index.html. Keep /api routes out of the SPA fallback. If frontend and API share an origin, configure the reverse proxy so /api reaches Core. If they use separate origins, set the public API URL at build time and configure Core's production CORS_ORIGIN accordingly.

Telemetry uses long-lived text/event-stream responses. Configure proxy buffering and connection timeouts to permit streaming. The Express app trusts one proxy hop; verify that this matches the actual proxy chain before relying on forwarded client addresses for rate limiting.

## Database rollout

The schema is in core/prisma/schema.prisma; no migration history is currently checked in. Establish and review migrations and a baseline strategy before applying schema changes to an existing database. The presence of a prisma:migrate script alone is not a reviewed production migration process.

The db:setup script generates Prisma Client, runs prisma db push and loads demo seed data. It is a development initialization tool, not a production rollout command. The seed command inserts demo records explicitly and does not clean them up afterward.

## Verification and rollback

After startup, inspect GET /api/health: 200 means healthy, while 503 means degraded database health. Confirm an actual database-backed read and write in an isolated environment, not only a fixture-backed dashboard. Confirm direct navigation to a nested Console route and that telemetry streams remain open through the proxy.

Store credentials outside browser configuration and version control. The app currently has no mounted authentication middleware; define access control before exposing operational write endpoints externally.

Keep the previous frontend artifact and backend revision available for rollback. Reverting code does not reverse schema/data changes. Plan backup/restore and compatible database changes separately. The in-memory event bus and domain fallback state are lost on process restart.
