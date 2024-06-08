// screens/MyAppointmentsScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyAppointmentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>
      {/* Conteúdo da tela de "Meus Agendamentos" aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
});
