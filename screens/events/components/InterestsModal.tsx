import React, { memo } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ThemeText } from "@/components";
import { SvgIcon } from "@/components/SvgIcon";
import { useTheme } from "@/theme";
import { INTEREST_OPTIONS } from "../mockData";

type InterestsModalProps = {
  visible: boolean;
  selected: string[];
  onClose: () => void;
  onToggle: (id: string) => void;
  onSave: () => void;
};

const InterestsModal = memo(
  ({ visible, selected, onClose, onToggle, onSave }: InterestsModalProps) => {
    const theme = useTheme();

    return (
      <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
        <View style={styles.overlay}>
          <BlurView intensity={45} tint="dark" style={StyleSheet.absoluteFill} />
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
          <View
            style={[
              styles.card,
              { backgroundColor: theme.colors.background.paper, borderColor: theme.colors.border },
              theme.shadows?.[4],
            ]}
          >
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <SvgIcon name="heart" size={24} stroke={theme.colors.primary.main} />
                <ThemeText style={[styles.title, { color: theme.colors.text.primary }]}>
                  Your Interests
                </ThemeText>
              </View>
              <TouchableOpacity
                onPress={onClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.closeButton}
                activeOpacity={0.8}
              >
                <Ionicons name="close" size={20} color={theme.colors.text.secondary} />
              </TouchableOpacity>
              <ThemeText style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                Select topics you're interested in to see more relevant content
              </ThemeText>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.grid}>
                {INTEREST_OPTIONS.map((option) => {
                  const active = selected.includes(option.id);
                  return (
                    <TouchableOpacity
                      key={option.id}
                      activeOpacity={0.9}
                      onPress={() => onToggle(option.id)}
                      style={[
                        styles.tile,
                        {
                          backgroundColor: option.background,
                          borderColor: active ? option.accent : "transparent",
                        },
                        active && styles.tileActive,
                      ]}
                    >
                      <View
                        style={[
                          styles.tileIndicator,
                          {
                            borderColor: active ? option.accent : option.iconBackground,
                            backgroundColor: active ? option.accent : option.iconBackground,
                          },
                        ]}
                      >
                        {active && <Ionicons name="checkmark" size={8} color="#fff" />}
                      </View>
                      <View style={styles.tileIconWrapper}>
                        <SvgIcon name={option.icon} size={16} stroke={option.accent} />
                      </View>
                      <ThemeText style={[styles.tileLabel, { color: theme.colors.text.primary }]}>
                        {option.label}
                      </ThemeText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.cancelButton, { borderColor: theme.colors.border }]}
                onPress={onClose}
              >
                <ThemeText
                  style={[styles.cancelText, { color: theme.colors.text.secondary }]}
                >
                  Cancel
                </ThemeText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.saveButton, { backgroundColor: theme.colors.primary.main }]}
                onPress={onSave}
              >
                <ThemeText style={styles.saveText} color="#fff">
                  Save Preferences
                </ThemeText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

InterestsModal.displayName = "InterestsModal";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
  },
  header: {
    marginBottom: 18,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700" as const,
  },
  subtitle: {
    fontSize: 10,
    lineHeight: 18,
    marginTop: 6,
  },
  closeButton: {
    position: "absolute",
    width: 28,
    height: 28,
    top: -4,
    right: -8,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 4,
  },
  tile: {
    width: "32%",
    minWidth: 96,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    position: "relative",
  },
  tileActive: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  tileIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  tileIconWrapper: {
    borderRadius: 12,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 6,
  },
  tileLabel: {
    fontSize: 10,
    fontWeight: "600" as const,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 12,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 10,
    fontWeight: "600" as const,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 4,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    fontSize: 10,
    fontWeight: "700" as const,
  },
});

export default InterestsModal;
