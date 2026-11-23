import { createTheme } from '@mui/material/styles';

export const terraTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1B4332',      // Forest Green
      light: '#2D6A4F',
      dark: '#0F291E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981',    // Emerald Green
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#65A30D',    // Nature Lime / Leaf Green
      light: '#84CC16',
      dark: '#4D7C0F',
    },
    warning: {
      main: '#F59E0B',    // Solar Amber
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: '#0284C7',    // Aquaponics Sky Blue
      light: '#38BDF8',
      dark: '#0369A1',
    },
    background: {
      default: '#FAF9F5', // Warm White
      paper: '#FFFFFF',
    },
    text: {
      primary: '#14281D',
      secondary: '#486253',
    },
    divider: 'rgba(27, 67, 50, 0.08)',
  },
  typography: {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#14281D',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#14281D',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
      color: '#14281D',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: '#14281D',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#14281D',
    },
    h6: {
      fontWeight: 600,
      color: '#14281D',
    },
    subtitle1: {
      color: '#486253',
      fontWeight: 500,
    },
    subtitle2: {
      color: '#748B7D',
      fontWeight: 500,
    },
    body1: {
      color: '#14281D',
      lineHeight: 1.6,
    },
    body2: {
      color: '#486253',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 14px rgba(27, 67, 50, 0.12)',
          },
        },
        containedPrimary: {
          background: '#144E36',
          color: '#FFFFFF',
          '&:hover': {
            background: '#0F291E',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 8,
          border: '1px solid rgba(27, 67, 50, 0.1)',
          boxShadow: '0 4px 12px rgba(27, 67, 50, 0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid rgba(27, 67, 50, 0.1)',
          boxShadow: '0 4px 12px rgba(27, 67, 50, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6,
        },
      },
    },
  },
});
export default terraTheme;
