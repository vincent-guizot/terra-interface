"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeCircularityScore = computeCircularityScore;
function computeCircularityScore(metrics) {
    const recycledTotal = metrics.divertedToBsfKg + metrics.divertedToCompostKg + metrics.divertedToMulchKg;
    const score = (recycledTotal / Math.max(1, metrics.totalWasteGeneratedKg)) * 100;
    return {
        ...metrics,
        circularityScorePercent: Math.round(score * 10) / 10,
    };
}
