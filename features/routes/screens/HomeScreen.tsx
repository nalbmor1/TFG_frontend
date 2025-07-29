import React from 'react';
import { Button, Text, View } from 'react-native';
import { HomeScreenProps } from '../../../types/navigation';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pantalla de inicio</Text>
      <Button title="Ir al mapa" onPress={() => navigation.navigate('Map')} />
    </View>
  );
}