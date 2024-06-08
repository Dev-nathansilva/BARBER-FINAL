import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleLogin = () => {
    // Verifica campos obrigatórios
    if (!email || !password) {
      const emptyFieldsArray = [];
      if (!email) emptyFieldsArray.push('email');
      if (!password) emptyFieldsArray.push('password');
      setEmptyFields(emptyFieldsArray);
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Logged in!', 'You have successfully logged in.');
      })
      .catch(error => {
        Alert.alert('Login failed', error.message);
      });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Redireciona para a tela de registro
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <View style={styles.content}>
          <Image source={require('../assets/logo-barber.png')} style={styles.logo} />
          <Text style={styles.loginText}>Faça seu login</Text>
          <View style={[styles.inputContainer, emailFocused && styles.inputContainerFocused, emptyFields.includes('email') && styles.inputContainerError]}>
            <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Digite Seu Email"
              placeholderTextColor="#978F8F"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>
          <View style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused, emptyFields.includes('password') && styles.inputContainerError]}>
            <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#978F8F"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#333"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.createAccountContainer}>
          <TouchableOpacity style={styles.createAccountButton} onPress={handleSignUp}>
            <Ionicons name="enter-outline" size={24} color="black" />
            <Text style={styles.createAccountText}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ccc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 24,
    color: '#444444',
    marginBottom: 20,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
    height: 60,
  },
  inputContainerFocused: {
    borderColor: '#000',
    borderWidth: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'black',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  createAccountContainer: {
    alignItems: 'center',
  },
  createAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
    marginBottom: 30,
  },
  createAccountText: {
    color: 'black',
    marginRight: 8,
    fontSize: 16,
    fontWeight: '700'
  },
  inputContainerError: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
