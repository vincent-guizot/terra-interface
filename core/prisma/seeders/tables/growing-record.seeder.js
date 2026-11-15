import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('growingRecord', new URL('../../data/growing-record.json', import.meta.url));
