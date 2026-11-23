# API contracts and mounted routes

The current Express app mounts /api/v1. No Swagger UI is mounted at /api/docs. This inventory lists declared routes from the router source; it does not claim every database operation or input payload has been validated end to end.

## Response contract

See [the canonical response contract](../core/docs/api-response-contract.md) and [JSON Schema](../core/docs/api-response.schema.json). Successful JSON responses contain success, message, data and timestamp, with optional meta. Errors contain success: false, a nested error object (code, message, statusCode, details), and timestamp. HTTP 204 has no JSON body. No universal pagination metadata is implied.

Health endpoints /api/health and /health use monitoring fields. Telemetry SSE returns text/event-stream snapshots. /api/v1/intelligence/audit exports audit JSON directly. The Console client unwraps data and exposes structured ApiError fields.

## Domain routes

Paths below include their mount prefix. Read the linked router/controller/service for request fields, filters and side effects. The response schema does not validate those domain fields.

### /universal-batches

Source: [universal-batch.router.js](../core/src/modules/universal-batch/universal-batch.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/universal-batches |
| GET | /api/v1/universal-batches/:id |
| POST | /api/v1/universal-batches |
| PATCH | /api/v1/universal-batches/:id/transition |
| POST | /api/v1/universal-batches/:id/events |
| POST | /api/v1/universal-batches/:id/outputs |

### /spatial

Source: [spatial.router.js](../core/src/modules/spatial/spatial.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/spatial/zones |
| GET | /api/v1/spatial/zones/:code |
| GET | /api/v1/spatial/canonical |

### /events

Source: [events.router.js](../core/src/common/events/events.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/events/audit |
| GET | /api/v1/events/alerts |

### /homesteads

Source: [homesteads.router.js](../core/src/modules/homesteads/homesteads.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/homesteads/profile |
| GET | /api/v1/homesteads/status |
| GET | /api/v1/homesteads/autonomy |
| GET | /api/v1/homesteads |

### /zones

Source: [zones.router.js](../core/src/modules/zones/zones.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/zones/facilities |
| GET | /api/v1/zones/facilities/:id |
| GET | /api/v1/zones/buildings |
| GET | /api/v1/zones |

### /batches

Source: [batches.router.js](../core/src/modules/batches/batches.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/batches |
| GET | /api/v1/batches/:id |

### /catalog

Source: [catalog.router.js](../core/src/modules/catalog/catalog.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/catalog/units |
| GET | /api/v1/catalog/products |
| GET | /api/v1/catalog |
| POST | /api/v1/catalog/products |
| POST | /api/v1/catalog/units/convert |

### /production

Source: [production.router.js](../core/src/modules/production/production.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/production/summary |
| GET | /api/v1/production/categories |
| GET | /api/v1/production/categories/:id |
| GET | /api/v1/production |

### /cultivation

Source: [cultivation.router.js](../core/src/modules/cultivation/cultivation.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/cultivation/summary |
| GET | /api/v1/cultivation |
| GET | /api/v1/cultivation/microgreens/calibration |
| GET | /api/v1/cultivation/catalog |
| POST | /api/v1/cultivation/catalog |
| GET | /api/v1/cultivation/batches/active |
| POST | /api/v1/cultivation/nutrient-dosing |

### /livestock

Source: [livestock.router.js](../core/src/modules/livestock/livestock.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/livestock/summary |
| GET | /api/v1/livestock/animals |
| POST | /api/v1/livestock/egg-harvest |
| GET | /api/v1/livestock/egg-harvest/history |
| POST | /api/v1/livestock/feeding |
| POST | /api/v1/livestock/mortality |
| GET | /api/v1/livestock |

### /aquaculture

Source: [aquaculture.router.js](../core/src/modules/aquaculture/aquaculture.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/aquaculture/summary |
| GET | /api/v1/aquaculture/ponds |
| GET | /api/v1/aquaculture/water-quality |
| POST | /api/v1/aquaculture/water-test |
| POST | /api/v1/aquaculture/feeding |
| GET | /api/v1/aquaculture/feeding-logs |
| GET | /api/v1/aquaculture/aeration-schedule |
| GET | /api/v1/aquaculture |

### /circular

Source: [circular.router.js](../core/src/modules/circular/circular.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/circular/overview |
| GET | /api/v1/circular/bsf/trays |
| POST | /api/v1/circular/bsf/feed |
| POST | /api/v1/circular/bsf/harvest |
| GET | /api/v1/circular/compost/batches |
| GET | /api/v1/circular/compost/temperature-profile |
| GET | /api/v1/circular |
| GET | /api/v1/circular/compost/piles |
| POST | /api/v1/circular/compost/turn |
| POST | /api/v1/circular/compost/harvest |

### /inventory

Source: [inventory.router.js](../core/src/modules/inventory/inventory.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/inventory/summary |
| GET | /api/v1/inventory/items |
| POST | /api/v1/inventory/items |
| GET | /api/v1/inventory/items/:id |
| GET | /api/v1/inventory/locations |
| POST | /api/v1/inventory/movements |
| GET | /api/v1/inventory/movements |
| GET | /api/v1/inventory |

### /resources

Source: [resources.router.js](../core/src/modules/resources/resources.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/resources/overview |
| GET | /api/v1/resources/flows |
| GET | /api/v1/resources/flows/:id |
| GET | /api/v1/resources |

### /activities

Source: [activities.router.js](../core/src/modules/activities/activities.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/activities/summary |
| GET | /api/v1/activities/tasks |
| POST | /api/v1/activities/tasks |
| GET | /api/v1/activities/tasks/:id |
| PATCH | /api/v1/activities/tasks/:id/toggle |
| GET | /api/v1/activities |

### /intelligence

Source: [intelligence.router.js](../core/src/modules/intelligence/intelligence.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/intelligence/autonomy |
| GET | /api/v1/intelligence/recommendations |
| POST | /api/v1/intelligence/recommendations/:id/apply |
| POST | /api/v1/intelligence/recommendations/:id/dismiss |
| GET | /api/v1/intelligence/diagnose |
| GET | /api/v1/intelligence/rules |
| GET | /api/v1/intelligence |
| GET | /api/v1/intelligence/insights |
| POST | /api/v1/intelligence/insights/:id/apply |
| POST | /api/v1/intelligence/insights/:id/dismiss |
| POST | /api/v1/intelligence/diagnose |
| POST | /api/v1/intelligence/query |
| GET | /api/v1/intelligence/forecast |
| GET | /api/v1/intelligence/audit |

### /energy-water

Source: [energy-water.router.js](../core/src/modules/energy-water/energy-water.router.js).

| Method | Path |
| --- | --- |
| GET | /api/v1/energy-water/live |
| GET | /api/v1/energy-water/historical |
| GET | /api/v1/energy-water/policy |
| PUT | /api/v1/energy-water/policy |
| GET | /api/v1/energy-water/dump-load |
| POST | /api/v1/energy-water/ingest |
| GET | /api/v1/energy-water/stream |
| GET | /api/v1/energy-water |
| GET | /api/v1/energy-water/gateway/status |
| POST | /api/v1/energy-water/gateway/ingest |
| GET | /api/v1/energy-water/telemetry/live |
| GET | /api/v1/energy-water/telemetry/history |
| POST | /api/v1/energy-water/telemetry/ingest |
| POST | /api/v1/energy-water/policy |
| GET | /api/v1/energy-water/dump-load/status |
| GET | /api/v1/energy-water/telemetry/stream |

## Inline aliases

These routes are declared directly in routes/v1/index.js.

| Method | Path |
| --- | --- |
| GET | /api/v1/buildings |
| GET | /api/v1/products |
| GET | /api/v1/units |
| GET | /api/v1/resource-flows |
| GET | /api/v1/resource-flows/:id |
| GET | /api/v1/telemetry/live |
| GET | /api/v1/telemetry/stream |
| GET | /api/v1/telemetry/historical |
| GET | /api/v1/telemetry/policy |
| PUT | /api/v1/telemetry/policy |
| POST | /api/v1/telemetry/ingest |
| GET | /api/v1/telemetry/dump-load |
| GET | /api/v1/telemetry |

## Validation and known limitations

Validation is implemented per handler/service; there is no universal DTO validation pipeline or mounted authentication middleware. Error conventions do not imply authentication is implemented. Some endpoints return memory/constant-backed data even if PostgreSQL is unavailable.

The universal-batch transition handler currently passes req.body as a single argument to transitionStatus(id, newStatus, reason). This signature mismatch must be fixed and covered with an HTTP regression test before its legal-transition path is treated as working. This documentation change does not alter that behavior.

Source-of-truth files: core/src/app.js, core/src/routes/index.js and core/src/routes/v1/index.js. Update this inventory when adding, removing or remounting routes.
