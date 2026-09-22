import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "@/theme";
import { ThemeText } from "@/components";
import { SvgIcon, type SvgIconName } from "@/components/SvgIcon";
import { ThemeButton } from "@/components/primitives/ThemeButton";

export type MyEvent = {
  id: string;
  imageUri: string;
  title: string;
  description?: string;
  dateTime: string;
  location: string;
  attendees: number;
  status?: "ticket" | "signed-up";
  likes?: number;
  comments?: number;
  shares?: number;
};

export type MyEventCardProps = MyEvent & {
  variant?: "default" | "profile-post";
  onPressViewTickets?: () => void;
  onPressViewDetails?: () => void;
  onPressChat?: () => void;
};

export default function MyEventCard({
  imageUri,
  title,
  description,
  dateTime,
  location,
  attendees,
  status,
  likes,
  comments,
  shares,
  variant = "default",
  onPressViewTickets,
  onPressViewDetails,
  onPressChat,
}: MyEventCardProps) {
  const theme = useTheme();
  const badge: { label: string; bg: string; color: string; icon: SvgIconName } | null =
    status === "ticket"
      ? {
          label: "Ticket",
          bg: theme.colors.success.light,
          color: theme.colors.success.dark,
          icon: "view-ticket",
        }
      : status === "signed-up"
        ? {
            label: "Signed Up",
            bg: theme.colors.info.light,
            color: theme.colors.info.dark,
            icon: "profile",
          }
        : null;

  const likesCount = likes ?? attendees;
  const commentsCount = comments ?? 0;

  if (variant === "profile-post") {
    return (
      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: theme.colors.background.paper,
            borderColor: theme.colors.border,
          },
          theme.shadows?.[1],
        ]}
      >
        <Image source={{ uri: imageUri }} style={styles.profileImage} resizeMode="cover" />
        <View style={styles.profileContent}>
          <ThemeText
            variant="caption2"
            style={[styles.profileTitle, { color: theme.colors.text.primary }]}
          >
            {title}
          </ThemeText>
          {description ? (
            <ThemeText
              variant="tagStyle"
              style={[styles.profileDescription, { color: theme.colors.text.secondary }]}
              numberOfLines={3}
            >
              {description}
            </ThemeText>
          ) : null}

          <View style={styles.profileMetaGroup}>
            <View style={styles.profileMetaRow}>
              <SvgIcon name="simple-calendar" size={10} stroke={theme.colors.text.disabled} />
              <ThemeText variant="tagStyle" style={{ color: theme.colors.text.secondary }}>
                {dateTime}
              </ThemeText>
            </View>
            <View style={styles.profileMetaRow}>
              <SvgIcon name="location" size={10} stroke={theme.colors.text.disabled} />
              <ThemeText variant="tagStyle" style={{ color: theme.colors.text.secondary }}>
                {location}
              </ThemeText>
            </View>
          </View>

          <View style={styles.profileStatsRow}>
            <View style={styles.profileStatGroup}>
              <View style={styles.profileStatItem}>
                <SvgIcon name="heart" size={10} stroke={theme.colors.text.secondary} />
                <ThemeText
                  variant="tagStyle"
                  style={[styles.profileStatText, { color: theme.colors.text.secondary }]}
                >
                  {likesCount.toLocaleString()}
                </ThemeText>
              </View>
              <View style={styles.profileStatItem}>
                <SvgIcon name="comments" size={10} stroke={theme.colors.text.secondary} />
                <ThemeText
                  variant="tagStyle"
                  style={[styles.profileStatText, { color: theme.colors.text.secondary }]}
                >
                  {commentsCount.toLocaleString()}
                </ThemeText>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Share post"
                style={[
                  styles.profileShareButton,
                  {
                    // borderColor: theme.colors.border,
                    // backgroundColor: theme.colors.gray?.[100] ?? theme.colors.background.default,
                  },
                ]}
              >
                <SvgIcon name="share" size={10} stroke={theme.colors.text.secondary} />
                {/* {typeof shares === "number" ? (
                <ThemeText
                  variant="tagStyle700"
                  style={[styles.profileShareText, { color: theme.colors.text.secondary }]}
                >
                  {shares.toLocaleString()}
                </ThemeText>
              ) : null} */}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[styles.card, { backgroundColor: theme.colors.background.paper, shadowColor: "#000" }]}
    >
      <View style={styles.row}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.right}>
          <View style={styles.titleRow}>
            <ThemeText variant="caption2" style={{ color: theme.colors.text.primary }}>
              {title}
            </ThemeText>
            {badge ? (
              <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                <SvgIcon name={badge.icon} size={10} stroke={badge.color} />
                <ThemeText style={{ color: badge.color }} variant="tagStyle">
                  {badge.label}
                </ThemeText>
              </View>
            ) : null}
          </View>
          {description ? (
            <ThemeText
              variant="tagStyle"
              style={{ color: theme.colors.text.secondary, marginTop: 2 }}
            >
              {description}
            </ThemeText>
          ) : null}

          <View style={{ marginTop: 8 }}>
            <View style={styles.metaRow}>
              <SvgIcon name="simple-calendar" size={14} stroke={theme.colors.text.disabled} />
              <ThemeText variant="tagStyle" style={{ color: theme.colors.text.secondary }}>
                {dateTime}
              </ThemeText>
            </View>
            <View style={[styles.metaRow, { marginTop: 6 }]}>
              <SvgIcon name="location" size={14} stroke={theme.colors.text.disabled} />
              <ThemeText variant="tagStyle" style={{ color: theme.colors.text.secondary }}>
                {location}
              </ThemeText>
            </View>
            <View style={[styles.metaRow, { marginTop: 6 }]}>
              <SvgIcon name="people" size={14} stroke={theme.colors.text.disabled} />
              <ThemeText variant="tagStyle" style={{ color: theme.colors.text.secondary }}>
                {attendees.toLocaleString()} attendees
              </ThemeText>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <ThemeButton
              variant="filled"
              color="primary"
              size="sm"
              title={status === "ticket" ? "View Tickets" : "Get Tickets"}
              textStyle={{ fontSize: 8, fontWeight: 500 }}
              style={{ paddingVertical: 2 }}
              leftIcon={<SvgIcon name="view-ticket" size={10} stroke="white" />}
              onPress={onPressViewTickets}
            />
            <ThemeButton
              variant="outlined"
              textStyle={{ fontSize: 8, fontWeight: 500, color: theme.colors.text.secondary }}
              size="sm"
              title="View Details"
              style={{
                borderColor: theme.colors.border,
                paddingVertical: 2,
              }}
              onPress={onPressViewDetails}
            />
            <ThemeButton
              textStyle={{ fontSize: 8, fontWeight: 500, color: theme.colors.text.secondary }}
              variant="outlined"
              size="sm"
              title="Chat"
              style={{
                borderColor: theme.colors.border,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
              onPress={onPressChat}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderTopEndRadius: 16,
    borderBottomEndRadius: 16,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowColor: "rgba(0,0,0,0.2)",
    elevation: 2,
  },
  row: {
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: "100%",
  },
  right: {
    flex: 1,
    padding: 14,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    position: "absolute",
    right: 0,
    top: -8,
    flexDirection: "row",
    borderRadius: 14,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 2,
    alignItems: "center",
  },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  actionsRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 14 },
  profileCard: {
    flexDirection: "row",
    borderTopEndRadius: 24,
    borderBottomEndRadius: 24,
    // overflow: "hidden",
    // borderWidth: 1,
    // marginBottom: 20,
  },
  profileImage: {
    width: 180,
    // height: 160,
  },
  profileContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
  },
  profileDescription: {
    marginTop: 8,
    lineHeight: 12,
  },
  profileMetaGroup: {
    marginTop: 12,
    gap: 8,
  },
  profileMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  profileStatGroup: {
    flexDirection: "row",
    gap: 16,
  },
  profileStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  profileStatText: {
    fontSize: 10,
  },
  profileShareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    // paddingHorizontal: 12,
    paddingVertical: 6,
    // borderWidth: 1,
    gap: 6,
  },
  profileShareText: {
    fontSize: 10,
  },
});
