# API response contract — v1

All ordinary JSON endpoints under `/api/v1`, including legacy operation and gateway routes, use the following envelope. Domain payloads remain inside `data`; this document defines the envelope, not every domain payload schema. The machine-readable definition is [api-response.schema.json](api-response.schema.json).

## Success

HTTP 200 for reads/updates, 201 for creates:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { "id": "example" },
  "timestamp": "2026-11-15T00:00:00.000Z"
}
```

`data` may be an object, array, scalar or `null`, according to the endpoint. An empty collection is `[]`. Optional `meta` is an object for endpoint-specific metadata. Current limit-based endpoints are not paginated: they do not advertise invented totals or page counts. HTTP 204 has an empty body and must not be parsed as JSON.

## Failure

The HTTP status and `error.statusCode` must agree. Clients should branch on `error.code` and display `error.message`.

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required fields 'topic' or 'payload'",
    "statusCode": 400,
    "details": [
      { "field": "topic/payload", "message": "Both topic and payload are required" }
    ]
  },
  "timestamp": "2026-11-15T00:00:00.000Z"
}
```

`details` is `null` when absent; validation errors use an array of `{ field, message }`. The existing gateway validation remains HTTP 400. Explicit semantic validation may use 422. This response change does not add a general request validation layer to every endpoint.

| HTTP | Default code | Meaning |
| --- | --- | --- |
| 400 | BAD_REQUEST | Invalid request; malformed JSON uses INVALID_JSON |
| 401 | UNAUTHORIZED | Authentication required |
| 403 | FORBIDDEN | Request is not permitted |
| 404 | RESOURCE_NOT_FOUND | Record missing; unknown URL uses ROUTE_NOT_FOUND |
| 409 | CONFLICT | Request conflicts with resource state |
| 413 | PAYLOAD_TOO_LARGE | Body exceeds the parser limit |
| 422 | VALIDATION_ERROR | Semantic validation failed |
| 429 | RATE_LIMIT_EXCEEDED | Retry according to standard rate-limit headers |
| 500 | INTERNAL_SERVER_ERROR | Unexpected server failure |
| 503 | SERVICE_UNAVAILABLE | Temporary server unavailability |

Internal exception messages, stacks and database details are logged server-side and are not returned in failure envelopes. A timestamp is generated for each response, including rate-limit responses. The code table describes response conventions; it does not imply authentication or authorization is already implemented.

## Special responses

- `/api/health` and `/health` retain their monitoring format (`success`, `application`, `status`, `environment`, `homestead`, `database`, `uptimeSeconds`, `timestamp`). HTTP 200 means healthy; 503 means degraded. No internal database exception text is exposed.
- SSE telemetry routes use `text/event-stream`: each `data: ...` line is a telemetry snapshot. They are not JSON response envelopes. Heartbeat comments and stream termination retain their existing behavior.
- `/api/v1/intelligence/audit` exports serialized audit JSON (`homestead`, `exportedAt`, `totalInteractions`, `auditTrail`) directly, as an export format rather than a REST envelope.

## Console integration

The shared Console client unwraps `data` for success responses. On failure it exposes `ApiError.message`, `statusCode`, `code` and `details`, with backward compatibility for older top-level error messages. Streaming consumers keep parsing telemetry snapshots directly. External clients that previously consumed raw legacy JSON must now read the REST payload from `data` (the exceptions above are unchanged).
