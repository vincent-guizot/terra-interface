import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('energyNode', new URL('../../data/energy-node.json', import.meta.url));
