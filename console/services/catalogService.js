import { ApiClient } from './apiClient';

export class CatalogService {
  static async getCategories(domain) {
    try {
      return await ApiClient.get('/catalog/categories', { domain });
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
          { id: 'cat-veg', name: 'Vegetables & Leafy Greens', domain: 'CULTIVATION', icon: 'Grass' },
          { id: 'cat-fun', name: 'Gourmet Mushrooms & Fungi', domain: 'CULTIVATION', icon: 'Spa' },
          { id: 'cat-pou', name: 'Poultry & Layers', domain: 'LIVESTOCK', icon: 'Pets' },
          { id: 'cat-rum', name: 'Small Ruminants (Goats & Sheep)', domain: 'LIVESTOCK', icon: 'Pets' },
          { id: 'cat-fin', name: 'Freshwater Finfish', domain: 'AQUACULTURE', icon: 'SetMeal' },
          { id: 'cat-bsf', name: 'BSF Bioconversion Biomass', domain: 'CIRCULAR', icon: 'Loop' },
          { id: 'cat-cmp', name: 'Bokashi & Biochar Compost', domain: 'CIRCULAR', icon: 'Yard' },
        ];
      }
      throw err;
    }
  }

  static async createCategory(categoryData) {
    return ApiClient.post('/catalog/categories', categoryData);
  }

  static async getProducts(categoryId) {
    return ApiClient.get('/catalog/products', { categoryId });
  }

  static async createProduct(productData) {
    return ApiClient.post('/catalog/products', productData);
  }

  static async getUnits() {
    try {
      return await ApiClient.get('/catalog/units');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
          { symbol: 'kg', name: 'Kilogram', dimension: 'MASS' },
          { symbol: 'g', name: 'Gram', dimension: 'MASS' },
          { symbol: 'L', name: 'Liter', dimension: 'VOLUME' },
          { symbol: 'pcs', name: 'Pieces', dimension: 'DISCRETE' },
          { symbol: 'head', name: 'Head (Livestock)', dimension: 'DISCRETE' },
          { symbol: 'birds', name: 'Birds (Flock)', dimension: 'DISCRETE' },
          { symbol: 'trays', name: 'Trays', dimension: 'DISCRETE' },
        ];
      }
      throw err;
    }
  }

  static async convertUnit(quantity, sourceUnit, targetUnit, densityKgPerL = null) {
    return ApiClient.post('/catalog/units/convert', {
      quantity,
      sourceUnit,
      targetUnit,
      densityKgPerL,
    });
  }
}
