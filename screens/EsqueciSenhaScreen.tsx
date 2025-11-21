import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { findUserByEmail } from "../database/userRepository";
import { loginStyles as styles } from "../styles/loginStyles";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "EsqueciSenha">;
};

export default function EsqueciSenhaScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");

  const handleNext = async () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Digite seu email");
      return;
    }

    const user = await findUserByEmail(email);

    if (!user) {
      Alert.alert("Erro", "Email não encontrado");
      return;
    }

    navigation.navigate("ResetarSenha", { email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FF9800" }]}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#999" }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}
