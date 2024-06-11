import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase';
import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';

const EditProfileScreen = ({ route }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation(); 

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email);
      setUserName(currentUser.displayName);
    }
  }, []);

  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, credential);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('Usuário deslogado')
      navigation.navigate('Login')

    }) .catch((error) => {
        console.log(error)
    })
  };

  const handleUpdateProfile = () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      if (userName !== currentUser.displayName) {
        updateProfile(currentUser, {
          displayName: userName,
        }).then(() => {
          Alert.alert('Sucesso', 'Nome de usuário atualizado com sucesso!');
          const { updateDisplayName } = route.params || {};
          if (updateDisplayName) {
            updateDisplayName(userName); // Chamamos a função updateDisplayName para atualizar o nome de usuário na tela Home
          }
        }).catch((error) => {
          Alert.alert('Erro', error.message);
        });
      }

      if ((email !== currentUser.email || newPassword) && currentPassword) {
        reauthenticate(currentPassword).then(() => {
          if (email !== currentUser.email) {
            updateEmail(currentUser, email).then(() => {
              sendEmailVerification(currentUser).then(() => {
                Alert.alert('Sucesso', 'Verificação de email enviada. Por favor, verifique seu novo email antes de atualizar.');
              }).catch((error) => {
                Alert.alert('Erro', error.message);
              });
            }).catch((error) => {
              Alert.alert('Erro', error.message);
            });
          }

          if (newPassword) {
            updatePassword(currentUser, newPassword).then(() => {
              Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
            }).catch((error) => {
              Alert.alert('Erro', error.message);
            });
          }
        }).catch((error) => {
          Alert.alert('Erro', 'A reautenticação falhou. Verifique sua senha atual e tente novamente.');
        });
      } else if (email !== currentUser.email) {
        Alert.alert('Erro', 'Para atualizar o email, você deve fornecer a senha atual.');
      } else if (newPassword && !currentPassword) {
        Alert.alert('Erro', 'Para atualizar a senha, você deve fornecer a senha atual.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={24} color="#333" />
        <Text style={styles.title}>
          Meu Perfil
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="#333" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nome de Usuário"
          value={userName}
          onChangeText={setUserName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#333" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#333" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Senha Atual"
          secureTextEntry
          autoCompleteType="off"
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#333" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          secureTextEntry
          autoCompleteType="off"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Ionicons name="refresh" size={24} color="#fff" />
        <Text style={styles.buttonText}>Atualizar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#333" />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    padding: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buttonLogout:{
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 16,
  }
});

export default EditProfileScreen;