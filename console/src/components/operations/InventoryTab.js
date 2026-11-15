import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import {
  Add,
  History
} from '@mui/icons-material';

export default function InventoryTab({
  inventory,
  searchQuery,
  setActiveInventoryItem,
  setStockMovementDrawerOpen,
  setLedgerHistoryDrawerOpen
}) {
  const filteredItems = inventory.items.filter(
    (i) =>
      (i.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (i.code || i.sku || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(27,67,50,0.08)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          p: 2.5,
          borderBottom: '1px solid rgba(27,67,50,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Homestead Inventory & Storage Stock
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            Double-entry transaction ledger, safety reorder thresholds, and physical storage bins
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip
            label="4 Storage Locations"
            size="small"
            sx={{ bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332', fontWeight: 800 }}
          />
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
          {filteredItems.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell sx={{ fontWeight: 800, color: '#1B4332' }}>
                {item.code || item.sku}
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1B4332' }}>
                {item.name}
              </TableCell>
              <TableCell>
                <Chip label={item.category} size="small" sx={{ height: 20, fontSize: '0.68rem', fontWeight: 700 }} />
              </TableCell>
              <TableCell sx={{ color: '#5A7565', fontSize: '0.82rem' }}>
                {item.location || item.locationName}
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: item.inStock <= item.minThreshold ? '#EF4444' : '#10B981',
                  }}
                >
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
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      color: '#1B4332',
                      borderColor: 'rgba(27,67,50,0.3)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
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
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      color: '#10B981',
                      borderColor: 'rgba(16,185,129,0.5)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
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
  );
}
