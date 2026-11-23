import { telemetryAlertHistory } from '../../common/events/listeners/telemetry-alert.listener.js';
import { AppError } from '../../middlewares/errorHandler.js';
import { addDays, farmNow, getActivities, getProduction } from '../dashboard/dashboard.service.js';

const SEVERITY_RANK = { critical: 0, warning: 1, info: 2 };
const SOON_MINUTES = 60;
const readIds = new Set();

const minutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Task reminders, harvest reminders and telemetry alerts, derived from current state. */
function buildNotifications(now = new Date()) {
  const { date, time } = farmNow(now);
  const createdAt = now.toISOString();
  const items = [];

  for (const task of getActivities(now).tasks) {
    if (task.done) continue;
    const diff = minutes(task.time) - minutes(time);
    if (diff < 0) {
      items.push({ id: `rem-${date}-${task.id}-late`, type: 'reminder', severity: 'warning', title: `Tugas terlambat: ${task.title}`, message: `Dijadwalkan pukul ${task.time}.`, link: '/activities', createdAt });
    } else if (diff <= SOON_MINUTES) {
      items.push({ id: `rem-${date}-${task.id}-soon`, type: 'reminder', severity: 'info', title: `Segera: ${task.title}`, message: `Dijadwalkan pukul ${task.time} (${diff} menit lagi).`, link: '/activities', createdAt });
    }
  }

  for (const h of getProduction(now).harvestSchedule) {
    const days = Math.round((Date.parse(`${h.date}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) / 86400000);
    if (days < 0 || days > 2) continue;
    const when = days === 0 ? 'hari ini' : days === 1 ? 'besok' : 'lusa';
    items.push({ id: `harvest-${h.id}-${h.date}`, type: 'harvest', severity: 'info', title: `${h.status} ${h.name} ${when}`, message: `Jadwal ${h.status.toLowerCase()} ${h.name}: ${h.date}.`, link: '/production', createdAt });
  }

  for (const alert of telemetryAlertHistory.slice(0, 20)) {
    items.push({
      id: alert.id,
      type: 'alert',
      severity: alert.severity === 'CRITICAL' ? 'critical' : 'warning',
      title: `Peringatan ${alert.metric}`,
      message: `Nilai ${alert.currentValue} melewati ambang ${alert.threshold}.`,
      link: '/resources',
      createdAt: alert.timestamp,
    });
  }

  return items.sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] || b.createdAt.localeCompare(a.createdAt));
}

export function listNotifications({ unreadOnly = false, now = new Date() } = {}) {
  const all = buildNotifications(now).map((n) => ({ ...n, read: readIds.has(n.id) }));
  const unreadCount = all.filter((n) => !n.read).length;
  return { items: unreadOnly ? all.filter((n) => !n.read) : all, unreadCount, total: all.length };
}

export function markRead(id) {
  if (!buildNotifications().some((n) => n.id === id)) throw new AppError(`Notification '${id}' not found`, 404, 'NOT_FOUND');
  readIds.add(id);
  return { id, read: true };
}

export function markAllRead() {
  const ids = buildNotifications().map((n) => n.id);
  ids.forEach((id) => readIds.add(id));
  return { marked: ids.length };
}

export function _resetForTests() {
  readIds.clear();
}
