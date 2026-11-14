# TERRA INTERFACE — Personal Self-Sustaining Home OS

> **"Your Home. Your Resources. Your Ecosystem."**  
> First Canonical Implementation: **Vincent's Farm (300 m² Homestead, West Java, Indonesia)**

---

## 🌿 Overview

**Terra Interface** is a modular, regenerative Home Operating System (Home OS) designed for personal homestead autonomy, bio-physical resource tracking, and circular ecological management. 

Operating on a canonical 300 m² site plan in West Java, Indonesia, Terra Interface balances 7 spatial zones across water catchment, photovoltaic microgrid energy, livestock, aquaculture, permaculture cultivation, and biological bioconversion.

```mermaid
graph TD
    Sun[Solar PV 5.0 kWp] -->|DC Power| Inverter[Hybrid Inverter & 15.3 kWh LiFePO4]
    Rain[Rainfall Catchment 140 m²] -->|Gravity Feed| Cisterns[4x Cisterns 8,000 L]
    
    Inverter -->|Electrical Energy| Loads[Pumps, Aerators, Residence]
    Cisterns -->|Automated Drip| Beds[Zone 4: Permaculture Beds]
    Cisterns -->|Water Inflow| Aqua[Zone 2: Aquaponic Bio-Ponds]
    
    Aqua -->|Nitrate-Rich Effluent| Veg[NFT Hydroponic Greens]
    Veg -->|Bio-Filtered Water| Aqua
    
    Scraps[Kitchen & Crop Biomass] -->|Organic Waste 14 kg/d| BSF[Zone 6: BSF Larvarium]
    Scraps -->|Coarse Carbon & Frass| Bokashi[Zone 6: Bokashi Thermophilic Core]
    
    BSF -->|Live Prepupae 42% Protein| Hens[Zone 3: Layer Hens]
    BSF -->|Supplemental Feed| Aqua
    Bokashi -->|Mature Cured Humus| Beds
```

---

## 🏛️ Architecture & Workspace Structure

Terra Interface is organized as a decoupled monorepo containing the **Modernized Console Web Client (Vite React SPA)** and the **Modular Core Domain Engine (Express)**:

