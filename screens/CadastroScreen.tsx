import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { cadastroStyles as styles } from '../styles/cadastroStyles';

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;
type Props = { navigation: CadastroScreenNavigationProp };

const CadastroScreen: React.FC<Props> = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = async () => {
        if (!nome || !email || !senha) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        try {
            const user = { nome, email, senha };

            // Salva usuário no AsyncStorage
            await AsyncStorage.setItem('@user', JSON.stringify(user));

            console.log("Usuário salvo:", user); // Debug no console
            Alert.alert('Sucesso', 'Usuário cadastrado!');
            navigation.navigate('Login');
        } catch (error) {
            console.log("Erro ao salvar:", error);
            Alert.alert('Erro', 'Não foi possível salvar os dados');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela de Cadastro</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF9800' }]}
                onPress={handleCadastro}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#9E9E9E' }]}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Voltar ao Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CadastroScreen;
