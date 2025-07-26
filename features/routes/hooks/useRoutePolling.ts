import { useEffect, useState } from 'react';
import { obtenerResultadoRuta } from '../services/routeService';
import { RouteResponse } from '../types/routeTypes';

export function useRoutePolling(taskId: string) {
  const [data, setData] = useState<RouteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let isMounted = true;

    const poll = async () => {
      try {
        const result = await obtenerResultadoRuta(taskId);
        if (!isMounted) return;
        setData(result);
        if (result.state === 'SUCCESS') {
          setLoading(false);
          clearInterval(interval);
        } else if (result.state === 'FAILING') {
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
    poll(); // Llama una vez al principio

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [taskId]);

  return { data, loading, error };
}