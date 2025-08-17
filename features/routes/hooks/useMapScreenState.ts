import { useState } from 'react';
import { useMapInteractions } from '../hooks/useMapInteractions';
import { useMapSelection } from '../hooks/useMapSelection';
import { useUserLocation } from '../hooks/useUserLocation';
import { useMockRouteGeneration } from '../mocks/useMockRouteGeneration';

export function useMapScreenState() {
  const { selectedPoint, handleMapPress } = useMapSelection();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isResultMode, setIsResultMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null);
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
    resetRoutes();
  };

  const handleSelectRoute = (idx: number) => {
    setSelectedRouteIndex(idx);
  };

  const handleShowAllRoutes = () => {
    setSelectedRouteIndex(null);
  };

  const displayedRoutes = data && selectedRouteIndex !== null
    ? [data.routes[selectedRouteIndex]]
    : data?.routes;

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
    loading,
    handleSearch,
    handleBack,
    handleSelectRoute,
    handleShowAllRoutes,
    displayedRoutes,
  };
}
