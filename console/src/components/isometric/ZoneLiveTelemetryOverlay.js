import { ZONE_TELEMETRY_NODES } from "../../data/isometric/telemetry-nodes.data.js";
import React from 'react';
import { Box, Chip, Tooltip, Typography } from '@mui/material';
import { masterPlanFacilities } from '../../data/homestead/master-plan.js';
export { ZONE_TELEMETRY_NODES };
export function ZoneLiveTelemetryOverlay({
  onSelectZone,
  visible = true
}) {
  if (!visible) return null;
  return <Box sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none'
  }}>
      {ZONE_TELEMETRY_NODES.map(node => <Box key={node.zoneId} sx={{
      position: 'absolute',
      left: node.left,
      top: node.top,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'auto'
    }}>
          <Tooltip title={<Box sx={{
        p: 0.5
      }}>
                <Typography variant="caption" sx={{
          fontWeight: 800,
          color: '#FFFFFF',
          display: 'block'
        }}>
                  {node.code} • {node.name}
                </Typography>
                <Typography variant="caption" sx={{
          color: '#E2E8F0',
          display: 'block'
        }}>
                  Provenance: {node.dataSource} • Click to inspect facility records
                </Typography>
              </Box>}>
            <Chip label={<Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.6
        }}>
                  <Box sx={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            bgcolor: node.dataSource === 'LIVE' ? '#10B981' : '#0284C7'
          }} />
                  <span>{node.telemetry}</span>
                </Box>} size="small" onClick={() => onSelectZone && onSelectZone(node.zoneId)} sx={{
          bgcolor: 'rgba(255, 255, 255, 0.94)',
          border: `1.5px solid ${node.color}`,
          color: '#14281D',
          fontWeight: 700,
          fontSize: '0.68rem',
          height: 22,
          boxShadow: '0 4px 12px rgba(27,67,50,0.12)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: '#FFFFFF',
            transform: 'scale(1.05)',
            boxShadow: '0 6px 16px rgba(27,67,50,0.18)'
          }
        }} />
          </Tooltip>
        </Box>)}
    </Box>;
}
export default ZoneLiveTelemetryOverlay;
