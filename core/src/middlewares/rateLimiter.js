import rateLimit from 'express-rate-limit';
import { sendError } from '../utils/response.js';
export const rateLimitHandler = (req, res) => sendError(res, 429, 'Too many requests. Please try again later.', 'RATE_LIMIT_EXCEEDED');
export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  // 1 minute
  max: 300,
  // 300 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  skip: req => {
    // Skip rate limiting for internal health check or SSE telemetry stream
    return req.path === '/health' || ['/v1/telemetry/stream', '/v1/energy-water/telemetry/stream', '/v1/energy-water/stream'].includes(req.path);
  }
});
export default apiRateLimiter;
