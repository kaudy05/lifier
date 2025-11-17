import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native"; // opcional, se não tiver Lottie, use ActivityIndicator
// Se você não usa Lottie, substitua LottieView por ActivityIndicator no JSX

type Props = {
  visible: boolean;
  message?: string;
  durationMs?: number; // tempo até mostrar sucesso e finalizar
  onFinish?: () => void; // opcional
};

export default function LoadingHourglass({
  visible,
  message = "Carregando...",
  durationMs = 900,
  onFinish,
}: Props) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    let t1: NodeJS.Timeout | null = null;
    if (visible) {
      setShow(true);
      // após durationMs, chama onFinish (se fornecida)
      t1 = setTimeout(() => {
        setShow(false);
        if (onFinish) onFinish();
      }, durationMs);
    } else {
      setShow(false);
    }
    return () => {
      if (t1) clearTimeout(t1);
    };
  }, [visible, durationMs, onFinish]);

  if (!show) return null;

  return (
    <Modal transparent animationType="fade" visible={show}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          {/* Se não tiver Lottie, troque por ActivityIndicator */}
          {/* <ActivityIndicator size="large" color="#FF9800" /> */}
          <LottieView
            source={require("../assets/Timer.json")}
            autoPlay
            loop
            style={{ width: 140, height: 140 }}
          />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 250,
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    marginTop: 8,
    fontSize: 15,
    color: "#333",
    textAlign: "center",
  },
});
