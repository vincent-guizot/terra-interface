"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const VALID_TRANSITIONS = {
    [client_1.BatchStatus.DRAFT]: [client_1.BatchStatus.PLANNED, client_1.BatchStatus.CANCELLED],
    [client_1.BatchStatus.PLANNED]: [client_1.BatchStatus.ACTIVE, client_1.BatchStatus.CANCELLED],
    [client_1.BatchStatus.ACTIVE]: [client_1.BatchStatus.ON_HOLD, client_1.BatchStatus.COMPLETED, client_1.BatchStatus.CANCELLED],
    [client_1.BatchStatus.ON_HOLD]: [client_1.BatchStatus.ACTIVE, client_1.BatchStatus.CANCELLED],
    [client_1.BatchStatus.COMPLETED]: [],
    [client_1.BatchStatus.CANCELLED]: [],
};
function testTransitions() {
    console.log('🧪 Running Universal Batch State Machine Invariant Tests...');
    const activeTargets = VALID_TRANSITIONS[client_1.BatchStatus.ACTIVE];
    if (!activeTargets.includes(client_1.BatchStatus.ON_HOLD)) {
        throw new Error('Test failed: ACTIVE should allow ON_HOLD');
    }
    console.log('  ✔ ACTIVE -> ON_HOLD is valid');
    const completedTargets = VALID_TRANSITIONS[client_1.BatchStatus.COMPLETED];
    if (completedTargets.length !== 0) {
        throw new Error('Test failed: COMPLETED must be terminal (no transitions allowed)');
    }
    console.log('  ✔ COMPLETED is strictly terminal (immutable)');
    const cancelledTargets = VALID_TRANSITIONS[client_1.BatchStatus.CANCELLED];
    if (cancelledTargets.length !== 0) {
        throw new Error('Test failed: CANCELLED must be terminal');
    }
    console.log('  ✔ CANCELLED is strictly terminal');
    const draftTargets = VALID_TRANSITIONS[client_1.BatchStatus.DRAFT];
    if (draftTargets.includes(client_1.BatchStatus.ACTIVE)) {
        throw new Error('Test failed: DRAFT cannot skip directly to ACTIVE');
    }
    console.log('  ✔ DRAFT cannot transition directly to ACTIVE (must be PLANNED first)');
    console.log('🎉 All State Machine Invariant Tests Passed Successfully!');
}
testTransitions();
