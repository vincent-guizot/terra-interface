import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Subject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { TelemetryIngestDto } from './dto/telemetry-ingest.dto';
import { DispatchPolicyDto } from './dto/dispatch-policy.dto';
import { BatteryBmsService } from './battery-bms.service';
import { AutonomyForecastService } from './autonomy-forecast.service';
import { activeDumpLoadPolicy } from './dump-load-controller';
import { homesteadCisternConfig, CisternLevelReading } from './cistern-levels.model';
import { PrismaService, prisma } from '../../prisma/prisma.service';

export interface MicrogridAlert {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  category: 'BATTERY' | 'SOLAR' | 'WATER' | 'AQUACULTURE';
  title: string;
  message: string;
  parameterValue: string;
  timestamp: string;
  actionRequired: boolean;
}

export interface DumpLoadStatus {
  isActive: boolean;
  targetAppliance: string;
  excessSolarKw: number;
  runtimeMinutes: number;
  reason: string;
}

export interface TelemetrySnapshot {
  timestamp: string;
  solarGenerationKw: number;
  inverterLoadWatts: number;
  gridImportWatts: number; // 0 for off-grid
  batterySoC: number;
  batteryVoltage: number;
  batteryCurrentAmps: number;
  batteryHealthStatus: string;
  autonomyHours: number;
  cisternTotalLiters: number;
  cisternCapacityLiters: number;
  cisternPercentFull: number;
  waterAutonomyDays: number;
  cisternTanks: CisternLevelReading[];
  dissolvedOxygenMgL: number;
  pH: number;
  waterTemperatureC: number;
  ambientIrradianceWPerM2: number;
  loadSheddingActive: boolean;
  dumpLoad: DumpLoadStatus;
  alerts: MicrogridAlert[];
}

export interface HourlyTelemetryPoint {
  hour: string;
  solarKw: number;
  loadKw: number;
  batterySoC: number;
  cisternLiters: number;
}

@Injectable()
export class EnergyWaterService implements OnModuleInit {
  private readonly logger = new Logger(EnergyWaterService.name);
  private currentSnapshot: TelemetrySnapshot;
  private currentPolicy: DispatchPolicyDto = {
    solarDumpMode: 'EVAPORATIVE_MISTING',
    rainwaterPriority: 'AQUAPONICS_FIRST',
    batteryFloorReservePercent: 20.0,
    stewardName: 'Vincent',
  };
  private readonly telemetrySubject = new Subject<{ data: TelemetrySnapshot }>();
  private historicalBuffer: HourlyTelemetryPoint[] = [];

  constructor(
    private readonly prisma: PrismaService,
    private readonly bmsService: BatteryBmsService,
    private readonly autonomyService: AutonomyForecastService,
  ) {
    this.currentSnapshot = this.generateDiurnalReading(new Date());
    this.buildHistoricalBuffer();
  }

  onModuleInit() {
    this.logger.log('Microgrid & Energy-Water Telemetry Service initialized');
  }

  getLiveSnapshot(): TelemetrySnapshot {
    return this.currentSnapshot;
  }

  getTelemetryStream(): Observable<{ data: TelemetrySnapshot }> {
    return this.telemetrySubject.asObservable();
  }

  getDispatchPolicy(): DispatchPolicyDto {
    return this.currentPolicy;
  }

  updateDispatchPolicy(dto: DispatchPolicyDto): DispatchPolicyDto {
    this.currentPolicy = {
      ...this.currentPolicy,
      ...dto,
    };
    this.logger.log(`Dispatch policy updated: mode=${dto.solarDumpMode}, floor=${dto.batteryFloorReservePercent}%`);
    this.evaluateRulesAndAlerts(this.currentSnapshot);
    this.telemetrySubject.next({ data: this.currentSnapshot });
    return this.currentPolicy;
  }

  getHistoricalTelemetry(hours: number = 24): HourlyTelemetryPoint[] {
    return this.historicalBuffer.slice(-Math.min(hours, 24));
  }

  getDumpLoadStatus(): DumpLoadStatus {
    return this.currentSnapshot.dumpLoad;
  }

