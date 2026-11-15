# Environment and configuration

Run commands from the repository root unless a section says otherwise. Copy the checked-in .env.example files; do not copy secrets into documentation or commit a real .env file.

## Core

core/src/config/env.js loads core/.env relative to its own location, rather than depending on the shell's working directory.

| Variable | Default | Effect |
| --- | --- | --- |
| NODE_ENV | development | Production logging and CORS behavior when set to production |
| PORT | 4000 | HTTP listener port |
| DATABASE_URL | Empty | Preferred PostgreSQL URL used by the Prisma singleton |
| PGHOST | localhost | Host for the URL built when DATABASE_URL is absent |
| PGPORT | 1000 | Local fallback port; differs from Docker's 5432 |
| PGDATABASE | terra_interface | Local fallback database |
| PGUSER | postgres | Local fallback username |
| PGPASSWORD | Empty | Local fallback password |
| CORS_ORIGIN | http://localhost:5173,http://localhost:3000 | Comma-separated browser origins |
| API_PREFIX | /api/v1 | Currently read into config but not used to relocate route mounting |

The Express mount remains /api/v1 regardless of API_PREFIX. In development, the CORS callback permits all origins. In production it checks the configured origins and also accepts requests without an Origin header. CORS is not authentication.

Prisma CLI commands such as prisma:migrate read DATABASE_URL from their environment/.env, not the PG fallback assembled by the application. Set DATABASE_URL in core/.env when using these commands. The db:setup script explicitly forwards the resolved application databaseUrl to its child commands.

## Console

Vite reads console/.env and mode-specific environment files. Variables exposed through VITE_ are embedded in browser code and must never contain credentials.

| Setting | Current use |
| --- | --- |
| VITE_API_BASE_URL | Primary API base for the shared API client; example http://localhost:4000/api/v1 |
| VITE_API_URL | Compatibility alias used when the primary base is absent |
| VITE_DEMO_MODE | The exact string true enables demo mode in the shared client |
| VITE_HOMESTEAD_ID | Included in the example file; not currently consumed by src/ |
| VITE_APP_TITLE | Included in the example file; not currently consumed by src/ |

The API client also recognizes older NEXT_PUBLIC_API_URL and NEXT_PUBLIC_DEMO_MODE names for compatibility. New Vite configuration should use VITE_ names. Restart the dev server or rebuild the static bundle after changing browser configuration.

## Ports and proxy

console/vite.config.js explicitly sets the dev port to 3000. Vite's generic 5173 default is not this project's configured port; it can choose another available port if 3000 is occupied, so check startup output. Its dev proxy forwards /api to localhost:4000. An absolute VITE_API_BASE_URL accesses Core directly instead of using that proxy.

The proxy is a development feature and is not included in console/dist/. Production hosting must route API traffic or use an explicit reachable API URL. See [deployment](deployment.md).
