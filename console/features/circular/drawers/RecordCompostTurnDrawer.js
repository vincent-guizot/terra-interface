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
  Chip,
} from '@mui/material';
import { Close, Whatshot, CheckCircle, Opacity, Spa } from '@mui/icons-material';
import { CircularService } from '../../../services/circularService';

export default function RecordCompostTurnDrawer({ open, onClose, batch, onTurnLogged }) {
  const [bayNumber, setBayNumber] = useState('Bay 1');
  const [batchCode, setBatchCode] = useState('BAT-2026-CMP-12');
  const [coreTempC, setCoreTempC] = useState(62.0);
  const [edgeTempC, setEdgeTempC] = useState(46.0);
  const [ambientTempC, setAmbientTempC] = useState(27.5);
  const [turnCount, setTurnCount] = useState(3);
  const [moisturePercent, setMoisturePercent] = useState(55);
  const [biocharAddedKg, setBiocharAddedKg] = useState(5.0);
  const [waterAddedLiters, setWaterAddedLiters] = useState(10);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (batch) {
      setBatchCode(batch.code || batch.batchCode || 'BAT-2026-CMP-12');
      if (batch.bayNumber) setBayNumber(batch.bayNumber);
      if (batch.temperatureC) setCoreTempC(Number(batch.temperatureC));
      if (batch.edgeTempC) setEdgeTempC(Number(batch.edgeTempC));
      if (batch.turnCount) setTurnCount(Number(batch.turnCount) + 1);
      if (batch.moisturePercent) setMoisturePercent(Number(batch.moisturePercent));
    }
  }, [batch]);

  const isThermophilic = coreTempC >= 55.0 && coreTempC <= 68.0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(coreTempC) <= 0) {
      setError('Core temperature reading is required.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        batchCode,
        bayNumber,
        coreTempC: Number(coreTempC),
        edgeTempC: Number(edgeTempC),
        ambientTempC: Number(ambientTempC),
        turnCount: Number(turnCount),
        moisturePercent: Number(moisturePercent),
        biocharAddedKg: Number(biocharAddedKg),
        waterAddedLiters: Number(waterAddedLiters),
        notes: notes || undefined,
      };

      const result = await CircularService.recordCompostTurn(payload);

      if (onTurnLogged) {
        await onTurnLogged(batch ? batch.id || batch.code : batchCode, {
          ...payload,
          result,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record compost turn');
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
              bgcolor: 'rgba(239,68,68,0.12)',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Whatshot />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Log Pile Turn & Temp Probe
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565' }}>
              Bokashi & aerobic thermophilic conditioning
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
              label="Compost Bay"
              value={bayNumber}
              onChange={(e) => setBayNumber(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            >
              <MenuItem value="Bay 1">Bay 1 (Active Hot Pile)</MenuItem>
              <MenuItem value="Bay 2">Bay 2 (Cooling & Humus)</MenuItem>
              <MenuItem value="Bay 3">Bay 3 (Curing & Vermicompost)</MenuItem>
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

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Core Temp (°C)"
              value={coreTempC}
              onChange={(e) => setCoreTempC(e.target.value)}
              inputProps={{ min: 20, max: 80, step: 0.1 }}
              required
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Edge Temp (°C)"
              value={edgeTempC}
              onChange={(e) => setEdgeTempC(e.target.value)}
              inputProps={{ min: 15, max: 70, step: 0.1 }}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Turn Count"
              value={turnCount}
              onChange={(e) => setTurnCount(e.target.value)}
              inputProps={{ min: 1, max: 20 }}
              required
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          {/* Biological Stage Indicator */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: '#FFFFFF',
                border: isThermophilic
                  ? '1px solid rgba(16,185,129,0.3)'
                  : '1px solid rgba(245,158,11,0.3)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Microbial Heat Status
                </Typography>
                <Chip
                  label={
                    isThermophilic
                      ? 'Thermophilic Pasteurization Active'
                      : coreTempC < 45
                      ? 'Mesophilic / Curing'
                      : 'Warm Aerobic'
                  }
                  size="small"
                  sx={{
                    bgcolor: isThermophilic ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                    color: isThermophilic ? '#065F46' : '#B45309',
                    fontWeight: 800,
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: '#5A7565', display: 'block' }}>
                {isThermophilic
                  ? '✔ Core temp between 55°C–65°C destroys human/plant pathogens & weed seeds while preserving humus microbiology.'
                  : '⚠ Temperature below 55°C. Turn pile and hydrate to maintain active thermophilic cycle.'}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Pile Moisture (%)"
              value={moisturePercent}
              onChange={(e) => setMoisturePercent(e.target.value)}
              inputProps={{ min: 20, max: 80 }}
              helperText="Target: 50%–60% (damp sponge)"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Biochar Added (kg)"
              value={biocharAddedKg}
              onChange={(e) => setBiocharAddedKg(e.target.value)}
              inputProps={{ min: 0, step: 0.5 }}
              helperText="Charged biochar for odor & N capture"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Pile Condition & Aroma Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Turned thoroughly from edge to center; rich sweet forest floor aroma, white actinomycetes visible."
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
              {submitting ? 'Recording Turn...' : 'Confirm Turn & Temp Reading'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Drawer>
  );
}
