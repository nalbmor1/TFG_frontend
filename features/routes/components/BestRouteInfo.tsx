import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteInfo } from '../types/routeTypes';

interface BestRouteInfoProps {
  routes: RouteInfo[];
  onSelectRoute?: (idx: number) => void;
  selectedRouteIndex?: number | null;
  onShowAllRoutes?: () => void;
}

export default function BestRouteInfo({ routes, onSelectRoute, selectedRouteIndex, onShowAllRoutes }: BestRouteInfoProps) {
  const insets = useSafeAreaInsets();
  const icons = React.useMemo(() => ({
    pollution: require('../../../assets/images/routes/pollution.png'),
    danger: require('../../../assets/images/routes/danger.png'),
    deviation: require('../../../assets/images/routes/deviation.png'),
    bike: require('../../../assets/images/routes/bike.png'),
  }), []);
  return (
    <ScrollView
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -insets.bottom,
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 5,
        maxHeight: 220,
      }}
      contentContainerStyle={{ paddingBottom: 14 }}
      showsVerticalScrollIndicator={false}
    >
      {routes.map((route, idx) => {
        const isSelected = selectedRouteIndex === idx || routes.length === 1;
        const Wrapper = onSelectRoute ? Pressable : View;
        return (
          <Wrapper
            key={idx}
            style={{
              marginBottom: 18,
              borderBottomWidth: idx < routes.length - 1 ? 1 : 0,
              borderBottomColor: '#eee',
              paddingBottom: idx < routes.length - 1 ? 18 : 0,
              borderRadius: 8,
            }}
            onPress={onSelectRoute ? () => onSelectRoute(idx) : undefined}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <View style={{
                backgroundColor: '#BC7769D4',
                borderColor: '#880C0C',
                borderWidth: 2,
                borderRadius: 3,
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginRight: 8,
                minWidth: 54,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 16, fontFamily: 'Afacad' }}>
                  {`${Math.round(((route.length / 1000) / 15) * 60)} min`}
                </Text>
              </View>
              <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>{(route.length / 1000).toFixed(2)} km</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Image source={icons.pollution} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
              <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Índice de contaminación: {route.pollution}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Image source={icons.danger} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
              <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Cruces o intersecciones: {Math.round(route.crossings * 100)}%</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Image source={icons.deviation} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
              <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Desviación: {Math.round(route.length_deviation * 100)}%</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={icons.bike} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
              <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Tramo sin carril bici: {Math.round(route.bikepath * 100)}%</Text>
            </View>
          </Wrapper>
        );
      })}
      {onShowAllRoutes && (selectedRouteIndex !== null || routes.length === 1) && (
        <Pressable
          onPress={onShowAllRoutes}
          style={{ alignItems: 'flex-start', marginTop: 1, paddingVertical: 1 }}
        >
          <AntDesign name="back" size={26} color="#333" />
        </Pressable>
      )}
    </ScrollView>
  );
}