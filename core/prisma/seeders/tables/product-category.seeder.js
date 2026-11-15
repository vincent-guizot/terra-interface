import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('productCategory', new URL('../../data/product-category.json', import.meta.url));
