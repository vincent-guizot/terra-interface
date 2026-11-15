import { CANONICAL_RESOURCE_FLOWS, CANONICAL_RESOURCES_DATA } from "../../constants/resources.constants.js";
export { CANONICAL_RESOURCE_FLOWS };
export { CANONICAL_RESOURCES_DATA };
export class ResourcesService {
  constructor() {
    this.flows = [...CANONICAL_RESOURCE_FLOWS];
    this.resources = {
      ...CANONICAL_RESOURCES_DATA
    };
  }
  async getResourcesOverview() {
    return {
      homestead: "Vincent's Farm (300 m² Master Plan)",
      energy: this.resources.energy,
      water: this.resources.water,
      circular: this.resources.circular,
      activeFlowsCount: this.flows.length,
      calculatedAt: new Date().toISOString()
    };
  }
  async getResourceFlows(category, flowType) {
    let result = [...this.flows];
    if (category) {
      result = result.filter(f => f.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (flowType) {
      result = result.filter(f => f.flowType.toLowerCase() === flowType.toLowerCase());
    }
    return result;
  }
  async getFlowById(id) {
    return this.flows.find(f => f.id === id) || null;
  }
}
export default new ResourcesService();
