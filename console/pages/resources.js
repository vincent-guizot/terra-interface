import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Grid,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Divider
} from '@mui/material';
import {
  Bolt,
  Opacity,
  Kitchen,
  Loop,
  WbSunny,
  BatteryChargingFull,
  Tune,
  CheckCircle,
  Spa
} from '@mui/icons-material';
import { resourcesData } from '../data/homesteadData';

export default function ResourcesPage() {
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [allocationSetting, setAllocationSetting] = useState({
    solarDumpMode: 'Auto Aeration & Storage',
    rainwaterPrio: 'Aquaponics & Living Soil',
    compostBatch: 'High Nitrogen Blend',
  });

  const handleAdjustSubmit = (e) => {
    e.preventDefault();
    setAdjustOpen(false);
    setToastMsg(`Homestead resource dispatch policy updated!`);
  };

  return (
    <>
      <Head>
        <title>Terra Interface — Resources (What resources are available?)</title>
      </Head>

      {/* HEADER: Answers "What resources are available?" */}
      <Box sx={{ mb: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#D97706', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              04. Resource Autonomy • What resources are available?
            </Typography>
            <Chip
              label="100% Off-Grid Ready"
              size="small"
              sx={{ bgcolor: 'rgba(217, 119, 6, 0.12)', color: '#B45309', fontWeight: 700, fontSize: '0.72rem' }}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F291E', letterSpacing: '-0.02em' }}>
            Homestead Resource Reserves & Flows
          </Typography>
          <Typography variant="body1" sx={{ color: '#486253', maxWidth: 700 }}>
            Real-time balance of clean solar electricity, captured monsoon rainwater, long-term preserved food pantry, and regenerative biological circular assets.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setAdjustOpen(true)}
          startIcon={<Tune />}
          sx={{
            borderRadius: 3,
            bgcolor: '#1B4332',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.85rem',
            boxShadow: '0 4px 14px rgba(27,67,50,0.18)',
            '&:hover': { bgcolor: '#123124' }
          }}
        >
          Adjust Allocations
        </Button>
      </Box>

      {/* 4 CORE RESOURCE PILLARS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* PILLAR 1: CLEAN ENERGY */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1.5px solid rgba(217, 119, 6, 0.2)',
              boxShadow: '0 10px 30px -8px rgba(217, 119, 6, 0.08)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 42, height: 42, borderRadius: 2.5, bgcolor: 'rgba(217, 119, 6, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bolt sx={{ color: '#D97706', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    Solar PV & LiFePO4 Microgrid
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                    5.2 kWp Bifacial Rooftop Array • 8 kW Hybrid Inverter
                  </Typography>
                </Box>
              </Box>
              <Chip label="Grid-Isolated Stable" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.12)', color: '#065F46', fontWeight: 700 }} />
            </Box>

            <Grid container spacing={2} sx={{ mb: 2.5 }}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Solar Output</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#D97706' }}>
                    {resourcesData.energy.generationCurrentKw} kW
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Today's Yield</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    {resourcesData.energy.dailyTotalKwh} kWh
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Battery SoC</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#10B981' }}>
                    {resourcesData.energy.batterySoC}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Autonomy Left</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0284C7' }}>
                    {resourcesData.energy.autonomyHoursRemaining}h
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332', mb: 1.5 }}>
              Homestead Power Consumer Breakdown
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mt: 'auto' }}>
              {resourcesData.energy.loads.map((load, idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.2, borderRadius: 2, bgcolor: '#FAF9F5' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1B4332' }}>{load.name}</Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>{load.power}</Typography>
                    <Chip label={load.share} size="small" sx={{ height: 20, fontSize: '0.68rem', fontWeight: 700, bgcolor: 'rgba(217, 119, 6, 0.12)', color: '#B45309' }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* PILLAR 2: HYDROLOGICAL RESILIENCE */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1.5px solid rgba(2, 132, 199, 0.2)',
              boxShadow: '0 10px 30px -8px rgba(2, 132, 199, 0.08)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 42, height: 42, borderRadius: 2.5, bgcolor: 'rgba(2, 132, 199, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Opacity sx={{ color: '#0284C7', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    Rainwater Catchment & Closed Loop
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                    140 m² Catchment Roof • 12,000 L Storage Capacity
                  </Typography>
                </Box>
              </Box>
              <Chip label="Purity: 42 ppm TDS" size="small" sx={{ bgcolor: 'rgba(2,132,199,0.12)', color: '#0369A1', fontWeight: 700 }} />
            </Box>

            <Grid container spacing={2} sx={{ mb: 2.5 }}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Stored Water</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0284C7' }}>
                    {resourcesData.water.cisternCurrentLiters} L
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Cistern Level</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    {resourcesData.water.percentFull}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Recirculation</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#10B981' }}>
                    {resourcesData.water.recirculationEfficiency}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Water Buffer</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#059669' }}>
                    {resourcesData.water.daysOfAutonomyLeft}d
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332', mb: 1.5 }}>
              Hydrological Storage Streams
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mt: 'auto' }}>
              {resourcesData.water.streams.map((stream, idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.2, borderRadius: 2, bgcolor: '#FAF9F5' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1B4332' }}>{stream.name}</Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#0284C7', fontWeight: 700 }}>{stream.level}</Typography>
                    <Chip label={stream.status} size="small" sx={{ height: 20, fontSize: '0.68rem', fontWeight: 700, bgcolor: 'rgba(2, 132, 199, 0.12)', color: '#0284C7' }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* LOWER 2 RESOURCE SECTIONS: FOOD RESERVES & CIRCULAR CYCLES */}
      <Grid container spacing={3}>
        {/* Food Pantry & Long-term Reserves */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2.5, bgcolor: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Kitchen sx={{ color: '#10B981', fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    Food Reserves & Seed Vault
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565' }}>
                    12.5 Weeks Continuous Food Security Reserve
                  </Typography>
                </Box>
              </Box>
              <Chip label="74 Heirloom Seeds" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.15)', color: '#065F46', fontWeight: 700 }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {resourcesData.foodReserves.categories.map((cat, idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Spa sx={{ color: '#10B981', fontSize: 18 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>{cat.name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>{cat.stock}</Typography>
                    <Chip label={cat.status} size="small" sx={{ height: 20, fontSize: '0.68rem', fontWeight: 700, bgcolor: 'rgba(16,185,129,0.12)', color: '#065F46' }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Circular Resources & Soil Amendments */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2.5, bgcolor: 'rgba(101, 163, 13, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Loop sx={{ color: '#65A30D', fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    Circular Bio-Assets & Compost
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565' }}>
                    Zero-Waste Regenerative Soil & Protein Loops
                  </Typography>
                </Box>
              </Box>
              <Chip label="98.2% Diverted" size="small" sx={{ bgcolor: 'rgba(101,163,13,0.15)', color: '#4D7C0F', fontWeight: 700 }} />
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Mature Bokashi Compost</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>{resourcesData.circularEcosystem.compostMaturedKg} kg</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>BSF Live Feed Output</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#65A30D' }}>{resourcesData.circularEcosystem.bsfLarvaeYieldKgDay} kg/day</Typography>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {resourcesData.circularEcosystem.cycles.map((cyc, idx) => (
                <Box key={idx} sx={{ p: 1.2, borderRadius: 2, bgcolor: '#FAF9F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>
                    {cyc.source} &rarr; {cyc.destination}
                  </Typography>
                  <Chip label={cyc.rate} size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'rgba(101,163,13,0.12)', color: '#4D7C0F' }} />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* MODAL: ADJUST RESOURCE ALLOCATIONS (Embedded CRUD) */}
      <Dialog
        open={adjustOpen}
        onClose={() => setAdjustOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 1.5, bgcolor: '#FFFFFF' } }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Resource Dispatch Policies
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            Tune automated thresholds for solar surplus and irrigation allocation.
          </Typography>
        </DialogTitle>
        <form onSubmit={handleAdjustSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Solar Surplus Dump Target"
                  value={allocationSetting.solarDumpMode}
                  onChange={(e) => setAllocationSetting({ ...allocationSetting, solarDumpMode: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  <MenuItem value="Auto Aeration & Storage">Auto Aeration & Deep Well Pump</MenuItem>
                  <MenuItem value="Mushroom Dehydrator">Mushroom & Herb Dehydrators</MenuItem>
                  <MenuItem value="EV Tool Charging">Homestead Tool Charging Station</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Water Distribution Priority"
                  value={allocationSetting.rainwaterPrio}
                  onChange={(e) => setAllocationSetting({ ...allocationSetting, rainwaterPrio: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  <MenuItem value="Aquaponics & Living Soil">Aquaponics Pond & Permaculture Beds (Standard)</MenuItem>
                  <MenuItem value="Conservation Mode">Conservation Mode (-20% Drip Runtime)</MenuItem>
                  <MenuItem value="Intensive Nursery">Greenhouse Nursery Mist Top-Priority</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setAdjustOpen(false)} sx={{ color: '#5A7565', textTransform: 'none', fontWeight: 600 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#1B4332', color: '#FFFFFF', borderRadius: 2.5, px: 3, textTransform: 'none', fontWeight: 700 }}
            >
              Apply Allocation Policy
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={Boolean(toastMsg)}
        autoHideDuration={4000}
        onClose={() => setToastMsg('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastMsg('')} severity="success" sx={{ borderRadius: 3, bgcolor: '#1B4332', color: '#FFFFFF', fontWeight: 600 }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
