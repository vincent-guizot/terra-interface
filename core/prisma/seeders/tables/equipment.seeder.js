import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('equipment', new URL('../../data/equipment.json', import.meta.url));
