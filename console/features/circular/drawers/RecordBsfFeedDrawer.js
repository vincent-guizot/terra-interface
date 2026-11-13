import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Grid,
  Divider,
  Alert,
  MenuItem,
  Paper,
} from '@mui/material';
import { Close, Loop, CheckCircle, RestaurantMenu } from '@mui/icons-material';
import { CircularService } from '../../../services/circularService';

const SCRAP_TYPES = [
  'Kitchen Veg Scraps + Brewery Spent Grain',
  'Fruit Waste (Papaya/Banana skins) + Coffee Grounds',
  'Zone 1 Hydroponic Plant Trimmings & Root Cuttings',
  'Zone 2 Aquaponics Bio-Pond Mineral Sludge',
  'Expired Household Leftovers & Bread',
];

export default function RecordBsfFeedDrawer({ open, onClose, batch, onFeedLogged }) {
  const [trayId, setTrayId] = useState('tray-01');
  const [batchCode, setBatchCode] = useState('BAT-2026-BSF-08');
  const [scrapType, setScrapType] = useState(SCRAP_TYPES[0]);
  const [weightKg, setWeightKg] = useState(3.5);
  const [moisturePercent, setMoisturePercent] = useState(68);
  const [temperatureC, setTemperatureC] = useState(36.0);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (batch) {
      setBatchCode(batch.code || batch.batchCode || 'BAT-2026-BSF-08');
      if (batch.trayId) setTrayId(batch.trayId);
    }
  }, [batch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(weightKg) <= 0) {
      setError('Biomass scrap weight must be greater than zero.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        batchCode,
        trayId,
        organicScrapType: scrapType,
        feedWeightKg: Number(weightKg),
        moisturePercent: Number(moisturePercent),
        temperatureC: Number(temperatureC),
        notes: notes || undefined,
      };

      const result = await CircularService.recordBsfFeed(payload);

      if (onFeedLogged) {
        await onFeedLogged(batch ? batch.id || batch.code : trayId, {
          ...payload,
          result,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record BSF feeding');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 480 },
          p: 3,
          bgcolor: '#FAF9F5',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: 'rgba(245,158,11,0.12)',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <RestaurantMenu />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Feed BSF Bioconversion Tray
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565' }}>
              Organic scrap biomass intake into stacked insect unit
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#5A7565' }}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              size="small"
              label="BSF Unit Tray"
              value={trayId}
              onChange={(e) => setTrayId(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            >
              <MenuItem value="tray-01">Tray 01 (Upper Level)</MenuItem>
              <MenuItem value="tray-02">Tray 02 (Mid Level)</MenuItem>
              <MenuItem value="tray-03">Tray 03 (Lower Level)</MenuItem>
              <MenuItem value="tray-04">Tray 04 (Nursery Tray)</MenuItem>
              <MenuItem value="tray-05">Tray 05 (Crawl-off Basin)</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Batch Code"
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              size="small"
              label="Substrate Biomass Type"
              value={scrapType}
              onChange={(e) => setScrapType(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            >
              {SCRAP_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Feed Weight (kg)"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              inputProps={{ min: 0.1, step: 0.1 }}
              required
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Moisture (%)"
              value={moisturePercent}
              onChange={(e) => setMoisturePercent(e.target.value)}
              inputProps={{ min: 30, max: 95 }}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Bed Temp (°C)"
              value={temperatureC}
              onChange={(e) => setTemperatureC(e.target.value)}
              inputProps={{ min: 20, max: 50, step: 0.1 }}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(27,67,50,0.1)',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 0.5 }}>
                Bioconversion Expectation
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', mb: 0.5 }}>
                • Estimated prepupae harvest: ~{Math.round(weightKg * 0.18 * 100) / 100} kg (18% efficiency)
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565', display: 'block' }}>
                • Digestion time: 10–14 days in optimal 32–38°C bed temperature
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Steward Observations / Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Moisture adjusted with spent coffee grounds; vigorous larval feeding activity observed."
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={submitting}
              startIcon={<CheckCircle />}
              sx={{
                bgcolor: '#10B981',
                color: '#FFFFFF',
                py: 1.2,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': { bgcolor: '#059669' },
              }}
            >
              {submitting ? 'Recording Feed Intake...' : 'Confirm Feed Input'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Drawer>
  );
}
