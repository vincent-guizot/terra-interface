// Circular Systems Feature Module (BSF & Bokashi Compost) — Terra Interface
export const CIRCULAR_DOMAIN = 'CIRCULAR';

export const CIRCULAR_TARGETS = {
  BSF_BIOCONVERSION_EFFICIENCY: 0.18, // 18% wet waste to prepupae
  COMPOST_CN_RATIO_TARGET: 30.0,
  COMPOST_PEAK_TEMP_C: 60.0,
};

export { default as RecordBsfFeedDrawer } from './drawers/RecordBsfFeedDrawer';
export { default as RecordMaggotHarvestDrawer } from './drawers/RecordMaggotHarvestDrawer';
export { default as RecordCompostTurnDrawer } from './drawers/RecordCompostTurnDrawer';
