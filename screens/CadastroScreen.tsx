import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUser } from "../database/userRepository"; // IMPORTANTE!

export default function CadastroScreen() {
  const navigation = useNavigation<any>();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarSenhaForte = (senha: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(senha);
  };

  const handleCadastro = async () => {
    setErro("");

    if (!nome.trim()) {
      setErro("Digite seu nome.");
      return;
    }

    if (!validarEmail(email)) {
      setErro("Digite um email válido (ex: exemplo@gmail.com).");
      return;
    }

    if (!validarSenhaForte(senha)) {
      setErro("A senha deve ter no mínimo 6 caracteres, incluindo letra e número.");
      return;
    }

    try {
      const ok = await createUser(nome.trim(), email.trim(), senha.trim());

      if (ok) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.navigate("Login");
      }
    } catch (error: any) {
      if (error?.message?.includes("UNIQUE constraint failed")) {
        setErro("Este email já está cadastrado.");
      } else {
        setErro("Erro ao cadastrar usuário.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

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
        autoCapitalize="none"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  erro: {
    color: "red",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
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
