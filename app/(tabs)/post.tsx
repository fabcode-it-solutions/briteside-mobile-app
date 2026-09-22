import React from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "@/theme/hooks";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaScreen, ThemeText, ThemeView } from "@/components";

const { width } = Dimensions.get("window");
const GRID_SPACING = 8;
const GRID_COLUMNS = 3;
const IMAGE_SIZE = (width - GRID_SPACING * (GRID_COLUMNS + 1)) / GRID_COLUMNS;

// Types
interface InterestTag {
  id: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface SavedPost {
  id: string;
  imageUrl: string;
  author: string;
  authorAvatar: string;
  date: string;
  isBookmarked: boolean;
}

// Mock Data
const INTEREST_TAGS: InterestTag[] = [
  { id: "1", label: "Music", icon: "music" },
  { id: "2", label: "Technology", icon: "chip" },
  { id: "3", label: "Food & Dining", icon: "silverware-fork-knife" },
  { id: "4", label: "Travel", icon: "airplane" },
  { id: "5", label: "Fitness", icon: "dumbbell" },
];

const SAVED_POSTS: SavedPost[] = [
  {
    id: "1",
    imageUrl: "https://placeholder.svg?height=200&width=200&query=futuristic+city+skyline",
    author: "Sarah Johnson",
    authorAvatar: "https://placeholder.svg?height=40&width=40&query=woman+avatar",
    date: "Jun, 15",
    isBookmarked: true,
  },
  {
    id: "2",
    imageUrl: "https://placeholder.svg?height=200&width=200&query=statue+of+liberty+sunset",
    author: "Sarah Johnson",
    authorAvatar: "https://placeholder.svg?height=40&width=40&query=woman+avatar",
    date: "Jun, 15",
    isBookmarked: true,
  },
  {
    id: "3",
    imageUrl: "https://placeholder.svg?height=200&width=200&query=westminster+abbey",
    author: "Sarah Johnson",
    authorAvatar: "https://placeholder.svg?height=40&width=40&query=woman+avatar",
    date: "Jun, 15",
    isBookmarked: true,
  },
  {
    id: "4",
    imageUrl: "https://placeholder.svg?height=200&width=200&query=london+parliament+dusk",
    author: "Sarah Johnson",
    authorAvatar: "https://placeholder.svg?height=40&width=40&query=woman+avatar",
    date: "Jun, 15",
    isBookmarked: true,
  },
  {
    id: "5",
    imageUrl: "https://placeholder.svg?height=200&width=200&query=big+ben+sunset",
    author: "Sarah Johnson",
    authorAvatar: "https://placeholder.svg?height=40&width=40&query=woman+avatar",
    date: "Jun, 15",
    isBookmarked: true,
  },
  {
    id: "6",
    imageUrl: "https://placeholder.svg?height=200&width=200&query=toronto+skyline",
    author: "Sarah Johnson",
    authorAvatar: "https://placeholder.svg?height=40&width=40&query=woman+avatar",
    date: "Jun, 15",
    isBookmarked: true,
  },
];

// Reusable Components
const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background.default }]}>
      <TouchableOpacity style={styles.headerIcon}>
        <Ionicons name="menu" size={28} color={theme.colors.text.primary} />
      </TouchableOpacity>

      <ThemeText variant="h3" style={styles.headerTitle} color="#A684F5">
        Briteside
      </ThemeText>

      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="calendar-outline" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileCard: React.FC = () => {
  const theme = useTheme();

  return (
    <ThemeView
      style={[styles.profileCard, { backgroundColor: theme.colors.background.paper }]}
      elevation={1}
      rounded="md"
    >
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: "https://placeholder.svg?height=100&width=100&query=man+avatar+blue" }}
          style={styles.avatar}
        />

        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <ThemeText variant="h5" style={styles.name}>
              Alex Johnson
            </ThemeText>
            <MaterialCommunityIcons
              name="account-check"
              size={20}
              color={theme.colors.primary.main}
              style={styles.verifiedIcon}
            />
            <ThemeText variant="body2" color={theme.colors.text.secondary}>
              @alexj
            </ThemeText>
          </View>

          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: theme.colors.primary.main }]}
          >
            <Ionicons name="settings-outline" size={16} color="#fff" />
            <ThemeText variant="button_small" color="#fff" style={styles.editButtonText}>
              Edit Profile
            </ThemeText>
          </TouchableOpacity>
        </View>
      </View>

      <ThemeText variant="body2" color={theme.colors.text.secondary} style={styles.bio}>
        Event photographer and music lover. Always looking for the next great experience.
      </ThemeText>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={16} color={theme.colors.text.secondary} />
          <ThemeText variant="caption" color={theme.colors.text.secondary} style={styles.metaText}>
            New York
          </ThemeText>
        </View>

        <TouchableOpacity
          style={[styles.changeButton, { backgroundColor: theme.colors.primary.main }]}
        >
          <ThemeText variant="button_small" color="#fff">
            Change
          </ThemeText>
        </TouchableOpacity>

        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={16} color={theme.colors.text.secondary} />
          <ThemeText variant="caption" color={theme.colors.text.secondary} style={styles.metaText}>
            Joined May 2022
          </ThemeText>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ThemeText variant="subtitle3" fontWeight={700}>
            284
          </ThemeText>
          <ThemeText variant="body2" color={theme.colors.text.secondary} style={styles.statLabel}>
            Following
          </ThemeText>
        </View>

        <View style={styles.statItem}>
          <ThemeText variant="subtitle3" fontWeight={700}>
            1250
          </ThemeText>
          <ThemeText variant="body2" color={theme.colors.text.secondary} style={styles.statLabel}>
            Followers
          </ThemeText>
        </View>
      </View>

      <View style={styles.tagsContainer}>
        {INTEREST_TAGS.map((tag) => (
          <InterestTagChip key={tag.id} tag={tag} />
        ))}
      </View>
    </ThemeView>
  );
};

