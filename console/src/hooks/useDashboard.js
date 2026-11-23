import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../services/apiClient.js';
import { DashboardService, NotificationService } from '../services/dashboardService.js';
import * as seed from '../data/homestead/terra-data.js';

// Static seed data is used only in demo mode (VITE_DEMO_MODE=true); otherwise errors surface.
const DEMO = {
  overview: () => ({ farm: seed.farm, ...seed.overview }),
  map: () => ({ ...seed.mapFlow }),
  production: () => seed.production,
  resources: () => seed.resources,
  activities: () => seed.activities,
  intelligence: () => seed.intelligence,
};

export const dashboardKey = (section) => ['dashboard', section];

export function useDashboard(section) {
  const query = useQuery({
    queryKey: dashboardKey(section),
    queryFn: async () => {
      try {
        return await DashboardService.get(section);
      } catch (err) {
        if (ApiClient.isDemoMode()) return DEMO[section]();
        throw err;
      }
    },
    refetchInterval: section === 'activities' ? 60_000 : false,
  });
  return { data: query.data, isLoading: query.isLoading, error: query.error, refetch: query.refetch };
}

export function useAddTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (task) => DashboardService.createTask(task),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: dashboardKey('activities') });
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useToggleTask() {
  const qc = useQueryClient();
  const key = dashboardKey('activities');
  return useMutation({
    mutationFn: (id) => DashboardService.toggleTask(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData(key);
      if (prev) {
        const tasks = prev.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
        const done = tasks.filter((t) => t.done).length;
        qc.setQueryData(key, { ...prev, tasks, progressPct: tasks.length ? Math.round((done / tasks.length) * 100) : 0 });
      }
      return { prev };
    },
    onError: (_e, _id, ctx) => ctx?.prev && qc.setQueryData(key, ctx.prev),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: key });
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useApplyRecommendation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => DashboardService.applyRecommendation(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: dashboardKey('intelligence') }),
  });
}

export function useNotifications() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ['notifications'],
    queryFn: () => NotificationService.list(),
    refetchInterval: 60_000,
    retry: false,
  });
  const invalidate = () => qc.invalidateQueries({ queryKey: ['notifications'] });
  const markRead = useMutation({ mutationFn: (id) => NotificationService.markRead(id), onSuccess: invalidate });
  const markAllRead = useMutation({ mutationFn: () => NotificationService.markAllRead(), onSuccess: invalidate });
  return {
    items: query.data?.items ?? [],
    unreadCount: query.data?.unreadCount ?? 0,
    isError: query.isError,
    markRead: markRead.mutate,
    markAllRead: markAllRead.mutate,
  };
}

/** Farm identity (name, location, area...) — shares the cached overview request. */
export function useFarm() {
  return useDashboard('overview');
}
