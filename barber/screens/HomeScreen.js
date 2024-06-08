// screens/HomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';

export default function HomeScreen() {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    // Obtém o nome do usuário quando o componente for montado
    const currentUser = auth.currentUser;
    if (currentUser) {
      setDisplayName(currentUser.displayName);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={24} color="#333" />
        <Text style={styles.welcomeText}>Bem-vindo, {displayName}</Text>
      </View>
      {/* Conteúdo da tela aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: "#C1C1C1",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius:100,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

