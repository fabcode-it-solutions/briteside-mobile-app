import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemeText, ThemeButton } from "@/components";
import { SvgIcon } from "@/components/SvgIcon";
import { useTheme } from "@/theme";

type EventOverviewCardProps = {
  title: string;
  dateTime: string;
  locationSummary: string;
  attendees: number;
  likes: number;
  priceLabel: string;
  priceCaption: string;
  onPrimaryPress?: () => void;
  onLikePress?: () => void;
  onSharePress?: () => void;
};

export const EventOverviewCard: React.FC<EventOverviewCardProps> = ({
  title,
  dateTime,
  locationSummary,
  attendees,
  likes,
  priceLabel,
  priceCaption,
  onPrimaryPress,
  onLikePress,
  onSharePress,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.card, { backgroundColor: theme.colors.background.paper, shadowColor: "#000" }]}
    >
      <View>
        <ThemeText variant="h5" style={[styles.title, { color: theme.colors.text.primary }]}>
          {title}
        </ThemeText>
        <View style={styles.metaRow}>
          <SvgIcon name="simple-calendar" size={16} stroke={theme.colors.text.secondary} />
          <ThemeText
            variant="caption2"
            style={[styles.metaText, { color: theme.colors.text.secondary }]}
          >
            {dateTime}
          </ThemeText>
        </View>

        <View
          style={[
            styles.priceCard,
            {
              backgroundColor: "rgba(255,255,255,0.94)",
              shadowColor: "#000",
            },
          ]}
        >
          <ThemeText
            variant="caption1"
            style={[styles.priceLabel, { color: theme.colors.gray[600] }]}
          >
            From
          </ThemeText>
          <ThemeText variant="h5" style={[styles.priceValue, { color: theme.colors.text.primary }]}>
            {priceLabel}
          </ThemeText>
          <ThemeText
            variant="caption1"
            style={[styles.priceCaption, { color: theme.colors.text.secondary }]}
          >
            {priceCaption}
          </ThemeText>
        </View>

        <View style={styles.actionsRow}>
          <ThemeButton
            variant="filled"
            color="primary"
            title="Get Tickets"
            size="md"
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
            onPress={onPrimaryPress}
            leftIcon={<SvgIcon name="view-ticket" size={12} stroke={theme.colors.white} />}

          />
          <ThemeButton
            variant="outlined"
            size="md"
            title="Like"
            style={[styles.secondaryButton, { borderColor: theme.colors.border }]}
            textStyle={[styles.secondaryButtonText, { color: theme.colors.text.secondary }]}
            onPress={onLikePress}
            leftIcon={<SvgIcon name="heart" size={12} stroke={theme.colors.text.secondary} />}
          />
          <ThemeButton
            variant="outlined"
            size="md"
            title="Share"
            style={[styles.secondaryButton, { borderColor: theme.colors.border }]}
            textStyle={[styles.secondaryButtonText, { color: theme.colors.text.secondary }]}
            onPress={onSharePress}
            leftIcon={<SvgIcon name="share-2" size={12} stroke={theme.colors.text.secondary} />}
          />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <SvgIcon name="people" size={12} stroke={theme.colors.text.secondary} />
            <ThemeText
              variant="meta2"
              style={[styles.metaText, { color: theme.colors.text.secondary }]}
            >
              {attendees.toLocaleString()} attending
            </ThemeText>
          </View>
          <View style={styles.statPill}>
            <SvgIcon name="heart" size={12} stroke={theme.colors.text.secondary} />
            <ThemeText
              variant="meta2"
              style={[styles.metaText, { color: theme.colors.text.secondary }]}
            >
              {likes.toLocaleString()} likes
            </ThemeText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    borderRadius: 24,
  },
  title: {
    marginBottom: 12,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  metaText: {
    flexShrink: 1,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 14,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 1,
    borderRadius: 5,
  },
  primaryButtonText: {
    fontSize: 10,
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 1,
    borderRadius: 5,
  },
  secondaryButtonText: {
    fontSize: 10,
    fontWeight: "500",
  },
  priceCard: {
    position: "absolute",
    right: 0,
    top: 0,
    alignSelf: "flex-end",
  },
  priceLabel: {
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  priceValue: {
    fontWeight: "600",
  },
  priceCaption: {
    marginTop: 4,
  },
});
