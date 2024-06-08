// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen  from './screens/SignUpScreen';

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
            title: 'Cadastro', // Define o título da tela como "Cadastro"
            headerStyle: {
              backgroundColor: '#D11616', // Define a cor de fundo do cabeçalho
            },
            headerTintColor: '#fff', // Define a cor do texto do cabeçalho
            headerTitleStyle: {
              fontWeight: 'bold', // Define o estilo do título do cabeçalho
            },
            headerBackTitleVisible: false, // Esconde o título do botão de voltar
            headerBackTitleStyle: {
              color: 'blue', // Define a cor do texto do botão de voltar
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


