// src/app/mascotas/editar.tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { usePetStore } from "../../store/usePetStore";

export default function EditarMascotaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const mascota = usePetStore((state) =>
    state.mascotas.find((m) => m.id === id),
  );
  const modificarMascota = usePetStore((state) => state.modificarMascota);
  const agregarHistorial = usePetStore((state) => state.agregarHistorial);
  const eliminarHistorial = usePetStore((state) => state.eliminarHistorial);

  if (!mascota) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Mascota no encontrada.</Text>
        <TouchableOpacity
          style={styles.btnVolver}
          onPress={() => router.back()}
        >
          <Text style={styles.btnVolverText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Estados de datos generales (sin microchip)
  const [nombre, setNombre] = useState(mascota.nombre);
  const [especie, setEspecie] = useState(mascota.especie);
  const [raza, setRaza] = useState(mascota.raza);
  const [edad, setEdad] = useState(mascota.edad);
  const [peso, setPeso] = useState(mascota.peso);
  const [alergias, setAlergias] = useState(mascota.alergias || "");
  const [alimentosToxicos, setAlimentosToxicos] = useState(
    mascota.alimentosToxicos || "",
  );
  const [dieta, setDieta] = useState(mascota.dieta || "");

  // Estados para nueva entrada de historial
  const [motivo, setMotivo] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);

  const handleGuardarDatosGenerales = () => {
    if (!nombre.trim() || !especie.trim()) {
      const msg = "Nombre y especie son obligatorios.";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Atención", msg);
      return;
    }

    modificarMascota(mascota.id, {
      nombre: nombre.trim(),
      especie: especie.trim(),
      raza: raza.trim(),
      edad: edad.trim(),
      peso: peso.trim(),
      alergias: alergias.trim(),
      alimentosToxicos: alimentosToxicos.trim(),
      dieta: dieta.trim(),
    });

    const exitoMsg = "Datos actualizados correctamente.";
    if (Platform.OS === "web") {
      window.alert(exitoMsg);
    } else {
      Alert.alert("Éxito", exitoMsg);
    }
  };

  const handleAgregarConsulta = () => {
    if (!motivo.trim() || !diagnostico.trim()) {
      const msg = "El motivo y el diagnóstico son obligatorios.";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Atención", msg);
      return;
    }

    agregarHistorial(mascota.id, {
      fecha,
      motivo: motivo.trim(),
      diagnostico: diagnostico.trim(),
      veterinario: veterinario.trim() || "Veterinaria Central",
    });

    setMotivo("");
    setDiagnostico("");
    setVeterinario("");

    const msg = "Consulta agregada al historial.";
    Platform.OS === "web" ? window.alert(msg) : Alert.alert("Éxito", msg);
  };

  const handleBorrarConsulta = (historialId: string) => {
    const confirmacion =
      Platform.OS === "web"
        ? window.confirm("¿Deseas eliminar este registro del historial?")
        : true;

    if (confirmacion) {
      eliminarHistorial(mascota.id, historialId);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.btnAtras} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#0D9488" />
        <Text style={styles.btnAtrasText}>Volver a la Ficha</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Editar Ficha de {mascota.nombre}</Text>

      {/* SECCIÓN 1: DATOS BÁSICOS */}
      <View style={styles.cardSection}>
        <Text style={styles.sectionHeaderTitle}>
          1. Datos Generales y Salud
        </Text>

        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Especie *</Text>
        <TextInput
          style={styles.input}
          value={especie}
          onChangeText={setEspecie}
        />

        <Text style={styles.label}>Raza</Text>
        <TextInput style={styles.input} value={raza} onChangeText={setRaza} />

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Edad (años)</Text>
            <TextInput
              style={styles.input}
              value={edad}
              onChangeText={setEdad}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>Alergias</Text>
        <TextInput
          style={styles.input}
          value={alergias}
          onChangeText={setAlergias}
        />

        <Text style={styles.label}>Alimentos Prohibidos</Text>
        <TextInput
          style={styles.input}
          value={alimentosToxicos}
          onChangeText={setAlimentosToxicos}
        />

        <Text style={styles.label}>Dieta / Nutrición</Text>
        <TextInput style={styles.input} value={dieta} onChangeText={setDieta} />

        <TouchableOpacity
          style={styles.botonGuardar}
          activeOpacity={0.7}
          onPress={handleGuardarDatosGenerales}
        >
          <Text style={styles.textoBoton}>Actualizar Información Básica</Text>
        </TouchableOpacity>
      </View>

      {/* SECCIÓN 2: HISTORIAL CLÍNICO */}
      <View style={styles.cardSection}>
        <Text style={styles.sectionHeaderTitle}>2. Historial Clínico</Text>

        <Text style={styles.subSectionTitle}>Consultas Registradas:</Text>
        {mascota.historialClinico.length === 0 ? (
          <Text style={styles.emptyNote}>No hay consultas registradas.</Text>
        ) : (
          mascota.historialClinico.map((h) => (
            <View key={h.id} style={styles.itemHistorial}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemHistorialMotivo}>{h.motivo}</Text>
                <Text style={styles.itemHistorialFecha}>
                  {h.fecha} • {h.veterinario}
                </Text>
                <Text style={styles.itemHistorialDiagnostico}>
                  {h.diagnostico}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleBorrarConsulta(h.id)}
                style={styles.btnBorrarItem}
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))
        )}

        <Text style={[styles.subSectionTitle, { marginTop: 18 }]}>
          Agregar Nueva Consulta:
        </Text>

        <Text style={styles.label}>Fecha</Text>
        <TextInput style={styles.input} value={fecha} onChangeText={setFecha} />

        <Text style={styles.label}>Motivo de la consulta *</Text>
        <TextInput
          style={styles.input}
          value={motivo}
          onChangeText={setMotivo}
        />

        <Text style={styles.label}>Diagnóstico y Tratamiento *</Text>
        <TextInput
          style={[styles.input, { height: 70 }]}
          value={diagnostico}
          onChangeText={setDiagnostico}
          multiline
        />

        <Text style={styles.label}>Profesional / Veterinaria</Text>
        <TextInput
          style={styles.input}
          value={veterinario}
          onChangeText={setVeterinario}
        />

        <TouchableOpacity
          style={styles.botonAgregarConsulta}
          activeOpacity={0.7}
          onPress={handleAgregarConsulta}
        >
          <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
          <Text style={styles.textoBoton}>Agregar Consulta al Historial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F8FAFC", flexGrow: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: { fontSize: 16, color: "#EF4444", marginBottom: 12 },
  btnVolver: { backgroundColor: "#0D9488", padding: 12, borderRadius: 8 },
  btnVolverText: { color: "#FFF", fontWeight: "bold" },
  btnAtras: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  btnAtrasText: { color: "#0D9488", fontWeight: "600", fontSize: 14 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 18,
  },
  cardSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D9488",
    marginBottom: 14,
  },
  subSectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 8,
  },
  label: { fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 4 },
  input: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    marginBottom: 12,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  col: { width: "48%" },
  botonGuardar: {
    backgroundColor: "#0D9488",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  botonAgregarConsulta: {
    flexDirection: "row",
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  textoBoton: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  emptyNote: {
    fontSize: 14,
    color: "#94A3B8",
    fontStyle: "italic",
    marginBottom: 10,
  },
  itemHistorial: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemHistorialMotivo: { fontSize: 14, fontWeight: "bold", color: "#0F172A" },
  itemHistorialFecha: { fontSize: 12, color: "#0D9488", marginVertical: 2 },
  itemHistorialDiagnostico: { fontSize: 13, color: "#475569" },
  btnBorrarItem: { padding: 8 },
});
