import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import type { BottomTabType } from "../types";

type SectionHeaderProps = {
  activeTab: BottomTabType;
};

const SectionHeader = memo(({ activeTab }: SectionHeaderProps) => {
  const theme = useTheme();

  const title = activeTab === "social" ? "Social" : activeTab === "groups" ? "Groups" : "Events";

  return (
    <View style={styles.container}>
      <ThemeText variant="h3" style={styles.title}>
        {title}
      </ThemeText>
      <View style={[styles.filtersRow, activeTab === "social" && styles.socialFilters]}>
        <Text style={[styles.filterLink, { color: theme.colors.text.secondary }]}>Location</Text>
        {activeTab !== "social" && (
          <Text style={[styles.filterLink, { color: theme.colors.text.secondary }]}>When?</Text>
        )}
      </View>
    </View>
  );
});

SectionHeader.displayName = "SectionHeader";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    gap: 40,
  },
  title: {
    lineHeight: 38,
  },
  filtersRow: {
    flexDirection: "row",
    gap: 24,
  },
  socialFilters: {
    gap: 0,
  },
  filterLink: {
    fontSize: 10,
    fontWeight: "600",
  },
});

export default SectionHeader;