const InterestTagChip: React.FC<{ tag: InterestTag }> = ({ tag }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.tagChip,
        {
          backgroundColor: `${theme.colors.primary.main}20`,
          borderColor: theme.colors.primary.main,
        },
      ]}
    >
      <MaterialCommunityIcons name={tag.icon} size={14} color={theme.colors.primary.main} />
      <ThemeText variant="caption" color={theme.colors.primary.main} style={styles.tagText}>
        {tag.label}
      </ThemeText>
    </View>
  );
};

const TabNavigation: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const theme = useTheme();

  const tabs = [
    { id: "posts", label: "Posts", icon: "grid-outline" },
    { id: "calendar", label: "Calendar", icon: "calendar-outline" },
    { id: "likes", label: "Likes", icon: "heart-outline" },
    { id: "saved", label: "Saved", icon: "bookmark" },
  ];

  return (
    <View style={[styles.tabContainer, { backgroundColor: theme.colors.background.default }]}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <TouchableOpacity key={tab.id} style={styles.tab}>
            <Ionicons
              name={tab.icon as any}
              size={20}
              color={isActive ? theme.colors.text.primary : theme.colors.text.secondary}
            />
            <ThemeText
              variant="caption"
              color={isActive ? theme.colors.text.primary : theme.colors.text.secondary}
              fontWeight={isActive ? 600 : 400}
              style={styles.tabLabel}
            >
              {tab.label}
            </ThemeText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const SavedPostCard: React.FC<{ post: SavedPost }> = ({ post }) => {
  const theme = useTheme();

  return (
    <View style={styles.postCard}>
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />

      <View style={styles.postFooter}>
        <Image source={{ uri: post.authorAvatar }} style={styles.authorAvatar} />
        <ThemeText variant="caption1" color={theme.colors.text.primary} style={styles.authorName}>
          {post.author}
        </ThemeText>

        <View style={styles.postFooterRight}>
          <Ionicons name="time-outline" size={12} color={theme.colors.text.secondary} />
          <ThemeText variant="caption1" color={theme.colors.text.secondary} style={styles.postDate}>
            {post.date}
          </ThemeText>
          <Ionicons
            name={post.isBookmarked ? "bookmark" : "bookmark-outline"}
            size={14}
            color={theme.colors.primary.main}
          />
        </View>
      </View>
    </View>
  );
};

const BottomNavigation: React.FC = () => {
  const theme = useTheme();

  const navItems = [
    { id: "home", icon: "home-outline" },
    { id: "search", icon: "search-outline" },
    { id: "add", icon: "add-circle-outline" },
    { id: "messages", icon: "mail-outline" },
    { id: "profile", icon: "people-outline" },
  ];

  return (
    <View
      style={[
        styles.bottomNav,
        {
          backgroundColor: theme.colors.tab.background,
          borderTopColor: theme.colors.divider,
        },
      ]}
    >
      {navItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.navItem}>
          <Ionicons
            name={item.icon as any}
            size={item.id === "add" ? 32 : 24}
            color={item.id === "profile" ? "#fff" : theme.colors.text.secondary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Main Component
const SavedScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <SafeAreaScreen edges={["top"]} withBackground>
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard />

        <TabNavigation activeTab="saved" />

        <View style={styles.gridContainer}>
          {SAVED_POSTS.map((post) => (
            <SavedPostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaScreen>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerIcon: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  // Profile Card
  profileCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
  },
  profileHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    marginRight: 4,
  },
  verifiedIcon: {
    marginRight: 4,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    alignSelf: "flex-start",
  },
  editButtonText: {
    marginLeft: 4,
  },
  bio: {
    marginBottom: 12,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    marginLeft: 2,
  },
  changeButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statLabel: {
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  tagText: {
    marginLeft: 2,
  },
  // Tab Navigation
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    marginTop: 16,
  },
  tab: {
    alignItems: "center",
    gap: 4,
  },
  tabLabel: {
    marginTop: 4,
  },
  // Grid
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: GRID_SPACING,
    gap: GRID_SPACING,
  },
  postCard: {
    width: IMAGE_SIZE,
    marginBottom: GRID_SPACING,
  },
  postImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    marginBottom: 8,
  },
  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  authorAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  authorName: {
    flex: 1,
  },
  postFooterRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  postDate: {
    marginLeft: 2,
  },
  // Bottom Navigation
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  navItem: {
    padding: 8,
  },
});
