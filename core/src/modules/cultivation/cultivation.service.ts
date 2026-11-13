import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NutrientDosingDto } from './dto/nutrient-dosing.dto';
import { CreateCropVarietyDto } from './dto/create-crop-variety.dto';
import { PestScoutingDto, organicPestFormulas } from './pest-scouting.dto';
import { standardMicrogreenCalibration } from './microgreen-yield.model';

export interface CropVarietyItem {
  id: string;
  name: string;
  category: string;
  scientificName?: string;
  targetEcMin: number;
  targetEcMax: number;
  targetPhMin: number;
  targetPhMax: number;
  daysToMaturity: number;
  growingMethod: string;
}

const CANONICAL_CROP_CATALOG: CropVarietyItem[] = [
  {
    id: 'crop-bok-choy',
    name: 'Bok Choy White Stem',
    category: 'Leafy Greens',
    scientificName: 'Brassica rapa subsp. chinensis',
    targetEcMin: 1.5,
    targetEcMax: 2.0,
    targetPhMin: 6.0,
    targetPhMax: 6.5,
    daysToMaturity: 30,
    growingMethod: 'NFT_SOLUTION',
  },
  {
    id: 'crop-butterhead',
    name: 'Butterhead Lettuce (Rex)',
    category: 'Leafy Greens',
    scientificName: 'Lactuca sativa var. capitata',
    targetEcMin: 1.2,
    targetEcMax: 1.6,
    targetPhMin: 5.8,
    targetPhMax: 6.4,
    daysToMaturity: 35,
    growingMethod: 'NFT_SOLUTION',
  },
  {
    id: 'crop-genovese-basil',
    name: 'Genovese Sweet Basil',
    category: 'Herbs',
    scientificName: 'Ocimum basilicum',
    targetEcMin: 1.0,
    targetEcMax: 1.4,
    targetPhMin: 5.5,
    targetPhMax: 6.5,
    daysToMaturity: 28,
    growingMethod: 'NFT_SOLUTION',
  },
  {
    id: 'crop-cherry-tomato',
    name: 'Sweet Cherry Tomato',
    category: 'Fruiting Vegetables',
    scientificName: 'Solanum lycopersicum var. cerasiforme',
    targetEcMin: 2.0,
    targetEcMax: 2.8,
    targetPhMin: 5.8,
    targetPhMax: 6.5,
    daysToMaturity: 65,
    growingMethod: 'DUTCH_BUCKET',
  },
  {
    id: 'crop-king-oyster',
    name: 'King Oyster Mushroom',
    category: 'Fungi',
    scientificName: 'Pleurotus eryngii',
    targetEcMin: 0.0,
    targetEcMax: 0.0,
    targetPhMin: 6.0,
    targetPhMax: 7.0,
    daysToMaturity: 25,
    growingMethod: 'SUBSTRATE_BAG',
  },
  {
    id: 'crop-sunflower-microgreen',
    name: 'Black Oil Sunflower Microgreens',
    category: 'Microgreens',
    scientificName: 'Helianthus annuus',
    targetEcMin: 0.8,
    targetEcMax: 1.2,
    targetPhMin: 6.0,
    targetPhMax: 6.8,
    daysToMaturity: 10,
    growingMethod: 'SHALLOW_TRAY',
  },
];

@Injectable()
export class CultivationService {
  private readonly logger = new Logger(CultivationService.name);
  private customVarieties: CropVarietyItem[] = [];
  private scoutingHistory: Array<PestScoutingDto & { id: string; loggedAt: string }> = [];

  constructor(private prisma: PrismaService) {}

