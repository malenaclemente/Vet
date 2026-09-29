// src/app/mascotas/[id].tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePetStore } from "../../store/usePetStore";

export default function DetalleMascotaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const mascota = usePetStore((state) =>
    state.mascotas.find((m) => m.id === id),
  );
  const eliminarMascota = usePetStore((state) => state.eliminarMascota);

  const [tabActiva, setTabActiva] = useState<"info" | "salud" | "historial">(
    "salud",
  );

  if (!mascota) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Mascota no encontrada.</Text>
        <TouchableOpacity
          style={styles.btnVolver}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.btnVolverText}>Ir al Inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Eliminación compatible con Web y Móvil
  const handleEliminar = () => {
    if (Platform.OS === "web") {
      const confirma = window.confirm(
        `¿Confirmas que deseas eliminar la ficha de ${mascota.nombre}?`,
      );
      if (confirma) {
        eliminarMascota(mascota.id);
        router.replace("/");
      }
    } else {
      Alert.alert(
        "Eliminar Registro",
        `¿Confirmas que deseas eliminar a ${mascota.nombre}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: () => {
              eliminarMascota(mascota.id);
              router.replace("/");
            },
          },
        ],
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Botón superior para volver al listado */}
      <TouchableOpacity
        style={styles.btnRegresar}
        onPress={() => router.replace("/")}
      >
        <Ionicons name="arrow-back" size={20} color="#0D9488" />
        <Text style={styles.btnRegresarText}>Volver al panel</Text>
      </TouchableOpacity>

      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="paw" size={40} color="#0D9488" />
        </View>
        <Text style={styles.nombre}>{mascota.nombre}</Text>
        <Text style={styles.subtitulo}>
          {mascota.especie} • {mascota.raza}
        </Text>

        {/* Botón para abrir la pantalla de edición */}
        <TouchableOpacity
          style={styles.btnEditar}
          activeOpacity={0.8}
          onPress={() =>
            router.push(`/mascotas/editar?id=${mascota.id}` as any)
          }
        >
          <Ionicons name="create-outline" size={18} color="#FFFFFF" />
          <Text style={styles.btnEditarText}>Editar Ficha</Text>
        </TouchableOpacity>
      </View>

      {/* Pestañas de Navegación Interna */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, tabActiva === "info" && styles.tabBtnActive]}
          onPress={() => setTabActiva("info")}
        >
          <Text
            style={[
              styles.tabText,
              tabActiva === "info" && styles.tabTextActive,
            ]}
          >
            General
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tabActiva === "salud" && styles.tabBtnActive]}
          onPress={() => setTabActiva("salud")}
        >
          <Text
            style={[
              styles.tabText,
              tabActiva === "salud" && styles.tabTextActive,
            ]}
          >
            Salud y Dieta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            tabActiva === "historial" && styles.tabBtnActive,
          ]}
          onPress={() => setTabActiva("historial")}
        >
          <Text
            style={[
              styles.tabText,
              tabActiva === "historial" && styles.tabTextActive,
            ]}
          >
            Historial ({mascota.historialClinico?.length || 0})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Pestaña: Información General */}
      {tabActiva === "info" && (
        <View style={styles.card}>
          <Text style={styles.itemLabel}>Edad</Text>
          <Text style={styles.itemValue}>{mascota.edad} años</Text>

          <Text style={styles.itemLabel}>Peso</Text>
          <Text style={styles.itemValue}>{mascota.peso} kg</Text>

          <Text style={styles.itemLabel}>Microchip</Text>
          <Text style={styles.itemValue}>
            {mascota.microchip || "No registrado"}
          </Text>
        </View>
      )}

      {/* Pestaña: Salud y Dieta */}
      {tabActiva === "salud" && (
        <View style={styles.card}>
          <Text style={styles.itemLabel}>Alergias</Text>
          <Text style={styles.itemValue}>
            {mascota.alergias || "Ninguna registrada"}
          </Text>

          <Text style={styles.itemLabel}>Alimentos Prohibidos</Text>
          <Text style={styles.itemValue}>
            {mascota.alimentosToxicos || "Sin registrar"}
          </Text>

          <Text style={styles.itemLabel}>Dieta / Nutrición</Text>
          <Text style={styles.itemValue}>
            {mascota.dieta || "Alimento estándar"}
          </Text>
        </View>
      )}

      {/* Pestaña: Historial */}
      {tabActiva === "historial" && (
        <View>
          <Text style={styles.sectionTitle}>Vacunas</Text>
          {!mascota.vacunas || mascota.vacunas.length === 0 ? (
            <Text style={styles.emptyNote}>Sin vacunas registradas.</Text>
          ) : (
            mascota.vacunas.map((v) => (
              <View key={v.id} style={styles.subCard}>
                <Text style={styles.subCardTitle}>{v.nombre}</Text>
                <Text style={styles.subCardDate}>Fecha: {v.fecha}</Text>
              </View>
            ))
          )}

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
            Consultas Clínicas
          </Text>
          {!mascota.historialClinico ||
          mascota.historialClinico.length === 0 ? (
            <Text style={styles.emptyNote}>Sin consultas registradas.</Text>
          ) : (
            mascota.historialClinico.map((h) => (
              <View key={h.id} style={styles.subCard}>
                <Text style={styles.subCardTitle}>{h.motivo}</Text>
                <Text style={styles.subCardDate}>
                  {h.fecha} • {h.veterinario}
                </Text>
                <Text style={styles.itemLabel}>Diagnóstico</Text>
                <Text style={styles.subCardText}>{h.diagnostico}</Text>
              </View>
            ))
          )}
        </View>
      )}

      {/* Botón de eliminación */}
      <TouchableOpacity
        style={styles.btnEliminar}
        activeOpacity={0.7}
        onPress={handleEliminar}
      >
        <Ionicons name="trash-outline" size={18} color="#EF4444" />
        <Text style={styles.btnEliminarText}>Eliminar Ficha</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 20, paddingBottom: 60 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: { fontSize: 16, color: "#EF4444", marginBottom: 12 },
  btnVolver: { backgroundColor: "#0D9488", padding: 12, borderRadius: 8 },
  btnVolverText: { color: "#FFF", fontWeight: "bold" },
  btnRegresar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  btnRegresarText: { color: "#0D9488", fontWeight: "600", fontSize: 14 },
  header: { alignItems: "center", marginBottom: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#CCFBF1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  nombre: { fontSize: 24, fontWeight: "bold", color: "#0F172A" },
  subtitulo: { fontSize: 15, color: "#64748B", marginBottom: 12 },
  btnEditar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D9488",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  btnEditarText: { color: "#FFFFFF", fontWeight: "600", fontSize: 14 },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  tabBtnActive: { backgroundColor: "#FFFFFF" },
  tabText: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  tabTextActive: { color: "#0D9488", fontWeight: "bold" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  itemLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748B",
    marginTop: 10,
    textTransform: "uppercase",
  },
  itemValue: { fontSize: 15, color: "#1E293B", marginTop: 2 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },
  emptyNote: {
    fontSize: 14,
    color: "#94A3B8",
    fontStyle: "italic",
    marginBottom: 8,
  },
  subCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  subCardTitle: { fontSize: 15, fontWeight: "bold", color: "#0F172A" },
  subCardDate: { fontSize: 12, color: "#0D9488", marginVertical: 2 },
  subCardText: { fontSize: 14, color: "#334155" },
  btnEliminar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#FEE2E2",
    gap: 8,
  },
  btnEliminarText: { color: "#EF4444", fontWeight: "bold" },
});
