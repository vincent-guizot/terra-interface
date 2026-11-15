const test = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load-source.cjs');
const { ApiClient, ApiError } = load("export * from './src/services/apiClient.js';");

test('client unwraps success payloads and accepts no-content responses', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ success: true, message: 'OK', data: [], timestamp: '2026-11-15T00:00:00.000Z' })));
  assert.deepEqual(await ApiClient.get('/items'), []);
  globalThis.fetch = async () => new Response(null, { status: 204 });
  assert.equal(await ApiClient.delete('/items/example'), null);
});

test('client exposes nested API error message, code, HTTP status and field details', async t => {
  const details = [{ field: 'title', message: 'Title is required' }];
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ success: false, error: { message: 'Validation failed', code: 'VALIDATION_ERROR', statusCode: 422, details } }), { status: 422 }));
  await assert.rejects(ApiClient.post('/items', {}), error => {
    assert(error instanceof ApiError);
    assert.equal(error.message, 'Validation failed');
    assert.equal(error.statusCode, 422);
    assert.equal(error.code, 'VALIDATION_ERROR');
    assert.deepEqual(error.details, details);
    return true;
  });
});

test('client retains legacy top-level error message support', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ message: 'Old endpoint error', details: { reason: 'legacy' } }), { status: 400 }));
  await assert.rejects(ApiClient.get('/legacy'), error => error.message === 'Old endpoint error' && error.statusCode === 400 && error.details.reason === 'legacy');
});
