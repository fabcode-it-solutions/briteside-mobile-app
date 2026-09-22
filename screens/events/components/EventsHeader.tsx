import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SvgIcon } from "@/components/SvgIcon";
import { Images } from "@/assets";
import { useTheme } from "@/theme";

const EventsHeader = memo(() => {
  const theme = useTheme();

  return (
    <View style={styles.header}>
      <SvgIcon name="menu" size={24} color={theme.colors.text.primary} />
      <Image source={Images.logo} style={styles.logo} />
      <View style={styles.headerRight}>
        <SvgIcon color="white" name="calendar" size={24} stroke={theme.colors.text.primary} />
        <SvgIcon
          name="bell"
          size={24}
          color="white"
          stroke={theme.colors.text.primary}
          style={styles.bellIcon}
        />
      </View>
    </View>
  );
});

EventsHeader.displayName = "EventsHeader";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 10,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 110,
    height: 40,
    resizeMode: "contain",
  },
  bellIcon: {
    marginLeft: 18,
  },
});

export default EventsHeader;
