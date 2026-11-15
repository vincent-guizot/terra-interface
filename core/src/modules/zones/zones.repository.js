import { query } from '../../config/database.js';
import { CANONICAL_FACILITIES } from '../../constants/homestead.constants.js';
export class ZonesRepository {
  async getFacilities() {
    try {
      const res = await query('SELECT * FROM "Facility"');
      if (res.rows?.length > 0) {
        return res.rows;
      }
    } catch {
      // Fallback to canonical master plan facilities
    }
    return CANONICAL_FACILITIES;
  }
  async getFacilityById(id) {
    try {
      const res = await query('SELECT * FROM "Facility" WHERE id = $1', [id]);
      if (res.rows?.length > 0) {
        return res.rows[0];
      }
    } catch {
      // Fallback
    }
    return CANONICAL_FACILITIES.find(f => f.id === id || f.code === id) || null;
  }
  async getBuildings() {
    return [{
      id: 'BLD-01',
      name: 'Gudang & Utilitas + Mushroom Complex',
      footprintSqm: 12.5,
      roofAreaSqm: 15.0,
      integratedStructures: ['Gudang & Utilitas (2 Lvls)', 'Mushroom Fruiting House']
    }, {
      id: 'BLD-02',
      name: 'Poultry Coop Shed',
      footprintSqm: 12.0,
      roofAreaSqm: 14.0,
      structure: 'Elevated Standalone Poultry House'
    }, {
      id: 'BLD-03',
      name: 'Ruminant Barn Complex (Goats & Sheep)',
      footprintSqm: 17.5,
      roofAreaSqm: 20.0,
      structure: 'Dual Elevated Slatted Barns (Separate Goats and Sheep quarters)'
    }, {
      id: 'BLD-04',
      name: 'BSF Bioconversion Enclosure',
      footprintSqm: 6.0,
      roofAreaSqm: 7.5,
      structure: 'Insect-Screened Bio-Converter'
    }, {
      id: 'BLD-05',
      name: 'Carport & Rooftop Greenhouse',
      footprintSqm: 15.0,
      roofAreaSqm: 18.0,
      structure: 'Ground Parking + Roof Greenhouse Level'
    }];
  }
}
export default new ZonesRepository();
