import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import env from './config/env.js';
import corsOptions from './config/cors.js';
import apiRateLimiter from './middlewares/rateLimiter.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import healthController from './controllers/healthController.js';
import apiRoutes from './routes/index.js';
import { registerInventoryEventListener } from './common/events/listeners/inventory-event.listener.js';
import { registerTelemetryAlertListener } from './common/events/listeners/telemetry-alert.listener.js';

registerInventoryEventListener();
registerTelemetryAlertListener();

// 1. Initialize Express application
export const app = express();

// 2. Trust reverse proxies (important for rate limiter & client IP accuracy)
app.set('trust proxy', 1);

// 3. Security headers with Helmet
app.use(helmet({
  contentSecurityPolicy: false,
  // Permit frontend dev tools and SSE streams
  crossOriginEmbedderPolicy: false
}));

// 4. CORS configuration
app.use(cors(corsOptions));

// 5. Body parsers
app.use(express.json({
  limit: '10mb'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));

// 6. Request Logging with Morgan
if (env.isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 7. Rate Limiting Middleware
app.use('/api', apiRateLimiter);

// 8. Canonical Health Check endpoint (GET /api/health)
app.get('/api/health', healthController.getHealth);
app.get('/health', healthController.getHealth);

// 9. API Routes (/api/v1/*)
app.use('/api', apiRoutes);

// Root informational endpoint
app.get('/', (req, res) => {
  res.json({
    application: 'Terra Interface Core API Engine',
    version: '1.0.0',
    homestead: "Vincent's Farm (300 m² Master Plan)",
    docs: '/api/v1',
    health: '/api/health',
    timestamp: new Date().toISOString()
  });
});

// 10. 404 Route Not Found Handler
app.use(notFoundHandler);

// 11. Centralized Error Handler (must be registered last)
app.use(errorHandler);

// app.js exports the configured Express app and NEVER calls app.listen()
export default app;
