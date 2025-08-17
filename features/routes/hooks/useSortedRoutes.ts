import { useMemo } from 'react';
import type { SortBy } from '../components/FilterDropdown';
import type { RouteInfo } from '../types/routeTypes';

const asc = (sel: (r: RouteInfo) => number) => (a: RouteInfo, b: RouteInfo) => sel(a) - sel(b);
const desc = (sel: (r: RouteInfo) => number) => (a: RouteInfo, b: RouteInfo) => sel(b) - sel(a);

export const sortRoutes = (routes: RouteInfo[], by: SortBy): RouteInfo[] => {
  const copy = routes.slice();
  switch (by) {
    case 'best':
      return copy.sort(desc(r => r.hypervolume));
    case 'pollution':
      return copy.sort(asc(r => r.pollution));
    case 'crossings':
      return copy.sort(asc(r => r.crossings));
    case 'deviation':
      return copy.sort(asc(r => r.length_deviation));
    case 'bikepath':
      return copy.sort(asc(r => r.bikepath));
    default:
      return copy;
  }
};

export function useSortedRoutes(
  routes: RouteInfo[] | undefined,
  sortBy: SortBy,
  selectedRouteIndex: number | null
) {
  const sortedRoutes = useMemo(() => {
    if (!routes) return undefined;
    return sortRoutes(routes, sortBy);
  }, [routes, sortBy]);

  const displayedRoutes = useMemo(() => {
    if (!sortedRoutes) return undefined;
    if (selectedRouteIndex !== null) {
      const sel = sortedRoutes[selectedRouteIndex];
      return sel ? [sel] : sortedRoutes;
    }
    return sortedRoutes;
  }, [sortedRoutes, selectedRouteIndex]);

  return { sortedRoutes, displayedRoutes };
}
