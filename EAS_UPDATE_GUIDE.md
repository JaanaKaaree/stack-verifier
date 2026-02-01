# EAS Update Guide

This guide explains how EAS Update works in the mattr-verifier app and how to push over-the-air (OTA) JavaScript updates.

## Overview

**EAS Update only delivers JavaScript.** The native app must already be installed on the device.

Flow: **Build once → Install on device → Push JS updates anytime**

---

## Setup (Already Completed)

The following has been configured:

1. **expo-updates** installed
2. **app.json** – `updates.url` and `runtimeVersion` (policy: appVersion)
3. **eas.json** – Update channels for development, preview, and production profiles

---

## Step 1: Build the App (One-Time per Native Change)

**Important:** Use **preview** or **production** for the "install and get OTA updates" workflow. The **development** profile creates a dev client that asks you to connect to Metro — that's for local development with hot reload, not for standalone OTA updates.

### For OTA updates (no Metro, no "connect" screen)

```bash
cd mattr-verifier

# Preview — internal testing, APK for Android
eas build --profile preview --platform android

# Production — app store / release
eas build --profile production --platform android
```

After the build completes, install the APK from the provided link on your physical device. The app will start immediately and fetch updates from EAS on launch.

### For local development (Metro, hot reload)

```bash
# Development build — expects Metro, shows "connect" screen
eas build --profile development --platform android
```

Use this when you're actively developing and want to run `npx expo start` and connect your device to your dev machine.

**When to rebuild:**
- Add native modules (e.g. expo-camera, react-native-nfc-manager)
- Change app.json native config (permissions, entitlements, etc.)
- Change app icon or splash screen

---

## Step 2: Install the App on Device

- **Android:** Use the APK/AAB install link from EAS
- **iOS:** Use TestFlight or the build link (requires Mac or EAS cloud build)

---

## Step 3: Push Updates (JS/TS Changes)

Any time you change JavaScript or TypeScript:

```bash
cd mattr-verifier

# Development builds
eas update --branch development --message "Description of change"

# Preview builds
eas update --branch preview --message "Preview update"

# Production builds
eas update --branch production --message "Release 1.0.1"
```

The app:
- Checks for updates on launch
- Downloads silently
- Applies on next reload/restart

No Metro, ngrok, or same network required.

---

## Update Channels

| Build Profile | Channel   | Asks to Connect? | Use Case                          |
|---------------|-----------|------------------|-----------------------------------|
| development   | development | Yes (Metro)      | Local dev with hot reload         |
| preview       | preview     | No               | QA, staging, internal OTA testing |
| production    | production  | No               | Live app store builds             |

---

## What Requires Rebuild vs OTA Update

| Change Type              | OTA Update | Rebuild |
|--------------------------|------------|---------|
| JS/TS code               | Yes        | No      |
| Styles                   | Yes        | No      |
| API logic                | Yes        | No      |
| Adding native modules    | No         | Yes     |
| New permissions          | No         | Yes     |
| app.json native config   | No         | Yes     |
| App icon / splash        | No         | Yes     |

---

## Recommended Workflow (OTA, no Metro)

1. Build with **preview** (or production) once
2. Install APK on physical device
3. Use `eas update --branch preview` for daily JS/TS changes
4. Rebuild only when native changes are needed

---

## Quick Reference

```bash
# Build for OTA updates (no connect screen)
eas build --profile preview --platform android

# Push JS update (use same branch as your build)
eas update --branch preview --message "Your message"
eas update --branch production --message "Release"
```
