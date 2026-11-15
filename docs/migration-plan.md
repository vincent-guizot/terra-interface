# Migration status and branch workflow

## Completed architecture changes

- Console runs as a Vite React JavaScript SPA with React Router.
- Core runs as an Express JavaScript ES-module application with Prisma.
- Redux and routing are grouped under console/src/app/.
- Static Console data and reusable helpers are grouped by purpose.
- Core constants, per-table JSON seeders and REST response envelopes are separated and documented.

These structural changes do not establish that every domain is persisted, every request is validated, or physical hardware is connected. See [remaining work](implementation-roadmap.md).

## Starting new work

Fetch origin first and verify git status. For a new task, create a focused branch from origin/development. Reusing integrations is safe when it has no unique work and can be fast-forwarded to origin/development:

```sh
git fetch origin
git switch integrations
git merge --ff-only origin/development
```

If fast-forward fails, inspect the unique commits before choosing merge or rebase. Do not reset away other work or force-push a shared branch. Keep the PR focused on its own delta, even when its history contains earlier merged commits. Commit with the repository's configured Git identity.

## Delivery

1. Update the affected documentation together with behavior or dependency changes.
2. Refresh the root workspace lockfile; refresh package-level locks for standalone installs when relevant.
3. Run applicable source, contract and build checks.
4. Push the task branch and open a PR into development.
5. Validate the combined development state before opening a release PR into main.

A PR into main does not deploy the application by itself unless hosting automation is configured separately. Reverting code does not automatically revert database migrations or seeded records; plan database rollback independently.
