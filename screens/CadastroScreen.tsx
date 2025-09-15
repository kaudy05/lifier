import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';
import { cadastroStyles as styles } from '../styles/cadastroStyles';

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;
type Props = { navigation: CadastroScreenNavigationProp };

const CadastroScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela de Cadastro</Text>

            <TextInput style={styles.input} placeholder="Nome" />
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF9800' }]}
                onPress={() => navigation.navigate('Home')}
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
