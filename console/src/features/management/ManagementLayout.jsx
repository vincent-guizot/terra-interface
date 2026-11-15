import React from 'react';
import { useLocation } from 'react-router-dom';
import OperationsHub from './OperationsHub.jsx';

/**
 * ManagementLayout
 * Serves as the nested route container for all 7 homestead management domain modules.
 * Synchronizes child routes (/management/cultivation, /management/livestock, etc.)
 */
export default function ManagementLayout({ initialTab = null }) {
  const location = useLocation();

  // Determine active tab based on route pathname
  const getTabFromPath = () => {
    if (initialTab) return initialTab;
    const path = location.pathname;
    if (path.includes('livestock')) return 'livestock';
    if (path.includes('aquaculture')) return 'aquaculture';
    if (path.includes('circular')) return 'circular';
    if (path.includes('inventory')) return 'inventory';
    if (path.includes('energy-water')) return 'energy-water';
    if (path.includes('catalog')) return 'config';
    return 'cultivation';
  };

  const activeTab = getTabFromPath();

  // If a child outlet is rendered or standalone OperationsHub is loaded
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <OperationsHub forcedTab={activeTab} />
    </div>
  );
}