  async ingestTelemetry(dto: TelemetryIngestDto): Promise<TelemetrySnapshot> {
    const timestamp = dto.timestamp || new Date().toISOString();
    const batteryVoltage = dto.batteryVoltage || 51.2 + (dto.batterySoC - 50) * 0.04;
    const batteryCurrent = dto.batteryCurrentAmps ?? (dto.solarGenerationKw * 1000 - dto.inverterLoadWatts) / 51.2;

    const bmsEvaluation = this.bmsService.evaluatePackHealth({
      packVoltageV: batteryVoltage,
      packCurrentA: batteryCurrent,
      socPercent: dto.batterySoC,
      cellVoltagesV: new Array(16).fill(batteryVoltage / 16),
      maxCellDeltaV: 0.012,
      temperatureC: 28.5,
      cycleCount: 214,
    });

    const autonomyHrs = this.autonomyService.calculatePowerAutonomyHours(
      15.3,
      dto.batterySoC,
      Math.max(0.4, dto.inverterLoadWatts / 1000),
    );

    const waterDays = this.autonomyService.calculateWaterAutonomyDays(
      dto.cisternLevelLiters,
      450, // 450 L/day homestead consumption
      0,
    );

    const totalCisternCapacity = 12000;
    const cisternPercent = Math.min(100, Math.round((dto.cisternLevelLiters / totalCisternCapacity) * 1000) / 10);

    const tanks: CisternLevelReading[] = [
      {
        tankId: 'tnk-1',
        tankName: 'Cistern #1 (Clean Potable & Nursery)',
        capacityLiters: 4000,
        currentLiters: Math.round(dto.cisternLevelLiters * 0.38),
        percentFull: Math.round((dto.cisternLevelLiters * 0.38 / 4000) * 1000) / 10,
        tdsPpm: 36,
      },
      {
        tankId: 'tnk-2',
        tankName: 'Cistern #2 (Biochar Slow Sand Clarifier)',
        capacityLiters: 4000,
        currentLiters: Math.round(dto.cisternLevelLiters * 0.34),
        percentFull: Math.round((dto.cisternLevelLiters * 0.34 / 4000) * 1000) / 10,
        tdsPpm: 44,
      },
      {
        tankId: 'tnk-3',
        tankName: 'Cistern #3 (Gravity Header Supply)',
        capacityLiters: 4000,
        currentLiters: Math.round(dto.cisternLevelLiters * 0.28),
        percentFull: Math.round((dto.cisternLevelLiters * 0.28 / 4000) * 1000) / 10,
        tdsPpm: 40,
      },
    ];

    const snapshot: TelemetrySnapshot = {
      timestamp,
      solarGenerationKw: dto.solarGenerationKw,
      inverterLoadWatts: dto.inverterLoadWatts,
      gridImportWatts: 0,
      batterySoC: dto.batterySoC,
      batteryVoltage: Math.round(batteryVoltage * 10) / 10,
      batteryCurrentAmps: Math.round(batteryCurrent * 10) / 10,
      batteryHealthStatus: bmsEvaluation.healthStatus,
      autonomyHours: autonomyHrs,
      cisternTotalLiters: dto.cisternLevelLiters,
      cisternCapacityLiters: totalCisternCapacity,
      cisternPercentFull: cisternPercent,
      waterAutonomyDays: waterDays,
      cisternTanks: tanks,
      dissolvedOxygenMgL: dto.dissolvedOxygenMgL ?? this.currentSnapshot.dissolvedOxygenMgL,
      pH: dto.pH ?? this.currentSnapshot.pH,
      waterTemperatureC: dto.waterTemperatureC ?? this.currentSnapshot.waterTemperatureC,
      ambientIrradianceWPerM2: dto.ambientIrradianceWPerM2 ?? Math.round((dto.solarGenerationKw / 5.2) * 1000),
      loadSheddingActive: false,
      dumpLoad: {
        isActive: false,
        targetAppliance: this.currentPolicy.solarDumpMode,
        excessSolarKw: 0,
        runtimeMinutes: 0,
        reason: 'Normal operation',
      },
      alerts: [],
    };

    // Evaluate protection rules & automated control
    this.evaluateRulesAndAlerts(snapshot);

    this.currentSnapshot = snapshot;

    // Persist to Prisma TelemetryReading if DB is connected
    try {
      const zone5 = await this.prisma.zone.findFirst({ where: { code: 'Z-05' } });
      if (zone5) {
        await this.prisma.telemetryReading.create({
          data: {
            zoneId: zone5.id,
            metric: 'SOLAR_KW',
            value: dto.solarGenerationKw,
            unit: 'kW',
          },
        });
      }
    } catch (err) {
      // Graceful fallback for demo/offline
    }

    // Push live snapshot through SSE Stream
    this.telemetrySubject.next({ data: snapshot });

    return snapshot;
  }

