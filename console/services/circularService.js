import { ApiClient } from './apiClient';

export class CircularService {
  static async getCircularOverview() {
    try {
      return await ApiClient.get('/circular/overview');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          activeBsfTraysCount: 2,
          totalBsfBiomassDigestingKg: 29.2,
          dailyLiveProteinYieldKg: 1.8,
          compostBaysActive: 2,
          totalMatureHumusReadyKg: 480.0,
          circularityScorePercent: 96.6,
          closedLoopTarget: '>= 95.0%',
          bioconversionEfficiency: '16.0% - 18.0% waste-to-protein conversion',
        };
      }
      throw err;
    }
  }

  static async getBsfTrays() {
    try {
      return await ApiClient.get('/circular/bsf/trays');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
          {
            trayId: 'tray-01',
            batchCode: 'BAT-2026-BSF-08',
            inoculationDate: '2026-11-04',
            dolWeightGrams: 10.0,
            organicScrapType: 'Kitchen Veg Scraps + Brewery Spent Grain',
            inputFeedKg: 15.0,
            currentMoisturePercent: 68,
            temperatureC: 36.2,
            status: 'Prepupae Crawl-off',
          },
          {
            trayId: 'tray-02',
            batchCode: 'BAT-2026-BSF-09',
            inoculationDate: '2026-11-08',
            dolWeightGrams: 10.0,
            organicScrapType: 'Fruit Waste (Papaya/Banana skins) + Coffee Grounds',
            inputFeedKg: 14.2,
            currentMoisturePercent: 70,
            temperatureC: 35.8,
            status: 'Feeding',
          },
        ];
      }
      throw err;
    }
  }

  static async recordBsfFeed(data) {
    try {
      return await ApiClient.post('/circular/bsf/feed', data);
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          message: `Successfully fed ${data.feedWeightKg} kg scraps into BSF ${data.trayId}`,
          tray: {
            trayId: data.trayId,
            batchCode: data.batchCode,
            inputFeedKg: data.feedWeightKg,
            organicScrapType: data.organicScrapType,
            currentMoisturePercent: data.moisturePercent || 68,
            temperatureC: data.temperatureC || 36.0,
            status: 'Feeding',
          },
        };
      }
      throw err;
    }
  }

  static async recordMaggotHarvest(data) {
    try {
      return await ApiClient.post('/circular/bsf/harvest', data);
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        const yieldKg = Number(data.prepupaeYieldKg);
        const frassKg = Number(data.frassYieldKg);
        const poultryShare = data.allocatedToPoultryKg ?? Math.round(yieldKg * 0.65 * 100) / 100;
        const tilapiaShare = data.allocatedToTilapiaKg ?? Math.round((yieldKg - poultryShare) * 100) / 100;

        return {
          message: `Maggot harvest recorded: ${yieldKg} kg prepupae, ${frassKg} kg frass`,
          harvestRecord: {
            harvestDate: new Date().toISOString().split('T')[0],
            trayId: data.trayId,
            freshPrepupaeKg: yieldKg,
            crudeProteinPercent: 42.4,
            allocatedToPoultryKg: poultryShare,
            allocatedToTilapiaKg: tilapiaShare,
            dryResidueFrassKg: frassKg,
          },
        };
      }
      throw err;
    }
  }

  static async getCompostBatches() {
    try {
      return await ApiClient.get('/circular/compost/batches');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
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
      }
      throw err;
    }
  }

  static async recordCompostTurn(data) {
    try {
      return await ApiClient.post('/circular/compost/turn', data);
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        let phase = 'Mesophilic';
        if (data.coreTempC >= 55.0 && data.coreTempC <= 68.0) {
          phase = 'Thermophilic (Active Pasteurization)';
        } else if (data.coreTempC >= 40.0) {
          phase = 'Cooling';
        } else if (data.turnCount >= 4) {
          phase = 'Curing';
        }

        return {
          message: `Compost turn #${data.turnCount} recorded in ${data.bayNumber}. Phase: ${phase}`,
          tempLog: {
            batchCode: data.batchCode,
            coreTempC: data.coreTempC,
            edgeTempC: data.edgeTempC,
            microbialPhase: phase,
          },
        };
      }
      throw err;
    }
  }

  static async recordCompostHarvest(data) {
    try {
      return await ApiClient.post('/circular/compost/harvest', data);
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          message: `Harvested ${data.curedHumusKg} kg cured humus from ${data.bayNumber}`,
        };
      }
      throw err;
    }
  }

  static async getCircularityMetrics() {
    try {
      return await ApiClient.get('/circular/metrics');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          totalWasteGeneratedKg: 29.5,
          divertedToBsfKg: 15.0,
          divertedToCompostKg: 10.5,
          divertedToMulchKg: 3.0,
          externalLandfillKg: 1.0,
          circularityScorePercent: 96.6,
        };
      }
      throw err;
    }
  }
}
