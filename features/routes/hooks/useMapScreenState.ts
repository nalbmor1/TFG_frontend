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
  const { handleMapPressWithKeyboard } = useMapInteractions(isInputFocused, setIsInputFocused, handleMapPress);
  const userLocation = useUserLocation();
  const { data, loading, generateRoutes, resetRoutes, error, clearError } = useRouteGeneration();

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
      if (!coords) return;
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
    error,
    handleSearch,
    handleBack,
    handleSelectRoute,
    handleShowAllRoutes,
    displayedRoutes,
    isFilterOpen,
    sortBy,
    toggleFilters,
    handleSelectSort,
    clearError,
  };
}