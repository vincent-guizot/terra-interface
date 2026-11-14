import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Button, Paper } from '@mui/material';
import terraTheme from '../theme/terraTheme';
import MainLayout from '../components/MainLayout';
import PageTransition from './components/motion/PageTransition';
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
  const location = useLocation();

  return (
    <ThemeProvider theme={terraTheme}>
      <CssBaseline />
      <MainLayout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><OverviewPage /></PageTransition>} />
            <Route path="/overview" element={<Navigate to="/" replace />} />
            <Route path="/map" element={<PageTransition><MapPage /></PageTransition>} />
            <Route path="/production" element={<PageTransition><ProductionPage /></PageTransition>} />
            <Route path="/resources" element={<PageTransition><ResourcesPage /></PageTransition>} />
            <Route path="/activities" element={<PageTransition><ActivitiesPage /></PageTransition>} />
            <Route path="/intelligence" element={<PageTransition><IntelligencePage /></PageTransition>} />
            <Route path="/operations" element={<PageTransition><OperationsPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </MainLayout>
    </ThemeProvider>
  );
}
