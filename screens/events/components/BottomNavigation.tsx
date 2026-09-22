import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import type { BottomTabType } from "../types";

type BottomNavigationProps = {
  activeTab: BottomTabType;
  onTabChange: (tab: BottomTabType) => void;
};

const BottomNavigation = memo(({ activeTab, onTabChange }: BottomNavigationProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.primary.main + "97",
          borderTopColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.tabsRow}>
        {(["social", "events", "groups"] as BottomTabType[]).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                isActive && [styles.activeTab, { backgroundColor: theme.colors.white }],
              ]}
              onPress={() => onTabChange(tab)}
            >
              <ThemeText
                variant="button"
                color={isActive ? theme.colors.primary.main : theme.colors.white}
              >
                {tab === "events" ? "Events" : tab === "groups" ? "Groups" : "Social"}
              </ThemeText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});

BottomNavigation.displayName = "BottomNavigation";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 12,
  },
  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: {},
});

export default BottomNavigation;
