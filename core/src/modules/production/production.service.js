export const CANONICAL_PRODUCTION_DATA = {
  summary: {
    monthlyTotalKg: 168.4,
    monthlyGoalKg: 180.0,
    targetProgress: 93.5,
    categoriesCount: 5,
    activeBatches: 18,
    estimatedSavingsIdr: 'Rp 7.850.000'
  },
  categories: [{
    id: 'cat-crops',
    name: 'Crops & Greens',
    currentMonthKg: 78.5,
    activeArea: '145 m²',
    trend: '+14%',
    topItems: ['Tuscan Kale', 'Bok Choy', 'Kangkung', 'Cherry Tomatoes', 'Red Birds-Eye Chili'],
    harvestCycleDays: 28
  }, {
    id: 'cat-eggs',
    name: 'Pastured Eggs & Poultry',
    currentMonthKg: 42.0,
    activeArea: '35 m²',
    trend: '+8%',
    topItems: ['Ayam KUB Eggs (580 pcs)', 'Joper Broilers (4 head)'],
    harvestCycleDays: 1
  }, {
    id: 'cat-fish',
    name: 'Aquaculture (Tilapia & Catfish)',
    currentMonthKg: 28.5,
    activeArea: '22 m²',
    trend: '+5%',
    topItems: ['Nile Tilapia (Oreochromis niloticus)', 'African Catfish (Clarias)'],
    harvestCycleDays: 90
  }, {
    id: 'cat-mushrooms',
    name: 'Mushroom House',
    currentMonthKg: 14.2,
    activeArea: '5 m²',
    trend: '+22%',
    topItems: ['Grey Oyster (Pleurotus ostreatus)', 'White Oyster'],
    harvestCycleDays: 7
  }, {
    id: 'cat-protein',
    name: 'BSF Larvae & Living Feed',
    currentMonthKg: 5.2,
    activeArea: '8 m²',
    trend: '+18%',
    topItems: ['Live Prepupae 42% CP', 'Frass Organic Fertilizer'],
    harvestCycleDays: 14
  }]
};
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
