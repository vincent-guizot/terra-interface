import env from '../config/env.js';
export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR', details = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || (err.status ? err.status : 500);
  const code = err.code || (statusCode >= 500 ? 'INTERNAL_SERVER_ERROR' : 'BAD_REQUEST');
  const message = err.message || 'An unexpected internal error occurred';

  // Log error details for server diagnostics
  if (statusCode >= 500) {
    console.error(`[ERROR 500] [${req.method} ${req.originalUrl}]:`, err);
  } else if (env.isDevelopment) {
    console.warn(`[CLIENT ERROR ${statusCode}] [${req.method} ${req.originalUrl}]:`, message);
  }
  const response = {
    success: false,
    error: {
      message,
      statusCode,
      code,
      details: err.details || null
    },
    timestamp: new Date().toISOString()
  };

  // Only include stack trace in non-production environments
  if (env.isDevelopment && err.stack) {
    response.error.stack = err.stack;
  }
  res.status(statusCode).json(response);
}
export default errorHandler;
