import React from 'react';
import { Box, Chip, Tooltip } from '@mui/material';

export const ZONE_TELEMETRY_NODES = [
  {
    zoneId: 'zone-1',
    name: 'Zone 1: Nursery',
    telemetry: '26.4°C • 78% RH',
    color: '#10B981',
    left: '26%',
    top: '38%',
  },
  {
    zoneId: 'zone-2',
    name: 'Zone 2: Aquaponics',
    telemetry: '6.8 mg/L DO • 7.2 pH',
    color: '#0284C7',
    left: '42%',
    top: '52%',
  },
  {
    zoneId: 'zone-3',
    name: 'Zone 3: Micro-Livestock',
    telemetry: '21 Eggs/d • FCR 1.25',
    color: '#F59E0B',
    left: '68%',
    top: '58%',
  },
  {
    zoneId: 'zone-4',
    name: 'Zone 4: Permaculture Beds',
    telemetry: '38% Moist • 6 Beds',
    color: '#059669',
    left: '28%',
    top: '64%',
  },
  {
    zoneId: 'zone-5',
    name: 'Zone 5: Water & Solar',
    telemetry: '6,850 L • 4.8 kW',
    color: '#D97706',
    left: '52%',
    top: '26%',
  },
  {
    zoneId: 'zone-6',
    name: 'Zone 6: Circular Biomass',
    telemetry: '3.2 kg/d BSF • 64°C Bokashi',
    color: '#1B4332',
    left: '74%',
    top: '38%',
  },
  {
    zoneId: 'zone-7',
    name: 'Zone 7: Eco-Living',
    telemetry: '0.75 kW • 18.4h Buffer',
    color: '#4B5563',
    left: '48%',
    top: '40%',
  },
];

export function ZoneLiveTelemetryOverlay({ onSelectZone, visible = true }) {
  if (!visible) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
      }}
    >
      {ZONE_TELEMETRY_NODES.map((node) => (
        <Box
          key={node.zoneId}
          sx={{
            position: 'absolute',
            left: node.left,
            top: node.top,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'auto',
          }}
        >
          <Tooltip title={`${node.name}: Click to inspect domain records`}>
            <Chip
              label={node.telemetry}
              size="small"
              onClick={() => onSelectZone && onSelectZone(node.zoneId)}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.94)',
                border: `1.5px solid ${node.color}`,
                color: '#14281D',
                fontWeight: 700,
                fontSize: '0.68rem',
                height: 20,
                boxShadow: '0 4px 12px rgba(27,67,50,0.12)',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  bgcolor: node.color,
                  color: '#FFFFFF',
                  transform: 'scale(1.06)',
                },
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </Tooltip>
        </Box>
      ))}
    </Box>
  );
}

export default ZoneLiveTelemetryOverlay;
