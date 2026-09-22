import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemeButton, ThemeText } from "@/components";
import { SvgIcon } from "@/components/SvgIcon";
import { useTheme } from "@/theme";
import type { EventDetail } from "@/screens/events/types";

type EventLocationSectionProps = {
  location: EventDetail["location"];
  onLoadMap?: () => void;
  onDirectionsPress?: () => void;
};

export const EventLocationSection: React.FC<EventLocationSectionProps> = ({
  location,
  onLoadMap,
  onDirectionsPress,
}) => {
  const theme = useTheme();
  const [mapSearch, setMapSearch] = React.useState("");

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.background.paper,
        },
      ]}
    >
      <ThemeText variant="caption2" style={[styles.heading, { color: theme.colors.text.primary }]}>
        Event Location
      </ThemeText>

      <View style={styles.addressRow}>
        <View style={[styles.iconWrapper]}>
          <SvgIcon name="location" size={12} stroke={theme.colors.primary.main} />
        </View>
        <View style={styles.addressInfo}>
          <ThemeText variant="overline" style={{ color: theme.colors.text.primary }}>
            {location.venue}
          </ThemeText>
          <ThemeText variant="meta2" style={{ color: theme.colors.text.secondary }}>
            {location.address}
          </ThemeText>
        </View>
      </View>

      <View style={[styles.mapBox, { backgroundColor: theme.colors.gray[100] }]}>
        <ThemeText variant="meta2" style={[styles.mapHint, { color: theme.colors.text.secondary }]}>
          {location.mapHint} Get one at mapbox.com
        </ThemeText>
        <View style={styles.mapInputRow}>
          <TextInput
            value={mapSearch}
            onChangeText={setMapSearch}
            placeholder={location.mapPlaceholder}
            placeholderTextColor={theme.colors.text.disabled}
            style={[
              styles.mapInput,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background.default,
                color: theme.colors.text.primary,
              },
            ]}
            selectionColor={theme.colors.primary.main}
            returnKeyType="search"
          />
          <ThemeButton
            variant="filled"
            color="primary"
            size="sm"
            title="Load Map"
            style={styles.mapButton}
            textStyle={styles.mapButtonText}
            onPress={onLoadMap}
          />
        </View>
      </View>

      <ThemeButton
        variant="filled"
        color="primary"
        size="lg"
        title={location.directionsCta}
        fullWidth
        style={styles.directionsButton}
        textStyle={styles.directionsButtonText}
        onPress={onDirectionsPress}
        leftIcon={<SvgIcon name="direction" size={12} stroke={theme.colors.white} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    gap: 18,
  },
  heading: {
    fontWeight: "600",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconWrapper: {
    // alignItems: "flex-end",
    // justifyContent: "flex-start",
  },
  addressInfo: {
    flex: 1,
    gap: 4,
  },
  mapBox: {
    borderRadius: 5,
    padding: 16,
    gap: 14,
  },
  mapHint: {
    fontSize: 10,
  },
  mapInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mapInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "white",
    fontSize: 10,
  },
  mapButton: {
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  mapButtonText: {
    fontSize: 10,
    fontWeight: "600",
  },
  directionsButton: {
    borderRadius: 5,
    paddingVertical: 2,
  },
  directionsButtonText: {
    fontSize: 10,
    fontWeight: "500",
  },
});
