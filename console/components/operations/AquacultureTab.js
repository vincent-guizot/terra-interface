import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';

export default function AquacultureTab({
  aquaculture,
  handleOpenDetail
}) {
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
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Pond Log
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
