import { CANONICAL_PRODUCTION_DATA } from "../../constants/production.constants.js";
export { CANONICAL_PRODUCTION_DATA };
export class ProductionService {
  constructor() {
    this.production = {
      ...CANONICAL_PRODUCTION_DATA
    };
  }
  async getSummary() {
    return {
      homestead: "Vincent's Farm (300 m² Master Plan)",
      ...this.production.summary,
      categories: this.production.categories,
      calculatedAt: new Date().toISOString()
    };
  }
  async getCategories() {
    return this.production.categories;
  }
  async getCategoryById(id) {
    return this.production.categories.find(c => c.id === id) || null;
  }
}
export default new ProductionService();
