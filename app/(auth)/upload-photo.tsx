import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, Alert, Platform } from "react-native";
import { ThemeText, ThemeView } from "@/components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/theme";
import { useTranslation } from "react-i18next";
import AuthScreenLayout from "@/components/shared/layout/AuthScreenLayout";
import { SvgIcon } from "@/components/SvgIcon";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { uploadImageToS3 } from "@/services/api/upload";

export default function UploadPhotoScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const styles = makeStyles(theme);

  // Request camera permissions
  const requestCameraPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          t("auth.uploadPhoto.permissionRequired", { defaultValue: "Permission Required" }),
          t("auth.uploadPhoto.cameraPermissionMessage", {
            defaultValue: "Sorry, we need camera permissions to take photos!",
          }),
        );
        return false;
      }
    }
    return true;
  };

  // Request media library permissions
  const requestMediaLibraryPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          t("auth.uploadPhoto.permissionRequired", { defaultValue: "Permission Required" }),
          t("auth.uploadPhoto.libraryPermissionMessage", {
            defaultValue: "Sorry, we need photo library permissions to select photos!",
          }),
        );
        return false;
      }
    }
    return true;
  };

  // Take a photo using camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Pick an image from library
  const pickImageFromLibrary = async () => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Upload the selected image
  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert(
        t("auth.uploadPhoto.noImageSelected", { defaultValue: "No Image Selected" }),
        t("auth.uploadPhoto.selectImageFirst", {
          defaultValue: "Please select an image first before uploading.",
        }),
      );
      return;
    }

    setIsUploading(true);
    try {
      await uploadImageToS3({ uri: selectedImage, folder: "profile-photos" });
      router.push("/");
    } catch (e) {
      Alert.alert(
        t("auth.uploadPhoto.uploadFailed", { defaultValue: "Upload Failed" }),
        e instanceof Error
          ? e.message
          : t("auth.uploadPhoto.uploadError", {
              defaultValue: "Failed to upload the image. Please try again.",
            }),
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Handle skip action
  const handleSkip = () => {
    // Navigate to the next screen without uploading a photo
    router.push("/");
  };

  return (
    <AuthScreenLayout headerBottomSpacing={32}>
      <ThemeView style={styles.container}>
        <ThemeText style={styles.title}>
          {t("auth.uploadPhoto.title", { defaultValue: "Let’s Put a Face to the Name" })}
        </ThemeText>
        <ThemeText style={styles.subtitle}>
          {t("auth.uploadPhoto.subtitle", {
            defaultValue:
              "Choose a profile pic that shows the real you, whether you’re on big night out, or a night very much in.",
          })}
        </ThemeText>

        <TouchableOpacity style={styles.photoPlaceholder} onPress={pickImageFromLibrary}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <SvgIcon name="camera" size={72} color="none" stroke={theme.colors.primary.main} />
          )}
          {selectedImage && (
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <Ionicons name="close-circle" size={32} color={theme.colors.primary.main} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        {!selectedImage ? (
          <>
            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={takePhoto}
              disabled={isUploading}
            >
              <ThemeText style={styles.takePhotoText}>
                {t("auth.uploadPhoto.takePhoto", { defaultValue: "Take a Photo" })}
              </ThemeText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.libraryButton}
              onPress={pickImageFromLibrary}
              disabled={isUploading}
            >
              <ThemeText style={styles.libraryText}>
                {t("auth.uploadPhoto.addFromLibrary", { defaultValue: "Add from Library" })}
              </ThemeText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={StyleSheet.flatten([
                styles.libraryButton,
                isUploading && styles.disabledButton,
                { marginBottom: 16 },
              ])}
              onPress={handleUpload}
              disabled={isUploading}
            >
              <ThemeText style={styles.libraryText}>
                {isUploading
                  ? t("auth.uploadPhoto.uploading", { defaultValue: "Uploading..." })
                  : t("auth.uploadPhoto.continue", { defaultValue: "Continue" })}
              </ThemeText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={pickImageFromLibrary}
              disabled={isUploading}
            >
              <ThemeText style={styles.takePhotoText}>
                {t("auth.uploadPhoto.changePhoto", { defaultValue: "Choose Different Photo" })}
              </ThemeText>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip} disabled={isUploading}>
          <ThemeText style={styles.skipText}>
            {t("auth.uploadPhoto.skip", { defaultValue: "Skip for now" })}
          </ThemeText>
        </TouchableOpacity>
      </ThemeView>
    </AuthScreenLayout>
  );
}

const makeStyles = (theme: ReturnType<typeof useTheme>) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingBottom: 24,
      maxWidth: 500,
      alignSelf: "center",
      width: "100%",
    },
    backButton: {
      // No longer used — kept for reference only
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    subtitle: {
      marginTop: 12,
      fontSize: 16,
      color: theme.colors.text.secondary,
      marginBottom: 24,
    },
    photoPlaceholder: {
      height: 320,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: theme.colors.primary.main,
      backgroundColor: theme.colors.primary.main + "20", // subtle tint
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
      width: "80%",
      marginHorizontal: "auto",
      overflow: "hidden",
      position: "relative",
    },
    selectedImage: {
      width: "100%",
      height: "100%",
      borderRadius: 24,
    },
    changePhotoButton: {
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor:
        typeof theme.colors.background === "string"
          ? theme.colors.background
          : theme.colors.background.default,
      borderRadius: 16,
      padding: 2,
    },
    takePhotoButton: {
      height: 64,
      borderRadius: 32,
      borderWidth: 1,
      borderColor: theme.colors.primary.main,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    takePhotoText: {
      color: theme.colors.primary.main,
      fontSize: 18,
      fontWeight: "600",
    },
    libraryButton: {
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.colors.primary.main,
      alignItems: "center",
      justifyContent: "center",
      // shadowColor: theme.colors.primary.main,
      // shadowOffset: { width: 0, height: 4 },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      // elevation: 5,
      overflow: "hidden",
    },
    libraryText: {
      color: theme.colors.white,
      fontSize: 18,
      fontWeight: "600",
    },
    skipButton: {
      marginTop: 24,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    skipText: {
      color: theme.colors.text.secondary,
      fontSize: 16,
      fontWeight: "500",
    },
    disabledButton: {
      opacity: 0.6,
    },
  });
  return styles as any;
};
