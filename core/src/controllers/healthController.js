import { query, dbMode } from '../config/database.js';
import env from '../config/env.js';
export async function getHealth(req, res) {
  let dbStatus = 'disconnected';
  let isHealthy = false;
  let dbError = null;
  try {
      const pingRes = await query('SELECT 1 AS alive');
      if (pingRes.rows?.[0]?.alive === 1) {
        dbStatus = 'connected';
        isHealthy = true;
      }
  } catch (err) {
    dbStatus = 'disconnected';
    dbError = err.message;
    isHealthy = false;
  }
  const response = {
    success: isHealthy,
    application: 'Terra Interface Core',
    status: isHealthy ? 'healthy' : 'degraded',
    environment: env.NODE_ENV,
    homestead: "Vincent's Farm (300 m² Master Plan)",
    database: {
      status: dbStatus,
      mode: dbMode,
      ...(dbError && {
        error: dbError
      })
    },
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  };
  const httpStatus = isHealthy ? 200 : 503;
  return res.status(httpStatus).json(response);
}
export default {
  getHealth
};
