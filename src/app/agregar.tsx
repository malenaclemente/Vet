// Pantalla de formulario

import { useRouter } from "expo-router";
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
import { usePetStore } from "../store/usePetStore";

export default function AgregarMascotaScreen() {
  const router = useRouter();

  // Acción para guardar de Zustand
  const agregarMascota = usePetStore((state) => state.agregarMascota);

  // Estados locales temporales para cada campo
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");

  const handleGuardar = () => {
    // 1. Validar campos requeridos
    if (!nombre.trim() || !especie.trim()) {
      //! y ||  es vacio y/o
      if (Platform.OS === "web") {
        window.alert("Atención: Nombre y especie son obligatorios.");
      } else {
        Alert.alert("Atención", "Nombre y especie son obligatorios.");
      }
      return;
    }

    // 2. Guardar en el store de Zustand
    agregarMascota({
      nombre: nombre.trim(),
      especie: especie.trim(),
      raza: raza.trim(),
      edad: edad.trim(),
      peso: peso.trim(),
    });

    // 3. Avisar al usuario y volver atrás
    if (Platform.OS === "web") {
      window.alert("¡Listo! Mascota registrada correctamente.");
      router.back();
    } else {
      Alert.alert("¡Listo!", "Mascota registrada correctamente.", [
        { text: "Aceptar", onPress: () => router.back() },
      ]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Paciente</Text>

      <Text style={styles.label}>Nombre *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Rocco, Luna..."
        placeholderTextColor="#94A3B8"
        value={nombre} // {/*mostrar adentro lo que vale la variable nombre
        onChangeText={setNombre} //Cada vez que el usuario toque una tecla, llamá a setNombre para actualizar la variable con la nueva letra
      />

      <Text style={styles.label}>Especie *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Canino, Felino..."
        placeholderTextColor="#94A3B8"
        value={especie}
        onChangeText={setEspecie}
      />

      <Text style={styles.label}>Raza</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Golden, Mestizo..."
        placeholderTextColor="#94A3B8"
        value={raza}
        onChangeText={setRaza}
      />

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Edad (años)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 3"
            placeholderTextColor="#94A3B8"
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
            placeholderTextColor="#94A3B8"
            value={peso}
            onChangeText={setPeso}
            keyboardType="numeric" //Es una orden especial para el teléfono. En vez de abrir el teclado con letras A-B-C, le ordena al celular que abra el teclado con los números 0 al 9.
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.boton}
        activeOpacity={0.7}
        onPress={handleGuardar} //cuando apriete ejecutar funcion
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
