import rateLimit from 'express-rate-limit';
export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  // 1 minute
  max: 300,
  // 300 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many requests dispatched to Terra Interface Core API. Please rate-limit telemetry.',
      statusCode: 429,
      code: 'RATE_LIMIT_EXCEEDED'
    },
    timestamp: new Date().toISOString()
  },
  skip: req => {
    // Skip rate limiting for internal health check or SSE telemetry stream
    return req.path === '/api/health' || req.path.includes('/telemetry/stream');
  }
});
export default apiRateLimiter;
