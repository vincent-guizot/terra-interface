# Core documentation

Core runs Express with JavaScript ES modules and Prisma. Use this index with the repository-wide [setup guide](../../docs/getting-started.md).

- [Architecture](../../docs/core-architecture.md)
- [Mounted REST route inventory](../../docs/api-contracts.md)
- [Response envelope contract](api-response-contract.md)
- [Machine-readable response schema](api-response.schema.json)
- [Database and demo seeders](database-and-seeding.md)
- [Testing and operations](testing-and-operations.md)
- [Cultivation implementation](cultivation-spec.md)
- [Prisma models and relationships](../../docs/database-erd.md)

The response schema covers the envelope, not request validation or every domain payload. Health responses, SSE snapshots and the audit export have specific formats. No Swagger UI or authentication layer is currently mounted in app.js.
