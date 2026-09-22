import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemeText, ThemeView } from "@/components";
import { SvgIcon } from "@/components/SvgIcon";
import { useTheme } from "@/theme";

import type { ProfileLikedItem, ProfileSavedItem } from "../constants";

type ProfileCollectionVariant = "likes" | "saved";

type ProfileCollectionGridProps = {
  items: Array<ProfileLikedItem | ProfileSavedItem>;
  variant: ProfileCollectionVariant;
};

const ProfileCollectionGrid: React.FC<ProfileCollectionGridProps> = ({ items, variant }) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {items.map((item) => (
          <ProfileCollectionCard key={item.id} item={item} variant={variant} />
        ))}
      </View>
    </View>
  );
};

const ProfileCollectionCard = ({
  item,
  variant,
}: {
  item: ProfileLikedItem | ProfileSavedItem;
  variant: ProfileCollectionVariant;
}) => {
  const theme = useTheme();
  const isSaved = variant === "saved";

  return (
    <ThemeView
      backgroundColor={theme.colors.background.paper}
      style={[
        styles.card,
        {
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={[styles.infoRow, isSaved ? styles.infoRowSaved : styles.infoRowLikes]}>
        <View style={styles.authorRow}>
          <Image source={{ uri: item.authorAvatar }} style={styles.avatar} />
          <ThemeText
            variant="caption2"
            style={styles.authorLabel}
            color={theme.colors.text.secondary}
          >
            {item.author}
          </ThemeText>
        </View>

        {isSaved ? (
          <View style={styles.savedMeta}>
            <Ionicons name="time-outline" size={6} color={theme.colors.text.secondary} />
            {"dateLabel" in item ? (
              <ThemeText
                variant="meta2"
                style={styles.savedMetaLabel}
                color={theme.colors.text.secondary}
              >
                {item.dateLabel}
              </ThemeText>
            ) : null}
            <Ionicons name="bookmark" size={8} color={theme.colors.primary.main} />
          </View>
        ) : (
          <SvgIcon name="heart" size={10} color={theme.colors.primary.main} />
        )}
      </View>
    </ThemeView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
  },
  card: {
    width: "31%",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: "#000",
  },
  image: {
    width: "100%",
    height: 120,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  infoRowLikes: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  infoRowSaved: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  authorLabel: {
    fontSize: 6,
    fontWeight: "500",
  },
  savedMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  savedMetaLabel: {
    fontSize: 5,
    fontWeight: "400",
  },
});

export default ProfileCollectionGrid;
