import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('sensorDevice', new URL('../../data/sensor-device.json', import.meta.url));
