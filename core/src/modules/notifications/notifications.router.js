import { Router } from 'express';
import * as service from './notifications.service.js';
import { sendSuccess } from '../../utils/response.js';

const router = Router();
const wrap = (fn, message) => (req, res, next) => {
  try {
    return sendSuccess(res, fn(req), message);
  } catch (err) {
    return next(err);
  }
};

router.get('/', wrap((req) => service.listNotifications({ unreadOnly: req.query.unread === 'true' }), 'Notifications retrieved'));
router.post('/read-all', wrap(() => service.markAllRead(), 'All notifications marked as read'));
router.post('/:id/read', wrap((req) => service.markRead(req.params.id), 'Notification marked as read'));

export default router;
