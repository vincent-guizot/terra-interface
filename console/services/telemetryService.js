import { homesteadProfile, resourcesData } from '../data/homesteadData';
import { ApiClient } from './apiClient';

export class TelemetryService {
  static async getLiveHomesteadTelemetry() {
    const remote = await ApiClient.get('/telemetry/live');
    if (remote) return remote;

    return {
      profile: homesteadProfile,
      energy: resourcesData.energy,
      water: resourcesData.water,
      circularScore: homesteadProfile.overallAutonomy,
      timestamp: new Date().toISOString(),
    };
  }
}
