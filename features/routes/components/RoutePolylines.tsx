import React from 'react';
import { Polyline } from 'react-native-maps';

interface RoutePolylinesProps {
  routes: { path: [number, number][] }[];
}

export default function RoutePolylines({ routes }: RoutePolylinesProps) {
  if (!routes || routes.length === 0) return null;

  const [mainRoute, ...otherRoutes] = routes.slice(0, 3);

  return (
    <>
      {otherRoutes.map((route, idx) => (
        <Polyline
          key={`secondary-${idx}`}
          coordinates={route.path.map(([lat, lon]) => ({ latitude: lat, longitude: lon }))}
          strokeColor="rgba(188,119,105,0.5)"
          strokeWidth={3}
        />
      ))}
      {mainRoute && (
        <Polyline
          key="main"
          coordinates={mainRoute.path.map(([lat, lon]) => ({ latitude: lat, longitude: lon }))}
          strokeColor="#880C0C"
          strokeWidth={5}
        />
      )}
    </>
  );
}