import React, { useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Send,
  LightbulbOutlined,
  CheckCircle,
  Spa,
  Bolt,
  Opacity,
  Loop,
  SmartToyOutlined,
  Biotech,
  Calculate,
  CloudQueue,
  DeleteOutline,
  Check,
} from '@mui/icons-material';
import { intelligenceData } from '../data/homesteadData';
import { IntelligenceService } from '../services/intelligenceService';
import { PlantDiagnosisDrawer, AutonomyAuditDrawer } from '../features/intelligence';

export default function IntelligencePage() {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Greetings Vincent. I am Terra AI, your Home OS steward. All 7 zones are functioning in biological equilibrium at 96.6% circularity. Solar generation is currently 4.8 kW with 18.4 hours of battery buffer. What homestead decision would you like to explore?",
      time: '10:45 AM',
      intentCategory: 'General Homestead Status',
      relatedZones: ['Zone 1: Micro-Climate Nursery', 'Zone 7: Eco-Living Quarters & Lab'],
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Live Autonomy & Insights State
  const [autonomy, setAutonomy] = useState({
    overallAutonomyScore: 91.8,
    foodScore: 84.0,
    waterScore: 94.5,
    energyScore: 96.8,
    circularityScore: 96.6,
    rating: 'EXCELLENT',
    metrics: {
      dailyCaloriesProduced: 4200,
      dailyCalorieTarget: 5000,
      cisternStorageLiters: 6850,
      waterAutonomyDays: 20.1,
      solarDailyGenerationKwh: 22.4,
      batteryAutonomyHours: 18.4,
      wasteDivertedPercent: 96.6,
    },
  });

  const [insights, setInsights] = useState([
    {
      id: 'rec-01',
      category: 'Soil',
      priority: 'Immediate',
      actionTitle: 'Inoculate Keyhole Bed #2 with bush beans post-harvest',
      targetZone: 'Zone 4: Permaculture Beds',
      expectedBenefit: 'Natural biological nitrogen fixation +30g N/m² for succeeding brassica crops',
      automatedDispatchable: false,
      status: 'PENDING',
    },
    {
      id: 'rec-02',
      category: 'Energy Storage',
      priority: 'Suggested',
      actionTitle: 'Pre-cool mushroom storage chamber with solar surplus',
      targetZone: 'Zone 7: Eco-Living Quarters & Lab',
      expectedBenefit: 'Shifts 1.2 kWh of nighttime grid load to daytime solar peak',
      automatedDispatchable: true,
      status: 'PENDING',
    },
    {
      id: 'rec-03',
      category: 'Livestock Feed',
      priority: 'Suggested',
      actionTitle: 'Supplement Layer Flock with 2.5 kg live BSF prepupae',
      targetZone: 'Zone 3: Micro-Livestock Haven',
      expectedBenefit: 'Boosts crude protein intake to 42% and elevates eggshell calcium assimilation',
      automatedDispatchable: false,
      status: 'PENDING',
    },
    {
      id: 'rec-04',
      category: 'Circular',
      priority: 'Immediate',
      actionTitle: 'Aerate Bokashi Pile #1: Turn thermophilic core',
      targetZone: 'Zone 6: Circular Biomass & Energy Hub',
      expectedBenefit: 'Prevents anaerobic thermal stall; ensures weed seed destruction at 62°C',
      automatedDispatchable: false,
      status: 'PENDING',
    },
  ]);

  const [forecast, setForecast] = useState({
    expectedRainfallMm: 18.0,
    probabilityOfPrecipitationPercent: 85,
    peakRainWindow: '17:00 - 18:30',
    expectedRoofCatchmentLiters: 2142,
    advisory: 'Tropical orographic monsoon approaching. Secure loose nursery cloches and verify cistern inlet filters.',
  });

  // Drawer states
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  // Load live data from service on mount
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const [autonomyRes, insightsRes, forecastRes] = await Promise.allSettled([
          IntelligenceService.getAutonomyScores(),
          IntelligenceService.getInsights(),
          IntelligenceService.getForecast(),
        ]);

        if (mounted) {
          if (autonomyRes.status === 'fulfilled' && autonomyRes.value) {
            setAutonomy(autonomyRes.value);
          }
          if (insightsRes.status === 'fulfilled' && Array.isArray(insightsRes.value) && insightsRes.value.length > 0) {
            setInsights(insightsRes.value);
          }
          if (forecastRes.status === 'fulfilled' && forecastRes.value) {
            setForecast(forecastRes.value);
          }
        }
      } catch (e) {
        console.warn('Using baseline intelligence state:', e);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMessage = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMsg('');
    setIsTyping(true);

    try {
      const response = await IntelligenceService.queryAssistant(query);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: response.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          intentCategory: response.intentCategory,
          relatedZones: response.relatedZones,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: `Analyzed Vincent's Farm ecosystem parameters for "${query}". All 7 zones remain in bio-physical balance.`,
          time: 'Just now',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleApplyRecommendation = async (recId, recTitle) => {
    try {
      await IntelligenceService.applyRecommendation(recId);
      setInsights((prev) => prev.filter((r) => r.id !== recId));

      // Refresh autonomy scores to reflect dynamic feedback loop
      const updatedAutonomy = await IntelligenceService.getAutonomyScores();
      setAutonomy(updatedAutonomy);

      setToastMsg(`Applied recommendation: "${recTitle}". Task dispatched & autonomy recalculated.`);
    } catch (err) {
      setToastMsg(`Failed to apply recommendation: ${err.message}`);
    }
  };

  const handleDismissRecommendation = async (recId, recTitle) => {
    try {
      await IntelligenceService.dismissRecommendation(recId);
      setInsights((prev) => prev.filter((r) => r.id !== recId));
      setToastMsg(`Dismissed recommendation: "${recTitle}".`);
    } catch (err) {
      setToastMsg(`Failed to dismiss recommendation: ${err.message}`);
    }
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
              label={`Circularity: ${autonomy.circularityScore || 96.6}% Closed Loop`}
              size="small"
              sx={{ bgcolor: 'rgba(5, 150, 105, 0.12)', color: '#047857', fontWeight: 700, fontSize: '0.72rem' }}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F291E', letterSpacing: '-0.02em' }}>
            Terra AI Ecological Insights & Advisory
          </Typography>
          <Typography variant="body1" sx={{ color: '#486253', maxWidth: 700 }}>
            Predictive modeling, biological balance analysis, weather risk mitigation, and interactive Home OS guidance for Vincent&apos;s Farm (300 m²).
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setIsDiagnosisOpen(true)}
            startIcon={<Biotech sx={{ color: '#059669' }} />}
            sx={{
              borderRadius: 3,
              borderColor: 'rgba(27,67,50,0.18)',
              color: '#1B4332',
              bgcolor: '#FFFFFF',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#F0F6F1', borderColor: '#1B4332' },
            }}
          >
            Foliage Deficiency Diagnosis
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => setIsAuditOpen(true)}
            startIcon={<Calculate />}
            sx={{
              borderRadius: 3,
              bgcolor: '#1B4332',
              color: '#FFFFFF',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#123124' },
            }}
          >
            Autonomy Equation Audit
          </Button>
        </Box>
      </Box>

      {/* WEATHER FORECAST & CATCHMENT ADVISORY BANNER */}
      {forecast && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3.5,
            borderRadius: 3.5,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(2, 132, 199, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2.5,
                bgcolor: 'rgba(2, 132, 199, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CloudQueue sx={{ color: '#0284C7' }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                West Java Microclimate Forecast • Monsoon Rain Window: {forecast.peakRainWindow}
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                {forecast.advisory}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              icon={<Opacity fontSize="small" sx={{ color: '#0284C7 !important' }} />}
              label={`+${forecast.expectedRoofCatchmentLiters} L Projected Catchment`}
              size="small"
              sx={{ bgcolor: 'rgba(2, 132, 199, 0.08)', color: '#0369A1', fontWeight: 700 }}
            />
            <Chip
              label={`${forecast.probabilityOfPrecipitationPercent}% Precipitation Probability`}
              size="small"
              sx={{ bgcolor: '#F0F6F1', color: '#1B4332', fontWeight: 700 }}
            />
          </Box>
        </Paper>
      )}

      {/* PREDICTIVE KPI RIBBON: DYNAMIC FROM AUTONOMY ENGINE */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            onClick={() => setIsAuditOpen(true)}
            sx={{
              p: 2.5,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1.5px solid rgba(27,67,50,0.12)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.04)',
              cursor: 'pointer',
              '&:hover': { borderColor: '#1B4332' },
            }}
          >
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600, display: 'block', mb: 0.5 }}>
              Composite Autonomy Index
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', letterSpacing: '-0.02em', mb: 0.5 }}>
              {autonomy.overallAutonomyScore}%
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>
                Rating: {autonomy.rating}
              </Typography>
              <Chip label="Audit &rarr;" size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332' }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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
              Caloric Self-Sufficiency
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', letterSpacing: '-0.02em', mb: 0.5 }}>
              {autonomy.foodScore}%
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>
                {autonomy.metrics?.dailyCaloriesProduced || 4200} / {autonomy.metrics?.dailyCalorieTarget || 5000} kcal/day
              </Typography>
              <Chip label="Food Pillar" size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'rgba(5, 150, 105, 0.1)', color: '#047857' }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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
              Water Autonomy Buffer
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', letterSpacing: '-0.02em', mb: 0.5 }}>
              {autonomy.metrics?.waterAutonomyDays || 20.1} Days
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: '#0284C7', fontWeight: 700 }}>
                {autonomy.metrics?.cisternStorageLiters || 6850} L in Cisterns
              </Typography>
              <Chip label="Water Pillar" size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'rgba(2, 132, 199, 0.1)', color: '#0369A1' }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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
              Battery Storage Buffer
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1B4332', letterSpacing: '-0.02em', mb: 0.5 }}>
              {autonomy.metrics?.batteryAutonomyHours || 18.4} Hours
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: '#D97706', fontWeight: 700 }}>
                {autonomy.metrics?.solarDailyGenerationKwh || 22.4} kWh Solar/Day
              </Typography>
              <Chip label="Energy Pillar" size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'rgba(217, 119, 6, 0.1)', color: '#B45309' }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* MAIN TWO-COLUMN LAYOUT: TERRA AI ASSISTANT & ACTIONABLE RECOMMENDATIONS */}
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
              height: 580,
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
                    '&:hover': { bgcolor: '#F0F6F1' },
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

                    {m.intentCategory && (
                      <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(27,67,50,0.06)', display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                        <Chip
                          label={m.intentCategory}
                          size="small"
                          sx={{ height: 18, fontSize: '0.62rem', fontWeight: 700, bgcolor: 'rgba(27,67,50,0.08)', color: '#1B4332' }}
                        />
                        {m.relatedZones?.map((z, zIdx) => (
                          <Chip
                            key={zIdx}
                            label={z}
                            size="small"
                            sx={{ height: 18, fontSize: '0.62rem', fontWeight: 600, bgcolor: '#FAF9F5', color: '#5A7565' }}
                          />
                        ))}
                      </Box>
                    )}
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
                placeholder="Ask Terra AI about nutrient balance, harvest timing, solar allocation, weather..."
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
                          p: 0.8,
                        }}
                      >
                        <Send fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 3,
                    bgcolor: '#FAF9F5',
                    '& fieldset': { borderColor: 'rgba(27,67,50,0.12)' },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Right: Dynamic Actionable Recommendations Board */}
        <Grid item xs={12} lg={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(27,67,50,0.08)',
              boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)',
              display: 'flex',
              flexDirection: 'column',
              height: 580,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Actionable AI Insights ({insights.length})
                </Typography>
                <Typography variant="body2" sx={{ color: '#5A7565' }}>
                  Targeted regenerative interventions with live acceptance
                </Typography>
              </Box>
              <LightbulbOutlined sx={{ color: '#F59E0B' }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', flexGrow: 1, pr: 0.5 }}>
              {insights.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <CheckCircle sx={{ color: '#10B981', fontSize: 48, mb: 1.5 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332' }}>
                    All Recommendations Addressed!
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#5A7565' }}>
                    Ecosystem across all 7 zones is currently in optimal biological equilibrium.
                  </Typography>
                </Box>
              ) : (
                insights.map((rec) => {
                  const isImmediate = rec.priority === 'Immediate';
                  const badgeColor = isImmediate ? '#DC2626' : rec.priority === 'Suggested' ? '#0284C7' : '#059669';

                  return (
                    <Box
                      key={rec.id}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: '#FAF9F5',
                        border: `1.5px solid ${badgeColor}30`,
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                          {rec.actionTitle || rec.title}
                        </Typography>
                        <Chip
                          label={rec.priority || rec.severity || 'Suggested'}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            bgcolor: `${badgeColor}18`,
                            color: badgeColor,
                          }}
                        />
                      </Box>

                      <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700, display: 'block', mb: 0.5 }}>
                        {rec.targetZone || rec.zone}
                      </Typography>

                      <Typography variant="body2" sx={{ color: '#486253', fontSize: '0.82rem', mb: 1.5, lineHeight: 1.5 }}>
                        {rec.expectedBenefit || rec.body || rec.reason}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button
                          size="small"
                          variant="text"
                          onClick={() => handleDismissRecommendation(rec.id, rec.actionTitle || rec.title)}
                          startIcon={<DeleteOutline fontSize="small" />}
                          sx={{
                            color: '#64748B',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            '&:hover': { bgcolor: 'rgba(100, 116, 139, 0.08)' },
                          }}
                        >
                          Dismiss
                        </Button>

                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleApplyRecommendation(rec.id, rec.actionTitle || rec.title)}
                          startIcon={<Check fontSize="small" />}
                          sx={{
                            borderRadius: 2,
                            bgcolor: '#1B4332',
                            color: '#FFFFFF',
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            '&:hover': { bgcolor: '#123124' },
                          }}
                        >
                          Accept & Dispatch
                        </Button>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* CONTEXTUAL DRAWERS */}
      <PlantDiagnosisDrawer
        open={isDiagnosisOpen}
        onClose={() => setIsDiagnosisOpen(false)}
        onDiagnosisComplete={(res) => {
          setToastMsg(`Diagnosis complete: ${res.probableDeficiency} identified for ${res.recommendedTargetZone}.`);
        }}
      />

      <AutonomyAuditDrawer
        open={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        autonomyData={autonomy}
      />

      {/* SNACKBAR NOTIFICATIONS */}
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