  calculateNutrientDosing(dto: NutrientDosingDto) {
    const { ecTarget, currentEc, reservoirLiters, targetPh, currentPh } = dto;
    const ecDeficit = Math.max(0, ecTarget - currentEc);

    // Standard A/B nutrient concentrate ratio: 5mL per 10L per 0.1 mS/cm EC increase
    const concentrateMl = Math.round((ecDeficit / 0.1) * (reservoirLiters / 10) * 5);

    let phAdjustment: { direction: 'NONE' | 'PH_DOWN' | 'PH_UP'; amountMl: number; notes: string } = {
      direction: 'NONE',
      amountMl: 0,
      notes: 'pH is within target buffer',
    };

    if (targetPh !== undefined && currentPh !== undefined) {
      if (currentPh > targetPh + 0.2) {
        const diff = currentPh - targetPh;
        const ml = Math.round(diff * (reservoirLiters / 100) * 15); // ~15ml 85% phosphoric acid per 100L per 1.0 pH unit
        phAdjustment = {
          direction: 'PH_DOWN',
          amountMl: ml,
          notes: `Add ~${ml} mL Phosphoric Acid (pH Down) diluted in 1L rainwater.`,
        };
      } else if (currentPh < targetPh - 0.2) {
        const diff = targetPh - currentPh;
        const ml = Math.round(diff * (reservoirLiters / 100) * 12); // Potassium silicate / KOH
        phAdjustment = {
          direction: 'PH_UP',
          amountMl: ml,
          notes: `Add ~${ml} mL Potassium Hydroxide/Silicate (pH Up) diluted in 1L rainwater.`,
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
      instructions:
        concentrateMl > 0
          ? `Inject ${concentrateMl} mL of Solution A into swirling reservoir, mix 5 minutes, then inject ${concentrateMl} mL of Solution B. Do not combine concentrates raw.`
          : 'Nutrient reservoir is well balanced. Continue normal circulation cycles.',
    };
  }

  async getCatalog(category?: string): Promise<CropVarietyItem[]> {
    const combined = [...CANONICAL_CROP_CATALOG, ...this.customVarieties];
    if (category) {
      return combined.filter((c) => c.category.toLowerCase() === category.toLowerCase());
    }
    return combined;
  }

  async createCropVariety(dto: CreateCropVarietyDto): Promise<CropVarietyItem> {
    const newItem: CropVarietyItem = {
      id: `crop-${Date.now()}`,
      name: dto.name,
      category: dto.category,
      scientificName: dto.scientificName,
      targetEcMin: dto.targetEcMin ?? 1.4,
      targetEcMax: dto.targetEcMax ?? 1.8,
      targetPhMin: dto.targetPhMin ?? 5.8,
      targetPhMax: dto.targetPhMax ?? 6.5,
      daysToMaturity: dto.daysToMaturity ?? 30,
      growingMethod: dto.growingMethod ?? 'NFT_SOLUTION',
    };
    this.customVarieties.push(newItem);
    return newItem;
  }

  async getActiveBatches() {
    try {
      const batches = await this.prisma.batch.findMany({
        where: {
          domain: 'CULTIVATION',
          status: 'ACTIVE',
        },
        include: {
          zone: true,
          cultivationDetail: true,
          outputs: true,
        },
        orderBy: { startDate: 'desc' },
      });

      if (batches.length > 0) {
        return batches;
      }
    } catch (err) {
      this.logger.warn(`Prisma active cultivation batches fallback: ${err.message}`);
    }

    // Canonical demo batch
    return [
      {
        id: 'bat-cult-demo-01',
        batchCode: 'BAT-2026-CUL-01',
        name: 'Spring Greenhouse Bok Choy NFT',
        domain: 'CULTIVATION',
        zone: { code: 'Z-01', name: 'Smart Micro-Greenhouse' },
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
          photoperiodHours: 14,
        },
        outputs: [
          { quantity: 14.5, measurementUnit: 'kg', qualityGrade: 'Grade A', recordedAt: '2026-11-05T08:00:00.000Z' },
          { quantity: 12.0, measurementUnit: 'kg', qualityGrade: 'Grade A', recordedAt: '2026-11-10T08:00:00.000Z' },
        ],
        notes: 'Automated 15-minute NFT nutrient film stream. Zero pest pressure detected under insect screen.',
      },
    ];
  }

  getMicrogreenCalibration() {
    return standardMicrogreenCalibration;
  }

  recordPestScouting(dto: PestScoutingDto) {
    let bioControl = dto.recommendedBioControl;
    if (!bioControl) {
      if (dto.identifiedPest === 'Aphids' || dto.identifiedPest === 'Spider Mites') {
        bioControl = organicPestFormulas.neemOilEmulsion.recipe;
      } else if (dto.identifiedPest === 'Powdery Mildew') {
        bioControl = organicPestFormulas.horsetailDecoction.recipe;
      } else if (dto.identifiedPest === 'Whiteflies' || dto.identifiedPest === 'Fungus Gnats') {
        bioControl = organicPestFormulas.yellowStickyTraps.recipe;
      } else {
        bioControl = organicPestFormulas.garlicChiliExtract.recipe;
      }
    }

    const record = {
      id: `scout-${Date.now()}`,
      ...dto,
      recommendedBioControl: bioControl,
      loggedAt: new Date().toISOString(),
    };
    this.scoutingHistory.unshift(record);
    return record;
  }

  getScoutingHistory() {
    return this.scoutingHistory;
  }

  getOrganicPestRecipes() {
    return organicPestFormulas;
  }
}
