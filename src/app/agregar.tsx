// src/app/agregar.tsx
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
// Importamos el store desde la carpeta store dentro de src
import { usePetStore } from "../store/usePetStore";

export default function AgregarMascotaScreen() {
  const router = useRouter();

  // Extraemos la acción de Zustand para guardar
  const agregarMascota = usePetStore((state) => state.agregarMascota);

  // Estados locales para cada campo del formulario
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");

  const handleGuardar = () => {
    // Validamos que los campos esenciales no queden en blanco
    if (!nombre.trim() || !especie.trim()) {
      Alert.alert("Atención", "Nombre y especie son obligatorios.");
      return;
    }

    // Guardamos en el store global
    agregarMascota({
      nombre: nombre.trim(),
      especie: especie.trim(),
      raza: raza.trim(),
      edad: edad.trim(),
      peso: peso.trim(),
    });

    // Notificamos y volvemos a la pantalla anterior
    Alert.alert("¡Listo!", "Mascota registrada correctamente.", [
      { text: "Aceptar", onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Paciente</Text>

      <Text style={styles.label}>Nombre *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Rocco, Luna..."
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Especie *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Canino, Felino..."
        value={especie}
        onChangeText={setEspecie}
      />

      <Text style={styles.label}>Raza</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Golden, Mestizo..."
        value={raza}
        onChangeText={setRaza}
      />

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Edad (años)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 3"
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.col}>
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 14"
            value={peso}
            onChangeText={setPeso}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.boton}
        activeOpacity={0.7}
        onPress={handleGuardar}
      >
        <Text style={styles.textoBoton}>Guardar Mascota</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col: {
    width: "48%",
  },
  boton: {
    backgroundColor: "#0D9488",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
