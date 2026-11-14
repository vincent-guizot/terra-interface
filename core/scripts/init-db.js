#!/usr/bin/env node

/**
 * Automated Database Setup & Seeding Script for Terra Interface
 * Executes Prisma schema push and canonical homestead seeders
 */

const { execSync } = require('child_process');

console.log('================================================================');
console.log('🌱 TERRA INTERFACE — POSTGRESQL DATABASE INITIALIZER');
console.log("   Target: Vincent's Farm (300 m² Homestead, West Java, ID)");
console.log('================================================================');

try {
  console.log('\n[1/3] Generating Prisma Client artifacts...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('\n[2/3] Synchronizing schema with PostgreSQL database...');
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });

  console.log('\n[3/3] Running canonical homestead seeders...');
  execSync('npx ts-node prisma/seeders/seed.ts', { stdio: 'inherit' });

  console.log('\n✅ Database initialization completed successfully!');
} catch (error) {
  console.error('\n❌ Database initialization failed:', error.message);
  process.exit(1);
}
