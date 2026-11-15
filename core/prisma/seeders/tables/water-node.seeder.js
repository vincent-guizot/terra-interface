import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('waterNode', new URL('../../data/water-node.json', import.meta.url));
