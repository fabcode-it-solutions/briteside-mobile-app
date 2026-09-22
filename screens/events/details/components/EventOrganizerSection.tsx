import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeButton, ThemeText } from "@/components";
import { useTheme } from "@/theme";
import type { EventDetail } from "@/screens/events/types";

type EventOrganizerSectionProps = {
  organizer: EventDetail["organizer"];
  onChatPress?: () => void;
};

export const EventOrganizerSection: React.FC<EventOrganizerSectionProps> = ({
  organizer,
  onChatPress,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.border,
        },
      ]}
    >
      <ThemeText variant="caption2" style={[styles.heading, { color: theme.colors.text.primary }]}>
        Organized By
      </ThemeText>

      <View style={[styles.organizerCard, { backgroundColor: theme.colors.background.paper }]}>
        <Image source={{ uri: organizer.avatar }} style={styles.avatar} />
        <View style={styles.organizerInfo}>
          <View style={styles.roleRow}>
            <ThemeText variant="caption2" style={{ color: theme.colors.text.primary }}>
              {organizer.name}
            </ThemeText>

            {organizer.isVerified ? (
              <View style={[styles.verifiedBadge, { backgroundColor: theme.colors.primary.light }]}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color={theme.colors.primary.main}
                  style={styles.verifiedIcon}
                />
                <ThemeText
                  variant="overline"
                  style={{ color: theme.colors.primary.main, fontWeight: "600" }}
                >
                  Verified
                </ThemeText>
              </View>
            ) : null}
          </View>
          <ThemeText variant="meta2" style={{ color: theme.colors.text.secondary }}>
            {organizer.role}
          </ThemeText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  heading: {
    fontWeight: "600",
  },
  organizerCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    gap: 16,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 28,
  },
  organizerInfo: {
    flex: 1,
    gap: 0,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  verifiedIcon: {
    marginLeft: -2,
  },
});
