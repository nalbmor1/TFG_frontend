import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import NavBarNavigator from './NavBarNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={NavBarNavigator} options={{ headerBackVisible: false, headerShown: false }} />
    </Stack.Navigator>
  );
}
