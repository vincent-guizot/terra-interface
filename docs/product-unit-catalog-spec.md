# Product and unit catalog

## Source of truth

ProductCategory, ProductDefinition, MeasurementUnit, UnitConversion, CustomFieldDefinition and CustomFieldValue are defined in core/prisma/schema.prisma. See [database reference](database-erd.md) for current names and relationships.

CatalogService reads Prisma records and may return built-in fallback categories/products when reads fail or return no records. STANDARD_UNITS is defined in core/src/constants/catalog.constants.js. The application is therefore not entirely database-configured.

## Public routes

/api/v1/catalog exposes GET /, GET /units, GET /products, POST /products and POST /units/convert. Top-level /api/v1/products and /api/v1/units are read aliases. Category-related service methods alone do not establish that category CRUD routes are exposed.

Unit conversion is handled by CatalogService.convertUnit. Inspect that method for its actual supported conversions and density requirements; mathematical conversion possibilities do not imply all pairs are implemented. Add regression cases for dimensional mismatch, unsupported units and invalid quantities when changing conversion behavior.

## Seed data

Per-table JSON fixtures provide demo categories, products, units and custom fields. They use reference keys to relate records and are validated before insertion. They are sample data rather than a production product catalog. See [database and seeding](../core/docs/database-and-seeding.md).
