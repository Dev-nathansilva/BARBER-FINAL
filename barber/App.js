// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen'; 
import AppointmentScreen from './screens/AppointmentScreen'; // Importa a tela de agendamentos
import MyAppointmentsScreen from './screens/MyAppointmentsScreen'; // Importa a tela de "Meus Agendamentos"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: 'Cadastro',
            headerStyle: {
              backgroundColor: '#D11616',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitleVisible: false,
            headerBackTitleStyle: {
              color: 'blue',
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#D11616',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitleVisible: false,
            headerBackTitleStyle: {
              color: 'blue',
            },
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Appointment"
          component={AppointmentScreen}
          options={{
            title: 'Agendamento',
            headerStyle: {
              backgroundColor: '#D11616',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="MyAppointments"
          component={MyAppointmentsScreen}
          options={{
            title: 'Meus Agendamentos',
            headerStyle: {
              backgroundColor: '#D11616',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
