"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const universal_batch_router_1 = require("./modules/universal-batch/universal-batch.router");
const spatial_router_1 = require("./modules/spatial/spatial.router");
const catalog_router_1 = require("./modules/catalog/catalog.router");
const cultivation_router_1 = require("./modules/cultivation/cultivation.router");
const livestock_router_1 = require("./modules/livestock/livestock.router");
const aquaculture_router_1 = require("./modules/aquaculture/aquaculture.router");
const circular_router_1 = require("./modules/circular/circular.router");
const inventory_router_1 = require("./modules/inventory/inventory.router");
const energy_water_router_1 = require("./modules/energy-water/energy-water.router");
const intelligence_router_1 = require("./modules/intelligence/intelligence.router");
const events_router_1 = require("./common/events/events.router");
const db_health_1 = require("./common/health/db-health");
const inventory_event_listener_1 = require("./common/events/listeners/inventory-event.listener");
const telemetry_alert_listener_1 = require("./common/events/listeners/telemetry-alert.listener");
// Initialize domain event bus listeners
(0, inventory_event_listener_1.registerInventoryEventListener)();
(0, telemetry_alert_listener_1.registerTelemetryAlertListener)();
exports.app = (0, express_1.default)();
// Middlewares
exports.app.use((0, cors_1.default)({ origin: '*' }));
exports.app.use(express_1.default.json());
// Request logger
exports.app.use((req, res, next) => {
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
exports.app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        homestead: "Vincent's Farm (300 m²)",
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
    });
});
exports.app.get('/api/health/db', async (req, res) => {
    const report = await (0, db_health_1.checkDatabaseHealth)();
    const statusCode = report.status === 'UP' ? 200 : 503;
    res.status(statusCode).json(report);
});
// Mount Domain Routers under /api/v1/
const apiRouter = express_1.default.Router();
apiRouter.use('/universal-batches', universal_batch_router_1.universalBatchRouter);
apiRouter.use('/spatial', spatial_router_1.spatialRouter);
apiRouter.use('/catalog', catalog_router_1.catalogRouter);
apiRouter.use('/cultivation', cultivation_router_1.cultivationRouter);
apiRouter.use('/livestock', livestock_router_1.livestockRouter);
apiRouter.use('/aquaculture', aquaculture_router_1.aquacultureRouter);
apiRouter.use('/circular', circular_router_1.circularRouter);
apiRouter.use('/inventory', inventory_router_1.inventoryRouter);
apiRouter.use('/energy-water', energy_water_router_1.energyWaterRouter);
apiRouter.use('/intelligence', intelligence_router_1.intelligenceRouter);
apiRouter.use('/events', events_router_1.eventsRouter);
exports.app.use('/api/v1', apiRouter);
// Standardized Error Handling Middleware
exports.app.use((err, req, res, next) => {
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
exports.default = exports.app;
