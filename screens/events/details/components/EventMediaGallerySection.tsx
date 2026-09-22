import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import type { EventMediaItem } from "@/screens/events/types";

type EventMediaGallerySectionProps = {
  media: EventMediaItem[];
};

export const EventMediaGallerySection: React.FC<EventMediaGallerySectionProps> = ({ media }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.background.paper,
        },
      ]}
    >
      <ThemeText variant="caption2" style={[styles.heading, { color: theme.colors.text.primary }]}>
        Media from Organizer
      </ThemeText>

      <View style={styles.mediaGrid}>
        {media.map((item) => (
          <View key={item.id} style={[styles.mediaCard]}>
            <View style={styles.mediaImageWrapper}>
              <Image source={{ uri: item.imageUri }} style={styles.mediaImage} />
              <View style={[styles.badge, { backgroundColor: theme.colors.primary.main }]}>
                <ThemeText
                  variant="overline"
                  style={[styles.badgeText, { color: theme.colors.primary.contrast }]}
                >
                  {item.caption}
                </ThemeText>
              </View>
            </View>
            <View style={styles.mediaBody}>
              <ThemeText variant="meta2" style={{ color: theme.colors.text.secondary }}>
                {item.description}
              </ThemeText>
            </View>
            <View style={styles.metaRow}>
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Avatar_The_Way_of_Water_Tokyo_Press_Conference_Sam_Worthington_%2852563252594%29_%28cropped%29.jpg/250px-Avatar_The_Way_of_Water_Tokyo_Press_Conference_Sam_Worthington_%2852563252594%29_%28cropped%29.jpg",
                }}
                style={styles.avatar}
              />

              <ThemeText variant="overline" style={{ color: theme.colors.text.primary }}>
                {item.postedBy}
              </ThemeText>
              <ThemeText variant="meta2" style={{ color: theme.colors.text.disabled }}>
                {item.postedAt}
              </ThemeText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    gap: 16,
  },
  heading: {
    fontWeight: "600",
  },
  mediaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  mediaCard: {
    flexBasis: "48%",
    overflow: "hidden",
  },
  mediaImageWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: 4 / 5,
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontWeight: "600",
  },
  mediaBody: {
    paddingTop: 12,
    paddingBottom: 10,
  },
  metaRow: {
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 28,
  },
});
