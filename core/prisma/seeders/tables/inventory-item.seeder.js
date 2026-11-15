import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('inventoryItem', new URL('../../data/inventory-item.json', import.meta.url));
