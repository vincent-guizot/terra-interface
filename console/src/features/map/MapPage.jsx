import React, { useState } from 'react';
import Head from '@/components/shared/PageHead';
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
  Layers,
  Warehouse,
  Pets,
  Egg,
  Loop,
  Agriculture,
  Yard,
  Park,
  HelpOutline,
  ArrowForward
} from '@mui/icons-material';
import IsometricHomesteadHero from '../../components/isometric/IsometricHomesteadHero.js';
import IsometricResourceFlow from '../../components/isometric/IsometricResourceFlow.js';
import AnimatedResourceStream from '../../components/isometric/AnimatedResourceStream.js';
import DataSourceBadge from '../../components/ui/DataSourceBadge.js';
import { masterPlanFacilities, MASTER_PLAN_SPECS, MASTER_PLAN_CLARIFICATIONS_NEEDED } from '../../data/masterPlanData.js';

export default function MapPage() {
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'zones' | 'flow'
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const facilities = masterPlanFacilities;

  const handleSelectFacility = (facId) => {
    const found = facilities.find(f => f.id === facId);
    if (found) {
      setSelectedFacility(found);
      setDrawerOpen(true);
    }
  };

  const handleFacilityAction = (actionName) => {
    setToastMsg(`Dispatched command: "${actionName}" to ${selectedFacility?.name}!`);
  };

  const categories = ['All', 'Utility & Storage', 'Cultivation', 'Livestock', 'Circular Bioconversion', 'Agroforestry & Medicinal'];

  const filteredFacilities = facilities.filter(f =>
    categoryFilter === 'All' || f.category === categoryFilter
  );

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
          <Typography variant="body1" sx={{ color: '#486253', maxWidth: 740 }}>
            Spatial layout of the canonical 10 farm buildings and areas, sensor cluster telemetry, and closed-loop ecological connections.
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
            Master Plan Facilities ({facilities.length})
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
            activeZoneId={selectedFacility?.id}
            onSelectZone={handleSelectFacility}
          />

          {/* Quick Facility Navigator Bar */}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                DIRECT FACILITY INSPECTION • CLICK TO INSPECT LIVE RECORDS
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                10 Approved Canonical Buildings & Areas
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 0.5 }}>
              {facilities.map((f) => (
                <Box
                  key={f.id}
                  onClick={() => handleSelectFacility(f.id)}
                  sx={{
                    minWidth: 175,
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: selectedFacility?.id === f.id ? `${f.color}15` : '#FAF9F5',
                    border: `1.5px solid ${selectedFacility?.id === f.id ? f.color : 'rgba(27,67,50,0.08)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    '&:hover': {
                      bgcolor: `${f.color}10`,
                      borderColor: f.color,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: f.color }}>
                      {f.code}
                    </Typography>
                    <DataSourceBadge source={f.dataSource} size="small" />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.84rem', lineHeight: 1.2, mb: 0.5 }}>
                    {f.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', fontSize: '0.68rem', fontWeight: 600 }}>
                    {f.dimensions?.verified ? '2.0 × 2.5m (2 Lvls)' : f.category}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      )}

      {/* MODE 2: MASTER PLAN FACILITIES (Canonical 10 Facility Master Cards) */}
      {viewMode === 'zones' && (
        <Box>
          {/* Category Filter Pills & Clarification Callout */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => setCategoryFilter(cat)}
                  sx={{
                    fontWeight: 700,
                    borderRadius: 3,
                    bgcolor: categoryFilter === cat ? '#1B4332' : 'rgba(255,255,255,0.9)',
                    color: categoryFilter === cat ? '#FFFFFF' : '#486253',
                    border: '1px solid rgba(27,67,50,0.1)',
                  }}
                />
              ))}
            </Box>

            <Chip
              icon={<HelpOutline fontSize="small" />}
              label={`${MASTER_PLAN_CLARIFICATIONS_NEEDED.length} Master Plan Items Pending Clarification`}
              size="small"
              sx={{ bgcolor: 'rgba(245, 158, 11, 0.14)', color: '#B45309', fontWeight: 700 }}
            />
          </Box>

          <Grid container spacing={3}>
            {filteredFacilities.map((facility) => (
              <Grid item xs={12} md={6} lg={4} key={facility.id}>
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
                      borderColor: facility.color,
                    }
                  }}
                >
                  {/* Card Header: Code, Data Source, Status */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={facility.code}
                        size="small"
                        sx={{
                          bgcolor: `${facility.color}20`,
                          color: facility.color,
                          fontWeight: 800,
                          fontSize: '0.75rem',
                        }}
                      />
                      <DataSourceBadge source={facility.dataSource} size="small" lastUpdated={facility.lastUpdated} />
                    </Box>
                    <Chip
                      label={facility.status}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(16, 185, 129, 0.12)',
                        color: '#065F46',
                        fontWeight: 700,
                        fontSize: '0.7rem'
                      }}
                    />
                  </Box>

                  {/* Title & Category */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    {getFacilityIcon(facility.id)}
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                      {facility.name}
                    </Typography>
                  </Box>

                  <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 700, display: 'block', mb: 1 }}>
                    {facility.category} • {facility.location}
                  </Typography>

                  {/* Building Type Tag */}
                  <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', mb: 1.5, fontWeight: 600 }}>
                    Type: {facility.buildingType}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#486253', mb: 2, fontSize: '0.84rem', flexGrow: 1, lineHeight: 1.5 }}>
                    {facility.description}
                  </Typography>

                  {/* Area Specification Box */}
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2.5,
                      bgcolor: '#FAF9F5',
                      border: '1px solid rgba(27,67,50,0.06)',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase' }}>
                        Area & Footprint
                      </Typography>
                      {facility.dimensions?.verified ? (
                        <Chip label="Verified Canonical" size="small" sx={{ height: 18, fontSize: '0.65rem', bgcolor: 'rgba(16,185,129,0.15)', color: '#065F46', fontWeight: 800 }} />
                      ) : (
                        <Chip label="CAD Survey TBD" size="small" sx={{ height: 18, fontSize: '0.65rem', bgcolor: 'rgba(245,158,11,0.15)', color: '#B45309', fontWeight: 800 }} />
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                      {facility.area}
                    </Typography>
                  </Box>

                  {/* Related Resources Chips */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 700, display: 'block', mb: 0.8, fontSize: '0.68rem', textTransform: 'uppercase' }}>
                      Related Resources & Modules
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
                      {facility.relatedResources.slice(0, 2).map((res, idx) => (
                        <Chip
                          key={idx}
                          label={res}
                          size="small"
                          sx={{ height: 20, fontSize: '0.68rem', bgcolor: 'rgba(27,67,50,0.06)', color: '#1B4332', fontWeight: 600 }}
                        />
                      ))}
                      {facility.relatedModules.map((mod, idx) => (
                        <Chip
                          key={`mod-${idx}`}
                          label={mod}
                          size="small"
                          sx={{ height: 20, fontSize: '0.68rem', bgcolor: `${facility.color}15`, color: facility.color, fontWeight: 700 }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleSelectFacility(facility.id)}
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
                    Inspect Facility Details
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* MODE 3: RESOURCE FLOW */}
      {viewMode === 'flow' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <AnimatedResourceStream />
          <IsometricResourceFlow />
        </Box>
      )}

      {/* FACILITY INSPECTION DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 460 },
            p: 3,
            bgcolor: '#FFFFFF',
            borderLeft: '1px solid rgba(27,67,50,0.1)',
          }
        }}
      >
        {selectedFacility && (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
            {/* Drawer Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={selectedFacility.code}
                  size="small"
                  sx={{
                    bgcolor: `${selectedFacility.color}20`,
                    color: selectedFacility.color,
                    fontWeight: 800,
                    fontSize: '0.75rem',
                  }}
                />
                <DataSourceBadge source={selectedFacility.dataSource} size="small" lastUpdated={selectedFacility.lastUpdated} />
              </Box>
              <IconButton onClick={() => setDrawerOpen(false)} size="small">
                <Close fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1B4332', mb: 0.5 }}>
              {selectedFacility.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 700, display: 'block', mb: 2 }}>
              {selectedFacility.category} • {selectedFacility.location}
            </Typography>

            <Typography variant="body2" sx={{ color: '#486253', mb: 2.5, lineHeight: 1.6 }}>
              {selectedFacility.description}
            </Typography>

            <Divider sx={{ mb: 2.5 }} />

            {/* Area & Structural Specifications */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
              Spatial & Structural Specification
            </Typography>
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#FAF9F5', borderRadius: 3, border: '1px solid rgba(27,67,50,0.06)', mb: 2.5 }}>
              <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase' }}>
                Building Type
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1B4332', mb: 1 }}>
                {selectedFacility.buildingType}
              </Typography>

              <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase' }}>
                Area / Dimensions
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#047857' }}>
                {selectedFacility.area}
              </Typography>
            </Paper>

            {/* Facility Operational Metrics */}
            {selectedFacility.metrics && (
              <>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
                  Operational Telemetry & Status
                </Typography>
                <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                  {Object.entries(selectedFacility.metrics).map(([key, val], idx) => (
                    <Grid item xs={6} key={idx}>
                      <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#F3F8F4', border: '1px solid rgba(16,185,129,0.12)' }}>
                        <Typography variant="caption" sx={{ color: '#5A7565', textTransform: 'capitalize', display: 'block', fontSize: '0.7rem' }}>
                          {key.replace(/([A-Z])/g, ' $1')}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                          {val}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {/* Related Resources */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
              Connected Homestead Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 2.5 }}>
              {selectedFacility.relatedResources.map((res, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10B981' }} />
                  <Typography variant="caption" sx={{ color: '#486253', fontWeight: 700 }}>
                    {res}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Missing Plan Details Notice (if applicable) */}
            {selectedFacility.missingPlanDetails && selectedFacility.missingPlanDetails.length > 0 && (
              <Box sx={{ p: 2, bgcolor: '#FFFBEB', borderRadius: 3, border: '1px solid rgba(245,158,11,0.25)', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                  <HelpOutline sx={{ color: '#D97706', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#92400E', textTransform: 'uppercase' }}>
                    Master Plan Survey Note
                  </Typography>
                </Box>
                {selectedFacility.missingPlanDetails.map((note, idx) => (
                  <Typography key={idx} variant="caption" sx={{ color: '#78350F', display: 'block', mb: 0.5, lineHeight: 1.4 }}>
                    • {note}
                  </Typography>
                ))}
              </Box>
            )}

            {/* Actions */}
            <Box sx={{ mt: 'auto', pt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="contained"
                onClick={() => handleFacilityAction("Operational Protocol Calibration")}
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
                Trigger Calibration Routine
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
