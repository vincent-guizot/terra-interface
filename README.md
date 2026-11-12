# TERRA INTERFACE — Personal Self-Sustaining Home OS

> **"Your Home. Your Resources. Your Ecosystem."**  
> First Implementation: **Vincent's Farm (300 m² Homestead, West Java, Indonesia)**

---

## Repository Structure

The project is structured into two main decoupled workspaces:

```
terra-interface/
├── console/                 # Frontend Web Console Application
│   ├── components/          # UI Components & Isometric 3D Visual Models
│   │   ├── isometric/       # Isometric Homestead 300m² & Resource Flow SVGs
│   │   ├── MainLayout.js    # Global Layout, Contextual Modals & Toasts
│   │   └── MenuBar.js       # Top Horizontal Nav, Telemetry Badge, Search
│   ├── data/                # Master Homestead & Operations Mock Data
│   ├── pages/               # Next.js Application Routes
│   │   ├── index.js         # 01. Overview (What is happening?)
│   │   ├── map.js           # 02. Map (Where is everything?)
│   │   ├── production.js    # 03. Production (What are we producing?)
│   │   ├── resources.js     # 04. Resources (What resources are available?)
│   │   ├── activities.js    # 05. Activities (What needs to be done?)
│   │   ├── intelligence.js  # 06. Intelligence (Terra AI Assistant)
│   │   └── operations/      # Embedded Operations & CRUD System
│   ├── public/              # Static Assets (Favicon, Icons)
│   ├── styles/              # Global Nature-Tech Styles & Manrope Typography
│   ├── theme/               # Material UI Light Nature Design System Theme
│   ├── next.config.js       # Next.js Configuration
│   └── package.json         # Console Dependencies
│
├── core/                    # Backend Modular Monolith & Domain Engine
│   ├── prisma/
│   │   └── schema.prisma    # PostgreSQL Relational Database Schema
│   ├── src/
│   │   ├── modules/         # Universal Batch, Cultivation, Livestock, etc.
│   │   │   └── universal-batch/
│   │   ├── prisma/          # Prisma Client Service Provider
│   │   ├── app.module.ts    # Root NestJS Module
│   │   └── main.ts          # Backend Bootstrap Entry Point
│   ├── tsconfig.json        # TypeScript Compiler Config
│   └── package.json         # Backend Dependencies
│
├── .gitignore
├── package.json             # Root Workspace Scripts
└── README.md
```

---

## Quick Start

### 1. Run Frontend Console (`console/`)
```bash
# From repository root:
npm run dev:console

# Or directly in console/:
cd console
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Terra Interface Home OS console.

### 2. Build Frontend Console
```bash
npm run build:console
```

### 3. Run Backend Core Engine (`core/`)
```bash
cd core
npm install
npm run start:dev
```

### 4. Prisma Database Studio
```bash
npm run prisma:studio
```
