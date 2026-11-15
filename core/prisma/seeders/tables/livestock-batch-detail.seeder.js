import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('livestockBatchDetail', new URL('../../data/livestock-batch-detail.json', import.meta.url));
