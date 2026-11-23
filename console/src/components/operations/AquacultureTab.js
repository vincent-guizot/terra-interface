import React, { useState } from 'react';
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
  TableCell,
  TablePagination
} from '@mui/material';

export default function AquacultureTab({
  aquaculture,
  searchQuery = '',
  handleOpenDetail
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredBatches = (aquaculture.batches || []).filter((b) =>
    (b.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.code || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.pondName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.species || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1.5,
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(27,67,50,0.1)',
        boxShadow: '0 2px 8px rgba(27,67,50,0.03)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(27,67,50,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Aquaculture Ponds & Tilapia / Catfish Batches
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            Water quality sampling, population biomass, and FCR optimization
          </Typography>
        </Box>
        <Chip
          label={`${filteredBatches.length} Batches Active`}
          size="small"
          sx={{ bgcolor: 'rgba(2,132,199,0.12)', color: '#0369A1', fontWeight: 800, borderRadius: 1.5 }}
        />
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
          {filteredBatches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((b) => (
            <TableRow key={b.id} hover>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0284C7' }}>
                  {b.pondName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#748B7D' }}>
                  {b.code}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                  {b.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#5A7565' }}>
                  {b.species}
                </Typography>
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
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleOpenDetail(b)}
                  sx={{ borderRadius: 1.5, textTransform: 'none', borderColor: 'rgba(27,67,50,0.3)', color: '#1B4332' }}
                >
                  Pond Log
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {filteredBatches.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 3, color: '#748B7D' }}>
                No aquaculture batches found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredBatches.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
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
