import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('measurementUnit', new URL('../../data/measurement-unit.json', import.meta.url));
