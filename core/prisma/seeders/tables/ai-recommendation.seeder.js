import { createTableSeeder } from '../seed-table.js';

export default createTableSeeder('aiRecommendation', new URL('../../data/ai-recommendation.json', import.meta.url));
