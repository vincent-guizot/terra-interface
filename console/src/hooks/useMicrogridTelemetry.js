import { useState, useEffect, useCallback, useRef } from 'react';
import { TelemetryService } from '../services/telemetryService.js';
import { ApiClient } from '../services/apiClient.js';

export function useMicrogridTelemetry() {
  const [telemetry, setTelemetry] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('CONNECTING'); // STREAMING | POLLING | DEMO | CONNECTING
  const [loading, setLoading] = useState(true);
  const statusRef = useRef('CONNECTING');

  const fetchInitial = useCallback(async () => {
    try {
      const data = await TelemetryService.getLiveSnapshot();
      if (data) {
        setTelemetry(data);
        const status = ApiClient.isDemoMode() ? 'DEMO' : 'LIVE';
        statusRef.current = status;
        setConnectionStatus(status);
      }
    } catch (err) {
      console.warn('[Telemetry Hook] REST fallback error:', err.message);
      setTelemetry(TelemetryService.getDemoTelemetrySnapshot());
      statusRef.current = 'DEMO';
      setConnectionStatus('DEMO');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchInitial();

    if (ApiClient.isDemoMode()) {
      statusRef.current = 'DEMO';
      setConnectionStatus('DEMO');
      return;
    }

    // Attempt Server-Sent Events (SSE) Stream
    let unsubscribe = () => {};
    try {
      unsubscribe = TelemetryService.subscribeToTelemetryStream(
        (liveData) => {
          if (isMounted && liveData) {
            setTelemetry(liveData);
            if (statusRef.current !== 'STREAMING') {
              statusRef.current = 'STREAMING';
              setConnectionStatus('STREAMING');
            }
          }
        },
        () => {
          // On SSE error, fallback to POLLING once without triggering effect re-execution
          if (isMounted && statusRef.current !== 'POLLING' && statusRef.current !== 'DEMO') {
            statusRef.current = 'POLLING';
            setConnectionStatus('POLLING');
          }
        }
      );
    } catch (e) {
      if (isMounted) {
        statusRef.current = 'POLLING';
        setConnectionStatus('POLLING');
      }
    }

    // Polling interval
    const interval = setInterval(async () => {
      if (statusRef.current === 'POLLING' || statusRef.current === 'CONNECTING' || statusRef.current === 'LIVE') {
        try {
          const polled = await TelemetryService.getLiveSnapshot();
          if (isMounted && polled) {
            setTelemetry(polled);
          }
        } catch (e) {
          // Ignore polling errors
        }
      }
    }, 10000);

    return () => {
      isMounted = false;
      unsubscribe();
      clearInterval(interval);
    };
  }, [fetchInitial]);

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
