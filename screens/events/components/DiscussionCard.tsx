import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import type { DiscussionItem } from "../types";
import { SvgIcon } from "@/components/SvgIcon";

type DiscussionCardProps = {
  discussion: DiscussionItem;
};

const DiscussionCard = memo(({ discussion }: DiscussionCardProps) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.card, { backgroundColor: theme.colors.background.paper }, theme.shadows?.[1]]}
    >
      <View style={styles.header}>
        <Image source={{ uri: discussion.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <View style={styles.titleRow}>
            <ThemeText variant="overline" style={styles.titleContent}>
              {discussion.title}
            </ThemeText>
            {!!discussion.groupTag && (
              <View style={[styles.tagPill, { borderColor: theme.colors.border }]}>
                <ThemeText variant="tagStyle" color={theme.colors.text.secondary}>
                  {discussion.groupTag}
                </ThemeText>
              </View>
            )}
          </View>
        </View>
      </View>
      <ThemeText variant="tagStyle500" color={theme.colors.text.secondary} style={styles.content}>
        {discussion.content}
      </ThemeText>
      <View style={styles.metaRow}>
        <ThemeText variant="tagStyle500" color={theme.colors.text.secondary}>
          {discussion.author}
        </ThemeText>
        <ThemeText variant="tagStyle" color={theme.colors.text.secondary}>
          {discussion.time}
        </ThemeText>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <SvgIcon name="like" size={12} stroke={theme.colors.text.secondary} />
          <ThemeText
            variant="tagStyle500"
            style={[
              styles.statText,
              {
                color: theme.colors.text.secondary,
              },
            ]}
          >
            {discussion.likes}
          </ThemeText>
        </View>
        <View style={styles.statItem}>
          <SvgIcon name="reply" size={12} stroke={theme.colors.text.secondary} />
          <ThemeText
            variant="tagStyle500"
            style={[
              styles.statText,
              {
                color: theme.colors.text.secondary,
              },
            ]}
          >
            {discussion.replies} replies
          </ThemeText>
        </View>
      </View>
    </View>
  );
});

DiscussionCard.displayName = "DiscussionCard";

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 14,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 22,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleContent: {
    flex: 1,
  },
  tagPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
  },
  content: {
    marginTop: 10,
    marginLeft: 46,
  },
  metaRow: {
    marginTop: 10,
    marginLeft: 46,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  statsRow: {
    marginTop: 10,
    marginLeft: 46,
    flexDirection: "row",
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 6,
  },
});

export default DiscussionCard;
