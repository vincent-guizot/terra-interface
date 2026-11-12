import React, { useState } from 'react';
import Head from 'next/head';
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
  Tabs
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
import { productionData } from '../data/homesteadData';

export default function ProductionPage() {
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [batches, setBatches] = useState(productionData.activeBatches);
  const [harvests, setHarvests] = useState(productionData.recentHarvests);

  // Dialog States for Embedded CRUD
  const [logHarvestOpen, setLogHarvestOpen] = useState(false);
  const [newBatchOpen, setNewBatchOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form states
  const [harvestForm, setHarvestForm] = useState({
    item: '',
    qty: '',
    zone: 'Zone 1: Micro-Greenhouse',
    quality: 'Grade A',
  });

  const [batchForm, setBatchForm] = useState({
    crop: '',
    category: 'Crops & Greens',
    zone: 'Zone 4: Permaculture Beds',
    targetYield: '15.0 kg',
    estDate: '2026-12-10',
  });

  const handleLogHarvestSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `h-${Date.now()}`,
      date: 'Just now',
      item: harvestForm.item,
      qty: harvestForm.qty,
      zone: harvestForm.zone.split(':')[0],
      steward: 'Vincent',
      quality: harvestForm.quality,
    };
    setHarvests([newEntry, ...harvests]);
    setLogHarvestOpen(false);
    setToastMsg(`Logged harvest: ${harvestForm.qty} of ${harvestForm.item}!`);
    setHarvestForm({ item: '', qty: '', zone: 'Zone 1: Micro-Greenhouse', quality: 'Grade A' });
  };

  const handleNewBatchSubmit = (e) => {
    e.preventDefault();
    const newBatch = {
      id: `batch-${Date.now()}`,
      code: `B-${Math.floor(10 + Math.random() * 89)}-NEW`,
      crop: batchForm.crop,
      category: batchForm.category,
      stage: 'Seedling / Nursery',
      progress: 10,
      plantedDate: 'Today',
      estimatedHarvest: batchForm.estDate,
      targetYield: batchForm.targetYield,
      zone: batchForm.zone,
      status: 'Sprouting',
    };
    setBatches([newBatch, ...batches]);
    setNewBatchOpen(false);
    setToastMsg(`Started new batch: ${batchForm.crop} in ${batchForm.zone}!`);
    setBatchForm({ crop: '', category: 'Crops & Greens', zone: 'Zone 4: Permaculture Beds', targetYield: '15.0 kg', estDate: '2026-12-10' });
  };

  const filteredBatches = activeCategoryTab === 'all'
    ? batches
    : batches.filter(b => b.category.toLowerCase().includes(activeCategoryTab.toLowerCase()));

  return (
    <>
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
              borderRadius: 3,
              borderColor: 'rgba(27,67,50,0.2)',
              color: '#1B4332',
              bgcolor: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              '&:hover': { bgcolor: '#F0F6F1', borderColor: '#1B4332' }
            }}
          >
            Start Batch
          </Button>

          <Button
            variant="contained"
            onClick={() => setLogHarvestOpen(true)}
            startIcon={<Add />}
            sx={{
              borderRadius: 3,
              bgcolor: '#1B4332',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              boxShadow: '0 4px 14px rgba(27,67,50,0.18)',
              '&:hover': { bgcolor: '#123124' }
            }}
          >
            Log Harvest
          </Button>
        </Box>
      </Box>

      {/* TOP KPI OVERVIEW CARDS */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)' }}>
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>Monthly Harvest Volume</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', my: 0.5 }}>168.4 kg</Typography>
            <LinearProgress variant="determinate" value={93.5} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(27,67,50,0.08)', mb: 1, '& .MuiLinearProgress-bar': { bgcolor: '#10B981' } }} />
            <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>Goal: 180.0 kg (93.5% achieved)</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)' }}>
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>Active Production Batches</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', my: 0.5 }}>{batches.length} Batches</Typography>
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700, display: 'block', mb: 0.5 }}>Across 5 Food Categories</Typography>
            <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>All within biological safety limits</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)' }}>
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>Food Dollar Value Produced</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', my: 0.5 }}>Rp 7.850.000</Typography>
            <Typography variant="caption" sx={{ color: '#D97706', fontWeight: 700, display: 'block', mb: 0.5 }}>Clean Organic Quality</Typography>
            <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 600 }}>Equivalent to 42 kg premium fish & organic veg</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)' }}>
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
                  borderRadius: 3.5,
                  bgcolor: '#FFFFFF',
                  border: `1.5px solid ${cat.color}35`,
                  boxShadow: '0 8px 24px -6px rgba(27,67,50,0.04)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 14px 30px -8px rgba(27,67,50,0.1)' }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: `${cat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spa sx={{ color: cat.color, fontSize: 18 }} />
                  </Box>
                  <Chip label={cat.trend} size="small" sx={{ bgcolor: 'rgba(16,185,129,0.12)', color: '#065F46', fontWeight: 800, fontSize: '0.68rem', height: 20 }} />
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
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
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
                    onClick={() => setActiveCategoryTab(tab === 'all' ? 'all' : tab)}
                    sx={{
                      fontWeight: 700,
                      bgcolor: activeCategoryTab.toLowerCase() === tab.toLowerCase() ? '#1B4332' : '#F0F5F1',
                      color: activeCategoryTab.toLowerCase() === tab.toLowerCase() ? '#FFFFFF' : '#486253',
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredBatches.map((batch) => (
                <Box
                  key={batch.id}
                  sx={{
                    p: 2.2,
                    borderRadius: 3,
                    bgcolor: '#FAF9F5',
                    border: '1px solid rgba(27,67,50,0.06)',
                    transition: 'all 0.2s ease',
                    '&:hover': { bgcolor: '#F4F9F4', borderColor: '#10B981' }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Chip label={batch.code} size="small" sx={{ bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332', fontWeight: 800, fontSize: '0.7rem' }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                        {batch.crop}
                      </Typography>
                    </Box>
                    <Chip label={batch.status} size="small" sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 700, fontSize: '0.7rem' }} />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#5A7565' }}>
                      Stage: {batch.stage} • Placed: {batch.plantedDate}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>
                      Target: {batch.targetYield}
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={batch.progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'rgba(27,67,50,0.08)',
                      mb: 1,
                      '& .MuiLinearProgress-bar': { bgcolor: batch.progress > 85 ? '#10B981' : '#65A30D' }
                    }}
                  />

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
            </Box>
          </Paper>
        </Grid>

        {/* Right: Recent Harvest Records */}
        <Grid item xs={12} lg={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
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
              <Chip label="Audited" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.15)', color: '#065F46', fontWeight: 700 }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {harvests.map((h) => (
                <Box
                  key={h.id}
                  sx={{
                    p: 1.8,
                    borderRadius: 2.5,
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
                    <Chip label={h.quality} size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'rgba(16,185,129,0.12)', color: '#065F46' }} />
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
        PaperProps={{ sx: { borderRadius: 4, p: 1.5, bgcolor: '#FFFFFF' } }}
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  required
                  label="Crop or Product"
                  placeholder="e.g. Nile Tilapia, Tuscan Kale"
                  value={harvestForm.item}
                  onChange={(e) => setHarvestForm({ ...harvestForm, item: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="Quantity"
                  placeholder="e.g. 5.2 kg / 24 pcs"
                  value={harvestForm.qty}
                  onChange={(e) => setHarvestForm({ ...harvestForm, qty: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  select
                  label="Origin Zone"
                  value={harvestForm.zone}
                  onChange={(e) => setHarvestForm({ ...harvestForm, zone: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  <MenuItem value="Zone 1: Micro-Greenhouse">Zone 1: Micro-Greenhouse</MenuItem>
                  <MenuItem value="Zone 2: Aquaponics">Zone 2: Aquaponics Pond</MenuItem>
                  <MenuItem value="Zone 3: Poultry Hub">Zone 3: Poultry & BSF</MenuItem>
                  <MenuItem value="Zone 4: Permaculture Beds">Zone 4: Permaculture Beds</MenuItem>
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
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
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
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#1B4332', color: '#FFFFFF', borderRadius: 2.5, px: 3, textTransform: 'none', fontWeight: 700 }}
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
        PaperProps={{ sx: { borderRadius: 4, p: 1.5, bgcolor: '#FFFFFF' } }}
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
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
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
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
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
                  fullWidth
                  label="Target Yield (kg)"
                  value={batchForm.targetYield}
                  onChange={(e) => setBatchForm({ ...batchForm, targetYield: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Assigned Zone"
                  value={batchForm.zone}
                  onChange={(e) => setBatchForm({ ...batchForm, zone: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  <MenuItem value="Zone 1: Micro-Greenhouse">Zone 1: Micro-Greenhouse</MenuItem>
                  <MenuItem value="Zone 2: Aquaponics">Zone 2: Aquaponics</MenuItem>
                  <MenuItem value="Zone 3: Poultry Hub">Zone 3: Poultry Hub</MenuItem>
                  <MenuItem value="Zone 4: Permaculture Beds">Zone 4: Permaculture Beds</MenuItem>
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
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setNewBatchOpen(false)} sx={{ color: '#5A7565', textTransform: 'none', fontWeight: 600 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#1B4332', color: '#FFFFFF', borderRadius: 2.5, px: 3, textTransform: 'none', fontWeight: 700 }}
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
        <Alert onClose={() => setToastMsg('')} severity="success" sx={{ borderRadius: 3, bgcolor: '#1B4332', color: '#FFFFFF', fontWeight: 600 }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
