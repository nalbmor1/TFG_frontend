import { useState } from 'react';

export function useMapSelection() {
  const [selectedPoint, setSelectedPoint] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleMapPress = (event: any) => {
    if (selectedPoint === null) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setSelectedPoint({ latitude, longitude });
    } else {
      setSelectedPoint(null);
    }
  };

  return { selectedPoint, handleMapPress };
}