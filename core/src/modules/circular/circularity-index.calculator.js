export function computeCircularityScore(metrics) {
  const recycledTotal = (metrics.divertedToBsfKg || 0) + (metrics.divertedToCompostKg || 0) + (metrics.divertedToMulchKg || 0);
  const total = Math.max(1, metrics.totalWasteGeneratedKg || 100);
  const score = recycledTotal / total * 100;
  return {
    ...metrics,
    circularityScorePercent: Math.round(score * 10) / 10
  };
}
export default computeCircularityScore;
