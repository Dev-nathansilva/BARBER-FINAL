import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase';
import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Importe o método useNavigation
import { Ionicons } from '@expo/vector-icons';

const EditProfileScreen = ({ route }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation(); // Obtenha a referência para o objeto de navegação

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
      <Text style={styles.title}>Meu Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha Atual"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Atualizar Perfil" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});

export default EditProfileScreen;
