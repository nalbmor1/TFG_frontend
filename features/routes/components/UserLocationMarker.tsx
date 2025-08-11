import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';

export default function UserLocationMarker({ coordinate }: { coordinate: { latitude: number; longitude: number } }) {
  return (
    <Marker coordinate={coordinate}>
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle} />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  outerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(25, 118, 210, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1976d2',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
