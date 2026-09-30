// Pantalla principal
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react"; //sincronizar tu componente con un sistema externo a React, sirve para ejecutar una acción automática apenas la pantalla se carga o cuando una variable vigilada cambia
import {
  SafeAreaView, //Un contenedor especial para celulares que evita que el contenido se superponga con la barra de estado superior (batería, hora, señal) o el notch de la cámara.
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
  //Declaramos la función principal pública que dibuja el inicio.
  const router = useRouter(); //Declaramos la variable del navegador

  const mascotas = usePetStore((state) => state.mascotas); //Nos conectamos al almacén de mascotas y extraemos el arreglo mascotas
  const { usuarioActual, cerrarSesion } = useAuthStore(); //buscamos usuario y para cerrar

  // Redirigir a login si no hay sesión activa
  useEffect(() => {
    if (!usuarioActual) {
      router.replace("/login" as any); //Usamos .replace en vez de .push para que la pantalla de inicio no quede guardada en el historial de navegación (así el usuario no puede volver atrás presionando la flecha del celular)
    }
  }, [usuarioActual]);

  if (!usuarioActual) {
    return null;
  }

  const handleCerrarSesion = () => {
    cerrarSesion();
    router.replace("/login" as any);
  };

  const esVeterinaria = usuarioActual.rol === "veterinaria";

  {
    {
      /* cambiar los colores si es vet o dueño*/
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Barra superior: Identificador del rol activo y botón Cerrar Sesión */}
        <View style={styles.topBar}>
          <View
            style={[
              styles.roleBadge,
              esVeterinaria ? styles.roleBadgeVet : styles.roleBadgeOwner,
            ]}
          >
            <Ionicons
              name={esVeterinaria ? "medkit" : "person"}
              size={14}
              color={esVeterinaria ? "#2563EB" : "#0D9488"}
            />
            <Text
              style={[
                styles.roleBadgeText,
                esVeterinaria ? styles.roleTextVet : styles.roleTextOwner,
              ]}
            >
              {esVeterinaria ? "Cuenta Veterinaria" : "Cuenta Tutor / Dueño"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleCerrarSesion}
            style={styles.logoutBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        <OwnerProfile //muestra datos del perfil
          name={usuarioActual.nombre}
          phone={usuarioActual.telefono}
          location={
            esVeterinaria
              ? usuarioActual.horarios || "Atención Clínica"
              : "Córdoba, Argentina"
          }
          petsCount={mascotas.length}
          avatar={OWNER_DATA.avatar}
        />
        {/* Sección: Lista según el rol */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {esVeterinaria ? "Pacientes en Seguimiento" : "Mis Mascotas"}
          </Text>
          <Text style={styles.sectionBadge}>{mascotas.length}</Text>
        </View>
        {mascotas.map(
          (
            pet,
            {
              /* Es un bucle. Toma el arreglo de mascotas guardado en Zustand y por cada mascota individual (pet) fabrica un componente <PetCard */
            },
          ) => (
            <TouchableOpacity
              key={pet.id}
              activeOpacity={0.8}
              onPress={() => router.push(`/mascotas/${pet.id}` as any)} //cuando apreta muestra los datos de la mascota
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
          ),
        )}
      </ScrollView>
      {/*botón para dar de alta la mascota, lleva al formulario */}
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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleBadgeOwner: {
    backgroundColor: "#CCFBF1",
  },
  roleBadgeVet: {
    backgroundColor: "#DBEAFE",
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  roleTextOwner: {
    color: "#0F766E",
  },
  roleTextVet: {
    color: "#1D4ED8",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
