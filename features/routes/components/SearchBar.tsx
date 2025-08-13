import { MaterialIcons } from '@expo/vector-icons';
import React, { ComponentProps, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function SearchBar({
  isResultMode = false,
  onBack,
  value: propValue,
  onChangeText,
  ...props
}: ComponentProps<typeof TextInput> & {
  isResultMode?: boolean;
  onBack?: () => void;
}) {
  const [value, setValue] = useState('');
  const inputValue = propValue !== undefined ? propValue : value;
  const handleChangeText = onChangeText || setValue;

  return (
    <View style={styles.container}>
      {isResultMode ? (
        <MaterialIcons name="filter-list" size={30} color="#2b2b2b" />
      ) : (
        <MaterialIcons name="search" size={30} color="#2b2b2b" />
      )}
      <View style={{ flex: 1, position: 'relative' }}>
        {inputValue === '' && (
          <View style={styles.placeholderContainer} pointerEvents="none">
            <Text style={styles.placeholderText}>
              ¿Cuánto quieres recorrer? · (Km)
            </Text>
          </View>
        )}
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleChangeText}
          editable={!isResultMode}
          {...props}
        />
      </View>
      {isResultMode && (
        <MaterialIcons
          name="close"
          size={28}
          color="#2b2b2b"
          style={{ marginLeft: 8 }}
          onPress={onBack}
        />
      )}
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