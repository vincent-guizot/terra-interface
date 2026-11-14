import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  MenuItem,
  Button,
  Paper,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Close,
  Spa,
  Science,
  CheckCircle,
  WarningAmber,
  Biotech,
} from '@mui/icons-material';
import { IntelligenceService } from '../../../services/intelligenceService';

export default function PlantDiagnosisDrawer({ open, onClose, onDiagnosisComplete }) {
  const [leafZone, setLeafZone] = useState('Lower Old Leaves');
  const [chlorosisType, setChlorosisType] = useState('Interveinal Yellowing');
  const [cropType, setCropType] = useState('Indeterminate Tomatoes');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleDiagnose = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await IntelligenceService.diagnosePlant(leafZone, chlorosisType, cropType);
      setResult(res);
      if (onDiagnosisComplete) onDiagnosisComplete(res);
    } catch (err) {
      setError(err.message || 'Failed to analyze deficiency symptoms.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 480 },
          bgcolor: '#FAF9F5',
          p: 0,
        },
      }}
    >
      {/* DRAWER HEADER */}
      <Box
        sx={{
          p: 3,
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid rgba(27,67,50,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2.5,
              bgcolor: 'rgba(16, 185, 129, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Biotech sx={{ color: '#059669', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332', lineHeight: 1.2 }}>
              Botanical Diagnosis Engine
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
              Visual chlorosis & deficiency inference
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#5A7565' }}>
          <Close fontSize="small" />
        </IconButton>
      </Box>

      {/* DRAWER BODY */}
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5, overflowY: 'auto' }}>
        <Alert severity="info" icon={<Science fontSize="small" />} sx={{ borderRadius: 2.5, bgcolor: '#F0F6F1', color: '#1B4332' }}>
          Identify mobile vs immobile nutrient deficiencies from plant symptoms and get organic permaculture remedies.
        </Alert>

        {error && (
          <Alert severity="error" sx={{ borderRadius: 2.5 }}>
            {error}
          </Alert>
        )}

        {/* INPUTS FORM */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3.5,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(27,67,50,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Symptom Observation
          </Typography>

          <TextField
            select
            fullWidth
            size="small"
            label="Leaf Zone / Canopy Level"
            value={leafZone}
            onChange={(e) => {
              setLeafZone(e.target.value);
              handleReset();
            }}
            helperText="Mobile nutrients (N, P, K, Mg) show on older leaves; Immobile (Ca, Fe) on young shoots."
          >
            <MenuItem value="Lower Old Leaves">Lower Old Leaves (Base Canopy)</MenuItem>
            <MenuItem value="Upper Young Leaves">Upper Young Leaves (New Shoots & Tips)</MenuItem>
            <MenuItem value="Entire Plant">Entire Plant (Generalized)</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            size="small"
            label="Chlorosis / Discoloration Pattern"
            value={chlorosisType}
            onChange={(e) => {
              setChlorosisType(e.target.value);
              handleReset();
            }}
          >
            <MenuItem value="Interveinal Yellowing">Interveinal Yellowing (Green veins, yellow tissue)</MenuItem>
            <MenuItem value="Marginal Scorching">Marginal Scorching (Brown/burnt outer edges)</MenuItem>
            <MenuItem value="Uniform Pale Yellow">Uniform Pale Yellow (Even fading across leaf)</MenuItem>
          </TextField>

          <TextField
            fullWidth
            size="small"
            label="Crop Variety / Cultivar"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            placeholder="e.g. Indeterminate Tomatoes, NFT Kangkung"
          />

          <Button
            variant="contained"
            onClick={handleDiagnose}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Spa />}
            sx={{
              mt: 1,
              bgcolor: '#1B4332',
              color: '#FFFFFF',
              fontWeight: 700,
              borderRadius: 2.5,
              py: 1.2,
              '&:hover': { bgcolor: '#123124' },
            }}
          >
            {loading ? 'Analyzing Botanical Profile...' : 'Run Foliage Diagnosis'}
          </Button>
        </Paper>

        {/* DIAGNOSIS RESULT CARD */}
        {result && (
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3.5,
              bgcolor: '#FFFFFF',
              border: '1.5px solid #10B981',
              boxShadow: '0 8px 24px -6px rgba(16, 185, 129, 0.15)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography variant="caption" sx={{ color: '#059669', fontWeight: 800, textTransform: 'uppercase' }}>
                Diagnosis Inferred
              </Typography>
              <Chip
                label={result.urgency}
                size="small"
                color={result.urgency === 'Immediate' ? 'error' : 'success'}
                sx={{ fontWeight: 700, height: 22 }}
              />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1B4332', mb: 1 }}>
              {result.probableDeficiency} Deficiency
            </Typography>

            <Divider sx={{ my: 1.5, borderColor: 'rgba(27,67,50,0.08)' }} />

            <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 700, display: 'block', mb: 0.5 }}>
              Organic Homestead Remedy:
            </Typography>
            <Typography variant="body2" sx={{ color: '#1F2937', fontWeight: 600, lineHeight: 1.5, mb: 2 }}>
              {result.organicHomesteadRemedy}
            </Typography>

            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#FAF9F5', border: '1px solid rgba(27,67,50,0.06)' }}>
              <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 700 }}>
                Target Homestead Location:
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#1B4332', fontWeight: 800 }}>
                {result.recommendedTargetZone}
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>

      {/* DRAWER FOOTER */}
      <Box
        sx={{
          mt: 'auto',
          p: 2.5,
          bgcolor: '#FFFFFF',
          borderTop: '1px solid rgba(27,67,50,0.1)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={onClose} sx={{ color: '#5A7565', fontWeight: 700 }}>
          Close Drawer
        </Button>
      </Box>
    </Drawer>
  );
}
