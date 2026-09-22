import { ThemeView } from "@/components/primitives";
import { useColors, useTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput } from "react-native";
import { useTranslation } from "react-i18next";

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: any;
};

const SeachBar = ({ value, onChangeText, placeholder, style }: Props = {}) => {
  const colors = useColors();
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const ph = placeholder ?? t("search.machinesPlaceholder");

  return (
    <ThemeView
      style={{
        backgroundColor: colors.background.paper,
        borderRadius: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: theme.spacing.md,
        flexDirection: "row",
        alignItems: "center",
        ...(style || {}),
      }}
    >
      <Feather
        name="search"
        size={20}
        color={colors.text.secondary}
        style={{ marginRight: theme.spacing.sm }}
      />
      <TextInput
        style={{
          flex: 1,
          fontSize: 14,
          color: colors.text.primary,
          fontFamily: "Inter-Regular",
          paddingVertical: 0,
          height: 40,
        }}
        placeholder={ph}
        placeholderTextColor={colors.text.secondary}
        value={value !== undefined ? value : searchText}
        onChangeText={(t) => {
          if (onChangeText) onChangeText(t);
          else setSearchText(t);
        }}
      />
    </ThemeView>
  );
};

export default SeachBar;
