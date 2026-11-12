export interface BiocharQuenchBatch {
  kilnBatchId: string;
  feedstockType: 'Bamboo Trimmings' | 'Coffee Husks' | 'Hardwood Branch Prunings';
  pyrolysisTempC: number;
  yieldWeightKg: number;
  quenchingAgent: string; // e.g. Compost tea, fish pond sludge
  activationRestDays: number;
  cecRating: 'High' | 'Very High';
}

export const biocharActivationStandards: BiocharQuenchBatch = {
  kilnBatchId: 'KILN-2026-04',
  feedstockType: 'Bamboo Trimmings',
  pyrolysisTempC: 650,
  yieldWeightKg: 45.0,
  quenchingAgent: 'Aerated Compost Tea + Anaerobic Fish Sludge Emulsion',
  activationRestDays: 14,
  cecRating: 'Very High',
};
