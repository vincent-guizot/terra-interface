# Inventory ledger

## Current implementation

core/src/modules/inventory/inventory.service.js uses Prisma when available and keeps canonical in-memory items, locations and movements as fallbacks. Some operations query memory directly. Data returned during a database failure is therefore not evidence that records were persisted.

The principal persistence models are InventoryItem, StockMovement and StorageLocation; StockTx also remains in the schema. Read the exact fields in [the schema reference](database-erd.md).

## Routes

The mounted /api/v1/inventory router exposes summary, items, locations and movements. Item detail is GET /items/:id. Movement listing supports itemId/limit through its controller. The old proposed /balances and /items/:id/ledger paths are not the current route contract.

## Quantities and audit

Prisma-backed item listing derives displayed stock from the sum of movements.quantityDelta. Services also maintain InventoryItem.inStock and in-memory quantities. These are distinct representations and require consistency checks; this implementation must not be described as a fully immutable or double-entry accounting ledger.

Movement types and domain events drive signed changes. Review recordMovement and the caller for sign handling, available-stock checks and transactional behavior before extending operations. Do not edit history or apply a second balance update merely because a repeated request arrives.

## Verification

The circular/inventory and event-bus invariant suites cover selected calculations and coordination. Real PostgreSQL tests for rollback, concurrent updates, repeated requests and persistence after restart remain necessary for stronger guarantees.
