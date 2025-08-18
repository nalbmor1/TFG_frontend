import React from 'react';
import { Polyline } from 'react-native-maps';

interface RoutePolylinesProps {
  routes: { path: [number, number][] }[];
  onSelectRoute?: (idx: number) => void;
}

export default function RoutePolylines({ routes, onSelectRoute }: RoutePolylinesProps) {
  if (!routes || routes.length === 0) return null;

  // Solo pintar hasta 3 rutas, primera es la principal
  const [mainRoute, ...otherRoutes] = routes.slice(0, 3);
  const keyFor = (r: { path: [number, number][] }) => r.path.map(([lat, lon]) => `${lat},${lon}`).join('|');
  // Prefijo para diferenciar keys entre estados (una ruta vs varias) y forzar rerender limpio
  const stateTag = routes.length === 1 ? 'single' : 'multi';

  return (
    <>
      {otherRoutes.map((route, idx) => (
        <Polyline
          key={`${stateTag}-secondary-${idx}-${keyFor(route)}`}
          coordinates={route.path.map(([lat, lon]) => ({ latitude: lat, longitude: lon }))}
          strokeColor="rgba(188,119,105,0.5)"
          strokeWidth={3}
          tappable={!!onSelectRoute}
          onPress={onSelectRoute ? () => onSelectRoute(idx + 1) : undefined}
        />
      ))}
      {mainRoute && (
        <Polyline
          key={`${stateTag}-main-0-${keyFor(mainRoute)}`}
          coordinates={mainRoute.path.map(([lat, lon]) => ({ latitude: lat, longitude: lon }))}
          strokeColor="#880C0C"
          strokeWidth={5}
          tappable={!!onSelectRoute}
          onPress={onSelectRoute ? () => onSelectRoute(0) : undefined}
        />
      )}
    </>
  );
}