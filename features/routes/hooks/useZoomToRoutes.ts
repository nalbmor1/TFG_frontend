import { useEffect } from 'react';
import type MapView from 'react-native-maps';
import type { LatLng } from 'react-native-maps';

export function useZoomToRoutes(
  mapRef: React.RefObject<MapView>,
  routes: { path: [number, number][] }[] | undefined
) {
  useEffect(() => {
    if (routes && routes.length > 0 && mapRef.current) {
      const allCoords: LatLng[] = [];
      routes.forEach(route => {
        if (Array.isArray(route.path)) {
          allCoords.push(
            ...route.path.map(([latitude, longitude]) => ({ latitude, longitude }))
          );
        }
      });
      if (allCoords.length > 0) {
        setTimeout(() => {
          mapRef.current?.fitToCoordinates(allCoords, {
            edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
            animated: true,
          });
        }, 400);
      }
    }
  }, [routes, mapRef]);
}
