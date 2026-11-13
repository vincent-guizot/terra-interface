import React, { useState } from 'react';
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
  Slider,
  Paper,
} from '@mui/material';
import { Close, Pets, RestaurantMenu, CheckCircle } from '@mui/icons-material';
import { LivestockService } from '../../../services/livestockService';

const COMMON_FEED_TYPES = [
  'BSF Live Prepupae + Rice Bran Mash',
  'Commercial Layer Pellets (17% CP)',
  'Pastured Forage & Azolla Greens',
  'Brewer Spent Grains + Minerals',
  'Fermented Maize & Fishmeal Ruminant Mash',
];

export default function LogLivestockFeedDrawer({ open, onClose, batch, onFeedLogged }) {
  const [feedType, setFeedType] = useState(COMMON_FEED_TYPES[0]);
  const [quantityKg, setQuantityKg] = useState(2.8);
  const [circularPercent, setCircularPercent] = useState(65);
  const [feedTime, setFeedTime] = useState('Morning Ration (07:30)');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!batch) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(quantityKg) <= 0) {
      setError('Feed ration quantity must be greater than zero.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        batchCode: batch.code || batch.batchCode || 'BAT-2026-LIV-01',
        feedType,
        quantityKg: Number(quantityKg),
        circularPortionPercent: Number(circularPercent),
        feedTime,
        notes: notes || undefined,
      };

      const result = await LivestockService.recordFeeding(payload);

      if (onFeedLogged) {
        await onFeedLogged(batch.id || batch.code, {
          ...payload,
          result,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record feed ration');
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
            <RestaurantMenu sx={{ color: '#10B981' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1B4332' }}>
              Log Feed Ration
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              {batch.code || batch.batchCode} • {batch.name || batch.breed}
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

      {/* Circular Self-Sufficiency Indicator */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          bgcolor: '#FFFFFF',
          borderRadius: 2.5,
          border: '1px solid rgba(27, 67, 50, 0.08)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
            On-Farm Circular Feed Ratio
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#10B981' }}>
            {circularPercent}% Self-Produced
          </Typography>
        </Box>
        <Slider
          value={circularPercent}
          onChange={(_, val) => setCircularPercent(val)}
          step={5}
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
          min={0}
          max={100}
          sx={{ color: '#10B981' }}
        />
        <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', mt: 1 }}>
          Includes live BSF larvae from Zone 3 and harvested duckweed from Zone 2.
        </Typography>
      </Paper>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          select
          label="Feed Type & Provenance"
          value={feedType}
          onChange={(e) => setFeedType(e.target.value)}
          size="small"
          fullWidth
        >
          {COMMON_FEED_TYPES.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Quantity Fed (kg)"
              type="number"
              inputProps={{ step: '0.1' }}
              value={quantityKg}
              onChange={(e) => setQuantityKg(e.target.value)}
              required
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Feeding Window"
              value={feedTime}
              onChange={(e) => setFeedTime(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="Morning Ration (07:30)">Morning Ration (07:30)</MenuItem>
              <MenuItem value="Midday Supplemental (12:30)">Midday Supplemental (12:30)</MenuItem>
              <MenuItem value="Evening Ration (16:30)">Evening Ration (16:30)</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Feeding Behavior & Appetite Notes"
              placeholder="High flock appetite, empty troughs in 12 mins..."
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
            {submitting ? 'Recording...' : 'Commit Feed Ration'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
