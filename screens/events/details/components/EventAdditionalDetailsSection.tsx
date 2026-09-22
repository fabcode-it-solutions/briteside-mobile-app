import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import type { EventAdditionalDetail } from "@/screens/events/types";
import { Divider } from "react-native-paper";

type EventAdditionalDetailsSectionProps = {
  details: EventAdditionalDetail[];
};

export const EventAdditionalDetailsSection: React.FC<EventAdditionalDetailsSectionProps> = ({
  details,
}) => {
  const theme = useTheme();

  const firstFour = details.slice(0, 4);
  const remaining = details.slice(4);

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
        Additional Details
      </ThemeText>

      <View style={styles.detailsGrid}>
        {firstFour.map((detail) => (
          <View key={detail.id} style={[styles.detailItem]}>
            <ThemeText
              variant="meta2"
              style={[styles.detailLabel, { color: theme.colors.text.primary }]}
            >
              {detail.label}
            </ThemeText>
            <ThemeText variant="meta2" style={{ color: theme.colors.text.secondary }}>
              {detail.value}
            </ThemeText>
          </View>
        ))}
      </View>

      <Divider />

      {/* --- Remaining items in vertical list with divider --- */}
      {remaining.length > 0 && (
        <View style={styles.verticalList}>
          {remaining.map((detail, index) => (
            <View key={detail.id}>
              <View style={[styles.verticalItem, { borderColor: theme.colors.border }]}>
                <ThemeText
                  variant="meta2"
                  style={[styles.detailLabel, { color: theme.colors.text.primary }]}
                >
                  {detail.label}
                </ThemeText>
                <ThemeText variant="meta2" style={{ color: theme.colors.text.secondary }}>
                  {detail.value}
                </ThemeText>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    gap: 16,
  },
  heading: {
    fontWeight: "600",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  detailItem: {
    flexBasis: "48%",
    borderRadius: 14,
    gap: 8,
  },
  detailLabel: {
    // textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  verticalList: {
    // marginTop: 12,
  },
  verticalItem: {
    paddingVertical: 10,
    gap: 4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 6,
  },
});
