import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../services/apiClient.js';
import Head from '../../components/shared/PageHead.jsx';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Grid,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Divider,
  Tab,
  Tabs,
  TablePagination
} from '@mui/material';
import {
  AgricultureOutlined,
  Add,
  SetMeal,
  Egg,
  Park,
  Grass,
  TrendingUp,
  EventNote,
  CheckCircle,
  Spa,
  SavingsOutlined
} from '@mui/icons-material';
import { productionData } from '../../data/homestead/index.js';

export default function ProductionPage() {
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const records = useQuery({ queryKey: ['production-batches'], queryFn: () => ApiClient.get('/universal-batches') });
  const options = useQuery({ queryKey: ['production-options'], queryFn: () => ApiClient.get('/universal-batches/form-options') });
  const zones = options.data?.zones ?? [];
  const items = options.data?.items ?? [];
  const batches = (records.data ?? []).map(b => ({
    id: b.id, code: b.batchCode, crop: b.name, category: b.domain, stage: b.status,
    plantedDate: b.startDate.slice(0, 10), estimatedHarvest: b.expectedEndDate?.slice(0, 10) ?? '—',
    status: b.status, initialQuantity: b.initialQuantity, unit: b.measurementUnit, targetYield: b.notes ?? '—', zone: b.zone.name, farm: b.zone.homesteadId
  }));
  const harvests = (records.data ?? []).flatMap(b => b.outputs.map(h => ({
    id: h.id, date: h.harvestDate, item: h.productName, qty: h.quantity + ' ' + h.measurementUnit,
    quality: h.qualityGrade, zone: b.zone.name
  }))).sort((a, b) => b.date.localeCompare(a.date));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [requestId, setRequestId] = useState(() => crypto.randomUUID());
  const [batchPage, setBatchPage] = useState(0);
  const [batchRowsPerPage, setBatchRowsPerPage] = useState(4);

  // Dialog States for Embedded CRUD
  const [logHarvestOpen, setLogHarvestOpen] = useState(false);
  const [newBatchOpen, setNewBatchOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form states
  const [harvestForm, setHarvestForm] = useState({
    item: '',
    qty: '',
    batchId: '',
    quality: 'Grade A',
  });

  const [batchForm, setBatchForm] = useState({
    crop: '',
    category: 'Crops & Greens',
    zone: '',
    targetYield: '15.0 kg',
    initialQuantity: '1',
    measurementUnit: 'pcs',
    estDate: '',
  });

  async function submit(event, action, onSuccess) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError('');
    try {
      await action();
      onSuccess();
      await records.refetch();
    } catch (cause) { setError(cause.message); }
    finally { setSaving(false); }
  }
  const handleLogHarvestSubmit = event => submit(event, () => {
    const item = items.find(i => i.id === harvestForm.item);
    if (!item) throw new Error('Select an inventory item.');
    return ApiClient.post('/universal-batches/' + harvestForm.batchId + '/outputs', {
      requestId, itemId: item.id, quantity: Number(harvestForm.qty), measurementUnit: item.unit,
      qualityGrade: harvestForm.quality
    });
  }, () => {
    setRequestId(crypto.randomUUID());
    setHarvestForm({ batchId: '', item: '', qty: '', quality: 'Grade A' });
    setLogHarvestOpen(false);
    setToastMsg('Harvest and inventory movement saved.');
  });
  const handleNewBatchSubmit = event => submit(event, () => ApiClient.post('/universal-batches', {
    batchCode: 'BAT-' + crypto.randomUUID(), name: batchForm.crop.trim(), domain: batchForm.category,
    startDate: new Date().toISOString(), zoneId: batchForm.zone,
    measurementUnit: batchForm.measurementUnit.trim(), initialQuantity: Number(batchForm.initialQuantity),
    expectedEndDate: batchForm.estDate ? new Date(batchForm.estDate).toISOString() : undefined,
    notes: batchForm.targetYield
  }), () => {
    setNewBatchOpen(false);
    setToastMsg('Batch saved.');
  });

  const filteredBatches = activeCategoryTab === 'all'
    ? batches
    : batches.filter(b => b.category.toLowerCase().includes(activeCategoryTab.toLowerCase()));

  return (
    <>
      {(records.error || options.error) && <Alert severity="error">{(records.error || options.error).message}</Alert>}
      <Head>
        <title>Terra Interface — Production (What are we producing?)</title>
      </Head>

      {/* HEADER: Answers "What are we producing?" */}
      <Box sx={{ mb: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              03. Food Production • What are we producing?
            </Typography>
            <Chip
              label="168.4 kg MTD (93.5% Goal)"
              size="small"
              sx={{ bgcolor: 'rgba(16, 185, 129, 0.12)', color: '#065F46', fontWeight: 700, fontSize: '0.72rem' }}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F291E', letterSpacing: '-0.02em' }}>
            Homestead Biological Yields & Batches
          </Typography>
          <Typography variant="body1" sx={{ color: '#486253', maxWidth: 700 }}>
            Vincent's Farm yields organic vegetables, microgreens, high-protein tilapia, free-range eggs, and perennial orchard fruit across 5 synchronized production domains.
          </Typography>
        </Box>

        {/* Action Buttons for Embedded CRUD */}
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => setNewBatchOpen(true)}
            startIcon={<Spa />}
            sx={{
              borderRadius: 1.5,
              borderColor: 'rgba(27,67,50,0.2)',
              color: '#1B4332',
              bgcolor: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'none',
              '&:hover': { bgcolor: '#F0F6F1', borderColor: '#1B4332' }
            }}
          >
            Start Batch
          </Button>

          <Button
            variant="contained"
            onClick={() => setLogHarvestOpen(true)}
            startIcon={<Add sx={{ color: '#FFFFFF' }} />}
            sx={{
              borderRadius: 1.5,
              bgcolor: '#144E36',
              color: '#FFFFFF !important',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(20,78,54,0.2)',
              '&:hover': { bgcolor: '#0F291E', color: '#FFFFFF !important' }
            }}
          >
            Log Harvest
          </Button>
        </Box>
      </Box>

      {/* TOP KPI OVERVIEW CARDS */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 1.5, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 2px 8px rgba(27,67,50,0.03)' }}>
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>Monthly Harvest Volume</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', my: 0.5 }}>168.4 kg</Typography>
            <LinearProgress variant="determinate" value={93.5} sx={{ height: 6, borderRadius: 1.5, bgcolor: 'rgba(27,67,50,0.08)', mb: 1, '& .MuiLinearProgress-bar': { bgcolor: '#10B981', borderRadius: 1.5 } }} />
            <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>Goal: 180.0 kg (93.5% achieved)</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 1.5, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 2px 8px rgba(27,67,50,0.03)' }}>
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>Active Production Batches</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', my: 0.5 }}>{batches.length} Batches</Typography>
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700, display: 'block', mb: 0.5 }}>Across 5 Food Categories</Typography>
            <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>All within biological safety limits</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 1.5, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 2px 8px rgba(27,67,50,0.03)' }}>
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>Food Dollar Value Produced</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', my: 0.5 }}>Rp 7.850.000</Typography>
            <Typography variant="caption" sx={{ color: '#D97706', fontWeight: 700, display: 'block', mb: 0.5 }}>Clean Organic Quality</Typography>
            <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>Equivalent to 42 kg premium fish & organic veg</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 1.5, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 2px 8px rgba(27,67,50,0.03)' }}>
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>Zero Chemical Rating</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#059669', my: 0.5 }}>100%</Typography>
            <Typography variant="caption" sx={{ color: '#059669', fontWeight: 700, display: 'block', mb: 0.5 }}>Beyond Organic Standard</Typography>
            <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>Living soil & aquaponic bio-minerals</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 5 FOOD PRODUCTION CATEGORIES */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332', mb: 2 }}>
          Food Production Domains
        </Typography>

        <Grid container spacing={2.5}>
          {productionData.categories.map((cat) => (
            <Grid item xs={12} sm={6} md={2.4} key={cat.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 1.5,
                  bgcolor: '#FFFFFF',
                  border: `1.5px solid ${cat.color}35`,
                  boxShadow: '0 2px 8px rgba(27,67,50,0.03)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 16px rgba(27,67,50,0.08)' }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ width: 34, height: 34, borderRadius: 1.5, bgcolor: `${cat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spa sx={{ color: cat.color, fontSize: 18 }} />
                  </Box>
                  <Chip label={cat.trend} size="small" sx={{ bgcolor: 'rgba(16,185,129,0.12)', color: '#065F46', fontWeight: 800, fontSize: '0.68rem', height: 20, borderRadius: 1 }} />
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332', lineHeight: 1.2, mb: 0.5 }}>
                  {cat.name}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: cat.color, mb: 1 }}>
                  {cat.currentMonthKg} kg
                </Typography>

                <Box sx={{ mt: 'auto', pt: 1, borderTop: '1px solid rgba(27,67,50,0.06)' }}>
                  <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', fontSize: '0.72rem', fontWeight: 600 }}>
                    Area: {cat.activeArea}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', fontSize: '0.7rem' }}>
                    Cycle: ~{cat.harvestCycleDays} days
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ACTIVE BATCHES & HARVEST RECORDS GRID */}
      <Grid container spacing={3}>
        {/* Left: Active Batch Tracker */}
        <Grid item xs={12} lg={7}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 1.5,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.1)',
              boxShadow: '0 2px 8px rgba(27,67,50,0.03)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Active Production Batches
                </Typography>
                <Typography variant="body2" sx={{ color: '#5A7565' }}>
                  Growth stages, harvest timeline, and target biomass
                </Typography>
              </Box>

              {/* Filter Tabs */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['all', 'Crops', 'Aqua', 'Microgreens'].map((tab) => (
                  <Chip
                    key={tab}
                    label={tab.toUpperCase()}
                    clickable
                    size="small"
                    onClick={() => {
                      setActiveCategoryTab(tab === 'all' ? 'all' : tab);
                      setBatchPage(0);
                    }}
                    sx={{
                      fontWeight: 700,
                      borderRadius: 1.5,
                      bgcolor: activeCategoryTab.toLowerCase() === tab.toLowerCase() ? '#144E36' : '#F0F5F1',
                      color: activeCategoryTab.toLowerCase() === tab.toLowerCase() ? '#FFFFFF' : '#486253',
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredBatches
                .slice(batchPage * batchRowsPerPage, batchPage * batchRowsPerPage + batchRowsPerPage)
                .map((batch) => (
                <Box
                  key={batch.id}
                  sx={{
                    p: 2.2,
                    borderRadius: 1.5,
                    bgcolor: '#FAF9F5',
                    border: '1px solid rgba(27,67,50,0.06)',
                    transition: 'all 0.2s ease',
                    '&:hover': { bgcolor: '#F4F9F4', borderColor: '#10B981' }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Chip label={batch.code} size="small" sx={{ bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332', fontWeight: 800, fontSize: '0.7rem', borderRadius: 1 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                        {batch.crop}
                      </Typography>
                    </Box>
                    <Chip label={batch.status} size="small" sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 700, fontSize: '0.7rem', borderRadius: 1 }} />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#5A7565' }}>
                      Stage: {batch.stage} • Placed: {batch.plantedDate}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>
                      Initial quantity: {batch.initialQuantity} {batch.unit} · Target: {batch.targetYield}
                    </Typography>
                  </Box>



                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>
                      Location: {batch.zone}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>
                      Harvest ETA: {batch.estimatedHarvest}
                    </Typography>
                  </Box>
                </Box>
              ))}
              {filteredBatches.length === 0 && (
                <Box sx={{ py: 3, textAlign: 'center', color: '#748B7D' }}>
                  No active batches found in this category.
                </Box>
              )}
            </Box>

            <TablePagination
              component="div"
              count={filteredBatches.length}
              page={batchPage}
              onPageChange={(e, newPage) => setBatchPage(newPage)}
              rowsPerPage={batchRowsPerPage}
              onRowsPerPageChange={(e) => {
                setBatchRowsPerPage(parseInt(e.target.value, 10));
                setBatchPage(0);
              }}
              rowsPerPageOptions={[4, 8, 12]}
            />
          </Paper>
        </Grid>

        {/* Right: Recent Harvest Records */}
        <Grid item xs={12} lg={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 1.5,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.1)',
              boxShadow: '0 2px 8px rgba(27,67,50,0.03)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Recent Harvest Records
                </Typography>
                <Typography variant="body2" sx={{ color: '#5A7565' }}>
                  Logged yields gathered by farm stewards
                </Typography>
              </Box>
              <Chip label="Audited" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.15)', color: '#065F46', fontWeight: 700, borderRadius: 1.5 }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {harvests.map((h) => (
                <Box
                  key={h.id}
                  sx={{
                    p: 1.8,
                    borderRadius: 1.5,
                    bgcolor: '#FAF9F5',
                    border: '1px solid rgba(27,67,50,0.06)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                      {h.item}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#10B981' }}>
                      {h.qty}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#748B7D' }}>
                      {h.date} • {h.zone}
                    </Typography>
                    <Chip label={h.quality} size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'rgba(16,185,129,0.12)', color: '#065F46', borderRadius: 1 }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* MODAL 1: LOG HARVEST (Embedded CRUD) */}
      <Dialog
        open={logHarvestOpen}
        onClose={() => setLogHarvestOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 1.5, p: 1.5, bgcolor: '#FFFFFF' } }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Record New Homestead Harvest
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            Enter biological yield harvested from Vincent's Farm.
          </Typography>
        </DialogTitle>
        <form onSubmit={handleLogHarvestSubmit}>
          <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  required
                  select label="Inventory item"
                  value={harvestForm.item}
                  onChange={e => setHarvestForm({ ...harvestForm, item: e.target.value })}
                >
                  {items.filter(i => i.homesteadId === batches.find(b => b.id === harvestForm.batchId)?.farm).map(i =>
                    <MenuItem key={i.id} value={i.id}>{i.name} ({i.sku}, {i.unit})</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="Quantity"
                  type="number" inputProps={{ min: 0.000001, step: "any" }}
                  value={harvestForm.qty}
                  onChange={(e) => setHarvestForm({ ...harvestForm, qty: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 1.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  select
                  required label="Harvest batch"
                  value={harvestForm.batchId}
                  onChange={e => setHarvestForm({ ...harvestForm, batchId: e.target.value, item: '' })}
                >
                  {batches.map(b => <MenuItem key={b.id} value={b.id}>{b.crop} ({b.code})</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  select
                  label="Quality Grade"
                  value={harvestForm.quality}
                  onChange={(e) => setHarvestForm({ ...harvestForm, quality: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 1.5 } }}
                >
                  <MenuItem value="Grade A">Grade A (Prime)</MenuItem>
                  <MenuItem value="Premium">Premium Heirloom</MenuItem>
                  <MenuItem value="Secondary">Secondary / Processing</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setLogHarvestOpen(false)} sx={{ color: '#5A7565', textTransform: 'none', fontWeight: 600 }}>
              Cancel
            </Button>
            <Button
              type="submit" disabled={saving}
              variant="contained"
              sx={{ bgcolor: '#144E36', color: '#FFFFFF !important', borderRadius: 1.5, px: 3, textTransform: 'none', fontWeight: 700, boxShadow: '0 2px 8px rgba(20,78,54,0.2)', '&:hover': { bgcolor: '#0F291E', color: '#FFFFFF !important' } }}
            >
              Save Harvest Record
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* MODAL 2: START NEW BATCH (Embedded CRUD) */}
      <Dialog
        open={newBatchOpen}
        onClose={() => setNewBatchOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 1.5, p: 1.5, bgcolor: '#FFFFFF' } }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Start New Production Batch
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            Register new planting or fish stocking cycle.
          </Typography>
        </DialogTitle>
        <form onSubmit={handleNewBatchSubmit}>
          <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Batch Variety Name"
                  placeholder="e.g. Giant Gourami Fingerlings, Romanesco Broccoli"
                  value={batchForm.crop}
                  onChange={(e) => setBatchForm({ ...batchForm, crop: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 1.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Category Domain"
                  value={batchForm.category}
                  onChange={(e) => setBatchForm({ ...batchForm, category: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 1.5 } }}
                >
                  <MenuItem value="Crops & Greens">Crops & Greens</MenuItem>
                  <MenuItem value="Aquaculture">Aquaculture</MenuItem>
                  <MenuItem value="Poultry & Eggs">Poultry & Eggs</MenuItem>
                  <MenuItem value="Microgreens & Fungi">Microgreens & Fungi</MenuItem>
                  <MenuItem value="Fruit Agroforestry">Fruit Agroforestry</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth required type="number" label="Initial Quantity"
                  inputProps={{ min: 0, step: 'any' }}
                  value={batchForm.initialQuantity}
                  onChange={e => setBatchForm({ ...batchForm, initialQuantity: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth required label="Measurement Unit"
                  value={batchForm.measurementUnit}
                  onChange={e => setBatchForm({ ...batchForm, measurementUnit: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Target Yield (kg)"
                  value={batchForm.targetYield}
                  onChange={(e) => setBatchForm({ ...batchForm, targetYield: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 1.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Assigned Zone"
                  required value={batchForm.zone}
                  onChange={(e) => setBatchForm({ ...batchForm, zone: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 1.5 } }}
                >
                  {zones.map(z => <MenuItem key={z.id} value={z.id}>{z.name}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Target Harvest Date"
                  InputLabelProps={{ shrink: true }}
                  value={batchForm.estDate}
                  onChange={(e) => setBatchForm({ ...batchForm, estDate: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 1.5 } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setNewBatchOpen(false)} sx={{ color: '#5A7565', textTransform: 'none', fontWeight: 600 }}>
              Cancel
            </Button>
            <Button
              type="submit" disabled={saving}
              variant="contained"
              sx={{ bgcolor: '#144E36', color: '#FFFFFF !important', borderRadius: 1.5, px: 3, textTransform: 'none', fontWeight: 700, boxShadow: '0 2px 8px rgba(20,78,54,0.2)', '&:hover': { bgcolor: '#0F291E', color: '#FFFFFF !important' } }}
            >
              Create Batch
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={Boolean(toastMsg)}
        autoHideDuration={4000}
        onClose={() => setToastMsg('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastMsg('')} severity="success" sx={{ borderRadius: 1.5, bgcolor: '#144E36', color: '#FFFFFF', fontWeight: 600 }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
