// WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa o ícone desejado

const WelcomeScreen = ({ navigation }) => {
  const handleStartNow = () => {
    navigation.navigate('Login'); // Navega para a tela de login ao pressionar o botão
  };

  return (
    <ImageBackground source={require('../assets/welcome-2.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartNow}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Começar Agora</Text>
            <Ionicons name="arrow-forward" size={24} color="#fff" style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // ou 'stretch' para esticar a imagem para preencher o conteúdo
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute', // Posiciona o container de forma absoluta
    bottom: 0, // Alinha o container ao fundo da tela
    left: 0, // Alinha o container à esquerda da tela
    marginBottom: 50, // Adiciona um espaçamento inferior
    marginLeft: 20, // Adiciona um espaçamento à esquerda
    alignItems: 'flex-start', // Alinha os itens no início do container
  },
  startButton: {
    backgroundColor: '#D11616',
    borderRadius: 8,
    padding: 16,
  },
  buttonContent: {
    flexDirection: 'row', // Define a direção da linha como horizontal
    alignItems: 'center', // Alinha os itens no centro
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 5, // Adiciona espaçamento entre o ícone e o texto
  },
});

export default WelcomeScreen;