  evaluateRulesAndAlerts(snapshot: TelemetrySnapshot) {
    const alerts: MicrogridAlert[] = [];

    // Rule 1: Battery Protection & Load Shedding
    if (snapshot.batterySoC < this.currentPolicy.batteryFloorReservePercent) {
      snapshot.loadSheddingActive = true;
      alerts.push({
        id: `alert-bat-low-${Date.now()}`,
        severity: 'CRITICAL',
        category: 'BATTERY',
        title: 'Critical Low Battery SoC (<20%)',
        message: `Battery level is at ${snapshot.batterySoC}%, below safe reserve floor (${this.currentPolicy.batteryFloorReservePercent}%). Non-essential homestead circuits shed.`,
        parameterValue: `${snapshot.batterySoC}% SoC`,
        timestamp: new Date().toISOString(),
        actionRequired: true,
      });
    } else {
      snapshot.loadSheddingActive = false;
    }

    // Rule 2: Dump Load Trigger (Excess Solar & Full Battery)
    const excessSolar = Math.max(0, snapshot.solarGenerationKw - snapshot.inverterLoadWatts / 1000);
    if (snapshot.batterySoC >= 95.0 && excessSolar >= 2.0) {
      snapshot.dumpLoad = {
        isActive: true,
        targetAppliance: this.currentPolicy.solarDumpMode,
        excessSolarKw: Math.round(excessSolar * 10) / 10,
        runtimeMinutes: 25,
        reason: `Excess solar generation (${Math.round(excessSolar * 10) / 10} kW) with full battery (95%+)`,
      };
      alerts.push({
        id: `alert-dump-active-${Date.now()}`,
        severity: 'INFO',
        category: 'SOLAR',
        title: 'Excess Solar Dump Load Active',
        message: `Directing ${snapshot.dumpLoad.excessSolarKw} kW surplus power to ${snapshot.dumpLoad.targetAppliance}.`,
        parameterValue: `${snapshot.dumpLoad.excessSolarKw} kW Surplus`,
        timestamp: new Date().toISOString(),
        actionRequired: false,
      });
    } else {
      snapshot.dumpLoad = {
        isActive: false,
        targetAppliance: this.currentPolicy.solarDumpMode,
        excessSolarKw: Math.round(excessSolar * 10) / 10,
        runtimeMinutes: 0,
        reason: 'Normal balance',
      };
    }

    // Rule 3: Low Rainwater Cistern Buffer
    if (snapshot.cisternTotalLiters < 2000) {
      alerts.push({
        id: `alert-water-low-${Date.now()}`,
        severity: 'WARNING',
        category: 'WATER',
        title: 'Low Rainwater Storage (< 2,000 L)',
        message: `Rainwater reserve at ${snapshot.cisternTotalLiters} L (< 16.7% capacity). Switch living soil beds to deep mulching conservation mode.`,
        parameterValue: `${snapshot.cisternTotalLiters} L`,
        timestamp: new Date().toISOString(),
        actionRequired: true,
      });
    }

    // Rule 4: Critical Dissolved Oxygen in Aquaponics Bio-Ponds
    if (snapshot.dissolvedOxygenMgL < 5.0) {
      alerts.push({
        id: `alert-do-critical-${Date.now()}`,
        severity: 'CRITICAL',
        category: 'AQUACULTURE',
        title: 'Low Dissolved Oxygen Alert (< 5.0 mg/L)',
        message: `Zone 2 Bio-Pond DO dropped to ${snapshot.dissolvedOxygenMgL} mg/L. Venturi air injection pump triggered automatically.`,
        parameterValue: `${snapshot.dissolvedOxygenMgL} mg/L`,
        timestamp: new Date().toISOString(),
        actionRequired: true,
      });
    }

    snapshot.alerts = alerts;
  }

