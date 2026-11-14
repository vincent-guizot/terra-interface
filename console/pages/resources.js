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
  Snackbar,
  Alert,
  Divider,
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
  Spa,
  Sensors,
  WarningAmber,
  ErrorOutline,
} from '@mui/icons-material';
import { resourcesData } from '../data/homesteadData';
import { useMicrogridTelemetry } from '../hooks/useMicrogridTelemetry';
import { ConfigureDispatchPolicyDrawer, ManualTelemetryIngestDrawer } from '../features/microgrid';

export default function ResourcesPage() {
  const { telemetry, alerts, connectionStatus, ingest, updatePolicy } = useMicrogridTelemetry();
  const [dispatchDrawerOpen, setDispatchDrawerOpen] = useState(false);
  const [manualIngestOpen, setManualIngestOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handlePolicyUpdated = (newPolicy) => {
    setToastMsg(`Dispatch policy updated: mode=${newPolicy.solarDumpMode}, floor=${newPolicy.batteryFloorReservePercent}%`);
  };

  const handleTelemetryIngested = (snapshot) => {
    setToastMsg(`Telemetry ingested: Solar ${snapshot.solarGenerationKw} kW, Battery ${snapshot.batterySoC}%, Cistern ${snapshot.cisternTotalLiters} L`);
  };

  const getStatusChipProps = () => {
    if (connectionStatus === 'STREAMING') {
      return { label: '● SSE Stream: LIVE', bgcolor: 'rgba(16,185,129,0.15)', color: '#065F46' };
    }
    if (connectionStatus === 'POLLING') {
      return { label: '● REST Polling: 5s', bgcolor: 'rgba(2,132,199,0.15)', color: '#0369A1' };
    }
    return { label: '● Diurnal Generator Active', bgcolor: 'rgba(245,158,11,0.15)', color: '#B45309' };
  };

  const statusChip = getStatusChipProps();

  return (
    <>
      <Head>
        <title>Terra Interface — Resources (What resources are available?)</title>
      </Head>

      {/* HEADER */}
      <Box sx={{ mb: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#D97706', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              04. Resource Autonomy • What resources are available?
            </Typography>
            <Chip
              label={statusChip.label}
              size="small"
              sx={{ bgcolor: statusChip.bgcolor, color: statusChip.color, fontWeight: 800, fontSize: '0.72rem' }}
            />
            {telemetry?.dumpLoad?.isActive && (
              <Chip
                label={`⚡ Dump Load: ${telemetry.dumpLoad.targetAppliance}`}
                size="small"
                sx={{ bgcolor: 'rgba(245,158,11,0.15)', color: '#D97706', fontWeight: 800, fontSize: '0.72rem' }}
              />
            )}
            {telemetry?.loadSheddingActive && (
              <Chip
                label="⚠ Load Shedding Active"
                size="small"
                sx={{ bgcolor: 'rgba(239,68,68,0.15)', color: '#DC2626', fontWeight: 800, fontSize: '0.72rem' }}
              />
            )}
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F291E', letterSpacing: '-0.02em' }}>
            Homestead Resource Reserves & Flows
          </Typography>
          <Typography variant="body1" sx={{ color: '#486253', maxWidth: 700 }}>
            Real-time balance of clean solar electricity, captured monsoon rainwater, long-term preserved food pantry, and regenerative biological circular assets.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            onClick={() => setManualIngestOpen(true)}
            startIcon={<Sensors />}
            sx={{
              borderRadius: 3,
              borderColor: 'rgba(27,67,50,0.3)',
              color: '#1B4332',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(27,67,50,0.04)', borderColor: '#1B4332' },
            }}
          >
            Ingest Probe Telemetry
          </Button>

          <Button
            variant="contained"
            onClick={() => setDispatchDrawerOpen(true)}
            startIcon={<Tune />}
            sx={{
              borderRadius: 3,
              bgcolor: '#1B4332',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(27,67,50,0.18)',
              '&:hover': { bgcolor: '#123124' },
            }}
          >
            Configure Dispatch Policy
          </Button>
        </Box>
      </Box>

      {/* ACTIVE PROTECTION ALERTS BANNER */}
      {alerts && alerts.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {alerts.map((alt) => (
            <Paper
              key={alt.id}
              elevation={0}
              sx={{
                p: 2,
                mb: 1.5,
                borderRadius: 3,
                bgcolor: alt.severity === 'CRITICAL' ? 'rgba(239,68,68,0.08)' : alt.severity === 'WARNING' ? 'rgba(245,158,11,0.08)' : 'rgba(2,132,199,0.08)',
                border: alt.severity === 'CRITICAL' ? '1px solid rgba(239,68,68,0.3)' : alt.severity === 'WARNING' ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(2,132,199,0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {alt.severity === 'CRITICAL' ? (
                  <ErrorOutline sx={{ color: '#DC2626' }} />
                ) : (
                  <WarningAmber sx={{ color: '#D97706' }} />
                )}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: alt.severity === 'CRITICAL' ? '#991B1B' : '#92400E' }}>
                    {alt.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#4B5563' }}>
                    {alt.message}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={alt.parameterValue}
                size="small"
                sx={{
                  bgcolor: alt.severity === 'CRITICAL' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                  color: alt.severity === 'CRITICAL' ? '#DC2626' : '#D97706',
                  fontWeight: 800,
                }}
              />
            </Paper>
          ))}
        </Box>
      )}

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
              <Chip
                label={telemetry.batteryVoltage ? `${telemetry.batteryVoltage}V • ${telemetry.batteryHealthStatus}` : 'Grid-Isolated Stable'}
                size="small"
                sx={{ bgcolor: 'rgba(16,185,129,0.12)', color: '#065F46', fontWeight: 700 }}
              />
            </Box>

            <Grid container spacing={2} sx={{ mb: 2.5 }}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Solar Output</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#D97706' }}>
                    {telemetry.solarGenerationKw} kW
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>AC Load</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    {telemetry.inverterLoadWatts} W
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Battery SoC</Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: telemetry.batterySoC < 20 ? '#EF4444' : '#10B981',
                    }}
                  >
                    {telemetry.batterySoC}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Autonomy Left</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0284C7' }}>
                    {telemetry.autonomyHours}h
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Battery SoC Progress Gauge */}
            <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: '#FAF9F5', mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#748B7D' }}>
                  15.3 kWh LiFePO4 Storage Bank
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: telemetry.batterySoC < 20 ? '#EF4444' : '#10B981' }}>
                  {telemetry.batterySoC}% SoC ({telemetry.batteryCurrentAmps > 0 ? `+${telemetry.batteryCurrentAmps}A Charging` : `${telemetry.batteryCurrentAmps}A Draw`})
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={telemetry.batterySoC}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'rgba(27,67,50,0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: telemetry.batterySoC < 20 ? '#EF4444' : telemetry.batterySoC >= 95 ? '#D97706' : '#10B981',
                  },
                }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332', mb: 1.5 }}>
              Homestead Power Consumer Breakdown
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mt: 'auto' }}>
              {(resourcesData.energy?.loads || []).map((load, idx) => (
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
                    {telemetry.cisternTotalLiters} L
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Cistern Level</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    {telemetry.cisternPercentFull}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Bio-Pond DO</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: telemetry.dissolvedOxygenMgL < 5 ? '#EF4444' : '#10B981' }}>
                    {telemetry.dissolvedOxygenMgL} mg/L
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>Water Buffer</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#059669' }}>
                    {telemetry.waterAutonomyDays}d
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Cistern Storage Level Progress */}
            <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: '#FAF9F5', mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#748B7D' }}>
                  3-Bay Cistern Array (12,000 L)
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#0284C7' }}>
                  {telemetry.cisternTotalLiters} L / 12,000 L ({telemetry.cisternPercentFull}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={telemetry.cisternPercentFull}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'rgba(2,132,199,0.1)',
                  '& .MuiLinearProgress-bar': { bgcolor: '#0284C7' },
                }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332', mb: 1.5 }}>
              Hydrological Storage Streams
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mt: 'auto' }}>
              {(resourcesData.water?.streams || []).map((stream, idx) => (
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
              {(resourcesData.foodReserves?.categories || []).map((cat, idx) => (
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
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>{resourcesData.circularEcosystem?.compostMaturedKg || 480} kg</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5' }}>
                  <Typography variant="caption" sx={{ color: '#748B7D' }}>BSF Live Feed Output</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#65A30D' }}>{resourcesData.circularEcosystem?.bsfLarvaeYieldKgDay || 1.8} kg/day</Typography>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {(resourcesData.circularEcosystem?.cycles || []).map((cyc, idx) => (
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

      {/* DRAWERS: CONFIGURE DISPATCH POLICY & MANUAL INGEST */}
      <ConfigureDispatchPolicyDrawer
        open={dispatchDrawerOpen}
        onClose={() => setDispatchDrawerOpen(false)}
        onPolicyUpdated={handlePolicyUpdated}
      />
      <ManualTelemetryIngestDrawer
        open={manualIngestOpen}
        onClose={() => setManualIngestOpen(false)}
        onTelemetryIngested={handleTelemetryIngested}
      />

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
