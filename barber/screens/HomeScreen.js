// screens/HomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';

const barbersData = [
  {
    id: '1',
    name: 'João Pedro',
    imageUrl: require('../assets/images/barbeiro1.png'),
    days: 'Segunda à Sexta',
    hours: '8h às 18h',
  },
  {
    id: '2',
    name: 'Ricardo Nogueira',
    imageUrl: require('../assets/images/barbeiro2.png'),
    days: 'Segunda à Sexta',
    hours: '8h às 18h',
  },
  {
    id: '3',
    name: 'Paulo Henrique (PH)',
    imageUrl: require('../assets/images/barbeiro3.png'),
    days: 'Segunda à Sexta',
    hours: '8h às 18h',
  },
  {
    id: '4',
    name: 'Silva Pereira',
    imageUrl: require('../assets/images/barbeiro4.png'),
    days: 'Segunda à Sexta',
    hours: '8h às 18h',
  },
  {
    id: '5',
    name: 'Lucas Fernandes',
    imageUrl: require('../assets/images/barbeiro5.png'),
    days: 'Segunda à Sexta',
    hours: '8h às 18h',
  },
  {
    id: '6',
    name: 'Miguel Santos',
    imageUrl: 'https://via.placeholder.com/50',
    days: 'Segunda à Sexta',
    hours: '8h às 18h',
  },
  // Adicione mais barbeiros conforme necessário
];

export default function HomeScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    // Obtém o nome do usuário quando o componente for montado
    const currentUser = auth.currentUser;
    if (currentUser) {
      setDisplayName(currentUser.displayName);
    }
  }, []);

  const renderBarber = ({ item }) => (
    <TouchableOpacity
      style={styles.barberContainer}
      onPress={() => navigation.navigate('Appointment', { barber: item })}
    >
      <Image
        source={typeof item.imageUrl === 'string' ? { uri: item.imageUrl } : item.imageUrl}
        style={[styles.barberImage, { width: 50, height: 50, borderRadius: 25 }]}
      />
      <View style={styles.barberInfo}>
        <Text style={styles.barberName}>{item.name}</Text>
        <View style={styles.barberDetails}>
          <Ionicons name="calendar-outline" size={16} color="#333" />
          <Text style={styles.barberDetailText}>{item.days}</Text>
        </View>
        <View style={styles.barberDetails}>
          <Ionicons name="time-outline" size={16} color="#333" />
          <Text style={styles.barberDetailText}>{item.hours}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={24} color="#333" />
        <Text style={styles.welcomeText}>
          Bem-vindo, <Text style={styles.userName}>{displayName}</Text>
        </Text>
      </View>
      <Text style={styles.title}>Barbeiros</Text>
      <FlatList
        data={barbersData}
        renderItem={renderBarber}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.barbersList}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyAppointments')}
      >
        <Text style={styles.buttonText}>Ver Meus Agendamentos</Text>
      </TouchableOpacity>
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
      borderBottomRightRadius: 100,
    },
    welcomeText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    userName: {
      color: '#D11616',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginVertical: 16,
      textAlign: 'center',
      color: '#333',
    },
    barbersList: {
      paddingHorizontal: 16,
      paddingBottom: 80,
    },
    barberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
    },
    barberImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    barberInfo: {
      flex: 1,
    },
    barberName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    barberDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    barberDetailText: {
      marginLeft: 8,
      color: '#333',
    },
    button: {
      backgroundColor: 'red',
      borderRadius: 8,
      padding: 16,
      margin: 16,
      marginBottom: 23,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  