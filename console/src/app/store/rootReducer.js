import { combineReducers } from '@reduxjs/toolkit';
import homesteadReducer from '../redux/slices/homesteadSlice.js';
import facilitiesReducer from '../redux/slices/facilitiesSlice.js';
import resourceFlowReducer from '../redux/slices/resourceFlowSlice.js';
import managementReducer from '../redux/slices/managementSlice.js';
import uiReducer from '../redux/slices/uiSlice.js';

const rootReducer = combineReducers({
  homestead: homesteadReducer,
  facilities: facilitiesReducer,
  resourceFlow: resourceFlowReducer,
  management: managementReducer,
  ui: uiReducer,
});

export default rootReducer;
