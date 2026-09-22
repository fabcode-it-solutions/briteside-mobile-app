import React, { useCallback, useMemo, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  type NativeSyntheticEvent,
  type TextInputChangeEventData,
} from "react-native";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import { SvgIcon } from "@/components/SvgIcon";

type GroupDiscussionComposerProps = {
  placeholder: string;
  avatarUri: string;
  postButtonLabel: string;
};

export const GroupDiscussionComposer: React.FC<GroupDiscussionComposerProps> = ({
  placeholder,
  avatarUri,
  postButtonLabel,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState("");

  const placeholderColor = useMemo(() => theme.colors.text.disabled, [theme.colors.text.disabled]);

  const handleChangeText = useCallback((text: string) => {
    setValue(text);
  }, []);

  const handleChange = useCallback((event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(event.nativeEvent.text);
  }, []);

  const handlePost = useCallback(() => {
    if (!value.trim()) return;
    console.log("Posting message:", value.trim());
    setValue("");
  }, [value]);

  const canPost = value.trim().length > 0;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.paper,
          borderColor: theme.colors.border,
        },
        theme.shadows?.[0],
      ]}
    >
      <View style={styles.row}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <View style={styles.inputWrapper}>
          <TextInput
            value={value}
            onChangeText={handleChangeText}
            onChange={handleChange}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            multiline
            numberOfLines={3}
            style={[
              styles.input,
              {
                color: theme.colors.text.primary,
              },
            ]}
            textAlignVertical="top"
          />
        </View>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.attachmentButton} activeOpacity={0.75}>
          <SvgIcon name="attach" size={12} stroke={theme.colors.text.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.postButton,
            {
              backgroundColor: canPost ? theme.colors.primary.main : theme.colors.gray[200],
            },
          ]}
          activeOpacity={0.8}
          disabled={!canPost}
          onPress={handlePost}
        >
          <SvgIcon
            name="send"
            size={12}
            stroke={canPost ? "#fff" : theme.colors.text.disabled}
            style={styles.postIcon}
          />
          <ThemeText
            variant="overline"
            color={canPost ? "#fff" : theme.colors.text.disabled}
            fontWeight={700}
          >
            {postButtonLabel}
          </ThemeText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 21,
  },
  inputWrapper: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "rgba(250,250,250,0.9)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 10,
    lineHeight: 12,
    padding: 0,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 26,
  },
  attachmentButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  postButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    gap: 6,
  },
  postIcon: {
    marginRight: -2,
  },
});
