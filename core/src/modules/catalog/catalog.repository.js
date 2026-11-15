import { query } from '../../config/database.js';
import { STANDARD_MEASUREMENT_UNITS } from '../../constants/homestead.constants.js';
export class CatalogRepository {
  async getMeasurementUnits() {
    try {
      const res = await query('SELECT * FROM "MeasurementUnit"');
      if (res.rows?.length > 0) return res.rows;
    } catch {
      // Fallback
    }
    return STANDARD_MEASUREMENT_UNITS;
  }
  async getProducts() {
    return [{
      id: 'PRD-01',
      sku: 'CUL-BOK-CHOY',
      name: 'Bok Choy White Stem',
      domain: 'CULTIVATION',
      category: 'Leafy Greens',
      defaultUnit: 'kg',
      densityKgPerL: 0.35
    }, {
      id: 'PRD-02',
      sku: 'CUL-OYSTER-MSH',
      name: 'Grey Oyster Mushroom',
      domain: 'CULTIVATION',
      category: 'Fungi',
      defaultUnit: 'kg'
    }, {
      id: 'PRD-03',
      sku: 'LIV-AYAM-KUB',
      name: 'Ayam KUB (Layers & Meat)',
      domain: 'LIVESTOCK',
      category: 'Poultry',
      defaultUnit: 'birds'
    }, {
      id: 'PRD-04',
      sku: 'LIV-BOER-GOAT',
      name: 'Kambing Boer Cross',
      domain: 'LIVESTOCK',
      category: 'Ruminant',
      defaultUnit: 'head'
    }, {
      id: 'PRD-05',
      sku: 'AQU-NILE-TILAPIA',
      name: 'Nile Tilapia (Oreochromis niloticus)',
      domain: 'AQUACULTURE',
      category: 'Finfish',
      defaultUnit: 'kg'
    }, {
      id: 'PRD-06',
      sku: 'CIR-BSF-LARVAE',
      name: 'Live BSF Prepupae (42% Crude Protein)',
      domain: 'CIRCULAR',
      category: 'Insect Protein',
      defaultUnit: 'kg'
    }, {
      id: 'PRD-07',
      sku: 'CIR-BOKASHI-COMPOST',
      name: 'Thermophilic Bokashi Cured Compost',
      domain: 'CIRCULAR',
      category: 'Bio-Fertilizer',
      defaultUnit: 'kg'
    }];
  }
}
export default new CatalogRepository();
