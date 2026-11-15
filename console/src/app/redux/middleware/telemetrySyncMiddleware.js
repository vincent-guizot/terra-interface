/**
 * Telemetry Sync & Action Audit Middleware
 * Intercepts Redux actions to provide operational observability across homestead services
 */
export const telemetrySyncMiddleware = (store) => (next) => (action) => {
  // If telemetry or status action fires, update heartbeat timestamp
  if (action.type.startsWith('homestead/') || action.type.startsWith('facilities/')) {
    // Transparent operational audit logging in dev
    if (import.meta.env?.DEV) {
      console.debug('[Homestead Audit Event]:', action.type, action.payload);
    }
  }
  return next(action);
};
