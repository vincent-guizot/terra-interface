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
        borderRadius: 4,
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(27,67,50,0.1)',
        boxShadow: '0 8px 24px -6px rgba(27,67,50,0.04)',
      }}
      className={className}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332' }}>
            3D Circular Resource Flow Simulation
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
            Dynamic mass and energy vector trajectories across 7 zones
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label="All Streams"
            size="small"
            clickable
            onClick={() => setActiveLoop('all')}
            sx={{
              fontWeight: 700,
              bgcolor: activeLoop === 'all' ? '#1B4332' : '#F0F6F1',
              color: activeLoop === 'all' ? '#FFFFFF' : '#1B4332',
            }}
          />
          <Chip
            icon={<Bolt fontSize="small" sx={{ color: activeLoop === 'energy' ? '#FFFFFF !important' : '#D97706 !important' }} />}
            label="Solar Microgrid"
            size="small"
            clickable
            onClick={() => setActiveLoop('energy')}
            sx={{
              fontWeight: 700,
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
              bgcolor: activeLoop === 'water' ? '#0284C7' : '#E0F2FE',
              color: activeLoop === 'water' ? '#FFFFFF' : '#0369A1',
            }}
          />
          <Chip
            icon={<Loop fontSize="small" sx={{ color: activeLoop === 'biomass' ? '#FFFFFF !important' : '#10B981 !important' }} />}
            label="BSF Biomass"
            size="small"
            clickable
            onClick={() => setActiveLoop('biomass')}
            sx={{
              fontWeight: 700,
              bgcolor: activeLoop === 'biomass' ? '#10B981' : '#D1FAE5',
              color: activeLoop === 'biomass' ? '#FFFFFF' : '#065F46',
            }}
          />
        </Box>
      </Box>

      {/* Animated SVG Stream Canvas */}
      <Box sx={{ width: '100%', height: 260, bgcolor: '#FAF9F5', borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 800 260"
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

          {/* Node 1: Zone 5 Solar & Water Spine */}
          <g transform="translate(140, 60)">
            <rect x="-60" y="-30" width="120" height="60" rx="10" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="12">Zone 5: Solar & Water</text>
            <text x="0" y="12" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="11">5.0 kWp • 8,000 L</text>
          </g>

          {/* Node 2: Zone 7 Living Hub & Battery */}
          <g transform="translate(400, 60)">
            <rect x="-60" y="-30" width="120" height="60" rx="10" fill="#FFFFFF" stroke="#4B5563" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="12">Zone 7: Living Lab</text>
            <text x="0" y="12" textAnchor="middle" fill="#059669" fontWeight="700" fontSize="11">15.3 kWh LiFePO4</text>
          </g>

          {/* Node 3: Zone 2 Aquaponics Bio-Pond */}
          <g transform="translate(660, 60)">
            <rect x="-60" y="-30" width="120" height="60" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="12">Zone 2: Aquaponics</text>
            <text x="0" y="12" textAnchor="middle" fill="#0284C7" fontWeight="700" fontSize="11">450 Tilapia • 6.8 DO</text>
          </g>

          {/* Node 4: Zone 6 Circular BSF & Bokashi */}
          <g transform="translate(140, 200)">
            <rect x="-60" y="-30" width="120" height="60" rx="10" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="12">Zone 6: Circular Hub</text>
            <text x="0" y="12" textAnchor="middle" fill="#047857" fontWeight="700" fontSize="11">BSF • 64°C Bokashi</text>
          </g>

          {/* Node 5: Zone 3 Micro-Livestock Poultry */}
          <g transform="translate(400, 200)">
            <rect x="-60" y="-30" width="120" height="60" rx="10" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="12">Zone 3: Poultry</text>
            <text x="0" y="12" textAnchor="middle" fill="#B45309" fontWeight="700" fontSize="11">21 Eggs/d • FCR 1.25</text>
          </g>

          {/* Node 6: Zone 4 Permaculture Beds */}
          <g transform="translate(660, 200)">
            <rect x="-60" y="-30" width="120" height="60" rx="10" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#1B4332" fontWeight="800" fontSize="12">Zone 4: Permaculture</text>
            <text x="0" y="12" textAnchor="middle" fill="#059669" fontWeight="700" fontSize="11">Keyhole Beds • N-Fix</text>
          </g>

          {/* STREAM 1: Solar Microgrid (Zone 5 -> Zone 7 -> Zone 2) */}
          {(activeLoop === 'all' || activeLoop === 'energy') && (
            <>
              <path d="M 200,60 L 340,60" fill="none" stroke="#F59E0B" strokeWidth="4" className="stream-flow-solar" />
              <path d="M 460,60 L 600,60" fill="none" stroke="#F59E0B" strokeWidth="4" className="stream-flow-solar" />
            </>
          )}

          {/* STREAM 2: Hydrological Stream (Zone 5 -> Zone 6 -> Zone 4) */}
          {(activeLoop === 'all' || activeLoop === 'water') && (
            <>
              <path d="M 140,90 L 140,170" fill="none" stroke="#0284C7" strokeWidth="4" className="stream-flow-water" />
              <path d="M 660,90 L 660,170" fill="none" stroke="#0284C7" strokeWidth="4" className="stream-flow-water" />
            </>
          )}

          {/* STREAM 3: Biomass Loop (Zone 6 -> Zone 3 -> Zone 4) */}
          {(activeLoop === 'all' || activeLoop === 'biomass') && (
            <>
              <path d="M 200,200 L 340,200" fill="none" stroke="#10B981" strokeWidth="4" className="stream-flow-bio" />
              <path d="M 460,200 L 600,200" fill="none" stroke="#10B981" strokeWidth="4" className="stream-flow-bio" />
            </>
          )}
        </svg>
      </Box>
    </Paper>
  );
}

export default AnimatedResourceStream;
