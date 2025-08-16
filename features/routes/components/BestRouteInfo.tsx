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
              <Image source={require('../../../assets/images/routes/pollution.png')} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
              <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Índice de contaminación: {route.pollution}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Image source={require('../../../assets/images/routes/danger.png')} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
              <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Cruces o intersecciones: {Math.round(route.crossings * 100)}%</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Image source={require('../../../assets/images/routes/deviation.png')} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
              <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Desviación: {Math.round(route.length_deviation * 100)}%</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../../assets/images/routes/bike.png')} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
              <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Tramo sin carril bici: {Math.round(route.bikepath * 100)}%</Text>
            </View>
          </Wrapper>
        );
      })}
      {onShowAllRoutes && (selectedRouteIndex !== null || routes.length === 1) && (
        <Pressable
          onPress={onShowAllRoutes}
          style={{ alignItems: 'flex-start', marginTop: 1, paddingVertical: 1 }}
          accessibilityRole="button"
          accessibilityLabel="Mostrar todas las rutas"
        >
          <AntDesign name="back" size={26} color="#333" />
        </Pressable>
      )}
    </ScrollView>
  );
}