# Briteside — Expo / React Native App

A cross-platform (iOS, Android, Web) mobile application built with **Expo** and **React Native**, featuring a save-and-read article/content experience with offline-first sync, a custom design system, and a share extension for capturing content directly from other apps.

## Overview

Briteside lets users save articles and content from anywhere and read them later, with a smooth, native-feeling experience across iOS, Android, and Web from a single codebase.

## Key Features

- **Cross-platform** — one codebase targeting iOS, Android, and Web
- **Offline-first sync** — local changes sync automatically in the background, with real-time updates pushed over WebSocket
- **Share extension** — save articles directly from Safari/Chrome or any app via native iOS/Android share sheets
- **Custom design system** — a themed component library with full light/dark mode support
- **Multi-language support** — localized UI (English, German, Spanish, French, Chinese)
- **Secure authentication** — token-based auth with automatic refresh

## Tech Stack

| Area             | Technology                                     |
| ---------------- | ---------------------------------------------- |
| Framework        | [Expo](https://expo.dev) + React Native        |
| Routing          | Expo Router (file-based)                       |
| State Management | Zustand (MMKV-persisted)                       |
| Data Fetching    | TanStack React Query                           |
| Language         | TypeScript (strict mode)                       |
| Styling          | Custom theme system (tokens-based, light/dark) |
| Testing          | Jest                                           |
| CI/CD            | EAS Build & Submit, GitHub Actions             |

## Project Structure (high level)

```
app/            File-based routes (Expo Router)
  (auth)/       Sign in / sign up flow
  (tabs)/       Main application tabs
components/     Themed primitives, shared UI, and feature components
theme/          Design tokens, ThemeProvider, theme hooks
services/       API client, endpoints, and repositories
hooks/          Data-fetching and utility hooks
i18n/           Localization resources
```

## Getting Started

> Requires Node.js and Yarn. See `.env.example` for required environment variables.

```bash
# Install dependencies
yarn install

# Start the development server
npx expo start
```

From the Expo CLI output you can launch the app in a development build, an Android emulator, an iOS simulator, or Expo Go.

```bash
yarn android   # Run on Android
yarn ios       # Run on iOS
yarn web       # Run in the browser
```

## Quality Checks

```bash
yarn test              # Run the test suite
yarn lint               # Lint the codebase
yarn type-check          # TypeScript type checking
yarn lint-type-check      # Lint + type check
```

## Builds & Releases

Builds and store submissions are managed with [EAS](https://docs.expo.dev/eas/):

```bash
eas build
yarn deploy
yarn deploy:submit
```

---

_This project is proprietary. Source and documentation are shared for portfolio/reference purposes only._