```
terra-interface/
├── docker-compose.yml              # PostgreSQL 16 & Redis 7 Container Orchestration
├── console/                        # Frontend Web Console Application (Vite 5 + React 18)
│   ├── components/                 # Global UI Components & Isometric 3D Visual Models
│   │   ├── isometric/              # Isometric Homestead 300 m², Animated Stream SVGs & Live Overlay
│   │   ├── operations/             # Modular Operations Tabs (Cultivation, Livestock, Aqua, Circular, etc.)
│   │   ├── MainLayout.js           # Light Nature Theme Shell, Breadcrumbs & Header
│   │   └── MenuBar.js              # Framer Motion Navigation & Live Telemetry Pulse
│   ├── features/                   # Domain-Specific Feature Modules & Contextual Drawers
│   ├── hooks/                      # Custom React Hooks (SWR, Microgrid Telemetry SSE)
│   ├── pages/                      # Application Route Views (Overview, Map, Operations, etc.)
│   ├── src/
│   │   ├── components/motion/      # Framer Motion Transitions, Spring Motion Cards & Pulses
│   │   ├── components/ui/          # Tailwind CSS & shadcn Primitives (Button, Card, Badge, KPI Ribbon)
│   │   ├── compat/                 # Next.js Router/Head Compatibility Layer for Vite SPA
│   │   ├── App.jsx                 # Client-Side SPA Route Switcher
│   │   └── main.jsx                # Vite Application Bootstrap
│   ├── styles/                     # Tailwind Directives & Nature-Tech Design Tokens
│   └── vite.config.js              # Vite Bundler Configuration & Path Aliases
│
├── core/                           # Backend Modular Domain Engine (Express + TypeScript)
│   ├── docker/                     # Docker Environment Configurations
│   ├── prisma/
│   │   ├── schema.prisma           # 12-Domain Normalized Relational Schema
│   │   └── seeders/                # Deterministic Seeders for Vincent's Farm (300 m²)
│   ├── scripts/
│   │   └── init-db.js              # Automated Database Initialization & Migration Runner
│   ├── src/
│   │   ├── common/
│   │   │   ├── events/             # Typed Domain Event Bus, Audit Logger & Cross-Module Listeners
│   │   │   └── health/             # DB Connection Pool & Health Check Pingers (/api/health/db)
│   │   ├── helpers/                # Ecological & Biotechnical Helper Algorithms
│   │   ├── modules/                # Domain Routers, Controllers & Services
│   │   │   ├── universal-batch/    # Batch State Machine & Multi-Harvest Registry
│   │   │   ├── spatial/            # 7 Spatial Zones & Facilities Management
│   │   │   ├── catalog/            # Dynamic Taxonomy & Unit Conversion Matrix
│   │   │   ├── cultivation/        # Crop Cycles, Stage Logging & Harvests
│   │   │   ├── livestock/          # Poultry Batches & Hen-Day Egg Production
│   │   │   ├── aquaculture/        # Nile Tilapia & Catfish FCR and Water Testing
│   │   │   ├── circular/           # BSF Bioconversion & Bokashi Thermophilic Compost
│   │   │   ├── inventory/          # Immutable Double-Entry Ledger & Canonical Catalog
│   │   │   ├── energy-water/       # SSE Stream, Modbus PZEM & Atlas Scientific IoT Gateway
│   │   │   └── intelligence/       # Terra AI Autonomy Engine & Botanical Diagnosis
│   │   ├── app.ts                  # Express Modular App Configuration
│   │   └── main.ts                 # Bootstrap Entry Point (Port 4000, /api/v1)
│   └── test/                       # 8/8 Invariant Verification Test Suites & Unified Runner
│       ├── batch-state-machine.test.ts
│       ├── circular-inventory-invariants.test.ts
│       ├── cultivation-invariants.test.ts
│       ├── domain-event-bus-invariants.test.ts
│       ├── intelligence-autonomy-invariants.test.ts
│       ├── iot-gateway-invariants.test.ts
│       ├── livestock-aquaculture-invariants.test.ts
│       ├── microgrid-telemetry-invariants.test.ts
│       └── runner.ts
│
├── docs/                           # Master Architectural & Technical Specifications (12 docs)
│   ├── architecture-overview.md    # High-level system context, boundaries, and principles
│   ├── console-architecture.md     # Next.js feature architecture & embedded CRUD drawers
│   ├── core-architecture.md        # NestJS domain modular monolith & Swagger specifications
│   ├── canonical-homestead-model.md# Vincent's Farm 300 m² Master Plan specifications
│   ├── database-erd.md             # Complete Mermaid Entity-Relationship Diagram (12 domains)
│   ├── batch-engine-spec.md        # Universal batch state machine & multi-harvest rules
│   ├── product-unit-catalog-spec.md# Product taxonomy and dimension-safe unit conversions
│   ├── resource-flow-spec.md       # Directed circular loops & mass/energy balance equations
│   ├── inventory-ledger-spec.md    # Immutable double-entry stock movement ledger spec
│   ├── api-contracts.md            # Complete /api/v1/ REST endpoint inventory & DTO schemas
│   ├── migration-plan.md           # Zero-downtime database and code migration protocols
│   └── implementation-roadmap.md   # Prioritized milestone roadmap & acceptance criteria
│
├── package.json                    # Root Workspace Configuration & Scripts
└── README.md                       # Main Project Documentation
```

---

## ⚡ Core Homestead Capabilities

### 1. Universal Batch State Machine & Operations
- Unified lifecycle tracking for plants, poultry, aquatic species, and bioconverters (`DRAFT` $\to$ `PLANNED` $\to$ `ACTIVE` $\to$ `HARVESTING` $\to$ `COMPLETED`).
- Support for **multi-harvest continuous production** (e.g., daily egg collection, successive vegetable flushes).
- Automated biological metrics: **Hen-Day Egg Production Rate (%)** and **Feed Conversion Ratio (FCR)**.

### 2. Circular Bioconversion & Immutable Inventory Ledger
- **Black Soldier Fly (BSF)** bioconversion yielding 3.2 kg/day live prepupae (42% crude protein) with 65/35 feed allocation for layer hens and tilapia.
- **Bokashi Composting** tracking thermophilic pasteurization (64°C) and weed seed inactivation.
- **Double-Entry Ledger**: Stock balances mathematically derived via $\sum \Delta_{\text{quantity}}$ with automatic intake from harvests and strict overdraft protection.

### 3. Real-Time Microgrid & IoT Telemetry Gateway
- **Server-Sent Events (SSE)** via `@Sse('telemetry/stream')` with REST fallback.
- Ingestion endpoint for ESP32 edge probes across Zone 2 (DO, pH) and Zone 5 (Solar kW, Battery SoC).
- **Automated Protection Rules**:
  - Load shedding alert when battery SoC $< 20\%$.
  - Dump load activation (`EVAPORATIVE_MISTING` / `POND_CASCADE_AERATOR`) during solar surplus $\ge 2.0\text{ kW}$ and battery $\ge 95\%$.
  - Low cistern alert when water buffer $< 2,000\text{ L}$.
  - Emergency aerator alarm when dissolved oxygen $< 5.0\text{ mg/L}$.

