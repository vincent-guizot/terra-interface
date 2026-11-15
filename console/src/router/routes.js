import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PATHS } from './paths.js';

// Lazy-loaded Feature Modules
const OverviewPage = lazy(() => import('../features/overview/OverviewPage.jsx'));
const MapPage = lazy(() => import('../features/map/MapPage.jsx'));
const ProductionPage = lazy(() => import('../features/production/ProductionPage.jsx'));
const ResourcesPage = lazy(() => import('../features/resources/ResourcesPage.jsx'));
const ActivitiesPage = lazy(() => import('../features/activities/ActivitiesPage.jsx'));
const IntelligencePage = lazy(() => import('../features/intelligence/IntelligencePage.jsx'));
const ManagementLayout = lazy(() => import('../features/management/ManagementLayout.jsx'));

// Management Child Features
const CultivationFeature = lazy(() => import('../features/cultivation/CultivationFeature.jsx'));
const LivestockFeature = lazy(() => import('../features/livestock/LivestockFeature.jsx'));
const AquacultureFeature = lazy(() => import('../features/aquaculture/AquacultureFeature.jsx'));
const CircularFeature = lazy(() => import('../features/circular/CircularFeature.jsx'));
const InventoryFeature = lazy(() => import('../features/inventory/InventoryFeature.jsx'));
const EnergyWaterFeature = lazy(() => import('../features/energy-water/EnergyWaterFeature.jsx'));
const CatalogFeature = lazy(() => import('../features/management/CatalogFeature.jsx'));

export const routes = [
  {
    path: PATHS.HOME,
    element: <OverviewPage />,
    exact: true,
  },
  {
    path: PATHS.OVERVIEW,
    element: <Navigate to={PATHS.HOME} replace />,
  },
  {
    path: PATHS.MAP,
    element: <MapPage />,
  },
  {
    path: PATHS.PRODUCTION,
    element: <ProductionPage />,
  },
  {
    path: PATHS.RESOURCES,
    element: <ResourcesPage />,
  },
  {
    path: PATHS.ACTIVITIES,
    element: <ActivitiesPage />,
  },
  {
    path: PATHS.INTELLIGENCE,
    element: <IntelligencePage />,
  },
  // Management Domain Modules & Nested Routes
  {
    path: PATHS.MANAGEMENT.ROOT,
    element: <ManagementLayout />,
  },
  {
    path: PATHS.MANAGEMENT.CULTIVATION,
    element: <CultivationFeature />,
  },
  {
    path: PATHS.MANAGEMENT.LIVESTOCK,
    element: <LivestockFeature />,
  },
  {
    path: PATHS.MANAGEMENT.AQUACULTURE,
    element: <AquacultureFeature />,
  },
  {
    path: PATHS.MANAGEMENT.CIRCULAR,
    element: <CircularFeature />,
  },
  {
    path: PATHS.MANAGEMENT.INVENTORY,
    element: <InventoryFeature />,
  },
  {
    path: PATHS.MANAGEMENT.ENERGY_WATER,
    element: <EnergyWaterFeature />,
  },
  {
    path: PATHS.MANAGEMENT.CATALOG,
    element: <CatalogFeature />,
  },
  // Backward compatibility alias
  {
    path: PATHS.OPERATIONS,
    element: <Navigate to={PATHS.MANAGEMENT.ROOT} replace />,
  },
];
