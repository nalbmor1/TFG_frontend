import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../features/routes/screens/MapScreen';
// Importa tus iconos de assets
import { Image } from 'react-native';

// Crea componentes temporales para las otras pantallas
function FavoritesScreen() { return <></>; }
function ActivityScreen() { return <></>; }
function ProfileScreen() { return <></>; }

const Tab = createBottomTabNavigator();

export default function NavBarNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff' },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: { marginTop: 10 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MapScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/images/nav_bar/home.png')} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/images/nav_bar/heart.png')} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/images/nav_bar/rayo.png')} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/images/nav_bar/user.png')} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}