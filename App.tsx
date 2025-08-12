import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as React from 'react';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Afacad': require('./assets/fonts/Afacad-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}