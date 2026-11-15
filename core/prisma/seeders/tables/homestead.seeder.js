import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('homestead', new URL('../../data/homestead.json', import.meta.url));
