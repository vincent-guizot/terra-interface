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
  Paper,
  MenuItem,
} from '@mui/material';
import { Close, Opacity, CheckCircle, WarningAmber } from '@mui/icons-material';
import { AquacultureService } from '../../../services/aquacultureService';

export default function RecordWaterTestDrawer({ open, onClose, pond, onWaterTestLogged }) {
  const [pondId, setPondId] = useState('PND-01');
  const [doMgL, setDoMgL] = useState(6.2);
  const [pH, setPh] = useState(7.2);
  const [tempC, setTempC] = useState(26.5);
  const [ammoniaPpm, setAmmoniaPpm] = useState(0.15);
  const [nitritePpm, setNitritePpm] = useState(0.05);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pond) {
      setPondId(pond.pondCode || pond.code || 'PND-01');
    }
  }, [pond]);

  if (!pond && !open) return null;

  // Real-time warning triggers
  const isDoCritical = Number(doMgL) < 5.0;
  const isAmmoniaHigh = Number(ammoniaPpm) > 0.5;
  const isPhOff = Number(pH) < 6.5 || Number(pH) > 8.0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        pondId,
        dissolvedOxygenMgL: Number(doMgL),
        pH: Number(pH),
        waterTempC: Number(tempC),
        ammoniaPpm: Number(ammoniaPpm),
        nitritePpm: Number(nitritePpm),
        notes: notes || undefined,
      };

      const result = await AquacultureService.recordWaterTest(payload);

      if (onWaterTestLogged) {
        await onWaterTestLogged(pondId, {
          ...payload,
          result,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record water test');
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
          <Box sx={{ bgcolor: 'rgba(59, 130, 246, 0.12)', p: 1, borderRadius: 2, display: 'flex' }}>
            <Opacity sx={{ color: '#2563EB' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1B4332' }}>
              Log Water Quality Test
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              Zone 2 • Bio-Ponds & Recirculating Aquaponics
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

      {/* Real-time Threshold Warning Banners */}
      {isDoCritical && (
        <Alert severity="error" icon={<WarningAmber />} sx={{ mb: 2, borderRadius: 2 }}>
          <strong>Critical Low Dissolved Oxygen!</strong> DO &lt; 5.0 mg/L will trigger auxiliary venturi pump.
        </Alert>
      )}
      {isAmmoniaHigh && (
        <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
          <strong>Elevated Ammonia (TAN)!</strong> Ammonia &gt; 0.5 ppm. Inspect nitrifying biofilter.
        </Alert>
      )}
      {isPhOff && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
          <strong>pH Deviation:</strong> Target buffer is 6.5 - 8.0. Consider adding crushed oyster shell or wood ash.
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

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Dissolved Oxygen (mg/L)"
              type="number"
              inputProps={{ step: '0.1' }}
              value={doMgL}
              onChange={(e) => setDoMgL(e.target.value)}
              required
              size="small"
              fullWidth
              helperText="Target: ≥ 5.0 mg/L"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Water pH"
              type="number"
              inputProps={{ step: '0.1' }}
              value={pH}
              onChange={(e) => setPh(e.target.value)}
              required
              size="small"
              fullWidth
              helperText="Target: 6.5 – 8.0"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Water Temp (°C)"
              type="number"
              inputProps={{ step: '0.1' }}
              value={tempC}
              onChange={(e) => setTempC(e.target.value)}
              required
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Ammonia TAN (ppm)"
              type="number"
              inputProps={{ step: '0.01' }}
              value={ammoniaPpm}
              onChange={(e) => setAmmoniaPpm(e.target.value)}
              required
              size="small"
              fullWidth
              helperText="Safe: < 0.5 ppm"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nitrite NO2- (ppm)"
              type="number"
              inputProps={{ step: '0.01' }}
              value={nitritePpm}
              onChange={(e) => setNitritePpm(e.target.value)}
              size="small"
              fullWidth
              helperText="Target: < 0.2 ppm"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Water Clarity & Odor Notes"
              placeholder="Good floc suspension, zero hydrogen sulfide odor..."
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
            {submitting ? 'Recording...' : 'Commit Water Test'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
