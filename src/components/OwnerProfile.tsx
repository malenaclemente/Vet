import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View
} from "react-native";

interface OwnerProfileProps {
  name: string;
  phone: string;
  location: string;
  avatar: any;
  petsCount: number;
}

export const OwnerProfile: React.FC<OwnerProfileProps> = ({
  name,
  phone,
  location,
  avatar,
  petsCount,
}) => {
  return (
    <View style={styles.card}>
      {/* Pasa la imagen directamente sin {{ uri }} */}
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.ownerBadge}>Tutor / Dueño</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.detail}>📍 {location}</Text>
        <Text style={styles.detail}>📞 {phone}</Text>
        <Text style={styles.counter}>🐾 {petsCount} mascotas a cargo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  info: {
    marginLeft: 14,
    flex: 1,
  },
  ownerBadge: {
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: "700",
    color: "#3b82f6",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  detail: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  counter: {
    fontSize: 13,
    fontWeight: "600",
    color: "#059669",
    marginTop: 4,
  },
});
