import React, { useState } from 'react';
import { Box, Typography, Paper, Chip, Grid } from '@mui/material';
import {
  Sync,
  Bolt,
  Opacity,
  Grass,
  Loop,
  CheckCircle,
  ArrowForward,
  SwapHoriz
} from '@mui/icons-material';

export default function IsometricResourceFlow() {
  const [activeCycle, setActiveCycle] = useState('all');

  const cycles = [
    {
      id: 'nitrogen',
      name: 'Nitrogen & Nutrient Loop',
      color: '#0284C7',
      metric: '97.4% circular recovery',
      description: 'Fish excrete ammonia -> Nitrosomonas & Nitrobacter convert to nitrates -> Crops absorb organic fertilizer -> Clean water returns.',
      steps: ['Fish Pond (Ammonia)', 'Moving Bed Biofilter (NO2 -> NO3)', 'Kangkung & Greens Beds', 'Clean Sump Return']
    },
    {
      id: 'biomass',
      name: 'Zero-Waste Biomass & Protein Loop',
      color: '#10B981',
      metric: '4.5 kg scraps converted/day',
      description: 'Prunings & scraps feed BSF colony -> Larvae harvest yields 42% crude protein feed for poultry & tilapia -> Frass composts into rich soil.',
      steps: ['Kitchen & Garden Waste', 'BSF Bioconversion Bins', 'Live Protein for Hens/Fish', 'BSF Frass Bio-fertilizer']
    },
    {
      id: 'water',
      name: 'Hydrological Closed Loop',
      color: '#0D9488',
      metric: '10,400 L stored reserve',
      description: 'Rain captured on 140 m² roof -> Multi-stage sand/biochar filter -> Gravity drip distribution -> Soil infiltration recharge.',
      steps: ['Monsoon Roof Catchment', 'Vortex First Flush', '12kL Cistern Storage', 'Gravity Micro-Drip Irrigation']
    },
    {
      id: 'energy',
      name: 'Solar Clean Microgrid',
      color: '#D97706',
      metric: '100% off-grid reliability',
      description: '5.2 kWp bifacial array -> 15.3 kWh LiFePO4 storage -> Essential aerators, chillers, and home loads -> Automated dump load for water pumping.',
      steps: ['5.2 kWp Rooftop Solar', 'Hybrid MPPT Inverter', '15.3 kWh Battery Bank', 'Homestead Pumps & Living Hub']
    }
  ];

  return (
    <Box sx={{ width: '100%', py: 1 }}>
      {/* Interactive Cycle Selector Pills */}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
        <Chip
          label="All Ecological Loops"
          onClick={() => setActiveCycle('all')}
          color={activeCycle === 'all' ? 'primary' : 'default'}
          sx={{
            fontWeight: 700,
            borderRadius: 3,
            px: 1,
            bgcolor: activeCycle === 'all' ? '#1B4332' : 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(27,67,50,0.1)',
          }}
        />
        {cycles.map((c) => (
          <Chip
            key={c.id}
            label={c.name}
            onClick={() => setActiveCycle(c.id)}
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: 1,
              bgcolor: activeCycle === c.id ? `${c.color}20` : 'rgba(255,255,255,0.8)',
              color: activeCycle === c.id ? c.color : '#486253',
              borderColor: activeCycle === c.id ? c.color : 'rgba(27,67,50,0.1)',
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          />
        ))}
      </Box>

      {/* Isometric Flow Canvas */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, #FAFBF8 0%, #F1F6F0 100%)',
          border: '1px solid rgba(27, 67, 50, 0.1)',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Vincent's Farm Closed-Loop Topology
            </Typography>
            <Typography variant="body2" sx={{ color: '#5A7565' }}>
              Waste outputs from each node become the biological inputs for the next node.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(16, 185, 129, 0.15)',
              px: 2,
              py: 0.8,
              borderRadius: 3,
            }}
          >
            <Loop sx={{ color: '#059669', fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#065F46' }}>
              98.2% Waste Diverted from External System
            </Typography>
          </Box>
        </Box>

        {/* Isometric SVG Schematic Flow */}
        <Box sx={{ width: '100%', overflowX: 'auto', textAlign: 'center', py: 2 }}>
          <svg viewBox="0 0 840 320" style={{ maxWidth: '100%', height: 'auto', minWidth: 640 }}>
            <defs>
              <linearGradient id="flowAquaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="flowBioGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <linearGradient id="flowPoultryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#65A30D" />
              </linearGradient>
            </defs>

            {/* FLOW NODES */}
            {/* Node 1: Aquaculture */}
            <g transform="translate(100, 80)">
              <rect x="-70" y="-35" width="140" height="70" rx="16" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(2,132,199,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#0284C7" fontWeight="800" fontSize="13">🐟 AQUAPONICS</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">450 Tilapia & Catfish</text>
              <text x="0" y="24" textAnchor="middle" fill="#0284C7" fontWeight="700" fontSize="9.5">Effluent: 400 L/day</text>
            </g>

            {/* Connector 1 -> 2 */}
            <path d="M 170,80 L 260,80" fill="none" stroke="url(#flowAquaGrad)" strokeWidth="3.5" strokeDasharray="6,4" />
            <polygon points="265,80 255,75 255,85" fill="#10B981" />
            <text x="215" y="70" textAnchor="middle" fill="#0284C7" fontSize="9" fontWeight="700">Nitrogen Effluent</text>

            {/* Node 2: Bio-filter & Grow Beds */}
            <g transform="translate(330, 80)">
              <rect x="-70" y="-35" width="140" height="70" rx="16" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(16,185,129,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#10B981" fontWeight="800" fontSize="13">🌱 HYDROPONICS</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">Kangkung, Mint & NFT</text>
              <text x="0" y="24" textAnchor="middle" fill="#10B981" fontWeight="700" fontSize="9.5">Absorbs 94% Nitrates</text>
            </g>

            {/* Connector 2 -> Clean Water Back */}
            <path d="M 330,45 C 330,-15 100,-15 100,45" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4,4" />
            <polygon points="100,45 95,35 105,35" fill="#38BDF8" />
            <text x="215" y="-3" textAnchor="middle" fill="#0284C7" fontSize="9.5" fontWeight="700">Purified Water Recirculation (97.4%)</text>

            {/* Connector 2 -> 3 */}
            <path d="M 400,80 L 490,80" fill="none" stroke="url(#flowBioGrad)" strokeWidth="3.5" strokeDasharray="6,4" />
            <polygon points="495,80 485,75 485,85" fill="#F59E0B" />
            <text x="445" y="70" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="700">Cull Greens & Scraps</text>

            {/* Node 3: BSF Bioconversion */}
            <g transform="translate(560, 80)">
              <rect x="-70" y="-35" width="140" height="70" rx="16" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(245,158,11,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#D97706" fontWeight="800" fontSize="13">🪰 BSF COLONY</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">Black Soldier Fly Hub</text>
              <text x="0" y="24" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="9.5">1.8 kg Prepupae/day</text>
            </g>

            {/* Connector 3 -> 4 */}
            <path d="M 630,80 L 710,80" fill="none" stroke="url(#flowPoultryGrad)" strokeWidth="3.5" strokeDasharray="6,4" />
            <polygon points="715,80 705,75 705,85" fill="#65A30D" />
            <text x="670" y="70" textAnchor="middle" fill="#D97706" fontSize="9" fontWeight="700">Live Protein Feed</text>

            {/* Node 4: Poultry Hub */}
            <g transform="translate(750, 80)">
              <rect x="-65" y="-35" width="130" height="70" rx="16" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(220,38,38,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#DC2626" fontWeight="800" fontSize="13">🐔 POULTRY</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">24 Australorp Hens</text>
              <text x="0" y="24" textAnchor="middle" fill="#DC2626" fontWeight="700" fontSize="9.5">21 Eggs/day + Manure</text>
            </g>

            {/* LOWER RETURN LOOP: Manure + Frass -> Composting -> Permaculture Food Forest */}
            <path d="M 750,115 L 750,230 L 610,230" fill="none" stroke="#78350F" strokeWidth="3" strokeDasharray="5,4" />
            <polygon points="605,230 615,225 615,235" fill="#78350F" />
            <text x="700" y="218" textAnchor="middle" fill="#78350F" fontSize="9.5" fontWeight="700">Deep Litter Manure</text>

            {/* Node 5: Bokashi & Biochar Composting */}
            <g transform="translate(520, 230)">
              <rect x="-75" y="-35" width="150" height="70" rx="16" fill="#FFFFFF" stroke="#78350F" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(120,53,15,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#78350F" fontWeight="800" fontSize="13">🍂 BOKASHI COMPOST</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">Microbial Fermentation</text>
              <text x="0" y="24" textAnchor="middle" fill="#78350F" fontWeight="700" fontSize="9.5">480 kg Mature Humus</text>
            </g>

            {/* Connector 5 -> 6 */}
            <path d="M 445,230 L 320,230" fill="none" stroke="#65A30D" strokeWidth="3.5" strokeDasharray="6,4" />
            <polygon points="315,230 325,225 325,235" fill="#65A30D" />
            <text x="380" y="220" textAnchor="middle" fill="#65A30D" fontSize="9.5" fontWeight="700">Biochar & Microbes</text>

            {/* Node 6: Permaculture Food Forest Beds */}
            <g transform="translate(230, 230)">
              <rect x="-75" y="-35" width="150" height="70" rx="16" fill="#FFFFFF" stroke="#65A30D" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(101,163,13,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#4D7C0F" fontWeight="800" fontSize="13">🌳 FOOD FOREST</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">110 m² Living Soil</text>
              <text x="0" y="24" textAnchor="middle" fill="#4D7C0F" fontWeight="700" fontSize="9.5">Vegetables, Papaya & Bananas</text>
            </g>

            {/* Food Forest Harvest Returns to Homestead Residents */}
            <path d="M 155,230 L 60,230 L 60,115" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="5,4" />
            <polygon points="60,110 55,120 65,120" fill="#10B981" />
            <text x="90" y="170" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="700">Fresh Produce</text>
          </svg>
        </Box>
      </Paper>

      {/* Detail Breakdown Cards for each Cycle */}
      <Grid container spacing={2}>
        {cycles
          .filter((c) => activeCycle === 'all' || activeCycle === c.id)
          .map((c) => (
            <Grid item xs={12} md={activeCycle === 'all' ? 6 : 12} key={c.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3.5,
                  bgcolor: '#FFFFFF',
                  border: `1.5px solid ${c.color}30`,
                  boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    {c.name}
                  </Typography>
                  <Chip
                    label={c.metric}
                    size="small"
                    sx={{
                      bgcolor: `${c.color}18`,
                      color: c.color,
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: '#486253', mb: 2, fontSize: '0.85rem' }}>
                  {c.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  {c.steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <Box
                        sx={{
                          bgcolor: 'rgba(240, 246, 241, 0.8)',
                          px: 1.5,
                          py: 0.6,
                          borderRadius: 2,
                          border: '1px solid rgba(27, 67, 50, 0.08)',
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>
                          {idx + 1}. {step}
                        </Typography>
                      </Box>
                      {idx < c.steps.length - 1 && (
                        <ArrowForward sx={{ color: '#748B7D', fontSize: 16 }} />
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
