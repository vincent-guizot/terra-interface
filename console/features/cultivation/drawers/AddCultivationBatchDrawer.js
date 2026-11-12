import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Grid,
  Divider,
  Alert,
} from '@mui/material';
import { Close, Spa, CheckCircle } from '@mui/icons-material';
import { SpatialService } from '../../../services/spatialService';
import { CatalogService } from '../../../services/catalogService';

export default function AddCultivationBatchDrawer({ open, onClose, onBatchCreated }) {
  const [zones, setZones] = useState([]);
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form State
  const [batchName, setBatchName] = useState('');
  const [batchCode, setBatchCode] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [productId, setProductId] = useState('');
  const [initialQuantity, setInitialQuantity] = useState(120);
  const [unit, setUnit] = useState('heads');
  const [growingMedium, setGrowingMedium] = useState('NFT_SOLUTION');
  const [ecTarget, setEcTarget] = useState(1.6);
  const [phTarget, setPhTarget] = useState(6.2);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (open) {
      setBatchCode(`BAT-${new Date().getFullYear()}-CUL-${String(Math.floor(Math.random() * 900) + 100)}`);
      async function loadMeta() {
        try {
          const [loadedZones, loadedProducts, loadedUnits] = await Promise.all([
            SpatialService.getZones(),
            CatalogService.getProducts(),
            CatalogService.getUnits(),
          ]);
          setZones(loadedZones || []);
          if (loadedZones && loadedZones.length > 0) setZoneId(loadedZones[0].code || loadedZones[0].id);
          setProducts(loadedProducts || []);
          if (loadedProducts && loadedProducts.length > 0) setProductId(loadedProducts[0].id);
          setUnits(loadedUnits || []);
        } catch (err) {
          console.warn('Metadata load fallback:', err.message);
        }
      }
      loadMeta();
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!batchName.trim()) {
      setError('Please provide a descriptive batch name.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        batchCode,
        name: batchName,
        domain: 'CULTIVATION',
        zoneId: zoneId || 'Z-01',
        productDefinitionId: productId || undefined,
        initialQuantity: Number(initialQuantity),
        measurementUnit: unit,
        startDate: new Date(startDate).toISOString(),
        notes: notes || undefined,
      };

      if (onBatchCreated) {
        await onBatchCreated(payload);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to start batch');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 480 }, p: 3, bgcolor: '#FAF9F5' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', p: 1, borderRadius: 2, display: 'flex' }}>
            <Spa sx={{ color: '#10B981' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1B4332' }}>
              Start Cultivation Batch
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              Universal Living Batch Engine • Vincent's Farm
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Batch Code"
          value={batchCode}
          disabled
          size="small"
          fullWidth
          helperText="Unique canonical batch reference identifier"
        />

        <TextField
          label="Batch Title / Cohort Name"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          placeholder="e.g. Greenhouse Bok Choy NFT Channel Alpha"
          required
          size="small"
          fullWidth
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Spatial Zone"
              value={zoneId}
              onChange={(e) => setZoneId(e.target.value)}
              size="small"
              fullWidth
            >
              {zones.map((z) => (
                <MenuItem key={z.code || z.id} value={z.code || z.id}>
                  {z.code}: {z.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Growing Medium"
              value={growingMedium}
              onChange={(e) => setGrowingMedium(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="NFT_SOLUTION">NFT Hydroponic</MenuItem>
              <MenuItem value="LIVING_SOIL">Permaculture Living Soil</MenuItem>
              <MenuItem value="SAWDUST_BAGLOG">Sawdust Baglog (Fungi)</MenuItem>
              <MenuItem value="DWC">Deep Water Culture</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Initial Quantity"
              type="number"
              value={initialQuantity}
              onChange={(e) => setInitialQuantity(e.target.value)}
              required
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Measurement Unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="heads">heads</MenuItem>
              <MenuItem value="kg">kg</MenuItem>
              <MenuItem value="trays">trays</MenuItem>
              <MenuItem value="pcs">pcs</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Target EC (mS/cm)"
              type="number"
              inputProps={{ step: '0.1' }}
              value={ecTarget}
              onChange={(e) => setEcTarget(e.target.value)}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Target pH"
              type="number"
              inputProps={{ step: '0.1' }}
              value={phTarget}
              onChange={(e) => setPhTarget(e.target.value)}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>

        <TextField
          label="Start / Planting Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Operational Notes"
          multiline
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Substrate preparation, organic inoculant notes..."
          size="small"
          fullWidth
        />

        <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            startIcon={<CheckCircle />}
            sx={{
              bgcolor: '#10B981',
              '&:hover': { bgcolor: '#059669' },
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {submitting ? 'Initializing...' : 'Start Active Batch'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
