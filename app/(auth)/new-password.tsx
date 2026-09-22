import React from "react";
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { useTheme } from "@/theme";
import { useAuthStore } from "@/stores/authStore";
import { ThemeText, ThemeView } from "@/components";
import { Input } from "@/components/ui/TextInput/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAlert } from "@/provider/AlertProvider";
import { AlertPresets } from "@/utils/alert";
import AuthScreenLayout from "@/components/shared/layout/AuthScreenLayout";

interface LoginFormData {
  password: string;
  confirmpassword: string;
}

function NewPasswordScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const alert = useAlert();
  const { resetPassword, isLoading } = useAuthStore();
  const { token, email, otp } = useLocalSearchParams<{ token?: string; email?: string; otp?: string }>();
  const { control, handleSubmit, getValues, setFocus } = useForm<LoginFormData>({
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (token) {
        await resetPassword({ token, password: data.password });
      } else if (email && otp) {
        await resetPassword({ email, otp, password: data.password });
      } else {
        throw new Error("Missing verification details (token or email+otp)");
      }
      alert.show(AlertPresets.success("Password Reset", "Your password has been updated."));
      router.replace("/(auth)/login");
    } catch (err) {
      console.error("Login failed", err);
      alert.show(
        AlertPresets.error(
          "Reset Failed",
          err instanceof Error ? err.message : "An error occurred",
        ),
      );
    }
  };

  const handleBack = () => router.back();

  const dynamicStyles: {
    logoCircle: ViewStyle;
    logoHeart: ViewStyle;
    subtitle: TextStyle;
    inputError: ViewStyle;
    errorText: TextStyle;
    forgotPasswordText: TextStyle;
    signInButton: ViewStyle;
    signInButtonText: TextStyle;
    signUpLinkText: TextStyle;
  } = {
    logoCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary.main,
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
    },
    logoHeart: {
      width: 30,
      height: 30,
      backgroundColor: theme.colors.primary.light,
      borderRadius: 15,
    },
    subtitle: {
      fontSize: 17,
      lineHeight: 26,
      fontWeight: "400" as const,
      color: theme.colors.text.disabled,
      marginBottom: 0,
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: 12,
      marginTop: 4,
    },
    forgotPasswordText: {
      color: theme.colors.primary.main,
      fontSize: 14,
    },
    signInButton: {
      backgroundColor: theme.colors.primary.main,
      height: 64,
      borderRadius: 32,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.colors.primary.main,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: 8,
    },
    signInButtonText: {
      color: theme.colors.white,
      fontSize: 18,
      fontWeight: "600" as const,
    },
    signUpLinkText: {
      color: theme.colors.primary.main,
      fontSize: 16,
      fontWeight: "600" as const,
    },
  };

  return (
    <AuthScreenLayout onBack={handleBack} headerBottomSpacing={32}>
      <ThemeView style={styles.buttom}>
        <ThemeText variant="h2" style={styles.title}>
          {t("auth.newpassword.title", { defaultValue: "Reset Password" })}
        </ThemeText>
        <ThemeText style={dynamicStyles.subtitle}>
          {t("auth.newpassword.subtitle", { defaultValue: "Create a new password" })}
        </ThemeText>
      </ThemeView>

      <ThemeView style={styles.formContainer}>
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
          placeholder={t("auth.newpassword.password", {
            defaultValue: "Enter your new password",
          })}
          secureTextEntry
          style={styles.input}
          onSubmitEditing={() => setFocus("confirmpassword")}
          returnKeyType="next"
          autoComplete="new-password"
          textContentType="newPassword"
        />

        <Input
          control={control}
          name="confirmpassword"
          rules={{
            required: t("errors.validation.confirmPassword.required"),
            validate: (value: string) => {
              const password = getValues("password");
              return value === password || t("errors.validation.confirmPassword.mismatch");
            },
          }}
          placeholder={t("auth.newpassword.confirmPassword", {
            defaultValue: "Confirm password",
          })}
          secureTextEntry
          // icon={<SvgIcon name="key-renter" size={24} color={theme.colors.primary.main} />}
          style={styles.input}
          onSubmitEditing={handleSubmit(onSubmit)}
          returnKeyType="go"
          autoComplete="new-password"
          textContentType="newPassword"
        />

        <Button
          title={t("auth.newpassword.button")}
          onPress={handleSubmit(onSubmit)}
          style={dynamicStyles.signInButton}
          rightIcon={null}
          loading={isLoading}
          disabled={isLoading}
        />
      </ThemeView>

      {/* Bottom helper text removed to match mockup */}
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
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
  buttom: {
    marginTop: 0,
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
  signUpText: {
    fontSize: 16,
  },
});

export default NewPasswordScreen;
