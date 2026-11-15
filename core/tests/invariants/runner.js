import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
"use strict";
import * as child_process_1 from "child_process";
import * as path from "path";
const TEST_SUITES = ['batch-state-machine.test.js', 'circular-inventory-invariants.test.js', 'cultivation-invariants.test.js', 'intelligence-autonomy-invariants.test.js', 'livestock-aquaculture-invariants.test.js', 'microgrid-telemetry-invariants.test.js', 'domain-event-bus-invariants.test.js', 'iot-gateway-invariants.test.js'];
async function runAllTests() {
  console.log('========================================================================');
  console.log('🌿 TERRA INTERFACE — Unified Invariant Verification Test Runner');
  console.log('========================================================================\n');
  const results = [];
  let allPassed = true;
  for (const suite of TEST_SUITES) {
    const suitePath = path.resolve(__dirname, suite);
    const start = Date.now();
    try {
      const output = (0, child_process_1.execSync)(`node "${suitePath}"`, {
        cwd: path.resolve(__dirname, '../..'),
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      const durationMs = Date.now() - start;
      results.push({
        suite,
        passed: true,
        durationMs,
        output
      });
      console.log(`[PASS] ${suite} (${durationMs}ms)`);
    } catch (err) {
      const durationMs = Date.now() - start;
      const errorOutput = [err.stdout, err.stderr].filter(Boolean).join('\n') || err.message;
      results.push({
        suite,
        passed: false,
        durationMs,
        error: errorOutput
      });
      allPassed = false;
      console.error(`[FAIL] ${suite} (${durationMs}ms)\n${errorOutput}`);
    }
  }
  console.log('\n========================================================================');
  console.log('📊 TEST SUMMARY');
  console.log('========================================================================');
  for (const r of results) {
    console.log(`  ${r.passed ? '✔ PASS' : '✖ FAIL'} - ${r.suite} (${r.durationMs}ms)`);
  }
  console.log('------------------------------------------------------------------------');
  const passCount = results.filter(r => r.passed).length;
  console.log(`Results: ${passCount}/${TEST_SUITES.length} suites passed.`);
  console.log('========================================================================\n');
  if (!allPassed) {
    process.exit(1);
  }
}
runAllTests().catch(err => {
  console.error('Test runner encountered an unexpected error:', err);
  process.exit(1);
});
