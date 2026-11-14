import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Grid,
  TextField,
  MenuItem
} from '@mui/material';
import {
  Spa
} from '@mui/icons-material';

export default function ConfigTab({
  config,
  newTypeForm,
  setNewTypeForm,
  handleAddCustomType
}) {
  return (
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
              <Box
                key={t.id}
                sx={{
                  p: 1.8,
                  borderRadius: 2.5,
                  bgcolor: '#FAF9F5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Spa sx={{ color: '#10B981', fontSize: 20 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                      {t.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#5A7565' }}>
                      Domain: {t.domain}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={`Unit: ${t.defaultUnit}`}
                  size="small"
                  sx={{ fontWeight: 700, bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332' }}
                />
              </Box>
            ))}
          </Box>

          {/* Add New Custom Type Form */}
          <Box
            component="form"
            onSubmit={handleAddCustomType}
            sx={{ p: 2, borderRadius: 3, bgcolor: '#F3F8F4', border: '1px dashed #10B981' }}
          >
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
                  sx={{
                    bgcolor: '#1B4332',
                    color: '#FFFFFF',
                    borderRadius: 2,
                    height: 40,
                    fontWeight: 700,
                    textTransform: 'none',
                  }}
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
              <Chip
                key={u}
                label={u}
                sx={{ fontWeight: 700, bgcolor: '#FAF9F5', border: '1px solid rgba(27,67,50,0.1)' }}
              />
            ))}
          </Box>

          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
            Dynamic Custom Fields Schema
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {config.customFields.map((cf) => (
              <Box
                key={cf.id}
                sx={{
                  p: 1.2,
                  borderRadius: 2,
                  bgcolor: '#FAF9F5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332' }}>
                  {cf.name}
                </Typography>
                <Chip label={cf.appliesTo.join(', ')} size="small" sx={{ height: 18, fontSize: '0.65rem' }} />
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
