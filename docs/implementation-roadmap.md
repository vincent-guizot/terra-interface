# Implementation Roadmap — Terra Interface

> **Prioritized Engineering Roadmap**  
> **Homestead**: Vincent's Farm (300 m², West Java, Indonesia)  
> **Document Version**: 1.0.0 | **Status**: Architecture Specification

---

## 1. Roadmap Overview & Timeline

The roadmap is structured into 6 sequential, milestone-driven sprints designed to land the complete Personal Home OS:

```mermaid
gantt
    title Terra Interface Implementation Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1: Data & Core
    Sprint 1: Schema & Inventory Ledger     :active, s1, 2026-11-15, 14d
    Sprint 2: Domain Modular Monolith Mount :s2, after s1, 14d
    section Phase 2: Frontend & UX
    Sprint 3: Console Feature Decomposition :s3, after s2, 14d
    Sprint 4: Embedded Drawers & SWR Sync   :s4, after s3, 14d
    section Phase 3: Hardware & Intelligence
    Sprint 5: Microgrid & IoT Gateway Stream:s5, after s4, 14d
    Sprint 6: Terra AI Autonomy Engine      :s6, after s5, 14d
```

---

## 2. Sprint Details & Acceptance Criteria

### Sprint 1: Normalized Database Schema & Immutable Inventory Ledger
- **Status**: Target Specification
- **Complexity**: High
- **Deliverables**:
  - Update `core/prisma/schema.prisma` with all 12 domains (Domains A–L).
  - Create `StockMovement` table with double-entry balance derivation.
  - Implement unit conversion matrix with mass/volume density checks.
- **Acceptance Criteria**:
  - `npx prisma migrate dev` runs with zero data loss on existing zones and batches.
  - Test script verifies that stock balance equals the sum of movements.
  - Cross-dimension conversion without density throws a validated error.

### Sprint 2: Core Domain Monolith Mounting
- **Status**: Target Specification
- **Complexity**: High
- **Deliverables**:
  - Implement NestJS modules for `Cultivation`, `Livestock`, `Aquaculture`, `Circular`, `Inventory`, and `Microgrid`.
  - Mount all domain modules into `core/src/app.module.ts`.
  - Expose DTOs with Swagger annotations.
- **Acceptance Criteria**:
  - Swagger UI at `http://localhost:4000/api/docs` lists all 12 operational domains.
  - All CRUD endpoints respond with the standardized JSON envelope.

### Sprint 3: Console Feature-Based Decomposition
- **Status**: Target Specification
- **Complexity**: Medium
- **Deliverables**:
  - Extract monolithic components from `console/pages/operations/index.js` into feature folders (`features/cultivation/`, `features/livestock/`, etc.).
  - Ensure zero visual regressions to the approved Light Nature design system.
- **Acceptance Criteria**:
  - `npm run build:console` succeeds with exit code 0 across all 10 routes.
  - Bundle size per page remains under 190 kB first-load JS.

### Sprint 4: Embedded CRUD Drawers & Live SWR Data Binding
- **Status**: Target Specification
- **Complexity**: Medium
- **Deliverables**:
  - Wire contextual side drawers to `useUniversalBatches` and `useOperationsCRUD`.
  - Connect tables to backend REST endpoints with SWR caching.
  - Implement graceful offline banner when Core is disconnected.
- **Acceptance Criteria**:
  - Steward can create a batch, log a harvest, and record feed rations without leaving the page.
  - Table updates optimistically and shows real persisted data from PostgreSQL.

### Sprint 5: Real-Time Microgrid & IoT Ingestion
- **Status**: Target Specification
- **Complexity**: High
- **Deliverables**:
  - Implement Server-Sent Events (SSE) or WebSocket gateway for live telemetry streaming.
  - Connect ESP32 probes in Zone 2 (DO, pH) and Zone 5 (Solar kW, Battery SoC %).
  - Display live moving gauges on `/overview` and `/resources`.
- **Acceptance Criteria**:
  - Telemetry updates stream to Console with sub-second latency.
  - Automatic alerts fire when DO drops below 5.0 mg/L or battery SoC drops below 20%.

### Sprint 6: Terra AI Autonomy & Circular Optimization Engine
- **Status**: Target Specification
- **Complexity**: Medium
- **Deliverables**:
  - Autonomy score calculation algorithm tracking caloric, water, and energy independence.
  - Dynamic AI recommendations for composting turns, feeding adjustments, and harvest windows based on weather forecasts.
- **Acceptance Criteria**:
  - Autonomy index dynamically recalculates on harvest and energy events.
  - Recommendations can be accepted or dismissed directly from `/intelligence`.
