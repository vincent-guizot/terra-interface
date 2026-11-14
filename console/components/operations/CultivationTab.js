import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

export default function CultivationTab({
  cultivation,
  searchQuery,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  handleOpenDetail,
  handleDeleteRecord,
  getStatusColor,
}) {
  const filteredBatches = cultivation.batches.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
      <Box
        sx={{
          p: 2.5,
          borderBottom: '1px solid rgba(27,67,50,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Growing Batches & Plant Catalog
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            Universal batch lifecycle management with multiple harvest records
          </Typography>
        </Box>
        <Chip
          label={`${cultivation.batches.length} Active Batches`}
          size="small"
          sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 800 }}
        />
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
          {filteredBatches
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
                        sx={{
                          borderRadius: 2,
                          fontSize: '0.75rem',
                          py: 0.3,
                          px: 1,
                          textTransform: 'none',
                          borderColor: 'rgba(27,67,50,0.18)',
                          color: '#1B4332',
                        }}
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
        count={filteredBatches.length}
        page={page}
        onPageChange={(e, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
}
