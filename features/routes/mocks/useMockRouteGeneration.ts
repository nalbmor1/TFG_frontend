import { useState } from 'react';
import { mockRouteResponse } from '../mocks/mockRoutes';
import { RouteResponse } from '../types/routeTypes';

export function useMockRouteGeneration() {
  const [data, setData] = useState<RouteResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const generateRoutes = (distance: number) => {
    setLoading(true);
    setTimeout(() => {
      setData(mockRouteResponse);
      setLoading(false);
    }, 4000);
  };

  const resetRoutes = () => {
    setData(null);
    setLoading(false);
  };

  return { data, loading, generateRoutes, resetRoutes };
}