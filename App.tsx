import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from './features/routes/screens/HomeScreen';
import MapScreen from './features/routes/screens/MapScreen';
import { RootStackParamList } from './navigation/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} options={{ headerBackVisible: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}