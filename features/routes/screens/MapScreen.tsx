import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import BestRouteInfo from '../components/BestRouteInfo';
import CustomMarker from '../components/CustomMarker';
import FilterDropdown from '../components/FilterDropdown';
import RouteLoader from '../components/RouteLoader';
import RoutePolylines from '../components/RoutePolylines';
import SearchBar from '../components/SearchBar';
import UserLocationMarker from '../components/UserLocationMarker';
import { useMapScreenState } from '../hooks/useMapScreenState';
import { useZoomToRoutes } from '../hooks/useZoomToRoutes';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null!);
  const state = useMapScreenState();
  useZoomToRoutes(mapRef, state.data?.routes);
  const [searchBarContainerBottom, setSearchBarContainerBottom] = useState<number | undefined>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {state.showSearchBar && (
          <View
            onLayout={e => {
              const { y, height } = e.nativeEvent.layout;
              setSearchBarContainerBottom(y + height);
            }}
          >
            <SearchBar
              isResultMode={state.isResultMode}
              onBack={state.handleBack}
              value={state.searchValue}
              onChangeText={state.setSearchValue}
              onFocus={() => state.setIsInputFocused(true)}
              onBlur={() => state.setIsInputFocused(false)}
              onSubmitEditing={e => state.handleSearch(e.nativeEvent.text)}
              onPressFilter={state.toggleFilters}
            />
          </View>
        )}
        <FilterDropdown
          visible={state.isResultMode && state.isFilterOpen}
          selectedSort={state.sortBy}
          onSelectSort={state.handleSelectSort}
          onClose={state.toggleFilters}
          top={searchBarContainerBottom ? searchBarContainerBottom + 2 : undefined}
        />
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 39.4699,
            longitude: -0.3763,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={state.isResultMode ? undefined : state.handleMapPressWithKeyboard}
        >
          {state.userLocation && <UserLocationMarker coordinate={state.userLocation} />}
          {state.selectedPoint && <CustomMarker coordinate={state.selectedPoint} />}
          {state.displayedRoutes && (
            <RoutePolylines
              key={`${state.sortBy}-${state.selectedRouteIndex ?? 'all'}-${state.displayedRoutes.length}`}
              routes={state.displayedRoutes}
              onSelectRoute={state.selectedRouteIndex === null ? state.handleSelectRoute : undefined}
            />
          )}
        </MapView>
        {state.data && (
          <BestRouteInfo
            routes={state.sortedRoutes || []}
            onSelectRoute={state.selectedRouteIndex === null ? state.handleSelectRoute : undefined}
            selectedRouteIndex={state.selectedRouteIndex}
            onShowAllRoutes={state.selectedRouteIndex !== null ? state.handleShowAllRoutes : undefined}
          />
        )}
        {state.loading && <RouteLoader />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  map: { width: '100%', height: '100%' },
});