# Documentation

This index describes the JavaScript implementation after the Console/Core refactor. Product design documents describe intended homestead behavior; they are not evidence of deployed hardware or persisted data.

## Start here

- [Local setup and checks](getting-started.md)
- [Environment and configuration](configuration.md)
- [Build and deployment](deployment.md)
- [Contributing and verification](contributing.md)
- [System architecture](architecture-overview.md)
- [Console architecture](console-architecture.md)
- [Core architecture](core-architecture.md)
- [API contracts and route inventory](api-contracts.md)
- [Database model and relationships](database-erd.md)
- [Migration status and branch workflow](migration-plan.md)
- [Remaining work](implementation-roadmap.md)

## Domain references

- [Canonical homestead design](canonical-homestead-model.md)
- [Batch engine](batch-engine-spec.md)
- [Inventory ledger](inventory-ledger-spec.md)
- [Product and unit catalog](product-unit-catalog-spec.md)
- [Resource flow design](resource-flow-spec.md)
- [Core operational documentation](../core/docs/README.md)

Runtime source, route handlers and the Prisma schema take precedence when a design differs from implementation. Update the relevant document in the same PR as a behavior change.
