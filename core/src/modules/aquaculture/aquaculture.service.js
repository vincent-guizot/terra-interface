"use strict";

import { CANONICAL_PONDS } from "../../constants/aquaculture.constants.js";
import * as prisma_service_1 from "../../prisma/prisma.service.js";
import * as catfish_schedule_1 from "../../constants/aquaculture/catfish-schedule.constants.js";
import catfishAerationSchedule from '../../constants/aquaculture/catfish-schedule.constants.js';
var AquacultureService_1;
let AquacultureService = AquacultureService_1 = class AquacultureService {
  constructor(prisma, telemetryService) {
    this.prisma = prisma;
    this.telemetryService = telemetryService;
    this.logger = console;
    this.waterQualityLogs = [];
    this.fishFeedLogs = [];
  }
  async getPonds() {
    try {
      const batches = await this.prisma.batch.findMany({
        where: {
          domain: 'AQUACULTURE',
          status: 'ACTIVE'
        },
        include: {
          zone: true,
          aquacultureDetail: true
        }
      });
      if (batches.length > 0) {
        return batches.map(b => {
          const volLiters = (b.aquacultureDetail?.pondVolumeM3 || 4) * 1000;
          const avgWeightGrams = 440;
          const totalBiomassKg = Number((b.currentQuantity * avgWeightGrams / 1000).toFixed(1));
          const densityKgM3 = Number((totalBiomassKg / (b.aquacultureDetail?.pondVolumeM3 || 4)).toFixed(1));
          return {
            id: b.id,
            pondCode: 'PND-01',
            name: b.name,
            species: b.aquacultureDetail?.species || 'Nile Tilapia',
            volumeLiters: volLiters,
            currentStockCount: Math.round(b.currentQuantity),
            averageWeightGrams: avgWeightGrams,
            totalBiomassKg,
            stockingDensityKgM3: densityKgM3,
            waterQuality: {
              dissolvedOxygenMgL: 6.2,
              pH: 7.2,
              waterTempC: 26.5,
              ammoniaPpm: 0.15,
              status: 'OPTIMAL'
            },
            feedingProtocol: 'Pellets & Duckweed'
          };
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma getPonds fallback: ${err.message}`);
    }
    return CANONICAL_PONDS;
  }
  async recordWaterTest(dto) {
    const evaluation = this.telemetryService.evaluateWaterQuality({
      dissolvedOxygenMgL: dto.dissolvedOxygenMgL,
      pH: dto.pH,
      waterTempC: dto.waterTempC,
      ammoniaPpm: dto.ammoniaPpm,
      nitratePpm: dto.nitratePpm || 10
    });
    const record = {
      id: `wtest-${Date.now()}`,
      pondId: dto.pondId,
      testedAt: new Date().toISOString(),
      dissolvedOxygenMgL: dto.dissolvedOxygenMgL,
      pH: dto.pH,
      waterTempC: dto.waterTempC,
      ammoniaPpm: dto.ammoniaPpm,
      nitritePpm: dto.nitritePpm || 0.05,
      nitratePpm: dto.nitratePpm || 15.0,
      evaluation,
      notes: dto.notes || ''
    };
    this.waterQualityLogs.unshift(record);
    try {
      const pond = CANONICAL_PONDS.find(p => p.pondCode === dto.pondId || p.id === dto.pondId);
      if (pond) {
        pond.waterQuality = {
          dissolvedOxygenMgL: dto.dissolvedOxygenMgL,
          pH: dto.pH,
          waterTempC: dto.waterTempC,
          ammoniaPpm: dto.ammoniaPpm,
          status: evaluation.status
        };
      }
    } catch (err) {}
    return record;
  }
  getWaterQuality(pondId) {
    let logs = this.waterQualityLogs;
    if (pondId) {
      logs = logs.filter(l => l.pondId.toLowerCase() === pondId.toLowerCase());
    }
    if (logs.length === 0) {
      return [{
        id: 'wtest-default-01',
        pondId: pondId || 'PND-01',
        testedAt: new Date().toISOString(),
        dissolvedOxygenMgL: 6.2,
        pH: 7.2,
        waterTempC: 26.5,
        ammoniaPpm: 0.15,
        nitritePpm: 0.02,
        nitratePpm: 20.0,
        evaluation: {
          status: 'OPTIMAL',
          alerts: []
        },
        notes: 'Optimal nitrification cycle in bio-filter media.'
      }];
    }
    return logs;
  }
  async recordFeeding(dto) {
    const record = {
      id: `ffeed-${Date.now()}`,
      pondId: dto.pondId,
      fedAt: new Date().toISOString(),
      feedType: dto.feedType,
      amountGrams: dto.amountGrams,
      feedingBehavior: dto.feedingBehavior || 'Aggressive',
      waterTemperatureC: dto.waterTemperatureC || 26.5,
      notes: dto.notes
    };
    this.fishFeedLogs.unshift(record);
    return record;
  }
  getFishFeedLogs() {
    return this.fishFeedLogs;
  }
  getAerationSchedule() {
    return catfish_schedule_1.catfishAerationSchedule;
  }
  async getSummary() {
    const ponds = await this.getPonds();
    return {
      homestead: "Vincent's Farm (300 m² Master Plan)",
      totalPonds: ponds.length,
      activeBiomassKg: ponds.reduce((acc, p) => acc + (p.totalBiomassKg || 0), 0),
      ponds,
      aerationSchedule: catfishAerationSchedule
    };
  }
};
export { AquacultureService };
export default new AquacultureService(prisma_service_1.prisma);
