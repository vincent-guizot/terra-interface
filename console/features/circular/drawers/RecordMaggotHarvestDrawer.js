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
import { Close, Loop, CheckCircle, Inventory2Outlined } from '@mui/icons-material';
import { CircularService } from '../../../services/circularService';

export default function RecordMaggotHarvestDrawer({ open, onClose, batch, onHarvestLogged }) {
  const [prepupaeYieldKg, setPrepupaeYieldKg] = useState(2.4);
  const [frassYieldKg, setFrassYieldKg] = useState(4.8);
  const [poultryAllocationKg, setPoultryAllocationKg] = useState(1.56);
  const [tilapiaAllocationKg, setTilapiaAllocationKg] = useState(0.84);
  const [trayId, setTrayId] = useState('tray-01');
  const [batchCode, setBatchCode] = useState('BAT-2026-BSF-08');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (batch) {
      setBatchCode(batch.code || batch.batchCode || 'BAT-2026-BSF-08');
      if (batch.larvaeYieldKg) setPrepupaeYieldKg(Number(batch.larvaeYieldKg));
      if (batch.frassYieldKg) setFrassYieldKg(Number(batch.frassYieldKg));
      if (batch.trayId) setTrayId(batch.trayId);
    }
  }, [batch]);

  // Dynamically update default allocations when yield changes
  const handleYieldChange = (val) => {
    const yieldNum = Number(val);
    setPrepupaeYieldKg(yieldNum);
    const poultryShare = Math.round(yieldNum * 0.65 * 100) / 100;
    const aquaShare = Math.round((yieldNum - poultryShare) * 100) / 100;
    setPoultryAllocationKg(poultryShare);
    setTilapiaAllocationKg(aquaShare);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(prepupaeYieldKg) <= 0) {
      setError('Live prepupae harvest yield must be greater than zero.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        batchCode,
        trayId,
        prepupaeYieldKg: Number(prepupaeYieldKg),
        frassYieldKg: Number(frassYieldKg),
        allocatedToPoultryKg: Number(poultryAllocationKg),
        allocatedToTilapiaKg: Number(tilapiaAllocationKg),
        notes: notes || undefined,
      };

      const result = await CircularService.recordMaggotHarvest(payload);

      if (onHarvestLogged) {
        await onHarvestLogged(batch ? batch.id || batch.code : batchCode, {
          ...payload,
          result,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record maggot harvest');
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
          width: { xs: '100%', sm: 500 },
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
              bgcolor: 'rgba(16,185,129,0.12)',
              color: '#065F46',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Loop />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Record Maggot & Frass Harvest
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565' }}>
              Live 42% protein prepupae extraction & bio-fertilizer credit
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
              fullWidth
              size="small"
              label="BSF Batch Code"
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Source Tray ID"
              value={trayId}
              onChange={(e) => setTrayId(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Live Prepupae Yield (kg)"
              value={prepupaeYieldKg}
              onChange={(e) => handleYieldChange(e.target.value)}
              inputProps={{ min: 0.1, step: 0.1 }}
              required
              helperText="Crawled-off 5-instar larvae"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Insect Frass Yield (kg)"
              value={frassYieldKg}
              onChange={(e) => setFrassYieldKg(e.target.value)}
              inputProps={{ min: 0.0, step: 0.1 }}
              helperText="Digested organic residue"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          {/* Biomass Nutritional & Inventory Integration Preview */}
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Nutrient & Closed-Loop Allocation
                </Typography>
                <Chip
                  label="42.4% Crude Protein"
                  size="small"
                  sx={{ bgcolor: 'rgba(16,185,129,0.15)', color: '#065F46', fontWeight: 800 }}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Zone 3 Poultry (kg)"
                    value={poultryAllocationKg}
                    onChange={(e) => setPoultryAllocationKg(e.target.value)}
                    inputProps={{ min: 0, step: 0.1 }}
                    helperText="65% Layer ration"
                    sx={{ bgcolor: '#FAF9F5' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Zone 2 Tilapia (kg)"
                    value={tilapiaAllocationKg}
                    onChange={(e) => setTilapiaAllocationKg(e.target.value)}
                    inputProps={{ min: 0, step: 0.1 }}
                    helperText="35% Bio-pond feed"
                    sx={{ bgcolor: '#FAF9F5' }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
                <Inventory2Outlined sx={{ fontSize: 16, color: '#10B981' }} />
                <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>
                  Auto-Ledger: +{prepupaeYieldKg} kg added to SKU-BSF-01 (Homestead Storage)
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Harvest Notes & Quality"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Dark pigmentation, high motility, uniform size prepupae ready for immediate live feeding."
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
              {submitting ? 'Recording Harvest...' : 'Confirm Maggot Harvest'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Drawer>
  );
}
