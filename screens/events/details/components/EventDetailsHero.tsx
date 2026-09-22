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
import { useTheme } from "@/theme";
import type { SvgIconName } from "@/components/SvgIcon";

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

export type EventDetailsHeroAction = {
  key: string;
  icon: SvgIconName;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  stroke?: string;
  iconSize?: number;
};

type EventDetailsHeroProps = {
  imageUri: string;
  onBack: () => void;
  onCalendarPress?: () => void;
  onBellPress?: () => void;
  backIcon?: React.ReactNode;
  backButtonStyle?: StyleProp<ViewStyle>;
  topRowOpacity?: Animated.AnimatedInterpolation<number> | Animated.Value | number;
  topActions?: EventDetailsHeroAction[];
  imageScale?: Animated.AnimatedInterpolation<number> | Animated.Value | number;
  imageTranslateY?: Animated.AnimatedInterpolation<number> | Animated.Value | number;
  overlayOpacity?: Animated.AnimatedInterpolation<number> | Animated.Value | number;
  topRowTranslateY?: Animated.AnimatedInterpolation<number> | Animated.Value | number;
};

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const EventDetailsHero: React.FC<EventDetailsHeroProps> = ({
  imageUri,
  onBack,
  onCalendarPress,
  onBellPress,
  backIcon,
  backButtonStyle,
  topRowOpacity = 1,
  topActions,
  imageScale = 1,
  imageTranslateY = 0,
  overlayOpacity = 0,
  topRowTranslateY = 0,
}) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  const resolvedActions: EventDetailsHeroAction[] = topActions ?? [
    {
      key: "calendar",
      icon: "calendar",
      onPress: onCalendarPress,
    },
    {
      key: "bell",
      icon: "bell",
      onPress: onBellPress,
    },
  ];

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
        style={[StyleSheet.absoluteFillObject, styles.darkOverlay, { opacity: overlayOpacity }]}
      />
      <AnimatedLinearGradient
        pointerEvents="none"
        colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.12)", "rgba(0,0,0,0.65)"]}
        locations={[0, 0.4, 1]}
        style={[
          StyleSheet.absoluteFillObject,
          styles.gradientOverlay,
          { paddingTop: top + 16, opacity: overlayOpacity },
        ]}
      />
      <View
        style={[
          StyleSheet.absoluteFillObject,
          styles.gradientOverlay,
          {
            paddingTop: top + 16,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.topRow,
            {
              transform: [{ translateY: topRowTranslateY }],
              opacity: topRowOpacity,
            },
          ]}
        >
          <IconButton
            onPress={onBack}
            style={[
              styles.controlButton,
              { backgroundColor: "rgba(255,255,255,0.95)" },
              backButtonStyle,
            ]}
          >
            {backIcon ?? (
              <Ionicons name="chevron-back" size={20} color={theme.colors.text.primary} />
            )}
          </IconButton>
          {resolvedActions.length > 0 ? (
            <View style={styles.topActions}>
              {resolvedActions.map((action) => (
                <IconButton
                  key={action.key}
                  onPress={action.onPress}
                  style={[
                    styles.controlButton,
                    {
                      backgroundColor: action.backgroundColor ?? "rgba(255,255,255,0.92)",
                    },
                  ]}
                >
                  <SvgIcon
                    name={action.icon}
                    size={action.iconSize ?? 20}
                    color="transparent"
                    stroke={action.stroke ?? theme.colors.text.primary}
                  />
                </IconButton>
              ))}
            </View>
          ) : (
            <View style={styles.topActions} />
          )}
        </Animated.View>
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
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  controlButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)",
  },
  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  darkOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
