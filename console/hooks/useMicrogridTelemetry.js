import { useState, useEffect, useCallback } from 'react';
import { TelemetryService } from '../services/telemetryService';
import { ApiClient } from '../services/apiClient';

export function useMicrogridTelemetry() {
  const [telemetry, setTelemetry] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('CONNECTING'); // STREAMING | POLLING | DEMO | CONNECTING
  const [loading, setLoading] = useState(true);

  const fetchInitial = useCallback(async () => {
    try {
      const data = await TelemetryService.getLiveSnapshot();
      setTelemetry(data);
      if (ApiClient.isDemoMode()) {
        setConnectionStatus('DEMO');
      }
    } catch (err) {
      console.warn('[Telemetry Hook] REST fallback error:', err.message);
      setTelemetry(TelemetryService.getDemoTelemetrySnapshot());
      setConnectionStatus('DEMO');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchInitial();

    if (ApiClient.isDemoMode()) {
      setConnectionStatus('DEMO');
      return;
    }

    // Attempt Server-Sent Events (SSE) Stream
    const unsubscribe = TelemetryService.subscribeToTelemetryStream(
      (liveData) => {
        if (isMounted && liveData) {
          setTelemetry(liveData);
          setConnectionStatus('STREAMING');
        }
      },
      (err) => {
        // On SSE error, fallback to 5s REST polling
        if (isMounted) {
          setConnectionStatus('POLLING');
        }
      }
    );

    // Backup polling if SSE fails
    const interval = setInterval(async () => {
      if (connectionStatus === 'POLLING' || connectionStatus === 'CONNECTING') {
        try {
          const polled = await TelemetryService.getLiveSnapshot();
          if (isMounted && polled) {
            setTelemetry(polled);
          }
        } catch (e) {
          // Ignore polling errors
        }
      }
    }, 5000);

    return () => {
      isMounted = false;
      unsubscribe();
      clearInterval(interval);
    };
  }, [fetchInitial, connectionStatus]);

  const ingest = async (packet) => {
    const result = await TelemetryService.ingestTelemetry(packet);
    setTelemetry(result);
    return result;
  };

  const updatePolicy = async (policy) => {
    const result = await TelemetryService.updateDispatchPolicy(policy);
    await fetchInitial();
    return result;
  };

  return {
    telemetry: telemetry || TelemetryService.getDemoTelemetrySnapshot(),
    alerts: telemetry?.alerts || [],
    connectionStatus,
    loading,
    ingest,
    updatePolicy,
    refresh: fetchInitial,
  };
}
