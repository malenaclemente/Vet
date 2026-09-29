// src/components/Petcard.tsx
import { Image, StyleSheet, Text, View } from "react-native";

// 1. Declarar la interfaz con las propiedades que le pasas desde index.tsx
interface PetCardProps {
  name: string;
  breed: string;
  age: string;
  status: string;
  image?: any;
}

// 2. Asignar la interfaz a los parámetros de la función
export default function PetCard({
  name,
  breed,
  age,
  status,
  image,
}: PetCardProps) {
  return (
    <View style={styles.card}>
      {image && <Image source={image} style={styles.image} />}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>
          {breed} • {age}
        </Text>
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },
  details: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },
  status: {
    fontSize: 12,
    color: "#0D9488",
    marginTop: 4,
    fontWeight: "600",
  },
});
