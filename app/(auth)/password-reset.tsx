import { ThemeText } from "@/components";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextInput, View, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import { useAlert } from "@/provider/AlertProvider";
import { AlertPresets } from "@/utils/alert";
import AuthScreenLayout from "@/components/shared/layout/AuthScreenLayout";

export default function PasswordReset() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const theme = useTheme();
  const { t } = useTranslation();
  const CODE_LENGTH = 6;
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>("");
  const { verifyResetCode, isLoading } = useAuthStore();
  const alert = useAlert();

  const handleCodeChange = (text: string, index: number) => {
    const sanitized = text.replace(/\D/g, "");
    if (sanitized.length > 1) return;

    const newCode = [...code];
    newCode[index] = sanitized;
    setCode(newCode);

    if (error) setError(null); // Clear error on input change

    // Move to next input if value is entered
    if (sanitized && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input if backspace is pressed
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async () => {
    if (code.some((digit) => digit === "")) {
      setError("Please enter all digits of the code.");
      return;
    }
    try {
      const joined = code.join("");
      await verifyResetCode({ email, code: joined });
      router.push({ pathname: "/(auth)/new-password", params: { email, otp: joined } });
    } catch (err) {
      console.error("Verify code failed", err);
      alert.show(
        AlertPresets.error(
          "Invalid Code",
          err instanceof Error ? err.message : "An error occurred",
        ),
      );
    }
  };

  const handleResendOtp = async () => {
    try {
      // Reuse forgotPassword to resend code
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { forgotPassword } = useAuthStore.getState();
      await forgotPassword(email);
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert.show(
        AlertPresets.error(
          "Resend Failed",
          error instanceof Error ? error.message : "An error occurred",
        ),
      );
    }
  };

  const dynamicStyles: {
    title: import("react-native").TextStyle;
    subtitle: import("react-native").TextStyle;
    codeContainer: import("react-native").ViewStyle;
    codeInput: import("react-native").TextStyle;
    codeInputFocused: import("react-native").ViewStyle;
    button: import("react-native").ViewStyle;
    errorText: import("react-native").TextStyle;
    resendContainer: import("react-native").ViewStyle;
    resendText: import("react-native").TextStyle;
    resendLink: import("react-native").TextStyle;
  } = {
    title: {
      fontSize: 32,
      lineHeight: 36,
      fontWeight: "bold",
      color: theme.colors.text.primary,
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      marginBottom: 32,
    },
    codeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 32,
    },
    codeInput: {
      width: 55,
      height: 55,
      fontWeight: "700" as const,
      backgroundColor: theme.colors.background.default,
      borderRadius: 10,
      fontSize: 24,
      textAlign: "center",
      color: theme.colors.text.primary,
      borderWidth: 1,
      borderColor: theme.colors.divider,
    },
    codeInputFocused: {
      borderColor: theme.colors.primary.main,
      shadowColor: theme.colors.primary.main,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 3,
    },
    button: {
      width: "100%",
      height: 64,
      backgroundColor: theme.colors.primary.main,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
      shadowColor: theme.colors.primary.main,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: 14,
      marginTop: -16,
      marginBottom: 8,
      textAlign: "center",
    },
    resendContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 0,
    },
    resendText: {
      color: theme.colors.text.secondary,
      fontSize: 16,
    },
    resendLink: {
      color: theme.colors.primary.main,
      fontSize: 16,
      fontWeight: "600" as const,
      marginLeft: 4,
    },
  };

  return (
    <AuthScreenLayout onBack={() => router.back()} headerBottomSpacing={32}>
      <ThemeText style={dynamicStyles.title}>
        {t("auth.passwordreset.title", { defaultValue: "Check Your Email" })}
      </ThemeText>
      <ThemeText style={dynamicStyles.subtitle}>
        {t("auth.passwordreset.subtitle", {
          defaultValue: "Enter the 6 digit code we sent to your email",
        })}
      </ThemeText>

      <View style={dynamicStyles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            style={[
              dynamicStyles.codeInput,
              digit || focusedIndex === index ? dynamicStyles.codeInputFocused : null,
            ]}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex((prev) => (prev === index ? null : prev))}
            returnKeyType={index === CODE_LENGTH - 1 ? "done" : "next"}
          />
        ))}
      </View>
      {error ? <ThemeText style={dynamicStyles.errorText}>{error}</ThemeText> : null}

      <Button
        title={t("auth.passwordreset.button", { defaultValue: "Verify Code" })}
        onPress={onSubmit}
        size="large"
        style={dynamicStyles.button}
        loading={isLoading}
        disabled={isLoading}
      />

      <View style={dynamicStyles.resendContainer}>
        <ThemeText style={dynamicStyles.resendText}>
          {t("auth.passwordreset.didntReceive", {
            defaultValue: "Haven’t got the email yet?",
          })}{" "}
        </ThemeText>
        <TouchableOpacity onPress={handleResendOtp}>
          <ThemeText style={dynamicStyles.resendLink}>
            {t("auth.passwordreset.resend", { defaultValue: "Resend email" })}
          </ThemeText>
        </TouchableOpacity>
      </View>
    </AuthScreenLayout>
  );
}
