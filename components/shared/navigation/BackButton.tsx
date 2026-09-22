import React from "react";
import { TouchableOpacity, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/theme";

export interface BackButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
  iconSize?: number;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  style,
  iconColor,
  iconSize = 16,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Go back"
      onPress={onPress}
      style={[styles.button, { backgroundColor: theme.colors.primary.main }, style]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name="arrow-back-sharp" size={iconSize} color={iconColor || theme.colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
});

export default BackButton;
