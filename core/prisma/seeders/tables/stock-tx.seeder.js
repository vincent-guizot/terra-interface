import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('stockTx', new URL('../../data/stock-tx.json', import.meta.url));
