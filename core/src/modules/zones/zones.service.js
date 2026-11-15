import zonesRepository from './zones.repository.js';
import { AppError } from '../../middlewares/errorHandler.js';
export class ZonesService {
  async getAllFacilities() {
    return zonesRepository.getFacilities();
  }
  async getFacilityById(id) {
    const facility = await zonesRepository.getFacilityById(id);
    if (!facility) {
      throw new AppError(`Facility with ID '${id}' not found`, 404, 'FACILITY_NOT_FOUND');
    }
    return facility;
  }
  async getAllBuildings() {
    return zonesRepository.getBuildings();
  }
}
export default new ZonesService();
