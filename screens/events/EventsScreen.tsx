import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  InteractionManager,
  ListRenderItem,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/theme";
import { SafeAreaScreen, ThemeText } from "@/components";
import { useForm } from "react-hook-form";
import { Select, type SelectOption } from "@/components/ui/Select/select";
import CategoryCircle from "@/screens/events/CategoryCircle";
import SegmentedControl from "@/screens/events/SegmentedControl";
import EventCard from "@/screens/events/EventCard";
import MyEventCard, { MyEvent } from "@/screens/events/MyEventCard";
import GroupCard from "@/screens/events/GroupCard";
import { SvgIcon } from "@/components/SvgIcon";
import {
  BottomNavigation,
  DiscussionCard,
  EventsHeader,
  FilterChip,
  GroupSearchBar,
  InterestsModal,
  SectionHeader,
  SocialPostCard,
  SocialSearchBar,
  StartDiscussionCard,
} from "@/screens/events/components";
import { CATEGORIES, DISCUSSIONS, FILTER_OPTIONS, SOCIAL_POSTS } from "@/screens/events/mockData";
import type {
  BottomTabType,
  Category,
  DiscussionItem,
  EventItem,
  FilterType,
  GroupItem,
  SocialPost,
} from "@/screens/events/types";
import { useRouter } from "expo-router";

