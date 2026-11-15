import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('sitePlanVersion', new URL('../../data/site-plan-version.json', import.meta.url));
