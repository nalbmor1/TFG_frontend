import { MaterialIcons } from '@expo/vector-icons';
import React, { ComponentProps, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function SearchBar(props: ComponentProps<typeof TextInput>) {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={30} color="#2b2b2b" />
      <View style={{ flex: 1, position: 'relative' }}>
        {value === '' && (
          <View style={styles.placeholderContainer} pointerEvents="none">
            <Text style={styles.placeholderText}>
              ¿Cuánto quieres recorrer? · (Km)
            </Text>
          </View>
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          keyboardType="default"
          returnKeyType="done"
          {...props}
        />
      </View>
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
    fontSize: 18,
    fontFamily: 'Afacad',
  },
  placeholderContainer: {
    position: 'absolute',
    left: 8,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  placeholderText: {
    fontSize: 18,
    color: '#6e6e6e',
    fontFamily: 'Afacad',
  },
});