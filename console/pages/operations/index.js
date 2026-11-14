import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Grass,
  Pets,
  SetMeal,
  Loop,
  Inventory2Outlined,
  Bolt,
  SettingsSuggest,
  Search,
  Add,
  FilterList,
  Close,
  Spa,
  Egg,
  Opacity,
  RestaurantMenu,
} from '@mui/icons-material';
import {
  initialProductionConfig,
  initialCultivationData,
  initialLivestockData,
  initialAquacultureData,
  initialCircularData,
  initialInventoryData,
  initialEnergyWaterData
} from '../../data/operationsData';
import { AddCultivationBatchDrawer, RecordCultivationHarvestDrawer } from '../../features/cultivation';
import { RecordEggHarvestDrawer, LogLivestockFeedDrawer } from '../../features/livestock';
import { RecordWaterTestDrawer, LogFishFeedingDrawer } from '../../features/aquaculture';
import { RecordBsfFeedDrawer, RecordMaggotHarvestDrawer, RecordCompostTurnDrawer } from '../../features/circular';
import { RecordStockMovementDrawer, InventoryLedgerHistoryDrawer } from '../../features/inventory';
import { ConfigureDispatchPolicyDrawer, ManualTelemetryIngestDrawer } from '../../features/microgrid';
import {
  CultivationTab,
  LivestockTab,
  AquacultureTab,
  CircularTab,
  InventoryTab,
  EnergyWaterTab,
  ConfigTab
} from '../../components/operations';

