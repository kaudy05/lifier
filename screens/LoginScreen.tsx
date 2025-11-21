import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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

  const handleLogin = async () => {
    if (!email.trim() || !senha) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }

    try {
      setLoading(true);

      const user = await findUserByEmail(email.trim());

      if (!user) {
        setLoading(false);
        Alert.alert("Erro", "Email não encontrado");
        return;
      }

      const senhaHashDigitada = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        senha
      );

      if (senhaHashDigitada !== user.senha) {
        setLoading(false);
        Alert.alert("Erro", "Senha incorreta");
        return;
      }

      console.log("Login OK!");
    } catch (err) {
      console.log("Erro no login:", err);
      setLoading(false);
      Alert.alert("Erro", "Não foi possível realizar login");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* LOGO */}
        <Image
          source={require("../assets/Lifier.png")}
          style={styles.logo}
        />

        {/* TEXTO BEM-VINDO */}
        <Text style={styles.welcome}>Seja bem-vindo!</Text>

        {/* INPUT EMAIL */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        {/* INPUT SENHA */}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {/* BOTÃO LOGIN */}
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={async () => {
            await handleLogin();

            const user = await findUserByEmail(email.trim());
            if (user) {
              const senhaHashDigitada = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                senha
              );
              if (senhaHashDigitada === user.senha) {
                setLoading(true);
              }
            }
          }}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* BOTÃO CADASTRAR */}
        <TouchableOpacity
          style={styles.forgot}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.forgotText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* BOTÃO ESQUECI SENHA */}
        <TouchableOpacity
          style={styles.forgot}
          onPress={() => navigation.navigate("EsqueciSenha")}
        >
          <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        {/* LOADING */}
        <LoadingHourglass
          visible={loading}
          message="Entrando..."
          durationMs={900}
          onFinish={() => {
            setLoading(false);
            navigation.navigate("Home");
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginBottom: 10,
  },

  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    width: "100%",
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
    width: "100%",
  },

  loginButton: {
    backgroundColor: "#1E88E5",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  forgot: {
    marginTop: 6,
  },

  forgotText: {
    color: "#2196F3",
    fontWeight: "600",
  },
});
