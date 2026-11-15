import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('zone', new URL('../../data/zone.json', import.meta.url));
