import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../features/routes/screens/HomeScreen';
import MapScreen from '../features/routes/screens/MapScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} options={{ headerBackVisible: false, headerShown: false }} />
    </Stack.Navigator>
  );
}
