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
import { Close, Inventory2Outlined, CheckCircle } from '@mui/icons-material';
import { InventoryService } from '../../../services/inventoryService';

const MOVEMENT_TYPES = [
  { value: 'PURCHASE_IN', label: 'PURCHASE_IN (Supplier / External Intake)', isInflow: true },
  { value: 'HARVEST_IN', label: 'HARVEST_IN (Fresh Batch Output)', isInflow: true },
  { value: 'FEEDING_OUT', label: 'FEEDING_OUT (Livestock / Fish Feeding Ration)', isInflow: false },
  { value: 'BATCH_CONSUME_OUT', label: 'BATCH_CONSUME_OUT (Seeds / Trays Sown)', isInflow: false },
  { value: 'MORTALITY_LOSS_OUT', label: 'MORTALITY_LOSS_OUT (Health Loss)', isInflow: false },
  { value: 'WASTE_OUT', label: 'WASTE_OUT (Damaged / Discarded Material)', isInflow: false },
  { value: 'INTERNAL_TRANSFER', label: 'INTERNAL_TRANSFER (Relocate Storage)', isInflow: null },
  { value: 'CYCLE_COUNT_ADJUSTMENT', label: 'CYCLE_COUNT_ADJUSTMENT (Audit Reconciliation)', isInflow: null },
];

export default function RecordStockMovementDrawer({ open, onClose, item, items = [], onMovementLogged }) {
  const [selectedSku, setSelectedSku] = useState('SKU-FEE-01');
  const [movementType, setMovementType] = useState('FEEDING_OUT');
  const [quantity, setQuantity] = useState(2.5);
  const [unit, setUnit] = useState('kg');
  const [referenceBatchCode, setReferenceBatchCode] = useState('');
  const [stewardName, setStewardName] = useState('Vincent');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const activeItem = items.find((i) => i.sku === selectedSku || i.code === selectedSku) || item;

  useEffect(() => {
    if (item) {
      setSelectedSku(item.sku || item.code || 'SKU-FEE-01');
      if (item.unit) setUnit(item.unit);
    }
  }, [item]);

  useEffect(() => {
    if (activeItem && activeItem.unit) {
      setUnit(activeItem.unit);
    }
  }, [activeItem]);

  const selectedTypeObj = MOVEMENT_TYPES.find((m) => m.value === movementType);
  const isOutflow = selectedTypeObj?.isInflow === false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(quantity) <= 0) {
      setError('Movement quantity must be greater than zero.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const signedDelta = isOutflow ? -Math.abs(Number(quantity)) : Number(quantity);

      const payload = {
        itemId: activeItem?.id,
        sku: selectedSku,
        type: movementType,
        quantityDelta: signedDelta,
        unit,
        referenceBatchCode: referenceBatchCode || undefined,
        stewardName,
        notes: notes || undefined,
      };

      const result = await InventoryService.recordMovement(payload);

      if (onMovementLogged) {
        await onMovementLogged(activeItem?.id || selectedSku, {
          ...payload,
          result,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record stock movement');
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
              bgcolor: 'rgba(27,67,50,0.1)',
              color: '#1B4332',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Inventory2Outlined />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Record Stock Movement
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565' }}>
              Immutable transaction ledger modification
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
              label="Inventory Item / SKU"
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            >
              {items.map((i) => (
                <MenuItem key={i.id || i.sku || i.code} value={i.sku || i.code}>
                  {i.sku || i.code} — {i.name} ({i.inStock} {i.unit})
                </MenuItem>
              ))}
              {items.length === 0 && activeItem && (
                <MenuItem value={activeItem.sku || activeItem.code}>
                  {activeItem.sku || activeItem.code} — {activeItem.name}
                </MenuItem>
              )}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              size="small"
              label="Movement Classification"
              value={movementType}
              onChange={(e) => setMovementType(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            >
              {MOVEMENT_TYPES.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              inputProps={{ min: 0.01, step: 0.1 }}
              required
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          {/* Current Stock Preview & Impact */}
          {activeItem && (
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ color: '#5A7565' }}>
                    Current Available Stock:
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    {activeItem.inStock} {activeItem.unit}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#5A7565' }}>
                    Balance After Movement:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 800,
                      color: isOutflow
                        ? activeItem.inStock - Number(quantity) < activeItem.minThreshold
                          ? '#EF4444'
                          : '#D97706'
                        : '#10B981',
                    }}
                  >
                    {isOutflow
                      ? `${Math.round((activeItem.inStock - Number(quantity)) * 100) / 100} ${activeItem.unit}`
                      : `${Math.round((activeItem.inStock + Number(quantity)) * 100) / 100} ${activeItem.unit}`}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Batch Ref (Optional)"
              value={referenceBatchCode}
              onChange={(e) => setReferenceBatchCode(e.target.value)}
              placeholder="e.g. BAT-2026-LIV-01"
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Steward Signature"
              value={stewardName}
              onChange={(e) => setStewardName(e.target.value)}
              required
              sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Notes / Reason for Movement"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Daily feed ration dispensed to poultry coop."
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
              {submitting ? 'Writing to Ledger...' : 'Commit Immutable Movement'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Drawer>
  );
}
