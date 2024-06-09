import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; // Import the icon library
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

export default function AppointmentScreen({ route, navigation }) {
  const { barber, userName } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bookedTimes, setBookedTimes] = useState([]);

  useEffect(() => {
    const fetchBookedTimes = async () => {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const q = query(collection(firestore, 'appointments'), where('date', '==', dateStr), where('barberName', '==', barber.name));
      const querySnapshot = await getDocs(q);
      const fetchedTimes = querySnapshot.docs.map(doc => doc.data().time);
      setBookedTimes(fetchedTimes);
    };

    fetchBookedTimes();
  }, [selectedDate, barber.name]);

  const onChangeDate = (event, date) => {
    const currentDate = date || selectedDate;
    setSelectedDate(currentDate);
  };

  const handleTimeSelection = (time) => {
    if (!bookedTimes.includes(time)) {
      setSelectedTime(time);
    } else {
      Alert.alert('Horário indisponível', 'Este horário já está agendado. Por favor, escolha outro horário.');
    }
  };

  const handleAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Por favor, selecione uma data e um horário.');
      return;
    }

    try {
      // Adiciona um novo documento à coleção 'appointments'
      const docRef = await addDoc(collection(firestore, 'appointments'), {
        barberName: barber.name,
        userName: userName,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
      });
      console.log("Appointment added with ID: ", docRef.id);
      Alert.alert('Agendamento confirmado!');
      navigation.navigate('MyAppointments', { userName });
    } catch (e) {
      console.error("Error adding appointment: ", e);
    }
  };

  const renderTimeSlot = (time) => {
    const isBooked = bookedTimes.includes(time);
    return (
      <TouchableOpacity
        key={time}
        style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot, isBooked && styles.bookedTimeSlot]}
        onPress={() => handleTimeSelection(time)}
        disabled={isBooked}
      >
        <Text style={[styles.timeSlotText, selectedTime === time && styles.selectedTimeSlotText, isBooked && styles.bookedTimeSlotText]}>
          {time}
        </Text>
        {isBooked && (
          <MaterialIcons name="block" size={24} color="#D11616" style={styles.blockedIcon} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.barberInfo}>
        <Image source={typeof barber.imageUrl === 'string' ? { uri: barber.imageUrl } : barber.imageUrl} style={styles.barberImage} />
        <Text style={styles.barberName}>{barber.name}</Text>
      </View>

      <TouchableOpacity style={styles.selectDateButton} onPress={() => setShowDatePicker(!showDatePicker)}>
        <FontAwesome5 name="calendar-alt" size={24} color="#fff" style={styles.calendarIcon} />
        <Text style={styles.selectDateButtonText}>Selecionar Data</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
          style={[styles.datePicker, styles.leftAlign]}
          locale="pt-BR"
        />
      )}

      <Text style={styles.label}>Escolha o horário</Text>

      <Text style={styles.timePeriod}>Manhã</Text>
      <View style={styles.timeSlots}>
        {barber.availableTimes.morning.length > 0 ? (
          barber.availableTimes.morning.map(renderTimeSlot)
        ) : (
          <Text style={styles.noTimeAvailableText}>Sem horários disponíveis para este turno.</Text>
        )}
      </View>

      <Text style={styles.timePeriod}>Tarde</Text>
      <View style={styles.timeSlots}>
        {barber.availableTimes.afternoon.length > 0 ? (
          barber.availableTimes.afternoon.map(renderTimeSlot)
        ) : (
          <Text style={styles.noTimeAvailableText}>Sem horários disponíveis para este turno.</Text>
        )}
      </View>

      <Text style={styles.timePeriod}>Noite</Text>
      <View style={styles.timeSlots}>
        {barber.availableTimes.night.length > 0 ? (
          barber.availableTimes.night.map(renderTimeSlot)
        ) : (
          <Text style={styles.noTimeAvailableText}>Sem horários disponíveis para este turno.</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAppointment}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  barberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  barberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  barberName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  datePicker: {
    marginBottom: 16,
  },
  leftAlign: {
    alignSelf: 'flex-start',
  },
  selectDateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: "#D11616",
    width: '50%',
    padding: 10,
    borderRadius: 10
  },
  selectDateButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  calendarIcon: {
    marginRight: 8,
  },
  timePeriod: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    position: 'relative', // Added for positioning
  },
  selectedTimeSlot: {
    backgroundColor: '#D11616',
  },
  bookedTimeSlot: {
    backgroundColor: '#999',
  },
  timeSlotText: {
    color: '#000',
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  bookedTimeSlotText: {
    color: '#fff',
  },
  blockedIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -1 }, { translateY: -2 }],
  },
  noTimeAvailableText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#D11616',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
