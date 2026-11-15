import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('telemetryReading', new URL('../../data/telemetry-reading.json', import.meta.url));
