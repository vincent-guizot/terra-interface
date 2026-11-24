import { useEffect, useRef, useState } from 'react';
import { TelemetryService } from '../services/telemetryService.js';
import { ApiClient } from '../services/apiClient.js';

export function useMicrogridTelemetry() {
  const demo = ApiClient.isDemoMode();
  const [telemetry, setTelemetry] = useState(() => demo ? TelemetryService.getDemoTelemetrySnapshot() : null);
  const [connectionStatus, setStatus] = useState(demo ? 'DEMO' : 'CONNECTING');
  const version = useRef(0);
  const streaming = useRef(false);

  useEffect(() => {
    if (demo) return;
    let closed = false;
    let polling = false;
    async function poll() {
      if (closed || streaming.current || polling) return;
      polling = true;
      const started = version.current;
      try {
        const snapshot = await TelemetryService.getLiveSnapshot();
        if (!closed && started === version.current) {
          setTelemetry(snapshot);
          setStatus('POLLING');
        }
      } catch {
        if (!closed && started === version.current) setStatus('STALE');
      } finally {
        polling = false;
      }
    }
    const unsubscribe = TelemetryService.subscribeToTelemetryStream(snapshot => {
      if (closed) return;
      version.current++;
      streaming.current = true;
      setTelemetry(snapshot);
      setStatus('STREAMING');
    }, () => {
      if (closed) return;
      if (streaming.current) version.current++;
      streaming.current = false;
      setStatus(previous => previous === 'POLLING' ? previous : 'STALE');
    });
    void poll();
    const interval = setInterval(poll, 10000);
    return () => {
      closed = true;
      streaming.current = false;
      clearInterval(interval);
      unsubscribe();
    };
  }, [demo]);

  function acceptIngest(snapshot) {
    // SSE remains the authority while connected, including for overlapping requests.
    if (!streaming.current) {
      version.current++;
      setTelemetry(snapshot);
    }
  }

  return { telemetry, alerts: telemetry?.alerts ?? [], connectionStatus, acceptIngest };
}
