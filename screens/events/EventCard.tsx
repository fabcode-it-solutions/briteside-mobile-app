import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/theme";
import { SvgIcon } from "@/components/SvgIcon";

export type EventCardProps = {
  imageUri: string;
  title: string;
  dateTime: string;
  location: string;
  price: string;
  attendees: number;
};

export default function EventCard({
  imageUri,
  title,
  dateTime,
  location,
  price,
  attendees,
}: EventCardProps) {
  const theme = useTheme();
  return (
    <View
      style={[styles.card, { backgroundColor: theme.colors.background.paper, shadowColor: "#000" }]}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
        <View style={styles.row}>
          <SvgIcon name="simple-calendar" size={12} stroke={theme.colors.text.disabled} />
          <Text style={[styles.meta, { color: theme.colors.text.secondary }]}>{dateTime}</Text>
        </View>
        <View style={[styles.row, { marginTop: 6 }]}>
          <SvgIcon name="location" size={12} stroke={theme.colors.text.disabled} />
          <Text style={[styles.meta, { color: theme.colors.text.secondary }]}>{location}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.price, { color: theme.colors.text.primary }]}>{price}</Text>
          <View style={styles.footerRight}>
            <SvgIcon name="people" size={12} stroke={theme.colors.text.disabled} />
            <Text style={[styles.attendees, { color: theme.colors.text.secondary }]}>
              {attendees}
            </Text>
            <SvgIcon
              name="heart"
              size={12}
              stroke={theme.colors.text.disabled}
              style={{ marginLeft: 10 }}
            />
            <SvgIcon
              name="share"
              size={12}
              stroke={theme.colors.text.disabled}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowColor: "rgba(0,0,0,0.2)",
    elevation: 2,
  },
  image: { width: "100%", height: 450 },
  body: { padding: 16 },
  title: { fontSize: 16, fontWeight: "500", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  meta: { fontSize: 12 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },
  price: { fontSize: 16, fontWeight: "500" },
  footerRight: { flexDirection: "row", alignItems: "center" },
  attendees: { marginLeft: 6, fontSize: 12 },
});
