import { MaterialIcons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar(props: ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={30} color="#2b2b2b" />
      <TextInput
        style={styles.input}
        placeholder="Buscar ruta"
        placeholderTextColor="black"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    padding: 8,
    borderRadius: 8,
    margin: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});