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
  Chip,
  Paper,
} from '@mui/material';
import { Close, Egg, CheckCircle } from '@mui/icons-material';
import { LivestockService } from '../../../services/livestockService';

export default function RecordEggHarvestDrawer({ open, onClose, batch, onEggHarvestLogged }) {
  const [eggsCollected, setEggsCollected] = useState(21);
  const [totalHens, setTotalHens] = useState(24);
  const [gradeACount, setGradeACount] = useState(19);
  const [crackedCount, setCrackedCount] = useState(1);
  const [avgWeightGrams, setAvgWeightGrams] = useState(45.2);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (batch) {
      if (batch.initialQuantity) setTotalHens(Number(batch.initialQuantity));
      if (batch.headCount) setTotalHens(Number(batch.headCount));
    }
  }, [batch]);

  if (!batch) return null;

  const hdpPercent = totalHens > 0 ? Math.round((Number(eggsCollected) / Number(totalHens)) * 1000) / 10 : 0;
  const totalWeightKg = ((Number(eggsCollected) * Number(avgWeightGrams)) / 1000).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(eggsCollected) <= 0) {
      setError('Egg collection must be at least 1 egg.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        batchCode: batch.code || batch.batchCode || 'BAT-2026-LIV-01',
        eggsCollected: Number(eggsCollected),
        totalHens: Number(totalHens),
        gradeACount: Number(gradeACount),
        crackedCount: Number(crackedCount),
        averageEggWeightGrams: Number(avgWeightGrams),
        notes: notes || undefined,
      };

      const result = await LivestockService.recordEggHarvest(payload);

      if (onEggHarvestLogged) {
        await onEggHarvestLogged(batch.id || batch.code, {
          ...payload,
          henDayProductionPercent: hdpPercent,
          totalWeightKg: Number(totalWeightKg),
          result,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record egg harvest');
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
          <Box sx={{ bgcolor: 'rgba(217, 119, 6, 0.12)', p: 1, borderRadius: 2, display: 'flex' }}>
            <Egg sx={{ color: '#D97706' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1B4332' }}>
              Record Daily Egg Harvest
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

      {/* KPI Preview Card */}
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
        <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600, display: 'block', mb: 1 }}>
          Live Laying Performance Metric
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332' }}>
              {hdpPercent}%
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              Hen-Day Production (HDP)
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#10B981' }}>
              {totalWeightKg} kg
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              Estimated Biomass
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
          <Chip
            size="small"
            label={hdpPercent >= 80 ? 'Optimal Laying Curve' : hdpPercent >= 60 ? 'Moderate Output' : 'Molting / Sub-optimal'}
            sx={{
              bgcolor: hdpPercent >= 80 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(234, 179, 8, 0.12)',
              color: hdpPercent >= 80 ? '#10B981' : '#B45309',
              fontWeight: 700,
            }}
          />
        </Box>
      </Paper>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Total Eggs Collected"
              type="number"
              value={eggsCollected}
              onChange={(e) => {
                const val = Number(e.target.value);
                setEggsCollected(val);
                setGradeACount(Math.max(0, val - Number(crackedCount)));
              }}
              required
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Active Hens"
              type="number"
              value={totalHens}
              onChange={(e) => setTotalHens(e.target.value)}
              required
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Grade A Table Eggs"
              type="number"
              value={gradeACount}
              onChange={(e) => setGradeACount(e.target.value)}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cracked / Broken"
              type="number"
              value={crackedCount}
              onChange={(e) => {
                const cVal = Number(e.target.value);
                setCrackedCount(cVal);
                setGradeACount(Math.max(0, Number(eggsCollected) - cVal));
              }}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Average Egg Weight (grams)"
              type="number"
              inputProps={{ step: '0.1' }}
              value={avgWeightGrams}
              onChange={(e) => setAvgWeightGrams(e.target.value)}
              size="small"
              fullWidth
              helperText="KUB standard baseline is 45.0 - 48.0 g per egg"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Shell Luster & Stewardship Notes"
              placeholder="Strong calcium hardness, clean nesting straw..."
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
            {submitting ? 'Recording...' : 'Commit Eggs to Pantry'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
