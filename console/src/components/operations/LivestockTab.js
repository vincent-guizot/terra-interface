import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';

export default function LivestockTab({
  livestock,
  handleOpenDetail
}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 4,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(27,67,50,0.08)',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                Homestock Flocks & Herds (Chickens, Goats & Sheep)
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565' }}>
                Ayam KUB, Cornish Cross, Joper, Kambing Boer, and Domba Garut tracking
              </Typography>
            </Box>
            <Chip
              label="Zero Mortality"
              size="small"
              sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 800 }}
            />
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
                    <Chip
                      label={ani.species}
                      size="small"
                      sx={{ bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332', fontWeight: 800, fontSize: '0.68rem' }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#10B981' }}>
                      {ani.health}
                    </Typography>
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
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                      {b.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#5A7565' }}>
                      {b.breed} • {b.species}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{b.currentCount} birds</TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', color: '#486253' }}>{b.feedingRatio}</TableCell>
                  <TableCell>
                    <Chip
                      label={b.status}
                      size="small"
                      sx={{ bgcolor: 'rgba(16,185,129,0.14)', color: '#065F46', fontWeight: 800 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpenDetail(b)}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
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
  );
}
