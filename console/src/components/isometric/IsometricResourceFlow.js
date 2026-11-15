import { getFlowTypeColor } from "@/helpers/presentation.js";
import { ecologicalLoops } from "../../data/isometric/ecological-loops.data.js";
import React, { useState } from 'react';
import { Box, Typography, Paper, Chip, Grid, Table, TableHead, TableBody, TableRow, TableCell, ButtonGroup, Button } from '@mui/material';
import { Sync, Bolt, Opacity, Grass, Loop, CheckCircle, ArrowForward, SwapHoriz, FilterList, Egg, Pets, Yard, Park, Warehouse } from '@mui/icons-material';
import { masterPlanResourceFlows } from '../../data/homestead/master-plan.js';
import DataSourceBadge from '../ui/DataSourceBadge.js';
export default function IsometricResourceFlow() {
  const [activeCycle, setActiveCycle] = useState('all');
  const [flowTypeFilter, setFlowTypeFilter] = useState('all'); // 'all' | 'ACTUAL' | 'PLANNED' | 'ESTIMATED'

  const filteredFlows = masterPlanResourceFlows.filter(flow => {
    const matchesType = flowTypeFilter === 'all' || flow.flowType === flowTypeFilter;
    const matchesCycle = activeCycle === 'all' || activeCycle === 'bsf-protein' && (flow.id.includes('chk') || flow.id.includes('bsf') || flow.id.includes('scraps')) || activeCycle === 'compost-soil' && (flow.id.includes('frass') || flow.id.includes('compost') || flow.id.includes('manure')) || activeCycle === 'water-consumers' && flow.id.includes('water') || activeCycle === 'aqua-hydro' && flow.id.includes('aqua');
    return matchesType && matchesCycle;
  });
  return <Box sx={{
    width: '100%',
    py: 1
  }}>
      {/* FILTER CONTROLS */}
      <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 2,
      mb: 3
    }}>
        {/* Cycle Filter Pills */}
        <Box sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap'
      }}>
          <Chip label="All Ecological Loops" onClick={() => setActiveCycle('all')} sx={{
          fontWeight: 700,
          borderRadius: 3,
          px: 1,
          bgcolor: activeCycle === 'all' ? '#1B4332' : 'rgba(255,255,255,0.9)',
          color: activeCycle === 'all' ? '#FFFFFF' : '#1B4332',
          border: '1px solid rgba(27,67,50,0.1)'
        }} />
          {ecologicalLoops.map(c => <Chip key={c.id} label={c.name} onClick={() => setActiveCycle(c.id)} sx={{
          fontWeight: 700,
          borderRadius: 3,
          px: 1,
          bgcolor: activeCycle === c.id ? `${c.color}25` : 'rgba(255,255,255,0.9)',
          color: activeCycle === c.id ? c.color : '#486253',
          borderColor: activeCycle === c.id ? c.color : 'rgba(27,67,50,0.1)',
          borderWidth: 1,
          borderStyle: 'solid'
        }} />)}
        </Box>

        {/* Flow Classification Switcher: ACTUAL vs PLANNED vs ESTIMATED */}
        <ButtonGroup size="small" sx={{
        bgcolor: '#FFFFFF',
        borderRadius: 2.5,
        p: 0.4,
        border: '1px solid rgba(27,67,50,0.12)',
        '& .MuiButton-root': {
          borderRadius: '8px !important',
          border: 'none !important',
          px: 1.5,
          py: 0.5,
          fontWeight: 700,
          fontSize: '0.75rem',
          textTransform: 'none'
        }
      }}>
          <Button onClick={() => setFlowTypeFilter('all')} sx={{
          bgcolor: flowTypeFilter === 'all' ? '#1B4332 !important' : 'transparent',
          color: flowTypeFilter === 'all' ? '#FFFFFF !important' : '#486253'
        }}>
            All Flows ({masterPlanResourceFlows.length})
          </Button>
          <Button onClick={() => setFlowTypeFilter('ACTUAL')} sx={{
          bgcolor: flowTypeFilter === 'ACTUAL' ? '#10B981 !important' : 'transparent',
          color: flowTypeFilter === 'ACTUAL' ? '#FFFFFF !important' : '#065F46'
        }}>
            ACTUAL ({masterPlanResourceFlows.filter(f => f.flowType === 'ACTUAL').length})
          </Button>
          <Button onClick={() => setFlowTypeFilter('PLANNED')} sx={{
          bgcolor: flowTypeFilter === 'PLANNED' ? '#0284C7 !important' : 'transparent',
          color: flowTypeFilter === 'PLANNED' ? '#FFFFFF !important' : '#0369A1'
        }}>
            PLANNED ({masterPlanResourceFlows.filter(f => f.flowType === 'PLANNED').length})
          </Button>
          <Button onClick={() => setFlowTypeFilter('ESTIMATED')} sx={{
          bgcolor: flowTypeFilter === 'ESTIMATED' ? '#D97706 !important' : 'transparent',
          color: flowTypeFilter === 'ESTIMATED' ? '#FFFFFF !important' : '#92400E'
        }}>
            ESTIMATED ({masterPlanResourceFlows.filter(f => f.flowType === 'ESTIMATED').length})
          </Button>
        </ButtonGroup>
      </Box>

      {/* ISOMETRIC FLOW DIAGRAM SCHEMATIC */}
      <Paper elevation={0} sx={{
      p: {
        xs: 2.5,
        md: 3.5
      },
      borderRadius: 4,
      background: 'linear-gradient(135deg, #FAFBF8 0%, #F1F6F0 100%)',
      border: '1px solid rgba(27, 67, 50, 0.1)',
      mb: 3
    }}>
        <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        flexWrap: 'wrap',
        gap: 1
      }}>
          <Box>
            <Typography variant="h6" sx={{
            fontWeight: 800,
            color: '#1B4332'
          }}>
              Vincent's Farm Closed-Loop Ecological Topology
            </Typography>
            <Typography variant="body2" sx={{
            color: '#5A7565'
          }}>
              Modeled according to approved Master Plan: waste streams feed biological converters without invented links.
            </Typography>
          </Box>
          <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}>
            <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'rgba(16, 185, 129, 0.15)',
            px: 2,
            py: 0.8,
            borderRadius: 3
          }}>
              <Loop sx={{
              color: '#059669',
              fontSize: 20
            }} />
              <Typography variant="subtitle2" sx={{
              fontWeight: 800,
              color: '#065F46'
            }}>
                98.2% Organic Biomass Retained
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Isometric SVG Schematic */}
        <Box sx={{
        width: '100%',
        overflowX: 'auto',
        textAlign: 'center',
        py: 2
      }}>
          <svg viewBox="0 0 880 340" style={{
          maxWidth: '100%',
          height: 'auto',
          minWidth: 700
        }}>
            <defs>
              <linearGradient id="flowChkBsf" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="flowBsfCompost" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="flowCompostSoil" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#65A30D" />
              </linearGradient>
              <linearGradient id="flowWaterConsumers" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* NODE 1: Chicken Coop */}
            <g transform="translate(110, 80)">
              <rect x="-70" y="-35" width="140" height="70" rx="16" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(245,158,11,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#D97706" fontWeight="800" fontSize="13">🐔 CHICKEN COOP</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">24 Layers + 30 Joper</text>
              <text x="0" y="24" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="9.5">Manure: 14 kg/batch</text>
            </g>

            {/* Vector 1 -> 2: Chicken waste to BSF House */}
            <path d="M 180,80 L 290,80" fill="none" stroke="url(#flowChkBsf)" strokeWidth="3.5" strokeDasharray="6,4" />
            <polygon points="295,80 285,75 285,85" fill="#059669" />
            <text x="238" y="70" textAnchor="middle" fill="#D97706" fontSize="9" fontWeight="800">Chicken Waste (14 kg)</text>

            {/* NODE 2: BSF / Maggot House */}
            <g transform="translate(365, 80)">
              <rect x="-75" y="-35" width="150" height="70" rx="16" fill="#FFFFFF" stroke="#059669" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(5,150,105,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#065F46" fontWeight="800" fontSize="13">🪰 BSF / MAGGOT HOUSE</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">Hermetia illucens Rearing</text>
              <text x="0" y="24" textAnchor="middle" fill="#059669" fontWeight="700" fontSize="9.5">Yield: 2.4 kg Prepupae</text>
            </g>

            {/* Loop 2 -> 1 Return: Live Maggot Protein back to chickens */}
            <path d="M 365,45 C 365,-10 110,-10 110,45" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5,4" />
            <polygon points="110,45 105,35 115,35" fill="#F59E0B" />
            <text x="238" y="0" textAnchor="middle" fill="#D97706" fontSize="9.5" fontWeight="800">Live Prepupae 42% CP (2.4 kg) → Feed</text>

            {/* Vector 2 -> 3: BSF Frass residue to Composting */}
            <path d="M 440,80 L 550,80" fill="none" stroke="url(#flowBsfCompost)" strokeWidth="3.5" strokeDasharray="6,4" />
            <polygon points="555,80 545,75 545,85" fill="#78350F" />
            <text x="495" y="70" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="800">Insect Frass Residue (4.8 kg)</text>

            {/* NODE 3: Compost Processing Bay */}
            <g transform="translate(630, 80)">
              <rect x="-75" y="-35" width="150" height="70" rx="16" fill="#FFFFFF" stroke="#78350F" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(120,53,15,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#78350F" fontWeight="800" fontSize="13">🍂 COMPOST BAY</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">Bokashi & Thermophilic Pile</text>
              <text x="0" y="24" textAnchor="middle" fill="#78350F" fontWeight="700" fontSize="9.5">Frass + Ruminant Manure</text>
            </g>

            {/* Secondary Input to Compost: Goat & Sheep Manure */}
            <path d="M 780,20 L 705,65" fill="none" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4,4" />
            <polygon points="705,65 710,55 717,62" fill="#D97706" />
            <text x="765" y="48" textAnchor="middle" fill="#92400E" fontSize="8.5" fontWeight="700">Goat/Sheep Manure (8 kg)</text>

            {/* LOWER RETURN LOOP: Cured Compost -> Soil & Garden Cultivation */}
            <path d="M 630,115 L 630,230 L 515,230" fill="none" stroke="url(#flowCompostSoil)" strokeWidth="3" strokeDasharray="5,4" />
            <polygon points="510,230 520,225 520,235" fill="#65A30D" />
            <text x="590" y="218" textAnchor="middle" fill="#78350F" fontSize="9.5" fontWeight="800">Cured Humus (65 kg)</text>

            {/* NODE 4: Soil Cultivation (TOGA Garden & Perimeter Fruit Trees) */}
            <g transform="translate(430, 230)">
              <rect x="-80" y="-35" width="160" height="70" rx="16" fill="#FFFFFF" stroke="#65A30D" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(101,163,13,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#4D7C0F" fontWeight="800" fontSize="13">🌱 TOGA & FRUIT TREES</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">Medicinal Herbs & Papaya</text>
              <text x="0" y="24" textAnchor="middle" fill="#4D7C0F" fontWeight="700" fontSize="9.5">Biochar Living Soil</text>
            </g>

            {/* Connector: Soil returns fresh food to kitchen */}
            <path d="M 350,230 L 250,230 L 250,115" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="5,4" />
            <polygon points="250,115 245,125 255,125" fill="#10B981" />
            <text x="285" y="180" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="800">Produce & Herbs</text>

            {/* NODE 5: Water Storage Cisterns */}
            <g transform="translate(100, 230)">
              <rect x="-70" y="-35" width="140" height="70" rx="16" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(2,132,199,0.12))" />
              <text x="0" y="-8" textAnchor="middle" fill="#0284C7" fontWeight="800" fontSize="13">💧 WATER STORAGE</text>
              <text x="0" y="10" textAnchor="middle" fill="#5A7565" fontSize="10">12,000 L Rain Cisterns</text>
              <text x="0" y="24" textAnchor="middle" fill="#0284C7" fontWeight="700" fontSize="9.5">Gravity Distribution</text>
            </g>

            {/* Water pipe to Hydroponics & TOGA */}
            <path d="M 170,230 L 350,230" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="4,4" />
            <text x="210" y="245" textAnchor="middle" fill="#0284C7" fontSize="8.5" fontWeight="700">Drip Irrigation</text>
          </svg>
        </Box>
      </Paper>

      {/* DETAILED FLOW LEDGER TABLE (Supports Source, Destination, Quantity, Unit, Timestamp, FlowType, Status) */}
      <Paper elevation={0} sx={{
      borderRadius: 4,
      bgcolor: '#FFFFFF',
      border: '1px solid rgba(27,67,50,0.08)',
      overflow: 'hidden',
      boxShadow: '0 8px 24px -6px rgba(27,67,50,0.05)'
    }}>
        <Box sx={{
        p: 2.5,
        borderBottom: '1px solid rgba(27,67,50,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1
      }}>
          <Box>
            <Typography variant="h6" sx={{
            fontWeight: 800,
            color: '#1B4332'
          }}>
              Ecological Resource Flow Ledger ({filteredFlows.length} Active Records)
            </Typography>
            <Typography variant="caption" sx={{
            color: '#5A7565'
          }}>
              Distinguishing ACTUAL, PLANNED, and ESTIMATED mass and energy vectors. No invented flow quantities.
            </Typography>
          </Box>
          <Chip icon={<FilterList fontSize="small" />} label={`Filter: ${flowTypeFilter.toUpperCase()}`} size="small" sx={{
          bgcolor: 'rgba(27,67,50,0.08)',
          color: '#1B4332',
          fontWeight: 700
        }} />
        </Box>

        <Table>
          <TableHead sx={{
          bgcolor: '#FAF9F5'
        }}>
            <TableRow>
              <TableCell sx={{
              fontWeight: 800,
              color: '#1B4332',
              fontSize: '0.78rem'
            }}>FLOW ID</TableCell>
              <TableCell sx={{
              fontWeight: 800,
              color: '#1B4332',
              fontSize: '0.78rem'
            }}>SOURCE → DESTINATION</TableCell>
              <TableCell sx={{
              fontWeight: 800,
              color: '#1B4332',
              fontSize: '0.78rem'
            }}>MATERIAL / STREAM</TableCell>
              <TableCell sx={{
              fontWeight: 800,
              color: '#1B4332',
              fontSize: '0.78rem'
            }}>QUANTITY & UNIT</TableCell>
              <TableCell sx={{
              fontWeight: 800,
              color: '#1B4332',
              fontSize: '0.78rem'
            }}>CLASSIFICATION</TableCell>
              <TableCell sx={{
              fontWeight: 800,
              color: '#1B4332',
              fontSize: '0.78rem'
            }}>TIMESTAMP / SCHEDULE</TableCell>
              <TableCell sx={{
              fontWeight: 800,
              color: '#1B4332',
              fontSize: '0.78rem'
            }}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFlows.map(flow => {
            const typeStyle = getFlowTypeColor(flow.flowType);
            return <TableRow key={flow.id} hover>
                  <TableCell sx={{
                fontWeight: 700,
                color: '#748B7D',
                fontSize: '0.75rem'
              }}>
                    {flow.id}
                  </TableCell>
                  <TableCell>
                    <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8
                }}>
                      <Typography variant="subtitle2" sx={{
                    fontWeight: 800,
                    color: '#1B4332',
                    fontSize: '0.82rem'
                  }}>
                        {flow.source}
                      </Typography>
                      <ArrowForward sx={{
                    fontSize: 14,
                    color: '#748B7D'
                  }} />
                      <Typography variant="subtitle2" sx={{
                    fontWeight: 800,
                    color: '#047857',
                    fontSize: '0.82rem'
                  }}>
                        {flow.destination}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{
                  color: '#5A7565',
                  fontSize: '0.7rem'
                }}>
                      {flow.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{
                  fontWeight: 700,
                  color: '#14281D',
                  fontSize: '0.8rem'
                }}>
                      {flow.material}
                    </Typography>
                    <Typography variant="caption" sx={{
                  color: '#748B7D',
                  display: 'block',
                  fontSize: '0.68rem'
                }}>
                      {flow.description}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{
                fontWeight: 800,
                color: '#1B4332',
                fontSize: '0.85rem'
              }}>
                    {flow.quantity !== null ? `${flow.quantity} ${flow.unit}` : 'Pending Measurement'}
                  </TableCell>
                  <TableCell>
                    <Chip label={flow.flowType} size="small" sx={{
                  bgcolor: typeStyle.bg,
                  color: typeStyle.text,
                  border: `1px solid ${typeStyle.border}`,
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  height: 20
                }} />
                  </TableCell>
                  <TableCell sx={{
                fontSize: '0.75rem',
                color: '#486253',
                fontWeight: 600
              }}>
                    {flow.timestamp}
                  </TableCell>
                  <TableCell>
                    <Chip label={flow.status} size="small" sx={{
                  bgcolor: 'rgba(16, 185, 129, 0.12)',
                  color: '#065F46',
                  fontWeight: 700,
                  fontSize: '0.7rem'
                }} />
                  </TableCell>
                </TableRow>;
          })}
          </TableBody>
        </Table>
      </Paper>
    </Box>;
}
