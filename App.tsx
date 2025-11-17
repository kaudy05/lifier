import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import HomeScreen from './screens/HomeScreen';
import EsqueciSenhaScreen from './screens/EsqueciSenhaScreen';
import ResetarSenhaScreen from './screens/ResetarSenhaScreen';

import React, { useEffect } from 'react';
import { createTables } from './database/sqlite';


export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined; 
  Home: undefined;
  EsqueciSenha: undefined;
  ResetarSenha: { email: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
   useEffect(() => {
    createTables();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenhaScreen} />
        <Stack.Screen name="ResetarSenha" component={ResetarSenhaScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
