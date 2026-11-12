import { BatchStatus } from '@prisma/client';

// Deterministic State Machine Transition Matrix
const VALID_TRANSITIONS: Record<BatchStatus, BatchStatus[]> = {
  [BatchStatus.DRAFT]: [BatchStatus.PLANNED, BatchStatus.CANCELLED],
  [BatchStatus.PLANNED]: [BatchStatus.ACTIVE, BatchStatus.CANCELLED],
  [BatchStatus.ACTIVE]: [BatchStatus.ON_HOLD, BatchStatus.COMPLETED, BatchStatus.CANCELLED],
  [BatchStatus.ON_HOLD]: [BatchStatus.ACTIVE, BatchStatus.CANCELLED],
  [BatchStatus.COMPLETED]: [],
  [BatchStatus.CANCELLED]: [],
};

function testTransitions() {
  console.log('🧪 Running Universal Batch State Machine Invariant Tests...');

  // 1. Test Valid Active -> On Hold
  const activeTargets = VALID_TRANSITIONS[BatchStatus.ACTIVE];
  if (!activeTargets.includes(BatchStatus.ON_HOLD)) {
    throw new Error('Test failed: ACTIVE should allow ON_HOLD');
  }
  console.log('  ✔ ACTIVE -> ON_HOLD is valid');

  // 2. Test Completed is terminal
  const completedTargets = VALID_TRANSITIONS[BatchStatus.COMPLETED];
  if (completedTargets.length !== 0) {
    throw new Error('Test failed: COMPLETED must be terminal (no transitions allowed)');
  }
  console.log('  ✔ COMPLETED is strictly terminal (immutable)');

  // 3. Test Cancelled is terminal
  const cancelledTargets = VALID_TRANSITIONS[BatchStatus.CANCELLED];
  if (cancelledTargets.length !== 0) {
    throw new Error('Test failed: CANCELLED must be terminal');
  }
  console.log('  ✔ CANCELLED is strictly terminal');

  // 4. Test Draft to Active is illegal without Planning
  const draftTargets = VALID_TRANSITIONS[BatchStatus.DRAFT];
  if (draftTargets.includes(BatchStatus.ACTIVE)) {
    throw new Error('Test failed: DRAFT cannot skip directly to ACTIVE');
  }
  console.log('  ✔ DRAFT cannot transition directly to ACTIVE (must be PLANNED first)');

  console.log('🎉 All State Machine Invariant Tests Passed Successfully!');
}

testTransitions();
