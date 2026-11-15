import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('batchEvent', new URL('../../data/batch-event.json', import.meta.url));
