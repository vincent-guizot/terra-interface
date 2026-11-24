import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('dispatchPolicy', new URL('../../data/dispatch-policy.json', import.meta.url));
