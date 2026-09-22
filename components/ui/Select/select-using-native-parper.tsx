import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme, type Theme } from "@/theme";
import { ThemeText } from "@/components/primitives";
import { Menu } from "react-native-paper";

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
  disabled?: boolean;
}

export const SelectNativePaper = <TFieldValues extends FieldValues, TValue = string>({
  control,
  name,
  rules,
  label,
  placeholder,
  options,
  style,
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

            <Menu
              visible={open}
              onDismiss={() => setOpen(false)}
              anchor={
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
                  <Ionicons
                    name="chevron-down"
                    size={14}
                    style={{ marginRight: -2 }}
                    color={theme.colors.text.secondary}
                  />
                </TouchableOpacity>
              }
              anchorPosition="bottom"
              contentStyle={{
                backgroundColor: theme.colors.background.paper ?? theme.colors.background.default,
              }}
            >
              {options.map((opt) => (
                <Menu.Item
                  key={`${opt.label}-${String(opt.value)}`}
                  onPress={() => {
                    onChange(opt.value as any);
                    setOpen(false);
                  }}
                  title={opt.label}
                  titleStyle={{
                    color:
                      opt.value === value ? theme.colors.primary.main : theme.colors.text.primary,
                    fontWeight: opt.value === value ? "600" : "400",
                  }}
                  leadingIcon={
                    opt.value === value
                      ? (props) => (
                          <Ionicons name="checkmark" size={18} color={theme.colors.primary.main} />
                        )
                      : undefined
                  }
                />
              ))}
            </Menu>

            {error ? (
              <ThemeText style={styles.errorText}>{`${error.message ?? ""}`}</ThemeText>
            ) : null}
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
    // dropdown rendered by react-native-paper Menu
  });

export default SelectNativePaper;
