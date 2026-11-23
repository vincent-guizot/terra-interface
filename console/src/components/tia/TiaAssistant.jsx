import React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import TiaCharacterAvatar from './TiaCharacterAvatar.jsx';
import TiaChatDialog from './TiaChatDialog.jsx';
import { useTia } from '../../context/TiaContext.jsx';

export default function TiaAssistant() {
  const {
    isOpen,
    isMinimized,
    openTia,
    mood,
    peekMessage,
    showPeek,
    dismissPeek,
  } = useTia();

  return (
    <>
      {/* FLOATING DIALOG CARD (When Opened) */}
      <TiaChatDialog />

      {/* FLOATING TRIGGER BUTTON (When Closed or Minimized) */}
      {!isOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: 18, sm: 24 },
            right: { xs: 18, sm: 24 },
            zIndex: 1200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 1.5,
          }}
        >
          {/* Proactive Speech Bubble Peek */}
          {showPeek && peekMessage && (
            <Box
              sx={{
                maxWidth: 290,
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(20, 78, 54, 0.18)',
                boxShadow: '0 8px 24px -4px rgba(20, 78, 54, 0.16)',
                position: 'relative',
                cursor: 'pointer',
                animation: 'bounceIn 0.3s ease-out',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -6,
                  right: 24,
                  width: 12,
                  height: 12,
                  bgcolor: '#FFFFFF',
                  borderRight: '1px solid rgba(20, 78, 54, 0.18)',
                  borderBottom: '1px solid rgba(20, 78, 54, 0.18)',
                  transform: 'rotate(45deg)',
                },
              }}
              onClick={() => openTia()}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#144E36', fontSize: '0.72rem' }}>
                  Tia AI • Insight
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissPeek();
                  }}
                  sx={{ p: 0.2, color: '#748B7D', '&:hover': { color: '#144E36' } }}
                  title="Dismiss"
                >
                  <Close sx={{ fontSize: 13 }} />
                </IconButton>
              </Box>

              <Typography variant="body2" sx={{ fontSize: '0.78rem', color: '#14281D', lineHeight: 1.4 }}>
                {peekMessage}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 0.8,
                  fontWeight: 700,
                  color: '#047857',
                  fontSize: '0.68rem',
                }}
              >
                Klik untuk chat dengan Tia →
              </Typography>
            </Box>
          )}

          {/* Main Floating Avatar Button */}
          <Button
            variant="contained"
            onClick={() => openTia()}
            sx={{
              borderRadius: 1.5,
              bgcolor: '#144E36',
              color: '#FFFFFF !important',
              p: 1,
              px: 1.8,
              minHeight: 48,
              boxShadow: '0 8px 24px rgba(20, 78, 54, 0.32)',
              border: '1.5px solid rgba(16, 185, 129, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              textTransform: 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                bgcolor: '#0F3827',
                color: '#FFFFFF !important',
                transform: 'translateY(-3px) scale(1.02)',
                boxShadow: '0 12px 28px rgba(20, 78, 54, 0.4)',
                borderColor: '#10B981',
              },
            }}
          >
            <TiaCharacterAvatar size="sm" mood={mood} />
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.84rem', lineHeight: 1.2 }}>
                Tia AI
              </Typography>
              <Typography variant="caption" sx={{ color: '#A7F3D0', fontSize: '0.68rem', display: 'block', fontWeight: 600 }}>
                Ask Terra AI
              </Typography>
            </Box>
          </Button>
        </Box>
      )}
    </>
  );
}
