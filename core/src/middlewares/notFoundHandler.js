export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      message: `Endpoint '${req.method} ${req.originalUrl}' not found on Terra Interface Core API`,
      statusCode: 404,
      code: 'ROUTE_NOT_FOUND',
      details: {
        method: req.method,
        path: req.originalUrl
      }
    },
    timestamp: new Date().toISOString()
  });
}
export default notFoundHandler;
