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
  Slider,
} from '@mui/material';
import { Close, Tune, CheckCircle, Bolt, Opacity } from '@mui/icons-material';
import { TelemetryService } from '../../../services/telemetryService';

const SOLAR_DUMP_OPTIONS = [
  { value: 'EVAPORATIVE_MISTING', label: 'Zone 1 Greenhouse Evaporative Misting' },
  { value: 'POND_CASCADE_AERATOR', label: 'Zone 2 Bio-Pond Cascade Aerator' },
  { value: 'WATER_HEATER', label: 'Zone 7 Domestic Hot Water Pre-Heat' },
  { value: 'BATTERY_STORAGE_ONLY', label: 'Battery Storage Float (No Diversion)' },
];

const RAINWATER_PRIO_OPTIONS = [
  { value: 'AQUAPONICS_FIRST', label: 'Aquaponics Bio-Pond Top-up First' },
  { value: 'LIVING_SOIL_FIRST', label: 'Permaculture Raised Beds & Food Forest' },
  { value: 'DOMESTIC_FIRST', label: 'Domestic Dwelling Drinking & Utility' },
  { value: 'BALANCED', label: 'Balanced Automated Manifold Distribution' },
];

export default function ConfigureDispatchPolicyDrawer({ open, onClose, onPolicyUpdated }) {
  const [solarDumpMode, setSolarDumpMode] = useState('EVAPORATIVE_MISTING');
  const [rainwaterPriority, setRainwaterPriority] = useState('AQUAPONICS_FIRST');
  const [batteryFloor, setBatteryFloor] = useState(20);
  const [stewardName, setStewardName] = useState('Vincent');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      TelemetryService.getDispatchPolicy()
        .then((pol) => {
          if (pol) {
            if (pol.solarDumpMode) setSolarDumpMode(pol.solarDumpMode);
            if (pol.rainwaterPriority) setRainwaterPriority(pol.rainwaterPriority);
            if (pol.batteryFloorReservePercent) setBatteryFloor(pol.batteryFloorReservePercent);
            if (pol.stewardName) setStewardName(pol.stewardName);
          }
        })
        .catch(() => {});
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        solarDumpMode,
        rainwaterPriority,
        batteryFloorReservePercent: Number(batteryFloor),
        stewardName,
      };

      const result = await TelemetryService.updateDispatchPolicy(payload);

      if (onPolicyUpdated) {
        await onPolicyUpdated(payload);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update dispatch policy');
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
              bgcolor: 'rgba(217,119,6,0.12)',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Tune />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Resource Dispatch Policy
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565' }}>
              Configure microgrid dump loads & rainwater routing
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
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Bolt sx={{ color: '#D97706', fontSize: 20 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                Solar Surplus Dump Target
              </Typography>
            </Box>
            <TextField
              select
              fullWidth
              size="small"
              value={solarDumpMode}
              onChange={(e) => setSolarDumpMode(e.target.value)}
              helperText="Appliance triggered when battery SoC >= 95% and excess solar >= 2 kW"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            >
              {SOLAR_DUMP_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Opacity sx={{ color: '#0284C7', fontSize: 20 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                Rainwater Distribution Priority
              </Typography>
            </Box>
            <TextField
              select
              fullWidth
              size="small"
              value={rainwaterPriority}
              onChange={(e) => setRainwaterPriority(e.target.value)}
              helperText="Priority zone when cistern volume drops during dry spells"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            >
              {RAINWATER_PRIO_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Battery Floor Reserve: {batteryFloor}%
                </Typography>
                <Typography variant="caption" sx={{ color: '#EF4444', fontWeight: 700 }}>
                  Cutoff Floor
                </Typography>
              </Box>
              <Slider
                value={batteryFloor}
                onChange={(_, val) => setBatteryFloor(val)}
                min={15}
                max={40}
                step={1}
                valueLabelDisplay="auto"
                sx={{
                  color: '#10B981',
                  '& .MuiSlider-thumb': { bgcolor: '#1B4332' },
                }}
              />
              <Typography variant="caption" sx={{ color: '#5A7565', display: 'block' }}>
                If LiFePO4 battery drops below this threshold, non-essential loads are shed automatically to preserve critical aeration and OS terminal power.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Steward Signature"
              value={stewardName}
              onChange={(e) => setStewardName(e.target.value)}
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
              {submitting ? 'Applying Policy...' : 'Save & Enforce Dispatch Policy'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Drawer>
  );
}
