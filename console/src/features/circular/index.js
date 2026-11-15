import { CIRCULAR_TARGETS } from "../../data/circular/domain.data.js";
// Circular Systems Feature Module (BSF & Bokashi Compost) — Terra Interface
export const CIRCULAR_DOMAIN = 'CIRCULAR';
export { CIRCULAR_TARGETS };
export { default as RecordBsfFeedDrawer } from './drawers/RecordBsfFeedDrawer.js';
export { default as RecordMaggotHarvestDrawer } from './drawers/RecordMaggotHarvestDrawer.js';
export { default as RecordCompostTurnDrawer } from './drawers/RecordCompostTurnDrawer.js';
