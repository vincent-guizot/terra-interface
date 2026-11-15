import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'cultivation', // cultivation | livestock | aquaculture | circular | inventory | energy-water | catalog
  searchQuery: '',
  batches: [
    {
      id: 'BAT-2026-CUL-01',
      crop: 'Bok Choy White Stem (NFT)',
      facility: 'Hydroponic / Vertical Garden',
      status: 'Active',
      startDate: '2026-10-22',
      harvestKg: 26.5,
    },
    {
      id: 'BAT-2026-CUL-02',
      crop: 'Sweet Cherry Tomato Trellis',
      facility: 'TOGA Garden & Food Border',
      status: 'Active',
      startDate: '2026-09-10',
      harvestKg: 6.8,
    },
    {
      id: 'BAT-2026-CUL-03',
      crop: 'Grey Oyster Mushroom (Chamber #2)',
      facility: 'Mushroom House (Integrated with Gudang)',
      status: 'Active',
      startDate: '2026-10-28',
      harvestKg: 4.8,
    },
  ],
  livestockCohorts: [
    {
      id: 'COH-CHK-01',
      breed: 'Ayam KUB (Kampung Unggul Balitnak)',
      facility: 'Chicken Coop',
      headCount: 24,
      dailyYield: '21 eggs/day',
      health: 'Excellent',
    },
    {
      id: 'COH-CHK-02',
      breed: 'Joper (Jawa Super)',
      facility: 'Chicken Coop',
      headCount: 30,
      dailyYield: 'Pastured Meat',
      health: 'Healthy',
    },
    {
      id: 'COH-GT-01',
      breed: 'Kambing Boer / PE Cross',
      facility: 'Goat Barn',
      headCount: 4,
      dailyYield: 'Dairy & Forage Clearing',
      health: 'Vibrant',
    },
    {
      id: 'COH-SHP-01',
      breed: 'Domba Garut Silangan',
      facility: 'Sheep Barn',
      headCount: 4,
      dailyYield: 'Grassland Regeneration',
      health: 'Excellent',
    },
  ],
};

export const managementSlice = createSlice({
  name: 'management',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addBatch: (state, action) => {
      state.batches.unshift(action.payload);
    },
  },
});

export const { setActiveTab, setSearchQuery, addBatch } = managementSlice.actions;
export default managementSlice.reducer;
