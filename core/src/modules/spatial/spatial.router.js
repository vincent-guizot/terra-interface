const spatialRouter = (0, express_1.Router)();
"use strict";
import * as express_1 from "express";
import * as spatial_service_1 from "./spatial.service.js";
import * as prisma_service_1 from "../../prisma/prisma.service.js";
const service = new spatial_service_1.SpatialService(prisma_service_1.prisma);
spatialRouter.get('/zones', async (req, res, next) => {
  try {
    const zones = await service.getZones();
    res.json(zones);
  } catch (err) {
    next(err);
  }
});
spatialRouter.get('/zones/:code', async (req, res, next) => {
  try {
    const zone = await service.getZoneByCode(req.params.code);
    res.json(zone);
  } catch (err) {
    next(err);
  }
});
spatialRouter.get('/canonical', async (req, res, next) => {
  try {
    const canonical = await service.getHomesteadCanonical();
    res.json(canonical);
  } catch (err) {
    next(err);
  }
});
export { spatialRouter };
