import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { sendSuccess, sendCreated, sendNoContent } from '../src/utils/response.js';
import { rateLimitHandler } from '../src/middlewares/rateLimiter.js';
import prisma from '../src/prisma/prisma.service.js';
import inventoryService from '../src/modules/inventory/inventory.service.js';
import activitiesService from '../src/modules/activities/activities.service.js';

prisma.aiRecommendation.count = async () => 1;
const { default: app } = await import('../src/app.js');
const schema = JSON.parse(await readFile(new URL('../docs/api-response.schema.json', import.meta.url), 'utf8'));

function checkEnvelope(payload, status) {
  const shape = schema.oneOf[payload.success ? 0 : 1];
  for (const key of shape.required) assert(Object.hasOwn(payload, key), `missing ${key}`);
  for (const key of Object.keys(payload)) assert(Object.hasOwn(shape.properties, key), `unexpected ${key}`);
  assert.equal(new Date(payload.timestamp).toISOString(), payload.timestamp);
  if (!payload.success) {
    assert.equal(payload.error.statusCode, status);
    assert.equal(typeof payload.error.code, 'string');
    assert.equal(typeof payload.error.message, 'string');
    assert(Object.hasOwn(payload.error, 'details'));
    assert(!Object.hasOwn(payload.error, 'stack'));
  }
}

function responseRecorder() {
  return { status(code) { this.statusCode = code; return this; }, json(data) { this.body = data; return this; }, send() { return this; } };
}

test('formatters preserve empty collections, create status, metadata and no-content semantics', () => {
  const response = responseRecorder();
  sendSuccess(response, [], 'Empty collection', 200, { source: 'demo' });
  checkEnvelope(response.body, 200);
  assert.deepEqual(response.body.data, []);
  assert.deepEqual(response.body.meta, { source: 'demo' });
  const created = responseRecorder();
  sendCreated(created, { id: 'new' });
  checkEnvelope(created.body, 201);
  assert.equal(created.statusCode, 201);
  const empty = responseRecorder();
  sendNoContent(empty);
  assert.equal(empty.statusCode, 204);
  assert.equal(empty.body, undefined);
});

test('rate-limit responses generate the standard error envelope per request', t => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-11-15T00:00:00.000Z') });
  const first = responseRecorder();
  rateLimitHandler({}, first);
  checkEnvelope(first.body, 429);
  t.mock.timers.tick(1000);
  const second = responseRecorder();
  rateLimitHandler({}, second);
  checkEnvelope(second.body, 429);
  assert.notEqual(first.body.timestamp, second.body.timestamp);
});

test('REST routes emit uniform success, not-found, validation and parser errors', async () => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const oldSummary = inventoryService.getSummary;
  const oldTasks = [...activitiesService.tasks];
  try {
    for (const endpoint of ['/api/v1/events/audit', '/api/v1/energy-water/gateway/status', '/api/v1/cultivation/microgreens/calibration']) {
      const response = await fetch(base + endpoint);
      assert.equal(response.status, 200);
      checkEnvelope(await response.json(), 200);
    }
    const created = await fetch(base + '/api/v1/activities/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'Response contract test' }) });
    assert.equal(created.status, 201);
    const createdBody = await created.json();
    checkEnvelope(createdBody, 201);
    assert.equal(createdBody.data.title, 'Response contract test');

    for (const endpoint of ['/api/v1/unknown-contract-route', '/api/v1/activities/tasks/nonexistent-contract-task']) {
      const response = await fetch(base + endpoint);
      assert.equal(response.status, 404);
      checkEnvelope(await response.json(), 404);
    }
    const invalid = await fetch(base + '/api/v1/energy-water/gateway/ingest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    const invalidBody = await invalid.json();
    checkEnvelope(invalidBody, 400);
    assert.equal(invalidBody.error.code, 'VALIDATION_ERROR');
    assert(Array.isArray(invalidBody.error.details));

    const malformed = await fetch(base + '/api/v1/activities/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' });
    const malformedBody = await malformed.json();
    assert.equal(malformed.status, 400);
    checkEnvelope(malformedBody, 400);
    assert.equal(malformedBody.error.code, 'INVALID_JSON');

    inventoryService.getSummary = async () => { throw new Error('private-database-diagnostics'); };
    const failure = await fetch(base + '/api/v1/inventory/summary');
    const failureBody = await failure.json();
    assert.equal(failure.status, 500);
    checkEnvelope(failureBody, 500);
    assert(!JSON.stringify(failureBody).includes('private-database-diagnostics'));
    assert.equal(failureBody.error.details, null);
  } finally {
    inventoryService.getSummary = oldSummary;
    activitiesService.tasks = oldTasks;
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await prisma.$disconnect();
  }
});
