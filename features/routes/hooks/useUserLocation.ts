import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    let isMounted = true;

    const startWatching = async () => {
      if (subscriptionRef.current) return;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        try {
          subscriptionRef.current = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 2000, distanceInterval: 1 },
            location => {
              if (isMounted) {
                setUserLocation({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                });
              }
            }
          );
        } catch {
          if (isMounted) setUserLocation(null);
        }
      }
    };

    const stopWatching = () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      setUserLocation(null);
    };

    interval = setInterval(async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') {
        startWatching();
      } else {
        stopWatching();
      }
    }, 2000);

    startWatching();

    return () => {
      isMounted = false;
      stopWatching();
      if (interval) clearInterval(interval);
    };
  }, []);

  return userLocation;
}
