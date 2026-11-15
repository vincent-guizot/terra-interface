/**
 * Standard API Response Formatters
 */
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
export default {
  sendSuccess,
  sendCreated,
  sendNoContent
};
