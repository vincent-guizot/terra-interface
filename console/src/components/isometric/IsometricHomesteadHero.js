import React, { useState } from 'react';
import { Box, Typography, Chip, Paper, Tooltip, IconButton, Button } from '@mui/material';
import ZoneLiveTelemetryOverlay from './ZoneLiveTelemetryOverlay.js';
import DataSourceBadge from '../ui/DataSourceBadge.js';
import { masterPlanFacilities, MASTER_PLAN_SPECS } from '../../data/masterPlanData.js';
import {
  WbSunny,
  Opacity,
  Grass,
  Bolt,
  Visibility,
  Layers,
  ZoomIn,
  ZoomOut,
  InfoOutlined,
  CheckCircle,
  Spa,
  Warehouse,
  Pets,
  Egg,
  Loop,
  Agriculture,
  Yard,
  Park,
  ArrowForward
} from '@mui/icons-material';

export default function IsometricHomesteadHero({ activeZoneId, onSelectZone }) {
  const [hoveredFacility, setHoveredFacility] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Configurable canonical Master Plan facilities (Vincent's Farm 300 m²)
  const facilities = masterPlanFacilities;

  const currentSelection = hoveredFacility || facilities.find(f => f.id === activeZoneId) || facilities[0];

  const getFacilityIcon = (id) => {
    switch (id) {
      case 'fac-gud-01': return <Warehouse sx={{ fontSize: 20, color: '#4B5563' }} />;
      case 'fac-msh-01': return <Spa sx={{ fontSize: 20, color: '#10B981' }} />;
      case 'fac-chk-01': return <Egg sx={{ fontSize: 20, color: '#F59E0B' }} />;
      case 'fac-gt-01':
      case 'fac-shp-01': return <Pets sx={{ fontSize: 20, color: '#D97706' }} />;
      case 'fac-bsf-01': return <Loop sx={{ fontSize: 20, color: '#059669' }} />;
      case 'fac-hyd-01': return <Grass sx={{ fontSize: 20, color: '#10B981' }} />;
      case 'fac-crg-01': return <Agriculture sx={{ fontSize: 20, color: '#0284C7' }} />;
      case 'fac-tog-01': return <Yard sx={{ fontSize: 20, color: '#65A30D' }} />;
      case 'fac-pft-01': return <Park sx={{ fontSize: 20, color: '#4D7C0F' }} />;
      default: return <Spa sx={{ fontSize: 20, color: '#10B981' }} />;
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #F9FAF5 0%, #F3F7F2 60%, #E8F0E7 100%)',
        border: '1px solid rgba(27, 67, 50, 0.1)',
        boxShadow: '0 20px 40px -15px rgba(27, 67, 50, 0.08)',
        p: { xs: 2, md: 3 },
      }}
    >
      {/* Top Header Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1.5,
          mb: 1.5,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              px: 2,
              py: 0.8,
              borderRadius: 3,
              border: '1px solid rgba(27, 67, 50, 0.08)',
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: '#10B981',
                boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.25)',
              }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Vincent's Farm 300 m² Master Plan (15m × 20m)
            </Typography>
            <Chip
              label="Canonical 10 Facilities"
              size="small"
              sx={{
                bgcolor: 'rgba(16, 185, 129, 0.12)',
                color: '#065F46',
                fontWeight: 800,
                fontSize: '0.72rem',
                height: 22,
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: '#5A7565', display: { xs: 'none', sm: 'block' }, fontWeight: 600 }}>
            Visual-First Isometric Model • No Invented Buildings
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setShowLabels(!showLabels)}
            startIcon={<Layers fontSize="small" />}
            sx={{
              borderRadius: 2.5,
              borderColor: 'rgba(27, 67, 50, 0.2)',
              color: '#1B4332',
              bgcolor: 'rgba(255, 255, 255, 0.85)',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.8rem',
              '&:hover': { bgcolor: '#FFFFFF', borderColor: '#1B4332' }
            }}
          >
            {showLabels ? 'Hide Overlay' : 'Show Overlay'}
          </Button>
          <Box
            sx={{
              display: 'flex',
              bgcolor: 'rgba(255,255,255,0.85)',
              borderRadius: 2.5,
              border: '1px solid rgba(27,67,50,0.1)',
            }}
          >
            <IconButton
              size="small"
              onClick={() => setZoomLevel(Math.min(1.25, zoomLevel + 0.1))}
              sx={{ color: '#1B4332' }}
              title="Zoom In"
            >
              <ZoomIn fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setZoomLevel(Math.max(0.85, zoomLevel - 0.1))}
              sx={{ color: '#1B4332' }}
              title="Zoom Out"
            >
              <ZoomOut fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* SVG Canvas for Isometric Visual Rendering */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 350, sm: 430, md: 480 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'grab',
        }}
      >
        <Box
          sx={{
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transformOrigin: 'center center',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            viewBox="0 0 900 520"
            style={{
              width: '100%',
              height: '100%',
              maxWidth: 900,
              overflow: 'visible',
            }}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="grassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFEEDC" />
                <stop offset="50%" stopColor="#CEE5C9" />
                <stop offset="100%" stopColor="#BDDBB6" />
              </linearGradient>

              <linearGradient id="groundDepth" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#87A982" />
                <stop offset="100%" stopColor="#5E7C5A" />
              </linearGradient>

              <linearGradient id="polycarbGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.65" />
              </linearGradient>

              <linearGradient id="timberWood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D0A9" />
                <stop offset="100%" stopColor="#C99763" />
              </linearGradient>

              <linearGradient id="gudangWall" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>

              <linearGradient id="mushroomShade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>

              <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#1B4332" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* BASE PLATFORM: 300 m² (15m wide × 20m deep) */}
            <g transform="translate(450, 80)">
              {/* Platform 3D Extrusion Side Left */}
              <polygon points="-420,220 0,440 0,470 -420,250" fill="url(#groundDepth)" />
              {/* Platform 3D Extrusion Side Right */}
              <polygon points="0,440 420,220 420,250 0,470" fill="#4D684A" />
              {/* Platform Top Face (Isometric rhombus) */}
              <polygon
                points="0,0 420,220 0,440 -420,220"
                fill="url(#grassGradient)"
                stroke="#A8CAA3"
                strokeWidth="2"
                filter="url(#softShadow)"
              />

              {/* Boundary Cadastral Staking (15m x 20m) */}
              <path
                d="M -400,220 L 0,430 L 400,220 L 0,10 Z"
                fill="none"
                stroke="#C6DEBF"
                strokeWidth="1.5"
                strokeDasharray="6,6"
              />

              {/* Central Garden Permaculture Pathway */}
              <polygon points="-25,220 25,220 160,310 110,310" fill="#EAE0CF" opacity="0.85" />
              <polygon points="-25,220 25,220 25,60 -25,60" fill="#EAE0CF" opacity="0.85" />
              <polygon points="-25,220 25,220 -150,310 -190,310" fill="#EAE0CF" opacity="0.75" />

              {/* ---------------- 10. PERIMETER FRUIT TREES (Boundary Guilds) ---------------- */}
              <g
                id="facility-pft"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('fac-pft-01')}
                onMouseEnter={() => setHoveredFacility(facilities.find(f => f.id === 'fac-pft-01'))}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                {/* West & North Boundary Fruit Trees */}
                {/* Tree 1: California Papaya */}
                <line x1="-340" y1="210" x2="-340" y2="175" stroke="#713F12" strokeWidth="4" strokeLinecap="round" />
                <circle cx="-340" cy="170" r="14" fill="#65A30D" />
                <circle cx="-336" cy="173" r="3.5" fill="#F59E0B" />
                {/* Tree 2: Dwarf Banana Circle */}
                <ellipse cx="-280" cy="180" rx="16" ry="9" fill="#4D7C0F" transform="rotate(-15, -280, 180)" />
                <ellipse cx="-280" cy="180" rx="16" ry="9" fill="#65A30D" transform="rotate(25, -280, 180)" />
                <circle cx="-280" cy="180" r="6" fill="#15803D" />
                {/* Tree 3: Papaya */}
                <line x1="-220" y1="130" x2="-220" y2="95" stroke="#713F12" strokeWidth="4" strokeLinecap="round" />
                <circle cx="-220" cy="90" r="13" fill="#65A30D" />
                <circle cx="-217" cy="93" r="3.5" fill="#F59E0B" />
                {/* Tree 4: Calamansi Citrus */}
                <circle cx="-160" cy="80" r="11" fill="#15803D" />
                <circle cx="-158" cy="82" r="2.5" fill="#FACC15" />
                {/* East Boundary Fruit Trees */}
                <circle cx="320" cy="210" r="13" fill="#65A30D" />
                <circle cx="340" cy="170" r="12" fill="#15803D" />
                <circle cx="280" cy="140" r="14" fill="#4D7C0F" />
              </g>

              {/* ---------------- 8. CARPORT ROOFTOP GREENHOUSE ---------------- */}
              <g
                id="facility-crg"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('fac-crg-01')}
                onMouseEnter={() => setHoveredFacility(facilities.find(f => f.id === 'fac-crg-01'))}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                {/* Ground Carport Structure Beams */}
                <polygon points="-120,350 -40,310 10,335 -70,375" fill="rgba(27,67,50,0.18)" />
                {/* 4 Carport Support Columns */}
                <line x1="-115" y1="345" x2="-115" y2="305" stroke="#475569" strokeWidth="3.5" />
                <line x1="-40" y1="305" x2="-40" y2="265" stroke="#475569" strokeWidth="3.5" />
                <line x1="5" y1="330" x2="5" y2="290" stroke="#475569" strokeWidth="3.5" />
                <line x1="-70" y1="370" x2="-70" y2="330" stroke="#475569" strokeWidth="3.5" />
                {/* Rooftop Greenhouse Floor Deck */}
                <polygon points="-120,305 -40,265 10,290 -70,330" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
                {/* Polycarbonate Greenhouse Glass Walls */}
                <polygon points="-120,305 -40,265 -40,230 -120,270" fill="url(#polycarbGlass)" stroke="#64748B" strokeWidth="1.5" />
                <polygon points="-40,265 10,290 10,255 -40,230" fill="url(#polycarbGlass)" stroke="#64748B" strokeWidth="1.5" />
                {/* Pitched Polycarbonate Roof */}
                <polygon points="-80,245 -40,215 10,240 -30,270" fill="#FFFFFF" opacity="0.75" stroke="#38BDF8" strokeWidth="1.5" />
                <polygon points="-120,270 -80,245 -30,270 -70,295" fill="#E0F2FE" opacity="0.6" stroke="#38BDF8" strokeWidth="1.5" />
                {/* Nursery Seedling Trays Visible Inside */}
                <line x1="-90" y1="285" x2="-60" y2="270" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                <line x1="-70" y1="295" x2="-40" y2="280" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* ---------------- 9. TOGA GARDEN (Tanaman Obat Keluarga) ---------------- */}
              <g
                id="facility-tog"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('fac-tog-01')}
                onMouseEnter={() => setHoveredFacility(facilities.find(f => f.id === 'fac-tog-01'))}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                {/* Raised Living Soil Bed #1: Jahe Merah & Curcuma */}
                <polygon points="30,340 100,305 130,320 60,355" fill="#78350F" opacity="0.85" />
                <polygon points="32,338 98,306 128,319 62,353" fill="#451A03" />
                {/* Jahe & Curcuma Foliage */}
                <circle cx="65" cy="328" r="5" fill="#65A30D" />
                <circle cx="80" cy="320" r="5.5" fill="#84CC16" />
                <circle cx="95" cy="314" r="5" fill="#65A30D" />
                {/* Raised Living Soil Bed #2: Lemongrass & Herbs */}
                <polygon points="80,370 140,340 170,355 110,385" fill="#78350F" opacity="0.85" />
                <polygon points="82,368 138,341 168,354 112,383" fill="#451A03" />
                {/* Lemongrass Tufts */}
                <line x1="110" y1="365" x2="110" y2="352" stroke="#84CC16" strokeWidth="2.5" />
                <line x1="125" y1="358" x2="125" y2="345" stroke="#84CC16" strokeWidth="2.5" />
                <line x1="140" y1="352" x2="140" y2="339" stroke="#84CC16" strokeWidth="2.5" />
              </g>

              {/* ---------------- 7. HYDROPONIC / VERTICAL GARDEN ---------------- */}
              <g
                id="facility-hyd"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('fac-hyd-01')}
                onMouseEnter={() => setHoveredFacility(facilities.find(f => f.id === 'fac-hyd-01'))}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                {/* Ground Platform */}
                <polygon points="-240,220 -150,175 -100,200 -190,245" fill="rgba(27,67,50,0.12)" />
                {/* A-Frame Vertical NFT Racks (4x Tiers) */}
                <polygon points="-220,210 -150,175 -150,165 -220,200" fill="#10B981" />
                <line x1="-210" y1="205" x2="-145" y2="172" stroke="#34D399" strokeWidth="4" strokeLinecap="round" />
                <line x1="-195" y1="213" x2="-130" y2="180" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                <line x1="-180" y1="221" x2="-115" y2="188" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
                {/* Recirculation Header Line & Nutrients */}
                <circle cx="-110" cy="190" r="3" fill="#38BDF8" />
                <circle cx="-215" cy="205" r="2" fill="#38BDF8" />
              </g>

              {/* ---------------- 6. GUDANG & UTILITAS (2.0 × 2.5m, 2 Levels) ---------------- */}
              {/* Integrated with 5. MUSHROOM HOUSE */}
              <g
                id="facility-gud"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('fac-gud-01')}
                onMouseEnter={() => setHoveredFacility(facilities.find(f => f.id === 'fac-gud-01'))}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                {/* Gudang Shadow */}
                <polygon points="140,160 210,125 250,145 180,180" fill="rgba(27,67,50,0.18)" />

                {/* Level 1 (Ground Floor: Tools, Inverter, Water Manifold) */}
                <polygon points="145,155 195,130 195,95 145,120" fill="url(#gudangWall)" stroke="#94A3B8" />
                <polygon points="195,130 235,150 235,115 195,95" fill="#E2E8F0" stroke="#94A3B8" />
                {/* Level 1 Utility Door & Electrical Meter */}
                <rect x="158" y="118" width="16" height="24" fill="#475569" rx="1.5" transform="skewY(26)" />
                <circle cx="210" cy="132" r="2.5" fill="#F59E0B" />

                {/* Level 2 Floor Separation Line */}
                <line x1="145" y1="95" x2="195" y2="70" stroke="#64748B" strokeWidth="2" />
                <line x1="195" y1="70" x2="235" y2="90" stroke="#64748B" strokeWidth="2" />

                {/* Level 2 (Upper Floor: Seed Vault, Clean Utility) */}
                <polygon points="145,95 195,70 195,45 145,70" fill="#F8FAFC" stroke="#64748B" />
                <polygon points="195,70 235,90 235,65 195,45" fill="#E2E8F0" stroke="#64748B" />
                {/* Level 2 Louvered Window */}
                <rect x="162" y="68" width="14" height="12" fill="#38BDF8" opacity="0.7" rx="1" transform="skewY(26)" />

                {/* Gudang Pitched Metal Roof */}
                <polygon points="195,35 240,58 195,80 140,58" fill="#475569" stroke="#334155" strokeWidth="1.5" />
                {/* Solar RS485 Antenna */}
                <line x1="195" y1="35" x2="195" y2="20" stroke="#D97706" strokeWidth="2" />
                <circle cx="195" cy="18" r="3" fill="#F59E0B" />

                {/* 2-Level Indicator Tag */}
                <text x="180" y="55" fill="#FFFFFF" fontSize="8" fontWeight="800">2 LVL</text>
              </g>

              {/* ---------------- 5. MUSHROOM HOUSE (Directly integrated with Gudang) ---------------- */}
              <g
                id="facility-msh"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('fac-msh-01')}
                onMouseEnter={() => setHoveredFacility(facilities.find(f => f.id === 'fac-msh-01'))}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                {/* Integrated adjoining wing sharing the East wall with Gudang */}
                {/* Shadow */}
                <polygon points="215,165 270,135 295,150 240,180" fill="rgba(27,67,50,0.14)" />
                {/* Insulated Dark Chamber Walls */}
                <polygon points="220,155 265,130 265,100 220,125" fill="url(#mushroomShade)" stroke="#475569" />
                <polygon points="265,130 290,145 290,115 265,100" fill="#1E293B" stroke="#475569" />
                {/* Insulated Sloped Roof */}
                <polygon points="265,95 295,110 260,128 215,115" fill="#047857" stroke="#065F46" />
                {/* Humidity Mist Exhaust Glow */}
                <circle cx="280" cy="120" r="4.5" fill="#38BDF8" opacity="0.75" />
                <text x="245" y="125" fill="#6EE7B7" fontSize="7.5" fontWeight="700">MUSHROOM</text>
              </g>

              {/* ---------------- 4. BSF / MAGGOT HOUSE (Screened Bioconversion) ---------------- */}
              <g
                id="facility-bsf"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('fac-bsf-01')}
                onMouseEnter={() => setHoveredFacility(facilities.find(f => f.id === 'fac-bsf-01'))}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                {/* BSF Shelter Base */}
                <polygon points="170,285 240,250 270,265 200,300" fill="rgba(27,67,50,0.15)" />
                {/* Screened Structure Framing */}
                <polygon points="175,275 235,245 235,220 175,250" fill="#E2E8F0" opacity="0.8" stroke="#64748B" strokeDasharray="3,2" />
                <polygon points="235,245 265,260 265,235 235,220" fill="#CBD5E1" opacity="0.8" stroke="#64748B" strokeDasharray="3,2" />
                {/* Stacked 5-Tray Bioconversion Rack */}
                <rect x="185" y="245" width="22" height="24" rx="2" fill="#475569" />
                <line x1="185" y1="250" x2="207" y2="250" stroke="#F59E0B" strokeWidth="1.8" />
                <line x1="185" y1="256" x2="207" y2="256" stroke="#F59E0B" strokeWidth="1.8" />
                <line x1="185" y1="262" x2="207" y2="262" stroke="#F59E0B" strokeWidth="1.8" />
                {/* Green Roof Canopy */}
                <polygon points="235,215 270,230 230,250 170,235" fill="#059669" stroke="#047857" />
              </g>

              {/* ---------------- 1. CHICKEN COOP (Separate Standalone Building) ---------------- */}
              <g
                id="facility-chk"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('fac-chk-01')}
                onMouseEnter={() => setHoveredFacility(facilities.find(f => f.id === 'fac-chk-01'))}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                {/* Coop Shadow */}
                <polygon points="90,260 160,225 195,245 125,280" fill="rgba(27,67,50,0.18)" />
                {/* Elevated Timber Coop */}
                <polygon points="100,250 145,225 145,195 100,220" fill="url(#timberWood)" stroke="#8D6E63" />
                <polygon points="145,225 180,245 180,215 145,195" fill="#D7CCC8" stroke="#8D6E63" />
                {/* Cedar Red Roof */}
                <polygon points="145,190 185,212 140,235 95,212" fill="#DC2626" stroke="#991B1B" />
                {/* Wire Mesh Chicken Run */}
                <polygon points="140,235 185,210 200,220 155,245" fill="#F8FAFC" opacity="0.6" stroke="#94A3B8" strokeDasharray="3,2" />
                {/* Laying Hens Dots */}
                <circle cx="150" cy="230" r="2.5" fill="#B45309" />
                <circle cx="165" cy="225" r="2.5" fill="#FEF08A" />
                <circle cx="175" cy="228" r="2.5" fill="#78350F" />
              </g>

              {/* ---------------- 2. GOAT BARN (Separate Standalone Elevated Barn) ---------------- */}
              <g
                id="facility-gt"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('fac-gt-01')}
                onMouseEnter={() => setHoveredFacility(facilities.find(f => f.id === 'fac-gt-01'))}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                {/* Goat Barn Shadow */}
                <polygon points="-65,115 10,75 50,95 -25,135" fill="rgba(27,67,50,0.16)" />
                {/* Elevated Slat Posts */}
                <line x1="-55" y1="110" x2="-55" y2="95" stroke="#78350F" strokeWidth="3" />
                <line x1="10" y1="75" x2="10" y2="60" stroke="#78350F" strokeWidth="3" />
                <line x1="45" y1="95" x2="45" y2="80" stroke="#78350F" strokeWidth="3" />
                {/* Elevated Timber Barn Body */}
                <polygon points="-55,95 5,60 5,30 -55,65" fill="#D97706" stroke="#92400E" />
                <polygon points="5,60 45,80 45,50 5,30" fill="#F59E0B" stroke="#92400E" />
                {/* Slatted Floor Texture Indicator */}
                <line x1="-45" y1="85" x2="-5" y2="60" stroke="#FEF3C7" strokeWidth="1.5" />
                <line x1="-35" y1="90" x2="5" y2="65" stroke="#FEF3C7" strokeWidth="1.5" />
                {/* Green Corrugated Metal Roof */}
                <polygon points="5,25 50,48 5,70 -58,48" fill="#15803D" stroke="#166534" strokeWidth="1.5" />
                {/* Manger & Goat Silhouette */}
                <circle cx="-10" cy="55" r="3" fill="#FFFFFF" />
              </g>

              {/* ---------------- 3. SHEEP BARN (Separate Standalone Elevated Barn) ---------------- */}
              <g
                id="facility-shp"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('fac-shp-01')}
                onMouseEnter={() => setHoveredFacility(facilities.find(f => f.id === 'fac-shp-01'))}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                {/* Sheep Barn Shadow */}
                <polygon points="-180,140 -115,100 -80,120 -145,160" fill="rgba(27,67,50,0.16)" />
                {/* Elevated Posts */}
                <line x1="-170" y1="135" x2="-170" y2="120" stroke="#78350F" strokeWidth="3" />
                <line x1="-115" y1="100" x2="-115" y2="85" stroke="#78350F" strokeWidth="3" />
                <line x1="-80" y1="120" x2="-80" y2="105" stroke="#78350F" strokeWidth="3" />
                {/* Timber Barn Body */}
                <polygon points="-170,120 -115,85 -115,55 -170,90" fill="#92400E" stroke="#78350F" />
                <polygon points="-115,85 -80,105 -80,75 -115,55" fill="#B45309" stroke="#78350F" />
                {/* Dark Brown Cedar Roof */}
                <polygon points="-115,50 -75,72 -115,95 -175,72" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
                {/* Sheep Run Paddock Fence */}
                <polygon points="-160,110 -110,80 -90,92 -140,122" fill="none" stroke="#A8A29E" strokeWidth="1.2" strokeDasharray="3,2" />
                {/* Sheep Woolly Dots */}
                <circle cx="-135" cy="100" r="3" fill="#F5F5F4" stroke="#D6D3D1" />
                <circle cx="-120" cy="92" r="3" fill="#F5F5F4" stroke="#D6D3D1" />
              </g>

              {/* ---------------- HOTSPOT PINS & LIVE STATUS ---------------- */}
              {showLabels && facilities.map((f) => {
                const isSelected = (hoveredFacility?.id === f.id) || (activeZoneId === f.id);
                const coords = f.isometric || { x: 0, y: 0, pinX: 0, pinY: 0 };

                return (
                  <g
                    key={f.id}
                    transform={`translate(${coords.pinX}, ${coords.pinY})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectZone && onSelectZone(f.id)}
                    onMouseEnter={() => setHoveredFacility(f)}
                    onMouseLeave={() => setHoveredFacility(null)}
                  >
                    {/* Pulsing Beacon Ring */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? "14" : "10"}
                      fill="none"
                      stroke={f.color}
                      strokeWidth="2"
                      opacity={isSelected ? "0.95" : "0.5"}
                    />
                    {/* Inner Pin Dot */}
                    <circle
                      cx="0"
                      cy="0"
                      r="5.5"
                      fill={f.color}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    {/* Floating Label Pill */}
                    <g transform="translate(0, -20)">
                      <rect
                        x="-52"
                        y="-12"
                        width="104"
                        height="22"
                        rx="11"
                        fill="rgba(255, 255, 255, 0.95)"
                        stroke={isSelected ? f.color : "rgba(27, 67, 50, 0.15)"}
                        strokeWidth={isSelected ? "1.8" : "1"}
                        filter="url(#softShadow)"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fill="#14281D"
                        fontSize="9.5"
                        fontWeight="800"
                        fontFamily="Manrope"
                      >
                        {f.code} • {f.name.split(' ')[0]}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
        </Box>

        {/* Live Hover Inspection Floating Card */}
        {currentSelection && (
          <Paper
            elevation={4}
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              maxWidth: 360,
              p: 2,
              borderRadius: 3.5,
              bgcolor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(14px)',
              border: `1.5px solid ${currentSelection.color || 'rgba(27,67,50,0.1)'}`,
              zIndex: 20,
              boxShadow: '0 16px 36px rgba(27, 67, 50, 0.14)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2.5,
                    bgcolor: `${currentSelection.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getFacilityIcon(currentSelection.id)}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', lineHeight: 1.2 }}>
                    {currentSelection.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                    {currentSelection.code} • {currentSelection.category}
                  </Typography>
                </Box>
              </Box>

              <DataSourceBadge
                source={currentSelection.dataSource || 'DEMO'}
                lastUpdated={currentSelection.lastUpdated}
                size="small"
              />
            </Box>

            <Typography variant="body2" sx={{ color: '#4A6B56', fontSize: '0.8rem', mb: 1.5, lineHeight: 1.4 }}>
              {currentSelection.description}
            </Typography>

            <Box
              sx={{
                p: 1.2,
                borderRadius: 2.5,
                bgcolor: '#FAF9F5',
                border: '1px solid rgba(27,67,50,0.06)',
                mb: 1.5,
              }}
            >
              <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Area / Dimension Specification
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.82rem' }}>
                {currentSelection.area}
              </Typography>
            </Box>

            <Button
              fullWidth
              size="small"
              variant="contained"
              endIcon={<ArrowForward fontSize="small" />}
              onClick={() => onSelectZone && onSelectZone(currentSelection.id)}
              sx={{
                bgcolor: '#1B4332',
                color: '#FFFFFF',
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.8rem',
                py: 0.8,
                '&:hover': { bgcolor: '#133326' },
              }}
            >
              Inspect Facility Details
            </Button>
          </Paper>
        )}

        {/* 3D Floating Live Telemetry Overlay */}
        <ZoneLiveTelemetryOverlay onSelectZone={onSelectZone} visible={showLabels} />
      </Box>

      {/* Quick Footnote Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          pt: 1.5,
          borderTop: '1px solid rgba(27, 67, 50, 0.08)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4B5563' }} />
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
              Gudang & Utilitas (2 Lvls)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
              Mushroom & Hydroponics
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#D97706' }} />
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
              Livestock (Chickens, Goats, Sheep)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#059669' }} />
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
              BSF / Maggot House
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#65A30D' }} />
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
              TOGA & Perimeter Trees
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>
          300 m² Master Plan (15m × 20m) • Vincent's Farm, West Java
        </Typography>
      </Box>
    </Box>
  );
}
