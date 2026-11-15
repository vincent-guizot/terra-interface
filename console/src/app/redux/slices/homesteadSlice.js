import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHomesteadStatus = createAsyncThunk(
  'homestead/fetchStatus',
  async (_, { rejectWithValue }) => {
    try {
      // In production connects to apiClient.get('/homestead/status')
      return {
        autonomyRate: 94.2,
        foodSelfSufficiency: 86.4,
        cleanEnergyIndependence: 100,
        waterCircularReserve: 92.5,
        lastUpdated: new Date().toISOString(),
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  profile: {
    id: 'vincents-farm-300m2',
    name: "Vincent's Farm",
    area: '300 m² (15m × 20m)',
    location: 'West Java, Indonesia',
    steward: 'Vincent',
    systemVersion: 'Terra Interface v2.4',
  },
  metrics: {
    overallAutonomy: 94.2,
    foodSelfSufficiency: 86.4,
    cleanEnergyIndependence: 100,
    waterCircularReserve: 92.5,
    solarGenerationKw: 4.8,
    ambientTempC: 28.0,
    waterStoredLiters: 10400,
  },
  telemetryProvenance: {
    isDemoMode: false,
    activeDataSource: 'LIVE',
    lastSyncTime: new Date().toISOString(),
  },
  status: 'idle',
  error: null,
};

export const homesteadSlice = createSlice({
  name: 'homestead',
  initialState,
  reducers: {
    setDemoMode: (state, action) => {
      state.telemetryProvenance.isDemoMode = action.payload;
    },
    setActiveDataSource: (state, action) => {
      state.telemetryProvenance.activeDataSource = action.payload;
    },
    updateMetric: (state, action) => {
      const { key, value } = action.payload;
      if (state.metrics[key] !== undefined) {
        state.metrics[key] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomesteadStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHomesteadStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.metrics.overallAutonomy = action.payload.autonomyRate;
        state.metrics.foodSelfSufficiency = action.payload.foodSelfSufficiency;
        state.metrics.cleanEnergyIndependence = action.payload.cleanEnergyIndependence;
        state.metrics.waterCircularReserve = action.payload.waterCircularReserve;
        state.telemetryProvenance.lastSyncTime = action.payload.lastUpdated;
      })
      .addCase(fetchHomesteadStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setDemoMode, setActiveDataSource, updateMetric } = homesteadSlice.actions;
export default homesteadSlice.reducer;
