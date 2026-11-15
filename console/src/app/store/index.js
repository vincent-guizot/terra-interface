import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.js';
import { telemetrySyncMiddleware } from '../redux/middleware/telemetrySyncMiddleware.js';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore date/time instances in telemetry payloads
        ignoredActions: ['homestead/fetchStatus/fulfilled'],
      },
    }).concat(telemetrySyncMiddleware),
  devTools: import.meta.env?.DEV,
});

export default store;
