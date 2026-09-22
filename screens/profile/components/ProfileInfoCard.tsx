import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { SvgIcon, type SvgIconName } from "@/components/SvgIcon";
import { ThemeButton, ThemeText, ThemeView } from "@/components";
import { useTheme } from "@/theme";

type ProfileInfoCardProps = {
  profile: {
    name: string;
    username: string;
    bio: string;
    avatarUri: string;
    location: string;
    joinDate: string;
  };
  stats: Array<{ label: string; value: string }>;
  interests: Array<{ label: string; icon: SvgIconName }>;
  onEditProfile?: () => void;
  onChangeLocation?: () => void;
};

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  profile,
  stats,
  interests,
  onEditProfile,
  onChangeLocation,
}) => {
  const theme = useTheme();

  return (
    <ThemeView
      backgroundColor={theme.colors.background.paper}
      style={styles.cardContainer}
      padded="lg"
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.avatarRing,
            {
              borderColor: theme.colors.primary.main,
              backgroundColor: theme.colors.primary.light,
            },
          ]}
        >
          <Image source={{ uri: profile.avatarUri }} style={styles.avatar} />
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameButtonRow}>
            <View style={styles.nameColumn}>
              <View style={styles.nameRow}>
                <ThemeText variant="h7" style={styles.nameText}>
                  {profile.name}
                </ThemeText>
                <SvgIcon name="verified" size={16} stroke={theme.colors.primary.main} />
                <ThemeText variant="caption1" color={theme.colors.text.secondary}>
                  @{profile.username}
                </ThemeText>
              </View>
            </View>

            <ThemeButton
              title="Edit Profile"
              size="sm"
              color="primary"
              leftIcon={<SvgIcon name="settings" size={12} stroke="#fff" />}
              style={styles.editButton}
              textStyle={styles.editButtonText}
              onPress={onEditProfile}
            />
          </View>

          <ThemeText variant="tagStyle" color={theme.colors.text.secondary} style={styles.bio}>
            {profile.bio}
          </ThemeText>

          <View style={styles.metaRow}>
            <MetaItem icon="location" label={profile.location} />

            <Pressable
              style={[styles.changeButton, { backgroundColor: theme.colors.primary.main }]}
              accessibilityRole="button"
              accessibilityLabel="Change location"
              onPress={onChangeLocation}
            >
              <ThemeText variant="tagStyle500" color={theme.colors.primary.contrast}>
                Change
              </ThemeText>
            </Pressable>

            <MetaItem icon="simple-calendar" label={`Joined ${profile.joinDate}`} />
          </View>

          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <StatBlock key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </View>

          <View style={styles.interestsContainer}>
            {interests.map((interest) => (
              <View
                key={interest.label}
                style={[
                  styles.interestPill,
                  {
                    backgroundColor: theme.colors.primary.main,
                  },
                ]}
              >
                <SvgIcon
                  name={interest.icon}
                  size={6}
                  stroke={theme.colors.primary.contrast}
                  style={styles.interestIcon}
                />
                <ThemeText
                  variant="tagStyle"
                  style={styles.interestLabel}
                  color={theme.colors.primary.contrast}
                >
                  {interest.label}
                </ThemeText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ThemeView>
  );
};

const MetaItem = ({ icon, label }: { icon: SvgIconName; label: string }) => {
  const theme = useTheme();

  return (
    <View style={styles.metaItem}>
      <SvgIcon name={icon} size={12} stroke={theme.colors.text.secondary} />
      <ThemeText variant="tagStyle500" color={theme.colors.text.secondary}>
        {label}
      </ThemeText>
    </View>
  );
};

const StatBlock = ({ value, label }: { value: string; label: string }) => {
  const theme = useTheme();

  return (
    <View style={styles.statBlock}>
      <ThemeText variant="tagStyle700" color={theme.colors.text.primary}>
        {value}
      </ThemeText>
      <ThemeText variant="tagStyle500" color={theme.colors.text.secondary}>
        {label}
      </ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 8,
  },
  topRow: {
    flexDirection: "row",
  },
  avatarRing: {
    width: 66,
    height: 66,
    borderRadius: 999,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 18,
  },
  nameButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  nameColumn: {
    flexShrink: 1,
    paddingRight: 12,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  nameText: {
    marginRight: 4,
  },
  editButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 8,
    lineHeight: 14,
  },
  bio: {
    maxWidth: 180,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 10,
    marginTop: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  changeButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "flex-start",
    gap: 24,
  },
  statBlock: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 9,
    gap: 0,
  },
  interestPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 5,
    marginBottom: 10,
  },
  interestIcon: {
    marginRight: 4,
  },
  interestLabel: {
    fontSize: 6,
  },
});

export default ProfileInfoCard;
