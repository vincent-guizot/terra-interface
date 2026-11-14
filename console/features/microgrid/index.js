// Microgrid & Energy-Water Feature Module — Terra Interface
export const MICROGRID_DOMAIN = 'MICROGRID';

export const MICROGRID_THRESHOLDS = {
  BATTERY_LOW_CUTOFF_PERCENT: 20.0,
  BATTERY_DUMP_LOAD_TRIGGER_PERCENT: 95.0,
  CISTERN_LOW_RESERVE_LITERS: 2000,
  DISSOLVED_OXYGEN_MIN_MG_L: 5.0,
};

export { default as ConfigureDispatchPolicyDrawer } from './drawers/ConfigureDispatchPolicyDrawer';
export { default as ManualTelemetryIngestDrawer } from './drawers/ManualTelemetryIngestDrawer';
