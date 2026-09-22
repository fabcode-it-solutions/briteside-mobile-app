import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeText } from "@/components";
import { SvgIcon } from "@/components/SvgIcon";
import { useTheme } from "@/theme";
import type { SocialPost } from "../types";

type SocialPostCardProps = {
  post: SocialPost;
};

const SocialPostCard = memo(({ post }: SocialPostCardProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.background.paper, borderColor: theme.colors.border },
        theme.shadows?.[2],
      ]}
    >
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View style={styles.userInfoText}>
            <View style={styles.userNameRow}>
              <ThemeText style={[styles.userName, { color: theme.colors.text.primary }]}>
                {post.user.name}
              </ThemeText>
              <SvgIcon name="verified" size={12} stroke={theme.colors.primary.main} />
            </View>
            <ThemeText style={[styles.handle, { color: theme.colors.text.secondary }]}>
              {post.user.handle}
            </ThemeText>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.followButton, { borderColor: theme.colors.primary.main }]}
        >
          <ThemeText style={[styles.followButtonText, { color: theme.colors.text.primary }]}>
            Follow
          </ThemeText>
        </TouchableOpacity>
      </View>

      <View style={styles.imageWrapper}>
        <Image source={{ uri: post.imageUri }} style={styles.image} />
        <View style={styles.slideBadge}>
          <ThemeText style={styles.slideText}>{post.slides}</ThemeText>
        </View>
        <View
          style={[
            styles.tag,
            { backgroundColor: post.tagBackground, borderColor: post.tagBackground },
          ]}
        >
          <ThemeText style={[styles.tagText, { color: post.tagColor }]}>{post.tag}</ThemeText>
        </View>
        <View style={styles.imageMetaRow}>
          <View style={styles.imageMetaPill}>
            <SvgIcon name="simple-calendar" size={8} stroke="#fff" />
            <Text style={styles.imageMetaText}>{post.date}</Text>
          </View>
          <View style={styles.imageMetaPill}>
            <SvgIcon name="location" size={8} stroke="#fff" />
            <Text style={styles.imageMetaText}>{post.location}</Text>
          </View>
        </View>
      </View>

      <ThemeText style={[styles.description, { color: theme.colors.text.primary }]}>
        {post.description}
      </ThemeText>

      <View style={styles.statsRow}>
        <View style={styles.statsGroup}>
          <View style={styles.statItem}>
            <SvgIcon name="heart" size={10} stroke={theme.colors.text.primary} />
            <ThemeText style={[styles.statText, { color: theme.colors.text.primary }]}>
              {post.likes.toLocaleString()}
            </ThemeText>
          </View>
          <View style={styles.statItem}>
            <SvgIcon name="comments" size={10} stroke={theme.colors.text.primary} />
            <ThemeText style={[styles.statText, { color: theme.colors.text.primary }]}>
              {post.comments.toLocaleString()}
            </ThemeText>
          </View>
          <View style={styles.statItem}>
            <SvgIcon name="share" size={10} stroke={theme.colors.text.primary} />
            <ThemeText style={[styles.statText, { color: theme.colors.text.primary }]}>
              {post.shares.toLocaleString()}
            </ThemeText>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.bookmarkButton,
            // { backgroundColor: theme.colors.gray?.[100] ?? "rgba(0,0,0,0.04)" },
          ]}
        >
          <SvgIcon name="bookmark" size={10} stroke={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.attendeesRow}>
          <SvgIcon name="people" size={10} stroke={theme.colors.text.secondary} />
          <ThemeText style={[styles.attendeesText, { color: theme.colors.text.secondary }]}>
            {post.attendees}
          </ThemeText>
        </View>
        <ThemeText style={[styles.timeText, { color: theme.colors.text.secondary }]}>
          {post.timeAgo}
        </ThemeText>
      </View>
    </View>
  );
});

SocialPostCard.displayName = "SocialPostCard";

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 0,
    marginBottom: 20,
    borderWidth: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userInfoText: {
    justifyContent: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  userName: {
    fontSize: 12,
    fontWeight: "700" as const,
  },
  handle: {
    fontSize: 8,
    fontWeight: "500" as const,
    marginTop: -2,
  },
  followButton: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 0,
  },
  followButtonText: {
    fontSize: 12,
    fontWeight: "700" as const,
  },
  imageWrapper: {
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 220,
  },
  slideBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },
  slideText: {
    fontSize: 8,
    fontWeight: "500" as const,
    color: "#fff",
  },
  tag: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "700" as const,
  },
  imageMetaRow: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageMetaPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 4,
  },
  imageMetaText: {
    fontSize: 8,
    fontWeight: "600" as const,
    color: "#fff",
  },
  description: {
    marginTop: 12,
    paddingHorizontal: 12,
    fontSize: 12,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 12,
  },
  statsGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 10,
    fontWeight: "600" as const,
  },
  bookmarkButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  footerRow: {
    marginTop: 0,
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  attendeesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  attendeesText: {
    fontSize: 8,
    fontWeight: "500" as const,
  },
  timeText: {
    fontSize: 8,
    fontWeight: "500" as const,
  },
});

export default SocialPostCard;
