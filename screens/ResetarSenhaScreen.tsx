import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type NavProp = StackNavigationProp<RootStackParamList, "ResetarSenha">;

const ResetarSenhaScreen = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute();
  
  const email = (route.params as any)?.email;

  const [novaSenha, setNovaSenha] = useState("");

  const handleReset = async () => {
    if (!novaSenha) {
      Alert.alert("Erro", "Digite a nova senha");
      return;
    }

    Alert.alert("Sucesso", "Senha alterada com sucesso!");
    navigation.navigate("Login");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Redefinir Senha</Text>

      <Text style={{ marginBottom: 10 }}>Email: {email}</Text>

      <TextInput
        placeholder="Nova senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleReset}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Salvar nova senha
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetarSenhaScreen;
