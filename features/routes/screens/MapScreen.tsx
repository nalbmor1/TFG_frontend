import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomMarker from '../components/CustomMarker';
import SearchBar from '../components/SearchBar';
import { useMapInteractions } from '../hooks/useMapInteractions';
import { useMapSelection } from '../hooks/useMapSelection';

export default function MapScreen() {
  const { selectedPoint, handleMapPress } = useMapSelection();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { handleMapPressWithKeyboard } = useMapInteractions(isInputFocused, setIsInputFocused, handleMapPress);

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