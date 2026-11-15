import { sendError } from '../utils/response.js';

export function notFoundHandler(req, res, next) {
  return sendError(res, 404, 'Requested endpoint was not found', 'ROUTE_NOT_FOUND', { method: req.method, path: req.path });
}
export default notFoundHandler;
