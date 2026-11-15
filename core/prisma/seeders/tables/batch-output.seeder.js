import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('batchOutput', new URL('../../data/batch-output.json', import.meta.url));
