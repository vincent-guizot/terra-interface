"use strict";

import { CANONICAL_LIVESTOCK } from "../../constants/livestock.constants.js";
import * as prisma_service_1 from "../../prisma/prisma.service.js";
import * as joper_growth_model_1 from "../../constants/livestock/joper-growth.constants.js";
import * as ruminant_paddock_1 from "../../constants/livestock/ruminant-paddock.constants.js";
var LivestockService_1;
let LivestockService = LivestockService_1 = class LivestockService {
  constructor(prisma) {
    this.prisma = prisma;
    this.logger = console;
    this.eggHarvestLogs = [];
    this.feedingLogs = [];
    this.mortalityLogs = [];
  }
  async getAnimals(breed, housingSystem) {
    try {
      const batches = await this.prisma.batch.findMany({
        where: {
          domain: 'LIVESTOCK',
          status: 'ACTIVE'
        },
        include: {
          zone: true,
          livestockDetail: true
        }
      });
      if (batches.length > 0) {
        return batches.map(b => ({
          id: b.id,
          batchCode: b.batchCode,
          name: b.name,
          breed: b.livestockDetail?.breed || 'Ayam KUB',
          species: b.livestockDetail?.breed.includes('Goat') ? 'Capra hircus' : b.livestockDetail?.breed.includes('Sheep') ? 'Ovis aries' : 'Gallus gallus domesticus',
          zoneCode: b.zone.code,
          zoneName: b.zone.name,
          headCount: Math.round(b.currentQuantity),
          housingSystem: b.livestockDetail?.housingSystem || 'Deep Litter Coop',
          status: b.status,
          primaryOutput: 'Eggs & Manure',
          productionRate: `${b.healthIndex ?? 95}% Flock Vitality`
        }));
      }
    } catch (err) {
      this.logger.warn(`Prisma getAnimals fallback: ${err.message}`);
    }
    let items = [...CANONICAL_LIVESTOCK];
    if (breed) {
      items = items.filter(i => i.breed.toLowerCase().includes(breed.toLowerCase()));
    }
    if (housingSystem) {
      items = items.filter(i => i.housingSystem.toLowerCase().includes(housingSystem.toLowerCase()));
    }
    return items;
  }
  async recordEggHarvest(dto) {
    const totalHens = dto.totalHens || 24;
    const hdp = Math.round(dto.eggsCollected / totalHens * 1000) / 10;
    const gradeA = dto.gradeACount ?? Math.max(0, dto.eggsCollected - (dto.crackedCount ?? 0));
    const cracked = dto.crackedCount ?? 0;
    const avgWeight = dto.averageEggWeightGrams || 45.2;
    const totalWeightKg = Number((dto.eggsCollected * avgWeight / 1000).toFixed(2));
    const record = {
      id: `egg-${Date.now()}`,
      batchCode: dto.batchCode,
      date: new Date().toISOString(),
      eggsCollected: dto.eggsCollected,
      gradeACount: gradeA,
      crackedCount: cracked,
      totalHens,
      henDayProductionPercent: hdp,
      averageEggWeightGrams: avgWeight,
      totalWeightKg,
      notes: dto.notes || 'Normal daily egg collection'
    };
    this.eggHarvestLogs.unshift(record);
    try {
      const batch = await this.prisma.batch.findUnique({
        where: {
          batchCode: dto.batchCode
        }
      });
      if (batch) {
        await this.prisma.batchOutput.create({
          data: {
            batchId: batch.id,
            productName: 'Fresh Pastured Eggs',
            quantity: dto.eggsCollected,
            measurementUnit: 'pcs',
            qualityGrade: gradeA > 0 ? 'Grade A' : 'Cracked/Culinary',
            destination: 'Homestead Pantry / Daily Kitchen',
            notes: `HDP: ${hdp}%. Total weight: ${totalWeightKg} kg`
          }
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma recordEggHarvest output fallback: ${err.message}`);
    }
    return record;
  }
  async recordFeeding(dto) {
    const record = {
      id: `feed-${Date.now()}`,
      batchCode: dto.batchCode,
      fedAt: new Date().toISOString(),
      feedType: dto.feedType,
      quantityKg: dto.quantityKg,
      circularPortionPercent: dto.circularPortionPercent ?? 50,
      feedTime: dto.feedTime || 'Ration',
      notes: dto.notes || 'Normal feeding intake'
    };
    this.feedingLogs.unshift(record);
    try {
      const batch = await this.prisma.batch.findUnique({
        where: {
          batchCode: dto.batchCode
        }
      });
      if (batch) {
        await this.prisma.batchEvent.create({
          data: {
            batchId: batch.id,
            eventType: 'FEEDING',
            data: {
              feedType: dto.feedType,
              quantityKg: dto.quantityKg,
              circularPortionPercent: dto.circularPortionPercent ?? 50,
              feedTime: dto.feedTime || 'Ration',
              notes: dto.notes || ''
            },
            recordedBy: 'Vincent'
          }
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma recordFeeding fallback: ${err.message}`);
    }
    return record;
  }
  async recordMortality(dto) {
    const record = {
      id: `mort-${Date.now()}`,
      batchCode: dto.batchCode,
      occurredAt: new Date().toISOString(),
      count: dto.count,
      suspectedCause: dto.suspectedCause,
      disposalMethod: dto.disposalMethod || 'Bokashi Deep Pit',
      notes: dto.notes
    };
    this.mortalityLogs.unshift(record);
    try {
      const batch = await this.prisma.batch.findUnique({
        where: {
          batchCode: dto.batchCode
        }
      });
      if (batch) {
        await this.prisma.batch.update({
          where: {
            id: batch.id
          },
          data: {
            currentQuantity: Math.max(0, batch.currentQuantity - dto.count)
          }
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma recordMortality deduction fallback: ${err.message}`);
    }
    return record;
  }
  getEggHarvestLogs() {
    return this.eggHarvestLogs;
  }
  getFeedingLogs() {
    return this.feedingLogs;
  }
  getGrowthBenchmarks() {
    return joper_growth_model_1.joperStandardBenchmarks;
  }
  getPaddockPlan() {
    return ruminant_paddock_1.activePaddockPlan;
  }
  async getLivestockSummary() {
    return {
      homestead: "Vincent's Farm (300 m² Master Plan)",
      facilities: {
        chickenCoop: {
          id: 'FAC-CHK-01',
          name: 'Chicken Coop (Standalone Poultry)',
          cohorts: [{
            breed: 'Ayam KUB',
            count: 24,
            yield: '21 eggs/day',
            health: 'Excellent'
          }, {
            breed: 'Joper (Jawa Super)',
            count: 30,
            yield: 'Pastured Meat',
            health: 'Healthy'
          }],
          eggProductionToday: 21,
          feedIntakeKgToday: 4.8
        },
        goatBarn: {
          id: 'FAC-GT-01',
          name: 'Goat Barn (Standalone Elevated)',
          cohorts: [{
            breed: 'Kambing Boer / PE Cross',
            count: 4,
            purpose: 'Dairy & Forage Clearing',
            health: 'Vibrant'
          }],
          forageIntakeKgToday: 12.0
        },
        sheepBarn: {
          id: 'FAC-SHP-01',
          name: 'Sheep Barn (Standalone Elevated)',
          cohorts: [{
            breed: 'Domba Garut Silangan',
            count: 4,
            purpose: 'Grassland Regeneration',
            health: 'Excellent'
          }],
          grassIntakeKgToday: 10.5
        }
      },
      mortalityRate: 0.0,
      feedConversionEfficiency: 'Optimal'
    };
  }
};
export { LivestockService };
export default new LivestockService(prisma_service_1.prisma);
