import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PATHS } from './paths.js';

// Lazy-loaded Feature Modules
const OverviewPage = lazy(() => import('../../features/overview/OverviewPage.jsx'));
const MapPage = lazy(() => import('../../features/map/MapPage.jsx'));
const ProductionPage = lazy(() => import('../../features/production/ProductionPage.jsx'));
const ResourcesPage = lazy(() => import('../../features/resources/ResourcesPage.jsx'));
const ActivitiesPage = lazy(() => import('../../features/activities/ActivitiesPage.jsx'));
const IntelligencePage = lazy(() => import('../../features/intelligence/IntelligencePage.jsx'));
const ManagementLayout = lazy(() => import('../../features/management/ManagementLayout.jsx'));


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
    element: <ManagementLayout initialTab="cultivation" />,
  },
  {
    path: PATHS.MANAGEMENT.LIVESTOCK,
    element: <ManagementLayout initialTab="livestock" />,
  },
  {
    path: PATHS.MANAGEMENT.AQUACULTURE,
    element: <ManagementLayout initialTab="aquaculture" />,
  },
  {
    path: PATHS.MANAGEMENT.CIRCULAR,
    element: <ManagementLayout initialTab="circular" />,
  },
  {
    path: PATHS.MANAGEMENT.INVENTORY,
    element: <ManagementLayout initialTab="inventory" />,
  },
  {
    path: PATHS.MANAGEMENT.ENERGY_WATER,
    element: <ManagementLayout initialTab="energy-water" />,
  },
  {
    path: PATHS.MANAGEMENT.CATALOG,
    element: <ManagementLayout initialTab="config" />,
  },
  // Backward compatibility alias
  {
    path: PATHS.OPERATIONS,
    element: <Navigate to={PATHS.MANAGEMENT.ROOT} replace />,
  },
];
