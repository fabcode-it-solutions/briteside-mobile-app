import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import type { FilterOption } from "../types";

type FilterChipProps = {
  filter: FilterOption;
  active: boolean;
  onPress: () => void;
};

const FilterChip = memo(({ filter, active, onPress }: FilterChipProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && { backgroundColor: theme.colors.white }]}
    >
      <ThemeText
        style={[
          styles.text,
          {
            color: active ? theme.colors.text.primary : theme.colors.text.secondary,
            fontWeight: active ? "700" : "600",
          },
        ]}
      >
        {filter.label}
      </ThemeText>
    </TouchableOpacity>
  );
});

FilterChip.displayName = "FilterChip";

const styles = StyleSheet.create({
  chip: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 8,
  },
});

export default FilterChip;
