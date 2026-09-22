import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle, TextStyle, Image } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useTheme } from "@/theme";
import { useAuthStore } from "@/stores/authStore";
import { ThemeText, ThemeView, ThemeButton } from "@/components";
import { Input } from "@/components/ui/TextInput/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAlert } from "@/provider/AlertProvider";
import { AlertPresets } from "@/utils/alert";
import { Images } from "@/assets";
import {
  startNextAuthOAuth,
  startGoogleNativeAndExchange,
  startAppleNativeAndExchange,
} from "@/services/api/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthScreenLayout from "@/components/shared/layout/AuthScreenLayout";

interface LoginFormData {
  email: string;
  password: string;
}

function LoginScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const alert = useAlert();
  const { login, isLoading } = useAuthStore();
  const { control, handleSubmit, setFocus } = useForm<LoginFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      router.replace("/(tabs)");
    } catch (err) {
      console.error("Login failed", err);
      alert.show(
        AlertPresets.error(
          "Login Failed",
          err instanceof Error ? err.message : "An error occurred",
        ),
      );
    }
  };

  const navigateToSignUp = () => {
    router.push("/(auth)/signup");
  };

  const navigateToForgetPassword = () => {
    router.push("/(auth)/forget-password");
  };

  const handleBack = () => {
    router.back();
  };

  const handleGoogleLogin = async () => {
    try {
      // Try native Google sign-in + exchange first; fallback to browser-based NextAuth
      try {
        await startGoogleNativeAndExchange();
      } catch {
        await startNextAuthOAuth("google");
      }
      router.replace("/(tabs)");
    } catch (err) {
      alert.show(
        AlertPresets.error(
          "Login Failed",
          err instanceof Error ? err.message : "An error occurred",
        ),
      );
    }
  };

  const dynamicStyles: {
    subtitle: TextStyle;
    forgotPasswordText: TextStyle;
    signInButton: ViewStyle;
    signUpLinkText: TextStyle;
    dividerContainer: ViewStyle;
    dividerLine: ViewStyle;
    dividerText: TextStyle;
    googleButton: ViewStyle;
    googleButtonText: TextStyle;
  } = {
    subtitle: {
      fontSize: 17,
      lineHeight: 26,
      fontWeight: "400" as const,
      color: theme.colors.text.disabled,
      marginBottom: 16,
    },
    forgotPasswordText: {
      color: theme.colors.text.secondary,
      fontSize: 14,
    },
    signInButton: {
      backgroundColor: theme.colors.primary.main,
      height: 64,
      borderRadius: 32,
      justifyContent: "center",
      alignItems: "center",
      // Lighter perpendicular shadow for iOS
      shadowColor: theme.colors.primary.main,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      // Lighter perpendicular shadow for Android
      elevation: 3,
    },
    signUpLinkText: {
      color: theme.colors.primary.main,
      fontSize: 16,
      fontWeight: "600" as const,
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 24,
      paddingHorizontal: 48,
    },
    dividerLine: {
      height: 1,
      backgroundColor: theme.colors.divider,
      flex: 1,
    },
    dividerText: {
      marginHorizontal: 16,
      color: theme.colors.text.secondary,
      fontSize: 16,
    },
    googleButton: {
      backgroundColor: theme.colors.white,
      height: 64,
      borderRadius: 32,
      justifyContent: "center",
      alignItems: "center",
      // Subtle perpendicular shadow for iOS
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      // Subtle perpendicular shadow for Android
      elevation: 2,
      borderColor: theme.colors.border,
    },
    googleButtonText: {
      color: theme.colors.text.primary,
    },
  };

  return (
    <AuthScreenLayout onBack={handleBack}>
      <ThemeView style={styles.buttom}>
        <ThemeText variant="h2" style={styles.title}>
          {t("auth.login.title")}
        </ThemeText>
        <ThemeView style={styles.formContainer}>
          <Input
            control={control}
            name="email"
            rules={{
              required: t("errors.validation.email.required"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("errors.validation.email.invalid"),
              },
            }}
            placeholder={t("auth.login.email")}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            style={styles.input}
            onSubmitEditing={() => setFocus("password")}
            returnKeyType="next"
            autoComplete="email"
            textContentType="emailAddress"
          />
          <Input
            control={control}
            name="password"
            rules={{
              required: t("errors.validation.password.required"),
              minLength: {
                value: 8,
                message: t("errors.validation.password.minLength"),
              },
            }}
            placeholder={t("auth.login.password")}
            secureTextEntry
            style={styles.input}
            onSubmitEditing={handleSubmit(onSubmit)}
            returnKeyType="go"
            autoComplete="current-password"
            textContentType="password"
          />
          <ThemeView style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={navigateToForgetPassword}>
              <ThemeText style={dynamicStyles.forgotPasswordText}>
                {t("auth.login.forgotPassword")}
              </ThemeText>
            </TouchableOpacity>
          </ThemeView>

          <Button
            title={t("auth.login.button")}
            onPress={handleSubmit(onSubmit)}
            style={dynamicStyles.signInButton}
            rightIcon={null}
            loading={isLoading}
            disabled={isLoading}
          />
        </ThemeView>

        {/* Divider */}
        <ThemeView style={dynamicStyles.dividerContainer}>
          <ThemeView style={dynamicStyles.dividerLine} />
          <ThemeText style={dynamicStyles.dividerText}>Or</ThemeText>
          <ThemeView style={dynamicStyles.dividerLine} />
        </ThemeView>

        {/* Google Login */}
        <ThemeButton
          title={t("auth.login.loginWithGoogle", { defaultValue: "Login with Google" })}
          onPress={handleGoogleLogin}
          variant="filled"
          style={dynamicStyles.googleButton}
          textStyle={dynamicStyles.googleButtonText}
          leftIcon={
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={Images.google_icon}
            />
          }
        />

        {/* Apple Login */}
        <ThemeButton
          title={t("auth.login.loginWithApple", { defaultValue: "Login with Apple" })}
          onPress={async () => {
            try {
              try {
                await startAppleNativeAndExchange();
              } catch {
                await startNextAuthOAuth("apple");
              }
              router.replace("/(tabs)");
            } catch (err) {
              alert.show(
                AlertPresets.error(
                  "Login Failed",
                  err instanceof Error ? err.message : "An error occurred",
                ),
              );
            }
          }}
          variant="filled"
          style={[dynamicStyles.googleButton, { marginTop: 12 }]}
          textStyle={dynamicStyles.googleButtonText}
          leftIcon={<Ionicons name="logo-apple" size={24} color={theme.colors.text.primary} />}
        />

        {/* Bottom sign up */}
        <ThemeView style={styles.signUpContainer}>
          <ThemeText style={styles.signUpText}>{t("auth.login.noAccount")} </ThemeText>
          <TouchableOpacity onPress={navigateToSignUp}>
            <ThemeText style={dynamicStyles.signUpLinkText}>{t("auth.login.signUp")}</ThemeText>
          </TouchableOpacity>
        </ThemeView>
      </ThemeView>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
  },
  logoContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 8,
  },
  formContainer: {
    marginTop: 30,
  },
  input: {
    marginBottom: 16,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  buttom: {
    marginTop: 40,
  },
  signUpText: {
    fontSize: 16,
  },
});

export default LoginScreen;
