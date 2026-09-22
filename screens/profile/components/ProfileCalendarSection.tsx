import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SvgIcon } from "@/components/SvgIcon";
import { ThemeButton, ThemeText, ThemeView } from "@/components";
import { useTheme } from "@/theme";

import type { ProfileCalendarEvent } from "../constants";

type ProfileCalendarSectionProps = {
  events: ProfileCalendarEvent[];
  grouping: "day" | "week";
  viewMode: "month" | "week";
  onToggleGrouping: () => void;
  onToggleViewMode: () => void;
};

const ProfileCalendarSection: React.FC<ProfileCalendarSectionProps> = ({
  events,
  grouping,
  viewMode,
  onToggleGrouping,
  onToggleViewMode,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <CalendarFilterButton
          label={grouping === "day" ? "Day" : "Week"}
          variant="outline"
          onPress={onToggleGrouping}
        />
        <CalendarFilterButton
          label={viewMode === "month" ? "Month" : "Week"}
          variant="filled"
          onPress={onToggleViewMode}
        />
      </View>

      <View style={styles.eventsList}>
        {events.map((event) => (
          <CalendarEventCard key={event.id} event={event} />
        ))}
      </View>
    </View>
  );
};

type CalendarFilterButtonProps = {
  label: string;
  variant: "outline" | "filled";
  onPress: () => void;
};

const CalendarFilterButton: React.FC<CalendarFilterButtonProps> = ({ label, variant, onPress }) => {
  const theme = useTheme();
  const isFilled = variant === "filled";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.filterButton,
        {
          backgroundColor: isFilled ? theme.colors.primary.main : theme.colors.background.paper,
          borderColor: isFilled ? "transparent" : theme.colors.border,
        },
      ]}
    >
      <View style={styles.filterButtonContent}>
        <ThemeText
          variant="caption2"
          fontWeight={600}
          style={{
            color: isFilled ? theme.colors.primary.contrast : theme.colors.text.secondary,
          }}
        >
          {label}
        </ThemeText>
        <Ionicons
          name="chevron-down"
          size={12}
          color={isFilled ? theme.colors.primary.contrast : theme.colors.text.secondary}
        />
      </View>
    </Pressable>
  );
};

const CalendarEventCard = ({ event }: { event: ProfileCalendarEvent }) => {
  const theme = useTheme();

  return (
    <ThemeView
      backgroundColor={theme.colors.background.paper}
      rounded="lg"
      style={[
        styles.eventCard,
        {
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Image source={{ uri: event.imageUri }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <ThemeText
            variant="caption2"
            fontWeight={700}
            style={{ color: theme.colors.text.primary }}
          >
            {event.title}
          </ThemeText>
          <View
            style={[
              styles.eventBadge,
              {
                backgroundColor: event.category.backgroundColor,
              },
            ]}
          >
            <ThemeText
              variant="overline"
              fontWeight={500}
              style={{ color: event.category.textColor, fontSize: 6 }}
            >
              {event.category.label}
            </ThemeText>
          </View>
        </View>

        <View style={styles.eventMetaRow}>
          <SvgIcon name="simple-calendar" size={10} stroke={theme.colors.text.secondary} />
          <ThemeText variant="tagStyle" color={theme.colors.text.secondary}>
            {event.dateLabel}
          </ThemeText>
        </View>

        <View style={styles.eventMetaRow}>
          <SvgIcon name="location" size={10} stroke={theme.colors.text.secondary} />
          <ThemeText variant="tagStyle" color={theme.colors.text.secondary}>
            {event.location}
          </ThemeText>
        </View>

        <ThemeButton
          variant="filled"
          color="primary"
          size="sm"
          title="View Details"
          style={styles.eventButton}
          textStyle={{ fontSize: 8, fontWeight: "500" }}
          leftIcon={<SvgIcon name="forkAndSpoon" size={12} stroke="#fff" />}
          onPress={() => {}}
        />
      </View>
    </ThemeView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  filterButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  eventsList: {
    gap: 18,
  },
  eventCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderTopEndRadius: 24,
    borderBottomEndRadius: 24,
    minHeight: 150,
    shadowOffset: { width: 112, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowColor: "rgba(0,0,0,0.2)",
    elevation: 2,
  },
  eventImage: {
    width: 150,
    height: "100%",
  },
  eventContent: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  eventBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  eventMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  eventButton: {
    alignSelf: "flex-start",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default ProfileCalendarSection;
