import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('unitConversion', new URL('../../data/unit-conversion.json', import.meta.url));
