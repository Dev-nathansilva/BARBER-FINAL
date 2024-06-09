// WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

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
    resizeMode: 'cover', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    marginBottom: 50, 
    marginLeft: 20, 
    alignItems: 'flex-start', 
  },
  startButton: {
    backgroundColor: '#D11616',
    borderRadius: 8,
    padding: 16,
  },
  buttonContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 5,
  },
});

export default WelcomeScreen;
