import { useState } from 'react';
import type { SortBy } from '../components/FilterDropdown';
import { useMapInteractions } from '../hooks/useMapInteractions';
import { useMapSelection } from '../hooks/useMapSelection';
import { useUserLocation } from '../hooks/useUserLocation';
import { useRouteGeneration } from './useRouteGeneration';
import { useSortedRoutes } from './useSortedRoutes';

export function useMapScreenState() {
  const { selectedPoint, handleMapPress } = useMapSelection();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isResultMode, setIsResultMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>('best');
  const [localError, setLocalError] = useState<string | null>(null);
  const { handleMapPressWithKeyboard } = useMapInteractions(isInputFocused, setIsInputFocused, handleMapPress);
  const userLocation = useUserLocation();
  const { data, loading, generateRoutes, resetRoutes, error: routeError, clearError: clearRouteError } = useRouteGeneration();

  const handleSearch = (text: string) => {
    const normalized = text.replace(',', '.').trim();
    const distanceKm = parseFloat(normalized);
    if (!isNaN(distanceKm) && distanceKm > 0) {
      const distanceMeters = Math.round(distanceKm * 1000);

      const coords = selectedPoint
        ? { lat: selectedPoint.latitude, lon: selectedPoint.longitude }
        : userLocation
          ? { lat: userLocation.latitude, lon: userLocation.longitude }
          : undefined;
      if (!coords) {
        setLocalError('Por favor, selecciona un punto de inicio o activa la ubicación.');
        return;
      }
      generateRoutes(distanceMeters, coords);
      setIsResultMode(true);
      setSearchValue(text);
    }
  };

  const handleBack = () => {
    setIsResultMode(false);
    setSearchValue('');
    setSelectedRouteIndex(null);
    setIsFilterOpen(false);
    setSortBy('best');
    resetRoutes();
  };

  const handleSelectRoute = (idx: number) => {
    setSelectedRouteIndex(idx);
  };

  const handleShowAllRoutes = () => {
    setSelectedRouteIndex(null);
  };

  const toggleFilters = () => setIsFilterOpen(v => !v);
  const handleSelectSort = (s: SortBy) => {
    // Clear selection so all routes render correctly after reorder
    setSelectedRouteIndex(null);
    setSortBy(s);
    setIsFilterOpen(false);
  };

  const { sortedRoutes, displayedRoutes } = useSortedRoutes(
    data?.routes,
    sortBy,
    selectedRouteIndex,
  );

  // Merge errors so the screen continues to use a single error/clearError pair
  const mergedError = localError ?? routeError ?? null;
  const clearAllErrors = () => {
    if (localError) setLocalError(null);
    if (routeError) clearRouteError();
  };

  return {
    selectedPoint,
    showSearchBar,
    setShowSearchBar,
    isInputFocused,
    setIsInputFocused,
    isResultMode,
    setIsResultMode,
    searchValue,
    setSearchValue,
    selectedRouteIndex,
    setSelectedRouteIndex,
    handleMapPressWithKeyboard,
    userLocation,
    data,
    sortedRoutes,
    loading,
    error: mergedError,
    handleSearch,
    handleBack,
    handleSelectRoute,
    handleShowAllRoutes,
    displayedRoutes,
    isFilterOpen,
    sortBy,
    toggleFilters,
    handleSelectSort,
    clearError: clearAllErrors,
  };
}