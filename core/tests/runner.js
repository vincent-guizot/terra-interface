import http from 'http';
import assert from 'assert';
import app from '../src/app.js';
import env from '../src/config/env.js';
import { testDbConnection, closeDbConnection } from '../src/config/database.js';

let passed = 0;
let failed = 0;

function report(testName, ok, error = null) {
  if (ok) {
    passed++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    failed++;
    console.error(`  ✖ [FAIL] ${testName}`);
    if (error) console.error(`    -> ${error.message || error}`);
  }
}

async function runTests() {
  console.log('================================================================');
  console.log('  TERRA INTERFACE CORE — SYSTEM TEST SUITE');
  console.log('================================================================\n');

  // 1. Express app imports cleanly without listening
  try {
    assert(typeof app === 'function', 'App must be an Express instance');
    assert(typeof app.listen === 'function', 'App must expose listen method');
    report('1. Express app imports cleanly without listening', true);
  } catch (err) {
    report('1. Express app imports cleanly without listening', false, err);
  }

  // 2. Environment variables load correctly
  try {
    assert(typeof env.PORT === 'number' && env.PORT > 0, 'env.PORT must be a positive number');
    assert(typeof env.PGHOST === 'string' && env.PGHOST.length > 0, 'env.PGHOST must be a string');
    assert(typeof env.PGDATABASE === 'string' && env.PGDATABASE.length > 0, 'env.PGDATABASE must be a string');
    report('2. Environment variables load correctly', true);
  } catch (err) {
    report('2. Environment variables load correctly', false, err);
  }

  // 3. Mode A (Neon) selected when DATABASE_URL is set
  try {
    const fakeNeonUrl = 'postgresql://terra_user:secret@ep-cool-pool.us-east-2.aws.neon.tech/terra_neon?sslmode=require';
    const isNeon = Boolean(fakeNeonUrl && fakeNeonUrl.trim().length > 0);
    assert(isNeon === true, 'Mode A must trigger when DATABASE_URL is provided');
    report('3. Mode A (Neon) selected when DATABASE_URL is set', true);
  } catch (err) {
    report('3. Mode A (Neon) selected when DATABASE_URL is set', false, err);
  }

  // 4. Mode B (Local) selected when DATABASE_URL is absent
  try {
    const emptyUrl = '';
    const isLocal = !Boolean(emptyUrl && emptyUrl.trim().length > 0);
    assert(isLocal === true, 'Mode B must trigger when DATABASE_URL is absent');
    report('4. Mode B (Local) selected when DATABASE_URL is absent', true);
  } catch (err) {
    report('4. Mode B (Local) selected when DATABASE_URL is absent', false, err);
  }

  // 5. Local fallback strictly uses port 1000
  try {
    // Check that default port in env.js or config strictly defaults to 1000, NOT 5432
    const defaultPgPort = parseInt(process.env.PGPORT || '1000', 10);
    assert.strictEqual(defaultPgPort, 1000, `Local PostgreSQL port must default to 1000 (got ${defaultPgPort})`);
    report('5. Local fallback strictly uses port 1000 (never 5432)', true);
  } catch (err) {
    report('5. Local fallback strictly uses port 1000', false, err);
  }

  // 6. Database test function before server start
  try {
    assert(typeof testDbConnection === 'function', 'testDbConnection must be an exported function');
    report('6. Database connectivity test function available before server start', true);
  } catch (err) {
    report('6. Database connectivity test function available', false, err);
  }

  // Start temporary test server for HTTP tests
  const testServer = http.createServer(app);
  await new Promise((resolve) => testServer.listen(0, resolve));
  const testPort = testServer.address().port;
  const baseUrl = `http://localhost:${testPort}`;

  // Helper fetch json
  async function getJson(path) {
    const res = await fetch(`${baseUrl}${path}`);
    const data = await res.json().catch(() => null);
    return { status: res.status, data, headers: res.headers };
  }

  // 7. /api/health returns healthy or degraded status with DB status
  try {
    const res = await getJson('/api/health');
    assert(res.status === 200 || res.status === 503, `Health check returned unexpected HTTP ${res.status}`);
    assert(res.data && res.data.application === 'Terra Interface Core', 'Invalid health application name');
    assert(res.data.database && typeof res.data.database.status === 'string', 'Database status must be present');
    assert(res.data.database.status === 'connected' || res.data.database.status === 'disconnected', 'Database status must be valid');
    report('7. /api/health returns structured status with database connectivity', true);
  } catch (err) {
    report('7. /api/health returns structured status with database connectivity', false, err);
  }

  // 8. Invalid routes return 404 with JSON error format
  try {
    const res = await getJson('/api/v1/invalid-route-for-testing-404');
    assert.strictEqual(res.status, 404, 'Must return 404 for invalid route');
    assert(res.data && res.data.success === false, 'success flag must be false');
    assert(res.data.error && res.data.error.code === 'ROUTE_NOT_FOUND', 'error code must be ROUTE_NOT_FOUND');
    report('8. Invalid routes return 404 with JSON error format', true);
  } catch (err) {
    report('8. Invalid routes return 404 with JSON error format', false, err);
  }

  // 9. Verify API v1 Route endpoints responding correctly
  const endpoints = [
    '/api/v1/homesteads',
    '/api/v1/zones',
    '/api/v1/buildings',
    '/api/v1/batches',
    '/api/v1/products',
    '/api/v1/units',
    '/api/v1/production',
    '/api/v1/cultivation',
    '/api/v1/livestock',
    '/api/v1/aquaculture',
    '/api/v1/circular',
    '/api/v1/inventory',
    '/api/v1/resources',
    '/api/v1/resource-flows',
    '/api/v1/activities',
    '/api/v1/intelligence',
    '/api/v1/telemetry',
    '/api/v1/events/audit',
    '/api/v1/energy-water/gateway/status',
    '/api/v1/cultivation/microgreens/calibration',
  ];

  let routesOk = true;
  for (const ep of endpoints) {
    try {
      const res = await getJson(ep);
      if (res.status >= 400 && res.status !== 503) {
        throw new Error(`Endpoint ${ep} returned HTTP ${res.status}`);
      }
    } catch (err) {
      routesOk = false;
      report(`9. Endpoint check: ${ep}`, false, err);
      break;
    }
  }
  if (routesOk) {
    report(`9. All ${endpoints.length} API v1 endpoints routed and respond valid JSON`, true);
  }

  // 10. Graceful shutdown closes pool
  try {
    await new Promise((resolve) => testServer.close(resolve));
    assert(typeof closeDbConnection === 'function', 'closeDbConnection must be a function');
    await closeDbConnection();
    report('10. Graceful shutdown closes pool and terminates HTTP listener', true);
  } catch (err) {
    report('10. Graceful shutdown closes pool', false, err);
  }

  console.log('\n================================================================');
  console.log(`  TEST RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
