import assert from 'node:assert/strict';
import test from 'node:test';
import prisma from '../src/prisma/prisma.service.js';

// This suite exercises routing and calculations independently of database access.
prisma.aiRecommendation.count = async () => 1;
const { default: app } = await import('../src/app.js');

test('legacy operational endpoints and SSE survive the ESM cleanup', async () => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/v1`;
  const controller = new AbortController();
  try {
    const dosing = await fetch(`${url}/cultivation/nutrient-dosing`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ecTarget: 1.8, currentEc: 1.2, reservoirLiters: 200 }),
    });
    assert.equal(dosing.status, 200);
    const dosingResponse = await dosing.json();
    assert.equal(dosingResponse.success, true);
    assert.equal(dosingResponse.data.solutionAPumpMl, 600);

    const invalid = await fetch(`${url}/energy-water/gateway/ingest`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
    });
    assert.equal(invalid.status, 400);
    const invalidResponse = await invalid.json();
    assert.equal(invalidResponse.success, false);
    assert.equal(invalidResponse.error.code, 'VALIDATION_ERROR');
    assert.equal(invalidResponse.error.statusCode, 400);
    assert(Array.isArray(invalidResponse.error.details));

    const stream = await fetch(`${url}/telemetry/stream`, { signal: controller.signal });
    assert.equal(stream.status, 200);
    assert.match(stream.headers.get('content-type'), /text\/event-stream/);
    const reader = stream.body.getReader();
    const first = new TextDecoder().decode((await reader.read()).value);
    assert.match(first, /data: /);
    const snapshot = JSON.parse(first.split('data: ')[1].split('\n')[0]);
    assert.equal(typeof snapshot.batterySoC, 'number');
    await reader.cancel();
  } finally {
    controller.abort();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await prisma.$disconnect();
  }
});
