"use strict";

function calculateHenDayProduction(hens, eggs, feedKg) {
  return {
    date: new Date().toISOString().split('T')[0],
    totalHens: hens,
    eggsCollected: eggs,
    brokenEggs: 0,
    henDayProductionPercent: Math.round(eggs / hens * 1000) / 10,
    averageEggWeightGrams: 45.2,
    feedConsumedKg: feedKg
  };
}
export { calculateHenDayProduction };
