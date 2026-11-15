import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TooltipProvider } from '../../components/ui/tooltip.jsx';
import store from '../store/index.js';
import terraTheme from '../../theme/terraTheme.js';

// Instantiate TanStack Query client with homestead defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000, // 30 seconds
    },
  },
});

export default function AppProviders({ children }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider theme={terraTheme}>
          <CssBaseline />
          <TooltipProvider delayDuration={200}>
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </TooltipProvider>
        </MuiThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
