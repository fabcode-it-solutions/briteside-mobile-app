import React, { useMemo, useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  Modal,
  ScrollView,
  LayoutRectangle,
  Pressable,
} from "react-native";
import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme, type Theme } from "@/theme";
import { ThemeText } from "@/components/primitives";

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

interface SelectProps<TFieldValues extends FieldValues, TValue = string> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: SelectOption<TValue>[];

  // ✅ Dynamic styles
  style?: ViewStyle; // Wrapper
  inputStyle?: ViewStyle; // Input box
  dropdownStyle?: ViewStyle; // Dropdown container
  optionStyle?: ViewStyle; // Each option row
  labelStyle?: TextStyle;
  textStyle?: TextStyle; // Selected text
  placeholderStyle?: TextStyle;
  errorStyle?: TextStyle;
  optionTextStyle?: TextStyle;

  disabled?: boolean;
}

export const Select = <TFieldValues extends FieldValues, TValue = string>({
  control,
  name,
  rules,
  label,
  placeholder,
  options,
  style,
  inputStyle,
  dropdownStyle,
  optionStyle,
  labelStyle,
  textStyle,
  placeholderStyle,
  errorStyle,
  optionTextStyle,
  disabled,
}: SelectProps<TFieldValues, TValue>) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [open, setOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState<LayoutRectangle | null>(null);
  const buttonRef = useRef<TouchableOpacity>(null);

  const handleOpen = useCallback(() => {
    if (disabled) return;

    (buttonRef.current as any)?.measure(
      (_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
        setDropdownLayout({ x: pageX, y: pageY, width, height });
        setOpen(true);
      },
    );
  }, [disabled]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selected = options.find((o) => o.value === value);

        return (
          <View style={[styles.wrapper, style]}>
            {label ? <ThemeText style={[styles.label, labelStyle]}>{label}</ThemeText> : null}

            <TouchableOpacity
              ref={buttonRef}
              accessibilityRole="button"
              activeOpacity={0.8}
              disabled={disabled}
              onPress={handleOpen}
              style={[
                styles.input,
                inputStyle,
                error ? styles.inputError : undefined,
                disabled ? styles.inputDisabled : undefined,
              ]}
            >
              <ThemeText
                style={[
                  styles.valueText,
                  !selected && styles.placeholderText,
                  !selected && placeholderStyle,
                  textStyle,
                ]}
                numberOfLines={1}
              >
                {selected ? selected.label : (placeholder ?? "Select")}
              </ThemeText>

              <Ionicons
                name="chevron-down"
                size={14}
                style={{ marginRight: -2 }}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>

            {error ? (
              <ThemeText style={[styles.errorText, errorStyle]}>
                {`${error.message ?? ""}`}
              </ThemeText>
            ) : null}

            {/* Dropdown Modal */}
            {open && dropdownLayout && (
              <Modal visible={open} transparent animationType="fade" onRequestClose={handleClose}>
                <Pressable style={styles.modalOverlay} onPress={handleClose}>
                  <View
                    style={[
                      styles.dropdown,
                      dropdownStyle,
                      {
                        position: "absolute",
                        top: dropdownLayout.y + dropdownLayout.height - 16,
                        left: dropdownLayout.x,
                        width: dropdownLayout.width,
                        maxHeight: 250,
                      },
                    ]}
                  >
                    <ScrollView
                      bounces={false}
                      showsVerticalScrollIndicator={options.length > 5}
                      nestedScrollEnabled
                    >
                      {options.map((opt, index) => (
                        <TouchableOpacity
                          key={`${opt.label}-${String(opt.value)}`}
                          onPress={() => {
                            onChange(opt.value as any);
                            handleClose();
                          }}
                          style={[
                            styles.menuItem,
                            optionStyle,
                            index === 0 && styles.menuItemFirst,
                            index === options.length - 1 && styles.menuItemLast,
                            opt.value === value && styles.menuItemSelected,
                          ]}
                          activeOpacity={0.7}
                        >
                          <ThemeText
                            style={[
                              styles.menuItemText,
                              optionTextStyle,
                              opt.value === value && styles.menuItemTextSelected,
                            ]}
                          >
                            {opt.label}
                          </ThemeText>
                          {opt.value === value && (
                            <Ionicons
                              name="checkmark"
                              size={18}
                              color={theme.colors.primary.main}
                            />
                          )}
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </Pressable>
              </Modal>
            )}
          </View>
        );
      }}
    />
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      width: "100%",
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      marginBottom: 8,
      color: theme.colors.text.primary,
      fontWeight: "500",
    },
    input: {
      height: 60,
      borderWidth: 1,
      borderColor: theme.colors.divider,
      borderRadius: 10,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.inputBackground,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    inputDisabled: {
      opacity: 0.6,
    },
    valueText: {
      fontSize: 14,
      color: theme.colors.text.primary,
      flex: 1,
    },
    placeholderText: {
      color: theme.colors.text.hint,
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
    modalOverlay: {
      flex: 1,
    },
    dropdown: {
      backgroundColor: theme.colors.background.paper ?? theme.colors.background.default,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 14,
      minHeight: 48,
    },
    menuItemFirst: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    menuItemLast: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    menuItemSelected: {
      backgroundColor: theme.colors.primary.main + "10", // 10% opacity
    },
    menuItemText: {
      fontSize: 14,
      color: theme.colors.text.primary,
      flex: 1,
      marginRight: 8,
    },
    menuItemTextSelected: {
      color: theme.colors.primary.main,
      fontWeight: "600",
    },
  });

export default Select;
