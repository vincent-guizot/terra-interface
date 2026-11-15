import { Router } from 'express';
import homesteadsRouter from '../../modules/homesteads/homesteads.router.js';
import zonesRouter from '../../modules/zones/zones.router.js';
import zonesController from '../../modules/zones/zones.controller.js';
import batchesRouter from '../../modules/batches/batches.router.js';
import catalogRouter from '../../modules/catalog/catalog.router.js';
import catalogController from '../../modules/catalog/catalog.controller.js';
import productionRouter from '../../modules/production/production.router.js';
import cultivationRouter from '../../modules/cultivation/cultivation.router.js';
import livestockRouter from '../../modules/livestock/livestock.router.js';
import aquacultureRouter from '../../modules/aquaculture/aquaculture.router.js';
import circularRouter from '../../modules/circular/circular.router.js';
import inventoryRouter from '../../modules/inventory/inventory.router.js';
import resourcesRouter from '../../modules/resources/resources.router.js';
import resourcesController from '../../modules/resources/resources.controller.js';
import activitiesRouter from '../../modules/activities/activities.router.js';
import intelligenceRouter from '../../modules/intelligence/intelligence.router.js';
import energyWaterRouter from '../../modules/energy-water/energy-water.router.js';
import energyWaterController from '../../modules/energy-water/energy-water.controller.js';
import { universalBatchRouter } from '../../modules/universal-batch/universal-batch.router.js';
import { spatialRouter } from '../../modules/spatial/spatial.router.js';
import { eventsRouter } from '../../common/events/events.router.js';
const router = Router();
router.use('/universal-batches', universalBatchRouter);
router.use('/spatial', spatialRouter);
router.use('/events', eventsRouter);

// 1. Homesteads
router.use('/homesteads', homesteadsRouter);

// 2. Zones & Facilities
router.use('/zones', zonesRouter);

// 3. Buildings direct endpoint
const buildingsRouter = Router();
buildingsRouter.get('/', zonesController.getBuildings);
router.use('/buildings', buildingsRouter);

// 4. Batches
router.use('/batches', batchesRouter);

// 5. Catalog, Products & Units
router.use('/catalog', catalogRouter);
const productsRouter = Router();
productsRouter.get('/', catalogController.getProducts);
router.use('/products', productsRouter);
const unitsRouter = Router();
unitsRouter.get('/', catalogController.getMeasurementUnits);
router.use('/units', unitsRouter);

// 6. Production
router.use('/production', productionRouter);

// 7. Cultivation
router.use('/cultivation', cultivationRouter);

// 8. Livestock
router.use('/livestock', livestockRouter);

// 9. Aquaculture
router.use('/aquaculture', aquacultureRouter);

// 10. Circular
router.use('/circular', circularRouter);

// 11. Inventory
router.use('/inventory', inventoryRouter);

// 12. Resources & Resource Flows
router.use('/resources', resourcesRouter);
const resourceFlowsRouter = Router();
resourceFlowsRouter.get('/', resourcesController.getResourceFlows);
resourceFlowsRouter.get('/:id', resourcesController.getFlowById);
router.use('/resource-flows', resourceFlowsRouter);

// 13. Activities
router.use('/activities', activitiesRouter);

// 14. Intelligence
router.use('/intelligence', intelligenceRouter);

// 15. Energy-Water & Telemetry
router.use('/energy-water', energyWaterRouter);
const telemetryRouter = Router();
telemetryRouter.get('/live', energyWaterController.getLiveSnapshot);
telemetryRouter.get('/stream', energyWaterController.streamTelemetry);
telemetryRouter.get('/historical', energyWaterController.getHistorical);
telemetryRouter.get('/policy', energyWaterController.getDispatchPolicy);
telemetryRouter.put('/policy', energyWaterController.updateDispatchPolicy);
telemetryRouter.post('/ingest', energyWaterController.ingestTelemetry);
telemetryRouter.get('/dump-load', energyWaterController.getDumpLoadStatus);
telemetryRouter.get('/', energyWaterController.getLiveSnapshot);
router.use('/telemetry', telemetryRouter);
export default router;
