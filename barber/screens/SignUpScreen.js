import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Ionicons } from '@expo/vector-icons'; // Importando Ionicons

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSignUp = () => {
    // Verifica campos obrigatórios
    if (!name || !email || !password) {
      const emptyFieldsArray = [];
      if (!name) emptyFieldsArray.push('name');
      if (!email) emptyFieldsArray.push('email');
      if (!password) emptyFieldsArray.push('password');
      setEmptyFields(emptyFieldsArray);
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    // Verifica se o email já está cadastrado
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Se o email já existe, exibe mensagem de erro
        Alert.alert('Email já cadastrado', 'O email informado já está cadastrado.');
      })
      .catch(error => {
        // Se o email não existe, prossegue com o cadastro
        if (error.code === 'auth/user-not-found') {
          createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              Alert.alert('Cadastro realizado', 'Sua conta foi criada com sucesso.');
              navigation.navigate('Login');
            })
            .catch(error => {
              Alert.alert('Erro ao cadastrar', error.message);
            });
        } else {
          // Em caso de outros erros, exibe mensagem genérica
          Alert.alert('Erro', 'Ocorreu um erro ao verificar o email, Email já foi cadastrado ou digitado Errado.');
        }
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Image source={require('../assets/logo-barber.png')} style={styles.logo} />
        <Text style={styles.title}>Criar uma conta</Text>
        <Text style={styles.description}>A barber shop oferecerá um serviço de qualidade, confie no nosso trabalho!!!</Text>
        <View style={[styles.inputContainer, emptyFields.includes('name') && styles.inputError]}>
          <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Seu Nome"
            placeholderTextColor="#978F8F"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>
        <View style={[styles.inputContainer, emptyFields.includes('email') && styles.inputError]}>
          <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Digite Seu Email"
            placeholderTextColor="#978F8F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={[styles.inputContainer, emptyFields.includes('password') && styles.inputError]}>
          <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Crie uma Senha"
            placeholderTextColor="#978F8F"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ccc',
  },
  inner: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: -120,
  },
  title: {
    fontSize: 24,
    color: '#444444',
    marginBottom: 20,
    fontWeight: '700',
  },
  description:{
    flexDirection: 'row',
    alignItems: "center",
    textAlign: 'center',
    fontWeight: "500",
    color: "#787878",
    marginBottom: 30
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    height: 50,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 8,
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
});