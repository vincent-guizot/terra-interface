import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('compostBatchDetail', new URL('../../data/compost-batch-detail.json', import.meta.url));
