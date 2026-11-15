import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('building', new URL('../../data/building.json', import.meta.url));
