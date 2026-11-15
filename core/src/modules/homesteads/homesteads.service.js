import homesteadsRepository from './homesteads.repository.js';
export class HomesteadsService {
  async getProfile() {
    return homesteadsRepository.getProfile();
  }
  async getStatus() {
    const profile = await homesteadsRepository.getProfile();
    const autonomy = await homesteadsRepository.getAutonomy();
    return {
      profile,
      autonomy,
      status: 'OPTIMAL',
      health: 'Ecosystem Balanced',
      timestamp: new Date().toISOString()
    };
  }
  async getAutonomy() {
    return homesteadsRepository.getAutonomy();
  }
}
export default new HomesteadsService();
