import { useState, useEffect, useMemo, useCallback } from 'react';
import { BatchService } from '../services/batchService';
import { initialCultivationData } from '../data/operationsData';
import { ApiClient } from '../services/apiClient';

export function useUniversalBatches(initialDomain = 'CULTIVATION') {
  const [batches, setBatches] = useState(
    ApiClient.isDemoMode() ? initialCultivationData.batches : []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchBatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await BatchService.getBatches(initialDomain);
      if (Array.isArray(data)) {
        setBatches(data);
      }
    } catch (err) {
      console.error('[useUniversalBatches] Fetch failed:', err.message);
      setError(err.message || 'Failed to fetch batches from Terra Core');
      if (ApiClient.isDemoMode()) {
        setBatches(initialCultivationData.batches);
      }
    } finally {
      setLoading(false);
    }
  }, [initialDomain]);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      const query = searchQuery.toLowerCase();
      const code = (b.batchCode || b.code || '').toLowerCase();
      const name = (b.name || '').toLowerCase();
      const matchSearch = name.includes(query) || code.includes(query);
      const matchStatus =
        statusFilter === 'ALL' ||
        (b.status || '').toUpperCase() === statusFilter.toUpperCase();
      return matchSearch && matchStatus;
    });
  }, [batches, searchQuery, statusFilter]);

  const addBatch = async (newBatchData) => {
    const created = await BatchService.createBatch(newBatchData);
    setBatches((prev) => [created, ...prev]);
    return created;
  };

  const transitionStatus = async (batchId, newStatus, reason) => {
    await BatchService.transitionStatus(batchId, newStatus, reason);
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId ? { ...b, status: newStatus } : b
      )
    );
  };

  const addHarvestOutput = async (batchId, outputData) => {
    const createdOutput = await BatchService.addHarvestOutput(batchId, outputData);
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id !== batchId) return b;
        const outputs = b.outputs || b.harvests || [];
        return {
          ...b,
          outputs: [createdOutput, ...outputs],
        };
      })
    );
    return createdOutput;
  };

  const removeBatch = (id) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  return {
    batches: filteredBatches,
    allBatches: batches,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    refresh: fetchBatches,
    addBatch,
    transitionStatus,
    addHarvestOutput,
    removeBatch,
  };
}
