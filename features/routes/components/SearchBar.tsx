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
          <Text style={styles.placeholder}>
            ¿Cuánto quieres recorrer? · (Km)
          </Text>
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
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
  placeholder: {
    position: 'absolute',
    left: 8,
    top: '50%',
    transform: [{ translateY: -12 }],
    fontSize: 18,
    color: '#6e6e6e',
    fontFamily: 'Afacad',
    zIndex: 1,
  },
});