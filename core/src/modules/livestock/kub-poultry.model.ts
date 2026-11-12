export interface KubHenDayMetrics {
  date: string;
  totalHens: number;
  eggsCollected: number;
  brokenEggs: number;
  henDayProductionPercent: number; // (eggsCollected / totalHens) * 100
  averageEggWeightGrams: number;
  feedConsumedKg: number;
}

export function calculateHenDayProduction(hens: number, eggs: number, feedKg: number): KubHenDayMetrics {
  return {
    date: new Date().toISOString().split('T')[0],
    totalHens: hens,
    eggsCollected: eggs,
    brokenEggs: 0,
    henDayProductionPercent: Math.round((eggs / hens) * 1000) / 10,
    averageEggWeightGrams: 45.2, // KUB standard
    feedConsumedKg: feedKg,
  };
}
