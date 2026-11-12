export class PestScoutingDto {
  zoneId: string;
  scoutedAt: Date;
  identifiedPest?: 'Aphids' | 'Whiteflies' | 'Spider Mites' | 'Fungus Gnats' | 'Powdery Mildew';
  infestationLevel: 'Low' | 'Moderate' | 'Severe';
  recommendedBioControl: string;
  notes?: string;
}

export const organicPestFormulas = {
  neemOilEmulsion: '5ml Cold-pressed Neem Oil + 2ml Pure Castile Soap per 1L Rainwater',
  horsetailDecoction: '50g Dried Equisetum arvense boiled in 1L Water for 30 min (Anti-fungal silica)',
  garlicChiliExtract: '3 cloves Garlic + 2 Hot Chillies steeped in 1L warm water (General repellent)',
};
