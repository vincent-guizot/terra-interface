import env from './config/env.js';
import { testDbConnection, closeDbConnection } from './config/database.js';
import app from './app.js';
let server = null;
async function startServer() {
  console.log('=================================================');
  console.log('  TERRA INTERFACE CORE — SYSTEM STARTUP SEQUENCE');
  console.log('=================================================');
  console.log(`[CONFIG] Node Environment: ${env.NODE_ENV}`);
  console.log(`[CONFIG] Port: ${env.PORT}`);

  // Step 1 & 2: Database Connection Test (SELECT 1)
  console.log('[STARTUP] Verifying database connectivity...');
  const dbResult = await testDbConnection();
  if (!dbResult.ok) {
    console.error('=================================================');
    console.error(' [FATAL] Database connection verification failed during startup.');
    console.error(` [FATAL] Reason: ${dbResult.error}`);
    console.error(' [FATAL] Server aborting start. Exiting with status code 1.');
    console.error('=================================================');
    process.exit(1);
  }

  // Step 3: Start HTTP Server only if database connectivity succeeds
  server = app.listen(env.PORT, () => {
    console.log('=================================================');
    console.log(`  Terra Interface Core API is running!`);
    console.log(`  URL:         http://localhost:${env.PORT}`);
    console.log(`  Health:      http://localhost:${env.PORT}/api/health`);
    console.log(`  API V1:      http://localhost:${env.PORT}/api/v1`);
    console.log(`  DB Mode:     ${dbResult.mode}`);
    console.log('=================================================');
  });
  server.on('error', err => {
    console.error('[SERVER ERROR] Express HTTP server encountered an error:', err.message);
    process.exit(1);
  });
}

// Graceful Shutdown Handler
async function gracefulShutdown(signal) {
  console.log(`\n[SHUTDOWN] Received signal: ${signal}. Commencing graceful shutdown...`);
  if (server) {
    server.close(() => {
      console.log('[SHUTDOWN] HTTP server stopped accepting new connections.');
    });
  }
  try {
    await closeDbConnection();
    console.log('[SHUTDOWN] PostgreSQL connection pool safely terminated.');
  } catch (err) {
    console.error('[SHUTDOWN ERROR] Error while closing database pool:', err.message);
  }
  console.log('[SHUTDOWN] Terra Interface Core shutdown complete. Goodbye.');
  process.exit(0);
}
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('unhandledRejection', (reason, promise) => {
  console.error('[UNHANDLED REJECTION] Unhandled promise rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', err => {
  console.error('[UNCAUGHT EXCEPTION] Fatal uncaught exception:', err);
  process.exit(1);
});

// Run startup
startServer();
