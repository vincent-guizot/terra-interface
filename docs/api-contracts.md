# API Contract Specification — Terra Interface

> **REST API Documentation & Contract Blueprint**  
> **Base URL**: `/api/v1/`  
> **OpenAPI Swagger**: Accessible at `http://localhost:4000/api/docs`  
> **Document Version**: 1.0.0 | **Status**: Verified Contract Blueprint

---

## 1. Global Standards & Envelope Formats

All requests and responses use `application/json`. Timestamps are ISO 8601 UTC strings (`YYYY-MM-DDTHH:mm:ss.sssZ`).

### Standard Success Response (`200 OK`, `201 Created`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Resource retrieved successfully",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 42
  },
  "timestamp": "2026-11-12T22:45:00.000Z"
}
```

### Standard Error Response (`400`, `404`, `422`)
```json
{
  "success": false,
  "statusCode": 422,
  "error": "Unprocessable Entity",
  "message": "Transition from COMPLETED to ACTIVE is illegal",
  "details": {
    "batchId": "b1a2-...",
    "currentStatus": "COMPLETED",
    "attemptedStatus": "ACTIVE"
  },
  "timestamp": "2026-11-12T22:45:00.000Z"
}
```

---

## 2. Exhaustive Endpoint Inventory

### 2.1 Universal Batch Domain (`/api/v1/batches`)

| Method | Endpoint | Description | Request Body / Query | Success Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/batches` | List all batches across domains with filtering | Query: `domain`, `status`, `zoneId` | `200 OK` |
| `POST` | `/batches` | Register a new batch | `CreateBatchDto` | `201 Created` |
| `GET` | `/batches/:id` | Get complete batch dossier with outputs and history | None | `200 OK` |
| `PATCH` | `/batches/:id/status` | Transition lifecycle state with validation | `TransitionBatchStatusDto` | `200 OK` |
| `POST` | `/batches/:id/outputs` | Log harvest output & auto-increment inventory | `RecordBatchOutputDto` | `201 Created` |
| `POST` | `/batches/:id/events` | Record feeding, observation, or water test event | `RecordBatchEventDto` | `201 Created` |

### 2.2 Cultivation Domain (`/api/v1/cultivation`)

| Method | Endpoint | Description | Request Body / Query | Success Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/cultivation/catalog` | Get catalog of plant species & varieties | Query: `category` | `200 OK` |
| `POST` | `/cultivation/catalog` | Add a new crop/fungi variety | `CreatePlantCatalogDto` | `201 Created` |
| `GET` | `/cultivation/batches/active` | Get active greenhouse & raised bed batches | None | `200 OK` |
| `POST` | `/cultivation/ec-ph-log` | Log hydroponic nutrient reading | `LogNutrientDto` | `201 Created` |

### 2.3 Livestock Domain (`/api/v1/livestock`)

| Method | Endpoint | Description | Request Body / Query | Success Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/livestock/animals` | Get animal inventory (KUB, Joper, Goats) | Query: `breed`, `housingSystem` | `200 OK` |
| `POST` | `/livestock/feeding` | Record daily feed ration (BSF larvae, mash) | `RecordLivestockFeedDto` | `201 Created` |
| `POST` | `/livestock/egg-harvest` | Record daily egg collection & grade breakdown | `RecordEggHarvestDto` | `201 Created` |
| `POST` | `/livestock/mortality` | Log mortality event & deduct live population | `RecordMortalityDto` | `201 Created` |

### 2.4 Aquaculture Domain (`/api/v1/aquaculture`)

| Method | Endpoint | Description | Request Body / Query | Success Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/aquaculture/ponds` | Get bio-pond status (Tilapia & Catfish) | None | `200 OK` |
| `GET` | `/aquaculture/water-quality` | Get DO, pH, temp, ammonia historical logs | Query: `pondId`, `range` | `200 OK` |
| `POST` | `/aquaculture/water-test` | Log chemical reagent water test | `RecordWaterTestDto` | `201 Created` |
| `POST` | `/aquaculture/feeding` | Record feeding event (duckweed/pellets) | `RecordFishFeedDto` | `201 Created` |

### 2.5 Circular Domain (`/api/v1/circular`)

| Method | Endpoint | Description | Request Body / Query | Success Status |
| :--- | :--- | :--- | :--- | :---: |
| `POST` | `/circular/bsf/load-substrate` | Load kitchen/crop waste into BSF trays | `LoadBsfSubstrateDto` | `201 Created` |
| `POST` | `/circular/bsf/harvest` | Harvest live prepupae & insect frass | `HarvestBsfDto` | `201 Created` |
| `POST` | `/circular/compost/turn` | Log aerobic turning & core temperature | `TurnCompostDto` | `201 Created` |
| `GET` | `/circular/efficiency` | Calculate current homestead circularity % | None | `200 OK` |

### 2.6 Inventory Ledger Domain (`/api/v1/inventory`)

| Method | Endpoint | Description | Request Body / Query | Success Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/inventory/balances` | Query derived stock balances across locations | Query: `locationId`, `reorderOnly` | `200 OK` |
| `POST` | `/inventory/movements` | Record manual purchase, intake, or adjustment | `CreateStockMovementDto` | `201 Created` |
| `GET` | `/inventory/locations` | List all sheds, cellars, and seed vaults | None | `200 OK` |
| `GET` | `/inventory/items/:id/ledger`| Get immutable transaction history for SKU | Param: `id` | `200 OK` |

### 2.7 Microgrid Domain (`/api/v1/microgrid`)

| Method | Endpoint | Description | Request Body / Query | Success Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/microgrid/telemetry/live` | Current Solar kW, Battery SoC %, Cistern L | None | `200 OK` |
| `GET` | `/microgrid/telemetry/history`| Historical hourly generation & storage | Query: `metric`, `hours` | `200 OK` |
| `POST` | `/microgrid/telemetry/ingest` | IoT gateway ingestion endpoint | `TelemetryIngestDto` | `202 Accepted` |

### 2.8 Operations & Work Orders Domain (`/api/v1/operations`)

| Method | Endpoint | Description | Request Body / Query | Success Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/operations/tasks/today` | Today's chores and scheduled routines | None | `200 OK` |
| `PATCH` | `/operations/tasks/:id/complete`| Mark routine task as completed | `CompleteTaskDto` | `200 OK` |

### 2.9 Intelligence Domain (`/api/v1/intelligence`)

| Method | Endpoint | Description | Request Body / Query | Success Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/intelligence/insights` | Get active AI ecosystem recommendations | None | `200 OK` |
| `POST` | `/intelligence/insights/:id/apply`| Accept recommendation & schedule task | Param: `id` | `200 OK` |
| `GET` | `/intelligence/autonomy` | Food, water, energy self-sufficiency scores | None | `200 OK` |
