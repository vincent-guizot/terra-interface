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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Snackbar,
  Alert,
  Tooltip,
  LinearProgress
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
  Edit,
  DeleteOutline,
  Close,
  CheckCircle,
  History,
  Spa,
  Yard,
  Egg,
  Opacity,
  Tune,
  ArrowForward,
  MoreVert,
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

export default function OperationsHub() {
  const [activeModule, setActiveModule] = useState('cultivation'); // cultivation | livestock | aquaculture | circular | inventory | energy-water | config
  const [activeSubTab, setActiveSubTab] = useState('batches'); // batches | catalog | records | health | history
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
  const [editModalOpen, setEditModalOpen] = useState(false);
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
              larvaeYieldKg: Math.round((Number(b.larvaeYieldKg || 0) + Number(payload.prepupaeYieldKg)) * 10) / 10,
              frassYieldKg: Math.round((Number(b.frassYieldKg || 0) + Number(payload.frassYieldKg)) * 10) / 10,
              status: 'Harvest Ready',
            }
          : b
      ),
    }));

    // Auto update inventory for BSF prepupae (SKU-BSF-01)
    setInventory((prev) => {
      const existing = prev.items.find((i) => i.code === 'SKU-BSF-01' || i.sku === 'SKU-BSF-01');
      const updatedItems = existing
        ? prev.items.map((i) =>
            i.code === 'SKU-BSF-01' || i.sku === 'SKU-BSF-01'
              ? { ...i, inStock: Math.round((Number(i.inStock) + Number(payload.prepupaeYieldKg)) * 10) / 10 }
              : i
          )
        : [
            ...prev.items,
            {
              id: 'inv-bsf-live',
              code: 'SKU-BSF-01',
              sku: 'SKU-BSF-01',
              name: 'Fresh Harvested BSF Prepupae (42% Protein)',
              category: 'Biologicals',
              location: 'Homestead Tool & Feed Shed A',
              inStock: Number(payload.prepupaeYieldKg),
              unit: 'kg',
              minThreshold: 2.0,
            },
          ];

      return {
        ...prev,
        items: updatedItems,
        transactions: [
          {
            id: `tx-bsf-${Date.now()}`,
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            sku: 'SKU-BSF-01',
            itemName: 'Fresh Harvested BSF Prepupae',
            type: 'HARVEST_IN',
            quantity: payload.prepupaeYieldKg,
            unit: 'kg',
            destination: `Poultry (${payload.allocatedToPoultryKg}kg) / Tilapia (${payload.allocatedToTilapiaKg}kg)`,
            steward: 'Vincent',
          },
          ...prev.transactions,
        ],
      };
    });

    setToastMsg(`Harvested ${payload.prepupaeYieldKg} kg live prepupae & ${payload.frassYieldKg} kg frass credited to inventory!`);
  };

  const handleCompostTurnLogged = (batchId, payload) => {
    setCircular((prev) => ({
      ...prev,
      compostBatches: prev.compostBatches.map((b) =>
        b.id === batchId || b.code === payload.batchCode || b.bayNumber === payload.bayNumber
          ? {
              ...b,
              temperatureC: payload.coreTempC,
              edgeTempC: payload.edgeTempC,
              moisturePercent: payload.moisturePercent,
              maturityIndex: Math.min(100, (b.maturityIndex || 70) + 5),
              maturityStage: `${payload.coreTempC >= 55 ? 'Thermophilic Pasteurization' : 'Cooling & Humus'} (Turn #${payload.turnCount})`,
            }
          : b
      ),
    }));
    setToastMsg(`Compost turn #${payload.turnCount} logged (${payload.coreTempC}°C) in ${payload.bayNumber}.`);
  };

  const handleStockMovementLogged = (itemId, payload) => {
    setInventory((prev) => {
      const updatedItems = prev.items.map((i) => {
        if (i.id === itemId || i.code === payload.sku || i.sku === payload.sku) {
          const newStock = Math.round((Number(i.inStock) + Number(payload.quantityDelta)) * 10) / 10;
          return {
            ...i,
            inStock: newStock,
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

  // Universal Batch Form State (Draft -> Planned -> Active -> On Hold -> Completed / Cancelled)
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

  // Custom Configuration Form State
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
    setToastMsg(`Created custom production type: "${newEntry.name}" under ${newEntry.domain}!`);
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

      {/* ========================================================================= */}
      {/* MODULE 01: CULTIVATION MANAGEMENT                                         */}
      {/* ========================================================================= */}
      {activeModule === 'cultivation' && (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(27, 67, 50, 0.08)',
            boxShadow: '0 8px 24px -6px rgba(27, 67, 50, 0.04)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(27,67,50,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                Growing Batches & Plant Catalog
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565' }}>
                Universal batch lifecycle management with multiple harvest records
              </Typography>
            </Box>
            <Chip label={`${cultivation.batches.length} Active Batches`} size="small" sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 800 }} />
          </Box>

          <Table>
            <TableHead sx={{ bgcolor: '#FAF9F5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.78rem' }}>BATCH CODE</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.78rem' }}>CROP / PLANT</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.78rem' }}>ZONE / LOCATION</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.78rem' }}>TIMELINE</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.78rem' }}>STATUS</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.78rem' }}>HARVESTS</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.78rem' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cultivation.batches
                .filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.code.toLowerCase().includes(searchQuery.toLowerCase()))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((batch) => {
                  const sc = getStatusColor(batch.status);
                  const totalYield = batch.harvests.reduce((acc, h) => acc + h.quantity, 0);

                  return (
                    <TableRow key={batch.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                          {batch.code}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#748B7D' }}>
                          Init: {batch.initialQuantity} {batch.unit}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                          {batch.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#5A7565' }}>
                          {batch.plantName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#486253', fontWeight: 600 }}>
                          {batch.zone}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ color: '#14281D', fontWeight: 700, display: 'block' }}>
                          Start: {batch.startDate}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#5A7565' }}>
                          Est. End: {batch.expectedEndDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={batch.status}
                          size="small"
                          sx={{ bgcolor: sc.bg, color: sc.text, fontWeight: 800, fontSize: '0.7rem', height: 22 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#10B981' }}>
                          {totalYield} kg
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#748B7D' }}>
                          {batch.harvests.length} Picks
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleOpenDetail(batch)}
                            sx={{ borderRadius: 2, fontSize: '0.75rem', py: 0.3, px: 1, textTransform: 'none', borderColor: 'rgba(27,67,50,0.18)', color: '#1B4332' }}
                          >
                            Details
                          </Button>
                          <IconButton size="small" onClick={() => handleDeleteRecord(batch.id, 'cultivation')}>
                            <DeleteOutline fontSize="small" sx={{ color: '#EF4444' }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={cultivation.batches.length}
            page={page}
            onPageChange={(e, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      )}

      {/* ========================================================================= */}
      {/* MODULE 02: LIVESTOCK MANAGEMENT                                           */}
      {/* ========================================================================= */}
      {activeModule === 'livestock' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)', mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    Homestock Flocks & Herds (Chickens, Goats & Sheep)
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565' }}>
                    Ayam KUB, Cornish Cross, Joper, Kambing Boer, and Domba Garut tracking
                  </Typography>
                </Box>
                <Chip label="Zero Mortality" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 800 }} />
              </Box>

              <Grid container spacing={2}>
                {livestock.animals.map((ani) => (
                  <Grid item xs={12} sm={6} md={2.4} key={ani.id}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: '#FAF9F5',
                        border: '1px solid rgba(27,67,50,0.08)',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Chip label={ani.species} size="small" sx={{ bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332', fontWeight: 800, fontSize: '0.68rem' }} />
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#10B981' }}>{ani.health}</Typography>
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 0.5, lineHeight: 1.2 }}>
                        {ani.breed}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', mb: 1 }}>
                        {ani.type}
                      </Typography>
                      <Box sx={{ pt: 1, borderTop: '1px solid rgba(27,67,50,0.06)' }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>
                          Pop: {ani.population} head
                        </Typography>
                        {ani.eggDaily > 0 && (
                          <Typography variant="caption" sx={{ color: '#D97706', display: 'block', fontWeight: 700 }}>
                            Yield: {ani.eggDaily} eggs/day
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Livestock Batches Table */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)', overflow: 'hidden' }}>
              <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(27,67,50,0.08)' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Livestock Production Batches
                </Typography>
              </Box>
              <Table>
                <TableHead sx={{ bgcolor: '#FAF9F5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>CODE</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>BATCH NAME / BREED</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>COUNT</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>FEEDING RATIO</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>STATUS</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: '#1B4332' }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {livestock.batches.map((b) => (
                    <TableRow key={b.id} hover>
                      <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>{b.code}</TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>{b.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#5A7565' }}>{b.breed} • {b.species}</Typography>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{b.currentCount} birds</TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', color: '#486253' }}>{b.feedingRatio}</TableCell>
                      <TableCell>
                        <Chip label={b.status} size="small" sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 800 }} />
                      </TableCell>
                      <TableCell align="right">
                        <Button size="small" variant="outlined" onClick={() => handleOpenDetail(b)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                          Inspect
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* ========================================================================= */}
      {/* MODULE 03: AQUACULTURE MANAGEMENT                                         */}
      {/* ========================================================================= */}
      {activeModule === 'aquaculture' && (
        <Paper elevation={0} sx={{ borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)', overflow: 'hidden' }}>
          <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(27,67,50,0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Aquaculture Ponds & Tilapia / Catfish Batches
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565' }}>
              Water quality sampling, population biomass, and FCR optimization
            </Typography>
          </Box>
          <Table>
            <TableHead sx={{ bgcolor: '#FAF9F5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>POND</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>SPECIES / BATCH</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>WATER QUALITY</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>POPULATION</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>FEEDING</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, color: '#1B4332' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aquaculture.batches.map((b) => (
                <TableRow key={b.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0284C7' }}>{b.pondName}</Typography>
                    <Typography variant="caption" sx={{ color: '#748B7D' }}>{b.code}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>{b.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#5A7565' }}>{b.species}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0284C7', display: 'block' }}>
                      pH {b.waterQualityLog.ph} • DO {b.waterQualityLog.do} mg/L
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#5A7565' }}>
                      Temp {b.waterQualityLog.temp}°C • NO3 {b.waterQualityLog.nitrate} ppm
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                      {b.currentCount} fish ({b.avgWeightG}g avg)
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>
                      Survival: {b.survivalRate}%
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', color: '#486253' }}>
                    {b.feedingSchedule}
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" onClick={() => handleOpenDetail(b)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                      Pond Log
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* ========================================================================= */}
      {/* MODULE 04: CIRCULAR SYSTEM (BSF & COMPOST BATCHES)                        */}
      {/* ========================================================================= */}
      {activeModule === 'circular' && (
        <Grid container spacing={3}>
          {/* BSF Batches */}
          <Grid item xs={12} lg={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    BSF Bioconversion Batches (Maggot Harvest)
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565' }}>
                    Stacked insect trays converting kitchen waste into 42% protein
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<RestaurantMenu />}
                  onClick={() => {
                    setActiveBsfBatch(circular.bsfBatches[0] || null);
                    setBsfFeedDrawerOpen(true);
                  }}
                  sx={{
                    bgcolor: '#10B981',
                    color: '#FFFFFF',
                    borderRadius: 2,
                    fontWeight: 700,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#059669' },
                  }}
                >
                  + Feed Tray
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label="1.8 kg/day Live Protein" size="small" sx={{ bgcolor: 'rgba(245,158,11,0.15)', color: '#D97706', fontWeight: 800 }} />
                <Chip label="96.6% Closed Loop" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 800 }} />
              </Box>

              {circular.bsfBatches.map((bsf) => (
                <Box key={bsf.id} sx={{ p: 2, borderRadius: 3, bgcolor: '#FAF9F5', border: '1px solid rgba(27,67,50,0.06)', mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>{bsf.name}</Typography>
                    <Chip label={bsf.status} size="small" sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 800 }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', mb: 0.5 }}>
                    Input: {bsf.initialQuantity} {bsf.unit} &rarr; Output: {bsf.larvaeYieldKg} kg high-protein prepupae
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', mb: 1.5 }}>
                    Efficiency: {bsf.feedConversionEfficiency}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<CheckCircle />}
                      onClick={() => {
                        setActiveBsfBatch(bsf);
                        setMaggotHarvestDrawerOpen(true);
                      }}
                      sx={{
                        bgcolor: '#10B981',
                        color: '#FFFFFF',
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        '&:hover': { bgcolor: '#059669' },
                      }}
                    >
                      Harvest Prepupae
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<RestaurantMenu />}
                      onClick={() => {
                        setActiveBsfBatch(bsf);
                        setBsfFeedDrawerOpen(true);
                      }}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        color: '#1B4332',
                        borderColor: 'rgba(27,67,50,0.3)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      Feed Scraps
                    </Button>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Compost Batches & Maturity */}
          <Grid item xs={12} lg={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    Bokashi & Hot Compost Maturity Index
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565' }}>
                    Aerobic windrows reaching 55–65°C pasteurization
                  </Typography>
                </Box>
                <Chip label="480 kg Mature Humus" size="small" sx={{ bgcolor: 'rgba(101,163,13,0.15)', color: '#4D7C0F', fontWeight: 800 }} />
              </Box>

              {circular.compostBatches.map((cmp) => (
                <Box key={cmp.id} sx={{ p: 2, borderRadius: 3, bgcolor: '#FAF9F5', border: '1px solid rgba(27,67,50,0.06)', mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>{cmp.name}</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: cmp.temperatureC >= 55 ? '#EF4444' : '#10B981' }}>
                      {cmp.temperatureC}°C
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', mb: 1 }}>
                    Stage: {cmp.maturityStage} • Moisture {cmp.moisturePercent}%
                  </Typography>
                  <LinearProgress variant="determinate" value={cmp.maturityIndex} sx={{ height: 6, borderRadius: 3, mb: 1, '& .MuiLinearProgress-bar': { bgcolor: '#10B981' } }} />
                  <Typography variant="caption" sx={{ color: '#748B7D', display: 'block', mb: 1.5 }}>
                    Recipe: {cmp.recipe}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setActiveCompostBatch(cmp);
                        setCompostTurnDrawerOpen(true);
                      }}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        color: '#1B4332',
                        borderColor: 'rgba(27,67,50,0.3)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      Log Turn & Temp
                    </Button>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* ========================================================================= */}
      {/* MODULE 05: INVENTORY MANAGEMENT                                           */}
      {/* ========================================================================= */}
      {activeModule === 'inventory' && (
        <Paper elevation={0} sx={{ borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)', overflow: 'hidden' }}>
          <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(27,67,50,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                Homestead Inventory & Storage Stock
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565' }}>
                Double-entry transaction ledger, safety reorder thresholds, and physical storage bins
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Chip label="4 Storage Locations" size="small" sx={{ bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332', fontWeight: 800 }} />
              <Button
                size="small"
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  setActiveInventoryItem(null);
                  setStockMovementDrawerOpen(true);
                }}
                sx={{
                  bgcolor: '#10B981',
                  color: '#FFFFFF',
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#059669' },
                }}
              >
                + Record Movement
              </Button>
            </Box>
          </Box>
          <Table>
            <TableHead sx={{ bgcolor: '#FAF9F5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>SKU</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>ITEM NAME</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>CATEGORY</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>STORAGE LOCATION</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>IN STOCK</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, color: '#1B4332' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.items
                .filter(i => (i.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (i.code || i.sku || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>{item.code || item.sku}</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#1B4332' }}>{item.name}</TableCell>
                    <TableCell><Chip label={item.category} size="small" sx={{ height: 20, fontSize: '0.68rem', fontWeight: 700 }} /></TableCell>
                    <TableCell sx={{ color: '#5A7565', fontSize: '0.82rem' }}>{item.location || item.locationName}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: item.inStock <= item.minThreshold ? '#EF4444' : '#10B981' }}>
                        {item.inStock} {item.unit}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'inline-flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<History />}
                          onClick={() => {
                            setActiveInventoryItem(item);
                            setLedgerHistoryDrawerOpen(true);
                          }}
                          sx={{ borderRadius: 2, textTransform: 'none', color: '#1B4332', borderColor: 'rgba(27,67,50,0.3)', fontSize: '0.75rem', fontWeight: 700 }}
                        >
                          Audit Ledger
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setActiveInventoryItem(item);
                            setStockMovementDrawerOpen(true);
                          }}
                          sx={{ borderRadius: 2, textTransform: 'none', color: '#10B981', borderColor: 'rgba(16,185,129,0.5)', fontSize: '0.75rem', fontWeight: 700 }}
                        >
                          + Movement
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* ========================================================================= */}
      {/* MODULE 06: ENERGY & WATER MANAGEMENT                                      */}
      {/* ========================================================================= */}
      {activeModule === 'energy-water' && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#FFFFFF', border: '1.5px solid rgba(217, 119, 6, 0.2)' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
                Solar Array & LiFePO4 Battery Diagnostics
              </Typography>
              <Typography variant="body2" sx={{ color: '#5A7565', mb: 2 }}>
                10x Tier 1 520W Bifacial Panels • 53.2V 16S Pack at 91% SoC
              </Typography>
              <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: '#FAF9F5', mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#748B7D' }}>Battery Capacity</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#10B981' }}>15.3 kWh (91% SoC)</Typography>
                </Box>
                <LinearProgress variant="determinate" value={91} sx={{ height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { bgcolor: '#10B981' } }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#748B7D' }}>
                Cycle Count: 184 • Cell Delta: 0.008V • Temperature: 28.5°C
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#FFFFFF', border: '1.5px solid rgba(2, 132, 199, 0.2)' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
                Rainwater Storage Tanks & Well Consumption
              </Typography>
              <Typography variant="body2" sx={{ color: '#5A7565', mb: 2 }}>
                Total Storage: 10,400 L / 12,000 L Capacity across 3 Cisterns
              </Typography>
              {energyWater.water.storageTanks.map((tnk) => (
                <Box key={tnk.id} sx={{ p: 1.5, borderRadius: 2, bgcolor: '#FAF9F5', mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>{tnk.name}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#0284C7' }}>{tnk.currentL} L ({tnk.pct}%)</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={tnk.pct} sx={{ height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: '#0284C7' } }} />
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* ========================================================================= */}
      {/* MODULE 07: CUSTOM PRODUCTION CONFIGURATION (Never hardcoded)              */}
      {/* ========================================================================= */}
      {activeModule === 'config' && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    Configurable Production Types & Taxonomy
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565' }}>
                    Users define their own production domains, product names, and measurement units.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                {config.types.map((t) => (
                  <Box key={t.id} sx={{ p: 1.8, borderRadius: 2.5, bgcolor: '#FAF9F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Spa sx={{ color: '#10B981', fontSize: 20 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>{t.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#5A7565' }}>Domain: {t.domain}</Typography>
                      </Box>
                    </Box>
                    <Chip label={`Unit: ${t.defaultUnit}`} size="small" sx={{ fontWeight: 700, bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332' }} />
                  </Box>
                ))}
              </Box>

              {/* Add New Custom Type Form */}
              <Box component="form" onSubmit={handleAddCustomType} sx={{ p: 2, borderRadius: 3, bgcolor: '#F3F8F4', border: '1px dashed #10B981' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1.5 }}>
                  + Add Custom Production Type
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      required
                      placeholder="e.g. Heirloom Duck Eggs, Microalgae"
                      value={newTypeForm.name}
                      onChange={(e) => setNewTypeForm({ ...newTypeForm, name: e.target.value })}
                      size="small"
                      sx={{ '& fieldset': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      select
                      value={newTypeForm.domain}
                      onChange={(e) => setNewTypeForm({ ...newTypeForm, domain: e.target.value })}
                      size="small"
                      sx={{ '& fieldset': { borderRadius: 2 } }}
                    >
                      <MenuItem value="Cultivation">Cultivation</MenuItem>
                      <MenuItem value="Livestock">Livestock</MenuItem>
                      <MenuItem value="Aquaculture">Aquaculture</MenuItem>
                      <MenuItem value="Circular">Circular</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{ bgcolor: '#1B4332', color: '#FFFFFF', borderRadius: 2, height: 40, fontWeight: 700, textTransform: 'none' }}
                    >
                      Add Type
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.08)' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
                Measurement Units & Custom Fields
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', mb: 2 }}>
                Configurable units available across all modules
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                {config.measurementUnits.map((u) => (
                  <Chip key={u} label={u} sx={{ fontWeight: 700, bgcolor: '#FAF9F5', border: '1px solid rgba(27,67,50,0.1)' }} />
                ))}
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
                Dynamic Custom Fields Schema
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {config.customFields.map((cf) => (
                  <Box key={cf.id} sx={{ p: 1.2, borderRadius: 2, bgcolor: '#FAF9F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>{cf.name}</Typography>
                    <Chip label={cf.appliesTo.join(', ')} size="small" sx={{ height: 18, fontSize: '0.65rem' }} />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* ========================================================================= */}
      {/* CONTEXTUAL DETAIL DRAWER (Read, Audit History & Output Log)               */}
      {/* ========================================================================= */}
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
              Location: {selectedRecord.zone || selectedRecord.location || 'Vincent\'s Farm'}
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

      {/* ========================================================================= */}
      {/* CONTEXTUAL ADD UNIVERSAL BATCH MODAL                                      */}
      {/* ========================================================================= */}
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
    </>
  );
}
