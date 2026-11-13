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
import { Close, SetMeal, RestaurantMenu, CheckCircle } from '@mui/icons-material';
import { AquacultureService } from '../../../services/aquacultureService';

const FISH_FEED_OPTIONS = [
  'Floating Extruded Pellets (32% CP)',
  'Fresh Harvested Duckweed (Lemna minor)',
  'Live BSF Larvae (Zone 3 Circular Inoculum)',
  'Azolla pinnata Aquatic Fern',
  'Commercial Sinking Catfish Pellets',
];

export default function LogFishFeedingDrawer({ open, onClose, pond, onFeedingLogged }) {
  const [pondId, setPondId] = useState('PND-01');
  const [feedType, setFeedType] = useState(FISH_FEED_OPTIONS[0]);
  const [amountGrams, setAmountGrams] = useState(650);
  const [feedingBehavior, setFeedingBehavior] = useState('Aggressive / Surface Voracious');
  const [waterTempC, setWaterTempC] = useState(26.5);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pond) {
      setPondId(pond.pondCode || pond.code || 'PND-01');
    }
  }, [pond]);

  if (!pond && !open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(amountGrams) <= 0) {
      setError('Feed amount must be greater than zero.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        pondId,
        feedType,
        amountGrams: Number(amountGrams),
        feedingBehavior,
        waterTemperatureC: Number(waterTempC),
        notes: notes || undefined,
      };

      const result = await AquacultureService.recordFeeding(payload);

      if (onFeedingLogged) {
        await onFeedingLogged(pondId, {
          ...payload,
          result,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record fish feeding');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 460 }, p: 3, bgcolor: '#FAF9F5' } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ bgcolor: 'rgba(16, 185, 129, 0.12)', p: 1, borderRadius: 2, display: 'flex' }}>
            <SetMeal sx={{ color: '#10B981' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1B4332' }}>
              Log Fish Feeding Event
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              Zone 2 • Tilapia & Catfish Aquaculture
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          select
          label="Bio-Pond Identifier"
          value={pondId}
          onChange={(e) => setPondId(e.target.value)}
          size="small"
          fullWidth
        >
          <MenuItem value="PND-01">PND-01: Tilapia IBC Bio-Floc Tank Alpha</MenuItem>
          <MenuItem value="PND-02">PND-02: Catfish High-Density Tarpaulin Tank</MenuItem>
          <MenuItem value="PND-03">PND-03: Duckweed & Azolla Nursery Basin</MenuItem>
        </TextField>

        <TextField
          select
          label="Feed Formulation"
          value={feedType}
          onChange={(e) => setFeedType(e.target.value)}
          size="small"
          fullWidth
        >
          {FISH_FEED_OPTIONS.map((f) => (
            <MenuItem key={f} value={f}>
              {f}
            </MenuItem>
          ))}
        </TextField>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Amount Fed (grams)"
              type="number"
              value={amountGrams}
              onChange={(e) => setAmountGrams(e.target.value)}
              required
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Water Temp (°C)"
              type="number"
              inputProps={{ step: '0.1' }}
              value={waterTempC}
              onChange={(e) => setWaterTempC(e.target.value)}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Observed Feeding Response"
              value={feedingBehavior}
              onChange={(e) => setFeedingBehavior(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="Aggressive / Surface Voracious">Aggressive / Surface Voracious</MenuItem>
              <MenuItem value="Active / Normal Feeding">Active / Normal Feeding</MenuItem>
              <MenuItem value="Slow / Sluggish (Inspect Dissolved Oxygen)">Slow / Sluggish (Inspect Dissolved Oxygen)</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Appetite & Residue Notes"
              placeholder="Pellets fully consumed within 4 minutes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={2}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', gap: 1.5, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined" sx={{ color: '#5A7565', borderColor: '#CBD5E1', textTransform: 'none', fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            startIcon={<CheckCircle />}
            sx={{
              bgcolor: '#1B4332',
              color: '#FFFFFF',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#2D6A4F' },
            }}
          >
            {submitting ? 'Recording...' : 'Commit Fish Feeding'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
