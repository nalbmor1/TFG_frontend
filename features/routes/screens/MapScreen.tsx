import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import BestRouteInfo from '../components/BestRouteInfo';
import CustomMarker from '../components/CustomMarker';
import RouteLoader from '../components/RouteLoader';
import RoutePolylines from '../components/RoutePolylines';
import SearchBar from '../components/SearchBar';
import UserLocationMarker from '../components/UserLocationMarker';
import { useMapInteractions } from '../hooks/useMapInteractions';
import { useMapSelection } from '../hooks/useMapSelection';
import { useUserLocation } from '../hooks/useUserLocation';
import { useMockRouteGeneration } from '../mocks/useMockRouteGeneration';

export default function MapScreen() {
  const { selectedPoint, handleMapPress } = useMapSelection();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isResultMode, setIsResultMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { handleMapPressWithKeyboard } = useMapInteractions(isInputFocused, setIsInputFocused, handleMapPress);
  const userLocation = useUserLocation();
  const { data, loading, generateRoutes, resetRoutes } = useMockRouteGeneration();

  const handleSearch = (text: string) => {
    const distance = parseFloat(text);
    if (!isNaN(distance)) {
      generateRoutes(distance);
      setIsResultMode(true);
      setSearchValue(text);
    }
  };

  const handleBack = () => {
    setIsResultMode(false);
    setSearchValue('');
    resetRoutes();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {showSearchBar && (
          <SearchBar
            isResultMode={isResultMode}
            onBack={handleBack}
            value={searchValue}
            onChangeText={setSearchValue}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onSubmitEditing={e => handleSearch(e.nativeEvent.text)}
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
          onPress={isResultMode ? undefined : handleMapPressWithKeyboard}
        >
          {userLocation && <UserLocationMarker coordinate={userLocation} />}
          {selectedPoint && <CustomMarker coordinate={selectedPoint} />}
          {data && <RoutePolylines routes={data.routes} />}
          
        </MapView>
        {data && <BestRouteInfo routes={data.routes} />}
        {loading && <RouteLoader />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  map: { width: '100%', height: '100%' },
});