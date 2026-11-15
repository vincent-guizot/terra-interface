# Demo seed data

Each Prisma table has one JSON file and one matching module in `../seeders/tables/`. Every record is explicitly marked `demo: true`; the demo flag is seed metadata, not a database column. These values are synthetic examples, including historical records and telemetry. Do not treat them as live farm measurements.

Records contain a stable `key`, scalar `data`, and optionally a `match` for reusing records created by the previous seeders. Foreign keys use `{ "$ref": { "table": "zone", "key": "Z-01" } }`. The registry resolves references in dependency order using actual saved IDs.

`npm run prisma:seed:check` validates table coverage, required scalar fields, enum values and references without connecting to a database. `npm run prisma:seed` writes the full demo dataset in one transaction. Existing records are reused and are not reset or overwritten. Seed reruns do not duplicate transaction/history rows. Each demo ledger type has its own representation; never add legacy `StockTx` and `StockMovement` balances together.

Use these seeders only for development/demo initialization. The seed command requires `--demo` to make that choice explicit.
