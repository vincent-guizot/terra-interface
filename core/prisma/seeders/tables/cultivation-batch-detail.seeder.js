import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('cultivationBatchDetail', new URL('../../data/cultivation-batch-detail.json', import.meta.url));
