import React from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgIcon } from "@/components/SvgIcon";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type IconButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const IconButton: React.FC<IconButtonProps> = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[styles.iconButton, style]}>
      {children}
    </TouchableOpacity>
  );
};

type GroupDetailsHeroProps = {
  imageUri: string;
  onBack: () => void;
  heroSlidesLabel?: string;
  onCalendarPress?: () => void;
  onBellPress?: () => void;
  imageScale?: Animated.AnimatedInterpolation<number> | Animated.Value | number;
  imageTranslateY?: Animated.AnimatedInterpolation<number> | Animated.Value | number;
  overlayOpacity?: Animated.AnimatedInterpolation<number> | Animated.Value | number;
  topRowTranslateY?: Animated.AnimatedInterpolation<number> | Animated.Value | number;
};

export const GroupDetailsHero: React.FC<GroupDetailsHeroProps> = ({
  imageUri,
  onBack,
  heroSlidesLabel,
  onCalendarPress,
  onBellPress,
  imageScale = 1,
  imageTranslateY = 0,
  overlayOpacity = 0,
  topRowTranslateY = 0,
}) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <AnimatedImageBackground
        source={{ uri: imageUri }}
        resizeMode="cover"
        style={[
          StyleSheet.absoluteFillObject,
          styles.image,
          {
            transform: [{ scale: imageScale }, { translateY: imageTranslateY }],
          },
        ]}
      />
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFillObject, styles.dimOverlay, { opacity: overlayOpacity }]}
      />
      <AnimatedLinearGradient
        pointerEvents="none"
        colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.18)", "rgba(0,0,0,0.75)"]}
        locations={[0, 0.45, 1]}
        style={[
          StyleSheet.absoluteFillObject,
          styles.gradientOverlay,
          { paddingTop: top + 16, opacity: overlayOpacity },
        ]}
      />
      <View
        style={[StyleSheet.absoluteFillObject, styles.gradientOverlay, { paddingTop: top + 16 }]}
      >
        <Animated.View
          style={[
            styles.topRow,
            {
              transform: [{ translateY: topRowTranslateY }],
            },
          ]}
        >
          <IconButton
            onPress={onBack}
            style={[
              styles.controlButton,
              {
                backgroundColor: theme.colors.primary.main,
              },
            ]}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </IconButton>
          <View style={styles.topActions}>
            <IconButton
              onPress={onCalendarPress}
              style={[
                styles.controlButton,
                {
                  backgroundColor: "rgba(255,255,255,0.92)",
                  borderColor: "rgba(255,255,255,0.6)",
                  borderWidth: StyleSheet.hairlineWidth,
                },
              ]}
            >
              <SvgIcon name="calendar" size={22} stroke={theme.colors.text.primary} />
            </IconButton>
            <IconButton
              onPress={onBellPress}
              style={[
                styles.controlButton,
                {
                  backgroundColor: "rgba(255,255,255,0.92)",
                  borderColor: "rgba(255,255,255,0.6)",
                  borderWidth: StyleSheet.hairlineWidth,
                },
              ]}
            >
              <SvgIcon name="bell" size={22} stroke={theme.colors.text.primary} />
            </IconButton>
          </View>
        </Animated.View>

        {heroSlidesLabel && (
          <View style={styles.bottomRow}>
            <View style={styles.slideIndicator}>
              <ThemeText variant="caption2" color="#FFFFFF">
                {heroSlidesLabel}
              </ThemeText>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  controlButton: {
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  slideIndicator: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  dimOverlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
  },
});
