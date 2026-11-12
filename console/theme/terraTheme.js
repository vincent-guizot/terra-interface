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
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(27, 67, 50, 0.12)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #143427 0%, #23563F 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 20,
          border: '1px solid rgba(27, 67, 50, 0.08)',
          boxShadow: '0 10px 30px -8px rgba(27, 67, 50, 0.05), 0 2px 6px rgba(27, 67, 50, 0.02)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid rgba(27, 67, 50, 0.08)',
          boxShadow: '0 10px 30px -8px rgba(27, 67, 50, 0.05), 0 2px 6px rgba(27, 67, 50, 0.02)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },
  },
});
export default terraTheme;
