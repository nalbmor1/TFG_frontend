import React, { useState } from 'react';
import { Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
import MapView, { MapPressEvent } from 'react-native-maps';
import CustomMarker from '../components/CustomMarker';
import SearchBar from '../components/SearchBar';
import { useMapSelection } from '../hooks/useMapSelection';

export default function MapScreen() {
  const { selectedPoint, handleMapPress } = useMapSelection();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Cierra el teclado si el input está enfocado, si no ejecuta la lógica normal de selección
  const handleMapPressWithKeyboard = (event: MapPressEvent) => {
    if (isInputFocused) {
      Keyboard.dismiss();
      setIsInputFocused(false);
      return;
    }
    handleMapPress(event);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {showSearchBar && (
          <SearchBar
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        )}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 39.4699,
            longitude: -0.3763,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPressWithKeyboard}
        >
          {selectedPoint && <CustomMarker coordinate={selectedPoint} />}
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  map: { width: '100%', height: '100%' },
});