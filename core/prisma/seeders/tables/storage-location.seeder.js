import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('storageLocation', new URL('../../data/storage-location.json', import.meta.url));
