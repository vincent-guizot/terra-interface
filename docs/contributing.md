# Contributing and branch workflow

## Start from current development

Fetch the repository and check for local changes before switching branches. Create a branch for the actual task from origin/development. Reuse integrations only when its existing commits are understood; a large historical commit count does not imply those commits will all appear in the next PR.

```sh
git fetch origin
git status --short --branch
git rev-list --left-right --count origin/development...integrations
```

The first count is commits only on development; the second is commits only on integrations. If integrations contains no unique work, it can be fast-forwarded from origin/development. If both counts are nonzero, inspect the commits before merging or rebasing. Do not overwrite local work or force-push a shared branch without coordinating.

Use the configured Git identity. Keep each PR scoped to the task and target development; promote tested development changes to main through a separate release PR.

## Where changes belong

| Change | Location |
| --- | --- |
| Application bootstrap, Redux and routing | console/src/app/ |
| Shared UI primitives | console/src/components/ui/ |
| Domain page/drawer behavior | console/src/features/ |
| Static frontend fixtures/options | console/src/data/ grouped by domain |
| Shared frontend functions | console/src/helpers/ |
| API routes and domain services | core/src/modules/ and route mounting files |
| Backend constants | core/src/constants/ |
| Database schema/demo data | core/prisma/ |
| Cross-application setup, architecture and operating guides | docs/ at repository root |
| Backend-specific contracts and operational detail | core/docs/ |

## Dependency changes

Update the relevant package.json intentionally. The root package-lock.json locks the workspaces; package-level locks support standalone installs. Refresh only the affected locks without running database seed/setup commands as a side effect. Verify manifest/lock agreement with npm ci --dry-run --ignore-scripts. A dry run is a resolution check, not a full clean-install execution.

## Verification

Run the narrow checks needed for the change. The available checks are:

```sh
npm run lint
npm run build:core
npm run build:console
npm test --workspace terra-console
npm test --workspace terra-core
```

The root test script covers Core only, so run the Console tests separately. For docs-only changes, check relative links, code fences, referenced file paths, current commands and configuration values; rerun runtime checks only when the change or an unresolved concern warrants them.

For API changes, update the response contract and route inventory and add a relevant behavior test. For schema changes, establish reviewed migrations and verify against a separate database. Do not treat mocked data or a fallback response as proof of successful persistence.

## Pull request description

Use Summary, Perubahan, Validasi and Catatan sections. State what changed, list only checks that actually ran, and identify material limitations. Keep secrets, live database credentials and unsupported claims out of descriptions.
