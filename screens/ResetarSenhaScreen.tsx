import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { updatePassword } from "../database/userRepository";

export default function ResetarSenhaScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { email } = route.params;

  const [novaSenha, setNovaSenha] = useState("");

  const handleResetarSenha = async () => {
    if (novaSenha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      await updatePassword(email, novaSenha);
      Alert.alert("Sucesso", "Senha atualizada com sucesso!");
      navigation.navigate("Login");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível atualizar a senha.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Digite a nova senha para o email:</Text>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>{email}</Text>

      <TextInput
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      <TouchableOpacity onPress={handleResetarSenha} style={{ padding: 15, backgroundColor: "green" }}>
        <Text style={{ color: "#fff" }}>Salvar senha</Text>
      </TouchableOpacity>
    </View>
  );
}
