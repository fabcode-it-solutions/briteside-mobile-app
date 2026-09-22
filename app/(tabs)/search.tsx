import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaScreen, ThemeText, ThemeView } from "@/components";
import { useTheme, useColors } from "@/theme";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  avatar: string;
  time: string;
  likes: number;
  replies: number;
  tag: string;
  tagColor: string;
  description: string;
}

const GroupsScreen: React.FC = () => {
  const theme = useTheme();
  const colors = useColors();
  const [activeTab, setActiveTab] = useState<"discover" | "discussions" | "myGroups">("discover");
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [discussionContent, setDiscussionContent] = useState("");
  const [searchText, setSearchText] = useState("");
  const [locationText, setLocationText] = useState("");

  // Mock data for categories
  const categories: Category[] = [
    { id: "1", name: "Music", image: "https://via.placeholder.com/80" },
    { id: "2", name: "Food & Drink", image: "https://via.placeholder.com/80" },
    { id: "3", name: "Art", image: "https://via.placeholder.com/80" },
    { id: "4", name: "Technology", image: "https://via.placeholder.com/80" },
    { id: "5", name: "Sports", image: "https://via.placeholder.com/80" },
    { id: "6", name: "Community", image: "https://via.placeholder.com/80" },
  ];

  // Mock data for discussions
  const discussions: Discussion[] = [
    {
      id: "1",
      title: "Best spots for golden hour photography?",
      author: "Sarah Chen",
      avatar: "https://via.placeholder.com/40",
      time: "2 hours ago",
      likes: 12,
      replies: 5,
      tag: "NYC Photography Enthusiasts",
      tagColor: "#E5D4FF",
      description:
        "Hey everyone! I'm planning a golden hour shoot this weekend. Any recommendations for scenic spots with great lighting? Looking for something accessible by subway.",
    },
    {
      id: "2",
      title: "React 18 Features Discussion",
      author: "Mike Rodriguez",
      avatar: "https://via.placeholder.com/40",
      time: "4 hours ago",
      likes: 8,
      replies: 12,
      tag: "Tech Meetup Brooklyn",
      tagColor: "#D4E5FF",
      description:
        "What are your thoughts on the new concurrent features in React 18? I've been experimenting with Suspense and it's pretty amazing. Anyone else building production apps with it?",
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="menu" size={28} color={colors.text.primary} />
      </TouchableOpacity>

      <ThemeText variant="h4" color={colors.primary.main} style={styles.logo}>
        Briteside
      </ThemeText>

      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="calendar-outline" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchSection = () => (
    <View style={styles.searchSection}>
      <ThemeText variant="h2" style={styles.pageTitle}>
        Groups
      </ThemeText>

      <View style={styles.searchRow}>
        <View style={[styles.searchInput, { backgroundColor: colors.background.paper }]}>
          <Ionicons name="search" size={20} color={colors.text.secondary} />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search groups by name or interest..."
            placeholderTextColor={colors.text.secondary}
            style={[styles.inputText, { color: colors.text.primary }]}
          />
        </View>

        <View style={[styles.locationInput, { backgroundColor: colors.background.paper }]}>
          <Ionicons name="location-outline" size={20} color={colors.text.secondary} />
          <TextInput
            value={locationText}
            onChangeText={setLocationText}
            placeholder="Enter location or ZIP code..."
            placeholderTextColor={colors.text.secondary}
            style={[styles.inputText, { color: colors.text.primary }]}
          />
        </View>

        <TouchableOpacity style={[styles.searchButton, { backgroundColor: colors.primary.main }]}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
          <ThemeText variant="button" color="#FFFFFF" style={styles.searchButtonText}>
            Search
          </ThemeText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategories = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
      contentContainerStyle={styles.categoriesContent}
    >
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={styles.categoryItem}>
          <View style={[styles.categoryImage, { backgroundColor: colors.gray[200] }]}>
            <Image source={{ uri: category.image }} style={styles.categoryImageContent} />
          </View>
          <ThemeText variant="caption" style={styles.categoryName}>
            {category.name}
          </ThemeText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab("discover")}>
        <Feather name="compass" size={20} color={colors.text.secondary} />
        <ThemeText
          variant="body2"
          color={activeTab === "discover" ? colors.primary.main : colors.text.secondary}
          style={styles.tabText}
        >
          Discover
        </ThemeText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, styles.activeTab]}
        onPress={() => setActiveTab("discussions")}
      >
        <MaterialCommunityIcons name="message-text-outline" size={20} color={colors.text.primary} />
        <ThemeText
          variant="body2"
          color={activeTab === "discussions" ? colors.text.primary : colors.text.secondary}
          fontWeight={600}
          style={styles.tabText}
        >
          Discussions
        </ThemeText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab("myGroups")}>
        <Ionicons name="people-outline" size={20} color={colors.text.secondary} />
        <ThemeText
          variant="body2"
          color={activeTab === "myGroups" ? colors.primary.main : colors.text.secondary}
          style={styles.tabText}
        >
          My Groups
        </ThemeText>
      </TouchableOpacity>
    </View>
  );

  const renderStartDiscussion = () => (
    <View style={[styles.startDiscussionContainer, { backgroundColor: colors.background.paper }]}>
      <View style={styles.discussionHeader}>
        <MaterialCommunityIcons name="message-edit-outline" size={20} color={colors.text.primary} />
        <ThemeText variant="subtitle3" fontWeight={600} style={styles.discussionHeaderText}>
          Start Discussions
        </ThemeText>
      </View>

      <TextInput
        value={discussionTitle}
        onChangeText={setDiscussionTitle}
        placeholder="Discussion title..."
        placeholderTextColor={colors.text.secondary}
        style={[
          styles.discussionTitleInput,
          {
            color: colors.text.primary,
            borderBottomColor: colors.divider,
          },
        ]}
      />

      <TextInput
        value={discussionContent}
        onChangeText={setDiscussionContent}
        placeholder="What would you like to discuss?"
        placeholderTextColor={colors.text.secondary}
        multiline
        style={[styles.discussionContentInput, { color: colors.text.primary }]}
      />

      <TouchableOpacity style={[styles.postButton, { backgroundColor: colors.primary.main }]}>
        <Feather name="send" size={18} color="#FFFFFF" />
        <ThemeText variant="button" color="#FFFFFF" style={styles.postButtonText}>
          Post Discussion
        </ThemeText>
      </TouchableOpacity>
    </View>
  );

  const renderDiscussions = () => (
    <View style={styles.discussionsContainer}>
      <View style={styles.discussionsHeader}>
        <ThemeText variant="h6" fontWeight={600}>
          Recent Discussions
        </ThemeText>
        <ThemeText variant="caption" color={colors.text.secondary}>
          {discussions.length} Discussions
        </ThemeText>
      </View>

      {discussions.map((discussion) => (
        <TouchableOpacity
          key={discussion.id}
          style={[styles.discussionItem, { backgroundColor: colors.background.paper }]}
        >
          <Image source={{ uri: discussion.avatar }} style={styles.discussionAvatar} />

          <View style={styles.discussionContent}>
            <View style={styles.discussionMeta}>
              <ThemeText variant="subtitle4" fontWeight={600} numberOfLines={1}>
                {discussion.title}
              </ThemeText>
              <View style={[styles.discussionTag, { backgroundColor: discussion.tagColor }]}>
                <ThemeText variant="caption2" color={colors.text.primary}>
                  {discussion.tag}
                </ThemeText>
              </View>
            </View>

            <ThemeText variant="body2" color={colors.text.secondary} numberOfLines={2}>
              {discussion.description}
            </ThemeText>

            <View style={styles.discussionFooter}>
              <ThemeText variant="caption" color={colors.text.secondary}>
                {discussion.author}
              </ThemeText>
              <ThemeText variant="caption" color={colors.text.secondary} style={styles.dot}>
                •
              </ThemeText>
              <ThemeText variant="caption" color={colors.text.secondary}>
                {discussion.time}
              </ThemeText>

              <View style={styles.discussionStats}>
                <TouchableOpacity style={styles.statItem}>
                  <Ionicons name="thumbs-up-outline" size={16} color={colors.text.secondary} />
                  <ThemeText variant="caption" color={colors.text.secondary}>
                    {discussion.likes}
                  </ThemeText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.statItem}>
                  <MaterialCommunityIcons
                    name="message-reply-text-outline"
                    size={16}
                    color={colors.text.secondary}
                  />
                  <ThemeText variant="caption" color={colors.text.secondary}>
                    {discussion.replies} replies
                  </ThemeText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBottomTabs = () => (
    <View style={[styles.bottomTabs, { backgroundColor: colors.primary.main }]}>
      <TouchableOpacity style={styles.bottomTab}>
        <ThemeText variant="button" color="#FFFFFF">
          Events
        </ThemeText>
      </TouchableOpacity>
      <View style={[styles.bottomTabActive, { backgroundColor: colors.white }]}>
        <ThemeText variant="button" color={colors.primary.main}>
          Groups
        </ThemeText>
      </View>
    </View>
  );

  const renderBottomNav = () => (
    <View style={[styles.bottomNav, { backgroundColor: colors.black }]}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home-outline" size={24} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="search-outline" size={24} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="add-outline" size={28} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="mail-outline" size={24} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <MaterialCommunityIcons name="link-variant" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaScreen edges={["top"]} style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSearchSection()}
        {renderCategories()}
        {renderTabs()}
        {activeTab === "discussions" && (
          <>
            {renderStartDiscussion()}
            {renderDiscussions()}
          </>
        )}
      </ScrollView>
      {renderBottomTabs()}
      {renderBottomNav()}
    </SafeAreaScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuButton: {
    padding: 4,
  },
  logo: {
    fontWeight: "700",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 4,
    marginLeft: 16,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  pageTitle: {
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
  },
  searchInput: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  locationInput: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  searchButtonText: {
    fontWeight: "600",
  },
  categoriesContainer: {
    paddingVertical: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginBottom: 8,
  },
  categoryImageContent: {
    width: "100%",
    height: "100%",
  },
  categoryName: {
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 24,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#A684F5",
    paddingBottom: 2,
  },
  tabText: {
    marginLeft: 4,
  },
  startDiscussionContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  discussionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  discussionHeaderText: {
    marginLeft: 8,
  },
  discussionTitleInput: {
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
  },
  discussionContentInput: {
    fontSize: 14,
    minHeight: 60,
    marginBottom: 16,
  },
  postButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  postButtonText: {
    fontWeight: "600",
  },
  discussionsContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
  },
  discussionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  discussionItem: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  discussionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  discussionContent: {
    flex: 1,
  },
  discussionMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  discussionTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  discussionFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  dot: {
    marginHorizontal: 6,
  },
  discussionStats: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bottomTabs: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 12,
    justifyContent: "center",
    gap: 8,
  },
  bottomTab: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  bottomTabActive: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navItem: {
    padding: 4,
  },
});

export default GroupsScreen;
