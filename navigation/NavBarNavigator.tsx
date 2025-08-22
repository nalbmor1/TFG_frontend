import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import MapScreen from '../features/routes/screens/MapScreen';

function FavoritesScreen() { return <></>; }
function ActivityScreen() { return <></>; }
function ProfileScreen() { return <></>; }

const Tab = createBottomTabNavigator();

export default function NavBarNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff', height: 80 },
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
            <Image source={require('../assets/images/nav_bar/home.png')} style={{ width: 24, height: 24 }} resizeMode="contain" />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/images/nav_bar/heart.png')} style={{ width: 24, height: 24 }} resizeMode="contain" />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/images/nav_bar/rayo.png')} style={{ width: 26, height: 26 }} resizeMode="contain" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/images/nav_bar/user.png')} style={{ width: 22, height: 22 }} resizeMode="contain" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}