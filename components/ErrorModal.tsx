import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface ErrorModalProps {
  visible: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  confirmLabel?: string;
}

export default function ErrorModal({ visible, title = 'Error', message, onClose, confirmLabel = 'Entendido' }: ErrorModalProps) {
  
  const [displayMessage, setDisplayMessage] = useState(message);
  useEffect(() => {
    if (message) setDisplayMessage(message);
  }, [message]);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{displayMessage}</Text>
          <Pressable style={styles.button} onPress={onClose} android_ripple={{ color: '#ffffff33' }}>
            <Text style={styles.buttonText}>{confirmLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 6,
  },
  title: {
    fontFamily: 'Afacad',
    fontSize: 20,
    marginBottom: 8,
    color: '#111',
  },
  message: {
    fontFamily: 'Afacad',
    fontSize: 16,
    color: '#333',
    marginBottom: 14,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#880C0C',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  buttonText: {
    fontFamily: 'Afacad',
    fontSize: 16,
    color: '#fff',
  },
});
