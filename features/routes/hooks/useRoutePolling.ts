import { useEffect, useState } from 'react';
import { obtenerResultadoRuta } from '../services/routeService';
import { RouteResponse } from '../types/routeTypes';

export function useRoutePolling(taskId: string) {
  const [data, setData] = useState<RouteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) return;

    setData(null);
    setError(null);
    setLoading(true);
    setState(null);

    let interval: ReturnType<typeof setInterval>;
    let isMounted = true;

    const poll = async () => {
      try {
        const result = await obtenerResultadoRuta(taskId);
        if (!isMounted) return;

        setState(result.state);

        if (result.state === 'SUCCESS') {
          setData(result);
          setLoading(false);
          clearInterval(interval);
        } else if (result.state === 'FAILURE' || result.state === 'FAILING') {
          setError('La generación de la ruta ha fallado');
          setLoading(false);
          clearInterval(interval);
        }
      } catch (err) {
        setError('Error al obtener la ruta');
        setLoading(false);
        clearInterval(interval);
      }
    };

    interval = setInterval(poll, 1000);
    poll();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [taskId]);

  return { data, loading, error, state };
}