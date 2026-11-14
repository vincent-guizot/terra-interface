import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { AnimatedPulse } from '../src/components/motion/AnimatedPulse';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  Divider,
  Chip,
  Tooltip
} from '@mui/material';
import {
  DashboardOutlined,
  MapOutlined,
  AgricultureOutlined,
  SpaOutlined,
  CheckCircleOutline,
  PsychologyOutlined,
  Search,
  NotificationsNone,
  WbSunny,
  Add,
  Spa,
  Close,
  CheckCircle,
  WarningAmber,
  Bolt,
  Opacity,
  ArrowForward,
  Tune
} from '@mui/icons-material';

const navItems = [
  { label: 'Overview', href: '/', icon: <DashboardOutlined fontSize="small" />, sub: 'What is happening?' },
  { label: 'Map', href: '/map', icon: <MapOutlined fontSize="small" />, sub: 'Where is everything?' },
  { label: 'Production', href: '/production', icon: <AgricultureOutlined fontSize="small" />, sub: 'What are we producing?' },
  { label: 'Resources', href: '/resources', icon: <SpaOutlined fontSize="small" />, sub: 'What resources are available?' },
  { label: 'Activities', href: '/activities', icon: <CheckCircleOutline fontSize="small" />, sub: 'What needs to be done?' },
  { label: 'Intelligence', href: '/intelligence', icon: <PsychologyOutlined fontSize="small" />, sub: 'What should we improve?' },
  { label: 'Operations', href: '/operations', icon: <Tune fontSize="small" />, sub: 'Management & CRUD' },
];

