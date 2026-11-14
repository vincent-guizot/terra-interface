import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Button, Paper } from '@mui/material';
import terraTheme from '../theme/terraTheme';
import MainLayout from '../components/MainLayout';
import OverviewPage from '../pages/index';
import MapPage from '../pages/map';
import ProductionPage from '../pages/production';
import ResourcesPage from '../pages/resources';
import ActivitiesPage from '../pages/activities';
import IntelligencePage from '../pages/intelligence';
import OperationsPage from '../pages/operations/index';
import '../styles/globals.css';

function NotFoundPage() {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, display: 'inline-block', bgcolor: '#FFFFFF', border: '1px solid rgba(27,67,50,0.1)' }}>
        <Typography variant="h2" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
          404
        </Typography>
        <Typography variant="h6" sx={{ color: '#5A7565', mb: 3 }}>
          Page Not Found in Terra Interface
        </Typography>
        <Button variant="contained" href="/" sx={{ bgcolor: '#1B4332', borderRadius: 2.5, fontWeight: 700 }}>
          Back to Overview
        </Button>
      </Paper>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={terraTheme}>
      <CssBaseline />
      <MainLayout>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/overview" element={<Navigate to="/" replace />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/production" element={<ProductionPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
}
