import { useState } from 'react';
import type { SortBy } from '../components/FilterDropdown';
import { useMapInteractions } from '../hooks/useMapInteractions';
import { useMapSelection } from '../hooks/useMapSelection';
import { useUserLocation } from '../hooks/useUserLocation';
import { useMockRouteGeneration } from '../mocks/useMockRouteGeneration';
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

  // Sorted and displayed routes derived by dedicated hook
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
    handleSearch,
    handleBack,
    handleSelectRoute,
    handleShowAllRoutes,
    displayedRoutes,
    isFilterOpen,
    sortBy,
    toggleFilters,
    handleSelectSort,
  };
}