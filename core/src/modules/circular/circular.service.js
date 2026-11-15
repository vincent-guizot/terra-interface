"use strict";

import { CANONICAL_COMPOST_BATCHES } from "../../constants/circular.constants.js";
import * as prisma_service_1 from "../../prisma/prisma.service.js";
import * as inventory_service_1 from "../inventory/inventory.service.js";
import * as bsf_bioconversion_model_1 from "../../constants/circular/bsf-bioconversion.constants.js";
import * as bokashi_temperature_model_1 from "../../constants/circular/bokashi-temperature.constants.js";
import * as circularity_index_calculator_1 from "./circularity-index.calculator.js";
import * as biochar_activation_1 from "../../constants/circular/biochar-activation.constants.js";
import * as client_1 from "@prisma/client";
import maggotHarvestService from './maggot-harvest.service.js';
var CircularService_1;
let CircularService = CircularService_1 = class CircularService {
  constructor(prisma, maggotHarvestService, inventoryService) {
    this.prisma = prisma;
    this.maggotHarvestService = maggotHarvestService;
    this.inventoryService = inventoryService;
    this.logger = console;
    this.bsfTrays = [...bsf_bioconversion_model_1.activeBsfTrays];
    this.compostBatches = [...CANONICAL_COMPOST_BATCHES];
    this.tempLogs = [...bokashi_temperature_model_1.bokashiThermophilicProfile];
    this.harvestRecords = [];
  }
  async getCircularOverview() {
    const totalInputBsfKg = this.bsfTrays.reduce((acc, t) => acc + t.inputFeedKg, 0);
    const metrics = this.getCircularityMetrics();
    return {
      activeBsfTraysCount: this.bsfTrays.length,
      totalBsfBiomassDigestingKg: totalInputBsfKg,
      dailyLiveProteinYieldKg: 1.8,
      compostBaysActive: this.compostBatches.length,
      totalMatureHumusReadyKg: 480.0,
      circularityScorePercent: metrics.circularityScorePercent,
      closedLoopTarget: '>= 95.0%',
      bioconversionEfficiency: '16.0% - 18.0% waste-to-protein conversion'
    };
  }
  async getBsfTrays() {
    return this.bsfTrays;
  }
  async recordBsfFeed(dto) {
    let tray = this.bsfTrays.find(t => t.trayId === dto.trayId || t.batchCode === dto.batchCode);
    if (!tray) {
      tray = {
        trayId: dto.trayId,
        batchCode: dto.batchCode,
        inoculationDate: new Date().toISOString().split('T')[0],
        dolWeightGrams: 10.0,
        organicScrapType: dto.organicScrapType,
        inputFeedKg: dto.feedWeightKg,
        currentMoisturePercent: dto.moisturePercent || 68,
        temperatureC: dto.temperatureC || 36.0,
        status: 'Feeding'
      };
      this.bsfTrays.push(tray);
    } else {
      tray.inputFeedKg = Math.round((tray.inputFeedKg + dto.feedWeightKg) * 100) / 100;
      tray.organicScrapType = dto.organicScrapType;
      if (dto.moisturePercent) tray.currentMoisturePercent = dto.moisturePercent;
      if (dto.temperatureC) tray.temperatureC = dto.temperatureC;
    }
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
            eventType: 'BSF_FEED_INTAKE',
            data: {
              trayId: dto.trayId,
              scrapType: dto.organicScrapType,
              weightKg: dto.feedWeightKg,
              moisturePercent: dto.moisturePercent,
              temperatureC: dto.temperatureC,
              notes: dto.notes
            },
            recordedBy: 'Vincent'
          }
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma recordBsfFeed fallback: ${err.message}`);
    }
    return {
      message: `Successfully fed ${dto.feedWeightKg} kg scraps into BSF ${dto.trayId}`,
      tray
    };
  }
  async recordMaggotHarvest(dto) {
    const yieldKg = dto.prepupaeYieldKg;
    const frassKg = dto.frassYieldKg;
    const harvestRecord = this.maggotHarvestService.logDailyHarvest(dto.trayId, yieldKg, frassKg);
    if (dto.allocatedToPoultryKg !== undefined || dto.allocatedToTilapiaKg !== undefined) {
      harvestRecord.allocatedToPoultryKg = dto.allocatedToPoultryKg ?? 0;
      harvestRecord.allocatedToTilapiaKg = dto.allocatedToTilapiaKg ?? 0;
    }
    this.harvestRecords.unshift(harvestRecord);
    const tray = this.bsfTrays.find(t => t.trayId === dto.trayId || t.batchCode === dto.batchCode);
    if (tray) {
      tray.status = 'Harvest Ready';
    }
    try {
      await this.inventoryService.recordMovement({
        sku: 'SKU-BSF-01',
        type: client_1.StockMovementType.HARVEST_IN,
        quantityDelta: yieldKg,
        unit: 'kg',
        referenceBatchCode: dto.batchCode,
        stewardName: 'Vincent',
        notes: `BSF harvest from ${dto.trayId}: ${yieldKg} kg live prepupae (42.4% protein)`
      });
    } catch (err) {
      this.logger.warn(`Auto inventory intake for live prepupae fallback: ${err.message}`);
    }
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
            productName: 'Live BSF Prepupae (42% Protein)',
            quantity: yieldKg,
            measurementUnit: 'kg',
            qualityGrade: 'Grade A Live Feed',
            destination: `Poultry (${harvestRecord.allocatedToPoultryKg}kg) / Tilapia (${harvestRecord.allocatedToTilapiaKg}kg)`,
            notes: dto.notes || `Frass yield: ${frassKg} kg`
          }
        });
        if (frassKg > 0) {
          await this.prisma.batchOutput.create({
            data: {
              batchId: batch.id,
              productName: 'Insect Frass Bio-fertilizer',
              quantity: frassKg,
              measurementUnit: 'kg',
              qualityGrade: 'Standard Organic',
              destination: 'Zone 4 Bokashi Compost Bays',
              notes: 'Chitin-rich digested frass for microbial inoculation'
            }
          });
        }
      }
    } catch (err) {
      this.logger.warn(`Prisma recordMaggotHarvest fallback: ${err.message}`);
    }
    return {
      message: `Maggot harvest recorded: ${yieldKg} kg prepupae, ${frassKg} kg frass`,
      harvestRecord,
      tray
    };
  }
  async getCompostBatches() {
    return this.compostBatches;
  }
  async recordCompostTurn(dto) {
    let phase = 'Mesophilic';
    if (dto.coreTempC >= 55.0 && dto.coreTempC <= 68.0) {
      phase = 'Thermophilic (Active Pasteurization)';
    } else if (dto.coreTempC >= 40.0) {
      phase = 'Cooling';
    } else if (dto.turnCount >= 4) {
      phase = 'Curing';
    }
    const tempLog = {
      batchCode: dto.batchCode,
      dayOfFermentation: dto.turnCount * 3 + 2,
      coreTempC: dto.coreTempC,
      edgeTempC: dto.edgeTempC,
      ambientTempC: dto.ambientTempC,
      microbialPhase: phase
    };
    this.tempLogs.unshift(tempLog);
    const batch = this.compostBatches.find(b => b.batchCode === dto.batchCode || b.bayNumber === dto.bayNumber);
    if (batch) {
      batch.temperatureC = dto.coreTempC;
      batch.edgeTempC = dto.edgeTempC;
      batch.moisturePercent = dto.moisturePercent;
      batch.turnCount = dto.turnCount;
      batch.maturityStage = `${phase} (Turn #${dto.turnCount})`;
      if (dto.biocharAddedKg) {
        batch.biocharPercent = Math.min(20, Math.round((batch.biocharPercent + dto.biocharAddedKg / 10) * 10) / 10);
      }
      batch.maturityIndex = Math.min(100, Math.round(batch.maturityIndex + 5));
    }
    try {
      const dbBatch = await this.prisma.batch.findUnique({
        where: {
          batchCode: dto.batchCode
        }
      });
      if (dbBatch) {
        await this.prisma.batchEvent.create({
          data: {
            batchId: dbBatch.id,
            eventType: 'COMPOST_TURN',
            data: {
              bayNumber: dto.bayNumber,
              coreTempC: dto.coreTempC,
              edgeTempC: dto.edgeTempC,
              turnCount: dto.turnCount,
              moisturePercent: dto.moisturePercent,
              phase,
              biocharAddedKg: dto.biocharAddedKg
            },
            recordedBy: 'Vincent'
          }
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma recordCompostTurn fallback: ${err.message}`);
    }
    return {
      message: `Compost turn #${dto.turnCount} recorded in ${dto.bayNumber}. Phase: ${phase} (${dto.coreTempC}°C)`,
      tempLog,
      batchStatus: batch
    };
  }
  async recordCompostHarvest(dto) {
    const batch = this.compostBatches.find(b => b.batchCode === dto.batchCode || b.bayNumber === dto.bayNumber);
    if (batch) {
      batch.maturityIndex = 100;
      batch.maturityStage = 'Fully Cured & Screened Humus';
    }
    try {
      await this.inventoryService.recordMovement({
        sku: 'SKU-FER-01',
        type: client_1.StockMovementType.HARVEST_IN,
        quantityDelta: dto.curedHumusKg,
        unit: 'kg',
        referenceBatchCode: dto.batchCode,
        stewardName: 'Vincent',
        notes: `Cured mature bokashi humus harvested from ${dto.bayNumber} -> ${dto.destination || 'Zone 4 Keyhole Beds'}`
      });
    } catch (err) {
      this.logger.warn(`Auto inventory intake for mature humus fallback: ${err.message}`);
    }
    try {
      const dbBatch = await this.prisma.batch.findUnique({
        where: {
          batchCode: dto.batchCode
        }
      });
      if (dbBatch) {
        await this.prisma.batchOutput.create({
          data: {
            batchId: dbBatch.id,
            productName: 'Bokashi Thermophilic Compost Humus',
            quantity: dto.curedHumusKg,
            measurementUnit: 'kg',
            qualityGrade: 'Premium Cured Humus',
            destination: dto.destination || 'Zone 4 Permaculture Raised Beds',
            notes: dto.notes || `Solvita maturity score: ${dto.curedMaturityScore || 96}%`
          }
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma recordCompostHarvest fallback: ${err.message}`);
    }
    return {
      message: `Harvested ${dto.curedHumusKg} kg cured humus from ${dto.bayNumber}`,
      batchStatus: batch
    };
  }
  getCircularityMetrics() {
    return (0, circularity_index_calculator_1.computeCircularityScore)({
      totalWasteGeneratedKg: 29.5,
      divertedToBsfKg: 15.0,
      divertedToCompostKg: 10.5,
      divertedToMulchKg: 3.0,
      externalLandfillKg: 1.0
    });
  }
  getBiocharQuenchBatch() {
    return biochar_activation_1.biocharActivationStandards;
  }
  async getThermophilicProfile() {
    return this.tempLogs;
  }
};
export { CircularService };
export default new CircularService(prisma_service_1.prisma, maggotHarvestService, inventory_service_1.inventoryService);
