import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OwnerProfile } from "../components/OwnerProfile";
import { PetCard } from "../components/Petcard";
import { OWNER_DATA, PETS_DATA } from "../constants/petsData";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Encabezado general */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>VetCare</Text>
          <Text style={styles.headerSubtitle}>
            Portal de Control y Seguimiento
          </Text>
        </View>

        <OwnerProfile
          name={OWNER_DATA.name}
          phone={OWNER_DATA.phone}
          location={OWNER_DATA.location}
          avatar={OWNER_DATA.avatar}
          petsCount={PETS_DATA.length}
        />

        {/* Sección de Mascotas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mis Mascotas</Text>
        </View>

        {PETS_DATA.map((pet) => (
          <PetCard
            key={pet.id}
            name={pet.name}
            breed={pet.breed}
            age={pet.age}
            status={pet.status}
            image={pet.image}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f2937",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
});
