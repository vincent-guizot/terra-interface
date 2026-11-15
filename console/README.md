# Terra Interface — Console Frontend

Personal Self-Sustaining Home Operating System for **Vincent's Farm (300 m² Master Plan)**.

## 🌿 Overview

The `console` is the primary interactive web operating system for Vincent's Farm, providing real-time telemetry observation, spatial site map exploration, biophysical closed-loop resource flows, and modular management.

### Tech Stack
- **Build Tool:** Vite 5
- **Framework:** React 18 (ES Modules / JavaScript)
- **Routing:** React Router DOM 6 (Centralized, nested, lazy-loaded)
- **State Management:** Redux Toolkit & React Redux
- **Data Fetching:** Axios & TanStack Query v5
- **UI & Components:** shadcn/ui + Tailwind CSS 4 + Lucide React
- **Design System:** Light Nature Theme (`#FAF9F5` warm white, `#1B4332` forest green, `#10B981` emerald, `#84CC16` lime)
- **Typography:** Manrope Google Font

---

## 📁 Project Architecture

```
console/
├── public/                     # Static assets & favicon
├── src/
│   ├── app/
│   │   ├── main.jsx            # React DOM entry point
│   │   ├── App.jsx             # Main application component
│   │   ├── providers/
│   │   │   └── AppProviders.jsx# Redux, QueryClient, Theme, Tooltip providers
│   │   └── store/
│   │       ├── index.js        # Centralized Redux store
│   │       └── rootReducer.js  # Combined root reducer
│   │
│   ├── router/
│   │   ├── index.jsx           # Centralized router with MainLayout & Suspense
│   │   ├── routes.js           # Declarative lazy-loaded route registry
│   │   ├── ProtectedRoute.jsx  # Route guard for steward authentication
│   │   └── paths.js            # Type-safe route path constants
│   │
│   ├── redux/
│   │   ├── slices/             # homestead, facilities, resourceFlow, management, ui
│   │   ├── selectors/          # Memoized state query selectors
│   │   └── middleware/         # Telemetry audit & sync middleware
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components (Button, Card, Badge, Dialog, etc.)
│   │   ├── layout/             # MainLayout, containers, footers
│   │   ├── shared/             # DataSourceBadge, PageLoading, metric cards
│   │   └── navigation/         # TopNavBar horizontal navigation & popover menus
│   │
│   ├── features/               # Feature-based domain modules
│   │   ├── overview/           # Autonomy status, telemetry provenance & 3D hero
│   │   ├── map/                # 3D Site Map, 10 Canonical facilities, resource flows
│   │   ├── production/         # Crop batches, aquaculture, harvest ledger
│   │   ├── resources/          # Solar microgrid, battery, cisterns, compost
│   │   ├── activities/         # Chore logs, automation routines, audits
│   │   ├── intelligence/       # AI heuristics, advisory dispatch
│   │   ├── management/         # Management layout & catalog
│   │   ├── cultivation/        # Plant batches & fertigation
│   │   ├── livestock/          # Chicken, goat & sheep husbandry
│   │   ├── aquaculture/        # Bio-pond & water chemistry
│   │   ├── circular/           # BSF larvae bioconversion & thermophilic compost
│   │   ├── inventory/          # Warehouse stock & ledger
│   │   └── energy-water/       # Solar PV, battery & water manifolds
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── apiClient.js    # Centralized Axios client with interceptors
│   │   │   └── endpoints.js    # REST & telemetry endpoint constants
│   │   └── index.js            # Domain services for TanStack Query
│   │
│   ├── lib/
│   │   └── utils.js            # Standard cn() utility (clsx + tailwind-merge)
│   ├── styles/
│   │   └── globals.css         # Tailwind & Light Nature theme custom properties
│   └── assets/                 # Icons, badges, visual illustrations
│
├── components.json             # shadcn/ui configuration
├── index.html                  # HTML entry point (points to /src/app/main.jsx)
├── jsconfig.json               # Path alias resolution (@/*)
├── vite.config.js              # Vite configuration with chunk splitting & aliases
├── package.json
└── .env.example                # Environment variables template
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm 9+

### 1. Installation
Install workspace dependencies from either the root or `console/`:
```bash
# From workspace root:
npm install

# Or inside console/:
cd console
npm install
```

### 2. Environment Configuration
Copy the environment template:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
VITE_DEMO_MODE=false
VITE_HOMESTEAD_ID=vincents-farm-300m2
VITE_APP_TITLE=Terra Interface
```

### 3. Development Server
Start the Vite development server on `http://localhost:3000`:
```bash
npm run dev --prefix console
```

### 4. Production Build & Preview
```bash
# Build optimized production bundle:
npm run build --prefix console

# Preview production build locally:
npm run preview --prefix console

# Code linting check:
npm run lint --prefix console
```

---

## 🧭 Routes & Navigation

| Route | View | Description |
|---|---|---|
| `/` | **Overview** | Ecosystem autonomy (94.2%), Telemetry Provenance Banner, 4 KPI cards, and 3D Isometric Homestead Hero. |
| `/map` | **Map** | Vincent's Farm 300 m² spatial layout: 3D Site Map, Master Plan Facilities (10), and Biophysical Resource Flow. |
| `/production` | **Production** | Crop harvests, NFT hydroponics, tilapia bio-ponds. |
| `/resources` | **Resources** | Clean microgrid (5.2 kWp), LiFePO4 battery (15.3 kWh), cisterns (10,400 L). |
| `/activities` | **Activities** | Daily chores, sensor calibrations, maintenance logs. |
| `/intelligence` | **Intelligence** | AI advisor recommendations, closed-loop telemetry insights. |
| `/management` | **Management** | Domain management entry point with embedded CRUD modules. |
| `/management/cultivation` | Cultivation | Vegetable beds, nursery propagation, fruiting chambers. |
| `/management/livestock` | Livestock | Standalone Chicken Coop, Goat Barn, and Sheep Barn tracking. |
| `/management/aquaculture` | Aquaculture | Bio-ponds, DO & pH telemetry, feeding schedules. |
| `/management/circular` | Circular | BSF insect larvae bioconversion & thermophilic composting. |
| `/management/inventory` | Inventory | Seed vault, livestock feed bins, organic amendments. |
| `/management/energy-water` | Energy & Water | Inverter dispatch, pump manifolds, solar generation. |
| `/management/catalog` | Catalog | Custom types, unit definitions, and facility configs. |

---

## 🛡️ Telemetry Provenance & Integrity Standards

To avoid displaying mock data as actual sensor telemetry, all metrics are classified into four explicit tiers:
1. `● LIVE` — Actual connected hardware sensor, RS485 bus, or Modbus IoT telemetry.
2. `MANUAL` — Steward logs entered by Vincent during farm chores.
3. `ESTIMATED` — Calculated metabolic, algorithmic, or forecast metrics.
4. `DEMO` — Clearly labeled synthetic data for offline demonstration.

---

## 🎨 shadcn/ui Component Usage

Components in `src/components/ui/` are built on Radix UI primitives and styled with Light Nature theme tokens:
```jsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ExampleWidget() {
  return (
    <Card className="rounded-2xl border-[rgba(27,67,50,0.09)]">
      <CardHeader>
        <CardTitle className="text-[#14281D]">Clean Solar Microgrid</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="live">LIVE • 4.8 kW</Badge>
        <Button variant="emerald" className="mt-4">
          View Battery Reserves
        </Button>
      </CardContent>
    </Card>
  );
}
```
