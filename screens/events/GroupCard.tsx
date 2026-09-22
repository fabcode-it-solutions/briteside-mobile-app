import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { useTheme, useColors } from "@/theme/hooks";
import { ThemeText } from "@/components";
import { SvgIcon } from "@/components/SvgIcon";

export type GroupCardProps = {
  // Rich props (used in tab4.tsx)
  id?: string;
  category?: string;
  memberCount?: number;
  image?: string;
  title?: string;
  description?: string;
  location?: string;
  nextEvent?: { title: string; date: string };
  tags?: string[];
  onPressJoin?: () => void;
  priceBadge?: string;
  priceValue?: string;
  priceCaption?: string;
  onPressShare?: () => void;
  onPress?: () => void;
  // Back-compat props (from EventsScreen)
  imageUri?: string;
  name?: string;
  members?: number;
};

export default function GroupCard(props: GroupCardProps) {
  const theme = useTheme();
  const colors = useColors();

  const imageSrc = props.image ?? props.imageUri ?? "";
  const displayTitle = props.title ?? props.name ?? "";
  const displayMembers = typeof props.memberCount === "number" ? props.memberCount : props.members;
  const showPriceSection = Boolean(props.priceBadge || props.priceValue || props.priceCaption);

  return (
    <TouchableOpacity
      activeOpacity={props.onPress ? 0.92 : 1}
      disabled={!props.onPress}
      onPress={props.onPress}
      style={[styles.groupCard, { backgroundColor: colors.background.paper }, theme.shadows[2]]}
    >
      {!!imageSrc && (
        <View
          style={{
            position: "relative",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: "hidden",
          }}
        >
          {(props.category || typeof displayMembers === "number") && (
            <View style={styles.groupHeader}>
              {props.category ? (
                <View style={[styles.categoryBadge, { backgroundColor: colors.gray[600] }]}>
                  <SvgIcon name="camera" size={14} stroke="#fff" style={styles.badgeIcon} />
                  <ThemeText variant="tagStyle500" color="#fff" fontWeight={500}>
                    {props.category}
                  </ThemeText>
                </View>
              ) : (
                <View />
              )}
              {typeof displayMembers === "number" && (
                <View style={styles.memberCount}>
                  <SvgIcon name="people" size={8} stroke={colors.text.secondary} />
                  <ThemeText
                    variant="tagStyle"
                    color={colors.text.secondary}
                    style={styles.memberCountText}
                  >
                    {displayMembers}
                  </ThemeText>
                </View>
              )}
            </View>
          )}
          <Image source={{ uri: imageSrc }} style={styles.groupImage} />
        </View>
      )}

      <View style={styles.groupContent}>
        <View style={styles.titleRow}>
          <View style={styles.titleWrapper}>
            {!!displayTitle && (
              <ThemeText variant="caption2" style={styles.groupTitle}>
                {displayTitle}
              </ThemeText>
            )}
            {!!props.description && (
              <ThemeText
                variant="tagStyle"
                color={colors.text.secondary}
                style={styles.groupDescription}
              >
                {props.description}
              </ThemeText>
            )}
            {!!props.location && (
              <View style={styles.locationRow}>
                <SvgIcon name="location" size={10} stroke={colors.text.secondary} />
                <ThemeText
                  variant="tagStyle"
                  color={colors.text.secondary}
                  style={styles.locationText}
                >
                  {props.location}
                </ThemeText>
              </View>
            )}
          </View>
          {showPriceSection && (
            <View style={styles.priceContainer}>
              {!!props.priceBadge && (
                <ThemeText
                  variant="tagStyle500"
                  color={colors.text.secondary}
                  style={styles.priceBadge}
                  uppercase
                >
                  {props.priceBadge}
                </ThemeText>
              )}
              {!!props.priceValue && (
                <ThemeText
                  variant="subtitle4"
                  style={[styles.priceValue, { color: colors.text.primary }]}
                >
                  {props.priceValue}
                </ThemeText>
              )}
              {!!props.priceCaption && (
                <ThemeText
                  variant="tagStyle"
                  color={colors.text.secondary}
                  style={styles.priceCaption}
                >
                  {props.priceCaption}
                </ThemeText>
              )}
            </View>
          )}
        </View>

        {props.nextEvent && (
          <>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.eventSection}>
              <ThemeText variant="tagStyle500" fontWeight={500} style={styles.eventLabel}>
                Next Event:
              </ThemeText>
              <ThemeText variant="tagStyle" color={colors.text.secondary} style={styles.eventTitle}>
                {props.nextEvent.title}
              </ThemeText>
              <View style={styles.eventDateRow}>
                <SvgIcon name="simple-calendar" size={10} stroke={colors.text.secondary} />
                <ThemeText
                  variant="tagStyle"
                  color={colors.text.secondary}
                  style={styles.eventDate}
                >
                  {props.nextEvent.date}
                </ThemeText>
              </View>
            </View>
          </>
        )}

        <View style={styles.tagsShareRow}>
          <View style={styles.tagsArea}>
            {!!props.tags && props.tags.length > 0 && (
              <View style={styles.tagsRow}>
                {props.tags.map((tag, index) => (
                  <View
                    key={`${tag}-${index}`}
                    style={[styles.tag, { borderColor: colors.border }]}
                  >
                    <ThemeText variant="tagStyle500" color={colors.text.secondary}>
                      {tag}
                    </ThemeText>
                  </View>
                ))}
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[styles.shareButton]}
            activeOpacity={0.8}
            onPress={props.onPressShare}
          >
            <SvgIcon name="share" size={12} stroke={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={props.onPressJoin}
          style={[styles.joinButton, { backgroundColor: colors.primary.main }]}
          activeOpacity={0.9}
        >
          <SvgIcon name="people" size={16} stroke="#fff" style={styles.joinIcon} />
          <ThemeText variant="caption2" color="#fff">
            Join Group
          </ThemeText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  groupCard: {
    borderRadius: 10,
    // overflow: "hidden",
    marginBottom: 16,
  },
  groupHeader: {
    position: "absolute",
    top: 0,
    zIndex: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 16,
    gap: 4,
  },
  badgeIcon: {
    marginRight: 2,
  },
  memberCount: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#fff",
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  memberCountText: {
    marginLeft: 4,
  },
  groupImage: {
    width: "100%",
    height: 400,
  },
  groupContent: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
  },
  titleWrapper: {
    flex: 1,
  },
  groupTitle: {
    marginBottom: 4,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceBadge: {
    marginBottom: 4,
  },
  priceValue: {
    marginBottom: 2,
  },
  priceCaption: {},
  groupDescription: {
    marginBottom: 12,
    lineHeight: 14,
    maxWidth: 250,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  locationText: {
    marginLeft: 6,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  eventSection: {
    marginBottom: 12,
  },
  eventLabel: {
    marginBottom: 4,
  },
  eventTitle: {
    marginBottom: 8,
  },
  eventDateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventDate: {
    marginLeft: 6,
  },
  tagsShareRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  tagsArea: {
    flex: 1,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  shareButton: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  joinIcon: {
    marginRight: 4,
  },
});
