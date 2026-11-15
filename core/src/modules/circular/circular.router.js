import { Router } from 'express';
import circularController from './circular.controller.js';
const router = Router();
router.get('/overview', circularController.getOverview);
router.get('/bsf/trays', circularController.getBsfTrays);
router.post('/bsf/feed', circularController.recordBsfFeed);
router.post('/bsf/harvest', circularController.recordMaggotHarvest);
router.get('/compost/batches', circularController.getCompostBatches);
router.get('/compost/temperature-profile', circularController.getThermophilicProfile);
router.get('/', circularController.getOverview);
"use strict";
import * as circular_service_1 from './circular.service.js';
import * as maggot_harvest_service_1 from './maggot-harvest.service.js';
import * as inventory_service_1 from '../inventory/inventory.service.js';
import * as prisma_service_1 from '../../prisma/prisma.service.js';
const inventoryService = new inventory_service_1.InventoryService(prisma_service_1.prisma);
const maggotHarvestService = new maggot_harvest_service_1.MaggotHarvestService();
const service = circular_service_1.default;
router.get('/compost/piles', async (req, res, next) => {
  try {
    const piles = await service.getCompostBatches();
    res.json(piles);
  } catch (err) {
    next(err);
  }
});
router.post('/compost/turn', async (req, res, next) => {
  try {
    const result = await service.recordCompostTurn(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
router.post('/compost/harvest', async (req, res, next) => {
  try {
    const result = await service.recordCompostHarvest(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
export default router;
