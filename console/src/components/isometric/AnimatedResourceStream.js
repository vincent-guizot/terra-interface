import React, { useState } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { Bolt, Opacity, Loop, CheckCircle } from '@mui/icons-material';

export function AnimatedResourceStream({ className = '' }) {
  const [activeLoop, setActiveLoop] = useState('all');

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 1.5,
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(27,67,50,0.1)',
        boxShadow: '0 4px 12px -2px rgba(27,67,50,0.04)',
      }}
      className={className}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Canonical Closed-Loop Mass & Energy Stream Simulation
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
            Dynamic biological and energy vector trajectories across Vincent's Farm facilities
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label="All Streams"
            size="small"
            clickable
            onClick={() => setActiveLoop('all')}
            sx={{
              fontWeight: 700,
              borderRadius: 1.5,
              bgcolor: activeLoop === 'all' ? '#144E36' : '#F0F6F1',
              color: activeLoop === 'all' ? '#FFFFFF' : '#144E36',
            }}
          />
          <Chip
            icon={<Bolt fontSize="small" sx={{ color: activeLoop === 'energy' ? '#FFFFFF !important' : '#D97706 !important' }} />}
            label="Clean Microgrid"
            size="small"
            clickable
            onClick={() => setActiveLoop('energy')}
            sx={{
              fontWeight: 700,
              borderRadius: 1.5,
              bgcolor: activeLoop === 'energy' ? '#D97706' : '#FEF3C7',
              color: activeLoop === 'energy' ? '#FFFFFF' : '#92400E',
            }}
          />
          <Chip
            icon={<Opacity fontSize="small" sx={{ color: activeLoop === 'water' ? '#FFFFFF !important' : '#0284C7 !important' }} />}
            label="Water Loop"
            size="small"
            clickable
            onClick={() => setActiveLoop('water')}
            sx={{
              fontWeight: 700,
              borderRadius: 1.5,
              bgcolor: activeLoop === 'water' ? '#0284C7' : '#E0F2FE',
              color: activeLoop === 'water' ? '#FFFFFF' : '#0369A1',
            }}
          />
          <Chip
            icon={<Loop fontSize="small" sx={{ color: activeLoop === 'biomass' ? '#FFFFFF !important' : '#059669 !important' }} />}
            label="BSF Bioconversion"
            size="small"
            clickable
            onClick={() => setActiveLoop('biomass')}
            sx={{
              fontWeight: 700,
              borderRadius: 1.5,
              bgcolor: activeLoop === 'biomass' ? '#059669' : '#D1FAE5',
              color: activeLoop === 'biomass' ? '#FFFFFF' : '#065F46',
            }}
          />
        </Box>
      </Box>

      {/* Animated SVG Stream Canvas */}
      <Box sx={{ width: '100%', height: 260, bgcolor: '#FAF9F5', borderRadius: 1.5, position: 'relative', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 820 260"
          style={{ width: '100%', height: '100%' }}
        >
          <style>{`
            @keyframes dashFlow {
              to {
                stroke-dashoffset: -40;
              }
            }
            .stream-flow-solar {
              stroke-dasharray: 8, 8;
              animation: dashFlow 1.2s linear infinite;
            }
            .stream-flow-water {
              stroke-dasharray: 8, 8;
              animation: dashFlow 1.6s linear infinite;
            }
            .stream-flow-bio {
              stroke-dasharray: 8, 8;
              animation: dashFlow 2.0s linear infinite;
            }
          `}</style>

          {/* Node 1: Gudang & Utilitas Inverter & Water Core */}
          <g transform="translate(140, 60)">
            <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#FFFFFF" stroke="#4B5563" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="11">Gudang & Utilitas</text>
            <text x="0" y="12" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="10.5">2 Lvls • 15.3 kWh</text>
          </g>

          {/* Node 2: Hydroponic / Vertical Garden */}
          <g transform="translate(410, 60)">
            <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="11">Hydroponic / Vertical</text>
            <text x="0" y="12" textAnchor="middle" fill="#047857" fontWeight="700" fontSize="10.5">A-Frames • 1.6 EC</text>
          </g>

          {/* Node 3: Mushroom House */}
          <g transform="translate(680, 60)">
            <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="11">Mushroom House</text>
            <text x="0" y="12" textAnchor="middle" fill="#059669" fontWeight="700" fontSize="10.5">Integrated Chamber</text>
          </g>

          {/* Node 4: Chicken Coop */}
          <g transform="translate(140, 200)">
            <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="11">Chicken Coop</text>
            <text x="0" y="12" textAnchor="middle" fill="#B45309" fontWeight="700" fontSize="10.5">21 Eggs/d • Manure</text>
          </g>

          {/* Node 5: BSF / Maggot House */}
          <g transform="translate(410, 200)">
            <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="11">BSF / Maggot House</text>
            <text x="0" y="12" textAnchor="middle" fill="#059669" fontWeight="700" fontSize="10.5">2.4 kg Prepupae • Frass</text>
          </g>

          {/* Node 6: TOGA & Perimeter Fruit Trees */}
          <g transform="translate(680, 200)">
            <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#FFFFFF" stroke="#65A30D" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="11">TOGA & Fruit Trees</text>
            <text x="0" y="12" textAnchor="middle" fill="#4D7C0F" fontWeight="700" fontSize="10.5">Living Soil Humus</text>
          </g>

          {/* STREAM 1: Solar Microgrid from Gudang Inverter to Hydroponics & Mushroom */}
          {(activeLoop === 'all' || activeLoop === 'energy') && (
            <>
              <line x1="205" y1="60" x2="345" y2="60" stroke="#F59E0B" strokeWidth="3" className="stream-flow-solar" />
              <line x1="475" y1="60" x2="615" y2="60" stroke="#F59E0B" strokeWidth="3" className="stream-flow-solar" />
              <text x="275" y="52" textAnchor="middle" fill="#D97706" fontSize="9.5" fontWeight="800">420W Dosing Pump</text>
              <text x="545" y="52" textAnchor="middle" fill="#D97706" fontSize="9.5" fontWeight="800">Ultrasonic Mister</text>
            </>
          )}

          {/* STREAM 2: Chicken waste to BSF House */}
          {(activeLoop === 'all' || activeLoop === 'biomass') && (
            <>
              <line x1="205" y1="200" x2="345" y2="200" stroke="#F59E0B" strokeWidth="3.5" className="stream-flow-bio" />
              <text x="275" y="192" textAnchor="middle" fill="#B45309" fontSize="9.5" fontWeight="800">14 kg Manure</text>

              {/* BSF Frass to Compost / TOGA */}
              <line x1="475" y1="200" x2="615" y2="200" stroke="#059669" strokeWidth="3.5" className="stream-flow-bio" />
              <text x="545" y="192" textAnchor="middle" fill="#047857" fontSize="9.5" fontWeight="800">Frass Humus</text>

              {/* Live Prepupae returned to hens */}
              <path d="M 410,170 C 410,130 140,130 140,170" fill="none" stroke="#D97706" strokeWidth="2.5" className="stream-flow-solar" />
              <text x="275" y="125" textAnchor="middle" fill="#D97706" fontSize="9" fontWeight="800">2.4 kg Live Protein (42% CP)</text>
            </>
          )}

          {/* STREAM 3: Water Loop from Cisterns to Hydroponics & TOGA */}
          {(activeLoop === 'all' || activeLoop === 'water') && (
            <>
              <path d="M 140,90 L 140,170" fill="none" stroke="#0284C7" strokeWidth="2.5" className="stream-flow-water" />
              <text x="145" y="135" fill="#0284C7" fontSize="9" fontWeight="800" textAnchor="start">Animal Water</text>
              <path d="M 410,90 L 410,170" fill="none" stroke="#0284C7" strokeWidth="2.5" className="stream-flow-water" />
              <text x="415" y="135" fill="#0284C7" fontSize="9" fontWeight="800" textAnchor="start">Drip Top-up</text>
            </>
          )}
        </svg>
      </Box>
    </Paper>
  );
}

export default AnimatedResourceStream;
