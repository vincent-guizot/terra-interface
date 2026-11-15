import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('stockMovement', new URL('../../data/stock-movement.json', import.meta.url));
