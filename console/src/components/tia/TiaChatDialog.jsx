import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  Close,
  Remove,
  Send,
  Psychology,
  Spa,
  Bolt,
  Opacity,
  Loop,
  AutoAwesome,
} from '@mui/icons-material';
import TiaCharacterAvatar from './TiaCharacterAvatar.jsx';
import { useTia } from '../../context/TiaContext.jsx';
import { IntelligenceService } from '../../services/intelligenceService.js';

const QUICK_PROMPTS = [
  { label: '🌾 Panen Siap Petik', query: 'Apa saja hasil panen yang siap petik minggu ini?' },
  { label: '⚡ Otonomi Solar & Baterai', query: 'Bagaimana status panel surya dan baterai LiFePO4 saat ini?' },
  { label: '💧 Cadangan Air Cistern', query: 'Berapa liter cadangan air di tandon dan prakiraan hujan sore ini?' },
  { label: '🪰 Pakan BSF & Ayam', query: 'Berapa kilogram prepupae BSF yang dihasilkan untuk pakan ayam?' },
  { label: '📊 Audit Autonomi 94.2%', query: 'Jelaskan faktor penentu skor kemandirian 94.2% Vincent’s Farm.' },
];

export default function TiaChatDialog() {
  const {
    isOpen,
    isMinimized,
    closeTia,
    minimizeTia,
    maximizeTia,
    mood,
    setMood,
    pendingPrompt,
    clearPendingPrompt,
  } = useTia();

  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'tia',
      text: "Halo Vincent! Saya Tia (Terra Interface AI), asisten operasional Vincent's Farm (300 m²). Apa yang ingin Anda periksa atau optimalkan hari ini?",
      time: 'Just now',
      intentCategory: 'Ecological Intelligence',
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle external prompt trigger (e.g., from "Ask Terra AI" buttons)
  useEffect(() => {
    if (pendingPrompt) {
      handleSend(pendingPrompt);
      clearPendingPrompt();
    }
  }, [pendingPrompt]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputMsg).trim();
    if (!query) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMsg('');
    setIsTyping(true);
    setMood('thinking');

    try {
      const response = await IntelligenceService.queryAssistant(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `tia-${Date.now()}`,
          sender: 'tia',
          text: response.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          intentCategory: response.intentCategory,
          relatedZones: response.relatedZones,
        },
      ]);
      setMood('happy');
      setTimeout(() => setMood('idle'), 4000);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `tia-${Date.now()}`,
          sender: 'tia',
          text: `Menganalisis parameter Vincent's Farm untuk "${query}". Seluruh 7 zona terpadu beroperasi seimbang (Solar 4.8 kW, Air 6,850 L, BSF cycle aktif).`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          intentCategory: 'Ecosystem Telemetry',
        },
      ]);
      setMood('idle');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  // Render Minimized Pill Bar
  if (isMinimized) {
    return (
      <Paper
        elevation={6}
        onClick={maximizeTia}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1300,
          p: 1.2,
          px: 2,
          borderRadius: 1.5,
          bgcolor: '#144E36',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(20,78,54,0.3)',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: '#0F3827',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <TiaCharacterAvatar size="xs" mood={mood} />
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.84rem' }}>
            Tia AI • Vincent's Farm
          </Typography>
          <Typography variant="caption" sx={{ color: '#A7F3D0', fontSize: '0.7rem' }}>
            Klik untuk membuka percakapan
          </Typography>
        </Box>
      </Paper>
    );
  }

  // Render Full Floating Assistant Card (border-md)
  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: { xs: 12, sm: 24 },
        right: { xs: 12, sm: 24 },
        zIndex: 1300,
        width: { xs: 'calc(100vw - 24px)', sm: 400 },
        height: { xs: 'calc(100vh - 100px)', sm: 560 },
        maxHeight: '85vh',
        borderRadius: 1.5,
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(27,67,50,0.15)',
        boxShadow: '0 16px 40px -8px rgba(20, 78, 54, 0.28)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeInUp 0.25s ease-out',
      }}
    >
      {/* CARD HEADER */}
      <Box
        sx={{
          p: 1.8,
          px: 2,
          bgcolor: '#144E36',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <TiaCharacterAvatar size="sm" mood={mood} />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.92rem' }}>
                Tia
              </Typography>
              <Chip
                label="Terra Interface AI"
                size="small"
                sx={{
                  height: 18,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  borderRadius: 1,
                }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: '#D1FAE5', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Online • Vincent's Farm (300 m²)
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={minimizeTia}
            sx={{
              color: '#D1FAE5',
              p: 0.6,
              borderRadius: 1,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', color: '#FFFFFF' },
            }}
            title="Minimize"
          >
            <Remove fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={closeTia}
            sx={{
              color: '#D1FAE5',
              p: 0.6,
              borderRadius: 1,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', color: '#FFFFFF' },
            }}
            title="Close Tia"
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* QUICK SUGGESTION CHIPS */}
      <Box
        sx={{
          px: 1.5,
          py: 1,
          bgcolor: '#FAF9F5',
          borderBottom: '1px solid rgba(27,67,50,0.06)',
          display: 'flex',
          gap: 0.8,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          '&::-webkit-scrollbar': { height: 4 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(27,67,50,0.15)', borderRadius: 2 },
        }}
      >
        {QUICK_PROMPTS.map((p, idx) => (
          <Chip
            key={idx}
            label={p.label}
            size="small"
            onClick={() => handleSend(p.query)}
            sx={{
              borderRadius: 1.5,
              fontSize: '0.72rem',
              fontWeight: 700,
              bgcolor: '#FFFFFF',
              color: '#144E36',
              border: '1px solid rgba(27,67,50,0.12)',
              cursor: 'pointer',
              flexShrink: 0,
              '&:hover': {
                bgcolor: '#E8F3EC',
                borderColor: '#144E36',
              },
            }}
          />
        ))}
      </Box>

      {/* CHAT MESSAGES BODY */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          bgcolor: '#FAF9F5',
        }}
      >
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <Box
              key={m.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '92%',
                alignSelf: isUser ? 'flex-end' : 'flex-start',
              }}
            >
              {!isUser && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.4 }}>
                  <TiaCharacterAvatar size="xs" mood={mood} animate={false} />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#144E36', fontSize: '0.72rem' }}>
                    Tia
                  </Typography>
                  {m.intentCategory && (
                    <Chip
                      label={m.intentCategory}
                      size="small"
                      sx={{
                        height: 16,
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        bgcolor: 'rgba(20,78,54,0.08)',
                        color: '#144E36',
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Box>
              )}

              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 1.5,
                  bgcolor: isUser ? '#144E36' : '#FFFFFF',
                  color: isUser ? '#FFFFFF !important' : '#14281D',
                  border: isUser ? 'none' : '1px solid rgba(27,67,50,0.1)',
                  boxShadow: isUser ? '0 2px 8px rgba(20,78,54,0.2)' : '0 2px 8px rgba(27,67,50,0.04)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                    color: isUser ? '#FFFFFF !important' : '#14281D',
                  }}
                >
                  {m.text}
                </Typography>

                {m.relatedZones && m.relatedZones.length > 0 && (
                  <Box sx={{ mt: 1, pt: 0.8, borderTop: '1px dashed rgba(27,67,50,0.12)', display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {m.relatedZones.map((z, i) => (
                      <Chip
                        key={i}
                        label={z}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.65rem',
                          bgcolor: 'rgba(16,185,129,0.1)',
                          color: '#065F46',
                          borderRadius: 1,
                          fontWeight: 700,
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>

              <Typography variant="caption" sx={{ color: '#748B7D', fontSize: '0.65rem', mt: 0.3, px: 0.5 }}>
                {m.time}
              </Typography>
            </Box>
          );
        })}

        {isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, alignSelf: 'flex-start' }}>
            <TiaCharacterAvatar size="xs" mood="thinking" />
            <Box
              sx={{
                p: 1.2,
                px: 1.8,
                borderRadius: 1.5,
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(27,67,50,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 0.6,
              }}
            >
              <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                Tia sedang menganalisis ekosistem
              </Typography>
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
              </span>
            </Box>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* INPUT FOOTER */}
      <Box
        sx={{
          p: 1.5,
          bgcolor: '#FFFFFF',
          borderTop: '1px solid rgba(27,67,50,0.1)',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Tanya Tia tentang ekosistem farm..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
              fontSize: '0.84rem',
              bgcolor: '#FAF9F5',
              '& fieldset': {
                borderColor: 'rgba(27,67,50,0.15)',
              },
              '&:hover fieldset': {
                borderColor: '#144E36',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#144E36',
              },
            },
          }}
        />

        <Button
          variant="contained"
          onClick={() => handleSend()}
          disabled={!inputMsg.trim() || isTyping}
          sx={{
            minWidth: 44,
            width: 44,
            height: 40,
            p: 0,
            borderRadius: 1.5,
            bgcolor: '#144E36',
            color: '#FFFFFF !important',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#0F3827',
              color: '#FFFFFF !important',
            },
            '&.Mui-disabled': {
              bgcolor: 'rgba(20,78,54,0.3)',
              color: 'rgba(255,255,255,0.7) !important',
            },
          }}
          title="Kirim ke Tia"
        >
          <Send sx={{ fontSize: 18, color: '#FFFFFF' }} />
        </Button>
      </Box>
    </Paper>
  );
}
