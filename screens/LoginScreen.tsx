import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Crypto from "expo-crypto";

import { findUserByEmail } from "../database/userRepository";
import LoadingHourglass from "../components/LoadingHourglass";

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !senha) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }

    try {
      setLoading(true);

      // 1) Busca usuário pelo email
      const user: any = await findUserByEmail(email.trim());

      if (!user) {
        setLoading(false);
        Alert.alert("Erro", "Email não encontrado");
        return null;
      }

      // 2) Gera hash da senha digitada (mesmo algoritmo usado no createUser)
      const senhaHashDigitada = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        senha
      );

      // 3) Compara com o hash salvo no banco (campo 'senha' conforme createUser)
      if (senhaHashDigitada !== user.senha) {
        setLoading(false);
        Alert.alert("Erro", "Senha incorreta");
        return null;
      }

      // 4) Login OK -> retorna o usuário para que o chamador decida a navegação
      return user;
    } catch (err) {
      console.log("Erro no login:", err);
      setLoading(false);
      Alert.alert("Erro", "Não foi possível realizar login");
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={async () => {
        const user = await handleLogin();
        if (user) {
          setCurrentUserId(user.id);
          setLoading(true);
        }
      }}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.linkButton]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgot}
        onPress={() => navigation.navigate("EsqueciSenha")}
      >
        <Text style={styles.forgotText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      {/* LoadingHourglass: onFinish navega para Home e limpa loading */}
      <LoadingHourglass
        visible={loading}
        message="Entrando..."
        durationMs={900}
        onFinish={() => {
          setLoading(false);
          // navega passando userId para que a tela Home carregue dados específicos do usuário
          navigation.navigate("Home", { userId: currentUserId });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButton: { backgroundColor: "#27ae60" },
  linkButton: { backgroundColor: "#2196F3" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  forgot: { marginTop: 6, alignSelf: "center" },
  forgotText: { color: "#2196F3", fontWeight: "600" },
});
