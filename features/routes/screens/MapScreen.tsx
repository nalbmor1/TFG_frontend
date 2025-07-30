import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import CustomMarker from '../components/CustomMarker';
import { useMapSelection } from '../hooks/useMapSelection';

export default function MapScreen() {
  const { selectedPoint, handleMapPress } = useMapSelection();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 39.4699,
          longitude: -0.3763,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedPoint && <CustomMarker coordinate={selectedPoint} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});