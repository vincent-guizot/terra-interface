import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Close, History, Inventory2Outlined, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { InventoryService } from '../../../services/inventoryService';

export default function InventoryLedgerHistoryDrawer({ open, onClose, item }) {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      InventoryService.getMovements(item?.id || item?.sku || item?.code)
        .then((data) => setMovements(data || []))
        .catch(() => setMovements([]))
        .finally(() => setLoading(false));
    }
  }, [open, item]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 600 },
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
            <History />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Immutable Transaction Ledger
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565' }}>
              {item ? `${item.name} (${item.sku || item.code})` : 'All Stock Movements'}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#5A7565' }}>
          <Close />
        </IconButton>
      </Box>

      {item && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(27,67,50,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: '#5A7565' }}>
              Current Derived Stock
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1B4332' }}>
              {item.inStock} {item.unit}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: '#5A7565', display: 'block' }}>
              Storage Location
            </Typography>
            <Chip
              label={item.location || item.locationName || 'Homestead Tool & Feed Shed A'}
              size="small"
              sx={{ bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332', fontWeight: 700 }}
            />
          </Box>
        </Paper>
      )}

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress size={32} sx={{ color: '#10B981' }} />
        </Box>
      ) : (
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#FFFFFF' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.75rem' }}>TIME</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.75rem' }}>TYPE</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.75rem' }} align="right">
                  DELTA
                </TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1B4332', fontSize: '0.75rem' }}>STEWARD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movements.map((mov) => {
                const isPositive = mov.quantityDelta > 0;
                return (
                  <TableRow key={mov.id} hover sx={{ bgcolor: '#FFFFFF' }}>
                    <TableCell sx={{ fontSize: '0.75rem', color: '#5A7565' }}>
                      {new Date(mov.timestamp || mov.date).toLocaleDateString()}{' '}
                      {new Date(mov.timestamp || mov.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={mov.type}
                        size="small"
                        sx={{
                          fontSize: '0.65rem',
                          height: 20,
                          fontWeight: 800,
                          bgcolor: isPositive ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                          color: isPositive ? '#065F46' : '#991B1B',
                        }}
                      />
                      {mov.notes && (
                        <Typography variant="caption" sx={{ display: 'block', color: '#748B7D', fontSize: '0.7rem' }}>
                          {mov.notes}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        icon={isPositive ? <ArrowUpward sx={{ fontSize: '0.8rem !important' }} /> : <ArrowDownward sx={{ fontSize: '0.8rem !important' }} />}
                        label={`${isPositive ? '+' : ''}${mov.quantityDelta} ${mov.unit}`}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          bgcolor: isPositive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                          color: isPositive ? '#065F46' : '#991B1B',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem', color: '#5A7565' }}>
                      {mov.stewardName || mov.steward || 'Vincent'}
                    </TableCell>
                  </TableRow>
                );
              })}
              {movements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4, color: '#5A7565' }}>
                    No ledger transactions recorded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      )}
    </Drawer>
  );
}
