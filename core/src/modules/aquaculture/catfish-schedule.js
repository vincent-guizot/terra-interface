"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catfishAerationSchedule = void 0;
exports.catfishAerationSchedule = {
    pondId: 'pnd-2',
    species: 'African Walking Catfish (Clarias gariepinus)',
    cycles: [
        { start: '22:00', end: '06:00', dutyCyclePercent: 100, rationale: 'Nighttime biological oxygen depletion compensation' },
        { start: '11:00', end: '14:00', dutyCyclePercent: 50, rationale: 'Midday thermal de-stratification' },
    ],
    bioFilterFlushFrequencyDays: 3,
    solidsPurgeTargetLiters: 40,
};
