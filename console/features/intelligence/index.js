// Terra AI Intelligence Feature Module — Terra Interface
export const INTELLIGENCE_DOMAIN = 'INTELLIGENCE';

export const AUTONOMY_THRESHOLDS = {
  EXCELLENT: 90.0,
  GOOD: 75.0,
  MODERATE: 50.0,
  CRITICAL: 30.0,
};

export { default as PlantDiagnosisDrawer } from './drawers/PlantDiagnosisDrawer';
export { default as AutonomyAuditDrawer } from './drawers/AutonomyAuditDrawer';
