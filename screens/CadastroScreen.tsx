import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoadingHourglass from "../components/LoadingHourglass";
import { createUser, findUserByEmail } from "../database/userRepository";

export default function CadastroScreen() {
  const navigation = useNavigation<any>();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      // verifica se o email já existe
      const existing = await findUserByEmail(email);
      if (existing) {
        setLoading(false);
        Alert.alert("Erro", "Este e-mail já está cadastrado.");
        return;
      }

      // salva o usuário corretamente
      await createUser(nome, email, senha);

      // pequena espera para mostrar a animação
      await new Promise(resolve => setTimeout(resolve, 1000));

      setLoading(false);

      navigation.navigate("Login");
    } catch (err) {
      console.log("Erro ao cadastrar:", err);
      setLoading(false);
      Alert.alert("Erro", "Não foi possível cadastrar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      <LoadingHourglass
        visible={loading}
        message="Cadastro realizado com sucesso!"
        onFinish={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  input: {
    borderWidth: 1, borderColor: "#ccc",
    padding: 12, borderRadius: 8, marginBottom: 15
  },
  btn: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "600" },
});
