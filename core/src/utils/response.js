/**
 * Standard API Response Formatters
 */
import { ERROR_CODES_BY_STATUS } from '../constants/api-response.constants.js';

export function sendSuccess(res, data = null, message = 'Operation successful', statusCode = 200, meta = null) {
  const payload = {
    success: true,
    message,
    data,
    ...(meta && {
      meta
    }),
    timestamp: new Date().toISOString()
  };
  return res.status(statusCode).json(payload);
}
export function sendCreated(res, data = null, message = 'Resource created successfully') {
  return sendSuccess(res, data, message, 201);
}
export function sendNoContent(res) {
  return res.status(204).send();
}

export function sendError(res, statusCode, message, code = ERROR_CODES_BY_STATUS[statusCode] || 'REQUEST_FAILED', details = null) {
  return res.status(statusCode).json({
    success: false,
    error: { code, message, statusCode, details },
    timestamp: new Date().toISOString(),
  });
}
export default {
  sendSuccess,
  sendCreated,
  sendNoContent,
  sendError
};
