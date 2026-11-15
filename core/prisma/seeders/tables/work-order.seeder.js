import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('workOrder', new URL('../../data/work-order.json', import.meta.url));
