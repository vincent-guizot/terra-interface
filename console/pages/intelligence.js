import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  LinearProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  PsychologyOutlined,
  Send,
  LightbulbOutlined,
  TrendingUp,
  AutoGraph,
  CheckCircle,
  Spa,
  Bolt,
  Opacity,
  Loop,
  ArrowForward,
  SmartToyOutlined
} from '@mui/icons-material';
import { intelligenceData, homesteadProfile } from '../data/homesteadData';

export default function IntelligencePage() {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Greetings Vincent. I am Terra AI, your Home OS steward. All 7 zones are functioning in biological equilibrium at 94.2% circularity. Solar generation is currently 4.8 kW with 18.4 hours of battery buffer. What homestead decision would you like to explore?",
      time: '10:45 AM'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleSend = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMessage = {
      sender: 'user',
      text: query,
      time: 'Just now'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMsg('');
    setIsTyping(true);

    // Contextual responses simulating deep agronomic and home OS intelligence
    setTimeout(() => {
      let reply = "Analyzing Vincent's Farm ecosystem parameters across all 7 zones...";

      if (query.toLowerCase().includes('nitrogen') || query.toLowerCase().includes('nutrient') || query.toLowerCase().includes('cycle')) {
        reply = "Nutrient loop status: Zone 2 biofilter is converting 94% of ammonia into nitrates. Nitrate concentration in Pond Alpha is 44 ppm, which is within the safe margin but ideal for diverting to Zone 4 keyhole beds. 400 L/day of effluent is supplying 85% of plant nitrogen requirements with zero commercial fertilizer.";
      } else if (query.toLowerCase().includes('tilapia') || query.toLowerCase().includes('batch') || query.toLowerCase().includes('fish')) {
        reply = "Tilapia Batch B-24-TIL is at Day 88 with an average weight of 450g. Biological FCR (Feed Conversion Ratio) is optimal at 1.25 thanks to daily live BSF prepupae supplementation. Target harvest window opens Nov 28, projected yield is 45.0 kg.";
      } else if (query.toLowerCase().includes('solar') || query.toLowerCase().includes('rain') || query.toLowerCase().includes('energy')) {
        reply = "Solar array is generating 4.8 kW. Battery storage reached 91% SoC. With the light afternoon monsoon shower forecast at 17:30 (4mm expected), your 15.3 kWh LiFePO4 battery pack will easily sustain full aerators, misting, and residence loads for 18.4 hours without grid support.";
      } else if (query.toLowerCase().includes('improve') || query.toLowerCase().includes('recommend')) {
        reply = "Top 3 recommended improvements for this week: 1) Inoculate Keyhole Bed #2 with bush beans post-brassica harvest to fix nitrogen. 2) Apply fermented eggshell water-soluble calcium to indeterminant tomatoes to fortify against humidity mold. 3) Backwash the vortex rainwater pre-filter ahead of the monsoon showers.";
      } else {
        reply = `Homestead analysis for "${query}": Zone 1 micro-greenhouse humidity (78%) and Zone 4 soil moisture (38%) are synchronized. The closed-loop system is currently diverting 98.2% of all biomass away from external landfills into high-protein animal feed and mature bokashi compost.`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: reply,
          time: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleApplyRecommendation = (recTitle) => {
    setToastMsg(`Applied recommendation: "${recTitle}". Task queued for automation.`);
  };

  return (
    <>
      <Head>
        <title>Terra Interface — Intelligence (What should we improve?)</title>
      </Head>

      {/* HEADER: Answers "What should we improve?" */}
      <Box sx={{ mb: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#059669', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              06. Ecological AI • What should we improve?
            </Typography>
            <Chip
              label="Circularity: 94.2% Closed Loop"
              size="small"
              sx={{ bgcolor: 'rgba(5, 150, 105, 0.12)', color: '#047857', fontWeight: 700, fontSize: '0.72rem' }}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F291E', letterSpacing: '-0.02em' }}>
            Terra AI Ecological Insights & Advisory
          </Typography>
          <Typography variant="body1" sx={{ color: '#486253', maxWidth: 700 }}>
            Predictive modeling, biological balance analysis, weather risk mitigation, and interactive Home OS guidance for Vincent's Farm.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip
            icon={<CheckCircle fontSize="small" sx={{ color: '#10B981 !important' }} />}
            label="Ecosystem Balanced"
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.1)',
              fontWeight: 700,
              color: '#1B4332',
              p: 0.5
            }}
          />
        </Box>
      </Box>

      {/* PREDICTIVE KPI RIBBON */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        {intelligenceData.predictions.map((pred, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 4,
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(27,67,50,0.08)',
                boxShadow: '0 8px 24px -6px rgba(27,67,50,0.04)',
              }}
            >
              <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600, display: 'block', mb: 0.5 }}>
                {pred.metric}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', letterSpacing: '-0.02em', mb: 0.5 }}>
                {pred.value}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>
                  {pred.change}
                </Typography>
                <Chip label={`${pred.confidence} Conf.`} size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332' }} />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* MAIN TWO-COLUMN LAYOUT: TERRA AI ASSISTANT & STRATEGIC ADVISORIES */}
      <Grid container spacing={3}>
        {/* Left: Interactive Terra AI Assistant Chat */}
        <Grid item xs={12} lg={7}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
              display: 'flex',
              flexDirection: 'column',
              height: 560,
              overflow: 'hidden',
            }}
          >
            {/* Assistant Header */}
            <Box
              sx={{
                p: 2.5,
                borderBottom: '1px solid rgba(27,67,50,0.08)',
                bgcolor: 'rgba(250, 249, 245, 0.7)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 38, height: 38, borderRadius: 2.5, bgcolor: '#1B4332', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SmartToyOutlined sx={{ color: '#10B981', fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332', lineHeight: 1.2 }}>
                    Terra AI Assistant
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                    Trained on Permaculture & Closed-Loop Homestead Physics
                  </Typography>
                </Box>
              </Box>
              <Chip label="Online & Monitoring" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.12)', color: '#065F46', fontWeight: 700 }} />
            </Box>

            {/* Quick Prompt Starters */}
            <Box sx={{ px: 2, py: 1.2, borderBottom: '1px solid rgba(27,67,50,0.06)', bgcolor: '#FAF9F5', display: 'flex', gap: 1, overflowX: 'auto' }}>
              {intelligenceData.quickPrompts.map((prompt, idx) => (
                <Chip
                  key={idx}
                  label={prompt}
                  clickable
                  onClick={() => handleSend(prompt)}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.74rem',
                    bgcolor: '#FFFFFF',
                    border: '1px solid rgba(27,67,50,0.1)',
                    color: '#1B4332',
                    '&:hover': { bgcolor: '#F0F6F1' }
                  }}
                />
              ))}
            </Box>

            {/* Chat Messages Body */}
            <Box
              sx={{
                flexGrow: 1,
                p: 2.5,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: '#FAF9F5',
              }}
            >
              {messages.map((m, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '85%',
                      p: 2,
                      borderRadius: 3.5,
                      bgcolor: m.sender === 'user' ? '#1B4332' : '#FFFFFF',
                      color: m.sender === 'user' ? '#FFFFFF' : '#14281D',
                      boxShadow: m.sender === 'user' ? '0 4px 14px rgba(27,67,50,0.15)' : '0 4px 12px rgba(27,67,50,0.04)',
                      border: m.sender === 'user' ? 'none' : '1px solid rgba(27,67,50,0.08)',
                    }}
                  >
                    <Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: '0.88rem' }}>
                      {m.text}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#748B7D', mt: 0.5, px: 1, fontSize: '0.7rem' }}>
                    {m.sender === 'user' ? 'Vincent' : 'Terra AI'} • {m.time}
                  </Typography>
                </Box>
              ))}

              {isTyping && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                  <Typography variant="caption" sx={{ color: '#5A7565', fontStyle: 'italic' }}>
                    Terra AI is computing telemetry across 7 zones...
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Message Input Box */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(27,67,50,0.08)', bgcolor: '#FFFFFF' }}>
              <TextField
                fullWidth
                placeholder="Ask Terra AI about nutrient balance, harvest timing, solar allocation..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleSend()}
                        disabled={!inputMsg.trim()}
                        sx={{
                          bgcolor: inputMsg.trim() ? '#1B4332' : '#E2E8F0',
                          color: '#FFFFFF',
                          '&:hover': { bgcolor: '#123124' },
                          p: 0.8
                        }}
                      >
                        <Send fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 3,
                    bgcolor: '#FAF9F5',
                    '& fieldset': { borderColor: 'rgba(27,67,50,0.12)' }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Right: AI Strategic Insights & Actionable Recommendations */}
        <Grid item xs={12} lg={5}>
          {/* Active AI Insights */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
              mb: 3,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Strategic AI Insights
                </Typography>
                <Typography variant="body2" sx={{ color: '#5A7565' }}>
                  High-leverage homestead synergies
                </Typography>
              </Box>
              <LightbulbOutlined sx={{ color: '#F59E0B' }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {intelligenceData.insights.map((ins) => (
                <Box
                  key={ins.id}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: '#FAF9F5',
                    border: `1.5px solid ${ins.badgeColor}30`,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                      {ins.title}
                    </Typography>
                    <Chip
                      label={ins.severity}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        bgcolor: `${ins.badgeColor}18`,
                        color: ins.badgeColor
                      }}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ color: '#486253', fontSize: '0.82rem', mb: 1.5, lineHeight: 1.5 }}>
                    {ins.body}
                  </Typography>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleApplyRecommendation(ins.actionText)}
                    sx={{
                      borderRadius: 2,
                      borderColor: ins.badgeColor,
                      color: ins.badgeColor,
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      '&:hover': { bgcolor: `${ins.badgeColor}10` }
                    }}
                  >
                    {ins.actionText}
                  </Button>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Actionable Recommendations Board */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332', mb: 0.5 }}>
              Actionable Recommendations
            </Typography>
            <Typography variant="body2" sx={{ color: '#5A7565', mb: 2 }}>
              Targeted regenerative actions for specific zones
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {intelligenceData.recommendations.map((rec, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 1.8,
                    borderRadius: 2.5,
                    bgcolor: '#FAF9F5',
                    border: '1px solid rgba(27,67,50,0.06)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                      {rec.title}
                    </Typography>
                    <Chip label={rec.zone} size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332' }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', mb: 1 }}>
                    {rec.reason}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => handleApplyRecommendation(rec.title)}
                    sx={{ color: '#10B981', fontWeight: 700, textTransform: 'none', p: 0, fontSize: '0.75rem' }}
                  >
                    Queue Action &rarr;
                  </Button>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* SNACKBAR */}
      <Snackbar
        open={Boolean(toastMsg)}
        autoHideDuration={4000}
        onClose={() => setToastMsg('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastMsg('')} severity="success" sx={{ borderRadius: 3, bgcolor: '#1B4332', color: '#FFFFFF', fontWeight: 600 }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
