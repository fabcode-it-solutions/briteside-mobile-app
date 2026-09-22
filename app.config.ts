import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Briteside",
  slug: "Briteside-uzklfr7nq1bgwxxb7acan",
  version: "1.0.0",
  orientation: "default",
  scheme: "Briteside",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  assetBundlePatterns: ["**/*"],

  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.Briteside.app",
    icon: {
      dark: "./assets/images/ios-dark.png",
      light: "./assets/images/ios-light.png",
      tinted: "./assets/images/ios-tinted.png",
    },
    associatedDomains: ["applinks:Briteside.com"],
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
      NSCameraUsageDescription: "This app needs access to camera to take profile photos.",
      NSPhotoLibraryUsageDescription:
        "This app needs access to photo library to select profile photos.",
      NSPhotoLibraryAddUsageDescription: "This app needs access to save photos to your library.",
    },
  },

  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.Briteside.app",
    edgeToEdgeEnabled: true,
  },

  web: {
    bundler: "metro",
    output: "single",
    favicon: "./assets/images/favicon.png",
  },

  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#A684F5",
        image: "./assets/images/logo-white.png",
        dark: {
          image: "./assets/images/logo-dark.png",
          backgroundColor: "#222222",
        },
      },
    ],
    ["expo-build-properties"],
    "expo-font",
    "expo-web-browser",
    "expo-localization",
    [
      "expo-image-picker",
      {
        photosPermission: "The app accesses your photos to let you select a profile picture.",
        cameraPermission: "The app accesses your camera to let you take a profile picture.",
      },
    ],
    "expo-apple-authentication",
  ],

  experiments: {
    typedRoutes: true,
  },

  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "91d79d0a-31d9-4307-8d8f-9e1a461dc393",
    },
  },

  owner: "Briteside",
});
