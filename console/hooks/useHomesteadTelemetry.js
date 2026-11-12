import { useState, useEffect } from 'react';
import { TelemetryService } from '../services/telemetryService';

export function useHomesteadTelemetry() {
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchTelemetry() {
      const data = await TelemetryService.getLiveHomesteadTelemetry();
      if (isMounted) {
        setTelemetry(data);
        setLoading(false);
      }
    }

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 30000); // 30s polling
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { telemetry, loading };
}
