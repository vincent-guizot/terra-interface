import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('productionType', new URL('../../data/production-type.json', import.meta.url));
