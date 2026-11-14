import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { universalBatchRouter } from './modules/universal-batch/universal-batch.router';
import { spatialRouter } from './modules/spatial/spatial.router';
import { catalogRouter } from './modules/catalog/catalog.router';
import { cultivationRouter } from './modules/cultivation/cultivation.router';
import { livestockRouter } from './modules/livestock/livestock.router';
import { aquacultureRouter } from './modules/aquaculture/aquaculture.router';
import { circularRouter } from './modules/circular/circular.router';
import { inventoryRouter } from './modules/inventory/inventory.router';
import { energyWaterRouter } from './modules/energy-water/energy-water.router';
import { intelligenceRouter } from './modules/intelligence/intelligence.router';
import { HttpException } from './common/errors/http-exceptions';
import { registerInventoryEventListener } from './common/events/listeners/inventory-event.listener';
import { registerTelemetryAlertListener } from './common/events/listeners/telemetry-alert.listener';

// Initialize domain event bus listeners
registerInventoryEventListener();
registerTelemetryAlertListener();

export const app = express();

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Request logger
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path !== '/api/v1/energy-water/telemetry/stream') {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    }
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    homestead: "Vincent's Farm (300 m²)",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// Mount Domain Routers under /api/v1/
const apiRouter = express.Router();
apiRouter.use('/universal-batches', universalBatchRouter);
apiRouter.use('/spatial', spatialRouter);
apiRouter.use('/catalog', catalogRouter);
apiRouter.use('/cultivation', cultivationRouter);
apiRouter.use('/livestock', livestockRouter);
apiRouter.use('/aquaculture', aquacultureRouter);
apiRouter.use('/circular', circularRouter);
apiRouter.use('/inventory', inventoryRouter);
apiRouter.use('/energy-water', energyWaterRouter);
apiRouter.use('/intelligence', intelligenceRouter);

app.use('/api/v1', apiRouter);

// Standardized Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || err.statusCode || 500;
  const errorName = err.name || 'InternalServerError';
  const message = err.message || 'An unexpected error occurred';

  console.error(`[Error] ${req.method} ${req.url} [${statusCode}]:`, message);

  res.status(statusCode).json({
    success: false,
    statusCode,
    error: errorName,
    message,
    timestamp: new Date().toISOString(),
  });
});

export default app;
