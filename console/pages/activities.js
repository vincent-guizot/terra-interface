import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Grid,
  Checkbox,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Divider,
  IconButton
} from '@mui/material';
import {
  CheckCircleOutline,
  CheckCircle,
  Add,
  EventNote,
  History,
  Schedule,
  PriorityHigh,
  Spa,
  SetMeal,
  Egg,
  Yard,
  Bolt
} from '@mui/icons-material';
import { activitiesData } from '../data/homesteadData';

export default function ActivitiesPage() {
  const [tasks, setTasks] = useState(activitiesData.todayTasks);
  const [domainFilter, setDomainFilter] = useState('All');
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // New task form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    time: '02:00 PM',
    zone: 'Zone 4: Permaculture Beds',
    domain: 'Cultivation',
    priority: 'Medium',
    duration: '20 min',
    notes: '',
  });

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        setToastMsg(nextState ? `Completed: "${t.title}"! Excellent stewardship.` : `Marked "${t.title}" as pending.`);
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: `act-${Date.now()}`,
      time: taskForm.time,
      title: taskForm.title,
      zone: taskForm.zone,
      domain: taskForm.domain,
      priority: taskForm.priority,
      duration: taskForm.duration,
      completed: false,
      notes: taskForm.notes || 'Added by steward Vincent.',
    };
    setTasks([...tasks, newTask]);
    setAddTaskOpen(false);
    setToastMsg(`Scheduled new homestead activity: "${taskForm.title}"!`);
    setTaskForm({ title: '', time: '02:00 PM', zone: 'Zone 4: Permaculture Beds', domain: 'Cultivation', priority: 'Medium', duration: '20 min', notes: '' });
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const filteredTasks = domainFilter === 'All'
    ? tasks
    : tasks.filter(t => t.domain.toLowerCase() === domainFilter.toLowerCase());

  return (
    <>
      <Head>
        <title>Terra Interface — Activities (What needs to be done?)</title>
      </Head>

      {/* HEADER: Answers "What needs to be done?" */}
      <Box sx={{ mb: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#16A34A', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              05. Operations • What needs to be done?
            </Typography>
            <Chip
              label={`${completedCount} of ${totalCount} Done (${progressPercent}%)`}
              size="small"
              sx={{ bgcolor: 'rgba(22, 163, 74, 0.12)', color: '#15803D', fontWeight: 700, fontSize: '0.72rem' }}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F291E', letterSpacing: '-0.02em' }}>
            Daily Homestead Tasks & Weekly Schedule
          </Typography>
          <Typography variant="body1" sx={{ color: '#486253', maxWidth: 700 }}>
            Structured biological stewardship routines, automated triggers, feeding cycles, and weekly regenerative farm chores for Vincent's Farm.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setAddTaskOpen(true)}
          startIcon={<Add />}
          sx={{
            borderRadius: 3,
            bgcolor: '#1B4332',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.85rem',
            boxShadow: '0 4px 14px rgba(27,67,50,0.18)',
            '&:hover': { bgcolor: '#123124' }
          }}
        >
          Add Task
        </Button>
      </Box>

      {/* DAILY PROGRESS RIBBON */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 4,
          bgcolor: '#FFFFFF',
          border: '1px solid rgba(27,67,50,0.08)',
          boxShadow: '0 8px 24px -6px rgba(27,67,50,0.04)',
          mb: 3.5,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CheckCircle sx={{ color: '#10B981', fontSize: 24 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1B4332' }}>
              Today's Farm Stewardship Progress
            </Typography>
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#10B981' }}>
            {completedCount} Completed / {tasks.filter(t => !t.completed).length} Remaining
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: 'rgba(27,67,50,0.08)',
            '& .MuiLinearProgress-bar': { bgcolor: '#10B981', borderRadius: 4 }
          }}
        />
      </Paper>

      {/* DOMAIN FILTER BAR */}
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mb: 3 }}>
        {['All', 'Aquaculture', 'Livestock', 'Cultivation', 'Infrastructure', 'Regenerative'].map((domain) => (
          <Chip
            key={domain}
            label={domain}
            clickable
            onClick={() => setDomainFilter(domain)}
            sx={{
              fontWeight: 700,
              fontSize: '0.8rem',
              borderRadius: 3,
              px: 1,
              bgcolor: domainFilter === domain ? '#1B4332' : '#FFFFFF',
              color: domainFilter === domain ? '#FFFFFF' : '#486253',
              border: '1px solid rgba(27,67,50,0.1)',
              '&:hover': { bgcolor: domainFilter === domain ? '#1B4332' : '#F0F6F1' }
            }}
          />
        ))}
      </Box>

      {/* TASKS LIST & WEEKLY SCHEDULE GRID */}
      <Grid container spacing={3}>
        {/* Left: Today's Tasks List with Interactive Checkbox */}
        <Grid item xs={12} lg={7}>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                Today's Chronological Schedule
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                Click checkbox to log completion
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {filteredTasks.map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: task.completed ? 'rgba(240, 248, 242, 0.6)' : '#FAF9F5',
                    border: `1.5px solid ${task.completed ? 'rgba(16, 185, 129, 0.25)' : 'rgba(27, 67, 50, 0.08)'}`,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                    sx={{
                      color: '#65A30D',
                      p: 0.5,
                      '&.Mui-checked': { color: '#10B981' }
                    }}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mb: 0.5 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 800,
                          color: task.completed ? '#5A7565' : '#14281D',
                          textDecoration: task.completed ? 'line-through' : 'none',
                          fontSize: '0.92rem',
                        }}
                      >
                        {task.title}
                      </Typography>
                      <Chip
                        label={task.priority}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          bgcolor: task.priority === 'High' ? 'rgba(220,38,38,0.1)' : 'rgba(217,119,6,0.1)',
                          color: task.priority === 'High' ? '#DC2626' : '#D97706',
                        }}
                      />
                    </Box>

                    <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600, display: 'block', mb: 0.5 }}>
                      🕒 {task.time} • ⏱️ {task.duration} • 📍 {task.zone}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#748B7D', fontSize: '0.8rem' }}>
                      {task.notes}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right: Weekly Schedule & Routine Chores */}
        <Grid item xs={12} lg={5}>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
                  Weekly Stewardship Schedule
                </Typography>
                <Typography variant="body2" sx={{ color: '#5A7565' }}>
                  Recurring farm operations throughout the 7 days
                </Typography>
              </Box>
              <Schedule sx={{ color: '#10B981' }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {activitiesData.weeklyChoreSchedule.map((chore, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 1.8,
                    borderRadius: 2.5,
                    bgcolor: '#FAF9F5',
                    border: '1px solid rgba(27,67,50,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B4332' }}>
                      {chore.day}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#5A7565', fontWeight: 600 }}>
                      {chore.focus}
                    </Typography>
                  </Box>
                  <Chip
                    label={`${chore.tasksCount} Chores`}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      bgcolor: 'rgba(27,67,50,0.08)',
                      color: '#1B4332'
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* EMBEDDED MODAL: ADD ACTIVITY / TASK */}
      <Dialog
        open={addTaskOpen}
        onClose={() => setAddTaskOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 1.5, bgcolor: '#FFFFFF' } }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B4332' }}>
            Schedule New Homestead Activity
          </Typography>
          <Typography variant="caption" sx={{ color: '#5A7565' }}>
            Add manual or automated task to Vincent's Farm schedule.
          </Typography>
        </DialogTitle>
        <form onSubmit={handleAddTaskSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Activity Description"
                  placeholder="e.g. Inspect biochar retort, clean first-flush vortex"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Scheduled Time"
                  placeholder="e.g. 03:00 PM"
                  value={taskForm.time}
                  onChange={(e) => setTaskForm({ ...taskForm, time: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estimated Duration"
                  placeholder="e.g. 20 min"
                  value={taskForm.duration}
                  onChange={(e) => setTaskForm({ ...taskForm, duration: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Target Zone"
                  value={taskForm.zone}
                  onChange={(e) => setTaskForm({ ...taskForm, zone: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  <MenuItem value="Zone 1: Micro-Greenhouse">Zone 1: Micro-Greenhouse</MenuItem>
                  <MenuItem value="Zone 2: Aquaponics">Zone 2: Aquaponics Pond</MenuItem>
                  <MenuItem value="Zone 3: Poultry Hub">Zone 3: Poultry & BSF</MenuItem>
                  <MenuItem value="Zone 4: Permaculture Beds">Zone 4: Permaculture Beds</MenuItem>
                  <MenuItem value="Zone 5: Solar Array">Zone 5: Solar Array</MenuItem>
                  <MenuItem value="Zone 6: Water Catchment">Zone 6: Water Catchment</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Domain Category"
                  value={taskForm.domain}
                  onChange={(e) => setTaskForm({ ...taskForm, domain: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                >
                  <MenuItem value="Aquaculture">Aquaculture</MenuItem>
                  <MenuItem value="Livestock">Livestock</MenuItem>
                  <MenuItem value="Cultivation">Cultivation</MenuItem>
                  <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                  <MenuItem value="Regenerative">Regenerative</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Specific Notes & Instructions"
                  placeholder="Feed type, probe threshold, target bed number..."
                  value={taskForm.notes}
                  onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })}
                  size="small"
                  sx={{ '& fieldset': { borderRadius: 2.5 } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setAddTaskOpen(false)} sx={{ color: '#5A7565', textTransform: 'none', fontWeight: 600 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#1B4332', color: '#FFFFFF', borderRadius: 2.5, px: 3, textTransform: 'none', fontWeight: 700 }}
            >
              Add Activity
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
