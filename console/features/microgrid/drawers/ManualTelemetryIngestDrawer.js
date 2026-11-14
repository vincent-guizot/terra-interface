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
  Paper,
} from '@mui/material';
import { Close, Sensors, CheckCircle } from '@mui/icons-material';
import { TelemetryService } from '../../../services/telemetryService';

const SENSOR_DEVICES = [
  { value: 'ESP32-ZONE-05-ENERGY', label: 'ESP32 Zone 5: Growatt Hybrid Inverter & BMS' },
  { value: 'ESP32-ZONE-02-AQUA', label: 'ESP32 Zone 2: Aquaponics DO & pH Probe' },
  { value: 'ESP32-ZONE-06-CISTERN', label: 'ESP32 Zone 6: Ultrasonic Cistern Sensor' },
  { value: 'MANUAL-FIELD-ENTRY', label: 'Manual Field Calibration Probe' },
];

export default function ManualTelemetryIngestDrawer({ open, onClose, onTelemetryIngested }) {
  const [sensorDeviceId, setSensorDeviceId] = useState(SENSOR_DEVICES[0].value);
  const [solarGenerationKw, setSolarGenerationKw] = useState(4.2);
  const [inverterLoadWatts, setInverterLoadWatts] = useState(850);
  const [batterySoC, setBatterySoC] = useState(88.0);
  const [cisternLevelLiters, setCisternLevelLiters] = useState(10400);
  const [dissolvedOxygenMgL, setDissolvedOxygenMgL] = useState(6.8);
  const [pH, setPH] = useState(7.2);
  const [waterTemperatureC, setWaterTemperatureC] = useState(26.5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        sensorDeviceId,
        solarGenerationKw: Number(solarGenerationKw),
        inverterLoadWatts: Number(inverterLoadWatts),
        batterySoC: Number(batterySoC),
        cisternLevelLiters: Number(cisternLevelLiters),
        dissolvedOxygenMgL: Number(dissolvedOxygenMgL),
        pH: Number(pH),
        waterTemperatureC: Number(waterTemperatureC),
        timestamp: new Date().toISOString(),
      };

      const result = await TelemetryService.ingestTelemetry(payload);

      if (onTelemetryIngested) {
        await onTelemetryIngested(result);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to ingest sensor telemetry');
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
              bgcolor: 'rgba(16,185,129,0.12)',
              color: '#065F46',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Sensors />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Manual Telemetry Ingest
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565' }}>
              Simulate or manually log field sensor packets
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
            <TextField
              select
              fullWidth
              size="small"
              label="Sensor Device Probe"
              value={sensorDeviceId}
              onChange={(e) => setSensorDeviceId(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            >
              {SENSOR_DEVICES.map((dev) => (
                <MenuItem key={dev.value} value={dev.value}>
                  {dev.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Solar Generation (kW)"
              value={solarGenerationKw}
              onChange={(e) => setSolarGenerationKw(e.target.value)}
              inputProps={{ min: 0, max: 6.0, step: 0.1 }}
              required
              helperText="0 to 5.2 kWp nominal"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Inverter Load (Watts)"
              value={inverterLoadWatts}
              onChange={(e) => setInverterLoadWatts(e.target.value)}
              inputProps={{ min: 0, max: 8000, step: 50 }}
              required
              helperText="Homestead AC load"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Battery SoC (%)"
              value={batterySoC}
              onChange={(e) => setBatterySoC(e.target.value)}
              inputProps={{ min: 0, max: 100, step: 0.5 }}
              required
              helperText="<20% triggers load shedding"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Cistern Water (L)"
              value={cisternLevelLiters}
              onChange={(e) => setCisternLevelLiters(e.target.value)}
              inputProps={{ min: 0, max: 12000, step: 100 }}
              required
              helperText="<2,000 L triggers reserve warning"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="DO (mg/L)"
              value={dissolvedOxygenMgL}
              onChange={(e) => setDissolvedOxygenMgL(e.target.value)}
              inputProps={{ min: 0, max: 15, step: 0.1 }}
              helperText="<5.0 triggers backup"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Water pH"
              value={pH}
              onChange={(e) => setPH(e.target.value)}
              inputProps={{ min: 4, max: 10, step: 0.1 }}
              helperText="Ideal 6.8 - 7.6"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Water Temp (°C)"
              value={waterTemperatureC}
              onChange={(e) => setWaterTemperatureC(e.target.value)}
              inputProps={{ min: 15, max: 40, step: 0.1 }}
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
              <Typography variant="caption" sx={{ color: '#5A7565', display: 'block' }}>
                Ingesting this packet will immediately evaluate all 4 protection invariants (Low battery load shedding, excess solar dump load, cistern reserve, and DO aerator trigger) and push updates live via SSE.
              </Typography>
            </Paper>
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
              {submitting ? 'Ingesting Packet...' : 'Ingest Sensor Telemetry'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Drawer>
  );
}
