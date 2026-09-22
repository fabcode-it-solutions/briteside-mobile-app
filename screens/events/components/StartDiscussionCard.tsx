import React, { memo } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import { SvgIcon } from "@/components/SvgIcon";

type StartDiscussionCardProps = {
  onSubmit?: () => void;
};

const StartDiscussionCard = memo(({ onSubmit }: StartDiscussionCardProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.background.paper, borderColor: theme.colors.border },
        theme.shadows?.[1],
      ]}
    >
      <View style={styles.headerRow}>
        <SvgIcon name="chat" size={12} stroke={theme.colors.text.primary} />
        <ThemeText variant="caption2" style={styles.headerText}>
          Start Discussions
        </ThemeText>
      </View>
      <View
        style={[
          styles.inputBox,
          { borderColor: theme.colors.border, backgroundColor: theme.colors.gray[100] },
        ]}
      >
        <TextInput
          placeholder="Discussion title..."
          placeholderTextColor={theme.colors.text.secondary}
          style={[styles.input, { color: theme.colors.text.primary }]}
        />
      </View>
      <View
        style={[
          styles.inputBox,
          { borderColor: theme.colors.border, backgroundColor: theme.colors.gray[100] },
        ]}
      >
        <TextInput
          placeholder="What would you like to discuss?"
          placeholderTextColor={theme.colors.text.secondary}
          style={[styles.input, { color: theme.colors.text.primary }]}
          multiline
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.postButton, { backgroundColor: theme.colors.primary.main }]}
        onPress={onSubmit}
      >
        <SvgIcon name="send" size={10} stroke="#fff" style={styles.sendIcon} />
        <ThemeText variant="overline" color="#fff">
          Post Discussion
        </ThemeText>
      </TouchableOpacity>
    </View>
  );
});

StartDiscussionCard.displayName = "StartDiscussionCard";

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    marginLeft: 8,
  },
  inputBox: {
    overflow: "hidden",
    paddingHorizontal: 12,
    borderRadius: 5,
    paddingVertical: 4,
    marginTop: 10,
  },
  input: {
    fontSize: 8,
    minHeight: 20,
  },
  postButton: {
    marginTop: 12,
    alignSelf: "stretch",
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    marginRight: 8,
  },
});

export default StartDiscussionCard;
