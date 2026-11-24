import { homesteadProfile, resourcesData } from '../data/homestead/index.js';
import { ApiClient } from './apiClient.js';

export class TelemetryService {
  static async getLiveSnapshot() {
    try {
      return await ApiClient.get('/telemetry/live');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return this.getDemoTelemetrySnapshot();
      }
      throw err;
    }
  }

  static async getLiveHomesteadTelemetry() {
    try {
      const live = await this.getLiveSnapshot();
      if (live) {
        return {
          profile: homesteadProfile,
          energy: {
            ...resourcesData.energy,
            currentGenerationKw: live.solarGenerationKw,
            currentConsumptionKw: Math.round((live.inverterLoadWatts / 1000) * 100) / 100,
            batterySoC: live.batterySoC,
            autonomyHours: live.autonomyHours,
            dumpLoadActive: live.dumpLoad?.isActive || false,
          },
          water: {
            ...resourcesData.water,
            currentStorageLiters: live.cisternTotalLiters,
            storagePercent: live.cisternPercentFull,
            autonomyDays: live.waterAutonomyDays,
          },
          circularScore: homesteadProfile.overallAutonomy,
          alerts: live.alerts || [],
          timestamp: live.timestamp,
        };
      }
    } catch (err) {
      // Fallback below
    }

    return {
      profile: homesteadProfile,
      energy: resourcesData.energy,
      water: resourcesData.water,
      circularScore: homesteadProfile.overallAutonomy,
      alerts: [],
      timestamp: new Date().toISOString(),
    };
  }

  static async ingestTelemetry(packet) {
    try {
      return await ApiClient.post('/telemetry/ingest', packet);
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          ...this.getDemoTelemetrySnapshot(),
          ...packet,
          timestamp: new Date().toISOString(),
        };
      }
      throw err;
    }
  }

  static async getHistoricalTelemetry(hours = 24) {
    try {
      return await ApiClient.get('/telemetry/historical', { hours });
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return Array.from({ length: hours }, (_, i) => {
          const h = (24 - hours + i) % 24;
          const isSun = h >= 6 && h <= 18;
          return {
            hour: `${h.toString().padStart(2, '0')}:00`,
            solarKw: isSun ? Math.round(Math.sin(((h - 6) / 12) * Math.PI) * 4.5 * 10) / 10 : 0,
            loadKw: h >= 17 && h <= 21 ? 1.2 : 0.8,
            batterySoC: isSun ? Math.min(98, 65 + (h - 6) * 3) : Math.max(65, 85 - (h > 18 ? h - 18 : h + 6) * 1.5),
            cisternLiters: 10400,
          };
        });
      }
      throw err;
    }
  }

  static async getDispatchPolicy() {
    try {
      return await ApiClient.get('/telemetry/policy');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          solarDumpMode: 'EVAPORATIVE_MISTING',
          rainwaterPriority: 'AQUAPONICS_FIRST',
          batteryFloorReservePercent: 20.0,
          stewardName: 'Vincent',
        };
      }
      throw err;
    }
  }

  static async updateDispatchPolicy(policy) {
    try {
      return await ApiClient.request('/telemetry/policy', { method: 'PUT', body: JSON.stringify(policy) });
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          ...policy,
          stewardName: policy.stewardName || 'Vincent',
        };
      }
      throw err;
    }
  }

  static subscribeToTelemetryStream(onData, onError) {
    if (typeof window === 'undefined') return () => {};

    const url = `${ApiClient.getBaseUrl()}/telemetry/stream`;
    let eventSource;
    let retry;
    function connect() {
      eventSource = new EventSource(url);
      eventSource.onmessage = event => {
        try {
          onData(JSON.parse(event.data));
        } catch (error) {
          console.error('[SSE Parse Error]', error);
        }
      };
      eventSource.onerror = () => {
        onError();
        // Native EventSource reconnects while CONNECTING, but not after a terminal response.
        if (eventSource.readyState === EventSource.CLOSED && !retry) {
          retry = setTimeout(() => {
            retry = undefined;
            eventSource.close();
            connect();
          }, 3000);
        }
      };
    }
    connect();
    return () => {
      clearTimeout(retry);
      eventSource.close();
    };
  }

  static getDemoTelemetrySnapshot() {
    return {
      timestamp: new Date().toISOString(),
      solarGenerationKw: 4.25,
      inverterLoadWatts: 850,
      gridImportWatts: 0,
      batterySoC: 88.5,
      batteryVoltage: 53.4,
      batteryCurrentAmps: 28.5,
      batteryHealthStatus: 'OPTIMAL',
      autonomyHours: 36.5,
      cisternTotalLiters: 10400,
      cisternCapacityLiters: 12000,
      cisternPercentFull: 86.7,
      waterAutonomyDays: 23.1,
      cisternTanks: [
        { tankId: 'tnk-1', tankName: 'Cistern #1 (Clean Potable & Nursery)', capacityLiters: 4000, currentLiters: 3800, percentFull: 95.0, tdsPpm: 38 },
        { tankId: 'tnk-2', tankName: 'Cistern #2 (Biochar Slow Sand Clarifier)', capacityLiters: 4000, currentLiters: 3600, percentFull: 90.0, tdsPpm: 46 },
        { tankId: 'tnk-3', tankName: 'Cistern #3 (Gravity Header Supply)', capacityLiters: 4000, currentLiters: 3000, percentFull: 75.0, tdsPpm: 42 },
      ],
      dissolvedOxygenMgL: 6.8,
      pH: 7.2,
      waterTemperatureC: 26.5,
      ambientIrradianceWPerM2: 780,
      loadSheddingActive: false,
      dumpLoad: {
        isActive: false,
        targetAppliance: 'EVAPORATIVE_MISTING',
        excessSolarKw: 0,
        runtimeMinutes: 0,
        reason: 'Normal balance',
      },
      alerts: [],
    };
  }
}
