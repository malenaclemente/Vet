// src/app/login.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuthStore, UserRole } from "../store/useAuthStore";

export default function LoginScreen() {
  const router = useRouter();
  const { iniciarSesion, recuperarContrasena } = useAuthStore();

  const [rolSeleccionado, setRolSeleccionado] = useState<UserRole>("dueno");
  const [email, setEmail] = useState("dueno@mismascotas.com");
  const [password, setPassword] = useState("123456");

  // Alternar credenciales de demostración según el rol elegido
  const handleSeleccionarRol = (rol: UserRole) => {
    setRolSeleccionado(rol);
    if (rol === "dueno") {
      setEmail("dueno@mismascotas.com");
    } else {
      setEmail("vet@mismascotas.com");
    }
  };

  const handleIngresar = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "Datos incompletos",
        "Por favor ingresa correo y contraseña.",
      );
      return;
    }

    const exito = iniciarSesion(email, password);

    if (exito) {
      // replace en lugar de push para que el login salga del historial de navegación
      router.replace("/");
    } else {
      Alert.alert("Error de acceso", "Usuario o contraseña no válidos.");
    }
  };

  const handleOlvidePassword = () => {
    if (!email.trim()) {
      Alert.alert("Recuperar Clave", "Ingresa tu correo en el campo de texto.");
      return;
    }

    const existe = recuperarContrasena(email);
    if (existe) {
      Alert.alert(
        "Correo enviado",
        `Se han enviado las instrucciones de recuperación a ${email}.`,
      );
    } else {
      Alert.alert("No encontrado", "El correo no se encuentra registrado.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="paw" size={48} color="#0D9488" />
        </View>
        <Text style={styles.title}>MisMascotas</Text>
        <Text style={styles.subtitle}>
          Gestión y atención veterinaria integral
        </Text>
      </View>

      {/* Selector de Perfil / Rol */}
      <Text style={styles.sectionLabel}>Selecciona tu tipo de cuenta:</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleCard,
            rolSeleccionado === "dueno" && styles.roleCardActive,
          ]}
          onPress={() => handleSeleccionarRol("dueno")}
        >
          <Ionicons
            name="person"
            size={22}
            color={rolSeleccionado === "dueno" ? "#0D9488" : "#64748B"}
          />
          <Text
            style={[
              styles.roleText,
              rolSeleccionado === "dueno" && styles.roleTextActive,
            ]}
          >
            Dueño
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleCard,
            rolSeleccionado === "veterinaria" && styles.roleCardActive,
          ]}
          onPress={() => handleSeleccionarRol("veterinaria")}
        >
          <Ionicons
            name="medkit"
            size={22}
            color={rolSeleccionado === "veterinaria" ? "#0D9488" : "#64748B"}
          />
          <Text
            style={[
              styles.roleText,
              rolSeleccionado === "veterinaria" && styles.roleTextActive,
            ]}
          >
            Veterinaria
          </Text>
        </TouchableOpacity>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@ejemplo.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleOlvidePassword}
          style={styles.forgotBtn}
        >
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.8}
          onPress={handleIngresar}
        >
          <Text style={styles.loginBtnText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerNote}>
        Cuenta demo cargada automáticamente para rol:{" "}
        <Text style={{ fontWeight: "bold" }}>{rolSeleccionado}</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    textAlign: "center",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  roleCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    gap: 8,
  },
  roleCardActive: {
    borderColor: "#0D9488",
    backgroundColor: "#F0FDFA",
  },
  roleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },
  roleTextActive: {
    color: "#0D9488",
    fontWeight: "bold",
  },
  form: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    marginBottom: 14,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotText: {
    fontSize: 13,
    color: "#0D9488",
    fontWeight: "500",
  },
  loginBtn: {
    backgroundColor: "#0D9488",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  loginBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerNote: {
    marginTop: 20,
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
  },
});
