import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('productDefinition', new URL('../../data/product-definition.json', import.meta.url));
