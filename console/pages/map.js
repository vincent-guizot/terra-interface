import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Grid,
  ButtonGroup,
  Drawer,
  IconButton,
  Divider,
  LinearProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  MapOutlined,
  ViewModuleOutlined,
  SyncAltOutlined,
  Close,
  Thermostat,
  Opacity,
  WbSunny,
  Bolt,
  Grass,
  PlayArrow,
  CheckCircle,
  Spa,
  Layers
} from '@mui/icons-material';
import IsometricHomesteadHero from '../components/isometric/IsometricHomesteadHero';
import IsometricResourceFlow from '../components/isometric/IsometricResourceFlow';
import AnimatedResourceStream from '../components/isometric/AnimatedResourceStream';
import { homesteadZones, homesteadProfile } from '../data/homesteadData';

export default function MapPage() {
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'zones' | 'flow'
  const [selectedZone, setSelectedZone] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleSelectZone = (zoneId) => {
    const found = homesteadZones.find(z => z.id === zoneId);
    if (found) {
      setSelectedZone(found);
      setDrawerOpen(true);
    }
  };

  const handleZoneAction = (actionName) => {
    setToastMsg(`Dispatched command: ${actionName} to ${selectedZone?.name}!`);
  };

  return (
    <>
      <Head>
        <title>Terra Interface — Map (Where is everything?)</title>
      </Head>

      {/* HEADER & VIEW MODE SELECTOR */}
      <Box sx={{ mb: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#0284C7', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              02. Homestead Map • Where is everything?
            </Typography>
            <Chip
              label="300 m² Master Plan (15m × 20m)"
              size="small"
              sx={{ bgcolor: 'rgba(2, 132, 199, 0.12)', color: '#0369A1', fontWeight: 700, fontSize: '0.72rem' }}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F291E', letterSpacing: '-0.02em' }}>
            Vincent's Farm Spatial & Ecosystem Layout
          </Typography>
          <Typography variant="body1" sx={{ color: '#486253', maxWidth: 700 }}>
            Explore the spatial arrangement of the 7 functional zones, microclimate sensor clusters, and biological circular connections.
          </Typography>
        </Box>

        {/* 3 Visualization Modes Switcher */}
        <ButtonGroup
          variant="outlined"
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: 3,
            p: 0.5,
            border: '1px solid rgba(27,67,50,0.1)',
            boxShadow: '0 4px 12px rgba(27,67,50,0.04)',
            '& .MuiButtonGroup-grouped': {
              borderRadius: '10px !important',
              border: 'none !important',
              px: 2,
              py: 0.8,
              fontWeight: 700,
              fontSize: '0.84rem',
              textTransform: 'none',
            }
          }}
        >
          <Button
            onClick={() => setViewMode('3d')}
            startIcon={<MapOutlined fontSize="small" />}
            sx={{
              bgcolor: viewMode === '3d' ? '#1B4332 !important' : 'transparent',
              color: viewMode === '3d' ? '#FFFFFF !important' : '#486253',
            }}
          >
            3D Site Map
          </Button>
          <Button
            onClick={() => setViewMode('zones')}
            startIcon={<ViewModuleOutlined fontSize="small" />}
            sx={{
              bgcolor: viewMode === 'zones' ? '#1B4332 !important' : 'transparent',
              color: viewMode === 'zones' ? '#FFFFFF !important' : '#486253',
            }}
          >
            Zone List (7)
          </Button>
          <Button
            onClick={() => setViewMode('flow')}
            startIcon={<SyncAltOutlined fontSize="small" />}
            sx={{
              bgcolor: viewMode === 'flow' ? '#1B4332 !important' : 'transparent',
              color: viewMode === 'flow' ? '#FFFFFF !important' : '#486253',
            }}
          >
            Resource Flow
          </Button>
        </ButtonGroup>
      </Box>

      {/* MODE 1: 3D SITE MAP */}
      {viewMode === '3d' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <IsometricHomesteadHero
            activeZoneId={selectedZone?.id}
            onSelectZone={handleSelectZone}
          />

          {/* Quick Zone Navigator Bar */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.04)',
            }}
          >
            <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 700, mb: 1.5, display: 'block' }}>
              DIRECT ZONE INSPECTION • CLICK TO VIEW LIVE TELEMETRY
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 0.5 }}>
              {homesteadZones.map((z) => (
                <Box
                  key={z.id}
                  onClick={() => handleSelectZone(z.id)}
                  sx={{
                    minWidth: 160,
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: selectedZone?.id === z.id ? `${z.color}15` : '#FAF9F5',
                    border: `1.5px solid ${selectedZone?.id === z.id ? z.color : 'rgba(27,67,50,0.08)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: `${z.color}10`,
                      borderColor: z.color,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: z.color }}>
                      {z.code}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                      {z.area}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332', fontSize: '0.85rem', lineHeight: 1.2 }}>
                    {z.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      )}

      {/* MODE 2: ZONE LIST (Detailed 7-Zone Master Cards) */}
      {viewMode === 'zones' && (
        <Grid container spacing={3}>
          {homesteadZones.map((zone) => (
            <Grid item xs={12} md={6} lg={4} key={zone.id}>
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
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 16px 36px -10px rgba(27,67,50,0.1)',
                    borderColor: zone.color,
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={zone.code}
                      size="small"
                      sx={{
                        bgcolor: `${zone.color}20`,
                        color: zone.color,
                        fontWeight: 800,
                        fontSize: '0.75rem',
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                      {zone.area}
                    </Typography>
                  </Box>
                  <Chip
                    label={zone.status}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(16, 185, 129, 0.12)',
                      color: '#065F46',
                      fontWeight: 700,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332', mb: 0.5 }}>
                  {zone.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600, display: 'block', mb: 1.5 }}>
                  Domain: {zone.type}
                </Typography>

                <Typography variant="body2" sx={{ color: '#486253', mb: 2, fontSize: '0.85rem', flexGrow: 1 }}>
                  {zone.summary}
                </Typography>

                {/* Microclimate telemetry pill box */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1.2,
                    p: 1.5,
                    borderRadius: 2.5,
                    bgcolor: '#FAF9F5',
                    border: '1px solid rgba(27,67,50,0.06)',
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', fontSize: '0.7rem' }}>
                      Primary Metric
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                      {zone.temp || zone.generation || zone.storage}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', fontSize: '0.7rem' }}>
                      Output / Quality
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                      {zone.dailyYield || zone.batterySoC || zone.eggYield || zone.tds || 'Optimal'}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleSelectZone(zone.id)}
                  sx={{
                    borderRadius: 2.5,
                    borderColor: 'rgba(27,67,50,0.18)',
                    color: '#1B4332',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    '&:hover': { bgcolor: '#F0F6F1', borderColor: '#1B4332' }
                  }}
                >
                  Open Zone Console
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* MODE 3: RESOURCE FLOW */}
      {viewMode === 'flow' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <AnimatedResourceStream />
          <IsometricResourceFlow />
        </Box>
      )}

      {/* ZONE INSPECTION DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 420 },
            p: 3,
            bgcolor: '#FFFFFF',
            borderLeft: '1px solid rgba(27,67,50,0.1)',
          }
        }}
      >
        {selectedZone && (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Drawer Top */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Chip
                label={`${selectedZone.code} • ${selectedZone.area}`}
                size="small"
                sx={{
                  bgcolor: `${selectedZone.color}20`,
                  color: selectedZone.color,
                  fontWeight: 800,
                  fontSize: '0.75rem',
                }}
              />
              <IconButton onClick={() => setDrawerOpen(false)} size="small">
                <Close fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1B4332', mb: 0.5 }}>
              {selectedZone.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#5A7565', mb: 2 }}>
              {selectedZone.summary}
            </Typography>

            <Divider sx={{ mb: 2.5 }} />

            {/* Live Telemetry Grid */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1.5 }}>
              Sensors & Environmental Telemetry
            </Typography>

            <Grid container spacing={1.5} sx={{ mb: 3 }}>
              {selectedZone.temp && (
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5', border: '1px solid rgba(27,67,50,0.06)' }}>
                    <Typography variant="caption" sx={{ color: '#748B7D' }}>Ambient Temp</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>{selectedZone.temp}</Typography>
                  </Box>
                </Grid>
              )}
              {selectedZone.humidity && (
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5', border: '1px solid rgba(27,67,50,0.06)' }}>
                    <Typography variant="caption" sx={{ color: '#748B7D' }}>Relative Humidity</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#10B981' }}>{selectedZone.humidity}</Typography>
                  </Box>
                </Grid>
              )}
              {selectedZone.ph && (
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5', border: '1px solid rgba(27,67,50,0.06)' }}>
                    <Typography variant="caption" sx={{ color: '#748B7D' }}>Water pH</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0284C7' }}>{selectedZone.ph}</Typography>
                  </Box>
                </Grid>
              )}
              {selectedZone.generation && (
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5', border: '1px solid rgba(27,67,50,0.06)' }}>
                    <Typography variant="caption" sx={{ color: '#748B7D' }}>Solar Generation</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#D97706' }}>{selectedZone.generation}</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

            {/* Active Biological Elements */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
              Active Biological Stock
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
              {(selectedZone.activeCrops || selectedZone.activeFauna || selectedZone.activeFlora || ['General Homestead Ecosystem']).map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.2,
                    borderRadius: 2,
                    bgcolor: '#F3F8F4',
                  }}
                >
                  <Spa sx={{ color: '#10B981', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Installed Equipment */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
              Installed Smart Hardware
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 3 }}>
              {selectedZone.equipment.map((eq, idx) => (
                <Typography key={idx} variant="caption" sx={{ color: '#486253', fontWeight: 600 }}>
                  • {eq}
                </Typography>
              ))}
            </Box>

            {/* Quick Contextual Commands */}
            <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="contained"
                onClick={() => handleZoneAction("Sensor Recalibration & Irrigation Pulse")}
                sx={{
                  bgcolor: '#1B4332',
                  color: '#FFFFFF',
                  borderRadius: 3,
                  py: 1.2,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#123124' }
                }}
              >
                Trigger Contextual Zone Cycle
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* TOAST FEEDBACK */}
      <Snackbar
        open={Boolean(toastMsg)}
        autoHideDuration={4000}
        onClose={() => setToastMsg('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToastMsg('')}
          severity="success"
          sx={{
            borderRadius: 3,
            bgcolor: '#1B4332',
            color: '#FFFFFF',
            fontWeight: 600,
            '& .MuiAlert-icon': { color: '#10B981' }
          }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
