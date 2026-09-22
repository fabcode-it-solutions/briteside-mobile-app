import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { ThemeText, ThemeView } from "@/components/primitives";
import { useColors } from "@/theme";
import { Images } from "@/assets";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import dayjs from "dayjs";

export interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangeFilterProps {
  value: DateRange;
  onChange: (next: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
}

function formatDateLabel(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${day}/${m}/${y}`;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  style,
}) => {
  const colors = useColors();
  const defaultStyles = useDefaultStyles();
  const [visible, setVisible] = useState(false);
  const [draftRange, setDraftRange] = useState<DateRange>(value);

  const open = () => {
    setDraftRange(value);
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };

  const label = `${formatDateLabel(value.start)} – ${formatDateLabel(value.end)}`;

  // Custom styles for the date picker
  const customStyles = {
    ...defaultStyles,
    selected: {
      backgroundColor: colors.primary.main,
      borderRadius: 8,
    },
    selected_label: {
      color: colors.text.inverse,
      fontWeight: "600" as const,
    },
    day: {
      ...defaultStyles.day,
      borderRadius: 8,
    },
    day_button: {
      ...defaultStyles.day_button,
      borderRadius: 8,
    },
    inRange: {
      backgroundColor: colors.primary.light,
    },
    rangeStart: {
      backgroundColor: colors.primary.main,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    rangeEnd: {
      backgroundColor: colors.primary.main,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
  };

  const apply = () => {
    const start = draftRange.start <= draftRange.end ? draftRange.start : draftRange.end;
    const end = draftRange.end >= draftRange.start ? draftRange.end : draftRange.start;
    onChange({ start, end });
    close();
  };

  return (
    <View style={[styles.row, style]}>
      <ThemeView
        style={[
          styles.chip,
          { borderColor: colors.border, backgroundColor: colors.background.elevated },
        ]}
        rounded="md"
      >
        <TouchableOpacity onPress={open}>
          <View style={styles.chipInner}>
            <Image source={Images.calendarc_icon} style={styles.image} />
            <ThemeText variant="body2" fontWeight={600}>
              {label}
            </ThemeText>
          </View>
        </TouchableOpacity>
      </ThemeView>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
        <TouchableWithoutFeedback onPress={close}>
          <View style={[styles.modalOverlay, { backgroundColor: colors.backdrop }]}>
            <TouchableWithoutFeedback>
              <View style={[styles.calendarSheet, { backgroundColor: colors.background.elevated }]}>
                <DateTimePicker
                  mode="range"
                  startDate={dayjs(draftRange.start)}
                  endDate={dayjs(draftRange.end)}
                  minDate={minDate ? dayjs(minDate) : undefined}
                  maxDate={maxDate ? dayjs(maxDate) : undefined}
                  onChange={({ startDate, endDate }) => {
                    setDraftRange({
                      start: startDate ? dayjs(startDate).toDate() : draftRange.start,
                      end: endDate ? dayjs(endDate).toDate() : draftRange.end,
                    });
                  }}
                  styles={customStyles}
                  // Optional: If you want to customize header colors
                  headerTextStyle={{ color: colors.text.primary }}
                  headerButtonColor={colors.primary.main}
                  weekDaysTextStyle={{ color: colors.text.secondary }}
                  calendarTextStyle={{ color: colors.text.primary }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 8,
                    gap: 12,
                  }}
                >
                  <TouchableOpacity onPress={close}>
                    <ThemeText variant="body2">Cancel</ThemeText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={apply}>
                    <ThemeText variant="body2" fontWeight={600}>
                      Apply
                    </ThemeText>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default DateRangeFilter;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  chip: {
    borderWidth: 1,
  },
  chipInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 999,
  },
  image: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  calendarSheet: {
    borderRadius: 12,
    padding: 12,
    width: "100%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});
