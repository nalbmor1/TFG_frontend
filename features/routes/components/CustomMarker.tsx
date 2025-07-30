import React from 'react';
import { Marker } from 'react-native-maps';

export default function CustomMarker({ coordinate }: { coordinate: { latitude: number; longitude: number } }) {
  return <Marker coordinate={coordinate} />;
}