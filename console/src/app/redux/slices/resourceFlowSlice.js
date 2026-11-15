import { createSlice } from '@reduxjs/toolkit';
import { masterPlanResourceFlows } from '../../../data/homestead/master-plan.js';

const initialState = {
  flows: masterPlanResourceFlows,
  flowClassification: 'ALL', // 'ALL' | 'ACTUAL' | 'PLANNED' | 'ESTIMATED'
  streamVector: 'ALL',       // 'ALL' | 'CLEAN_MICROGRID' | 'WATER_LOOP' | 'BSF_BIOCONVERSION'
  activeLoopId: 'all',
};

export const resourceFlowSlice = createSlice({
  name: 'resourceFlow',
  initialState,
  reducers: {
    setFlowClassification: (state, action) => {
      state.flowClassification = action.payload;
    },
    setStreamVector: (state, action) => {
      state.streamVector = action.payload;
    },
    setActiveLoopId: (state, action) => {
      state.activeLoopId = action.payload;
    },
  },
});

export const { setFlowClassification, setStreamVector, setActiveLoopId } = resourceFlowSlice.actions;
export default resourceFlowSlice.reducer;
