"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const TEST_SUITES = [
    'batch-state-machine.test.js',
    'circular-inventory-invariants.test.js',
    'cultivation-invariants.test.js',
    'intelligence-autonomy-invariants.test.js',
    'livestock-aquaculture-invariants.test.js',
    'microgrid-telemetry-invariants.test.js',
    'domain-event-bus-invariants.test.js',
    'iot-gateway-invariants.test.js',
];
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
                cwd: path.resolve(__dirname, '..'),
                encoding: 'utf-8',
                stdio: ['pipe', 'pipe', 'pipe'],
            });
            const durationMs = Date.now() - start;
            results.push({ suite, passed: true, durationMs, output });
            console.log(`[PASS] ${suite} (${durationMs}ms)`);
        }
        catch (err) {
            const durationMs = Date.now() - start;
            const errorOutput = err.stdout || err.stderr || err.message;
            results.push({ suite, passed: false, durationMs, error: errorOutput });
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
    const passCount = results.filter((r) => r.passed).length;
    console.log(`Results: ${passCount}/${TEST_SUITES.length} suites passed.`);
    console.log('========================================================================\n');
    if (!allPassed) {
        process.exit(1);
    }
}
runAllTests().catch((err) => {
    console.error('Test runner encountered an unexpected error:', err);
    process.exit(1);
});
