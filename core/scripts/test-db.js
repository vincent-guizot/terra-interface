import { testDbConnection, closeDbConnection } from '../src/config/database.js';

async function run() {
  console.log('================================================================');
  console.log('🌿 Terra Interface Core — PostgreSQL Connectivity Test');
  console.log('================================================================');
  
  const result = await testDbConnection();
  await closeDbConnection();

  if (result.ok) {
    console.log('✓ Database connectivity test PASSED.');
    process.exit(0);
  } else {
    console.error('✖ Database connectivity test FAILED.');
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('Fatal database test error:', err);
  process.exit(1);
});
