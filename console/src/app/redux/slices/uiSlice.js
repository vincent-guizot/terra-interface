import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isQuickLogOpen: false,
  isInspectionDrawerOpen: false,
  isMobileNavOpen: false,
  notifications: [
    {
      id: 1,
      title: 'Solar Surplus Diverted',
      desc: 'Battery is at 91%. Auto-dispatched 1.4 kW to aeration pump.',
      time: '12 min ago',
      read: false,
    },
    {
      id: 2,
      title: 'Harvest Ready: Oyster Mushrooms',
      desc: 'Zone 1 Chamber #2 has 4.2 kg ready for harvest.',
      time: '45 min ago',
      read: false,
    },
    {
      id: 3,
      title: 'Rainwater Reserve at 92.5%',
      desc: '10,400 L stored. Rain forecast will add ~600 L this evening.',
      time: '2 hours ago',
      read: true,
    },
  ],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleQuickLog: (state, action) => {
      state.isQuickLogOpen = action.payload !== undefined ? action.payload : !state.isQuickLogOpen;
    },
    toggleInspectionDrawer: (state, action) => {
      state.isInspectionDrawerOpen = action.payload !== undefined ? action.payload : !state.isInspectionDrawerOpen;
    },
    toggleMobileNav: (state, action) => {
      state.isMobileNavOpen = action.payload !== undefined ? action.payload : !state.isMobileNavOpen;
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach(n => { n.read = true; });
    },
  },
});

export const {
  toggleQuickLog,
  toggleInspectionDrawer,
  toggleMobileNav,
  markAllNotificationsRead,
} = uiSlice.actions;

export default uiSlice.reducer;
