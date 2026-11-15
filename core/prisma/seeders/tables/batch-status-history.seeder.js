import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('batchStatusHistory', new URL('../../data/batch-status-history.json', import.meta.url));
