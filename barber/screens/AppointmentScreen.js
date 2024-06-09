import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';



export default function AppointmentScreen({ route, navigation }) {
  const { barber, userName } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setSelectedDate(currentDate);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
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
          barber.availableTimes.morning.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
              onPress={() => handleTimeSelection(time)}
            >
              <Text style={[styles.timeSlotText, selectedTime === time && styles.selectedTimeSlotText]}>{time}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTimeAvailableText}>Sem horários disponíveis para este turno.</Text>
        )}
      </View>

      <Text style={styles.timePeriod}>Tarde</Text>
      <View style={styles.timeSlots}>
        {barber.availableTimes.afternoon.length > 0 ? (
          barber.availableTimes.afternoon.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
              onPress={() => handleTimeSelection(time)}
            >
              <Text style={[styles.timeSlotText, selectedTime === time && styles.selectedTimeSlotText]}>{time}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTimeAvailableText}>Sem horários disponíveis para este turno.</Text>
        )}
      </View>

      <Text style={styles.timePeriod}>Noite</Text>
      <View style={styles.timeSlots}>
        {barber.availableTimes.night.length > 0 ? (
          barber.availableTimes.night.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
              onPress={() => handleTimeSelection(time)}
            >
              <Text style={[styles.timeSlotText, selectedTime === time && styles.selectedTimeSlotText]}>{time}</Text>
            </TouchableOpacity>
          ))
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
  },
  selectedTimeSlot: {
    backgroundColor: '#D11616',
  },
  timeSlotText: {
    color: '#000',
  },
  selectedTimeSlotText: {
    color: '#fff',
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
