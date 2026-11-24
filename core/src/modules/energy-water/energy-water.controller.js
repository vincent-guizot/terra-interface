import { AppError } from '../../middlewares/errorHandler.js';
import energyWaterService from './energy-water.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
export async function getLiveSnapshot(req, res, next) {
  try {
    const snapshot = energyWaterService.getLiveSnapshot();
    return sendSuccess(res, snapshot, 'Live microgrid and water snapshot retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getHistorical(req, res, next) {
  try {
    const hours = req.query.hours ? parseInt(req.query.hours, 10) : 24;
    const history = energyWaterService.getHistoricalTelemetry(hours);
    return sendSuccess(res, history, `Historical telemetry for past ${hours} hours retrieved`);
  } catch (err) {
    next(err);
  }
}
export async function getDispatchPolicy(req, res, next) {
  try {
    const policy = energyWaterService.getDispatchPolicy();
    return sendSuccess(res, policy, 'Dispatch policy retrieved');
  } catch (err) {
    next(err);
  }
}
export async function updateDispatchPolicy(req, res, next) {
  try {
    const updated = await energyWaterService.saveDispatchPolicy(req.body);
    return sendSuccess(res, updated, 'Dispatch policy updated successfully');
  } catch (err) {
    next(err);
  }
}
export async function getDumpLoadStatus(req, res, next) {
  try {
    const status = energyWaterService.getDumpLoadStatus();
    return sendSuccess(res, status, 'Dump load status retrieved');
  } catch (err) {
    next(err);
  }
}
export async function ingestTelemetry(req, res, next) {
  try {
    const packet = req.body ?? {};
    const limits = { solarGenerationKw: [0, Infinity], inverterLoadWatts: [0, Infinity],
      batterySoC: [0, 100], cisternLevelLiters: [0, 12000] };
    const invalid = Object.entries(limits).some(([key, [min, max]]) =>
      !Number.isFinite(packet[key]) || packet[key] < min || packet[key] > max);
    if (invalid || (packet.timestamp !== undefined &&
        (typeof packet.timestamp !== 'string' || !Number.isFinite(Date.parse(packet.timestamp))))) {
      throw new AppError('Invalid telemetry values or timestamp', 400, 'VALIDATION_ERROR');
    }
    const snapshot = await energyWaterService.ingestTelemetry(packet);
    return sendCreated(res, snapshot, 'Telemetry reading ingested');
  } catch (err) {
    next(err);
  }
}
export function streamTelemetry(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send immediate initial state
  res.write(`data: ${JSON.stringify(energyWaterService.getLiveSnapshot())}\n\n`);
  const subscription = energyWaterService.getTelemetryStream().subscribe(({ data }) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 15000);
  req.on('close', () => {
    clearInterval(heartbeat);
    subscription.unsubscribe();
  });
}
export default {
  getLiveSnapshot,
  getHistorical,
  getDispatchPolicy,
  updateDispatchPolicy,
  getDumpLoadStatus,
  ingestTelemetry,
  streamTelemetry
};
