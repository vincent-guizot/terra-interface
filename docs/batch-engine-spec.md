# Universal batch engine

## Implemented boundaries

Two routers coexist: /api/v1/batches provides the simpler batch reads, while /api/v1/universal-batches exposes the richer lifecycle API. Do not interchange their paths or payloads.

The universal service uses the Prisma Batch model and includes domain details, events, outputs, status history and audit logs in its reads. create() initializes a batch as ACTIVE and records an initial PLANNED-to-ACTIVE status history entry; it does not start as DRAFT.

## Allowed transitions

Defined in core/src/constants/universal-batch.constants.js:

| Current state | Allowed targets |
| --- | --- |
| DRAFT | PLANNED, CANCELLED |
| PLANNED | ACTIVE, CANCELLED |
| ACTIVE | ON_HOLD, COMPLETED, CANCELLED |
| ON_HOLD | ACTIVE, CANCELLED |
| COMPLETED | None |
| CANCELLED | None |

The service rejects illegal transitions with a bad-request exception. ON_HOLD and CANCELLED require a reason. Do not assume additional health-score or harvest prerequisites unless the service explicitly checks them.

## Routes

- GET /api/v1/universal-batches: optional domain/status filtering.
- GET /api/v1/universal-batches/:id: batch detail.
- POST /api/v1/universal-batches: create an ACTIVE batch.
- PATCH /api/v1/universal-batches/:id/transition: lifecycle route.
- POST /api/v1/universal-batches/:id/events: append an event.
- POST /api/v1/universal-batches/:id/outputs: record output.

Send JSON such as `{"newStatus":"ON_HOLD","reason":"Inspect pump"}`. The route requires a valid `newStatus` and a non-blank `reason` for `ON_HOLD` or `CANCELLED`. Successful transitions return HTTP 200 with the updated batch in `data`.

Batch activation/output code coordinates stock movements and cached quantities in service transactions. Refer to the actual service and [inventory behavior](inventory-ledger-spec.md) when assessing atomicity. Mock invariant tests verify selected business rules; they are not proof of live database behavior.
