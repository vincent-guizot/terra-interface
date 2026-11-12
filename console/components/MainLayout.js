import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import MenuBar from './MenuBar';
import { Spa, CheckCircle, AddCircleOutline } from '@mui/icons-material';

export default function MainLayout({ children, title = "Terra Interface — Home OS", description = "Personal Self-Sustaining Home Operating System" }) {
  const [quickLogOpen, setQuickLogOpen] = useState(false);
  const [quickLogType, setQuickLogType] = useState('harvest');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Quick Log Form States
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    zone: 'Zone 1: Micro-Greenhouse',
    notes: '',
  });

  const handleQuickLogSubmit = (e) => {
    e.preventDefault();
    setQuickLogOpen(false);
    setToastMsg(`Successfully recorded ${quickLogType}: ${formData.item || 'New entry'} in ${formData.zone}!`);
    setToastOpen(true);
    setFormData({ item: '', quantity: '', zone: 'Zone 1: Micro-Greenhouse', notes: '' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#FAF9F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Global Horizontal Top Navigation */}
      <MenuBar onOpenQuickLog={() => setQuickLogOpen(true)} />

      {/* Main Page Canvas */}
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 2.5, md: 4 } }}>
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>

      {/* Modern Nature-Tech Minimal Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: { xs: 2, md: 4 },
          borderTop: '1px solid rgba(27, 67, 50, 0.08)',
          bgcolor: 'rgba(250, 249, 245, 0.8)',
          mt: 'auto',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Spa sx={{ color: '#10B981', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                TERRA INTERFACE
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565' }}>
                • Personal Self-Sustaining Home Operating System
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                Implementation: Vincent's Farm (300 m² Homestead, West Java, ID)
              </Typography>
              <Chip
                label="Ecosystem 94.2% Autonomous"
                size="small"
                sx={{
                  bgcolor: 'rgba(16, 185, 129, 0.12)',
                  color: '#065F46',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* EMBEDDED QUICK LOG MODAL (Contextual CRUD across all pages) */}
      <Dialog
        open={quickLogOpen}
        onClose={() => setQuickLogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1.5,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(27, 67, 50, 0.1)',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AddCircleOutline sx={{ color: '#10B981' }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                Homestead Quick Log
              </Typography>
            </Box>
            <Chip
              label={quickLogType.toUpperCase()}
              size="small"
              sx={{ bgcolor: 'rgba(16, 185, 129, 0.12)', color: '#065F46', fontWeight: 800 }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            Fast contextual logging for Vincent's Farm operations.
          </Typography>
        </DialogTitle>

        <form onSubmit={handleQuickLogSubmit}>
          <DialogContent sx={{ pt: 1 }}>
            {/* Log Type Selector */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
              {[
                { id: 'harvest', label: 'Log Harvest' },
                { id: 'activity', label: 'Add Activity' },
                { id: 'resource', label: 'Resource Entry' },
              ].map((tab) => (
                <Chip
                  key={tab.id}
                  label={tab.label}
                  clickable
                  onClick={() => setQuickLogType(tab.id)}
                  sx={{
                    fontWeight: 700,
                    bgcolor: quickLogType === tab.id ? '#1B4332' : 'rgba(27,67,50,0.06)',
                    color: quickLogType === tab.id ? '#FFFFFF' : '#486253',
                  }}
                />
              ))}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  required
                  label={quickLogType === 'harvest' ? 'Item / Variety Harvested' : quickLogType === 'activity' ? 'Activity Name' : 'Resource Metric'}
                  placeholder={quickLogType === 'harvest' ? 'e.g. Nile Tilapia, Bok Choy' : 'e.g. Compost aerated'}
                  value={formData.item}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  required
                  label={quickLogType === 'harvest' ? 'Quantity (kg/pcs)' : 'Value / Duration'}
                  placeholder="e.g. 4.5 kg"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Target Zone"
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  <MenuItem value="Zone 1: Micro-Greenhouse">Zone 1: Smart Micro-Greenhouse</MenuItem>
                  <MenuItem value="Zone 2: Aquaponics">Zone 2: Aquaponics & Tilapia Pond</MenuItem>
                  <MenuItem value="Zone 3: Poultry Hub">Zone 3: Intensive Poultry & BSF Hub</MenuItem>
                  <MenuItem value="Zone 4: Permaculture Beds">Zone 4: Permaculture Food Forest</MenuItem>
                  <MenuItem value="Zone 5: Solar Array">Zone 5: Solar Array & Battery Hub</MenuItem>
                  <MenuItem value="Zone 6: Water Catchment">Zone 6: Water Catchment & Filtration</MenuItem>
                  <MenuItem value="Zone 7: Eco-Living Lab">Zone 7: Eco-Living Quarters & Nursery</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Observations / Notes"
                  placeholder="Optional notes regarding quality, soil condition, or feeder dosage..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button
              onClick={() => setQuickLogOpen(false)}
              sx={{ color: '#5A7565', textTransform: 'none', fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#1B4332',
                color: '#FFFFFF',
                borderRadius: 2.5,
                px: 3,
                textTransform: 'none',
                fontWeight: 700,
                '&:hover': { bgcolor: '#133326' },
              }}
            >
              Save Record
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* FEEDBACK TOAST */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          sx={{
            width: '100%',
            borderRadius: 3,
            bgcolor: '#1B4332',
            color: '#FFFFFF',
            fontWeight: 600,
            '& .MuiAlert-icon': { color: '#10B981' },
          }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