### 4. Terra AI Autonomy Engine & Ecological Intelligence
- **Composite Autonomy Index**:
  $$\text{Autonomy} = 0.35 \times \text{Food} + 0.25 \times \text{Water} + 0.25 \times \text{Energy} + 0.15 \times \text{Circularity}$$
- Dynamic recommendation lifecycle with live **Accept & Dispatch** (triggering positive autonomy recalculations) and **Dismiss**.
- **Botanical Foliage Diagnosis**: Inferences for Nitrogen, Potassium, Magnesium, Calcium, and Iron deficiencies from visual symptoms with permaculture remedies.
- **Microclimate Forecast**: Diurnal West Java rainfall windows with roof catchment modeling ($18\text{ mm} \times 140\text{ m}^2 \times 0.85 = 2,142\text{ L}$).

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Installation
Clone the repository and install all workspace dependencies:
```bash
git clone https://github.com/vincent-guizot/terra-interface.git
cd terra-interface
npm install
```

### 2. Run Database & Cache (Docker)
```bash
# Start PostgreSQL 16 & Redis 7 containers:
docker-compose up -d

# Check database connection health:
curl http://localhost:4000/api/health/db
```

### 3. Run Frontend Console (`console/`)
```bash
# From workspace root (Vite React SPA):
npm run dev:console

# Open browser at:
http://localhost:3000
```

### 4. Run Backend Core Engine (`core/`)
```bash
# From workspace root (Express Modular Engine):
npm run dev:core

# API Base & Live Health Endpoint:
http://localhost:4000/api/v1
http://localhost:4000/api/health
```

### 5. Build Verification
```bash
# Build Express TypeScript Core Engine:
npm run build:core

# Build Vite React Production Bundle:
npm run build:console
```

### 6. Run Invariant Verification Tests
```bash
# Run all invariant verification test suites (8/8 suites):
# Run all invariant verification test suites (6/6 suites):
npm test

# Or run directly inside core engine:
cd core && npm test
```

---

## 📊 Invariant Test Results

| Test Suite | File Link | Test Cases | Result |
| :--- | :--- | :---: | :---: |
| **Batch State Machine** | [`batch-state-machine.test.ts`](./core/test/batch-state-machine.test.ts) | 4 / 4 | ✅ Passed |
| **Circular & Inventory** | [`circular-inventory-invariants.test.ts`](./core/test/circular-inventory-invariants.test.ts) | 7 / 7 | ✅ Passed |
| **Cultivation Invariants** | [`cultivation-invariants.test.ts`](./core/test/cultivation-invariants.test.ts) | 5 / 5 | ✅ Passed |
| **Livestock & Aquaculture** | [`livestock-aquaculture-invariants.test.ts`](./core/test/livestock-aquaculture-invariants.test.ts) | 6 / 6 | ✅ Passed |
| **Microgrid & Telemetry** | [`microgrid-telemetry-invariants.test.ts`](./core/test/microgrid-telemetry-invariants.test.ts) | 7 / 7 | ✅ Passed |
| **Terra AI & Autonomy** | [`intelligence-autonomy-invariants.test.ts`](./core/test/intelligence-autonomy-invariants.test.ts) | 7 / 7 | ✅ Passed |
| **Domain Event Bus** | [`domain-event-bus-invariants.test.ts`](./core/test/domain-event-bus-invariants.test.ts) | 6 / 6 | ✅ Passed |
| **IoT Gateway & Telemetry** | [`iot-gateway-invariants.test.ts`](./core/test/iot-gateway-invariants.test.ts) | 7 / 7 | ✅ Passed |
| **Core Build** | `npm run build:core` | Express Build (`tsc`) | ✅ Exit 0 |
| **Console Build** | `npm run build:console` | Vite Production Bundle | ✅ Exit 0 |
| **Core Build** | `npm run build:core` | NestJS Build (`tsc`) | ✅ Exit 0 |
| **Console Build** | `npm run build:console` | Next.js (10 Static Routes) | ✅ Exit 0 |

---

## 📄 License & Attribution

Developed by **Vincent Guizot** as an open-source, reproducible Personal Home Operating System for regenerative, self-sustaining homesteads.
Distributed under the **MIT License**.
