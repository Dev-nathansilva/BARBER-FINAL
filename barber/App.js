// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen'; // Importa a tela HomeScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
