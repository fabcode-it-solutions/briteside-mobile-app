import React, { useMemo, useState } from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
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
  style?: ViewStyle;
  menuTitle?: string;
  disabled?: boolean;
}

export const SelectDrawer = <TFieldValues extends FieldValues, TValue = string>({
  control,
  name,
  rules,
  label,
  placeholder,
  options,
  style,
  menuTitle,
  disabled,
}: SelectProps<TFieldValues, TValue>) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selected = options.find((o) => o.value === value);
        return (
          <View style={[styles.wrapper, style]}>
            {label ? <ThemeText style={styles.label}>{label}</ThemeText> : null}

            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.8}
              disabled={disabled}
              onPress={() => setOpen(true)}
              style={[
                styles.input,
                error ? styles.inputError : undefined,
                disabled ? styles.inputDisabled : undefined,
              ]}
            >
              <ThemeText
                style={[styles.valueText, !selected && styles.placeholderText]}
                numberOfLines={1}
              >
                {selected ? selected.label : (placeholder ?? "Select")}
              </ThemeText>
              <Ionicons name="chevron-down" size={18} color={theme.colors.icon} />
            </TouchableOpacity>

            {error ? (
              <ThemeText style={styles.errorText}>{`${error.message ?? ""}`}</ThemeText>
            ) : null}

            <Modal
              visible={open}
              transparent
              animationType="fade"
              onRequestClose={() => setOpen(false)}
            >
              <TouchableOpacity
                style={styles.backdrop}
                activeOpacity={1}
                onPress={() => setOpen(false)}
              >
                <View style={styles.menu}>
                  {menuTitle ? <ThemeText style={styles.menuTitle}>{menuTitle}</ThemeText> : null}
                  <ScrollView>
                    {options.map((opt) => (
                      <TouchableOpacity
                        key={`${opt.label}-${String(opt.value)}`}
                        style={styles.option}
                        onPress={() => {
                          onChange(opt.value as any);
                          setOpen(false);
                        }}
                      >
                        <ThemeText
                          style={[
                            styles.optionText,
                            opt.value === value ? styles.optionTextSelected : undefined,
                          ]}
                        >
                          {opt.label}
                        </ThemeText>
                        {opt.value === value ? (
                          <Ionicons name="checkmark" size={18} color={theme.colors.primary.main} />
                        ) : null}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        );
      }}
    />
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: { width: "100%", marginBottom: 16 },
    label: { fontSize: 14, marginBottom: 8, color: theme.colors.text.primary, fontWeight: "500" },
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
    inputDisabled: { opacity: 0.6 },
    valueText: { fontSize: 14, color: theme.colors.text.primary },
    placeholderText: { color: theme.colors.text.hint },
    inputError: { borderColor: theme.colors.error.main },
    errorText: { color: theme.colors.error.main, fontSize: 12, marginTop: 4, marginLeft: 4 },
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.25)",
      justifyContent: "flex-end",
    },
    menu: {
      backgroundColor: theme.colors.background.paper ?? theme.colors.background.default,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 24,
      maxHeight: "60%",
    },
    menuTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
      color: theme.colors.text.primary,
    },
    option: {
      height: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.divider,
    },
    optionText: { fontSize: 16, color: theme.colors.text.primary },
    optionTextSelected: { color: theme.colors.primary.main, fontWeight: "600" as const },
  });

export default SelectDrawer;
