import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name // Define o nome do usuário
        })
        .then(() => {
          console.log("Nome de usuário atualizado:", auth.currentUser.displayName);
          Alert.alert('Cadastro realizado', 'Sua conta foi criada com sucesso.');
          navigation.navigate('Login');
        })
        .catch((error) => {
          // Trate o erro ao atualizar o perfil do usuário
          Alert.alert('Erro ao cadastrar', error.message);
        });
      })
      .catch((error) => {
        // Trate o erro ao criar a conta do usuário
        Alert.alert('Erro ao cadastrar', error.message);
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
