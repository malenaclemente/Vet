import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";

interface PetCardProps {
  name: string;
  breed: string;
  age: string;
  status: string;
  image: any; // Recibe la imagen de require(...)
}

export const PetCard: React.FC<PetCardProps> = ({
  name,
  breed,
  age,
  status,
  image,
}) => {
  return (
    <View style={styles.card}>
      {/* Se pasa directamente a source sin {{ uri }} */}
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>
          {breed} • {age}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  details: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#ecfdf5",
    borderColor: "#a7f3d0",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    color: "#047857",
    fontWeight: "600",
  },
});
