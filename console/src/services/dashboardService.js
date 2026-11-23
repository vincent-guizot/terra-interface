// Terra Interface Console — dashboard + notifications API (core: /dashboard/*, /notifications)
import { ApiClient } from './apiClient.js';

export const DashboardService = {
  get: (section) => ApiClient.get(`/dashboard/${section}`),
  createTask: (task) => ApiClient.post('/dashboard/activities/tasks', task),
  toggleTask: (id) => ApiClient.patch(`/dashboard/activities/tasks/${encodeURIComponent(id)}/toggle`, {}),
  applyRecommendation: (id) => ApiClient.post(`/dashboard/intelligence/recommendations/${encodeURIComponent(id)}/apply`, {}),
  ask: (query) => ApiClient.post('/dashboard/intelligence/ask', { query }),
};

export const NotificationService = {
  list: () => ApiClient.get('/notifications'),
  markRead: (id) => ApiClient.post(`/notifications/${encodeURIComponent(id)}/read`, {}),
  markAllRead: () => ApiClient.post('/notifications/read-all', {}),
};
