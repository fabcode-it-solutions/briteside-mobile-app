import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle, TextStyle, View, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import { useTheme } from "@/theme";
import { useAuthStore } from "@/stores/authStore";
import { ThemeText, ThemeView } from "@/components";
import { Input } from "@/components/ui/TextInput/input";
import { Select } from "@/components/ui/Select/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAlert } from "@/provider/AlertProvider";
import zxcvbn from "zxcvbn";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthScreenLayout from "@/components/shared/layout/AuthScreenLayout";
import { Images } from "@/assets";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  birthMonth?: string;
  birthDay?: string;
  birthYear?: string;
  name: string;
  username: string;
}

// Utility function to check if a year is a leap year
const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// Utility function to get the number of days in a month
const getDaysInMonth = (year?: number, month?: number): number => {
  if (!month) return 31; // Default max days if no month selected

  const thirtyDayMonths = [4, 6, 9, 11]; // April, June, September, November

  if (month === 2) {
    // February
    if (!year) return 29; // Max possible days for February when year not selected
    return isLeapYear(year) ? 29 : 28;
  }

  return thirtyDayMonths.includes(month) ? 30 : 31;
};

// Utility function to validate if a date exists in the calendar
const isValidDate = (year: number, month: number, day: number): boolean => {
  // Check year range (reasonable bounds)
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) return false;

  // Check month range
  if (month < 1 || month > 12) return false;

  // Check day range for the specific month and year
  const maxDays = getDaysInMonth(year, month);
  if (day < 1 || day > maxDays) return false;

  // Additional check: ensure the date is not in the future
  const selectedDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate > today) return false;

  // Additional check: ensure user is at least 13 years old (common requirement)
  const thirteenYearsAgo = new Date();
  thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);

  if (selectedDate > thirteenYearsAgo) {
    return false; // User is less than 13 years old
  }

  return true;
};

// Generate month options
const getMonthOptions = () => [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

// Generate year options (last 120 years, excluding last 13 years for age restriction)
const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 13; // Minimum age of 13
  const endYear = currentYear - 120; // Maximum age of 120

  return Array.from({ length: startYear - endYear + 1 }, (_, idx) => {
    const year = startYear - idx;
    return { label: String(year), value: String(year) };
  });
};

function SignUpScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const alert = useAlert();
  const { register, isLoading } = useAuthStore();
  const { control, handleSubmit, setFocus, getValues, setValue, trigger } = useForm<SignUpFormData>(
    {
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
        birthMonth: undefined,
        birthDay: undefined,
        birthYear: undefined,
        name: "",
        username: "",
      },
    },
  );

  const selectedMonth = useWatch({ control, name: "birthMonth" });
  const selectedYear = useWatch({ control, name: "birthYear" });
  const selectedDay = useWatch({ control, name: "birthDay" });

  // Generate day options based on selected month and year
  const dayOptions = useMemo(() => {
    const year = selectedYear ? parseInt(selectedYear, 10) : undefined;
    const month = selectedMonth ? parseInt(selectedMonth, 10) : undefined;
    const dayCount = getDaysInMonth(year, month);

    return Array.from({ length: dayCount }, (_, i) => {
      const dayNum = i + 1;
      const dayStr = dayNum.toString().padStart(2, "0");
      return { label: dayNum.toString(), value: dayStr };
    });
  }, [selectedMonth, selectedYear]);

  // Auto-adjust day if it becomes invalid after month/year change
  React.useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      const day = parseInt(selectedDay, 10);
      const month = parseInt(selectedMonth, 10);
      const year = parseInt(selectedYear, 10);
      const maxDays = getDaysInMonth(year, month);

      if (day > maxDays) {
        // Reset day to the maximum valid day for the selected month/year
        setValue("birthDay", maxDays.toString().padStart(2, "0"));
        trigger("birthDay"); // Revalidate the field
      }
    }
  }, [selectedMonth, selectedYear, selectedDay, setValue, trigger]);

  const onSubmit = async (data: SignUpFormData) => {
    // Validate the complete date before submission
    if (data.birthYear && data.birthMonth && data.birthDay) {
      const year = parseInt(data.birthYear, 10);
      const month = parseInt(data.birthMonth, 10);
      const day = parseInt(data.birthDay, 10);

      if (!isValidDate(year, month, day)) {
        alert.showAlert(
          t("errors.validation.birthday.invalid", {
            defaultValue: "Please enter a valid date of birth",
          }),
          "error",
        );
        return;
      }

      // Check minimum age (13 years)
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

      if (actualAge < 13) {
        alert.showAlert(
          t("errors.validation.birthday.tooYoung", {
            defaultValue: "You must be at least 13 years old to sign up",
          }),
          "error",
        );
        return;
      }
    }

    // Compose payload for Register API
    try {
      const [firstName, ...rest] = (data.name || "").trim().split(/\s+/);
      const lastName = rest.join(" ");
      if (!firstName) {
        alert.showAlert(
          t("errors.validation.name.required", { defaultValue: "Full name is required" }),
          "error",
        );
        return;
      }
      if (!data.birthYear || !data.birthMonth || !data.birthDay) {
        alert.showAlert(
          t("errors.validation.birthday.required", { defaultValue: "Birthday is required" }),
          "error",
        );
        return;
      }
      const dob = `${data.birthYear}-${data.birthMonth}-${data.birthDay}`; // YYYY-MM-DD

      await register({
        email: data.email,
        password: data.password,
        firstName,
        lastName,
        username: data.username,
        dob,
      });

      // Proceed to the profile photo step after successful registration
      router.push("/(auth)/upload-photo");
    } catch (err) {
      console.error("Registration failed", err);
      alert.showAlert(
        err instanceof Error
          ? err.message
          : t("errors.generic", { defaultValue: "Something went wrong" }),
        "error",
      );
    }
  };

  const handleBack = () => {
    router.back();
  };

  const openTermsOfService = async () => {
    await WebBrowser.openBrowserAsync("https://savewithBriteside.com/legal/terms/");
  };

  const openPrivacyPolicy = async () => {
    await WebBrowser.openBrowserAsync("https://savewithBriteside.com/legal/privacy/");
  };

  const dynamicStyles: {
    signUpButton: ViewStyle;
    legalText: TextStyle;
    legalLink: TextStyle;
    birthdayRow: ViewStyle;
    birthdayLabel: TextStyle;
    notificationInfo: ViewStyle;
    notificationText: TextStyle;
    learnWhy: TextStyle;
    linkText: TextStyle;
  } = {
    signUpButton: {
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
    },
    legalLink: {
      color: theme.colors.primary.main,
      fontSize: 14,
      fontWeight: "500" as const,
    },
    birthdayRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 8,
    },
    birthdayLabel: {
      fontSize: 14,
      marginBottom: 8,
      color: theme.colors.text.primary,
      fontWeight: "500" as const,
    },
    notificationInfo: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: 8,
      marginBottom: 20,
    },
    notificationText: {
      color: theme.colors.text.secondary,
      fontSize: 12,
      lineHeight: 16,
    },
    legalText: {
      color: theme.colors.text.secondary,
      fontSize: 12,
      lineHeight: 18,
    },
    learnWhy: {
      color: theme.colors.primary.main,
      fontSize: 12,
      fontWeight: "400" as const,
      marginLeft: 4,
    },
    linkText: {
      color: theme.colors.primary.main,
      fontSize: 12,
      fontWeight: "400" as const,
      marginLeft: 4,
    },
  };

  return (
    <AuthScreenLayout onBack={handleBack}>
      <ThemeView style={styles.buttom}>
        <ThemeText variant="h2" style={styles.title}>
          {t("auth.signup.title", { defaultValue: "Create Account" })}
        </ThemeText>

        <ThemeView style={styles.formContainer}>
          <Input
            control={control}
            name="email"
            label="Email"
            rules={{
              required: t("errors.validation.mobile.required", {
                defaultValue: "Email is required",
              }),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("errors.validation.email.invalid", {
                  defaultValue: "Please enter a valid email address",
                }),
              },
            }}
            placeholder={t("auth.signup.email", { defaultValue: "Enter your Email" })}
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
            label="Password"
            name="password"
            rules={{
              required: t("errors.validation.password.required", {
                defaultValue: "Password is required",
              }),
              validate: (value: string) => {
                const result = zxcvbn(value);
                if (result.score < 2) {
                  return result.feedback.warning || "Password is too weak";
                }
                return true;
              },
            }}
            placeholder={t("auth.signup.password", { defaultValue: "Password" })}
            secureTextEntry
            style={styles.input}
            onSubmitEditing={() => setFocus("confirmPassword")}
            returnKeyType="next"
            autoComplete="new-password"
            textContentType="newPassword"
          />

          <Input
            label="Confirm Password"
            control={control}
            name="confirmPassword"
            rules={{
              required: t("errors.validation.confirmPassword.required", {
                defaultValue: "Please confirm your password",
              }),
              validate: (value: string) => {
                const password = getValues("password");
                return (
                  value === password ||
                  t("errors.validation.confirmPassword.mismatch", {
                    defaultValue: "Passwords do not match",
                  })
                );
              },
            }}
            placeholder={t("auth.signup.confirmPassword", { defaultValue: "Confirm Password" })}
            secureTextEntry
            style={styles.input}
            onSubmitEditing={() => setFocus("birthMonth")}
            returnKeyType="next"
            autoComplete="new-password"
            textContentType="newPassword"
          />

          {/* Birthday with robust validation */}
          <ThemeText style={dynamicStyles.birthdayLabel}>
            {t("auth.signup.birthday", { defaultValue: "Birthday" })}
          </ThemeText>
          <ThemeView row style={dynamicStyles.birthdayRow}>
            <Select
              control={control}
              name="birthMonth"
              placeholder={t("auth.signup.month", { defaultValue: "Month" })}
              options={getMonthOptions()}
              rules={{
                required: t("errors.validation.birthday.month", {
                  defaultValue: "Month is required",
                }),
              }}
              style={{ flex: 1 }}
            />

            <Select
              control={control}
              name="birthDay"
              placeholder={t("auth.signup.day", { defaultValue: "Day" })}
              options={dayOptions}
              rules={{
                required: t("errors.validation.birthday.day", {
                  defaultValue: "Day is required",
                }),
                validate: (value: string) => {
                  if (!value) return true; // Let required rule handle empty

                  const month = getValues("birthMonth");
                  const year = getValues("birthYear");

                  if (month && year) {
                    const day = parseInt(value, 10);
                    const monthNum = parseInt(month, 10);
                    const yearNum = parseInt(year, 10);

                    if (!isValidDate(yearNum, monthNum, day)) {
                      return t("errors.validation.birthday.invalidDate", {
                        defaultValue: "Please select a valid date",
                      });
                    }
                  }

                  return true;
                },
              }}
              style={{ flex: 1 }}
              disabled={!selectedMonth} // Disable day selection until month is selected
            />

            <Select
              control={control}
              name="birthYear"
              placeholder={t("auth.signup.year", { defaultValue: "Year" })}
              options={getYearOptions()}
              rules={{
                required: t("errors.validation.birthday.year", {
                  defaultValue: "Year is required",
                }),
                validate: (value: string) => {
                  if (!value) return true; // Let required rule handle empty

                  const year = parseInt(value, 10);
                  const currentYear = new Date().getFullYear();

                  // Check age restrictions
                  if (year > currentYear - 13) {
                    return t("errors.validation.birthday.tooYoung", {
                      defaultValue: "You must be at least 13 years old",
                    });
                  }

                  if (year < currentYear - 120) {
                    return t("errors.validation.birthday.invalidYear", {
                      defaultValue: "Please enter a valid year",
                    });
                  }

                  return true;
                },
              }}
              style={{ flex: 1 }}
            />
          </ThemeView>

          <Input
            control={control}
            label="Name"
            name="name"
            rules={{
              required: t("errors.validation.name.required", {
                defaultValue: "Name is required",
              }),
              minLength: {
                value: 2,
                message: t("errors.validation.name.tooShort", {
                  defaultValue: "Name must be at least 2 characters",
                }),
              },
              pattern: {
                value: /^[a-zA-Z\s'-]+$/,
                message: t("errors.validation.name.invalid", {
                  defaultValue: "Name can only contain letters, spaces, hyphens, and apostrophes",
                }),
              },
            }}
            placeholder={t("auth.signup.name", { defaultValue: "Enter your full name" })}
            autoCapitalize="words"
            autoCorrect={false}
            spellCheck={false}
            style={styles.input}
            onSubmitEditing={() => setFocus("username")}
            returnKeyType="next"
            autoComplete="name"
            textContentType="name"
          />

          <Input
            control={control}
            label="Username"
            name="username"
            rules={{
              required: t("errors.validation.username.required", {
                defaultValue: "Username is required",
              }),
              minLength: {
                value: 3,
                message: t("errors.validation.username.tooShort", {
                  defaultValue: "Username must be at least 3 characters",
                }),
              },
              maxLength: {
                value: 20,
                message: t("errors.validation.username.tooLong", {
                  defaultValue: "Username must be less than 20 characters",
                }),
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: t("errors.validation.username.invalid", {
                  defaultValue: "Username can only contain letters, numbers, and underscores",
                }),
              },
            }}
            placeholder={t("auth.signup.username", { defaultValue: "Enter your username" })}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            style={styles.input}
            onSubmitEditing={handleSubmit(onSubmit)}
            returnKeyType="go"
            autoComplete="username"
            textContentType="username"
          />

          <View style={dynamicStyles.notificationInfo}>
            <ThemeText style={dynamicStyles.notificationText}>
              {t("auth.signup.legal.notification", {
                defaultValue: "Haven't got the email yet?",
              })}{" "}
              <ThemeText
                style={dynamicStyles.learnWhy}
                onPress={openTermsOfService}
                suppressHighlighting
              >
                {t("auth.signup.legal.learnWhy", { defaultValue: "Resend email" })}
              </ThemeText>
            </ThemeText>
          </View>

          <Button
            title={t("auth.signup.button", { defaultValue: "Sign Up" })}
            onPress={handleSubmit(onSubmit)}
            style={dynamicStyles.signUpButton}
            rightIcon={null}
            loading={isLoading}
            disabled={isLoading}
          />
        </ThemeView>

        <View style={{ marginTop: 16, paddingHorizontal: 18 }}>
          <ThemeText style={dynamicStyles.legalText}>
            {t("auth.signup.legal.prefix", {
              defaultValue:
                "By clicking or the Apple, Google, or Facebook icons, you agree to Eventbrite's ",
            })}
            <ThemeText
              style={dynamicStyles.linkText}
              onPress={openTermsOfService}
              suppressHighlighting
            >
              {t("auth.signup.legal.terms", { defaultValue: "Terms of Service" })}
            </ThemeText>{" "}
            {t("auth.signup.legal.and", { defaultValue: " and " })}{" "}
            <ThemeText
              style={dynamicStyles.linkText}
              onPress={openPrivacyPolicy}
              suppressHighlighting
            >
              {t("auth.signup.legal.privacy", { defaultValue: "Privacy Policy" })}
            </ThemeText>
            .
          </ThemeText>
        </View>

        {/* Social Icons Row */}
        <ThemeView style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 24 }}>
          {["logo-apple", "logo-google", "logo-facebook"].map((icon) => (
            <TouchableOpacity
              key={icon}
              style={{
                width: 76,
                height: 54,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: theme.colors.border,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
              }}
            >
              {icon === "logo-google" ? (
                <Image
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  source={Images.google_icon}
                />
              ) : icon === "logo-apple" ? (
                <Ionicons name={icon as any} size={32} color={theme.colors.text.primary} />
              ) : (
                <Image
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  source={Images.facebook_icon}
                />
              )}
            </TouchableOpacity>
          ))}
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
});

export default SignUpScreen;
