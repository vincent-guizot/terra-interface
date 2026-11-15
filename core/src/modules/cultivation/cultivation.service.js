"use strict";

import { CANONICAL_CROP_CATALOG } from "../../constants/cultivation.constants.js";
import * as prisma_service_1 from "../../prisma/prisma.service.js";
import * as pest_scouting_dto_1 from "../../constants/cultivation/pest-control.constants.js";
import * as microgreen_yield_model_1 from "../../constants/cultivation/microgreen-yield.constants.js";
var CultivationService_1;
let CultivationService = CultivationService_1 = class CultivationService {
  constructor(prisma) {
    this.prisma = prisma;
    this.logger = console;
    this.customVarieties = [];
    this.scoutingHistory = [];
  }
  calculateNutrientDosing(dto) {
    const {
      ecTarget,
      currentEc,
      reservoirLiters,
      targetPh,
      currentPh
    } = dto;
    const ecDeficit = Math.max(0, ecTarget - currentEc);
    const concentrateMl = Math.round(ecDeficit / 0.1 * (reservoirLiters / 10) * 5);
    let phAdjustment = {
      direction: 'NONE',
      amountMl: 0,
      notes: 'pH is within target buffer'
    };
    if (targetPh !== undefined && currentPh !== undefined) {
      if (currentPh > targetPh + 0.2) {
        const diff = currentPh - targetPh;
        const ml = Math.round(diff * (reservoirLiters / 100) * 15);
        phAdjustment = {
          direction: 'PH_DOWN',
          amountMl: ml,
          notes: `Add ~${ml} mL Phosphoric Acid (pH Down) diluted in 1L rainwater.`
        };
      } else if (currentPh < targetPh - 0.2) {
        const diff = targetPh - currentPh;
        const ml = Math.round(diff * (reservoirLiters / 100) * 12);
        phAdjustment = {
          direction: 'PH_UP',
          amountMl: ml,
          notes: `Add ~${ml} mL Potassium Hydroxide/Silicate (pH Up) diluted in 1L rainwater.`
        };
      }
    }
    return {
      solutionAPumpMl: concentrateMl,
      solutionBPumpMl: concentrateMl,
      targetEc: ecTarget,
      currentEc,
      ecDeficit: Number(ecDeficit.toFixed(2)),
      reservoirLiters,
      phAdjustment,
      status: ecDeficit > 0.3 ? 'CORRECTION_REQUIRED' : ecDeficit > 0 ? 'MINOR_DEFICIT' : 'BALANCED',
      instructions: concentrateMl > 0 ? `Inject ${concentrateMl} mL of Solution A into swirling reservoir, mix 5 minutes, then inject ${concentrateMl} mL of Solution B. Do not combine concentrates raw.` : 'Nutrient reservoir is well balanced. Continue normal circulation cycles.'
    };
  }
  async getCatalog(category) {
    const combined = [...CANONICAL_CROP_CATALOG, ...this.customVarieties];
    if (category) {
      return combined.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    return combined;
  }
  async createCropVariety(dto) {
    const newItem = {
      id: `crop-${Date.now()}`,
      name: dto.name,
      category: dto.category,
      scientificName: dto.scientificName,
      targetEcMin: dto.targetEcMin ?? 1.4,
      targetEcMax: dto.targetEcMax ?? 1.8,
      targetPhMin: dto.targetPhMin ?? 5.8,
      targetPhMax: dto.targetPhMax ?? 6.5,
      daysToMaturity: dto.daysToMaturity ?? 30,
      growingMethod: dto.growingMethod ?? 'NFT_SOLUTION'
    };
    this.customVarieties.push(newItem);
    return newItem;
  }
  async getActiveBatches() {
    try {
      const batches = await this.prisma.batch.findMany({
        where: {
          domain: 'CULTIVATION',
          status: 'ACTIVE'
        },
        include: {
          zone: true,
          cultivationDetail: true,
          outputs: true
        },
        orderBy: {
          startDate: 'desc'
        }
      });
      if (batches.length > 0) {
        return batches;
      }
    } catch (err) {
      this.logger.warn(`Prisma active cultivation batches fallback: ${err.message}`);
    }
    return [{
      id: 'bat-cult-demo-01',
      batchCode: 'BAT-2026-CUL-01',
      name: 'Spring Greenhouse Bok Choy NFT',
      domain: 'CULTIVATION',
      zone: {
        code: 'Z-01',
        name: 'Smart Micro-Greenhouse'
      },
      status: 'ACTIVE',
      startDate: '2026-10-22T00:00:00.000Z',
      expectedEndDate: '2026-11-20T00:00:00.000Z',
      initialQuantity: 120,
      currentQuantity: 95,
      measurementUnit: 'heads',
      healthIndex: 98,
      cultivationDetail: {
        growingMedium: 'NFT_SOLUTION',
        channelId: 'NFT-Gully-Alpha',
        ecTarget: 1.6,
        phTarget: 6.2,
        waterTempTargetC: 22.5,
        photoperiodHours: 14
      },
      outputs: [{
        quantity: 14.5,
        measurementUnit: 'kg',
        qualityGrade: 'Grade A',
        recordedAt: '2026-11-05T08:00:00.000Z'
      }, {
        quantity: 12.0,
        measurementUnit: 'kg',
        qualityGrade: 'Grade A',
        recordedAt: '2026-11-10T08:00:00.000Z'
      }],
      notes: 'Automated 15-minute NFT nutrient film stream. Zero pest pressure detected under insect screen.'
    }];
  }
  getMicrogreenCalibration() {
    return microgreen_yield_model_1.standardMicrogreenCalibration;
  }
  recordPestScouting(dto) {
    let bioControl = dto.recommendedBioControl;
    if (!bioControl) {
      if (dto.identifiedPest === 'Aphids' || dto.identifiedPest === 'Spider Mites') {
        bioControl = pest_scouting_dto_1.organicPestFormulas.neemOilEmulsion.recipe;
      } else if (dto.identifiedPest === 'Powdery Mildew') {
        bioControl = pest_scouting_dto_1.organicPestFormulas.horsetailDecoction.recipe;
      } else if (dto.identifiedPest === 'Whiteflies' || dto.identifiedPest === 'Fungus Gnats') {
        bioControl = pest_scouting_dto_1.organicPestFormulas.yellowStickyTraps.recipe;
      } else {
        bioControl = pest_scouting_dto_1.organicPestFormulas.garlicChiliExtract.recipe;
      }
    }
    const record = {
      id: `scout-${Date.now()}`,
      ...dto,
      recommendedBioControl: bioControl,
      loggedAt: new Date().toISOString()
    };
    this.scoutingHistory.unshift(record);
    return record;
  }
  getScoutingHistory() {
    return this.scoutingHistory;
  }
  getOrganicPestRecipes() {
    return pest_scouting_dto_1.organicPestFormulas;
  }
  async getCultivationSummary() {
    return {
      activeBatches: 3,
      totalYieldKgMtd: 38.1,
      facilities: [{
        id: 'FAC-HYD-01',
        name: 'Hydroponic / Vertical Garden',
        currentCrop: 'Bok Choy White Stem',
        ec: 1.6,
        ph: 6.2
      }, {
        id: 'FAC-MSH-01',
        name: 'Mushroom House',
        currentCrop: 'Grey Oyster Mushroom',
        tempC: 24.2,
        rhPercent: 88
      }, {
        id: 'FAC-PFT-01',
        name: 'TOGA Garden',
        currentCrop: 'Ginger & Turmeric Permaculture',
        soilMoisture: 36
      }],
      upcomingHarvests: [{
        crop: 'Bok Choy White Stem',
        estKg: 12.5,
        daysRemaining: 5
      }, {
        crop: 'Oyster Mushrooms',
        estKg: 4.2,
        daysRemaining: 2
      }]
    };
  }
};
export { CultivationService };
export default new CultivationService(prisma_service_1.prisma);
