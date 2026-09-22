import React from "react";
import { StyleSheet, ViewStyle, TextStyle, View, ImageBackground } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/theme";
import { ThemeButton, ThemeText, SafeAreaScreen } from "@/components";
import { useTranslation } from "react-i18next";
import { Images } from "@/assets";

function AuthStart() {
  const theme = useTheme();
  const { t } = useTranslation();

  const handleCreateAccount = () => {
    router.push("/(auth)/signup");
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  const dynamicStyles: {
    container: ViewStyle;
    bottomOverlay: ViewStyle;
    spacer: ViewStyle;
    ctaCreate: ViewStyle;
    ctaCreateText: TextStyle;
    memberText: TextStyle;
    ctaLogin: ViewStyle;
    ctaLoginText: TextStyle;
  } = {
    container: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "stretch",
    },
    bottomOverlay: {
      width: "100%",
      paddingHorizontal: 24,
      paddingBottom: 24,
      marginBottom: 130,
      gap: 16,
    },
    spacer: { height: 8 },
    ctaCreate: {
      backgroundColor: theme.colors.white,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
    ctaCreateText: {
      color: theme.colors.text.primary,
      fontSize: 16,
      fontWeight: "500" as const,
    },
    memberText: {
      textAlign: "center",
      color: "rgba(255,255,255,0.9)",
      fontSize: 16,
    },
    ctaLogin: {
      backgroundColor: theme.colors.primary.main,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.colors.primary.main,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    ctaLoginText: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: "500" as const,
    },
  };

  return (
    <ImageBackground
      source={Images.authStart} // 👈 replace with your background image
      style={{ flex: 1 }}
      resizeMode="cover"
      blurRadius={0}
      imageStyle={{ opacity: 1 }}
    >
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0,0,0,0.5)", // adjust opacity as needed
        }}
      />
      <SafeAreaScreen withBackground={false} style={[styles.container, dynamicStyles.container]}>
        <View style={dynamicStyles.bottomOverlay}>
          <ThemeButton
            title={t("auth.authStart.createAccount", { defaultValue: "Create New Account" })}
            onPress={handleCreateAccount}
            style={dynamicStyles.ctaCreate}
            textStyle={dynamicStyles.ctaCreateText}
          />

          <ThemeText style={dynamicStyles.memberText}>
            {t("auth.authStart.alreadyMember", { defaultValue: "Already a member?" })}
          </ThemeText>

          <ThemeButton
            title={t("auth.authStart.login", { defaultValue: "Login" })}
            onPress={handleLogin}
            style={dynamicStyles.ctaLogin}
            textStyle={dynamicStyles.ctaLoginText}
          />
        </View>
      </SafeAreaScreen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

export default AuthStart;
