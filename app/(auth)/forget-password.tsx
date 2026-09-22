import { ThemeText } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/TextInput/input";
import { useAlert } from "@/provider/AlertProvider";
import { useTheme } from "@/theme";
import { AlertPresets } from "@/utils/alert";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextStyle, ViewStyle } from "react-native";
import AuthScreenLayout from "@/components/shared/layout/AuthScreenLayout";

interface ForgetPasswordForm {
  email: string;
}

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const alert = useAlert();
  const router = useRouter();
  const { forgotPassword, isLoading } = useAuthStore();

  const { control, handleSubmit } = useForm<ForgetPasswordForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordForm) => {
    try {
      await forgotPassword(data.email);
      router.push({
        pathname: "/(auth)/password-reset",
        params: { email: data.email },
      });
    } catch (err) {
      console.error("Forgot password failed", err);
      alert.show(
        AlertPresets.error(
          "Request Failed",
          err instanceof Error ? err.message : "An error occurred",
        ),
      );
    }
  };

  const dynamicStyles: {
    title: TextStyle;
    subtitle: TextStyle;
    input: ViewStyle;
    button: ViewStyle;
  } = {
    title: {
      fontSize: 32,
      lineHeight: 36,
      fontWeight: "bold",
      color: theme.colors.text.primary,
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      marginBottom: 32,
    },
    input: {
      marginBottom: 24,
    },
    button: {
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
  };

  return (
    <AuthScreenLayout onBack={() => router.back()} headerBottomSpacing={32}>
      <ThemeText style={dynamicStyles.title}>
        {t("auth.forgetpassword.title", { defaultValue: "Forgot Password" })}
      </ThemeText>
      <ThemeText style={dynamicStyles.subtitle}>
        {t("auth.forgetpassword.subtitle", {
          defaultValue: "Please enter your email to reset the password",
        })}
      </ThemeText>

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
        placeholder={t("auth.forgetpassword.email")}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        style={dynamicStyles.input}
        onSubmitEditing={handleSubmit(onSubmit)}
        returnKeyType="send"
        autoComplete="email"
        textContentType="emailAddress"
      />

      <Button
        title={t("auth.forgetpassword.button", { defaultValue: "Reset Password" })}
        onPress={handleSubmit(onSubmit)}
        style={dynamicStyles.button}
        rightIcon={null}
        loading={isLoading}
        disabled={isLoading}
      />
    </AuthScreenLayout>
  );
}
