import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import type { GroupMember } from "@/screens/events/types";

type GroupMemberCardProps = {
  member: GroupMember;
  onPressProfile?: (member: GroupMember) => void;
};

export const GroupMemberCard: React.FC<GroupMemberCardProps> = ({ member, onPressProfile }) => {
  const theme = useTheme();

  const handlePress = () => {
    onPressProfile?.(member);
  };

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
      <Image source={{ uri: member.avatar }} style={styles.avatar} />
      <ThemeText variant="caption2" fontWeight={600} style={{ color: theme.colors.text.primary }}>
        {member.name}
      </ThemeText>
      <ThemeText variant="meta2" color={theme.colors.text.secondary}>
        {member.role}
      </ThemeText>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePress}
        style={[styles.button, { backgroundColor: theme.colors.primary.main }]}
      >
        <ThemeText variant="overline" color="#fff" fontWeight={700}>
          {member.profileCtaLabel ?? "View Profile"}
        </ThemeText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexBasis: "30%",
    maxWidth: "30%",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 32,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 5,
  },
});
