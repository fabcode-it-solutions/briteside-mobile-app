import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";

type EventAboutSectionProps = {
  description: string;
};

export const EventAboutSection: React.FC<EventAboutSectionProps> = ({ description }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.background.paper,
        },
      ]}
    >
      <ThemeText variant="caption2" style={[styles.heading, { color: theme.colors.text.primary }]}>
        About This Event
      </ThemeText>
      <ThemeText
        variant="meta2"
        style={[styles.body, { color: theme.colors.text.secondary, lineHeight: 16 }]}
      >
        {description}
      </ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 12,
    gap: 8,
    borderWidth: 1,
  },
  heading: {
    fontWeight: "600",
  },
  body: {
    fontSize: 10,
  },
});
