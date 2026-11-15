import env from '../config/env.js';
import { sendError } from '../utils/response.js';
import { ERROR_CODES_BY_STATUS } from '../constants/api-response.constants.js';
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
  if (res.headersSent) return next(err);
  const requestedStatus = err.statusCode || err.status;
  const statusCode = Number.isInteger(requestedStatus) && requestedStatus >= 400 && requestedStatus <= 599 ? requestedStatus : 500;
  const invalidJson = err.type === 'entity.parse.failed';
  const code = invalidJson ? 'INVALID_JSON' : statusCode >= 500 ? ERROR_CODES_BY_STATUS[statusCode] || 'INTERNAL_SERVER_ERROR' : err.code || ERROR_CODES_BY_STATUS[statusCode] || 'REQUEST_FAILED';
  const message = invalidJson ? 'Request body must contain valid JSON' : statusCode >= 500 ? 'An unexpected internal error occurred' : err.message || 'Request failed';

  // Log error details for server diagnostics
  if (statusCode >= 500) {
    console.error(`[ERROR 500] [${req.method} ${req.originalUrl}]:`, err);
  } else if (env.isDevelopment) {
    console.warn(`[CLIENT ERROR ${statusCode}] [${req.method} ${req.originalUrl}]:`, message);
  }
  return sendError(res, statusCode, message, code, statusCode >= 500 ? null : err.details ?? null);
}
export default errorHandler;
