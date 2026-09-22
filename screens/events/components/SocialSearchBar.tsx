import React, { memo } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemeText } from "@/components";
import { SvgIcon } from "@/components/SvgIcon";
import { useTheme } from "@/theme";

const SocialSearchBar = memo(() => {
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
          theme.shadows?.[0],
        ]}
      >
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: theme.colors.white,
            },
          ]}
        >
          <SvgIcon name="search" size={12} stroke={theme.colors.text.hint} />
          <TextInput
            placeholder="Search groups by name or interest..."
            placeholderTextColor={theme.colors.text.disabled}
            style={[styles.input, { color: theme.colors.text.primary }]}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.button, { backgroundColor: theme.colors.primary.main }]}
        >
          <ThemeText style={styles.buttonText} color="#fff">
            Search
          </ThemeText>
        </TouchableOpacity>
      </View>
    </View>
  );
});

SocialSearchBar.displayName = "SocialSearchBar";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  wrapper: {
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,
    flex: 1,
    gap: 4,
  },
  input: {
    flex: 1,
    fontSize: 10,
    fontWeight: "500" as const,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 6,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: "500" as const,
  },
});

export default SocialSearchBar;
