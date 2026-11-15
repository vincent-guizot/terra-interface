import { createSlice } from '@reduxjs/toolkit';
import { masterPlanFacilities, MASTER_PLAN_CLARIFICATIONS_NEEDED } from '../../data/masterPlanData.js';

const initialState = {
  facilities: masterPlanFacilities,
  selectedFacilityId: 'FAC-GUD-01',
  categoryFilter: 'all',
  cadClarifications: MASTER_PLAN_CLARIFICATIONS_NEEDED,
  loading: false,
};

export const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {
    selectFacility: (state, action) => {
      state.selectedFacilityId = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    updateFacilityStatus: (state, action) => {
      const { id, status } = action.payload;
      const fac = state.facilities.find(f => f.id === id);
      if (fac) {
        fac.status = status;
        fac.lastUpdated = new Date().toISOString();
      }
    },
  },
});

export const { selectFacility, setCategoryFilter, updateFacilityStatus } = facilitiesSlice.actions;
export default facilitiesSlice.reducer;
