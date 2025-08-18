import type { RouteInfo } from '../types/routeTypes';

const makePathKey = (r: RouteInfo, precision = 6) => {
  const toKey = (path: [number, number][]) =>
    path.map(([lat, lon]) => `${lat.toFixed(precision)},${lon.toFixed(precision)}`).join('|');
  const forward = toKey(r.path);
  const reverse = toKey(r.path.slice().reverse());
  return forward < reverse ? forward : reverse;
};

export function dedupeRoutes(routes: RouteInfo[] | undefined, precision = 6): RouteInfo[] | undefined {
  if (!routes) return undefined;
  const seen = new Set<string>();
  const out: RouteInfo[] = [];
  for (const r of routes) {
    const key = makePathKey(r, precision);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}
