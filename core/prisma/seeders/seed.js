import prisma from '../../src/prisma/prisma.service.js';
import { seedDatabase, validateSeedData } from './run-seeders.js';

try {
  const validation = await validateSeedData();
  if (process.argv.includes('--check')) {
    console.log(`Validated ${validation.tables} tables and ${validation.records} demo records.`);
  } else {
    if (!process.argv.includes('--demo')) throw new Error('Demo seed data requires --demo. Use --check to validate without writing.');
    const results = await seedDatabase(prisma);
    for (const result of results) console.log(`${result.table}: ${result.created} created, ${result.reused} reused`);
  }
} catch (error) {
  console.error('Seeding failed:', error.message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
