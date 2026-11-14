// Terra Interface Console — Intelligence & Autonomy Service
// Connects Console to core/src/modules/intelligence with resilient demo fallbacks

import { ApiClient } from './apiClient';

export class IntelligenceService {
  /**
   * Retrieves food, water, and energy self-sufficiency scores
   */
  static async getAutonomyScores() {
    try {
      return await ApiClient.get('/intelligence/autonomy');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          overallAutonomyScore: 91.8,
          foodScore: 84.0,
          waterScore: 94.5,
          energyScore: 96.8,
          circularityScore: 96.6,
          rating: 'EXCELLENT',
          metrics: {
            dailyCaloriesProduced: 4200,
            dailyCalorieTarget: 5000,
            cisternStorageLiters: 6850,
            waterAutonomyDays: 20.1,
            solarDailyGenerationKwh: 22.4,
            batteryAutonomyHours: 18.4,
            wasteDivertedPercent: 96.6,
          },
          calculatedAt: new Date().toISOString(),
        };
      }
      throw err;
    }
  }

  /**
   * Retrieves active actionable ecosystem recommendations
   */
  static async getInsights() {
    try {
      return await ApiClient.get('/intelligence/insights');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
          {
            id: 'rec-01',
            category: 'Soil',
            priority: 'Immediate',
            actionTitle: 'Inoculate Keyhole Bed #2 with bush beans post-harvest',
            targetZone: 'Zone 4: Permaculture Beds',
            expectedBenefit: 'Natural biological nitrogen fixation +30g N/m² for succeeding brassica crops',
            automatedDispatchable: false,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'rec-02',
            category: 'Energy Storage',
            priority: 'Suggested',
            actionTitle: 'Pre-cool mushroom storage chamber with solar surplus',
            targetZone: 'Zone 7: Eco-Living Quarters & Lab',
            expectedBenefit: 'Shifts 1.2 kWh of nighttime grid load to daytime solar peak',
            automatedDispatchable: true,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'rec-03',
            category: 'Livestock Feed',
            priority: 'Suggested',
            actionTitle: 'Supplement Layer Flock with 2.5 kg live BSF prepupae',
            targetZone: 'Zone 3: Micro-Livestock Haven',
            expectedBenefit: 'Boosts crude protein intake to 42% and elevates eggshell calcium assimilation',
            automatedDispatchable: false,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'rec-04',
            category: 'Circular',
            priority: 'Immediate',
            actionTitle: 'Aerate Bokashi Pile #1: Turn thermophilic core',
            targetZone: 'Zone 6: Circular Biomass & Energy Hub',
            expectedBenefit: 'Prevents anaerobic thermal stall; ensures weed seed destruction at 62°C',
            automatedDispatchable: false,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'rec-05',
            category: 'Irrigation',
            priority: 'Informational',
            actionTitle: 'Backwash vortex rainwater pre-filter before monsoon downpour',
            targetZone: 'Zone 5: Water Harvesting Spine',
            expectedBenefit: 'Maximizes clean rainwater catchment yield (estimated +2,140 L today)',
            automatedDispatchable: false,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
          },
        ];
      }
      throw err;
    }
  }

  /**
   * Accepts and schedules an AI recommendation
   */
  static async applyRecommendation(id, notes = '') {
    try {
      return await ApiClient.post(`/intelligence/insights/${id}/apply`, { notes });
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          id,
          status: 'APPLIED',
          notes,
          appliedAt: new Date().toISOString(),
        };
      }
      throw err;
    }
  }

  /**
   * Dismisses an AI recommendation from the queue
   */
  static async dismissRecommendation(id) {
    try {
      return await ApiClient.post(`/intelligence/insights/${id}/dismiss`, {});
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          id,
          status: 'DISMISSED',
          dismissedAt: new Date().toISOString(),
        };
      }
      throw err;
    }
  }

  /**
   * Diagnoses plant foliage deficiencies using botanical visual rules
   */
  static async diagnosePlant(leafZone, chlorosisType, cropType = '') {
    try {
      return await ApiClient.post('/intelligence/diagnose', {
        leafZone,
        chlorosisType,
        cropType,
      });
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        let probableDeficiency = 'Nitrogen (N)';
        let organicHomesteadRemedy = 'Drench root zone with diluted aquaponic pond effluent (1:5) or vermicompost tea.';
        let urgency = 'Immediate';

        if (leafZone === 'Lower Old Leaves' && chlorosisType === 'Interveinal Yellowing') {
          probableDeficiency = 'Magnesium (Mg)';
          organicHomesteadRemedy = 'Foliar spray of 1% Epsom salt (magnesium sulfate) or fermented banana stem juice (FPJ).';
          urgency = 'Suggested';
        } else if (leafZone === 'Lower Old Leaves' && chlorosisType === 'Marginal Scorching') {
          probableDeficiency = 'Potassium (K)';
          organicHomesteadRemedy = 'Apply hardwood biochar ash leachate or fermented comfrey extract around root zone.';
          urgency = 'Immediate';
        } else if (leafZone === 'Upper Young Leaves' && chlorosisType === 'Marginal Scorching') {
          probableDeficiency = 'Calcium (Ca)';
          organicHomesteadRemedy = 'Foliar application of Water-Soluble Calcium (WCA from toasted eggshells + vinegar).';
          urgency = 'Immediate';
        } else if (leafZone === 'Upper Young Leaves' && chlorosisType === 'Interveinal Yellowing') {
          probableDeficiency = 'Iron (Fe)';
          organicHomesteadRemedy = 'Apply chelated iron (DTPA) or iron-rich stinging nettle ferment foliar spray.';
          urgency = 'Suggested';
        }

        return {
          probableDeficiency,
          organicHomesteadRemedy,
          urgency,
          recommendedTargetZone: cropType.toLowerCase().includes('tomato')
            ? 'Zone 4: Permaculture Beds'
            : 'Zone 2: Aquaponics Greenhouse',
        };
      }
      throw err;
    }
  }

  /**
   * Queries Terra AI Assistant with natural language
   */
  static async queryAssistant(query, sessionId = 'web-session', context = 'Homestead') {
    try {
      return await ApiClient.post('/intelligence/query', {
        query,
        sessionId,
        context,
      });
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        const q = query.toLowerCase();
        let reply = "Analyzing Vincent's Farm ecosystem parameters across all 7 zones...";
        let intentCategory = 'General Homestead Status';
        let relatedZones = ['Zone 1: Micro-Climate Nursery', 'Zone 7: Eco-Living Quarters & Lab'];

        if (q.includes('nitrogen') || q.includes('nutrient') || q.includes('nitrate')) {
          reply =
            'Nutrient loop status: Zone 2 biofilter is converting 94% of ammonia into nitrates. Nitrate concentration in Pond Alpha is 44 ppm, safe for fish and optimal for diverting to Zone 4 keyhole beds. 400 L/day of effluent supplies 85% of plant nitrogen with zero commercial fertilizer.';
          intentCategory = 'Nitrogen Cycling & Biofiltration';
          relatedZones = ['Zone 2: Aquaponics Greenhouse', 'Zone 4: Permaculture Beds'];
        } else if (q.includes('tilapia') || q.includes('fish') || q.includes('aquaculture')) {
          reply =
            'Tilapia Batch B-24-TIL is at Day 88 with an average weight of 450g. Biological FCR (Feed Conversion Ratio) is optimal at 1.25 thanks to daily live BSF prepupae supplementation. Target harvest window opens in 14 days, with projected yield of 45.0 kg.';
          intentCategory = 'Aquaculture & FCR Optimization';
          relatedZones = ['Zone 2: Aquaponics Greenhouse'];
        } else if (q.includes('solar') || q.includes('battery') || q.includes('energy')) {
          reply =
            'Microgrid status: 5.0 kWp photovoltaic array is generating 4.8 kW. The 15.3 kWh LiFePO4 battery bank is at 91% SoC with 18.4 hours of autonomy at 0.75 kW homestead load. Excess solar energy is currently directed to the pond cascade aerator dump load.';
          intentCategory = 'Microgrid & Energy Autonomy';
          relatedZones = ['Zone 5: Water Harvesting Spine', 'Zone 6: Circular Biomass & Energy Hub'];
        } else if (q.includes('rain') || q.includes('water') || q.includes('cistern') || q.includes('monsoon')) {
          reply =
            'Water reserves: 6,850 L stored across 4 cisterns (20.1 days autonomy). Afternoon monsoon downpour expected at 17:30 (18 mm, ~2,142 L catchment). Ensure vortex pre-filters are clear.';
          intentCategory = 'Water Catchment & Microclimate';
          relatedZones = ['Zone 5: Water Harvesting Spine'];
        } else {
          reply = `Homestead analysis for "${query}": Zone 1 micro-greenhouse humidity (78%) and Zone 4 soil moisture (38%) are synchronized. The closed-loop system is currently diverting 96.6% of all biomass away from landfills.`;
        }

        return {
          reply,
          intentCategory,
          relatedZones,
          confidenceScore: 0.95,
          timestamp: new Date().toISOString(),
        };
      }
      throw err;
    }
  }

  /**
   * Retrieves microclimate weather and rainwater catchment forecast
   */
  static async getForecast() {
    try {
      return await ApiClient.get('/intelligence/forecast');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          locationCoordinates: { lat: -6.9147, lng: 107.6098 },
          forecastTime: new Date().toISOString(),
          expectedRainfallMm: 18.0,
          probabilityOfPrecipitationPercent: 85,
          peakRainWindow: '17:00 - 18:30',
          expectedRoofCatchmentLiters: 2142,
          ambientTempC: 26.5,
          relativeHumidityPercent: 88,
          solarIrradianceWpm2: 680,
          advisory: 'Tropical orographic monsoon approaching. Secure loose nursery cloches and verify cistern inlet filters.',
        };
      }
      throw err;
    }
  }
}
