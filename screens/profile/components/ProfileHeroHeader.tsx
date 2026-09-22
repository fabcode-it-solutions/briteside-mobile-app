import React from "react";
import { Animated, StyleSheet } from "react-native";
import { router } from "expo-router";

import { SvgIcon } from "@/components/SvgIcon";
import { EventDetailsHero } from "@/screens/events/details/components";
import { useTheme } from "@/theme";

type ProfileHeroHeaderProps = {
  scrollY: Animated.Value;
  headerScrollDistance: number;
  headerHeight: number;
};

const ProfileHeroHeader: React.FC<ProfileHeroHeaderProps> = ({
  scrollY,
  headerScrollDistance,
  headerHeight,
}) => {
  const theme = useTheme();

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
    inputRange: [0, headerScrollDistance],
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
      imageUri="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1920"
      onBack={router.back}
      imageScale={imageScale}
      imageTranslateY={imageTranslateY}
      overlayOpacity={heroOverlayOpacity}
      topRowTranslateY={topRowTranslateY}
      backButtonStyle={[styles.heroBackButton, theme.shadows[2]]}
      backIcon={<SvgIcon name="arrow-left" size={18} stroke={theme.colors.primary.contrast} />}
      topActions={[
        {
          key: "calendar",
          icon: "calendar",
          backgroundColor: "rgba(255,255,255,0.18)",
          stroke: "#fff",
        },
        {
          key: "bell",
          icon: "bell",
          backgroundColor: "rgba(255,255,255,0.18)",
          stroke: "#fff",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  heroBackButton: {
    backgroundColor: "#1F8E5F",
  },
});

export default ProfileHeroHeader;
