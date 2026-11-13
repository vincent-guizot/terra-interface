import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
import { RecordBsfFeedDto } from './dto/record-bsf-feed.dto';
import { RecordMaggotHarvestDto } from './dto/record-maggot-harvest.dto';
import { RecordCompostTurnDto } from './dto/record-compost-turn.dto';
import { RecordCompostHarvestDto } from './dto/record-compost-harvest.dto';
import { activeBsfTrays, BsfBioconversionTray } from './bsf-bioconversion.model';
import { bokashiThermophilicProfile, BokashiTemperatureLog } from './bokashi-temperature.model';
import { MaggotHarvestService, MaggotHarvestRecord } from './maggot-harvest.service';
import { computeCircularityScore, CircularityMetrics } from './circularity-index.calculator';
import { biocharActivationStandards, BiocharQuenchBatch } from './biochar-activation';
import { StockMovementType } from '@prisma/client';

export interface CompostBatchStatus {
  id: string;
  batchCode: string;
  name: string;
  bayNumber: string;
  temperatureC: number;
  edgeTempC: number;
  moisturePercent: number;
  maturityIndex: number; // 0 - 100%
  maturityStage: string;
  turnCount: number;
  recipe: string;
  carbonNitrogenRatio: number;
  biocharPercent: number;
}

const CANONICAL_COMPOST_BATCHES: CompostBatchStatus[] = [
  {
    id: 'cmp-01',
    batchCode: 'BAT-2026-CMP-12',
    name: 'Bokashi Aerobic Hot Pile #12',
    bayNumber: 'Bay 1',
    temperatureC: 62.0,
    edgeTempC: 48.0,
    moisturePercent: 55,
    maturityIndex: 78,
    maturityStage: 'Thermophilic Active Pasteurization (Week 2)',
    turnCount: 3,
    recipe: 'Deep-litter chicken manure + BSF frass + 10% biochar + EM4 inoculant',
    carbonNitrogenRatio: 28.5,
    biocharPercent: 10.0,
  },
  {
    id: 'cmp-02',
    batchCode: 'BAT-2026-CMP-11',
    name: 'Vermicompost & Cured Humus Bay 2',
    bayNumber: 'Bay 2',
    temperatureC: 32.5,
    edgeTempC: 29.0,
    moisturePercent: 62,
    maturityIndex: 96,
    maturityStage: 'Curing & Fungal Conditioning (Ready for Beds)',
    turnCount: 6,
    recipe: 'Pre-digested bokashi + banana stems + crushed eggshells',
    carbonNitrogenRatio: 22.0,
    biocharPercent: 12.5,
  },
];

@Injectable()
export class CircularService {
  private readonly logger = new Logger(CircularService.name);
  private bsfTrays: BsfBioconversionTray[] = [...activeBsfTrays];
  private compostBatches: CompostBatchStatus[] = [...CANONICAL_COMPOST_BATCHES];
  private tempLogs: BokashiTemperatureLog[] = [...bokashiThermophilicProfile];
  private harvestRecords: MaggotHarvestRecord[] = [];