export default function MenuBar({ onOpenQuickLog }) {
  const router = useRouter();
  const currentPath = router.pathname;

  // Search Dialog State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications Menu State
  const [notifyAnchor, setNotifyAnchor] = useState(null);
  const notifyOpen = Boolean(notifyAnchor);

  // User Profile Menu State
  const [profileAnchor, setProfileAnchor] = useState(null);
  const profileOpen = Boolean(profileAnchor);

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Solar Surplus Diverted',
      time: '12 min ago',
      desc: 'Battery is at 91%. Auto-dispatched 1.4 kW to aeration pump.',
      icon: <Bolt fontSize="small" sx={{ color: '#F59E0B' }} />,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Harvest Ready: Oyster Mushrooms',
      time: '45 min ago',
      desc: 'Zone 1 Chamber #2 has 4.2 kg ready for harvest.',
      icon: <Spa fontSize="small" sx={{ color: '#10B981' }} />,
    },
    {
      id: 3,
      type: 'info',
      title: 'Rainwater Reserve at 86.6%',
      time: '2 hours ago',
      desc: '10,400 L stored. Rain forecast will add ~600 L this evening.',
      icon: <Opacity fontSize="small" sx={{ color: '#0284C7' }} />,
    },
  ];

  const searchResults = [
    { type: 'Zone', title: 'Zone 2: Aquaponics & Tilapia Ecosystem', link: '/map' },
    { type: 'Zone', title: 'Zone 1: Smart Micro-Greenhouse', link: '/map' },
    { type: 'Crop', title: 'Nile Tilapia (Batch B-24-TIL)', link: '/production' },
    { type: 'Crop', title: 'Bok Choy & Choy Sum NFT', link: '/production' },
    { type: 'Resource', title: 'Solar PV 5.2 kWp & 15.3 kWh Battery', link: '/resources' },
    { type: 'Task', title: 'BSF Larvae Harvesting for Poultry', link: '/activities' },
    { type: 'AI Advice', title: 'Nitrate Diverter Recommendation', link: '/intelligence' },
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(250, 249, 245, 0.94)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(27, 67, 50, 0.08)',
          color: '#14281D',
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, md: 4 },
            minHeight: { xs: 68, md: 74 },
          }}
        >
          {/* Brand Identity */}
          <Link href="/">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #10B981 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(27, 67, 50, 0.2)',
                }}
              >
                <Spa sx={{ color: '#FFFFFF', fontSize: 22 }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: '#14281D',
                      fontSize: '1.25rem',
                      lineHeight: 1,
                    }}
                  >
                    TERRA
                  </Typography>
                  <Chip
                    label="HOME OS"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(16, 185, 129, 0.12)',
                      color: '#065F46',
                      fontWeight: 800,
                      fontSize: '0.65rem',
                      height: 18,
                      borderRadius: 1.5,
                      letterSpacing: '0.04em',
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#5A7565',
                    fontWeight: 600,
                    fontSize: '0.72rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Vincent's Farm • 300 m² (ID)
                </Typography>
              </Box>
            </Box>
          </Link>

          {/* Central Horizontal Navigation (The 6 Core Pages) */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              bgcolor: 'rgba(237, 244, 238, 0.75)',
              p: 0.6,
              borderRadius: 3.5,
              border: '1px solid rgba(27, 67, 50, 0.08)',
              gap: 0.5,
            }}
          >
            {navItems.map((item) => {
              const isActive = (item.href === '/' && (currentPath === '/' || currentPath === '/overview')) ||
                               (item.href !== '/' && currentPath.startsWith(item.href));

              return (
                <Link key={item.label} href={item.href}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.8,
                      px: 2,
                      py: 0.9,
                      borderRadius: 3,
                      cursor: 'pointer',
                      bgcolor: isActive ? '#FFFFFF' : 'transparent',
                      color: isActive ? '#1B4332' : '#486253',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '0.86rem',
                      boxShadow: isActive ? '0 4px 12px rgba(27, 67, 50, 0.06)' : 'none',
                      border: isActive ? '1px solid rgba(27, 67, 50, 0.08)' : '1px solid transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                        color: '#1B4332',
                      },
                    }}
                  >
                    <Box sx={{ color: isActive ? '#10B981' : '#6A8774', display: 'flex' }}>
                      {item.icon}
                    </Box>
                    <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>
                      {item.label}
                    </Typography>
                  </Box>
                </Link>
              );
            })}
          </Box>

          {/* Right Action Icons: Live Sun, Search, Notifications, User Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 } }}>
            {/* Live Weather / Energy Pill */}
            <Tooltip title="Vincent's Farm Live Conditions: 28°C Tropical Sun • 4.8 kW Solar Generation">
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: '#FFFFFF',
                  px: 1.5,
                  py: 0.6,
                  borderRadius: 3,
                  border: '1px solid rgba(27, 67, 50, 0.08)',
                  boxShadow: '0 2px 6px rgba(27, 67, 50, 0.03)',
                }}
              >
                <AnimatedPulse color="#10B981" size={7} />
                <WbSunny sx={{ color: '#F59E0B', fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B4332', fontSize: '0.78rem' }}>
                  28°C
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ height: 14, my: 'auto' }} />
                <Bolt sx={{ color: '#10B981', fontSize: 17 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#065F46', fontSize: '0.78rem' }}>
                  4.8 kW
                </Typography>
              </Box>
            </Tooltip>

            {/* Global Search Button */}
            <Tooltip title="Search zones, crops, tasks...">
              <IconButton
                onClick={() => setSearchOpen(true)}
                sx={{
                  bgcolor: '#FFFFFF',
                  border: '1px solid rgba(27, 67, 50, 0.08)',
                  borderRadius: 2.5,
                  p: 1,
                  color: '#2D6A4F',
                  '&:hover': { bgcolor: '#F0F6F1' },
                }}
              >
                <Search fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Notifications Button with active badge */}
            <Tooltip title="Homestead Notifications">
              <IconButton
                onClick={(e) => setNotifyAnchor(e.currentTarget)}
                sx={{
                  bgcolor: '#FFFFFF',
                  border: '1px solid rgba(27, 67, 50, 0.08)',
                  borderRadius: 2.5,
                  p: 1,
                  color: '#2D6A4F',
                  '&:hover': { bgcolor: '#F0F6F1' },
                }}
              >
                <Badge
                  badgeContent={3}
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: '#10B981',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      height: 17,
                      minWidth: 17,
                    },
                  }}
                >
                  <NotificationsNone fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Profile Avatar */}
            <Tooltip title="Vincent (Homestead Steward)">
              <Box
                onClick={(e) => setProfileAnchor(e.currentTarget)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  p: 0.5,
                  borderRadius: 3,
                  border: '1px solid rgba(27, 67, 50, 0.08)',
                  bgcolor: '#FFFFFF',
                  '&:hover': { bgcolor: '#F0F6F1' },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: '#1B4332',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  V
                </Avatar>
                <Box sx={{ display: { xs: 'none', xl: 'block' }, pr: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#1B4332', fontSize: '0.8rem', lineHeight: 1.2 }}>
                    Vincent
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565', fontSize: '0.68rem', display: 'block' }}>
                    Steward
                  </Typography>
                </Box>
              </Box>
            </Tooltip>

            {/* Quick Log Action Button */}
            {onOpenQuickLog && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="contained"
                  onClick={onOpenQuickLog}
                  startIcon={<Add />}
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    bgcolor: '#1B4332',
                    color: '#FFFFFF',
                    borderRadius: 3,
                    px: 2,
                    py: 0.8,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(27, 67, 50, 0.18)',
                    '&:hover': { bgcolor: '#133326' },
                  }}
                >
                  Quick Log
                </Button>
              </motion.div>
            )}
          </Box>
        </Toolbar>

        {/* Mobile Navigation Row (visible on smaller screens) */}
        <Box
          sx={{
            display: { xs: 'flex', lg: 'none' },
            overflowX: 'auto',
            px: 2,
            py: 1,
            gap: 1,
            borderTop: '1px solid rgba(27, 67, 50, 0.06)',
            bgcolor: 'rgba(247, 245, 240, 0.8)',
          }}
        >
          {navItems.map((item) => {
            const isActive = (item.href === '/' && (currentPath === '/' || currentPath === '/overview')) ||
                             (item.href !== '/' && currentPath.startsWith(item.href));

            return (
              <Link key={item.label} href={item.href}>
                <Chip
                  icon={item.icon}
                  label={item.label}
                  clickable
                  sx={{
                    bgcolor: isActive ? '#1B4332' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#486253',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    border: '1px solid rgba(27, 67, 50, 0.1)',
                    '& .MuiChip-icon': {
                      color: isActive ? '#FFFFFF' : '#10B981',
                    },
                  }}
                />
              </Link>
            );
          })}
        </Box>
      </AppBar>

      {/* SEARCH DIALOG */}
      <Dialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1.5,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(27,67,50,0.12)',
          },
        }}
      >
        <Box sx={{ p: 1.5 }}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Search zones, crops, batches, sensor telemetry, tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#1B4332' }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                borderRadius: 3,
                bgcolor: '#FAF9F5',
                '& fieldset': { borderColor: 'rgba(27, 67, 50, 0.15)' },
              },
            }}
          />
        </Box>

        <DialogContent sx={{ pt: 1, pb: 2 }}>
          <Typography variant="caption" sx={{ color: '#748B7D', fontWeight: 700, mb: 1, display: 'block' }}>
            {searchQuery ? `SEARCH RESULTS (${searchResults.length})` : 'QUICK ACCESS'}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {searchResults.map((item, idx) => (
              <Box
                key={idx}
                onClick={() => {
                  setSearchOpen(false);
                  router.push(item.link);
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 1.5,
                  borderRadius: 2.5,
                  cursor: 'pointer',
                  bgcolor: '#FAF9F5',
                  border: '1px solid rgba(27,67,50,0.06)',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: '#EDF5EE',
                    borderColor: '#10B981',
                  },
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5A7565' }}>
                    Domain: {item.type}
                  </Typography>
                </Box>
                <Chip
                  label={item.type}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(27, 67, 50, 0.08)',
                    color: '#1B4332',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                  }}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      {/* NOTIFICATIONS MENU */}
      <Menu
        anchorEl={notifyAnchor}
        open={notifyOpen}
        onClose={() => setNotifyAnchor(null)}
        PaperProps={{
          sx: {
            width: 360,
            borderRadius: 3.5,
            p: 1.5,
            boxShadow: '0 18px 40px rgba(27, 67, 50, 0.12)',
            border: '1px solid rgba(27, 67, 50, 0.09)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 0.5, mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332' }}>
            System Alerts
          </Typography>
          <Chip label="3 New" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.15)', color: '#065F46', fontWeight: 700 }} />
        </Box>
        <Divider sx={{ mb: 1 }} />

        {notifications.map((n) => (
          <MenuItem
            key={n.id}
            onClick={() => setNotifyAnchor(null)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              p: 1.5,
              borderRadius: 2,
              mb: 0.5,
              bgcolor: 'rgba(250, 249, 245, 0.8)',
              '&:hover': { bgcolor: '#F0F6F1' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {n.icon}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1B4332' }}>
                  {n.title}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#748B7D', fontSize: '0.7rem' }}>
                {n.time}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#5A7565', fontSize: '0.8rem' }}>
              {n.desc}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* USER PROFILE MENU */}
      <Menu
        anchorEl={profileAnchor}
        open={profileOpen}
        onClose={() => setProfileAnchor(null)}
        PaperProps={{
          sx: {
            width: 300,
            borderRadius: 3.5,
            p: 2,
            boxShadow: '0 18px 40px rgba(27, 67, 50, 0.12)',
            border: '1px solid rgba(27, 67, 50, 0.09)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Avatar sx={{ width: 44, height: 44, bgcolor: '#1B4332', fontWeight: 800 }}>V</Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332', lineHeight: 1.2 }}>
              Vincent
            </Typography>
            <Typography variant="caption" sx={{ color: '#5A7565' }}>
              Homestead Steward & Operator
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 1.5, bgcolor: '#F3F8F4', borderRadius: 2.5, mb: 2 }}>
          <Typography variant="caption" sx={{ color: '#5A7565', display: 'block', fontWeight: 600 }}>
            Location: Vincent's Farm (300 m²)
          </Typography>
          <Typography variant="caption" sx={{ color: '#1B4332', fontWeight: 700, display: 'block' }}>
            Autonomy Index: 94.2% Self-Sustaining
          </Typography>
        </Box>

        <Divider sx={{ mb: 1 }} />
        <MenuItem onClick={() => { setProfileAnchor(null); router.push('/intelligence'); }}>
          <PsychologyOutlined fontSize="small" sx={{ mr: 1.5, color: '#10B981' }} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Terra AI Assistant</Typography>
        </MenuItem>
        <MenuItem onClick={() => { setProfileAnchor(null); router.push('/map'); }}>
          <MapOutlined fontSize="small" sx={{ mr: 1.5, color: '#0284C7' }} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Homestead Master Map</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
