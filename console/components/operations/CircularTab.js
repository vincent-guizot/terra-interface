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
  RestaurantMenu,
  CheckCircle
} from '@mui/icons-material';

export default function CircularTab({
  circular,
  setActiveBsfBatch,
  setBsfFeedDrawerOpen,
  setMaggotHarvestDrawerOpen,
  setActiveCompostBatch,
  setCompostTurnDrawerOpen
}) {
  return (
    <Grid container spacing={3}>
      {/* BSF Batches */}
      <Grid item xs={12} lg={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(27,67,50,0.08)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                BSF Bioconversion Batches (Maggot Harvest)
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565' }}>
                Stacked insect trays converting kitchen waste into 42% protein
              </Typography>
            </Box>
            <Button
              size="small"
              variant="contained"
              startIcon={<RestaurantMenu />}
              onClick={() => {
                setActiveBsfBatch(circular.bsfBatches[0] || null);
                setBsfFeedDrawerOpen(true);
              }}
              sx={{
                bgcolor: '#10B981',
                color: '#FFFFFF',
                borderRadius: 2,
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': { bgcolor: '#059669' },
              }}
            >
              + Feed Tray
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip
              label="1.8 kg/day Live Protein"
              size="small"
              sx={{ bgcolor: 'rgba(245,158,11,0.15)', color: '#D97706', fontWeight: 800 }}
            />
            <Chip
              label="96.6% Closed Loop"
              size="small"
              sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 800 }}
            />
          </Box>

          {circular.bsfBatches.map((bsf) => (
            <Box
              key={bsf.id}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: '#FAF9F5',
                border: '1px solid rgba(27,67,50,0.06)',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  {bsf.name}
                </Typography>
                <Chip
                  label={bsf.status}
                  size="small"
                  sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 800 }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', mb: 0.5 }}>
                Input: {bsf.initialQuantity} {bsf.unit} &rarr; Output: {bsf.larvaeYieldKg} kg high-protein prepupae
              </Typography>
              <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', mb: 1.5 }}>
                Efficiency: {bsf.feedConversionEfficiency}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<CheckCircle />}
                  onClick={() => {
                    setActiveBsfBatch(bsf);
                    setMaggotHarvestDrawerOpen(true);
                  }}
                  sx={{
                    bgcolor: '#10B981',
                    color: '#FFFFFF',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    '&:hover': { bgcolor: '#059669' },
                  }}
                >
                  Harvest Prepupae
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<RestaurantMenu />}
                  onClick={() => {
                    setActiveBsfBatch(bsf);
                    setBsfFeedDrawerOpen(true);
                  }}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    color: '#1B4332',
                    borderColor: 'rgba(27,67,50,0.3)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  Feed Scraps
                </Button>
              </Box>
            </Box>
          ))}
        </Paper>
      </Grid>

      {/* Compost Batches & Maturity */}
      <Grid item xs={12} lg={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(27,67,50,0.08)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                Bokashi & Hot Compost Maturity Index
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565' }}>
                Aerobic windrows reaching 55–65°C pasteurization
              </Typography>
            </Box>
            <Chip
              label="480 kg Mature Humus"
              size="small"
              sx={{ bgcolor: 'rgba(101,163,13,0.15)', color: '#4D7C0F', fontWeight: 800 }}
            />
          </Box>

          {circular.compostBatches.map((cmp) => (
            <Box
              key={cmp.id}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: '#FAF9F5',
                border: '1px solid rgba(27,67,50,0.06)',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  {cmp.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 800, color: cmp.temperatureC >= 55 ? '#EF4444' : '#10B981' }}
                >
                  {cmp.temperatureC}°C
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', mb: 1 }}>
                Stage: {cmp.maturityStage} • Moisture {cmp.moisturePercent}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={cmp.maturityIndex}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  mb: 1,
                  '& .MuiLinearProgress-bar': { bgcolor: '#10B981' },
                }}
              />
              <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', mb: 1.5 }}>
                Recipe: {cmp.recipe}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setActiveCompostBatch(cmp);
                    setCompostTurnDrawerOpen(true);
                  }}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    color: '#1B4332',
                    borderColor: 'rgba(27,67,50,0.3)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  Log Turn & Temp
                </Button>
              </Box>
            </Box>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}
