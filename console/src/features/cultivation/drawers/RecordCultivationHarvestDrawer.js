import React, { useState } from 'react';
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
import { Close, Grass, CheckCircle } from '@mui/icons-material';

export default function RecordCultivationHarvestDrawer({ open, onClose, batch, onHarvestLogged }) {
  const [quantity, setQuantity] = useState(12.5);
  const [unit, setUnit] = useState('kg');
  const [qualityGrade, setQualityGrade] = useState('Grade A');
  const [destination, setDestination] = useState('Homestead Pantry');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!batch) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantity <= 0) {
      setError('Harvest quantity must be greater than zero.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        productName: batch.plantName || batch.name,
        quantity: Number(quantity),
        measurementUnit: unit,
        qualityGrade,
        destination,
        notes: notes || undefined,
      };

      if (onHarvestLogged) {
        await onHarvestLogged(batch.id, payload);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record harvest output');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 460 }, p: 3, bgcolor: '#FAF9F5' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', p: 1, borderRadius: 2, display: 'flex' }}>
            <Grass sx={{ color: '#10B981' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1B4332' }}>
              Log Harvest Output
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              {batch.code || batch.batchCode} • {batch.name}
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
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField
              label="Harvested Weight / Count"
              type="number"
              inputProps={{ step: '0.1' }}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              select
              label="Unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="kg">kg</MenuItem>
              <MenuItem value="g">g</MenuItem>
              <MenuItem value="heads">heads</MenuItem>
              <MenuItem value="trays">trays</MenuItem>
              <MenuItem value="pcs">pcs</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <TextField
          select
          label="Quality Grade"
          value={qualityGrade}
          onChange={(e) => setQualityGrade(e.target.value)}
          size="small"
          fullWidth
        >
          <MenuItem value="Grade A">Grade A (Prime Fresh)</MenuItem>
          <MenuItem value="Grade B">Grade B (Processing / Preserving)</MenuItem>
          <MenuItem value="Biomass">Biomass (BSF Feed / Compost)</MenuItem>
        </TextField>

        <TextField
          select
          label="Destination / Storage Location"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          size="small"
          fullWidth
        >
          <MenuItem value="Homestead Pantry">Homestead Pantry (Direct Consumption)</MenuItem>
          <MenuItem value="Cold Cellar">Cold Cellar (Climate Preserved)</MenuItem>
          <MenuItem value="Deep Freezer">Deep Freezer (-18°C)</MenuItem>
          <MenuItem value="Zone 3 Poultry Hub">Zone 3 Poultry Hub (Supplementary Feed)</MenuItem>
          <MenuItem value="Zone 4 Compost Bay">Zone 4 Compost Bay (Aerobic Recycling)</MenuItem>
        </TextField>

        <TextField
          label="Harvest Notes"
          multiline
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Crop crispness, Brix reading, or cut channel number..."
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
            {submitting ? 'Recording...' : 'Commit Harvest Record'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
