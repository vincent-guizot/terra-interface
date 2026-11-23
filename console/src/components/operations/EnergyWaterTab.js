import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Grid,
  LinearProgress
} from '@mui/material';
import {
  Sensors,
  Tune
} from '@mui/icons-material';

export default function EnergyWaterTab({
  energyWater,
  setManualIngestDrawerOpen,
  setDispatchDrawerOpen
}) {
  return (
    <Box>
      <Box sx={{ mb: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Microgrid & Hydrological Resource Management
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            Automated surplus solar dump dispatch, LiFePO4 BMS protection, and 12,000 L rainwater buffer
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Sensors />}
            onClick={() => setManualIngestDrawerOpen(true)}
            sx={{
              borderRadius: 1.5,
              borderColor: 'rgba(27,67,50,0.3)',
              color: '#1B4332',
              fontWeight: 700,
              fontSize: '0.78rem',
              textTransform: 'none',
              '&:hover': { bgcolor: '#F0F6F1', borderColor: '#1B4332' }
            }}
          >
            + Ingest Probe
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<Tune />}
            onClick={() => setDispatchDrawerOpen(true)}
            sx={{
              bgcolor: '#144E36',
              color: '#FFFFFF !important',
              borderRadius: 1.5,
              fontWeight: 700,
              fontSize: '0.78rem',
              textTransform: 'none',
              boxShadow: '0 2px 8px rgba(20,78,54,0.2)',
              '&:hover': { bgcolor: '#0F291E', color: '#FFFFFF !important' },
            }}
          >
            Configure Policy
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 1.5, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 2px 8px rgba(27,67,50,0.03)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                Solar Array & LiFePO4 Battery Diagnostics
              </Typography>
              <Chip label="100% Off-Grid Isolated" size="small" sx={{ bgcolor: 'rgba(217,119,6,0.12)', color: '#B45309', fontWeight: 800, borderRadius: 1.5 }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#5A7565', mb: 2 }}>
              10x Tier 1 520W Bifacial Panels • 53.2V 16S Pack at 91% SoC
            </Typography>
            <Box sx={{ p: 2, borderRadius: 1.5, bgcolor: '#FAF9F5', mb: 2, border: '1px solid rgba(27,67,50,0.06)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#748B7D' }}>Battery Capacity</Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#10B981' }}>15.3 kWh (91% SoC)</Typography>
              </Box>
              <LinearProgress variant="determinate" value={91} sx={{ height: 8, borderRadius: 1.5, '& .MuiLinearProgress-bar': { bgcolor: '#10B981', borderRadius: 1.5 } }} />
            </Box>
            <Typography variant="caption" sx={{ color: '#748B7D' }}>
              Cycle Count: 184 • Cell Delta: 0.008V • Temperature: 28.5°C
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 1.5, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 2px 8px rgba(27,67,50,0.03)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                Rainwater Storage Tanks & Well Consumption
              </Typography>
              <Chip label="10,400 L / 12,000 L" size="small" sx={{ bgcolor: 'rgba(2,132,199,0.12)', color: '#0369A1', fontWeight: 800, borderRadius: 1.5 }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#5A7565', mb: 2 }}>
              Total Storage: 10,400 L / 12,000 L Capacity across 3 Cisterns
            </Typography>
            {energyWater.water.storageTanks.map((tnk) => (
              <Box key={tnk.id} sx={{ p: 1.5, borderRadius: 1.5, bgcolor: '#FAF9F5', mb: 1, border: '1px solid rgba(27,67,50,0.06)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>{tnk.name}</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#0284C7' }}>{tnk.currentL} L ({tnk.pct}%)</Typography>
                </Box>
                <LinearProgress variant="determinate" value={tnk.pct} sx={{ height: 6, borderRadius: 1.5, '& .MuiLinearProgress-bar': { bgcolor: '#0284C7', borderRadius: 1.5 } }} />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
