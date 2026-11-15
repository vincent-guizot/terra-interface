import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('batchHistory', new URL('../../data/batch-history.json', import.meta.url));
