import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import { SvgIcon } from "@/components/SvgIcon";
import type { GroupDiscussionPost } from "@/screens/events/types";

type GroupDiscussionPostCardProps = {
  post: GroupDiscussionPost;
};

export const GroupDiscussionPostCard: React.FC<GroupDiscussionPostCardProps> = ({ post }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.background.paper, borderColor: theme.colors.border },
        theme.shadows?.[1],
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 12,
        }}
      >
        <Image source={{ uri: post.author.avatar }} style={styles.avatar} />

        <View
          style={{
            width: "85%",
          }}
        >
          <View style={styles.header}>
            <View style={styles.headerText}>
              <ThemeText
                variant="caption2"
                fontWeight={700}
                style={{ color: theme.colors.text.primary }}
              >
                {post.author.name}{" "}
                <ThemeText variant="meta2" color={theme.colors.text.secondary}>
                  {post.postedAgo}
                </ThemeText>
              </ThemeText>
            </View>
          </View>

          <ThemeText
            variant="caption2"
            fontWeight={600}
            style={[styles.title, { color: theme.colors.text.primary }]}
          >
            {post.title}
          </ThemeText>

          <ThemeText variant="meta2" color={theme.colors.text.secondary} style={styles.message}>
            {post.message}
          </ThemeText>

          {!!post.mediaUri && (
            <Image source={{ uri: post.mediaUri }} style={styles.media} resizeMode="cover" />
          )}

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <SvgIcon name="like" size={12} stroke={theme.colors.text.secondary} />
              <ThemeText
                variant="overline"
                color={theme.colors.text.secondary}
                style={styles.metaText}
              >
                {post.likes}
              </ThemeText>
            </View>
            <View style={styles.metaItem}>
              <SvgIcon name="reply" size={12} stroke={theme.colors.text.secondary} />
              <ThemeText
                variant="overline"
                color={theme.colors.text.secondary}
                style={styles.metaText}
              >
                {post.replies} replies
              </ThemeText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 21,
  },
  headerText: {
    flex: 1,
    gap: 2,
    marginBottom: 5,
  },
  title: {
    marginTop: 2,
    marginBottom: 4,
  },
  message: {
    // lineHeight: 20,
    marginBottom: 4,
  },
  media: {
    marginTop: 8,
    height: 300,
    borderRadius: 0,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    marginTop: -1,
  },
});
