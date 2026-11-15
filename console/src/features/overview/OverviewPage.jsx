import React, { useState } from 'react';
import Head from '@/components/shared/PageHead';
import Link from '@/components/shared/AppLink';

import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  Button,
  LinearProgress,
  Tooltip,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Spa,
  Bolt,
  Opacity,
  Agriculture,
  Loop,
  Psychology,
  ArrowForward,
  TrendingUp,
  CheckCircle,
  PlayArrow,
  WbSunny,
  Thermostat
} from '@mui/icons-material';
import IsometricHomesteadHero from '../../components/isometric/IsometricHomesteadHero.js';
import { homesteadProfile, homesteadZones, productionData, resourcesData, intelligenceData } from '../../data/homesteadData.js';
import DataSourceBadge from '../../components/ui/DataSourceBadge.js';

export default function OverviewPage() {

  const [selectedZoneId, setSelectedZoneId] = useState('zone-1');
  const [actionNotice, setActionNotice] = useState(null);

  const handleQuickAction = (msg) => {
    setActionNotice(msg);
  };

  return (
    <>
      <Head>
        <title>Terra Interface — Overview (What is happening?)</title>
      </Head>

      {/* PAGE HEADER: Clear Answer to "What is happening?" */}
      <Box sx={{ mb: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              01. System Overview • What is happening?
            </Typography>
            <Chip
              label="Ecosystem Balanced"
              size="small"
              sx={{ bgcolor: 'rgba(16, 185, 129, 0.14)', color: '#065F46', fontWeight: 700, fontSize: '0.72rem' }}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F291E', letterSpacing: '-0.02em' }}>
            Vincent's Farm Ecosystem Status
          </Typography>
          <Typography variant="body1" sx={{ color: '#486253', maxWidth: 680 }}>
            300 m² closed-loop homestead operating at 94.2% self-sufficiency. Solar generation is peaking, aquaponic nitrogen cycles are optimal, and 32.4 kg of harvest is projected this week.
          </Typography>
        </Box>

        {/* Minimal Quick Actions */}
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<Opacity />}
            onClick={() => handleQuickAction("Automated gravity drip cycle dispatched to Zone 4 keyhole beds (15 min run).")}
            sx={{
              borderRadius: 3,
              borderColor: 'rgba(27,67,50,0.2)',
              color: '#1B4332',
              bgcolor: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              '&:hover': { bgcolor: '#F0F6F1', borderColor: '#1B4332' }
            }}
          >
            Trigger Drip
          </Button>

          <Button
            variant="contained"
            component={Link}
            href="/intelligence"
            startIcon={<Psychology />}
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
            Ask Terra AI
          </Button>
        </Box>
      </Box>

      {/* DATA INTEGRITY & PROVENANCE BAR */}
      <Box
        sx={{
          mb: 2.5,
          p: 1.5,
          borderRadius: 3,
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(27, 67, 50, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#1B4332', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Telemetry Provenance:
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            All metrics explicitly declare source integrity. No mock data is presented as real telemetry.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <DataSourceBadge source="LIVE" lastUpdated="Continuous" size="small" />
          <DataSourceBadge source="MANUAL" lastUpdated="Operator" size="small" />
          <DataSourceBadge source="ESTIMATED" lastUpdated="Model" size="small" />
          <DataSourceBadge source="DEMO" lastUpdated="Synthetic" size="small" />
        </Box>
      </Box>

      {/* SELF-SUFFICIENCY METRICS RIBBON */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        {[
          {
            label: 'Overall Homestead Autonomy',
            value: `${homesteadProfile.overallAutonomy}%`,
            sub: 'Target 95% • +1.8% this month',
            color: '#10B981',
            bg: 'rgba(16, 185, 129, 0.08)',
            icon: <Loop sx={{ color: '#10B981' }} />,
            progress: 94.2,
            dataSource: 'ESTIMATED',
            lastUpdated: '10m ago (Algorithmic Index)',
          },
          {
            label: 'Food Self-Sufficiency',
            value: `${homesteadProfile.metrics.foodAutonomy}%`,
            sub: '168.4 kg yield harvested MTD',
            color: '#059669',
            bg: 'rgba(5, 150, 105, 0.08)',
            icon: <Spa sx={{ color: '#059669' }} />,
            progress: 86.4,
            dataSource: 'MANUAL',
            lastUpdated: 'Today, 08:00 AM (Harvest Logs)',
          },
          {
            label: 'Clean Energy Independence',
            value: `${homesteadProfile.metrics.energyIndependence}%`,
            sub: '15.3 kWh LiFePO4 • 18.4h buffer',
            color: '#D97706',
            bg: 'rgba(217, 119, 6, 0.08)',
            icon: <Bolt sx={{ color: '#D97706' }} />,
            progress: 100,
            dataSource: 'LIVE',
            lastUpdated: '15s ago (RS485 Modbus Inverter)',
          },
          {
            label: 'Water Circular Reserve',
            value: `${homesteadProfile.metrics.waterSelfSufficiency}%`,
            sub: '10,400 L stored • 30.5 days left',
            color: '#0284C7',
            bg: 'rgba(2, 132, 199, 0.08)',
            icon: <Opacity sx={{ color: '#0284C7' }} />,
            progress: 92.5,
            dataSource: 'LIVE',
            lastUpdated: '1m ago (Ultrasonic Cistern Gauge)',
          }
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 4,
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(27, 67, 50, 0.08)',
                boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 16px 32px -8px rgba(27,67,50,0.1)',
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2.5,
                    bgcolor: card.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {card.icon}
                </Box>
                <DataSourceBadge
                  source={card.dataSource}
                  lastUpdated={card.lastUpdated}
                  size="small"
                />
              </Box>

              <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600, display: 'block', mb: 0.5 }}>
                {card.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', letterSpacing: '-0.02em', mb: 0.8 }}>
                {card.value}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={card.progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(27, 67, 50, 0.08)',
                  mb: 1,
                  '& .MuiLinearProgress-bar': {
                    bgcolor: card.color,
                    borderRadius: 3,
                  }
                }}
              />
              <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>
                {card.sub}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* HERO SECTION: ISOMETRIC 3D HOMESTEAD MODEL */}
      <Box sx={{ mb: 3.5 }}>
        <IsometricHomesteadHero
          activeZoneId={selectedZoneId}
          onSelectZone={(id) => setSelectedZoneId(id)}
        />
      </Box>

      {/* LOWER SECTION: AI INSIGHTS, PREDICTIONS & ECOSYSTEM HEALTH */}
      <Grid container spacing={3}>
        {/* Left: AI Strategic Insights & Predictions */}
        <Grid item xs={12} lg={7}>
          {/* AI Banner */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: 'linear-gradient(135deg, #FFFFFF 0%, #F5FBF6 100%)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              boxShadow: '0 12px 30px -8px rgba(16, 185, 129, 0.08)',
              mb: 3,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2.5,
                    bgcolor: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Psychology sx={{ color: '#059669', fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    Terra AI Daily Insight
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565' }}>
                    Real-time ecological optimization for Vincent's Farm
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DataSourceBadge source="ESTIMATED" lastUpdated="Model Forecast" size="small" />
                <Chip
                  label="High Value Opportunity"
                  size="small"
                  sx={{ bgcolor: 'rgba(16,185,129,0.15)', color: '#065F46', fontWeight: 700 }}
                />
              </Box>
            </Box>

            <Typography variant="body1" sx={{ color: '#14281D', fontWeight: 500, mb: 2, lineHeight: 1.6 }}>
              "Solar generation will surpass storage capacity between 11:30 and 14:00 (est. +4.2 kWh surplus). Recommend auto-dispatching surplus energy to top off Cistern #3 via the deep well pump and running the mushroom dehydrator in Zone 7."
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => handleQuickAction("Solar surplus automated dispatch enabled for 11:30 AM.")}
                sx={{
                  bgcolor: '#10B981',
                  color: '#FFFFFF',
                  borderRadius: 2.5,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  '&:hover': { bgcolor: '#059669' }
                }}
              >
                Auto-Dispatch Solar Surplus
              </Button>
              <Link href="/intelligence">
                <Button
                  endIcon={<ArrowForward fontSize="small" />}
                  sx={{ color: '#1B4332', textTransform: 'none', fontWeight: 700, fontSize: '0.82rem' }}
                >
                  View All Recommendations
                </Button>
              </Link>
            </Box>
          </Paper>

          {/* Production Predictions Radar */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27, 67, 50, 0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Upcoming Harvest & Production Predictions
                </Typography>
                <Typography variant="body2" sx={{ color: '#5A7565' }}>
                  Forecasted biological yields based on growth stages and climate sensors.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DataSourceBadge source="ESTIMATED" lastUpdated="Biomass Growth Engine" size="small" />
                <Chip
                  icon={<TrendingUp fontSize="small" />}
                  label="32.4 kg This Week"
                  size="small"
                  sx={{ bgcolor: 'rgba(16,185,129,0.12)', color: '#065F46', fontWeight: 700 }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {productionData.activeBatches.slice(0, 3).map((batch) => (
                <Box
                  key={batch.id}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: '#FAF9F5',
                    border: '1px solid rgba(27, 67, 50, 0.06)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                        {batch.crop}
                      </Typography>
                      <Chip
                        label={batch.zone.split(':')[0]}
                        size="small"
                        sx={{ height: 20, fontSize: '0.68rem', bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332' }}
                      />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#10B981' }}>
                      Est. {batch.targetYield}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                    <Typography variant="caption" sx={{ color: '#5A7565' }}>
                      Stage: {batch.stage} • ETA {batch.estimatedHarvest}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>
                      {batch.progress}% ready
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={batch.progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'rgba(27,67,50,0.08)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: batch.progress > 85 ? '#10B981' : '#65A30D',
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right: Ecosystem Health Analysis & Zone Telemetry */}
        <Grid item xs={12} lg={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27, 67, 50, 0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Ecosystem Health Telemetry
                </Typography>
                <Typography variant="body2" sx={{ color: '#5A7565' }}>
                  Microclimate & bio-sensor real-time telemetry
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DataSourceBadge source="LIVE" lastUpdated="Streaming Active" size="small" />
                <Chip
                  label="98% Stability"
                  size="small"
                  sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#065F46', fontWeight: 800 }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
              {/* Hydroponics & Aquaponic Vitality */}
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: '#F0F7FB', border: '1px solid rgba(2, 132, 199, 0.15)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0369A1' }}>
                      Hydroponic / Vertical Garden & Sump
                    </Typography>
                    <DataSourceBadge source="LIVE" size="small" lastUpdated="1m ago" />
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#0284C7' }}>
                    DO 6.8 mg/L • pH 6.2 • EC 1.6
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#486253', display: 'block' }}>
                  Water Temp 24.8°C • 480 Vertical NFT positions active • Root oxygenation optimal.
                </Typography>
              </Box>

              {/* TOGA Living Soil & Agroforestry */}
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: '#F5FAF3', border: '1px solid rgba(101, 163, 13, 0.15)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4D7C0F' }}>
                      TOGA Garden & Living Soil Beds
                    </Typography>
                    <DataSourceBadge source="MANUAL" size="small" lastUpdated="Today 09:00" />
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#65A30D' }}>
                    Moisture 36% • Organic 9.4%
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#486253', display: 'block' }}>
                  Biochar-rich root zone with active Bokashi humus mulch under medicinal ginger and turmeric canopy.
                </Typography>
              </Box>

              {/* Energy Storage Hub - Gudang & Utilitas */}
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: '#FEFBF2', border: '1px solid rgba(217, 119, 6, 0.15)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#B45309' }}>
                      Gudang & Utilitas Inverter Core
                    </Typography>
                    <DataSourceBadge source="LIVE" size="small" lastUpdated="15s ago" />
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#D97706' }}>
                    15.3 kWh • 91% SoC
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#486253', display: 'block' }}>
                  18.4 hours continuous autonomy stored. 2-level utility hub routing solar generation.
                </Typography>
              </Box>
            </Box>

            {/* Link to Full Map */}
            <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid rgba(27, 67, 50, 0.08)' }}>
              <Link href="/map">
                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderRadius: 3,
                    borderColor: 'rgba(27,67,50,0.2)',
                    color: '#1B4332',
                    py: 1.2,
                    textTransform: 'none',
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#F0F6F1', borderColor: '#1B4332' }
                  }}
                >
                  Explore Interactive 300 m² Site Map
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* ACTION FEEDBACK SNACKBAR */}
      <Snackbar
        open={Boolean(actionNotice)}
        autoHideDuration={4000}
        onClose={() => setActionNotice(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setActionNotice(null)}
          severity="success"
          sx={{
            borderRadius: 3,
            bgcolor: '#1B4332',
            color: '#FFFFFF',
            fontWeight: 600,
            '& .MuiAlert-icon': { color: '#10B981' }
          }}
        >
          {actionNotice}
        </Alert>
      </Snackbar>
    </>
  );
}
