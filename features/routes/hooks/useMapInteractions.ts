import { useCallback } from 'react';
import { Keyboard } from 'react-native';
import { MapPressEvent } from 'react-native-maps';

export function useMapInteractions(isInputFocused: boolean, setIsInputFocused: (focused: boolean) => void, handleMapPress: (event: MapPressEvent) => void) {
  const handleMapPressWithKeyboard = useCallback((event: MapPressEvent) => {
    if (isInputFocused) {
      Keyboard.dismiss();
      setIsInputFocused(false);
      return;
    }
    handleMapPress(event);
  }, [isInputFocused, setIsInputFocused, handleMapPress]);

  return { handleMapPressWithKeyboard };
}