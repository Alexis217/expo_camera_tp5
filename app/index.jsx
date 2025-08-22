import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const cameraRef = useRef(null);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;

  // Animación de escaneo facial
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, { toValue: 1.3, duration: 800, useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
        ]),
      ])
    ).start();

    // Texto parpadeante
    Animated.loop(
      Animated.sequence([
        Animated.timing(textAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(textAnim, { toValue: 0.5, duration: 500, useNativeDriver: true }),
      ])
    ).start();

    // Botón respirando
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonAnim, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(buttonAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Simulación de escaneo facial y login automático
  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        setIsLoggedIn(true);
        setScanning(false);
      }, 3000); // 3 segundos para simular el escaneo
      return () => clearTimeout(timer);
    }
  }, [scanning]);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Necesitamos permiso para acceder a tu cámara</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (scanning) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing="front" />
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.faceScanCircle,
              {
                transform: [{ scale: pulseAnim }],
                shadowOpacity: glowAnim,
              },
            ]}
          />
          <Animated.Text style={[styles.overlayText, { opacity: textAnim }]}>
            Escaneando rostro...
          </Animated.Text>
        </View>
      </View>
    );
  }

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.infoText}>Has iniciado sesión con reconocimiento facial.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <TextInput placeholder="Usuario" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} placeholderTextColor="#ccc" />
      <Animated.View style={{ transform: [{ scale: buttonAnim }], width: "100%" }}>
        <TouchableOpacity style={styles.button} onPress={() => setScanning(true)}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 30,
    textShadowColor: "rgba(0, 255, 128, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#333",
    padding: 16,
    marginBottom: 15,
    borderRadius: 14,
    backgroundColor: "#1f1f1f",
    color: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: "#00ff80",
    padding: 16,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#00ff80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  overlay: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  overlayText: {
    color: "#00ff80",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    textShadowColor: "#00ff80",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  faceScanCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#00ff80",
    backgroundColor: "rgba(0, 255, 128, 0.15)",
    shadowColor: "#00ff80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  infoText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
