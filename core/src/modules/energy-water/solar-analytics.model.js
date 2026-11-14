"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeDailySolarEfficiency = computeDailySolarEfficiency;
function computeDailySolarEfficiency(readings) {
    if (readings.length === 0)
        return 0;
    const avgKw = readings.reduce((sum, r) => sum + r.totalGenerationKw, 0) / readings.length;
    return Math.round((avgKw / 5.2) * 100);
}
