// Master Data for Vincent's Farm (300 m² Homestead, West Java, Indonesia)
export const homesteadProfile = {
  name: "Vincent's Farm",
  size: "300 m²",
  dimensions: "15.0m × 20.0m Master Plan",
  location: "West Java, Indonesia (Tropical Microclimate)",
  established: "2024",
  steward: "Vincent",
  vision: "Your Home. Your Resources. Your Ecosystem.",
  overallAutonomy: 94.2,
  metrics: {
    foodAutonomy: 86.4,
    foodDataSource: 'MANUAL',
    energyIndependence: 100.0,
    energyDataSource: 'LIVE',
    waterSelfSufficiency: 92.5,
    waterDataSource: 'LIVE',
    circularWasteDiverted: 98.2,
    circularDataSource: 'ESTIMATED'
  },
  weather: {
    temp: 28,
    condition: "Tropical Sun / Gentle Breeze",
    humidity: 74,
    uvIndex: 7,
    solarIrradiance: 840,
    // W/m2
    rainForecast: "Light evening shower expected (4mm at 17:30)",
    dataSource: 'LIVE',
    lastUpdated: '10 min ago'
  }
};
