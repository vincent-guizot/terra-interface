import { useState, useEffect, useMemo } from 'react';
import { BatchService } from '../services/batchService';
import { initialCultivationData } from '../data/operationsData';

export function useUniversalBatches(initialDomain = 'CULTIVATION') {
  const [batches, setBatches] = useState(initialCultivationData.batches);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      const data = await BatchService.getBatches(initialDomain);
      if (isMounted && data) {
        setBatches(data);
      }
      if (isMounted) setLoading(false);
    }
    load();
    return () => { isMounted = false; };
  }, [initialDomain]);

  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      const matchSearch =
        b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.code?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || b.status?.toUpperCase() === statusFilter.toUpperCase();
      return matchSearch && matchStatus;
    });
  }, [batches, searchQuery, statusFilter]);

  const addBatch = async (newBatchData) => {
    const created = await BatchService.createBatch(newBatchData);
    setBatches((prev) => [created, ...prev]);
    return created;
  };

  const removeBatch = (id) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  return {
    batches: filteredBatches,
    allBatches: batches,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    addBatch,
    removeBatch,
  };
}
