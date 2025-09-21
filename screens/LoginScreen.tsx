import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { loginStyles as styles } from '../styles/loginStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type Props = { navigation: LoginScreenNavigationProp };

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      console.log("Dados encontrados:", userData); // Debug

      if (userData) {
        const user = JSON.parse(userData);

        if (user.email === email && user.senha === senha) {
          Alert.alert('Sucesso', `Bem-vindo, ${user.nome}!`);
          navigation.navigate('Home');
        } else {
          Alert.alert('Erro', 'Email ou senha incorretos');
        }
      } else {
        Alert.alert('Erro', 'Nenhum usuário cadastrado');
      }
    } catch (error) {
      console.log("Erro ao buscar:", error);
      Alert.alert('Erro', 'Problema ao acessar os dados');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4CAF50' }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2196F3' }]}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
