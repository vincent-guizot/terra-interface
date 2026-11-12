# Database Entity-Relationship Diagram (ERD) — Terra Interface

> **Relational Data Architecture Specification**  
> **Database Engine**: PostgreSQL 15+ via Prisma ORM  
> **Document Version**: 1.0.0 | **Status**: Architecture Specification

---

## 1. Complete Entity-Relationship Diagram

The diagram below maps the actual relational connections, foreign keys, and cardinalities across all 12 core domains of Terra Interface:

```mermaid
erDiagram
    %% =========================================================================
    %% DOMAIN A: IDENTITY & SPATIAL HIERARCHY
    %% =========================================================================
    HOMESTEAD ||--o{ SITE_PLAN_VERSION : contains
    HOMESTEAD ||--o{ ZONE : divides_into
    HOMESTEAD ||--o{ STORAGE_LOCATION : maintains
    HOMESTEAD ||--o{ PRODUCT_CATEGORY : categorizes
    
    ZONE ||--o{ BUILDING : houses
    ZONE ||--o{ FACILITY : contains
    ZONE ||--o{ BATCH : hosts
    ZONE ||--o{ SENSOR_DEVICE : monitors
    ZONE ||--o{ TELEMETRY_READING : logs

    BUILDING ||--o{ FACILITY : encloses
    FACILITY ||--o{ EQUIPMENT : utilizes

    %% =========================================================================
    %% DOMAIN B: DYNAMIC PRODUCT CATALOG & CONFIGURATION
    %% =========================================================================
    PRODUCT_CATEGORY ||--o{ PRODUCT_DEFINITION : contains
    MEASUREMENT_UNIT ||--o{ PRODUCT_DEFINITION : sets_default_unit
    MEASUREMENT_UNIT ||--o{ UNIT_CONVERSION : converts_from
    MEASUREMENT_UNIT ||--o{ UNIT_CONVERSION : converts_to

    PRODUCT_DEFINITION ||--o{ CUSTOM_FIELD_DEFINITION : defines_fields
    PRODUCT_DEFINITION ||--o{ BATCH : produces
    PRODUCT_DEFINITION ||--o{ INVENTORY_ITEM : tracks_in_inventory

    CUSTOM_FIELD_DEFINITION ||--o{ CUSTOM_FIELD_VALUE : assigns_value

    %% =========================================================================
    %% DOMAIN C: UNIVERSAL BATCH ENGINE
    %% =========================================================================
    BATCH ||--o{ BATCH_STATUS_HISTORY : logs_transitions
    BATCH ||--o{ BATCH_EVENT : records_events
    BATCH ||--o{ BATCH_OUTPUT : yields
    BATCH ||--o{ CUSTOM_FIELD_VALUE : stores_custom_data
    
    %% 1-to-1 Domain Detail Extensions
    BATCH ||--o| CULTIVATION_BATCH_DETAIL : extends_cultivation
    BATCH ||--o| LIVESTOCK_BATCH_DETAIL : extends_livestock
    BATCH ||--o| AQUACULTURE_BATCH_DETAIL : extends_aquaculture
    BATCH ||--o| BSF_BATCH_DETAIL : extends_bsf
    BATCH ||--o| COMPOST_BATCH_DETAIL : extends_compost

    %% =========================================================================
    %% DOMAIN H: INVENTORY TRANSACTION LEDGER
    %% =========================================================================
    STORAGE_LOCATION ||--o{ INVENTORY_ITEM : stores
    INVENTORY_ITEM ||--o{ STOCK_MOVEMENT : transacts
    BATCH_OUTPUT ||--o| STOCK_MOVEMENT : creates_harvest_in

    %% =========================================================================
    %% DOMAINS I & K: MICROGRID & SMART TELEMETRY
    %% =========================================================================
    SENSOR_DEVICE ||--o{ TELEMETRY_READING : emits

    %% =========================================================================
    %% ENTITY ATTRIBUTE DEFINITIONS
    %% =========================================================================

    HOMESTEAD {
        uuid id PK
        string name
        float totalAreaSqm
        string dimensions
        string location
        string stewardName
    }

    ZONE {
        uuid id PK
        uuid homesteadId FK
        string code UK "e.g. Z-01"
        string name
        float areaSqm
        string domainTag
        string colorHex
    }

    BUILDING {
        uuid id PK
        uuid zoneId FK
        string name
        float footprintSqm
        float roofAreaSqm
    }

    FACILITY {
        uuid id PK
        uuid zoneId FK
        uuid buildingId FK "Optional"
        string name
        string type "NFT, BioPond, Coop"
    }

    EQUIPMENT {
        uuid id PK
        uuid facilityId FK
        string name
        string modelNumber
        float ratedPowerWatt
        string status "OPERATIONAL"
    }

    PRODUCT_DEFINITION {
        uuid id PK
        uuid categoryId FK
        uuid defaultUnitId FK
        string name
        string sku UK
        float densityKgPerL "Required for Mass-Volume conversion"
    }

    MEASUREMENT_UNIT {
        uuid id PK
        string symbol UK "kg, L, pcs"
        string name
        string dimension "MASS, VOLUME, DISCRETE"
    }

    UNIT_CONVERSION {
        uuid id PK
        uuid sourceUnitId FK
        uuid targetUnitId FK
        float multiplier
    }

    BATCH {
        uuid id PK
        string batchCode UK
        string name
        string domain "CULTIVATION, LIVESTOCK..."
        uuid productDefinitionId FK
        uuid zoneId FK
        string status "DRAFT, ACTIVE, COMPLETED..."
        datetime startDate
        datetime expectedEndDate
        datetime actualEndDate
        float initialQuantity
        float currentQuantity
        string measurementUnit
        float healthIndex
    }

    BATCH_STATUS_HISTORY {
        uuid id PK
        uuid batchId FK
        string fromStatus
        string toStatus
        string reason
        string changedBy
        datetime timestamp
    }

    BATCH_OUTPUT {
        uuid id PK
        uuid batchId FK
        datetime harvestDate
        string productName
        float quantity
        string unit
        string grade
        string destination
        string steward
    }

    CULTIVATION_BATCH_DETAIL {
        uuid id PK
        uuid batchId FK UK "1-to-1"
        string growingMedium
        float ecTarget
        float phTarget
        int trayCount
    }

    LIVESTOCK_BATCH_DETAIL {
        uuid id PK
        uuid batchId FK UK "1-to-1"
        string breed
        string housingSystem
        int mortalityCount
        float targetFcr
    }

    AQUACULTURE_BATCH_DETAIL {
        uuid id PK
        uuid batchId FK UK "1-to-1"
        string species
        float pondVolumeM3
        float targetDensityKgM3
        float dissolvedOxygenMin
    }

    BSF_BATCH_DETAIL {
        uuid id PK
        uuid batchId FK UK "1-to-1"
        string substrateType
        float substrateWeightKg
        int trayCount
        float frassYieldKg
        float maggotYieldKg
    }

    COMPOST_BATCH_DETAIL {
        uuid id PK
        uuid batchId FK UK "1-to-1"
        string bayNumber
        float carbonNitrogenRatio
        float biocharPercent
        int turnCount
        float curedMaturityScore
    }

    STORAGE_LOCATION {
        uuid id PK
        uuid homesteadId FK
        string name
        string type "DRY, COLD_CELLAR, SEED_VAULT"
    }

    INVENTORY_ITEM {
        uuid id PK
        uuid storageLocationId FK
        uuid productDefId FK
        string lotNumber
        datetime expiryDate
        float reorderLevel
    }

    STOCK_MOVEMENT {
        uuid id PK
        uuid itemId FK
        string type "PURCHASE_IN, HARVEST_IN, CONSUME_OUT"
        float quantityDelta "Signed: + for In, - for Out"
        string unit
        string referenceBatchCode
        string stewardName
        datetime timestamp
    }

    SENSOR_DEVICE {
        uuid id PK
        uuid zoneId FK
        string deviceModel
        string status "ONLINE, OFFLINE"
    }

    TELEMETRY_READING {
        uuid id PK
        uuid zoneId FK
        uuid sensorId FK "Optional"
        string metric "WATER_DO, SOLAR_KW, BATTERY_SOC"
        float value
        string unit
        datetime timestamp
    }
```

