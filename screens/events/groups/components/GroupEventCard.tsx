import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import { SvgIcon } from "@/components/SvgIcon";
import type { GroupEvent } from "@/screens/events/types";

type GroupEventCardProps = {
  event: GroupEvent;
};

export const GroupEventCard: React.FC<GroupEventCardProps> = ({ event }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.background.paper,
          borderColor: theme.colors.border,
        },
        theme.shadows?.[2],
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: event.coverImage }} style={styles.image} resizeMode="cover" />
        <View style={styles.badgesRow}>
          <View style={[styles.categoryBadge, { backgroundColor: "rgba(0,0,0,0.6)" }]}>
            {event.categoryIcon && (
              <SvgIcon name={event.categoryIcon} size={12} color="transparent" stroke="#fff" />
            )}
            <ThemeText variant="tagStyle500" color="#fff" fontWeight={600}>
              {event.category}
            </ThemeText>
          </View>
          <View style={styles.memberBadge}>
            <SvgIcon name="people" size={12} stroke="#fff" />
            <ThemeText variant="tagStyle" color="#fff" fontWeight={600}>
              {event.memberCount.toLocaleString()}
            </ThemeText>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <ThemeText
              variant="caption2"
              fontWeight={700}
              style={{ color: theme.colors.text.primary }}
            >
              {event.title}
            </ThemeText>
            <ThemeText variant="tagStyle" color={theme.colors.text.secondary}>
              {event.description}
            </ThemeText>
            <View style={styles.locationRow}>
              <SvgIcon name="location" size={10} stroke={theme.colors.text.secondary} />
              <ThemeText variant="tagStyle" color={theme.colors.text.secondary}>
                {event.location}
              </ThemeText>
            </View>
          </View>
          <View style={styles.priceStack}>
            <ThemeText variant="overline" color={theme.colors.text.secondary} uppercase>
              {event.priceBadge}
            </ThemeText>
            <ThemeText variant="h7" fontWeight={700} style={{ color: theme.colors.text.primary }}>
              {event.priceValue}
            </ThemeText>
            <ThemeText variant="overline" color={theme.colors.text.secondary}>
              {event.priceCaption}
            </ThemeText>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        <View style={styles.nextEventBlock}>
          <ThemeText
            variant="tagStyle500"
            fontWeight={600}
            style={{ color: theme.colors.text.primary }}
          >
            Next Event:
          </ThemeText>
          <ThemeText variant="tagStyle" color={theme.colors.text.secondary}>
            {event.nextEvent.label}
          </ThemeText>
          <View style={styles.calendarRow}>
            <SvgIcon name="simple-calendar" size={10} stroke={theme.colors.text.secondary} />
            <ThemeText variant="tagStyle" color={theme.colors.text.secondary}>
              {event.nextEvent.datetime}
            </ThemeText>
          </View>
        </View>

        <View style={styles.tagsRow}>
          {event.tags.map((tag) => (
            <View
              key={tag}
              style={[
                styles.tagPill,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background.default,
                },
              ]}
            >
              <ThemeText variant="tagStyle500" color={theme.colors.text.secondary}>
                {tag}
              </ThemeText>
            </View>
          ))}
        </View>

        <View style={styles.footerRow}>
          <View>
            {!!event.memberSinceLabel && (
              <ThemeText
                variant="tagStyle"
                style={{
                  marginBottom: 6,
                }}
                color={theme.colors.text.secondary}
              >
                {event.memberSinceLabel}
              </ThemeText>
            )}
            <ThemeText variant="tagStyle500" color={theme.colors.primary.main}>
              {event.postedAgo}
            </ThemeText>
          </View>
          {!!event.membershipStatusLabel && (
            <View
              style={[
                styles.membershipBadge,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background.default,
                },
              ]}
            >
              <ThemeText variant="tagStyle500" color={theme.colors.text.secondary}>
                {event.membershipStatusLabel}
              </ThemeText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  imageWrapper: {
    width: "100%",
    height: 400,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badgesRow: {
    position: "absolute",
    top: 12,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  memberBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.45)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 20,
  },
  titleBlock: {
    flex: 1,
    gap: 10,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  priceStack: {
    alignItems: "flex-end",
    gap: 4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
  },
  nextEventBlock: {
    gap: 6,
  },
  calendarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagPill: {
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 16,
    borderWidth: 1,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  membershipBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderRadius: 16,
    borderWidth: 1,
  },
});
