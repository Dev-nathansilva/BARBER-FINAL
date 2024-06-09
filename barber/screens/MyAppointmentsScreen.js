import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

export default function MyAppointmentsScreen({ route }) {
  const { userName } = route.params;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const q = query(collection(firestore, 'appointments'), where('userName', '==', userName));
      const querySnapshot = await getDocs(q);
      const fetchedAppointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(fetchedAppointments);
    };

    fetchAppointments();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.appointmentText}>Barbeiro: {item.barberName}</Text>
      <Text style={styles.appointmentText}>Data: {item.date}</Text>
      <Text style={styles.appointmentText}>Hora: {item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  appointmentItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appointmentText: {
    fontSize: 16,
  },
});
