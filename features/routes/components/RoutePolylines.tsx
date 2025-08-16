import React from 'react';
import { Polyline } from 'react-native-maps';

interface RoutePolylinesProps {
  routes: { path: [number, number][] }[];
}

export default function RoutePolylines({ routes }: RoutePolylinesProps) {
  if (!routes || routes.length === 0) return null;

  // Solo pintar hasta 3 rutas, primera es la principal
  const [mainRoute, ...otherRoutes] = routes.slice(0, 3);
  const keyFor = (r: { path: [number, number][] }) => r.path.map(([lat, lon]) => `${lat},${lon}`).join('|');
  // Prefijo para diferenciar keys entre estados (una ruta vs varias) y forzar rerender limpio
  const stateTag = routes.length === 1 ? 'single' : 'multi';

  return (
    <>
    {otherRoutes.map((route) => (
        <Polyline
      key={`${stateTag}-secondary-${keyFor(route)}`}
          coordinates={route.path.map(([lat, lon]) => ({ latitude: lat, longitude: lon }))}
          strokeColor="rgba(188,119,105,0.5)"
          strokeWidth={3}
        />
      ))}
      {mainRoute && (
        <Polyline
      key={`${stateTag}-main-${keyFor(mainRoute)}`}
          coordinates={mainRoute.path.map(([lat, lon]) => ({ latitude: lat, longitude: lon }))}
          strokeColor="#880C0C"
          strokeWidth={5}
        />
      )}
    </>
  );
}