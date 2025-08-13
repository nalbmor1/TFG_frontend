import React from 'react';
import { Polyline } from 'react-native-maps';

interface RoutePolylinesProps {
  routes: { path: [number, number][] }[];
}

export default function RoutePolylines({ routes }: RoutePolylinesProps) {
  return (
    <>
      {routes.slice(0, 3).map((route, idx) => (
        <Polyline
          key={idx}
          coordinates={route.path.map(([lat, lon]) => ({ latitude: lat, longitude: lon }))}
          strokeColor={idx === 0 ? '#880C0C' : '#BC7769'}
          strokeWidth={idx === 0 ? 5 : 3}
        />
      ))}
    </>
  );
}