---

## 2. Cardinality Rules & Relationship Constraints

### 1. Spatial Relationships
- **`Homestead` 1-to-Many `Zone`**: Each homestead partitions into exactly $N$ zones (for Vincent's Farm, exactly 7 zones). Deletion of a homestead cascades to all child zones.
- **`Zone` 1-to-Many `Facility`**: Facilities (e.g. Bio-Pond Alpha, Vertical NFT Line 1) reside within exactly one zone.
- **`Building` 1-to-Many `Facility` (Optional 0..1)**: Some facilities reside inside buildings (e.g. Mushroom Fruiting Chamber inside the Greenhouse Building), while others are open-air (e.g. Permaculture Keyhole Beds in Zone 4).

### 2. Universal Batch Extensions (1-to-1)
- The core `Batch` table stores generic metadata common to all living entities (code, dates, status, initial quantity, health index).
- Specific domains attach via a strict **1-to-1 relation** (`CultivationBatchDetail`, `LivestockBatchDetail`, `AquacultureBatchDetail`, `BsfBatchDetail`, `CompostBatchDetail`) where `batchId` is unique and foreign-keyed with `onDelete: Cascade`.

### 3. Inventory Ledger Integrity
- **`InventoryItem` 1-to-Many `StockMovement`**: An inventory item represents a specific SKU stored at a specific `StorageLocation`.
- The current stock balance is **never stored as a directly editable column**. It is computed dynamically via `SUM(quantityDelta)` across all movements associated with `itemId`.
- Every harvest output in `BatchOutput` generates a linked `StockMovement` of type `HARVEST_IN`.

### 4. Telemetry Time-Series
- `TelemetryReading` records are write-heavy, append-only logs.
- Indexed by composite index `@@index([metric, timestamp])` and `@@index([zoneId, timestamp])` to enable sub-10ms queries for time-series charts on `/overview` and `/resources`.
