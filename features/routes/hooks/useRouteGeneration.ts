import { useCallback, useEffect, useState } from 'react';
import { solicitarGeneracionRutas } from '../services/routeService';
import type { RouteResponse } from '../types/routeTypes';
import { useRoutePolling } from './useRoutePolling';

export function useRouteGeneration() {
    const [taskId, setTaskId] = useState<string>('');
    const [requesting, setRequesting] = useState(false);
    const [result, setResult] = useState<RouteResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { data, loading, error: pollError } = useRoutePolling(taskId);

    useEffect(() => {
        if (data) {
            setResult(data);
            setRequesting(false);
            setError(null);
        }
    }, [data]);

    useEffect(() => {
        if (pollError) {
            setError(pollError);
            setRequesting(false);
        }
    }, [pollError]);

    const generateRoutes = useCallback(
        async (
            distance: number,
            coords: { lat: number; lon: number },
        ) => {
            if (requesting || loading) return;
            try {
                setRequesting(true);
                setResult(null);
                setError(null);
                const task = await solicitarGeneracionRutas({
                    lat: coords.lat,
                    lon: coords.lon,
                    distance,
                });
                setTaskId(task.task_id);
            } catch (e) {
                setRequesting(false);
                const msg = e instanceof Error ? e.message : 'Error al solicitar generación de ruta';
                setError(msg);
            }
        },
        [requesting, loading],
    );

    const resetRoutes = useCallback(() => {
        setTaskId('');
        setResult(null);
        setRequesting(false);
        setError(null);
    }, []);

    return {
        data: result,
        loading: requesting || loading,
        generateRoutes,
        resetRoutes,
        error,
    };
}