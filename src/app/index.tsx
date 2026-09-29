// src/app/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { OwnerProfile } from "../components/OwnerProfile";
import PetCard from "../components/Petcard";
import { OWNER_DATA } from "../constants/petsData";
import { useAuthStore } from "../store/useAuthStore";
import { usePetStore } from "../store/usePetStore";

export default function HomeScreen() {
  const router = useRouter();

  const mascotas = usePetStore((state) => state.mascotas);
  const { usuarioActual, cambiarRol, cerrarSesion } = useAuthStore();

  // Si no hay usuario logueado, redirige a la pantalla de Login
  useEffect(() => {
    if (!usuarioActual) {
      router.replace("/login" as any);
    }
  }, [usuarioActual]);

  if (!usuarioActual) {
    return null; // Evita parpadeos mientras procesa la redirección
  }

  const handleCerrarSesion = () => {
    cerrarSesion();
    router.replace("/login" as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Barra superior de cambio de Rol (Módulo 1 y 2) */}
        <View style={styles.roleBar}>
          <Text style={styles.roleLabel}>Modo de vista:</Text>
          <TouchableOpacity
            style={[
              styles.roleBtn,
              usuarioActual.rol === "dueno" && styles.roleBtnActive,
            ]}
            onPress={() => cambiarRol("dueno")}
          >
            <Text
              style={[
                styles.roleBtnText,
                usuarioActual.rol === "dueno" && styles.roleBtnTextActive,
              ]}
            >
              Dueño
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleBtn,
              usuarioActual.rol === "veterinaria" && styles.roleBtnActive,
            ]}
            onPress={() => cambiarRol("veterinaria")}
          >
            <Text
              style={[
                styles.roleBtnText,
                usuarioActual.rol === "veterinaria" && styles.roleBtnTextActive,
              ]}
            >
              Veterinaria
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botón Cerrar Sesión */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            onPress={handleCerrarSesion}
            style={styles.logoutBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Perfil del Usuario / Veterinaria */}
        <OwnerProfile
          name={usuarioActual.nombre}
          phone={usuarioActual.telefono}
          location={
            usuarioActual.rol === "veterinaria"
              ? "Atención Clínica"
              : "Córdoba, Argentina"
          }
          petsCount={mascotas.length}
          avatar={OWNER_DATA.avatar}
        />

        {/* Sección: Lista de Pacientes o Mascotas (Módulo 3) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {usuarioActual.rol === "veterinaria"
              ? "Pacientes en Seguimiento"
              : "Mis Mascotas"}
          </Text>
          <Text style={styles.sectionBadge}>{mascotas.length}</Text>
        </View>

        {mascotas.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            activeOpacity={0.8}
            onPress={() => router.push(`/mascotas/${pet.id}` as any)}
          >
            <PetCard
              name={pet.nombre}
              breed={`${pet.especie} • ${pet.raza}`}
              age={`${pet.edad} años`}
              status={
                pet.alergias ? `Alergias: ${pet.alergias}` : "Ficha al día"
              }
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botón flotante para registrar paciente/mascota */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => router.push("/agregar" as any)}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  roleBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#E2E8F0",
    padding: 4,
    borderRadius: 10,
  },
  roleLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginLeft: 8,
    marginRight: 10,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 8,
  },
  roleBtnActive: { backgroundColor: "#FFFFFF" },
  roleBtnText: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  roleBtnTextActive: { color: "#0D9488", fontWeight: "bold" },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 18,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#1E293B" },
  sectionBadge: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0D9488",
    backgroundColor: "#CCFBF1",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0D9488",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