export default function EventsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [segment, setSegment] = useState<"discover" | "mine" | "discussions">("discover");
  const [activeBottomTab, setActiveBottomTab] = useState<BottomTabType>("social");
  const [socialSegment, setSocialSegment] = useState<"forYou" | "following">("forYou");
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [myFilter, setMyFilter] = useState<FilterType>("all");
  const [interestModalVisible, setInterestModalVisible] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["music"]);
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]?.label ?? "");
  const { control } = useForm<{ category: string }>({ defaultValues: { category: "all" } });

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setSegment("discover");
      if (activeBottomTab === "social") {
        setSocialSegment("forYou");
        setSelectedCategory(CATEGORIES[0]?.label ?? "");
      }
    });
  }, [activeBottomTab]);

  const openEventDetails = useCallback(
    (eventId: string) => router.push({ pathname: "/events/[eventId]", params: { eventId } }),
    [router],
  );

  const openGroupDetails = useCallback(
    (groupId: string) => router.push({ pathname: "/groups/[groupId]", params: { groupId } }),
    [router],
  );

  const categoryOptions = useMemo<SelectOption<string>[]>(
    () => [
      { label: "All Categories", value: "all" },
      ...CATEGORIES.map((c) => ({ label: c.label, value: c.label })),
    ],
    [],
  );

  const events = useMemo<EventItem[]>(
    () => [
      {
        id: "1",
        imageUri:
          "https://images.unsplash.com/photo-1579405219654-652eedcf20e5?q=80&w=1974&auto=format&fit=crop",
        title: "Yoga in the Park",
        dateTime: "Jul 21 · 11:00 PM",
        location: "Rooftop Club",
        price: "$65.00",
        attendees: 850,
      },
      {
        id: "2",
        imageUri:
          "https://images.unsplash.com/photo-1722087642932-9b070e9a066e?q=80&w=987&auto=format&fit=crop",
        title: "Yoga in the Park",
        dateTime: "Jul 21 · 11:00 PM",
        location: "Rooftop Club",
        price: "$65.00",
        attendees: 850,
      },
    ],
    [],
  );

  const myEvents = useMemo<MyEvent[]>(
    () => [
      {
        id: "m1",
        imageUri:
          "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1470&auto=format&fit=crop",
        title: "Annual Jazz Festival",
        description:
          "Celebrate three unforgettable nights of live jazz featuring legendary performers, emerging artists, and immersive stage experiences.",
        dateTime: "Tue, Jul 15, 2025 at 7:00 PM",
        location: "Downtown Jazz Center, NY",
        attendees: 1200,
        status: "ticket",
      },
      {
        id: "m2",
        imageUri:
          "https://images.unsplash.com/photo-1582192493926-93f4847e1323?q=80&w=2070&auto=format&fit=crop",
        title: "Tech Conference 2025",
        description: "Join industry leaders discussing the future of technology and innovation.",
        dateTime: "Fri, Jun 20, 2025 at 9:00 AM",
        location: "Innovation Hub Convention Center, SF",
        attendees: 1200,
        status: "signed-up",
      },
    ],
    [],
  );

  const groups = useMemo<GroupItem[]>(
    () => [
      {
        id: "g1",
        imageUri:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop",
        name: "NYC Photography Enthusiasts",
        category: "Photography",
        location: "Manhattan, NY",
        members: 1267,
        tags: ["Photography", "Art", "Outdoor"],
        priceBadge: "Free",
        priceValue: "$25.00",
        priceCaption: "Monthly",
        description:
          "A passionate community of photographers who explore NYC’s iconic locations and share creative tips.",
        nextEvent: {
          title: "Street Portrait Workshop",
          date: "Sat, Nov 16, 2025 at 10:00 AM",
        },
      },
      {
        id: "g2",
        imageUri:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1974&auto=format&fit=crop",
        name: "Tech Innovators NYC",
        category: "Technology",
        location: "Brooklyn, NY",
        members: 2081,
        tags: ["Technology", "Startups", "AI"],
        priceBadge: "Free",
        priceValue: "$40.00",
        priceCaption: "Monthly",
        description:
          "Join fellow innovators, engineers, and founders shaping the next generation of AI startups.",
        nextEvent: {
          title: "AI Product Pitch Night",
          date: "Tue, Nov 19, 2025 at 6:30 PM",
        },
      },
      {
        id: "g3",
        imageUri:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop",
        name: "Modern Art Collective",
        category: "Art & Culture",
        location: "Queens, NY",
        members: 892,
        tags: ["Art", "Culture", "Networking"],
        priceBadge: "Free",
        priceValue: "$18.00",
        priceCaption: "Monthly",
        description:
          "A collective for artists and art lovers to connect, exhibit, and explore New York’s creative scene.",
        nextEvent: {
          title: "Gallery Night & Mixer",
          date: "Fri, Nov 22, 2025 at 8:00 PM",
        },
      },
    ],
    [],
  );

  const keyExtractor = useCallback((item: EventItem | GroupItem | MyEvent) => item.id, []);

  const renderEvent: ListRenderItem<EventItem> = useCallback(
    ({ item }) => (
      <EventCard
        imageUri={item.imageUri}
        title={item.title}
        dateTime={item.dateTime}
        location={item.location}
        price={item.price}
        attendees={item.attendees}
      />
    ),
    [],
  );

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => (
      <View style={styles.categoryItem}>
        <CategoryCircle
          label={item.label}
          imageUri={item.image}
          selected={selectedCategory === item.label}
          onPress={() => setSelectedCategory(item.label)}
        />
      </View>
    ),
    [selectedCategory],
  );

  const renderGroup: ListRenderItem<GroupItem> = useCallback(
    ({ item }) => (
      <GroupCard
        imageUri={item.imageUri}
        name={item.name}
        location={item.location}
        members={item.members}
        tags={item.tags}
        id={item.id}
        category={item.category}
        description={item.description}
        nextEvent={item.nextEvent}
        priceBadge={item.priceBadge}
        priceValue={item.priceValue}
        priceCaption={item.priceCaption}
        onPressShare={item.onPressShare ?? (() => console.log(`Share group ${item.name}`))}
        onPressJoin={() => console.log(`Joined group ${item.name}`)}
        onPress={() => openGroupDetails(item.id)}
      />
    ),
    [openGroupDetails],
  );

  const renderMyEvent: ListRenderItem<MyEvent> = useCallback(
    ({ item }) => (
      <MyEventCard
        {...item}
        onPressViewTickets={() => openEventDetails(item.id)}
        onPressViewDetails={() => openEventDetails(item.id)}
      />
    ),
    [openEventDetails],
  );

  const renderSocialPost: ListRenderItem<SocialPost> = useCallback(
    ({ item }) => <SocialPostCard post={item} />,
    [],
  );

  const renderDiscussion: ListRenderItem<DiscussionItem> = useCallback(
    ({ item }) => <DiscussionCard discussion={item} />,
    [],
  );

  const handleInterestToggle = useCallback((id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((interest) => interest !== id) : [...prev, id],
    );
  }, []);

  const closeInterestModal = useCallback(() => {
    setInterestModalVisible(false);
  }, []);

  const openInterestModal = useCallback(() => {
    setInterestModalVisible(true);
  }, []);

  const handleSaveInterests = useCallback(() => {
    setInterestModalVisible(false);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setRefreshing(false);
    }
  }, []);

  const onEndReached = useCallback(() => {
    if (loadingMore || refreshing) return;

    setLoadingMore(true);
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => setLoadingMore(false), 300);
    });
  }, [loadingMore, refreshing]);

  const handleTabChange = useCallback((tab: BottomTabType) => {
    setActiveBottomTab(tab);
    if (tab === "social") {
      setSocialSegment("forYou");
    }
  }, []);

  const handleFilterChange = useCallback((filter: FilterType) => {
    setMyFilter(filter);
  }, []);

  const handleSegmentChange = useCallback((key: string) => {
    setSegment(key as "discover" | "mine" | "discussions");
  }, []);

  const getCategoryPadding = useCallback(() => {
    return {
      paddingTop: 12,
      paddingLeft: 16,
      paddingBottom: 12,
      marginBottom: 4,
    };
  }, []);

  const ListFooter = useCallback(() => {
    if (loadingMore) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator color={theme.colors.primary.main} />
        </View>
      );
    }
    return <View style={styles.footerSpacer} />;
  }, [loadingMore, theme.colors.primary.main]);

  return (
    <SafeAreaScreen
      style={[styles.safe, { backgroundColor: theme.colors.background.default }]}
      edges={["top"]}
    >
      <EventsHeader />
      <SectionHeader activeTab={activeBottomTab} />

      {activeBottomTab === "groups" && <GroupSearchBar />}
      {activeBottomTab === "social" && <SocialSearchBar />}

      <View>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(item) => item.label}
          renderItem={renderCategory}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={getCategoryPadding()}
          removeClippedSubviews={Platform.OS === "android"}
          initialNumToRender={6}
          maxToRenderPerBatch={4}
          windowSize={10}
        />
      </View>

      {activeBottomTab === "groups" ? (
        <SegmentedControl
          segments={[
            { key: "discover", label: "Discover" },
            { key: "discussions", label: "Discussions" },
            { key: "mine", label: "My Groups" },
          ]}
          style={styles.segmentControl}
          value={segment}
          onChange={handleSegmentChange}
        />
      ) : activeBottomTab === "social" ? (
        <View style={[styles.socialSegmentRow, { marginBottom: 8 }]}>
          <SegmentedControl
            segments={[
              { key: "forYou", label: "For You" },
              { key: "following", label: "Following" },
            ]}
            style={[styles.segmentControl, styles.socialSegmentControl]}
            value={socialSegment}
            onChange={(key) => setSocialSegment(key as "forYou" | "following")}
          />
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.interestsButton,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background.default,
              },
            ]}
            onPress={openInterestModal}
          >
            <SvgIcon name="interest" size={10} color={theme.colors.text.primary} />
            <ThemeText style={[styles.interestsButtonText, { color: theme.colors.text.primary }]}>
              Interests
            </ThemeText>
          </TouchableOpacity>
        </View>
      ) : (
        <SegmentedControl
          segments={[
            { key: "discover", label: "Discover Events" },
            { key: "mine", label: "My Events" },
          ]}
          style={styles.segmentControl}
          value={segment}
          onChange={handleSegmentChange}
        />
      )}

      {activeBottomTab === "social" ? (
        <FlatList
          data={SOCIAL_POSTS}
          keyExtractor={(item) => item.id}
          renderItem={renderSocialPost}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.socialListContent}
          removeClippedSubviews
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={10}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.4}
          ListFooterComponent={ListFooter}
        />
      ) : activeBottomTab === "groups" ? (
        segment === "discover" ? (
          <>
            <ThemeText
              variant="caption2"
              style={[styles.trending, { color: theme.colors.text.primary }]}
            >
              Popular Groups
            </ThemeText>
            <FlatList
              data={groups}
              keyExtractor={keyExtractor}
              renderItem={renderGroup}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              removeClippedSubviews
              initialNumToRender={4}
              maxToRenderPerBatch={4}
              windowSize={10}
            />
          </>
        ) : segment === "discussions" ? (
          <>
            <StartDiscussionCard />
            <View style={styles.recentHeaderRow}>
              <ThemeText variant="caption2">Recent Discussions</ThemeText>
              <ThemeText variant="meta2" color={theme.colors.text.secondary}>
                {DISCUSSIONS.length} Discussions
              </ThemeText>
            </View>
            <FlatList
              data={DISCUSSIONS}
              keyExtractor={(item) => item.id}
              renderItem={renderDiscussion}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.discussionsListContent}
              removeClippedSubviews
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              windowSize={10}
              refreshing={refreshing}
              onRefresh={onRefresh}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.4}
              ListFooterComponent={ListFooter}
            />
          </>
        ) : (
          <>
            <ThemeText
              variant="caption2"
              style={[styles.trending, { color: theme.colors.text.primary }]}
            >
              Popular Groups
            </ThemeText>
            <FlatList
              data={groups}
              keyExtractor={keyExtractor}
              renderItem={renderGroup}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              removeClippedSubviews
              initialNumToRender={4}
              maxToRenderPerBatch={4}
              windowSize={10}
            />
          </>
        )
      ) : segment === "discover" ? (
        <>
          <ThemeText
            variant="caption2"
            style={[styles.trending, { color: theme.colors.text.primary }]}
          >
            Trending Events
          </ThemeText>
          <FlatList
            data={events}
            renderItem={renderEvent}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={10}
            removeClippedSubviews
            refreshing={refreshing}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.4}
            ListFooterComponent={ListFooter}
          />
        </>
      ) : (
        <>
          <View style={styles.myEventsContainer}>
            <View style={styles.myEventsFilters}>
              <View
                style={[styles.filterPillContainer, { backgroundColor: theme.colors.gray[100] }]}
              >
                {FILTER_OPTIONS.map((filter) => (
                  <FilterChip
                    key={filter.key}
                    filter={filter}
                    active={myFilter === filter.key}
                    onPress={() => handleFilterChange(filter.key)}
                  />
                ))}
              </View>
              <TouchableOpacity style={styles.iconButton}>
                <SvgIcon name="filter" size={12} color={theme.colors.text.primary} />
              </TouchableOpacity>
              <View style={styles.flex1}>
                <Select
                  control={control}
                  name="category"
                  options={categoryOptions}
                  placeholder="All Categories"
                  style={styles.categorySelect}
                  textStyle={styles.categorySelectText}
                  inputStyle={styles.categorySelectInput}
                  placeholderStyle={styles.categorySelectPlaceholder}
                  dropdownStyle={styles.categorySelectDropdown}
                  optionStyle={styles.categorySelectOption}
                  optionTextStyle={styles.categorySelectOptionText}
                />
              </View>
            </View>
          </View>
          <FlatList
            data={myEvents}
            keyExtractor={keyExtractor}
            renderItem={renderMyEvent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.myEventsListContent}
            removeClippedSubviews
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={10}
          />
        </>
      )}

      <InterestsModal
        visible={interestModalVisible}
        onClose={closeInterestModal}
        onToggle={handleInterestToggle}
        onSave={handleSaveInterests}
        selected={selectedInterests}
      />
      <BottomNavigation activeTab={activeBottomTab} onTabChange={handleTabChange} />
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  categoryItem: {
    marginRight: 10,
  },
  segmentControl: {
    marginHorizontal: 16,
  },
  socialSegmentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  socialSegmentControl: {
    flex: 1,
    marginHorizontal: 0,
  },
  interestsButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  interestsButtonText: {
    fontSize: 12,
    fontWeight: "600" as const,
  },
  listContent: {
    paddingBottom: 120,
    paddingHorizontal: 16,
    marginTop: 1,
  },
  socialListContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 140,
  },
  trending: {
    marginTop: 18,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  myEventsContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  myEventsFilters: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
  filterPillContainer: {
    flexDirection: "row",
    gap: 8,
    padding: 6,
    borderRadius: 10,
  },
  iconButton: {
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  flex1: {
    flex: 1,
  },
  categorySelect: {
    flex: 1,
    padding: 0,
    marginBottom: 0,
  },
  categorySelectText: {
    fontSize: 8,
    fontWeight: "500" as const,
  },
  categorySelectInput: {
    height: 44,
    borderColor: "#d1d1d1",
    borderRadius: 6,
  },
  categorySelectPlaceholder: {
    color: "#aaa",
  },
  categorySelectDropdown: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  categorySelectOption: {
    paddingVertical: 0,
  },
  categorySelectOptionText: {
    fontSize: 8,
    color: "#333",
  },
  myEventsListContent: {
    paddingBottom: 120,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  loadingFooter: {
    paddingVertical: 12,
  },
  footerSpacer: {
    height: 4,
  },
  discussionsListContent: {
    paddingBottom: 120,
  },
  recentHeaderRow: {
    marginTop: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});
