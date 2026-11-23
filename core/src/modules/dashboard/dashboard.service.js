import {
  FARM, ZONE_CATEGORIES, ZONES, ZONE_FLOWS, MAP_PANEL, MASTER_PLAN_IMAGE,
  OVERVIEW, PRODUCTION, RESOURCES, DAILY_TASKS, ACTIVITIES, INTELLIGENCE,
} from '../../constants/dashboard.constants.js';
import { AppError } from '../../middlewares/errorHandler.js';

const TZ = FARM.timeZone;

/* ------------------------------ date helpers (farm time zone) ------------------------------ */
export function farmNow(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(now).map((p) => [p.type, p.value])
  );
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` };
}
export function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}
function lastMonthLabels(dateStr, count) {
  const [y, m] = dateStr.split('-').map(Number);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(Date.UTC(y, m - 1 - (count - 1 - i), 1));
    return new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(d);
  });
}
const clone = (v) => JSON.parse(JSON.stringify(v));
const byTime = (a, b) => a.time.localeCompare(b.time);

/* ------------------------------------------ state ------------------------------------------ */
const tasksByDate = new Map(); // 'YYYY-MM-DD' -> task[]
const applied = new Map(); // recommendation id -> ISO timestamp

function tasksFor(date) {
  if (!tasksByDate.has(date)) {
    tasksByDate.set(date, clone(DAILY_TASKS));
    // keep the store small: only the last 7 days
    [...tasksByDate.keys()].sort().slice(0, -7).forEach((k) => tasksByDate.delete(k));
  }
  return tasksByDate.get(date);
}

/* ------------------------------------------ reads ------------------------------------------ */
export function getFarm() {
  return clone(FARM);
}

export function getOverview() {
  return { farm: getFarm(), ...clone(OVERVIEW) };
}

export function getMap() {
  return {
    image: MASTER_PLAN_IMAGE,
    totalAreaM2: FARM.areaM2,
    zoneCount: ZONES.length,
    categories: clone(ZONE_CATEGORIES),
    zones: clone(ZONES),
    flows: clone(ZONE_FLOWS),
    ...clone(MAP_PANEL),
  };
}

export function getProduction(now = new Date()) {
  const { date } = farmNow(now);
  const { trend, harvestSchedule, ...rest } = clone(PRODUCTION);
  return {
    ...rest,
    trend: {
      unit: trend.unit,
      weekly: trend.weekly,
      monthly: { labels: lastMonthLabels(date, 6), values: trend.monthlyValues },
      yearly: trend.yearly,
    },
    harvestSchedule: harvestSchedule.map(({ dayOffset, ...h }) => ({ ...h, date: addDays(date, dayOffset) })),
  };
}

export function getResources() {
  const { date } = farmNow();
  const data = clone(RESOURCES);
  return { ...data, trend: { months: lastMonthLabels(date, 6), ...data.trend } };
}

export function getActivities(now = new Date()) {
  const { date, time } = farmNow(now);
  const tasks = tasksFor(date);
  const done = tasks.filter((t) => t.done).length;
  return {
    today: date,
    now: time,
    tasks: clone(tasks),
    progressPct: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
    weeklyPlan: clone(ACTIVITIES.weeklyPlan),
    recent: ACTIVITIES.recent.map(({ dayOffset, ...r }) => ({ ...r, date: addDays(date, -dayOffset) })),
    quickActions: clone(ACTIVITIES.quickActions),
  };
}

export function getIntelligence() {
  const data = clone(INTELLIGENCE);
  data.recommendations = data.recommendations.map((r) => ({
    ...r,
    status: applied.has(r.id) ? 'APPLIED' : 'PENDING',
    appliedAt: applied.get(r.id) || null,
  }));
  return data;
}

/* ----------------------------------------- mutations ----------------------------------------- */
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export function createTask(dto = {}) {
  const details = [];
  const title = typeof dto.title === 'string' ? dto.title.trim() : '';
  if (!title) details.push({ field: 'title', message: 'title is required' });
  else if (title.length > 120) details.push({ field: 'title', message: 'title must be at most 120 characters' });
  const time = dto.time === undefined ? '09:00' : dto.time;
  if (typeof time !== 'string' || !TIME_RE.test(time)) details.push({ field: 'time', message: 'time must be HH:MM (24h)' });
  if (details.length) throw new AppError('Validation failed', 400, 'VALIDATION_ERROR', details);

  const tasks = tasksFor(farmNow().date);
  const task = { id: `t${Date.now().toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`, title, time, done: false, icon: 'task' };
  tasks.push(task);
  tasks.sort(byTime);
  return clone(task);
}

export function toggleTask(id) {
  const task = tasksFor(farmNow().date).find((t) => t.id === id);
  if (!task) throw new AppError(`Task '${id}' not found`, 404, 'NOT_FOUND');
  task.done = !task.done;
  return clone(task);
}

export function applyRecommendation(id) {
  if (!INTELLIGENCE.recommendations.some((r) => r.id === id)) throw new AppError(`Recommendation '${id}' not found`, 404, 'NOT_FOUND');
  if (!applied.has(id)) applied.set(id, new Date().toISOString());
  return { id, status: 'APPLIED', appliedAt: applied.get(id) };
}

/* --------------------------------------- Terra AI answers --------------------------------------- */
export function askAssistant(question) {
  const q = typeof question === 'string' ? question.trim() : '';
  if (!q) throw new AppError('Validation failed', 400, 'VALIDATION_ERROR', [{ field: 'query', message: 'query is required' }]);
  if (q.length > 500) throw new AppError('Validation failed', 400, 'VALIDATION_ERROR', [{ field: 'query', message: 'query must be at most 500 characters' }]);

  const p = getProduction();
  const r = getResources();
  const a = getActivities();
  const s = q.toLowerCase();
  let reply;
  let intent = 'general';

  if (/(produksi|evaluasi|hasil)/.test(s)) {
    const top = [...p.items].sort((x, y) => y.delta - x.delta)[0];
    reply = `Total produksi bulan ini ${p.summary.totalKg} kg (+${p.summary.deltaPct}% dibanding bulan lalu). Pertumbuhan tertinggi: ${top.title} (+${top.delta}%). Sayuran menyumbang ${p.items.find((i) => i.id === 'sayuran').value} kg.`;
    intent = 'production';
  } else if (/(panen|jadwal|rencana)/.test(s)) {
    reply = `Jadwal panen berikutnya: ${p.harvestSchedule.map((h) => `${h.name} (${h.date}, ${h.status})`).join(', ')}.`;
    intent = 'harvest';
  } else if (/(efisiensi|tips|hemat|saran)/.test(s)) {
    const rec = getIntelligence().recommendations.find((x) => x.status === 'PENDING');
    reply = rec
      ? `Saran saat ini: ${rec.title}. ${rec.desc} Efisiensi energi ${r.cards.find((c) => c.id === 'energy').pct}% dan sirkularitas ${r.cards.find((c) => c.id === 'circular').pct}%.`
      : 'Semua rekomendasi sudah diterapkan. Efisiensi sistem dalam kondisi baik.';
    intent = 'efficiency';
  } else if (/(air|water)/.test(s)) {
    reply = `Persediaan air ${r.cards.find((c) => c.id === 'water').value} (${r.cards.find((c) => c.id === 'water').pct}%). Konsumsi stabil dan masih dalam batas normal.`;
    intent = 'water';
  } else if (/(energi|listrik|solar)/.test(s)) {
    reply = `Energi surya bulan ini ${r.cards.find((c) => c.id === 'energy').value} dengan pemanfaatan ${r.cards.find((c) => c.id === 'energy').pct}%.`;
    intent = 'energy';
  } else if (/(tugas|kegiatan|hari ini)/.test(s)) {
    const pending = a.tasks.filter((t) => !t.done);
    reply = pending.length
      ? `Progres hari ini ${a.progressPct}%. Tugas tersisa: ${pending.map((t) => `${t.title} (${t.time})`).join(', ')}.`
      : 'Semua tugas hari ini sudah selesai.';
    intent = 'tasks';
  } else {
    reply = `Kesehatan ekosistem ${INTELLIGENCE.ecosystemHealth.value}% (${INTELLIGENCE.ecosystemHealth.label}), swasembada ${OVERVIEW.selfSufficiency.value}%. Tanyakan tentang produksi, panen, air, energi, atau tugas hari ini.`;
  }
  return { reply, intentCategory: intent, timestamp: new Date().toISOString() };
}

// test hook
export function _resetForTests() {
  tasksByDate.clear();
  applied.clear();
}