  generateDiurnalReading(now: Date = new Date()): TelemetrySnapshot {
    const hour = now.getHours() + now.getMinutes() / 60;

    // Diurnal solar curve (Sunrise ~06:00, Peak ~12:00 at ~4.8 kW, Sunset ~18:00)
    let solarKw = 0;
    if (hour >= 6.0 && hour <= 18.0) {
      const sunAngle = ((hour - 6.0) / 12.0) * Math.PI;
      solarKw = Math.round(Math.sin(sunAngle) * 4.9 * 100) / 100;
    }

    // Base homestead load: 450W base nighttime, 850W daytime, 1200W evening dinner
    let loadW = 550;
    if (hour >= 7.0 && hour <= 16.0) {
      loadW = 850;
    } else if (hour > 16.0 && hour <= 21.0) {
      loadW = 1150;
    }

    // Battery SoC cycle: charges daytime up to 98%, discharges nighttime to ~65%
    let batterySoC = 88.0;
    if (hour < 6.0) {
      batterySoC = Math.max(62.0, 75.0 - hour * 2.2);
    } else if (hour <= 13.0) {
      batterySoC = Math.min(98.0, 62.0 + (hour - 6.0) * 5.1);
    } else if (hour <= 17.0) {
      batterySoC = 96.0;
    } else {
      batterySoC = Math.max(72.0, 96.0 - (hour - 17.0) * 4.0);
    }
    batterySoC = Math.round(batterySoC * 10) / 10;

    const batteryVoltage = Math.round((51.2 + (batterySoC - 50) * 0.04) * 10) / 10;
    const netPowerWatts = solarKw * 1000 - loadW;
    const batteryCurrent = Math.round((netPowerWatts / batteryVoltage) * 10) / 10;

    const cisternLiters = 10400;

    const snapshot: TelemetrySnapshot = {
      timestamp: now.toISOString(),
      solarGenerationKw: solarKw,
      inverterLoadWatts: loadW,
      gridImportWatts: 0,
      batterySoC,
      batteryVoltage,
      batteryCurrentAmps: batteryCurrent,
      batteryHealthStatus: 'OPTIMAL',
      autonomyHours: Math.round(((batterySoC / 100) * 15.3 / (loadW / 1000)) * 10) / 10,
      cisternTotalLiters: cisternLiters,
      cisternCapacityLiters: 12000,
      cisternPercentFull: 86.7,
      waterAutonomyDays: 23.1,
      cisternTanks: homesteadCisternConfig,
      dissolvedOxygenMgL: 6.8,
      pH: 7.2,
      waterTemperatureC: 26.5,
      ambientIrradianceWPerM2: Math.round((solarKw / 5.2) * 1000),
      loadSheddingActive: false,
      dumpLoad: {
        isActive: false,
        targetAppliance: this.currentPolicy.solarDumpMode,
        excessSolarKw: 0,
        runtimeMinutes: 0,
        reason: 'Normal balance',
      },
      alerts: [],
    };

    this.evaluateRulesAndAlerts(snapshot);
    return snapshot;
  }

  private buildHistoricalBuffer() {
    this.historicalBuffer = [];
    const now = new Date();

    for (let i = 23; i >= 0; i--) {
      const pastTime = new Date(now.getTime() - i * 3600 * 1000);
      const hourVal = pastTime.getHours();
      let pastSolar = 0;
      if (hourVal >= 6 && hourVal <= 18) {
        pastSolar = Math.round(Math.sin(((hourVal - 6) / 12) * Math.PI) * 4.6 * 10) / 10;
      }
      const pastLoad = hourVal >= 17 && hourVal <= 21 ? 1.15 : hourVal >= 8 && hourVal <= 16 ? 0.85 : 0.52;
      const pastSoc = hourVal >= 12 && hourVal <= 16 ? 96 : hourVal < 6 ? 65 : 82;

      this.historicalBuffer.push({
        hour: `${pastTime.getHours().toString().padStart(2, '0')}:00`,
        solarKw: pastSolar,
        loadKw: pastLoad,
        batterySoC: pastSoc,
        cisternLiters: 10400 - i * 15,
      });
    }
  }
}

export const energyWaterService = new EnergyWaterService(
  prisma,
  new BatteryBmsService(),
  new AutonomyForecastService(),
);
