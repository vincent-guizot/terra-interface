import React, { useState } from 'react';
import { Box, Typography, Chip, Paper, Tooltip, IconButton, Button } from '@mui/material';
import ZoneLiveTelemetryOverlay from './ZoneLiveTelemetryOverlay';
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
  Spa
} from '@mui/icons-material';

export default function IsometricHomesteadHero({ activeZoneId, onSelectZone }) {
  const [hoveredZone, setHoveredZone] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const zones = [
    {
      id: "zone-1",
      code: "Z-01",
      name: "Smart Micro-Greenhouse",
      x: 170,
      y: 190,
      tag: "Cultivation • 35 m²",
      temp: "26.4°C",
      humidity: "78%",
      color: "#10B981",
      desc: "Hydroponic NFT & Oyster Mushrooms",
      icon: "🌱"
    },
    {
      id: "zone-2",
      code: "Z-02",
      name: "Aquaponics & Bio-Pond",
      x: 390,
      y: 290,
      tag: "Aquaculture • 25 m²",
      temp: "25.1°C",
      ph: "7.1 pH",
      color: "#0284C7",
      desc: "450 Nile Tilapia & Bio-filters",
      icon: "🐟"
    },
    {
      id: "zone-3",
      code: "Z-03",
      name: "Poultry & BSF Hub",
      x: 640,
      y: 350,
      tag: "Livestock • 20 m²",
      temp: "27.8°C",
      yield: "21 Eggs/day",
      color: "#F59E0B",
      desc: "Australorp Hens & BSF Bioconversion",
      icon: "🐔"
    },
    {
      id: "zone-4",
      code: "Z-04",
      name: "Permaculture Food Forest",
      x: 230,
      y: 370,
      tag: "Regenerative • 110 m²",
      temp: "28.0°C",
      moisture: "38%",
      color: "#65A30D",
      desc: "Keyhole Raised Beds & Fruit Guilds",
      icon: "🌿"
    },
    {
      id: "zone-5",
      code: "Z-05",
      name: "Solar Array & Battery Hub",
      x: 480,
      y: 140,
      tag: "Clean Energy • 30 m²",
      gen: "4.8 kW",
      soc: "91%",
      color: "#D97706",
      desc: "5.2 kWp Bifacial PV + 15.3 kWh LiFePO4",
      icon: "⚡"
    },
    {
      id: "zone-6",
      code: "Z-06",
      name: "Rain Catchment & Filtration",
      x: 630,
      y: 200,
      tag: "Water • 25 m²",
      storage: "10,400 L",
      quality: "42 ppm TDS",
      color: "#0D9488",
      desc: "Multi-stage Sand & Biochar Gravity Tower",
      icon: "💧"
    },
    {
      id: "zone-7",
      code: "Z-07",
      name: "Eco-Living Dwelling & Lab",
      x: 350,
      y: 180,
      tag: "Residence • 55 m²",
      temp: "25.0°C",
      power: "480 W load",
      color: "#8B5CF6",
      desc: "Passive Solar Tiny Home & Seed Vault",
      icon: "🏡"
    }
  ];

  const currentSelection = hoveredZone || zones.find(z => z.id === activeZoneId) || zones[0];

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
              bgcolor: 'rgba(255,255,255,0.9)',
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
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
              300 m² Homestead Master Model
            </Typography>
            <Chip
              label="Live Telemetry"
              size="small"
              sx={{
                bgcolor: 'rgba(16, 185, 129, 0.12)',
                color: '#065F46',
                fontWeight: 700,
                fontSize: '0.72rem',
                height: 22,
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: '#5A7565', display: { xs: 'none', sm: 'block' } }}>
            15m × 20m Vincent's Farm Layout • Interactive Isometric View
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
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.8rem',
              '&:hover': { bgcolor: '#FFFFFF', borderColor: '#1B4332' }
            }}
          >
            {showLabels ? 'Hide Labels' : 'Show Labels'}
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
              onClick={() => setZoomLevel(Math.min(1.2, zoomLevel + 0.1))}
              sx={{ color: '#1B4332' }}
            >
              <ZoomIn fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setZoomLevel(Math.max(0.85, zoomLevel - 0.1))}
              sx={{ color: '#1B4332' }}
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
          height: { xs: 340, sm: 420, md: 470 },
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
              {/* Natural Lighting & Atmospheric Gradients */}
              <linearGradient id="grassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFEEDC" />
                <stop offset="50%" stopColor="#CEE5C9" />
                <stop offset="100%" stopColor="#BDDBB6" />
              </linearGradient>

              <linearGradient id="groundDepth" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#87A982" />
                <stop offset="100%" stopColor="#5E7C5A" />
              </linearGradient>

              <linearGradient id="solarGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="waterSurface" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="greenhouseGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.35" />
              </linearGradient>

              <linearGradient id="timberWood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D0A9" />
                <stop offset="100%" stopColor="#C99763" />
              </linearGradient>

              <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#1B4332" floodOpacity="0.12" />
              </filter>

              <filter id="isometricGlow3D" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <filter id="terrainDepthShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#0F291E" floodOpacity="0.18" />
              </filter>

              <radialGradient id="sunAtmosphere" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FAF9F5" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* BASE ISOMETRIC FOUNDATION PLATFORM (300 m² plot) */}
            <g transform="translate(450, 80)">
              {/* Platform 3D Extrusion Side Left */}
              <polygon
                points="-420,220 0,440 0,470 -420,250"
                fill="url(#groundDepth)"
              />
              {/* Platform 3D Extrusion Side Right */}
              <polygon
                points="0,440 420,220 420,250 0,470"
                fill="#4D684A"
              />
              {/* Platform Top Face (Isometric rhombus) */}
              <polygon
                points="0,0 420,220 0,440 -420,220"
                fill="url(#grassGradient)"
                stroke="#A8CAA3"
                strokeWidth="2"
                filter="url(#softShadow)"
              />

              {/* Boundary Stones & Permaculture Pathway Grid */}
              <path
                d="M -380,220 L 0,420 L 380,220 L 0,20 Z"
                fill="none"
                stroke="#C6DEBF"
                strokeWidth="1.5"
                strokeDasharray="6,6"
              />

              {/* 3D Isometric Elevation Terracing (Z-Elevation steps) */}
              <polygon
                points="-350,220 -20,380 0,390 -330,230"
                fill="#B8D7B2"
                opacity="0.6"
              />
              <polygon
                points="20,380 350,220 330,230 0,390"
                fill="#A6C9A0"
                opacity="0.5"
              />

              {/* Main Garden Pathway */}
              <polygon
                points="-30,220 30,220 180,300 120,300"
                fill="#E9DEC8"
                opacity="0.9"
              />
              <polygon
                points="-30,220 30,220 30,70 -30,70"
                fill="#E9DEC8"
                opacity="0.8"
              />

              {/* ---------------- ZONE 7: ECO-LIVING HOMESTEAD ---------------- */}
              <g
                id="homestead-dwelling"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('zone-7')}
                onMouseEnter={() => setHoveredZone(zones[6])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {/* House Base Shadow */}
                <polygon points="-70,90 20,45 110,95 20,140" fill="rgba(27,67,50,0.18)" />
                {/* Walls */}
                <polygon points="-60,85 20,40 20,0 -60,45" fill="#F4EFE6" stroke="#D7CEBF" />
                <polygon points="20,40 100,85 100,45 20,0" fill="#E8E0D4" stroke="#D7CEBF" />
                {/* Timber Cladding & Windows */}
                <rect x="-40" y="52" width="22" height="18" rx="2" fill="#3B82F6" opacity="0.6" transform="skewY(26)" />
                <rect x="36" y="16" width="35" height="20" rx="2" fill="#3B82F6" opacity="0.6" transform="skewY(-26)" />
                {/* Green Roof with Living Sedum */}
                <polygon points="20,-10 105,35 20,80 -65,35" fill="#52B788" stroke="#2D6A4F" strokeWidth="2" />
                <polygon points="20,-5 95,35 20,72 -55,35" fill="#40916C" />
                {/* Pergola Porch */}
                <line x1="20" y1="80" x2="20" y2="110" stroke="#8D6E63" strokeWidth="3" />
                <line x1="70" y1="55" x2="70" y2="85" stroke="#8D6E63" strokeWidth="3" />
              </g>

              {/* ---------------- ZONE 5: SOLAR ARRAY & BATTERY HUB ---------------- */}
              <g
                id="solar-hub"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('zone-5')}
                onMouseEnter={() => setHoveredZone(zones[4])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {/* Solar Structure Stand */}
                <polygon points="90,40 190,-12 250,20 150,72" fill="rgba(27,67,50,0.12)" />
                {/* Solar Frame Base */}
                <polygon points="100,30 190,-15 250,15 160,60" fill="#CBD5E1" />
                {/* 10 Photovoltaic Modules */}
                <polygon
                  points="105,25 195,-20 255,10 165,55"
                  fill="url(#solarGlass)"
                  stroke="#1E40AF"
                  strokeWidth="1.5"
                />
                {/* Grid Lines on PV Cells */}
                <line x1="135" y1="10" x2="195" y2="40" stroke="#93C5FD" strokeWidth="1" opacity="0.7" />
                <line x1="165" y1="-5" x2="225" y2="25" stroke="#93C5FD" strokeWidth="1" opacity="0.7" />
                <line x1="150" y1="3" x2="210" y2="-27" stroke="#93C5FD" strokeWidth="1" opacity="0.7" />
                {/* Solar Glint / Energy spark */}
                <circle cx="180" cy="18" r="4" fill="#FDE047" />
              </g>

              {/* ---------------- ZONE 6: WATER CATCHMENT TOWER ---------------- */}
              <g
                id="water-tower"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('zone-6')}
                onMouseEnter={() => setHoveredZone(zones[5])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {/* Base Shadow */}
                <ellipse cx="230" cy="130" rx="35" ry="18" fill="rgba(27,67,50,0.15)" />
                {/* Tank 1 */}
                <path d="M 210,120 L 210,75 A 18 10 0 0 1 246,75 L 246,120 A 18 10 0 0 1 210,120 Z" fill="#0D9488" />
                <ellipse cx="228" cy="75" rx="18" ry="8" fill="#14B8A6" stroke="#0F766E" />
                {/* Level Sight Glass Tube */}
                <line x1="243" y1="85" x2="243" y2="115" stroke="#E0F2FE" strokeWidth="3" />
                <line x1="243" y1="90" x2="243" y2="115" stroke="#0284C7" strokeWidth="3" />
                {/* Gravity Filtration Stage */}
                <rect x="252" y="100" width="18" height="24" rx="3" fill="#64748B" />
              </g>

              {/* ---------------- ZONE 1: SMART MICRO-GREENHOUSE ---------------- */}
              <g
                id="micro-greenhouse"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('zone-1')}
                onMouseEnter={() => setHoveredZone(zones[0])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {/* Greenhouse Base Shadow */}
                <polygon points="-280,140 -160,80 -100,110 -220,170" fill="rgba(27,67,50,0.15)" />
                {/* Floor */}
                <polygon points="-270,135 -160,80 -110,105 -220,160" fill="#E2E8F0" />
                {/* Interior Hydroponic Rows & Grow Lights (Visible through Glass) */}
                <line x1="-240" y1="135" x2="-180" y2="105" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
                <line x1="-220" y1="145" x2="-160" y2="115" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
                <line x1="-200" y1="155" x2="-140" y2="125" stroke="#34D399" strokeWidth="5" strokeLinecap="round" />
                {/* Glass Facade Structure */}
                <polygon points="-270,135 -160,80 -160,40 -270,95" fill="url(#greenhouseGlass)" stroke="#64748B" strokeWidth="1.5" />
                <polygon points="-160,80 -110,105 -110,65 -160,40" fill="url(#greenhouseGlass)" stroke="#64748B" strokeWidth="1.5" />
                {/* Glass Pitched Roof */}
                <polygon points="-215,65 -160,40 -110,65 -165,90" fill="#F8FAFC" opacity="0.6" stroke="#64748B" strokeWidth="1.5" />
                <polygon points="-270,95 -215,65 -165,90 -220,120" fill="#E2E8F0" opacity="0.5" stroke="#64748B" strokeWidth="1.5" />
                {/* Automated Misting Glow */}
                <circle cx="-190" cy="115" r="8" fill="#38BDF8" opacity="0.4" />
              </g>

              {/* ---------------- ZONE 2: AQUAPONICS & BIO-POND ---------------- */}
              <g
                id="aquaponics-pond"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('zone-2')}
                onMouseEnter={() => setHoveredZone(zones[1])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {/* Pond Excavation Rim */}
                <ellipse cx="-40" cy="220" rx="65" ry="32" fill="#88A282" />
                {/* Water Body */}
                <ellipse cx="-40" cy="220" rx="58" ry="28" fill="url(#waterSurface)" />
                {/* Tilapia Fish Silhouettes */}
                <path d="M -55,215 Q -45,210 -35,215 Q -45,220 -55,215" fill="#0C4A6E" opacity="0.7" />
                <path d="M -25,225 Q -15,220 -5,225 Q -15,230 -25,225" fill="#0C4A6E" opacity="0.7" />
                {/* Water Lilies & Floating Duckweed */}
                <circle cx="-60" cy="210" r="5" fill="#84CC16" />
                <circle cx="-20" cy="232" r="6" fill="#A3E635" />
                <circle cx="-15" cy="212" r="4" fill="#4ADE80" />
                {/* Swirl Clarifier Tank beside pond */}
                <ellipse cx="25" cy="245" rx="14" ry="7" fill="#64748B" />
                <rect x="11" y="225" width="28" height="20" fill="#94A3B8" />
                <ellipse cx="25" cy="225" rx="14" ry="7" fill="#CBD5E1" stroke="#64748B" />
                {/* Biological Aeration Bubbles */}
                <circle cx="-40" cy="220" r="1.5" fill="#FFFFFF" />
                <circle cx="-38" cy="216" r="2" fill="#FFFFFF" opacity="0.8" />
              </g>

              {/* ---------------- ZONE 4: PERMACULTURE FOOD FOREST & BEDS ---------------- */}
              <g
                id="permaculture-beds"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('zone-4')}
                onMouseEnter={() => setHoveredZone(zones[3])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {/* Keyhole Raised Bed #1 */}
                <polygon points="-240,240 -170,205 -130,225 -200,260" fill="#78350F" opacity="0.9" />
                <polygon points="-238,238 -172,206 -132,224 -198,258" fill="#582900" />
                {/* Lush Crops on Bed #1 */}
                <circle cx="-190" cy="226" r="6" fill="#15803D" />
                <circle cx="-175" cy="220" r="7" fill="#16A34A" />
                <circle cx="-160" cy="215" r="6" fill="#22C55E" />
                <circle cx="-210" cy="235" r="7" fill="#15803D" />

                {/* Keyhole Raised Bed #2 */}
                <polygon points="-180,280 -110,245 -70,265 -140,300" fill="#78350F" opacity="0.9" />
                <polygon points="-178,278 -112,246 -72,264 -138,298" fill="#582900" />
                {/* Tomato Trellis on Bed #2 */}
                <line x1="-150" y1="270" x2="-150" y2="245" stroke="#B45309" strokeWidth="2" />
                <line x1="-120" y1="255" x2="-120" y2="230" stroke="#B45309" strokeWidth="2" />
                <circle cx="-150" cy="250" r="3" fill="#EF4444" />
                <circle cx="-148" cy="256" r="2.5" fill="#EF4444" />
                <circle cx="-120" cy="235" r="3" fill="#EF4444" />

                {/* Fruit Trees: California Papaya & Dwarf Banana */}
                {/* Papaya Tree 1 */}
                <line x1="-240" y1="310" x2="-240" y2="270" stroke="#713F12" strokeWidth="4" strokeLinecap="round" />
                <circle cx="-240" cy="265" r="14" fill="#65A30D" />
                <circle cx="-235" cy="268" r="4" fill="#F59E0B" />
                {/* Banana Tree 2 */}
                <line x1="-280" y1="280" x2="-280" y2="240" stroke="#4D7C0F" strokeWidth="5" />
                <ellipse cx="-280" cy="235" rx="18" ry="10" fill="#4D7C0F" transform="rotate(-15, -280, 235)" />
                <ellipse cx="-280" cy="235" rx="18" ry="10" fill="#65A30D" transform="rotate(25, -280, 235)" />
              </g>

              {/* ---------------- ZONE 3: POULTRY & BSF HUB ---------------- */}
              <g
                id="poultry-coop"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectZone && onSelectZone('zone-3')}
                onMouseEnter={() => setHoveredZone(zones[2])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {/* Coop Shadow */}
                <polygon points="120,290 200,250 250,275 170,315" fill="rgba(27,67,50,0.18)" />
                {/* Timber Coop House */}
                <polygon points="130,280 180,255 180,225 130,250" fill="url(#timberWood)" stroke="#8D6E63" />
                <polygon points="180,255 220,275 220,245 180,225" fill="#D7CCC8" stroke="#8D6E63" />
                {/* Coop Red Cedar Roof */}
                <polygon points="125,248 180,220 225,242 170,270" fill="#DC2626" stroke="#991B1B" />
                {/* Wire Mesh Chicken Run */}
                <polygon points="175,270 235,240 255,250 195,280" fill="#F1F5F9" opacity="0.6" stroke="#94A3B8" strokeDasharray="3,3" />
                {/* Hens Dots */}
                <circle cx="190" cy="265" r="3" fill="#B45309" />
                <circle cx="210" cy="255" r="3" fill="#FEF08A" />
                <circle cx="220" cy="260" r="3" fill="#78350F" />
                {/* BSF Multi-tier Bioconversion Drawer Box */}
                <rect x="235" y="270" width="16" height="20" rx="2" fill="#475569" />
                <line x1="235" y1="275" x2="251" y2="275" stroke="#F59E0B" strokeWidth="1.5" />
                <line x1="235" y1="281" x2="251" y2="281" stroke="#F59E0B" strokeWidth="1.5" />
              </g>

              {/* ---------------- HOTSPOT PINS & LIVE STATUS ---------------- */}
              {showLabels && zones.map((z) => {
                // Approximate coordinate mapping to isometric space
                const coords = {
                  'zone-1': { cx: -190, cy: 100 },
                  'zone-2': { cx: -40, cy: 215 },
                  'zone-3': { cx: 180, cy: 260 },
                  'zone-4': { cx: -170, cy: 260 },
                  'zone-5': { cx: 170, cy: 20 },
                  'zone-6': { cx: 235, cy: 95 },
                  'zone-7': { cx: 20, cy: 40 },
                }[z.id] || { cx: 0, cy: 0 };

                const isSelected = (hoveredZone?.id === z.id) || (activeZoneId === z.id);

                return (
                  <g
                    key={z.id}
                    transform={`translate(${coords.cx}, ${coords.cy})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectZone && onSelectZone(z.id)}
                    onMouseEnter={() => setHoveredZone(z)}
                    onMouseLeave={() => setHoveredZone(null)}
                  >
                    {/* Pulsing Beacon Ring */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? "14" : "10"}
                      fill="none"
                      stroke={z.color}
                      strokeWidth="2"
                      opacity={isSelected ? "0.9" : "0.5"}
                    />
                    {/* Inner Pin Dot */}
                    <circle
                      cx="0"
                      cy="0"
                      r="6"
                      fill={z.color}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    {/* Floating Label Pill */}
                    <g transform="translate(0, -22)">
                      <rect
                        x="-45"
                        y="-12"
                        width="90"
                        height="22"
                        rx="11"
                        fill="rgba(255, 255, 255, 0.95)"
                        stroke={isSelected ? z.color : "rgba(27, 67, 50, 0.15)"}
                        strokeWidth={isSelected ? "1.8" : "1"}
                        filter="url(#softShadow)"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill="#14281D"
                        fontSize="9.5"
                        fontWeight="700"
                        fontFamily="Manrope"
                      >
                        {z.code} • {z.name.split(' ')[0]}
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
              maxWidth: 320,
              p: 2,
              borderRadius: 3.5,
              bgcolor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(14px)',
              border: `1.5px solid ${currentSelection.color || 'rgba(27,67,50,0.1)'}`,
              zIndex: 20,
              boxShadow: '0 16px 36px rgba(27, 67, 50, 0.12)',
              animation: 'fadeIn 0.2s ease-in-out',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '1.25rem' }}>{currentSelection.icon || '🌱'}</Typography>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', lineHeight: 1.2 }}>
                    {currentSelection.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                    {currentSelection.tag}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label="Active"
                size="small"
                sx={{
                  bgcolor: 'rgba(16, 185, 129, 0.12)',
                  color: '#065F46',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 20,
                }}
              />
            </Box>

            <Typography variant="body2" sx={{ color: '#4A6B56', fontSize: '0.8rem', mb: 1.2 }}>
              {currentSelection.desc}
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1,
                bgcolor: 'rgba(240, 247, 241, 0.7)',
                p: 1,
                borderRadius: 2,
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', fontSize: '0.7rem' }}>
                  Microclimate
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                  {currentSelection.temp || currentSelection.gen || 'Optimal'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', fontSize: '0.7rem' }}>
                  Yield / Status
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                  {currentSelection.humidity || currentSelection.soc || currentSelection.ph || '98% Health'}
                </Typography>
              </Box>
            </Box>
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
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
              Food & Greens
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0284C7' }} />
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
              Aquaculture
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#D97706' }} />
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
              Clean Energy
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0D9488' }} />
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
              Water Loop
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>
          300 m² Closed-Loop Homestead • West Java, Indonesia
        </Typography>
      </Box>
    </Box>
  );
}
