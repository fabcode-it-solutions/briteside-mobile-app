import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useTheme } from "@/theme";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "@/components/SvgIcon";

export default function TabLayout() {
  const theme = useTheme();
  const { t } = useTranslation();

  const bg = theme.colors.tab.background;
  const activeColor = theme.colors.tab.text.primary;
  const inactiveColor = theme.colors.tab.text.secondary;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // 👈 hide labels
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        // tabBarBackground: TabBarBackground,
        tabBarItemStyle: {
          paddingVertical: Platform.OS === "ios" ? 6 : 8,
        },
        tabBarIconStyle: {
          marginBottom: Platform.OS === "ios" ? -2 : 0, // align icons visually
        },
        tabBarStyle: {
          // position: "absolute",
          left: 16,
          right: 16,
          bottom: Platform.OS === "ios" ? 0 : 0,
          height: 64,
          borderRadius: 0,
          backgroundColor: bg,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 10,
          paddingBottom: Platform.OS === "ios" ? 10 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("navigation.tabs.dashboard"),
          tabBarIcon: ({ color, focused }) => (
            <SvgIcon name="home" stroke={color} size={focused ? 26 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t("navigation.tabs.machine"),
          tabBarIcon: ({ color, focused }) => (
            <SvgIcon name="search" stroke={color} size={focused ? 26 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: t("navigation.tabs.products"),
          tabBarIcon: ({ color, focused }) => (
            <SvgIcon name="add" stroke={color} size={focused ? 28 : 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: t("navigation.tabs.billing"),
          tabBarIcon: ({ color, focused }) => (
            <SvgIcon name="envelope" stroke={color} size={focused ? 26 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("navigation.tabs.billing"),
          tabBarIcon: ({ color, focused }) => (
            <SvgIcon name="profile" stroke={color} size={focused ? 26 : 22} />
          ),
        }}
      />
    </Tabs>
  );
}
