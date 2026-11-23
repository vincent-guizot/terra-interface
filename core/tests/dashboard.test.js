import assert from 'node:assert/strict';
import test from 'node:test';
import prisma from '../src/prisma/prisma.service.js';

if (prisma.aiRecommendation) prisma.aiRecommendation.count = async () => 1; // keep the suite database-independent
const { default: app } = await import('../src/app.js');
const dashboard = await import('../src/modules/dashboard/dashboard.service.js');
const notifications = await import('../src/modules/notifications/notifications.service.js');

async function withServer(fn) {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/v1`;
  try {
    await fn(url);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
    await prisma.$disconnect();
  }
}
const json = (res) => res.json();
const post = (url, body) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

test('dashboard read endpoints return the documented shapes', async () => {
  dashboard._resetForTests();
  await withServer(async (url) => {
    const overview = (await json(await fetch(`${url}/dashboard/overview`))).data;
    assert.equal(overview.farm.areaM2, 300);
    assert.equal(overview.selfSufficiency.value, 72);
    assert.equal(overview.stats.length, 3);

    const map = (await json(await fetch(`${url}/dashboard/map`))).data;
    assert.equal(map.zones.length, 12);
    assert.equal(map.zoneCount, 12);
    const ids = new Set(map.zones.map((z) => z.id));
    for (const f of map.flows) assert(ids.has(f.from) && ids.has(f.to), `flow ${f.id} references unknown zone`);
    for (const z of map.zones) assert.equal(z.rect.length, 4);

    const production = (await json(await fetch(`${url}/dashboard/production`))).data;
    assert.equal(production.items.length, 6);
    assert.equal(production.trend.monthly.labels.length, production.trend.monthly.values.length);
    assert.equal(production.harvestSchedule.length, 4);
    assert.match(production.harvestSchedule[0].date, /^\d{4}-\d{2}-\d{2}$/);

    const resources = (await json(await fetch(`${url}/dashboard/resources`))).data;
    assert.equal(resources.cards.length, 4);
    assert.equal(resources.trend.months.length, resources.trend.energy.length);

    const intelligence = (await json(await fetch(`${url}/dashboard/intelligence`))).data;
    assert.equal(intelligence.recommendations.every((r) => r.status === 'PENDING'), true);
    assert.equal(intelligence.ecosystemHealth.value, 87);
  });
});

test('activities: create validates input, toggle updates progress', async () => {
  dashboard._resetForTests();
  await withServer(async (url) => {
    const before = (await json(await fetch(`${url}/dashboard/activities`))).data;
    assert.equal(before.progressPct, 40);

    const bad = await post(`${url}/dashboard/activities/tasks`, { title: '', time: '25:00' });
    assert.equal(bad.status, 400);
    const badBody = await json(bad);
    assert.equal(badBody.error.code, 'VALIDATION_ERROR');
    assert.deepEqual(badBody.error.details.map((d) => d.field).sort(), ['time', 'title']);

    const created = await post(`${url}/dashboard/activities/tasks`, { title: 'Panen selada', time: '11:30' });
    assert.equal(created.status, 201);
    const task = (await json(created)).data;
    assert.equal(task.done, false);

    const toggled = await fetch(`${url}/dashboard/activities/tasks/${task.id}/toggle`, { method: 'PATCH' });
    assert.equal((await json(toggled)).data.done, true);

    const after = (await json(await fetch(`${url}/dashboard/activities`))).data;
    assert.equal(after.tasks.length, 6);
    assert.equal(after.progressPct, 50);
    assert(after.tasks.map((t) => t.time).every((t, i, a) => i === 0 || a[i - 1] <= t), 'tasks sorted by time');

    const missing = await fetch(`${url}/dashboard/activities/tasks/nope/toggle`, { method: 'PATCH' });
    assert.equal(missing.status, 404);
  });
});

test('recommendations can be applied once and unknown ids 404', async () => {
  dashboard._resetForTests();
  await withServer(async (url) => {
    const res = await post(`${url}/dashboard/intelligence/recommendations/rec2/apply`, {});
    assert.equal(res.status, 200);
    const first = (await json(res)).data;
    assert.equal(first.status, 'APPLIED');
    const again = (await json(await post(`${url}/dashboard/intelligence/recommendations/rec2/apply`, {}))).data;
    assert.equal(again.appliedAt, first.appliedAt);
    const list = (await json(await fetch(`${url}/dashboard/intelligence`))).data;
    assert.equal(list.recommendations.find((r) => r.id === 'rec2').status, 'APPLIED');
    assert.equal(list.recommendations.find((r) => r.id === 'rec1').status, 'PENDING');
    assert.equal((await post(`${url}/dashboard/intelligence/recommendations/zzz/apply`, {})).status, 404);
  });
});

test('assistant answers from dashboard data and rejects empty questions', async () => {
  await withServer(async (url) => {
    const ok = (await json(await post(`${url}/dashboard/intelligence/ask`, { query: 'Evaluasi produksi bulan ini' }))).data;
    assert.match(ok.reply, /138\.4 kg/);
    assert.equal(ok.intentCategory, 'production');
    const harvest = (await json(await post(`${url}/dashboard/intelligence/ask`, { query: 'Rencana panen minggu depan' }))).data;
    assert.equal(harvest.intentCategory, 'harvest');
    assert.equal((await post(`${url}/dashboard/intelligence/ask`, { query: '  ' })).status, 400);
  });
});

test('notifications: reminders derive from state and read state persists', async () => {
  dashboard._resetForTests();
  notifications._resetForTests();
  await withServer(async (url) => {
    const list = (await json(await fetch(`${url}/notifications`))).data;
    assert.equal(typeof list.unreadCount, 'number');
    assert.equal(list.unreadCount, list.items.filter((n) => !n.read).length);
    for (const n of list.items) {
      assert(['reminder', 'harvest', 'alert'].includes(n.type));
      assert(['info', 'warning', 'critical'].includes(n.severity));
    }
    if (list.items.length) {
      const id = list.items[0].id;
      const read = (await json(await post(`${url}/notifications/${id}/read`, {}))).data;
      assert.equal(read.read, true);
      const unread = (await json(await fetch(`${url}/notifications?unread=true`))).data;
      assert(!unread.items.some((n) => n.id === id));
    }
    assert.equal((await post(`${url}/notifications/does-not-exist/read`, {})).status, 404);
    const all = (await json(await post(`${url}/notifications/read-all`, {}))).data;
    assert.equal(typeof all.marked, 'number');
    assert.equal((await json(await fetch(`${url}/notifications`))).data.unreadCount, 0);
  });
});

test('notifications: task reminders use the farm clock (Asia/Jakarta)', () => {
  dashboard._resetForTests();
  notifications._resetForTests();
  // 02:30Z = 09:30 WIB. Task t3 (10:00) is due in 30 minutes; t4 (14:00) and t5 (16:00) are not yet relevant.
  const soon = notifications.listNotifications({ now: new Date('2026-11-22T02:30:00Z') }).items.filter((n) => n.type === 'reminder');
  assert.deepEqual(soon.map((n) => n.id), ['rem-2026-11-22-t3-soon']);
  assert.equal(soon[0].severity, 'info');
  assert.match(soon[0].message, /30 menit/);

  // 03:30Z = 10:30 WIB. Task t3 is now overdue.
  const late = notifications.listNotifications({ now: new Date('2026-11-22T03:30:00Z') }).items.filter((n) => n.type === 'reminder');
  assert.deepEqual(late.map((n) => n.id), ['rem-2026-11-22-t3-late']);
  assert.equal(late[0].severity, 'warning');

  // Completed tasks never produce reminders.
  dashboard._resetForTests();
  dashboard.toggleTask('t3'); // toggles on the real "today", so use the same date for the fixed clock
  const realToday = dashboard.farmNow().date;
  const at = new Date(`${realToday}T03:30:00Z`);
  const afterDone = notifications.listNotifications({ now: at }).items.filter((n) => n.type === 'reminder');
  assert(!afterDone.some((n) => n.id.endsWith('-t3-late')));

  // Harvest within two days notifies; farther ones do not.
  const harvest = notifications.listNotifications({ now: new Date('2026-11-22T02:30:00Z') }).items.filter((n) => n.type === 'harvest');
  assert(harvest.every((n) => /hari ini|besok|lusa/.test(n.title)));
});
