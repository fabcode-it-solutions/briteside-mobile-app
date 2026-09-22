"use client";

import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  ParallaxScrollView,
  SafeAreaScreen,
  ThemeStatusBar,
  ThemeText,
  ThemeView,
} from "@/components";
import SegmentedControl, { type Segment } from "@/screens/events/SegmentedControl";
import MyEventCard from "@/screens/events/MyEventCard";
import { SvgIcon } from "@/components/SvgIcon";
import { useTheme } from "@/theme";

import {
  CONTENT_PANEL_OVERLAP,
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  INTEREST_ICON_MAP,
  INTEREST_TAGS,
  PROFILE_CALENDAR_EVENTS,
  PROFILE_EVENTS,
  PROFILE_LIKED_ITEMS,
  PROFILE_SAVED_ITEMS,
  type ProfileTabKey,
} from "@/screens/profile/constants";
import ProfileHeroHeader from "@/screens/profile/components/ProfileHeroHeader";
import ProfileInfoCard from "@/screens/profile/components/ProfileInfoCard";
import ProfileCalendarSection from "@/screens/profile/components/ProfileCalendarSection";
import ProfileCollectionGrid from "@/screens/profile/components/ProfileCollectionGrid";

const ProfileScreen = () => {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState<ProfileTabKey>("posts");
  const [calendarGrouping, setCalendarGrouping] = useState<"day" | "week">("day");
  const [calendarViewMode, setCalendarViewMode] = useState<"month" | "week">("month");

  const posts = useMemo(() => PROFILE_EVENTS, []);
  const calendarEvents = useMemo(() => PROFILE_CALENDAR_EVENTS, []);
  const likedItems = useMemo(() => PROFILE_LIKED_ITEMS, []);
  const savedItems = useMemo(() => PROFILE_SAVED_ITEMS, []);

  const tabSegments = useMemo<Segment[]>(() => {
    return [
      {
        key: "posts",
        label: "Posts",
        icon: ({ active }) => (
          <SvgIcon
            name="grid3x3"
            size={12}
            stroke={active ? theme.colors.primary.main : theme.colors.text.disabled}
          />
        ),
      },
      {
        key: "calendar",
        label: "Calendar",
        icon: ({ active }) => (
          <SvgIcon
            name="simple-calendar"
            size={12}
            stroke={active ? theme.colors.primary.main : theme.colors.text.disabled}
          />
        ),
      },
      {
        key: "likes",
        label: "Likes",
        icon: ({ active }) => (
          <SvgIcon
            name="heart"
            size={12}
            stroke={active ? theme.colors.primary.main : theme.colors.text.disabled}
          />
        ),
      },
      {
        key: "saved",
        label: "Saved",
        icon: ({ active }) => (
          <SvgIcon
            name="bookmark"
            size={12}
            stroke={active ? theme.colors.primary.main : theme.colors.text.disabled}
          />
        ),
      },
    ];
  }, [theme.colors.primary.main, theme.colors.text.disabled]);

  const interests = useMemo(
    () => INTEREST_TAGS.map((tag) => ({ label: tag, icon: INTEREST_ICON_MAP[tag] })),
    [],
  );

  const profileStats = useMemo(
    () => [
      { label: "Following", value: "284" },
      { label: "Followers", value: "1250" },
    ],
    [],
  );

  const renderEmptyState = (message: string) => (
    <ThemeView
      style={[styles.emptyState, { borderColor: theme.colors.border }]}
      backgroundColor={theme.colors.background.paper}
      rounded="md"
    >
      <ThemeText variant="caption1" color={theme.colors.text.secondary}>
        {message}
      </ThemeText>
    </ThemeView>
  );

  const renderTabContent = () => {
    if (activeTab === "posts") {
      return posts.length > 0
        ? posts.map((event) => <MyEventCard key={event.id} variant="profile-post" {...event} />)
        : renderEmptyState("Nothing to show here yet.");
    }

    if (activeTab === "calendar") {
      return calendarEvents.length > 0 ? (
        <ProfileCalendarSection
          events={calendarEvents}
          grouping={calendarGrouping}
          viewMode={calendarViewMode}
          onToggleGrouping={() => setCalendarGrouping((prev) => (prev === "day" ? "week" : "day"))}
          onToggleViewMode={() =>
            setCalendarViewMode((prev) => (prev === "month" ? "week" : "month"))
          }
        />
      ) : (
        renderEmptyState("No upcoming calendar items.")
      );
    }

    if (activeTab === "likes") {
      return likedItems.length > 0 ? (
        <ProfileCollectionGrid items={likedItems} variant="likes" />
      ) : (
        renderEmptyState("You haven't liked any events yet.")
      );
    }

    if (activeTab === "saved") {
      return savedItems.length > 0 ? (
        <ProfileCollectionGrid items={savedItems} variant="saved" />
      ) : (
        renderEmptyState("You haven't saved any events yet.")
      );
    }

    return null;
  };

  return (
    <SafeAreaScreen
      withBackground={false}
      edges={["left", "right"]}
      style={[styles.flex1, { backgroundColor: theme.colors.background.default }]}
    >
      <ThemeStatusBar style="light" />
      <ParallaxScrollView
        headerHeight={HEADER_MAX_HEIGHT}
        headerMinHeight={HEADER_MIN_HEIGHT}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT },
        ]}
        scrollViewProps={{ bounces: true, showsVerticalScrollIndicator: false }}
        contentOverlapsHeader
        renderHeader={({ scrollY, headerScrollDistance, headerHeight }) => (
          <ProfileHeroHeader
            scrollY={scrollY}
            headerScrollDistance={headerScrollDistance}
            headerHeight={headerHeight}
          />
        )}
      >
        <View
          style={[
            styles.contentPanel,
            {
              backgroundColor: theme.colors.background.paper,
            },
          ]}
        >
          <View style={styles.profileCardWrapper}>
            <ProfileInfoCard
              profile={{
                name: "Alex Johnson",
                username: "alexj",
                bio: "Event photographer and music lover. Always looking for the next great experience.",
                avatarUri:
                  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop",
                location: "New York",
                joinDate: "May 2022",
              }}
              stats={profileStats}
              interests={interests}
            />
          </View>

          <View style={styles.section}>
            <SegmentedControl
              segments={tabSegments}
              value={activeTab}
              onChange={(value) => setActiveTab(value as ProfileTabKey)}
              style={[
                styles.tabSwitcher,
                {
                  backgroundColor: theme.colors.gray[100],
                },
              ]}
            />
          </View>

          <View style={[styles.section, styles.eventsSection]}>{renderTabContent()}</View>
        </View>
      </ParallaxScrollView>
    </SafeAreaScreen>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    position: "relative",
  },
  contentPanel: {
    marginTop: -CONTENT_PANEL_OVERLAP,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: 40,
    position: "relative",
    zIndex: 50,
  },
  profileCardWrapper: {
    zIndex: 999,
    position: "relative",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  tabSwitcher: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 6,
  },
  eventsSection: {
    marginTop: 20,
    gap: 20,
  },
  emptyState: {
    borderWidth: 1,
    paddingVertical: 28,
    alignItems: "center",
    borderStyle: "dashed",
  },
});

export default ProfileScreen;
