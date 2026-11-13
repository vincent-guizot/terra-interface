import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RecordWaterTestDto } from './dto/record-water-test.dto';
import { RecordFishFeedDto } from './dto/record-fish-feed.dto';
import { catfishAerationSchedule } from './catfish-schedule';
import { TilapiaTelemetryService } from './tilapia-telemetry.service';

export interface BioPondItem {
  id: string;
  pondCode: string;
  name: string;
  species: string;
  volumeLiters: number;
  currentStockCount: number;
  averageWeightGrams: number;
  totalBiomassKg: number;
  stockingDensityKgM3: number;
  waterQuality: {
    dissolvedOxygenMgL: number;
    pH: number;
    waterTempC: number;
    ammoniaPpm: number;
    status: 'OPTIMAL' | 'ATTENTION_REQUIRED' | 'CRITICAL';
  };
  feedingProtocol: string;
}

const CANONICAL_PONDS: BioPondItem[] = [
  {
    id: 'pnd-01',
    pondCode: 'PND-01',
    name: 'Tilapia IBC Bio-Floc Tank Alpha',
    species: 'Oreochromis niloticus (Nile Tilapia)',
    volumeLiters: 4000,
    currentStockCount: 442,
    averageWeightGrams: 440,
    totalBiomassKg: 194.5,
    stockingDensityKgM3: 48.6,
    waterQuality: {
      dissolvedOxygenMgL: 6.2,
      pH: 7.2,
      waterTempC: 26.5,
      ammoniaPpm: 0.15,
      status: 'OPTIMAL',
    },
    feedingProtocol: '32% CP Floating Pellets + 30% Duckweed biomass supplement',
  },
  {
    id: 'pnd-02',
    pondCode: 'PND-02',
    name: 'Catfish High-Density Tarpaulin Tank',
    species: 'Clarias gariepinus (African Catfish)',
    volumeLiters: 2500,
    currentStockCount: 300,
    averageWeightGrams: 280,
    totalBiomassKg: 84.0,
    stockingDensityKgM3: 33.6,
    waterQuality: {
      dissolvedOxygenMgL: 5.4,
      pH: 6.9,
      waterTempC: 27.8,
      ammoniaPpm: 0.35,
      status: 'OPTIMAL',
    },
    feedingProtocol: 'Night feeding ration + BSF prepupae live feed',
  },
  {
    id: 'pnd-03',
    pondCode: 'PND-03',
    name: 'Duckweed & Azolla Biomass Basin',
    species: 'Lemna minor & Azolla pinnata',
    volumeLiters: 1000,
    currentStockCount: 0,
    averageWeightGrams: 0,
    totalBiomassKg: 15.0,
    stockingDensityKgM3: 15.0,
    waterQuality: {
      dissolvedOxygenMgL: 7.8,
      pH: 6.8,
      waterTempC: 25.0,
      ammoniaPpm: 0.05,
      status: 'OPTIMAL',
    },
    feedingProtocol: 'Fed by aquaponic nitrifying overflow, harvested daily for chicken/fish feed',
  },
];

@Injectable()
export class AquacultureService {
  private readonly logger = new Logger(AquacultureService.name);
  private waterQualityLogs: Array<any> = [];
  private fishFeedLogs: Array<any> = [];

  constructor(
    private prisma: PrismaService,
    private telemetryService: TilapiaTelemetryService,
  ) {}

  async getPonds(): Promise<BioPondItem[]> {
    try {
      const batches = await this.prisma.batch.findMany({
        where: { domain: 'AQUACULTURE', status: 'ACTIVE' },
        include: { zone: true, aquacultureDetail: true },
      });

      if (batches.length > 0) {
        return batches.map((b) => {
          const volLiters = (b.aquacultureDetail?.pondVolumeM3 || 4) * 1000;
          const avgWeightGrams = 440;
          const totalBiomassKg = Number(((b.currentQuantity * avgWeightGrams) / 1000).toFixed(1));
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
              status: 'OPTIMAL' as const,
            },
            feedingProtocol: 'Pellets & Duckweed',
          };
        });
      }
    } catch (err) {
      this.logger.warn(`Prisma getPonds fallback: ${err.message}`);
    }

    return CANONICAL_PONDS;
  }

  async recordWaterTest(dto: RecordWaterTestDto) {
    const evaluation = this.telemetryService.evaluateWaterQuality({
      dissolvedOxygenMgL: dto.dissolvedOxygenMgL,
      pH: dto.pH,
      waterTempC: dto.waterTempC,
      ammoniaPpm: dto.ammoniaPpm,
      nitratePpm: dto.nitratePpm || 10,
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
      notes: dto.notes || '',
    };

    this.waterQualityLogs.unshift(record);

    try {
      const pond = CANONICAL_PONDS.find((p) => p.pondCode === dto.pondId || p.id === dto.pondId);
      if (pond) {
        pond.waterQuality = {
          dissolvedOxygenMgL: dto.dissolvedOxygenMgL,
          pH: dto.pH,
          waterTempC: dto.waterTempC,
          ammoniaPpm: dto.ammoniaPpm,
          status: evaluation.status as any,
        };
      }
    } catch (err) {
      // ignore
    }

    return record;
  }

  getWaterQuality(pondId?: string) {
    let logs = this.waterQualityLogs;
    if (pondId) {
      logs = logs.filter((l) => l.pondId.toLowerCase() === pondId.toLowerCase());
    }
    if (logs.length === 0) {
      // Default latest reading
      return [
        {
          id: 'wtest-default-01',
          pondId: pondId || 'PND-01',
          testedAt: new Date().toISOString(),
          dissolvedOxygenMgL: 6.2,
          pH: 7.2,
          waterTempC: 26.5,
          ammoniaPpm: 0.15,
          nitritePpm: 0.02,
          nitratePpm: 20.0,
          evaluation: { status: 'OPTIMAL', alerts: [] },
          notes: 'Optimal nitrification cycle in bio-filter media.',
        },
      ];
    }
    return logs;
  }

  async recordFeeding(dto: RecordFishFeedDto) {
    const record = {
      id: `ffeed-${Date.now()}`,
      pondId: dto.pondId,
      fedAt: new Date().toISOString(),
      feedType: dto.feedType,
      amountGrams: dto.amountGrams,
      feedingBehavior: dto.feedingBehavior || 'Aggressive',
      waterTemperatureC: dto.waterTemperatureC || 26.5,
      notes: dto.notes,
    };

    this.fishFeedLogs.unshift(record);
    return record;
  }

  getFishFeedLogs() {
    return this.fishFeedLogs;
  }

  getAerationSchedule() {
    return catfishAerationSchedule;
  }
}
