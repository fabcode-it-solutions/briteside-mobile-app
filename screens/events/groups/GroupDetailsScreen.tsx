import React, { useCallback, useMemo, useState } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ParallaxScrollView, SafeAreaScreen, ThemeStatusBar, ThemeText } from "@/components";
import { useTheme } from "@/theme";
import { SvgIcon } from "@/components/SvgIcon";
import SegmentedControl from "@/screens/events/SegmentedControl";
import {
  GroupDetailsHero,
  GroupDiscussionComposer,
  GroupDiscussionPostCard,
  GroupEventCard,
  GroupMemberCard,
} from "./components";
import { DEFAULT_GROUP_ID, getGroupDetailsById } from "./groupDetailsData";
import type { GroupDetail, GroupMember } from "../types";
import { Ionicons } from "@expo/vector-icons";

const HEADER_MAX_HEIGHT = 470;
const HEADER_MIN_HEIGHT = 160;
const segments = [
  { key: "discussions", label: "Discussions" },
  { key: "events", label: "Events" },
  { key: "members", label: "Members" },
] as const;

type SegmentKey = (typeof segments)[number]["key"];

const formatMembers = (count: number) => {
  return `${count.toLocaleString()} members`;
};

const GroupDetailsScreen: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const params = useLocalSearchParams<{ groupId?: string | string[] }>();
  const [selectedSegment, setSelectedSegment] = useState<SegmentKey>("discussions");

  const group: GroupDetail | undefined = useMemo(() => {
    const groupIdParam = Array.isArray(params.groupId) ? params.groupId[0] : params.groupId;
    return getGroupDetailsById(groupIdParam ?? undefined) ?? getGroupDetailsById(DEFAULT_GROUP_ID);
  }, [params.groupId]);

  if (!group) {
    return (
      <SafeAreaScreen
        withBackground
        edges={["left", "right", "bottom"]}
        style={[styles.fallbackScreen, { backgroundColor: theme.colors.background.default }]}
      >
        <View style={styles.fallbackContainer}>
          <ThemeText variant="subtitle2" style={{ color: theme.colors.text.primary }}>
            Group details not available.
          </ThemeText>
          <ThemeText variant="caption2" style={{ color: theme.colors.text.secondary }}>
            Please return and try opening this group again.
          </ThemeText>
        </View>
      </SafeAreaScreen>
    );
  }

  const handleInviteFriends = useCallback(() => {
    console.log(`Invite friends for group ${group.id}`);
  }, [group.id]);

  const handleViewMemberProfile = useCallback(
    (member: GroupMember) => {
      console.log(`View profile for member ${member.id} in group ${group.id}`);
    },
    [group.id],
  );

  const eventsHeading = group.eventsHeading ?? "Upcoming Events";
  const membersHeading = group.membersHeading ?? "Members";
  const inviteFriendsLabel = group.inviteFriendsLabel ?? "Invite Friends";
  const memberCountLabel = `${membersHeading} (${group.memberCount.toLocaleString()})`;

  const discussionsContent = (
    <View style={styles.discussionsArea}>
      <GroupDiscussionComposer
        placeholder={group.composer.placeholder}
        avatarUri={group.composer.currentUserAvatar}
        postButtonLabel={group.composer.postButtonLabel}
      />
      <View style={styles.postsList}>
        {group.discussions.map((post) => (
          <GroupDiscussionPostCard key={post.id} post={post} />
        ))}
      </View>
    </View>
  );

  const eventsContent = (
    <View style={styles.eventsSection}>
      <View style={styles.eventsHeader}>
        <ThemeText
          variant="subtitle2"
          fontWeight={700}
          style={{ color: theme.colors.text.primary }}
        >
          {eventsHeading}
        </ThemeText>
      </View>
      <View style={styles.eventsList}>
        {group.events.map((event) => (
          <View key={event.id} style={styles.eventCardWrapper}>
            <GroupEventCard event={event} />
          </View>
        ))}
      </View>
    </View>
  );

  const membersContent = (
    <View style={styles.membersSection}>
      <View style={styles.membersHeader}>
        <ThemeText variant="caption2" fontWeight={700} style={{ color: theme.colors.text.primary }}>
          {memberCountLabel}
        </ThemeText>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.inviteButton,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.background.default,
            },
          ]}
          onPress={handleInviteFriends}
        >
          <Ionicons name="person-add-outline" size={12} color={theme.colors.text.secondary} />
          <ThemeText variant="overline" color={theme.colors.text.secondary} fontWeight={600}>
            {inviteFriendsLabel}
          </ThemeText>
        </TouchableOpacity>
      </View>
      <View style={styles.membersGrid}>
        {group.members.map((member) => (
          <GroupMemberCard
            key={member.id}
            member={member}
            onPressProfile={handleViewMemberProfile}
          />
        ))}
      </View>
    </View>
  );

  const segmentContent =
    selectedSegment === "events"
      ? eventsContent
      : selectedSegment === "members"
        ? membersContent
        : discussionsContent;

  return (
    <SafeAreaScreen
      withBackground={false}
      edges={["left", "right", "bottom"]}
      style={[styles.screen, { backgroundColor: theme.colors.background.default }]}
    >
      <ThemeStatusBar style="light" />
      <View style={styles.container}>
        <ParallaxScrollView
          headerHeight={HEADER_MAX_HEIGHT}
          headerMinHeight={HEADER_MIN_HEIGHT}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: HEADER_MAX_HEIGHT + 20,
              backgroundColor: theme.colors.background.default,
            },
          ]}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          renderHeader={({ scrollY, headerScrollDistance, headerHeight }) => {
            const imageScale = scrollY.interpolate({
              inputRange: [-headerHeight, 0, headerScrollDistance],
              outputRange: [1.18, 1, 1],
              extrapolateLeft: "extend",
              extrapolateRight: "clamp",
            });

            const collapseTranslateY = scrollY.interpolate({
              inputRange: [0, headerScrollDistance],
              outputRange: [0, headerScrollDistance / 2],
              extrapolate: "clamp",
            });

            const centeringTranslateY = Animated.multiply(
              Animated.subtract(imageScale, 1),
              -headerHeight / 2,
            );

            const imageTranslateY = Animated.add(collapseTranslateY, centeringTranslateY);

            const overlayOpacity = scrollY.interpolate({
              inputRange: [0, headerScrollDistance * 0.5],
              outputRange: [0, 0.55],
              extrapolate: "clamp",
            });

            const topRowTranslateY = scrollY.interpolate({
              inputRange: [0, headerScrollDistance],
              outputRange: [0, headerScrollDistance],
              extrapolate: "clamp",
            });

            return (
              <GroupDetailsHero
                imageUri={group.heroImage}
                heroSlidesLabel={group.heroSlidesLabel}
                onBack={router.back}
                imageScale={imageScale}
                imageTranslateY={imageTranslateY}
                overlayOpacity={overlayOpacity}
                topRowTranslateY={topRowTranslateY}
              />
            );
          }}
        >
          <View style={styles.content}>
            <View
              style={[
                styles.infoCard,
                {
                  backgroundColor: theme.colors.background.paper,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.titleRow}>
                <View style={styles.titleArea}>
                  <ThemeText
                    variant="caption2"
                    fontWeight={700}
                    style={{ color: theme.colors.text.primary }}
                  >
                    {group.name}
                  </ThemeText>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <SvgIcon name="people" size={12} stroke={theme.colors.text.secondary} />
                      <ThemeText variant="meta2" color={theme.colors.text.secondary}>
                        {formatMembers(group.memberCount)}
                      </ThemeText>
                    </View>
                    <View style={styles.metaItem}>
                      <SvgIcon name="location" size={12} stroke={theme.colors.text.secondary} />
                      <ThemeText variant="meta2" color={theme.colors.text.secondary}>
                        {group.location}
                      </ThemeText>
                    </View>
                  </View>
                </View>
                <View style={styles.priceStack}>
                  <ThemeText
                    variant="body1Bold"
                    fontWeight={700}
                    style={{ color: theme.colors.text.primary }}
                  >
                    {group.priceLabel}
                  </ThemeText>
                  <ThemeText variant="overline" color={theme.colors.text.secondary}>
                    {group.priceCaption}
                  </ThemeText>
                </View>
              </View>

              <ThemeText
                variant="meta2"
                color={theme.colors.text.secondary}
                style={styles.description}
              >
                {group.description}
              </ThemeText>

              <View style={styles.organizerRow}>
                <Image source={{ uri: group.organizer.avatar }} style={styles.organizerAvatar} />
                <View style={styles.organizerInfo}>
                  <View style={styles.organizerHeader}>
                    <ThemeText
                      variant="overline"
                      fontWeight={700}
                      style={{ color: theme.colors.text.primary }}
                    >
                      {group.organizer.name}
                    </ThemeText>
                    <View
                      style={[
                        styles.organizerTag,
                        { backgroundColor: group.organizer.tag.backgroundColor },
                      ]}
                    >
                      <ThemeText variant="overline" color={group.organizer.tag.textColor}>
                        {group.organizer.tag.label}
                      </ThemeText>
                    </View>
                  </View>
                  <ThemeText variant="meta2" color={theme.colors.text.secondary}>
                    {group.organizer.role}
                  </ThemeText>
                </View>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  activeOpacity={0.88}
                  style={[
                    styles.joinButton,
                    {
                      backgroundColor: theme.colors.primary.main,
                    },
                  ]}
                  onPress={() => console.log("Join group pressed", group.id)}
                >
                  <SvgIcon name="people" size={12} stroke={theme.colors.white} />
                  <ThemeText
                    variant="overline"
                    color={theme.colors.primary.contrast}
                    fontWeight={700}
                  >
                    {group.actions.joinLabel}
                  </ThemeText>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[
                    styles.shareButton,
                    {
                      borderColor: theme.colors.border,
                      backgroundColor: theme.colors.background.default,
                    },
                  ]}
                  onPress={() => console.log("Share group pressed", group.id)}
                >
                  <SvgIcon name="share-2" size={12} stroke={theme.colors.text.secondary} />
                  <ThemeText
                    variant="caption2"
                    color={theme.colors.text.secondary}
                    fontWeight={600}
                  >
                    {group.actions.shareLabel}
                  </ThemeText>
                </TouchableOpacity>
              </View>
            </View>

            <SegmentedControl
              segments={segments.map((segmentItem) => ({
                key: segmentItem.key,
                label: segmentItem.label,
              }))}
              value={selectedSegment}
              onChange={(value) => setSelectedSegment(value as SegmentKey)}
              style={styles.segmentedControl}
            />

            {segmentContent}
          </View>
        </ParallaxScrollView>
      </View>
    </SafeAreaScreen>
  );
};

export default GroupDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 20,
    gap: 22,
  },
  infoCard: {
    borderRadius: 24,
    gap: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  titleArea: {
    flex: 1,
    gap: 12,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  priceStack: {
    alignItems: "flex-end",
    gap: 4,
  },
  description: {
    // lineHeight: 20,
  },
  organizerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  organizerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  organizerInfo: {
    flex: 1,
    gap: 6,
  },
  organizerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  organizerTag: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 14,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  joinButton: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 5,
    borderWidth: 1,
    gap: 8,
  },
  segmentedControl: {
    marginTop: 4,
  },
  discussionsArea: {
    gap: 18,
  },
  postsList: {
    gap: 16,
  },
  eventsSection: {
    gap: 20,
  },
  eventsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eventsList: {
    gap: 20,
  },
  eventCardWrapper: {
    marginBottom: 0,
  },
  membersSection: {
    gap: 20,
  },
  membersHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inviteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    borderWidth: 1,
  },
  membersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fallbackScreen: {
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
});
