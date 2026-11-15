import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('resourceFlowLog', new URL('../../data/resource-flow-log.json', import.meta.url));
