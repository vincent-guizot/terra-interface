import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('batch', new URL('../../data/batch.json', import.meta.url));
