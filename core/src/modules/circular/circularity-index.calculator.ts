export interface CircularityMetrics {
  totalWasteGeneratedKg: number;
  divertedToBsfKg: number;
  divertedToCompostKg: number;
  divertedToMulchKg: number;
  externalLandfillKg: number;
  circularityScorePercent: number;
}

export function computeCircularityScore(metrics: Omit<CircularityMetrics, 'circularityScorePercent'>): CircularityMetrics {
  const recycledTotal = metrics.divertedToBsfKg + metrics.divertedToCompostKg + metrics.divertedToMulchKg;
  const score = (recycledTotal / Math.max(1, metrics.totalWasteGeneratedKg)) * 100;

  return {
    ...metrics,
    circularityScorePercent: Math.round(score * 10) / 10,
  };
}
