import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('facility', new URL('../../data/facility.json', import.meta.url));