  constructor(
    private readonly prisma: PrismaService,
    private readonly maggotHarvestService: MaggotHarvestService,
    private readonly inventoryService: InventoryService,
  ) {}

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
      bioconversionEfficiency: '16.0% - 18.0% waste-to-protein conversion',
    };
  }

  async getBsfTrays(): Promise<BsfBioconversionTray[]> {
    return this.bsfTrays;
  }

  async recordBsfFeed(dto: RecordBsfFeedDto) {
    let tray = this.bsfTrays.find((t) => t.trayId === dto.trayId || t.batchCode === dto.batchCode);

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
        status: 'Feeding',
      };
      this.bsfTrays.push(tray);
    } else {
      tray.inputFeedKg = Math.round((tray.inputFeedKg + dto.feedWeightKg) * 100) / 100;
      tray.organicScrapType = dto.organicScrapType;
      if (dto.moisturePercent) tray.currentMoisturePercent = dto.moisturePercent;
      if (dto.temperatureC) tray.temperatureC = dto.temperatureC;
    }

    // Persist batch event in Prisma if batch exists
    try {
      const batch = await this.prisma.batch.findUnique({ where: { batchCode: dto.batchCode } });
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
              notes: dto.notes,
            },
            recordedBy: 'Vincent',
          },
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma recordBsfFeed fallback: ${err.message}`);
    }

    return {
      message: `Successfully fed ${dto.feedWeightKg} kg scraps into BSF ${dto.trayId}`,
      tray,
    };
  }

  async recordMaggotHarvest(dto: RecordMaggotHarvestDto) {
    const yieldKg = dto.prepupaeYieldKg;
    const frassKg = dto.frassYieldKg;

    // Use MaggotHarvestService domain logic for protein calculation & default distribution
    const harvestRecord = this.maggotHarvestService.logDailyHarvest(dto.trayId, yieldKg, frassKg);

    // Apply custom allocation if specified
    if (dto.allocatedToPoultryKg !== undefined || dto.allocatedToTilapiaKg !== undefined) {
      harvestRecord.allocatedToPoultryKg = dto.allocatedToPoultryKg ?? 0;
      harvestRecord.allocatedToTilapiaKg = dto.allocatedToTilapiaKg ?? 0;
    }

    this.harvestRecords.unshift(harvestRecord);

    // Update tray status
    const tray = this.bsfTrays.find((t) => t.trayId === dto.trayId || t.batchCode === dto.batchCode);
    if (tray) {
      tray.status = 'Harvest Ready';
    }

    // Auto Ledger Inflows:
    // 1. Live BSF Prepupae (SKU-BSF-01)
    // 2. Insect Frass Bio-fertilizer
    try {
      await this.inventoryService.recordMovement({
        sku: 'SKU-BSF-01',
        type: StockMovementType.HARVEST_IN,
        quantityDelta: yieldKg,
        unit: 'kg',
        referenceBatchCode: dto.batchCode,
        stewardName: 'Vincent',
        notes: `BSF harvest from ${dto.trayId}: ${yieldKg} kg live prepupae (42.4% protein)`,
      });
    } catch (err) {
      this.logger.warn(`Auto inventory intake for live prepupae fallback: ${err.message}`);
    }

    // Persist via Prisma if batch exists
    try {
      const batch = await this.prisma.batch.findUnique({ where: { batchCode: dto.batchCode } });
      if (batch) {
        await this.prisma.batchOutput.create({
          data: {
            batchId: batch.id,
            productName: 'Live BSF Prepupae (42% Protein)',
            quantity: yieldKg,
            measurementUnit: 'kg',
            qualityGrade: 'Grade A Live Feed',
            destination: `Poultry (${harvestRecord.allocatedToPoultryKg}kg) / Tilapia (${harvestRecord.allocatedToTilapiaKg}kg)`,
            notes: dto.notes || `Frass yield: ${frassKg} kg`,
          },
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
              notes: 'Chitin-rich digested frass for microbial inoculation',
            },
          });
        }
      }
    } catch (err) {
      this.logger.warn(`Prisma recordMaggotHarvest fallback: ${err.message}`);
    }

    return {
      message: `Maggot harvest recorded: ${yieldKg} kg prepupae, ${frassKg} kg frass`,
      harvestRecord,
      tray,
    };
  }

  async getCompostBatches(): Promise<CompostBatchStatus[]> {
    return this.compostBatches;
  }

  async recordCompostTurn(dto: RecordCompostTurnDto) {
    let phase: 'Mesophilic' | 'Thermophilic (Active Pasteurization)' | 'Cooling' | 'Curing' = 'Mesophilic';
    if (dto.coreTempC >= 55.0 && dto.coreTempC <= 68.0) {
      phase = 'Thermophilic (Active Pasteurization)';
    } else if (dto.coreTempC >= 40.0) {
      phase = 'Cooling';
    } else if (dto.turnCount >= 4) {
      phase = 'Curing';
    }

    const tempLog: BokashiTemperatureLog = {
      batchCode: dto.batchCode,
      dayOfFermentation: dto.turnCount * 3 + 2,
      coreTempC: dto.coreTempC,
      edgeTempC: dto.edgeTempC,
      ambientTempC: dto.ambientTempC,
      microbialPhase: phase,
    };

    this.tempLogs.unshift(tempLog);

    const batch = this.compostBatches.find((b) => b.batchCode === dto.batchCode || b.bayNumber === dto.bayNumber);
    if (batch) {
      batch.temperatureC = dto.coreTempC;
      batch.edgeTempC = dto.edgeTempC;
      batch.moisturePercent = dto.moisturePercent;
      batch.turnCount = dto.turnCount;
      batch.maturityStage = `${phase} (Turn #${dto.turnCount})`;
      if (dto.biocharAddedKg) {
        batch.biocharPercent = Math.min(20, Math.round((batch.biocharPercent + (dto.biocharAddedKg / 10)) * 10) / 10);
      }
      batch.maturityIndex = Math.min(100, Math.round(batch.maturityIndex + 5));
    }

    // Persist via Prisma if batch exists
    try {
      const dbBatch = await this.prisma.batch.findUnique({ where: { batchCode: dto.batchCode } });
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
              biocharAddedKg: dto.biocharAddedKg,
            },
            recordedBy: 'Vincent',
          },
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma recordCompostTurn fallback: ${err.message}`);
    }

    return {
      message: `Compost turn #${dto.turnCount} recorded in ${dto.bayNumber}. Phase: ${phase} (${dto.coreTempC}°C)`,
      tempLog,
      batchStatus: batch,
    };
  }

  async recordCompostHarvest(dto: RecordCompostHarvestDto) {
    const batch = this.compostBatches.find((b) => b.batchCode === dto.batchCode || b.bayNumber === dto.bayNumber);
    if (batch) {
      batch.maturityIndex = 100;
      batch.maturityStage = 'Fully Cured & Screened Humus';
    }

    // Automated Inventory Intake for Mature Bokashi Humus (SKU-FER-01)
    try {
      await this.inventoryService.recordMovement({
        sku: 'SKU-FER-01',
        type: StockMovementType.HARVEST_IN,
        quantityDelta: dto.curedHumusKg,
        unit: 'kg',
        referenceBatchCode: dto.batchCode,
        stewardName: 'Vincent',
        notes: `Cured mature bokashi humus harvested from ${dto.bayNumber} -> ${dto.destination || 'Zone 4 Keyhole Beds'}`,
      });
    } catch (err) {
      this.logger.warn(`Auto inventory intake for mature humus fallback: ${err.message}`);
    }

    // Persist via Prisma if batch exists
    try {
      const dbBatch = await this.prisma.batch.findUnique({ where: { batchCode: dto.batchCode } });
      if (dbBatch) {
        await this.prisma.batchOutput.create({
          data: {
            batchId: dbBatch.id,
            productName: 'Bokashi Thermophilic Compost Humus',
            quantity: dto.curedHumusKg,
            measurementUnit: 'kg',
            qualityGrade: 'Premium Cured Humus',
            destination: dto.destination || 'Zone 4 Permaculture Raised Beds',
            notes: dto.notes || `Solvita maturity score: ${dto.curedMaturityScore || 96}%`,
          },
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma recordCompostHarvest fallback: ${err.message}`);
    }

    return {
      message: `Harvested ${dto.curedHumusKg} kg cured humus from ${dto.bayNumber}`,
      batchStatus: batch,
    };
  }

  getCircularityMetrics(): CircularityMetrics {
    return computeCircularityScore({
      totalWasteGeneratedKg: 29.5,
      divertedToBsfKg: 15.0,
      divertedToCompostKg: 10.5,
      divertedToMulchKg: 3.0,
      externalLandfillKg: 1.0,
    });
  }

  getBiocharQuenchBatch(): BiocharQuenchBatch {
    return biocharActivationStandards;
  }
}
