import React, { useMemo, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ParallaxScrollView,
  SafeAreaScreen,
  ThemeButton,
  ThemeStatusBar,
  ThemeText,
} from "@/components";
import { useTheme } from "@/theme";
import {
  EventAboutSection,
  EventAdditionalDetailsSection,
  EventDetailsHero,
  EventLocationSection,
  EventMediaGallerySection,
  EventOrganizerSection,
  EventOverviewCard,
  EventTicketsSection,
} from "./components";
import { EVENT_DETAILS_MAP, getEventDetailsById } from "./eventDetailsData";
import SegmentedControl from "@/screens/events/SegmentedControl";
import { Ionicons } from "@expo/vector-icons";

const DEFAULT_EVENT_ID = Object.keys(EVENT_DETAILS_MAP)[0];
const HEADER_MAX_HEIGHT = 500;
const HEADER_MIN_HEIGHT = 160;
const EventDetailsScreen: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const params = useLocalSearchParams<{ eventId?: string | string[] }>();
  const [selectedSegment, setSelectedSegment] = useState<"about" | "chat">("about");

  const event = useMemo(() => {
    const eventIdParam = Array.isArray(params.eventId) ? params.eventId[0] : params.eventId;
    if (eventIdParam) {
      return getEventDetailsById(eventIdParam);
    }
    return undefined;
  }, [params.eventId]);

  const eventData = event ?? EVENT_DETAILS_MAP[DEFAULT_EVENT_ID];

  if (!eventData) {
    return (
      <SafeAreaScreen
        withBackground={false}
        edges={["left", "right", "bottom"]}
        style={[styles.screen, { backgroundColor: theme.colors.background.default }]}
      >
        <View style={styles.fallbackContainer}>
          <ThemeText variant="subtitle2" style={{ color: theme.colors.text.primary }}>
            Event details not available.
          </ThemeText>
          <ThemeText variant="caption2" style={{ color: theme.colors.text.secondary }}>
            Please return to events and try again.
          </ThemeText>
        </View>
      </SafeAreaScreen>
    );
  }

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
          contentContainerStyle={[styles.scrollContent, { paddingTop: HEADER_MAX_HEIGHT + 20 }]}
          renderHeader={({ scrollY, headerScrollDistance, headerHeight }) => {
            const imageScale = scrollY.interpolate({
              inputRange: [-headerHeight, 0, headerScrollDistance],
              outputRange: [1.2, 1, 1],
              extrapolateLeft: "extend",
              extrapolateRight: "clamp",
            });

            const collapseTranslateY = scrollY.interpolate({
              inputRange: [0, headerScrollDistance],
              outputRange: [0, headerScrollDistance / 2],
              extrapolate: "clamp",
            });

            const parallaxTranslateY = collapseTranslateY;

            const centeringTranslateY = Animated.multiply(
              Animated.subtract(imageScale, 1),
              -headerHeight / 2,
            );

            const imageTranslateY = Animated.add(parallaxTranslateY, centeringTranslateY);

            const heroOverlayOpacity = scrollY.interpolate({
              inputRange: [0, headerScrollDistance * 0.6],
              outputRange: [0, 0.55],
              extrapolate: "clamp",
            });

            const topRowTranslateY = scrollY.interpolate({
              inputRange: [0, headerScrollDistance],
              outputRange: [0, headerScrollDistance],
              extrapolate: "clamp",
            });

            return (
              <EventDetailsHero
                imageUri={eventData.heroImage}
                onBack={router.back}
                imageScale={imageScale}
                imageTranslateY={imageTranslateY}
                overlayOpacity={heroOverlayOpacity}
                topRowTranslateY={topRowTranslateY}
              />
            );
          }}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
        >
          <View style={styles.body}>
            <View style={styles.overviewWrapper}>
              <EventOverviewCard
                title={eventData.title}
                dateTime={eventData.dateTime}
                locationSummary={eventData.locationSummary}
                attendees={eventData.attendees}
                likes={eventData.likes}
                priceLabel={eventData.priceLabel}
                priceCaption={eventData.priceCaption}
              />
            </View>

            <View style={styles.sectionSpacing}>
              <EventOrganizerSection organizer={eventData.organizer} />
            </View>

            <View style={styles.sectionSpacing}>
              <SegmentedControl
                segments={[
                  { key: "about", label: "About" },
                  { key: "chat", label: "Event Chat" },
                ]}
                value={selectedSegment}
                onChange={(value) => setSelectedSegment(value as "about" | "chat")}
              />
            </View>

            {selectedSegment === "about" ? (
              <>
                <View style={styles.sectionSpacing}>
                  <EventAboutSection description={eventData.description} />
                </View>

                <View style={styles.sectionSpacing}>
                  <EventLocationSection location={eventData.location} />
                </View>

                <View style={styles.sectionSpacing}>
                  <EventTicketsSection tickets={eventData.tickets} />
                </View>

                <View style={styles.sectionSpacing}>
                  <EventAdditionalDetailsSection details={eventData.additionalDetails} />
                </View>

                <View style={styles.sectionSpacing}>
                  <EventMediaGallerySection media={eventData.media} />
                </View>
              </>
            ) : (
              <View style={styles.sectionSpacing}>
                <View
                  style={[
                    styles.chatCard,
                    {
                      borderColor: theme.colors.border,
                      backgroundColor: theme.colors.background.paper,
                    },
                  ]}
                >
                  <ThemeText variant="caption2" style={{ color: theme.colors.text.primary }}>
                    Event Chat
                  </ThemeText>
                  <View style={styles.chatEmptyState}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={24}
                      color={theme.colors.text.disabled}
                    />
                    <ThemeText
                      variant="meta2"
                      style={{ color: theme.colors.text.secondary, textAlign: "center" }}
                    >
                      You need to be attending this event to participate in the chat.
                    </ThemeText>
                    <ThemeButton
                      variant="filled"
                      color="primary"
                      size="sm"
                      title="Attend to join chat"
                      style={styles.chatButton}
                      textStyle={styles.chatButtonText}
                      onPress={() => {}}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </ParallaxScrollView>
      </View>
    </SafeAreaScreen>
  );
};

export default EventDetailsScreen;

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
  body: {
    paddingHorizontal: 16,
    gap: 24,
  },
  overviewWrapper: {
    shadowColor: "#000",
  },
  sectionSpacing: {
    gap: 16,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  chatCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    gap: 20,
  },
  chatEmptyState: {
    alignItems: "center",
    gap: 14,
  },
  chatButton: {
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 1,
  },
  chatButtonText: {
    fontSize: 10,
    fontWeight: "600",
  },
});