export default function OperationsHub() {
  const [activeModule, setActiveModule] = useState('cultivation'); // cultivation | livestock | aquaculture | circular | inventory | energy-water | config
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Data States
  const [config, setConfig] = useState(initialProductionConfig);
  const [cultivation, setCultivation] = useState(initialCultivationData);
  const [livestock, setLivestock] = useState(initialLivestockData);
  const [aquaculture, setAquaculture] = useState(initialAquacultureData);
  const [circular, setCircular] = useState(initialCircularData);
  const [inventory, setInventory] = useState(initialInventoryData);
  const [energyWater, setEnergyWater] = useState(initialEnergyWaterData);

  // Drawer & Dialog States for Contextual CRUD
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [cultivationDrawerOpen, setCultivationDrawerOpen] = useState(false);
  const [harvestDrawerOpen, setHarvestDrawerOpen] = useState(false);
  const [harvestBatch, setHarvestBatch] = useState(null);

  // Livestock & Aquaculture Drawer States
  const [eggHarvestDrawerOpen, setEggHarvestDrawerOpen] = useState(false);
  const [livestockFeedDrawerOpen, setLivestockFeedDrawerOpen] = useState(false);
  const [activeLivestockBatch, setActiveLivestockBatch] = useState(null);
  const [waterTestDrawerOpen, setWaterTestDrawerOpen] = useState(false);
  const [fishFeedDrawerOpen, setFishFeedDrawerOpen] = useState(false);
  const [activeAquaPond, setActiveAquaPond] = useState(null);

  // Circular & Inventory Drawer States
  const [bsfFeedDrawerOpen, setBsfFeedDrawerOpen] = useState(false);
  const [maggotHarvestDrawerOpen, setMaggotHarvestDrawerOpen] = useState(false);
  const [activeBsfBatch, setActiveBsfBatch] = useState(null);
  const [compostTurnDrawerOpen, setCompostTurnDrawerOpen] = useState(false);
  const [activeCompostBatch, setActiveCompostBatch] = useState(null);
  const [stockMovementDrawerOpen, setStockMovementDrawerOpen] = useState(false);
  const [ledgerHistoryDrawerOpen, setLedgerHistoryDrawerOpen] = useState(false);
  const [activeInventoryItem, setActiveInventoryItem] = useState(null);

  // Microgrid Feature Drawer States
  const [dispatchDrawerOpen, setDispatchDrawerOpen] = useState(false);
  const [manualIngestDrawerOpen, setManualIngestDrawerOpen] = useState(false);

  // Handlers
  const handleCultivationBatchCreated = (newBatch) => {
    setCultivation((prev) => ({
      ...prev,
      batches: [
        {
          id: `bat-cult-${Date.now()}`,
          code: newBatch.batchCode,
          name: newBatch.name,
          plantName: newBatch.name,
          status: 'Active',
          zone: newBatch.zoneId || 'Zone 1: Micro-Greenhouse',
          startDate: newBatch.startDate ? newBatch.startDate.split('T')[0] : '2026-11-12',
          initialQuantity: newBatch.initialQuantity,
          unit: newBatch.measurementUnit,
          harvests: [],
          healthScore: 98,
          notes: newBatch.notes || '',
          history: [{ date: 'Just now', action: 'Universal Batch Created', user: 'Vincent' }],
        },
        ...prev.batches,
      ],
    }));
    setToastMsg(`Cultivation batch ${newBatch.batchCode} started successfully.`);
  };

  const handleHarvestLogged = (batchId, harvestData) => {
    setCultivation((prev) => ({
      ...prev,
      batches: prev.batches.map((b) => {
        if (b.id !== batchId && b.code !== batchId) return b;
        return {
          ...b,
          harvests: [
            {
              id: `h-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              quantity: harvestData.quantity,
              unit: harvestData.measurementUnit,
              grade: harvestData.qualityGrade,
              steward: 'Vincent',
            },
            ...(b.harvests || []),
          ],
          history: [
            { date: 'Just now', action: `Harvest Logged: ${harvestData.quantity} ${harvestData.measurementUnit}`, user: 'Vincent' },
            ...(b.history || []),
          ],
        };
      }),
    }));
    setToastMsg(`Harvest of ${harvestData.quantity} ${harvestData.measurementUnit} committed to pantry.`);
  };

  const handleEggHarvestLogged = (batchId, harvestData) => {
    setLivestock((prev) => ({
      ...prev,
      batches: prev.batches.map((b) => {
        if (b.id !== batchId && b.code !== batchId) return b;
        return {
          ...b,
          history: [
            {
              date: 'Just now',
              action: `Egg Harvest: ${harvestData.eggsCollected} eggs (${harvestData.henDayProductionPercent}% HDP)`,
              user: 'Vincent',
            },
            ...(b.history || []),
          ],
        };
      }),
    }));
    setToastMsg(`Logged ${harvestData.eggsCollected} pastured eggs (${harvestData.henDayProductionPercent}% HDP) committed to pantry.`);
  };

  const handleLivestockFeedLogged = (batchId, feedData) => {
    setLivestock((prev) => ({
      ...prev,
      batches: prev.batches.map((b) => {
        if (b.id !== batchId && b.code !== batchId) return b;
        return {
          ...b,
          history: [
            {
              date: 'Just now',
              action: `Feed Ration: ${feedData.quantityKg} kg ${feedData.feedType} (${feedData.circularPortionPercent}% circular)`,
              user: 'Vincent',
            },
            ...(b.history || []),
          ],
        };
      }),
    }));
    setToastMsg(`Recorded ${feedData.quantityKg} kg feed ration for flock.`);
  };

  const handleWaterTestLogged = (pondId, testData) => {
    setAquaculture((prev) => ({
      ...prev,
      ponds: (prev.ponds || []).map((p) => {
        if (p.id !== pondId && p.pondCode !== pondId) return p;
        return {
          ...p,
          waterQuality: {
            ...p.waterQuality,
            dissolvedOxygenMgL: testData.dissolvedOxygenMgL,
            pH: testData.pH,
            waterTempC: testData.waterTempC,
            ammoniaPpm: testData.ammoniaPpm,
          },
        };
      }),
    }));
    setToastMsg(`Water test recorded for ${pondId}. Status: ${testData.result?.evaluation?.status || 'OPTIMAL'}`);
  };

  const handleFishFeedLogged = (pondId, feedData) => {
    setToastMsg(`Fish feeding recorded for ${pondId}: ${feedData.amountGrams}g of ${feedData.feedType}`);
  };

  const handleBsfFeedLogged = (batchId, payload) => {
    setCircular((prev) => ({
      ...prev,
      bsfBatches: prev.bsfBatches.map((b) =>
        b.id === batchId || b.code === payload.batchCode
          ? {
              ...b,
              initialQuantity: Math.round((Number(b.initialQuantity) + Number(payload.feedWeightKg)) * 10) / 10,
              organicScrapType: payload.organicScrapType,
            }
          : b
      ),
    }));
    setToastMsg(`Fed ${payload.feedWeightKg} kg scraps into BSF unit (${payload.trayId}).`);
  };

  const handleMaggotHarvestLogged = (batchId, payload) => {
    setCircular((prev) => ({
      ...prev,
      bsfBatches: prev.bsfBatches.map((b) =>
        b.id === batchId || b.code === payload.batchCode
          ? {
              ...b,
              larvaeYieldKg: Math.round((Number(b.larvaeYieldKg || 0) + Number(payload.freshPrepupaeYieldKg)) * 10) / 10,
            }
          : b
      ),
    }));
    setToastMsg(`Harvested ${payload.freshPrepupaeYieldKg} kg live maggots (${payload.crudeProteinPercent}% CP).`);
  };

  const handleCompostTurnLogged = (batchId, payload) => {
    setCircular((prev) => ({
      ...prev,
      compostBatches: prev.compostBatches.map((b) =>
        b.id === batchId || b.code === payload.pileId
          ? {
              ...b,
              temperatureC: payload.coreTemperatureC,
              moisturePercent: payload.moisturePercent || b.moisturePercent,
              maturityIndex: Math.min(100, (b.maturityIndex || 40) + 10),
            }
          : b
      ),
    }));
    setToastMsg(`Compost pile turned. Temp: ${payload.coreTemperatureC}°C (Target: ${payload.inactivationTargetStatus || 'Active'})`);
  };

  const handleStockMovementLogged = (itemId, payload) => {
    setInventory((prev) => {
      const updatedItems = prev.items.map((i) => {
        if (i.id === itemId || i.code === payload.sku || i.sku === payload.sku) {
          const newQty = Math.max(0, Math.round((Number(i.inStock) + Number(payload.quantityDelta)) * 100) / 100);
          return {
            ...i,
            inStock: newQty,
          };
        }
        return i;
      });

      const matchedItem = prev.items.find((i) => i.id === itemId || i.code === payload.sku || i.sku === payload.sku);

      return {
        ...prev,
        items: updatedItems,
        transactions: [
          {
            id: `tx-${Date.now()}`,
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            sku: payload.sku || matchedItem?.code,
            itemName: matchedItem?.name || payload.sku,
            type: payload.type,
            quantity: Math.abs(payload.quantityDelta),
            unit: payload.unit,
            destination: payload.referenceBatchCode || 'Storage Movement',
            steward: payload.stewardName || 'Vincent',
          },
          ...prev.transactions,
        ],
      };
    });
    setToastMsg(`Ledger movement committed: ${payload.type} (${payload.quantityDelta > 0 ? '+' : ''}${payload.quantityDelta} ${payload.unit})`);
  };

  // Form States
  const [batchForm, setBatchForm] = useState({
    code: '',
    name: '',
    domain: 'Cultivation',
    variety: '',
    zone: 'Zone 1: Micro-Greenhouse',
    status: 'Active',
    startDate: '2026-11-12',
    expectedEndDate: '2026-12-20',
    initialQuantity: '100',
    unit: 'kg',
    notes: ''
  });

  const [newTypeForm, setNewTypeForm] = useState({
    name: '',
    domain: 'Cultivation',
    defaultUnit: 'kg'
  });

  // Module Definitions
  const modules = [
    { id: 'cultivation', label: '01. Cultivation', icon: <Grass fontSize="small" />, count: cultivation.batches.length + ' Batches' },
    { id: 'livestock', label: '02. Livestock', icon: <Pets fontSize="small" />, count: livestock.animals.length + ' Animals' },
    { id: 'aquaculture', label: '03. Aquaculture', icon: <SetMeal fontSize="small" />, count: aquaculture.batches.length + ' Batches' },
    { id: 'circular', label: '04. Circular System', icon: <Loop fontSize="small" />, count: circular.compostBatches.length + ' Batches' },
    { id: 'inventory', label: '05. Inventory', icon: <Inventory2Outlined fontSize="small" />, count: inventory.items.length + ' Items' },
    { id: 'energy-water', label: '06. Energy & Water', icon: <Bolt fontSize="small" />, count: '3 Tanks • 5.2 kWp' },
    { id: 'config', label: '⚙️ Custom Config', icon: <SettingsSuggest fontSize="small" />, count: config.types.length + ' Types' },
  ];

  const handleOpenDetail = (record) => {
    setSelectedRecord(record);
    setDetailDrawerOpen(true);
  };

  const handleDeleteRecord = (recordId, type) => {
    if (window.confirm("Are you sure you want to delete this operational record?")) {
      if (type === 'cultivation') {
        setCultivation({ ...cultivation, batches: cultivation.batches.filter(b => b.id !== recordId) });
      } else if (type === 'livestock') {
        setLivestock({ ...livestock, batches: livestock.batches.filter(b => b.id !== recordId) });
      } else if (type === 'aquaculture') {
        setAquaculture({ ...aquaculture, batches: aquaculture.batches.filter(b => b.id !== recordId) });
      } else if (type === 'inventory') {
        setInventory({ ...inventory, items: inventory.items.filter(i => i.id !== recordId) });
      }
      setToastMsg("Record removed from operational database.");
    }
  };

  const handleCreateUniversalBatch = (e) => {
    e.preventDefault();
    const newCode = batchForm.code || `BAT-${new Date().getFullYear()}-${batchForm.domain.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 89)}`;
    const newBatch = {
      id: `bat-${Date.now()}`,
      code: newCode,
      name: batchForm.name,
      status: batchForm.status,
      zone: batchForm.zone,
      startDate: batchForm.startDate,
      expectedEndDate: batchForm.expectedEndDate,
      actualEndDate: null,
      initialQuantity: Number(batchForm.initialQuantity) || 1,
      unit: batchForm.unit,
      harvests: [],
      notes: batchForm.notes,
      history: [
        { date: 'Just now', action: `Universal Batch Created in state: ${batchForm.status}`, user: 'Vincent' }
      ]
    };

    if (activeModule === 'cultivation') {
      setCultivation({ ...cultivation, batches: [newBatch, ...cultivation.batches] });
    } else if (activeModule === 'livestock') {
      setLivestock({ ...livestock, batches: [newBatch, ...livestock.batches] });
    } else if (activeModule === 'aquaculture') {
      setAquaculture({ ...aquaculture, batches: [newBatch, ...aquaculture.batches] });
    }

    setAddModalOpen(false);
    setToastMsg(`Universal Batch "${newBatch.code} — ${newBatch.name}" registered in ${newBatch.status} state!`);
    setBatchForm({
      code: '',
      name: '',
      domain: 'Cultivation',
      variety: '',
      zone: 'Zone 1: Micro-Greenhouse',
      status: 'Active',
      startDate: '2026-11-12',
      expectedEndDate: '2026-12-20',
      initialQuantity: '100',
      unit: 'kg',
      notes: ''
    });
  };

  const handleAddCustomType = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `type-${Date.now()}`,
      name: newTypeForm.name,
      domain: newTypeForm.domain,
      defaultUnit: newTypeForm.defaultUnit,
      icon: 'Spa'
    };
    setConfig({ ...config, types: [...config.types, newEntry] });
    setNewTypeForm({ name: '', domain: 'Cultivation', defaultUnit: 'kg' });
    setToastMsg(`Custom type "${newEntry.name}" added to Taxonomy.`);
  };

  const getStatusColor = (st) => {
    switch (st?.toLowerCase()) {
      case 'active': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#065F46' };
      case 'planned': return { bg: 'rgba(2, 132, 199, 0.15)', text: '#0369A1' };
      case 'draft': return { bg: 'rgba(100, 116, 139, 0.15)', text: '#475569' };
      case 'on hold': return { bg: 'rgba(245, 158, 11, 0.15)', text: '#B45309' };
      case 'completed': return { bg: 'rgba(101, 163, 13, 0.15)', text: '#4D7C0F' };
      default: return { bg: 'rgba(27, 67, 50, 0.08)', text: '#1B4332' };
    }
  };

  return (
    <>
      <Head>
        <title>Terra Interface — Operations & Management System</title>
      </Head>

      {/* HEADER */}
      <Box sx={{ mb: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#1B4332', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              OPERATIONS & CRUD ENGINE • PERSONAL HOMESTEAD OS
            </Typography>
            <Chip
              label="Modular Monolith • Universal Batch Engine"
              size="small"
              sx={{ bgcolor: 'rgba(27, 67, 50, 0.08)', color: '#1B4332', fontWeight: 700, fontSize: '0.72rem' }}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F291E', letterSpacing: '-0.02em' }}>
            Homestead Operations Management
          </Typography>
          <Typography variant="body1" sx={{ color: '#486253', maxWidth: 740 }}>
            Embedded CRUD operations for cultivation, livestock, aquaculture, circular bioconversion, inventory, and energy-water monitoring across Vincent's Farm (300 m²).
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
          {activeModule === 'livestock' && (
            <>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Egg />}
                onClick={() => {
                  setActiveLivestockBatch(livestock.batches[0] || null);
                  setEggHarvestDrawerOpen(true);
                }}
                sx={{
                  borderRadius: 3,
                  color: '#D97706',
                  borderColor: '#D97706',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(217, 119, 6, 0.08)', borderColor: '#B45309' },
                }}
              >
                Log Eggs
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RestaurantMenu />}
                onClick={() => {
                  setActiveLivestockBatch(livestock.batches[0] || null);
                  setLivestockFeedDrawerOpen(true);
                }}
                sx={{
                  borderRadius: 3,
                  color: '#10B981',
                  borderColor: '#10B981',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.08)', borderColor: '#059669' },
                }}
              >
                Log Feed
              </Button>
            </>
          )}

          {activeModule === 'aquaculture' && (
            <>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Opacity />}
                onClick={() => {
                  setActiveAquaPond((aquaculture.ponds && aquaculture.ponds[0]) || null);
                  setWaterTestDrawerOpen(true);
                }}
                sx={{
                  borderRadius: 3,
                  color: '#2563EB',
                  borderColor: '#2563EB',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(37, 99, 235, 0.08)', borderColor: '#1D4ED8' },
                }}
              >
                Water Test
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<SetMeal />}
                onClick={() => {
                  setActiveAquaPond((aquaculture.ponds && aquaculture.ponds[0]) || null);
                  setFishFeedDrawerOpen(true);
                }}
                sx={{
                  borderRadius: 3,
                  color: '#10B981',
                  borderColor: '#10B981',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.08)', borderColor: '#059669' },
                }}
              >
                Fish Feed
              </Button>
            </>
          )}

          <Button
            variant="contained"
            onClick={() => activeModule === 'cultivation' ? setCultivationDrawerOpen(true) : setAddModalOpen(true)}
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
            Create New Batch / Record
          </Button>
        </Box>
      </Box>

      {/* MODULE SELECTOR TABS */}
      <Box sx={{ display: 'flex', gap: 1.2, overflowX: 'auto', pb: 1, mb: 3.5 }}>
        {modules.map((m) => (
          <Box
            key={m.id}
            onClick={() => { setActiveModule(m.id); setPage(0); }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 2,
              py: 1.2,
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: activeModule === m.id ? '#1B4332' : '#FFFFFF',
              color: activeModule === m.id ? '#FFFFFF' : '#486253',
              border: `1.5px solid ${activeModule === m.id ? '#1B4332' : 'rgba(27, 67, 50, 0.08)'}`,
              boxShadow: activeModule === m.id ? '0 6px 18px rgba(27,67,50,0.18)' : '0 2px 6px rgba(27,67,50,0.02)',
              transition: 'all 0.2s ease',
              minWidth: 'fit-content',
              '&:hover': {
                bgcolor: activeModule === m.id ? '#1B4332' : '#F0F6F1',
                borderColor: '#1B4332'
              }
            }}
          >
            <Box sx={{ color: activeModule === m.id ? '#10B981' : '#5A7565', display: 'flex' }}>
              {m.icon}
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'inherit', fontSize: '0.84rem', lineHeight: 1.2 }}>
                {m.label}
              </Typography>
              <Typography variant="caption" sx={{ color: activeModule === m.id ? 'rgba(255,255,255,0.7)' : '#748B7D', fontSize: '0.68rem', display: 'block' }}>
                {m.count}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* SEARCH & ACTION TOOLBAR */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3.5,
          bgcolor: '#FFFFFF',
          border: '1px solid rgba(27, 67, 50, 0.08)',
          boxShadow: '0 4px 16px rgba(27, 67, 50, 0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1, maxWidth: 440 }}>
          <TextField
            fullWidth
            size="small"
            placeholder={`Search ${activeModule} records, codes, varieties, zones...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#1B4332' }} fontSize="small" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2.5,
                bgcolor: '#FAF9F5',
                '& fieldset': { borderColor: 'rgba(27,67,50,0.1)' }
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip
            icon={<FilterList fontSize="small" />}
            label="Universal Lifecycle: Draft → Planned → Active → On Hold → Completed"
            sx={{ bgcolor: 'rgba(27,67,50,0.06)', color: '#1B4332', fontWeight: 700, fontSize: '0.72rem' }}
          />
        </Box>
      </Paper>

      {/* TAB VIEWS */}
      {activeModule === 'cultivation' && (
        <CultivationTab
          cultivation={cultivation}
          searchQuery={searchQuery}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          handleOpenDetail={handleOpenDetail}
          handleDeleteRecord={handleDeleteRecord}
          getStatusColor={getStatusColor}
        />
      )}

      {activeModule === 'livestock' && (
        <LivestockTab
          livestock={livestock}
          handleOpenDetail={handleOpenDetail}
        />
      )}

      {activeModule === 'aquaculture' && (
        <AquacultureTab
          aquaculture={aquaculture}
          handleOpenDetail={handleOpenDetail}
        />
      )}

      {activeModule === 'circular' && (
        <CircularTab
          circular={circular}
          setActiveBsfBatch={setActiveBsfBatch}
          setBsfFeedDrawerOpen={setBsfFeedDrawerOpen}
          setMaggotHarvestDrawerOpen={setMaggotHarvestDrawerOpen}
          setActiveCompostBatch={setActiveCompostBatch}
          setCompostTurnDrawerOpen={setCompostTurnDrawerOpen}
        />
      )}

      {activeModule === 'inventory' && (
        <InventoryTab
          inventory={inventory}
          searchQuery={searchQuery}
          setActiveInventoryItem={setActiveInventoryItem}
          setStockMovementDrawerOpen={setStockMovementDrawerOpen}
          setLedgerHistoryDrawerOpen={setLedgerHistoryDrawerOpen}
        />
      )}

      {activeModule === 'energy-water' && (
        <EnergyWaterTab
          energyWater={energyWater}
          setManualIngestDrawerOpen={setManualIngestDrawerOpen}
          setDispatchDrawerOpen={setDispatchDrawerOpen}
        />
      )}

      {activeModule === 'config' && (
        <ConfigTab
          config={config}
          newTypeForm={newTypeForm}
          setNewTypeForm={setNewTypeForm}
          handleAddCustomType={handleAddCustomType}
        />
      )}

      {/* CONTEXTUAL DETAIL DRAWER */}
      <Drawer
        anchor="right"
        open={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 460 },
            p: 3,
            bgcolor: '#FFFFFF',
            borderLeft: '1px solid rgba(27,67,50,0.1)'
          }
        }}
      >
        {selectedRecord && (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Chip
                label={selectedRecord.code || 'RECORD'}
                size="small"
                sx={{ bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332', fontWeight: 800 }}
              />
              <IconButton onClick={() => setDetailDrawerOpen(false)} size="small">
                <Close fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1B4332', mb: 0.5 }}>
              {selectedRecord.name || selectedRecord.breed}
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600, display: 'block', mb: 2 }}>
              Location: {selectedRecord.zone || selectedRecord.location || "Vincent's Farm"}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Lifecycle Status Pill */}
            {selectedRecord.status && (
              <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: '#FAF9F5', mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#748B7D', display: 'block' }}>Universal Batch State</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  {selectedRecord.status}
                </Typography>
                <Typography variant="caption" sx={{ color: '#5A7565' }}>
                  Timeline: {selectedRecord.startDate} &rarr; {selectedRecord.expectedEndDate}
                </Typography>
              </Box>
            )}

            {/* Quick Action: Log Harvest Output (Cultivation) */}
            {selectedRecord.harvests && activeModule === 'cultivation' && (
              <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<Spa />}
                onClick={() => {
                  setHarvestBatch(selectedRecord);
                  setHarvestDrawerOpen(true);
                }}
                sx={{
                  borderRadius: 2.5,
                  textTransform: 'none',
                  fontWeight: 700,
                  color: '#10B981',
                  borderColor: '#10B981',
                  '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.08)', borderColor: '#059669' },
                  mb: 2.5,
                }}
              >
                + Log Harvest Output
              </Button>
            )}

            {/* Quick Actions: Livestock (Egg Harvest & Feed) */}
            {activeModule === 'livestock' && (
              <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  startIcon={<Egg />}
                  onClick={() => {
                    setActiveLivestockBatch(selectedRecord);
                    setEggHarvestDrawerOpen(true);
                  }}
                  sx={{
                    borderRadius: 2.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    color: '#D97706',
                    borderColor: '#D97706',
                    '&:hover': { bgcolor: 'rgba(217, 119, 6, 0.08)', borderColor: '#B45309' },
                  }}
                >
                  Record Eggs
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  startIcon={<RestaurantMenu />}
                  onClick={() => {
                    setActiveLivestockBatch(selectedRecord);
                    setLivestockFeedDrawerOpen(true);
                  }}
                  sx={{
                    borderRadius: 2.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    color: '#10B981',
                    borderColor: '#10B981',
                    '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.08)', borderColor: '#059669' },
                  }}
                >
                  Log Feed
                </Button>
              </Box>
            )}

            {/* Quick Actions: Aquaculture (Water Test & Fish Feed) */}
            {activeModule === 'aquaculture' && (
              <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  startIcon={<Opacity />}
                  onClick={() => {
                    setActiveAquaPond(selectedRecord);
                    setWaterTestDrawerOpen(true);
                  }}
                  sx={{
                    borderRadius: 2.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    color: '#2563EB',
                    borderColor: '#2563EB',
                    '&:hover': { bgcolor: 'rgba(37, 99, 235, 0.08)', borderColor: '#1D4ED8' },
                  }}
                >
                  Water Test
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  startIcon={<SetMeal />}
                  onClick={() => {
                    setActiveAquaPond(selectedRecord);
                    setFishFeedDrawerOpen(true);
                  }}
                  sx={{
                    borderRadius: 2.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    color: '#10B981',
                    borderColor: '#10B981',
                    '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.08)', borderColor: '#059669' },
                  }}
                >
                  Fish Feed
                </Button>
              </Box>
            )}

            {/* Output / Harvest Records */}
            {selectedRecord.harvests && selectedRecord.harvests.length > 0 && (
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
                  Recorded Batch Outputs ({selectedRecord.harvests.length})
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {selectedRecord.harvests.map((h, idx) => (
                    <Box key={idx} sx={{ p: 1.2, borderRadius: 2, bgcolor: '#F0F7F1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>{h.date}</Typography>
                        <Typography variant="caption" sx={{ color: '#5A7565', display: 'block' }}>Grade: {h.grade || 'Prime'}</Typography>
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#10B981' }}>
                        {h.quantity} {h.unit}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Audit History Log */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
              Operational Audit History
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto', flexGrow: 1 }}>
              {(selectedRecord.history || [{ date: '2026-11-12', action: 'Record initialized by steward Vincent', user: 'Vincent' }]).map((h, idx) => (
                <Box key={idx} sx={{ p: 1.2, borderRadius: 2, bgcolor: '#FAF9F5', borderLeft: '3px solid #10B981' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>{h.action}</Typography>
                  <Typography variant="caption" sx={{ color: '#748B7D', display: 'block' }}>{h.date} • {h.user}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ pt: 2, mt: 'auto', borderTop: '1px solid rgba(27,67,50,0.08)' }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setDetailDrawerOpen(false)}
                sx={{ borderRadius: 2.5, textTransform: 'none', fontWeight: 700, borderColor: 'rgba(27,67,50,0.2)', color: '#1B4332' }}
              >
                Close Console
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* CONTEXTUAL ADD UNIVERSAL BATCH MODAL */}
      <Dialog
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 1.5, bgcolor: '#FFFFFF' } }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Register New Universal Batch
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            Lifecycle: Draft &rarr; Planned &rarr; Active &rarr; On Hold &rarr; Completed
          </Typography>
        </DialogTitle>
        <form onSubmit={handleCreateUniversalBatch}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Batch Name"
                  placeholder="e.g. Winter Romanesco Hydroponic NFT, Joper Broiler Cycle 5"
                  value={batchForm.name}
                  onChange={(e) => setBatchForm({ ...batchForm, name: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Production Domain"
                  value={batchForm.domain}
                  onChange={(e) => setBatchForm({ ...batchForm, domain: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  <MenuItem value="Cultivation">Cultivation</MenuItem>
                  <MenuItem value="Livestock">Livestock</MenuItem>
                  <MenuItem value="Aquaculture">Aquaculture</MenuItem>
                  <MenuItem value="Circular">Circular</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Lifecycle Status"
                  value={batchForm.status}
                  onChange={(e) => setBatchForm({ ...batchForm, status: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Planned">Planned</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="On Hold">On Hold</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Initial Quantity"
                  value={batchForm.initialQuantity}
                  onChange={(e) => setBatchForm({ ...batchForm, initialQuantity: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Measurement Unit"
                  value={batchForm.unit}
                  onChange={(e) => setBatchForm({ ...batchForm, unit: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  {config.measurementUnits.map((u) => (
                    <MenuItem key={u} value={u}>{u}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  value={batchForm.startDate}
                  onChange={(e) => setBatchForm({ ...batchForm, startDate: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Expected End Date"
                  InputLabelProps={{ shrink: true }}
                  value={batchForm.expectedEndDate}
                  onChange={(e) => setBatchForm({ ...batchForm, expectedEndDate: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Homestead Zone / Location"
                  value={batchForm.zone}
                  onChange={(e) => setBatchForm({ ...batchForm, zone: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  <MenuItem value="Zone 1: Micro-Greenhouse">Zone 1: Micro-Greenhouse</MenuItem>
                  <MenuItem value="Zone 2: Aquaponics">Zone 2: Aquaponics & Tilapia Pond</MenuItem>
                  <MenuItem value="Zone 3: Poultry Hub">Zone 3: Poultry & BSF Hub</MenuItem>
                  <MenuItem value="Zone 4: Permaculture Beds">Zone 4: Permaculture Beds</MenuItem>
                  <MenuItem value="Zone 5: Solar Array">Zone 5: Solar Array & Battery</MenuItem>
                  <MenuItem value="Zone 6: Water Catchment">Zone 6: Water Catchment</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Operational Instructions / Notes"
                  placeholder="Feed type, seed provenance, nursery chamber..."
                  value={batchForm.notes}
                  onChange={(e) => setBatchForm({ ...batchForm, notes: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setAddModalOpen(false)} sx={{ color: '#5A7565', textTransform: 'none', fontWeight: 600 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#1B4332', color: '#FFFFFF', borderRadius: 2.5, px: 3, textTransform: 'none', fontWeight: 700 }}
            >
              Create Universal Batch
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

      {/* CULTIVATION FEATURE DRAWERS */}
      <AddCultivationBatchDrawer
        open={cultivationDrawerOpen}
        onClose={() => setCultivationDrawerOpen(false)}
        onBatchCreated={handleCultivationBatchCreated}
      />
      <RecordCultivationHarvestDrawer
        open={harvestDrawerOpen}
        onClose={() => {
          setHarvestDrawerOpen(false);
          setHarvestBatch(null);
        }}
        batch={harvestBatch}
        onHarvestLogged={handleHarvestLogged}
      />

      {/* LIVESTOCK FEATURE DRAWERS */}
      <RecordEggHarvestDrawer
        open={eggHarvestDrawerOpen}
        onClose={() => {
          setEggHarvestDrawerOpen(false);
          setActiveLivestockBatch(null);
        }}
        batch={activeLivestockBatch || livestock.batches[0]}
        onEggHarvestLogged={handleEggHarvestLogged}
      />
      <LogLivestockFeedDrawer
        open={livestockFeedDrawerOpen}
        onClose={() => {
          setLivestockFeedDrawerOpen(false);
          setActiveLivestockBatch(null);
        }}
        batch={activeLivestockBatch || livestock.batches[0]}
        onFeedLogged={handleLivestockFeedLogged}
      />

      {/* AQUACULTURE FEATURE DRAWERS */}
      <RecordWaterTestDrawer
        open={waterTestDrawerOpen}
        onClose={() => {
          setWaterTestDrawerOpen(false);
          setActiveAquaPond(null);
        }}
        pond={activeAquaPond || (aquaculture.ponds && aquaculture.ponds[0])}
        onWaterTestLogged={handleWaterTestLogged}
      />
      <LogFishFeedingDrawer
        open={fishFeedDrawerOpen}
        onClose={() => {
          setFishFeedDrawerOpen(false);
          setActiveAquaPond(null);
        }}
        pond={activeAquaPond || (aquaculture.ponds && aquaculture.ponds[0])}
        onFeedingLogged={handleFishFeedLogged}
      />

      {/* CIRCULAR SYSTEMS FEATURE DRAWERS */}
      <RecordBsfFeedDrawer
        open={bsfFeedDrawerOpen}
        onClose={() => {
          setBsfFeedDrawerOpen(false);
          setActiveBsfBatch(null);
        }}
        batch={activeBsfBatch || circular.bsfBatches[0]}
        onFeedLogged={handleBsfFeedLogged}
      />
      <RecordMaggotHarvestDrawer
        open={maggotHarvestDrawerOpen}
        onClose={() => {
          setMaggotHarvestDrawerOpen(false);
          setActiveBsfBatch(null);
        }}
        batch={activeBsfBatch || circular.bsfBatches[0]}
        onHarvestLogged={handleMaggotHarvestLogged}
      />
      <RecordCompostTurnDrawer
        open={compostTurnDrawerOpen}
        onClose={() => {
          setCompostTurnDrawerOpen(false);
          setActiveCompostBatch(null);
        }}
        batch={activeCompostBatch || circular.compostBatches[0]}
        onTurnLogged={handleCompostTurnLogged}
      />

      {/* INVENTORY LEDGER FEATURE DRAWERS */}
      <RecordStockMovementDrawer
        open={stockMovementDrawerOpen}
        onClose={() => {
          setStockMovementDrawerOpen(false);
          setActiveInventoryItem(null);
        }}
        item={activeInventoryItem || inventory.items[0]}
        items={inventory.items}
        onMovementLogged={handleStockMovementLogged}
      />
      <InventoryLedgerHistoryDrawer
        open={ledgerHistoryDrawerOpen}
        onClose={() => {
          setLedgerHistoryDrawerOpen(false);
          setActiveInventoryItem(null);
        }}
        item={activeInventoryItem}
      />

      {/* MICROGRID FEATURE DRAWERS */}
      <ConfigureDispatchPolicyDrawer
        open={dispatchDrawerOpen}
        onClose={() => setDispatchDrawerOpen(false)}
        onPolicyUpdated={(pol) => setToastMsg(`Dispatch policy updated: ${pol.solarDumpMode}`)}
      />
      <ManualTelemetryIngestDrawer
        open={manualIngestDrawerOpen}
        onClose={() => setManualIngestDrawerOpen(false)}
        onTelemetryIngested={(snap) => setToastMsg(`Probe telemetry ingested: ${snap.solarGenerationKw} kW solar, ${snap.batterySoC}% SoC`)}
      />
    </>
  );
}
