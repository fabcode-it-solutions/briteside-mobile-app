import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme";

export type CategoryCircleProps = {
  label: string;
  imageUri: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function CategoryCircle({
  label,
  imageUri,
  selected,
  onPress,
}: CategoryCircleProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View
        style={[
          styles.imageWrapper,
          { borderColor: selected ? theme.colors.primary.main : theme.colors.divider },
        ]}
      >
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <Text style={[styles.label, { color: theme.colors.text.secondary }]} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", width: 60 },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 44,
    overflow: "hidden",
    borderWidth: 2,
    marginBottom: 8,
  },
  image: { width: "100%", height: "100%" },
  label: { fontSize: 8, fontWeight: "500", textAlign: "center" },
});
