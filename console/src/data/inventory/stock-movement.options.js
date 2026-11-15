export const MOVEMENT_TYPES = [{
  value: 'PURCHASE_IN',
  label: 'PURCHASE_IN (Supplier / External Intake)',
  isInflow: true
}, {
  value: 'HARVEST_IN',
  label: 'HARVEST_IN (Fresh Batch Output)',
  isInflow: true
}, {
  value: 'FEEDING_OUT',
  label: 'FEEDING_OUT (Livestock / Fish Feeding Ration)',
  isInflow: false
}, {
  value: 'BATCH_CONSUME_OUT',
  label: 'BATCH_CONSUME_OUT (Seeds / Trays Sown)',
  isInflow: false
}, {
  value: 'MORTALITY_LOSS_OUT',
  label: 'MORTALITY_LOSS_OUT (Health Loss)',
  isInflow: false
}, {
  value: 'WASTE_OUT',
  label: 'WASTE_OUT (Damaged / Discarded Material)',
  isInflow: false
}, {
  value: 'INTERNAL_TRANSFER',
  label: 'INTERNAL_TRANSFER (Relocate Storage)',
  isInflow: null
}, {
  value: 'CYCLE_COUNT_ADJUSTMENT',
  label: 'CYCLE_COUNT_ADJUSTMENT (Audit Reconciliation)',
  isInflow: null
}];
