import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { ThemeInput } from "@/components/primitives/ThemeInput";
import { ThemeButton } from "@/components/primitives/ThemeButton";
import { SvgIcon } from "@/components/SvgIcon";
import { useTheme } from "@/theme";

const GroupSearchBar = memo(() => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: theme.colors.gray[100],
            borderColor: theme.colors.divider,
          },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.flex1}>
            <ThemeInput
              placeholder="Search groups by name or interest..."
              leftIcon={<SvgIcon name="search" size={16} stroke={theme.colors.text.hint} />}
              inputContainerStyle={styles.inputContainer}
              containerStyle={{
                marginBottom: 0,
              }}
              style={styles.inputText}
            />
          </View>
          <ThemeButton
            title="Search"
            size="md"
            variant="filled"
            color="primary"
            style={styles.searchButton}
            textStyle={styles.searchButtonText}
          />
        </View>
      </View>
    </View>
  );
});

GroupSearchBar.displayName = "GroupSearchBar";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 14,
  },
  wrapper: {
    borderRadius: 10,
    padding: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  inputContainer: {
    height: 30,
    borderWidth: 0,
  },
  inputText: {
    fontSize: 10,
  },
  searchButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  searchButtonText: {
    fontSize: 10,
    fontWeight: "700" as const,
  },
});

export default GroupSearchBar;
