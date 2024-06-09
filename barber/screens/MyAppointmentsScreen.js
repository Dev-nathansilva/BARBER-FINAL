import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
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
  }, [userName]);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await deleteDoc(doc(firestore, 'appointments', appointmentId));
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      console.error("Error canceling appointment: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <View>
        <Text style={styles.appointmentText}>Barbeiro: {item.barberName}</Text>
        <Text style={styles.appointmentText}>Data: {item.date}</Text>
        <Text style={styles.appointmentText}>Hora: {item.time}</Text>
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => handleCancelAppointment(item.id)}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {appointments.length === 0 ? (
        <Text style={styles.noAppointmentsText}>Ainda não há Registros de Agendamentos</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  noAppointmentsText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  appointmentItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentText: {
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#D11616',
    borderRadius: 8,
    padding: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
