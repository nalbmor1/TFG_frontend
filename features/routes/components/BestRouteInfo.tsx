

import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { RouteInfo } from '../types/routeTypes';

interface BestRouteInfoProps {
  routes: RouteInfo[];
}

export default function BestRouteInfo({ routes }: BestRouteInfoProps) {
  return (
    <ScrollView
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -34,
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
      {routes.map((route, idx) => (
        <View key={idx} style={{ marginBottom: 18, borderBottomWidth: idx < routes.length - 1 ? 1 : 0, borderBottomColor: '#eee', paddingBottom: idx < routes.length - 1 ? 18 : 0 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, fontFamily: 'Afacad' }}>{route.length} km</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Image source={require('../../../assets/images/routes/pollution.png')} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
            <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Índice de contaminación: {route.pollution}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Image source={require('../../../assets/images/routes/danger.png')} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
            <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Índice de peligrosidad: {route.crossings}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Image source={require('../../../assets/images/routes/deviation.png')} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
            <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Desviación: {route.length_deviation}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../../assets/images/routes/bike.png')} style={{ width: 22, height: 22, marginRight: 8 }} resizeMode="contain" />
            <Text style={{ fontSize: 18, fontFamily: 'Afacad' }}>Tramo sin carril bici: {route.bikepath}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}