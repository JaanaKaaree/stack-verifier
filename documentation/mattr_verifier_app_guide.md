# MATTR Verifier React Native App - Cursor Implementation Guide

**Author:** Neil Mendes  
**Company:** Esra Innovate  
**Purpose:** Starter instructions for building a MATTR credential verifier app using Cursor AI coding tool

---

## 📋 Project Overview

You're building a React Native mobile app that scans QR codes from MATTR credentials and displays verified credential information. The app will:

1. **Scan QR codes** using the device camera
2. **Call your verification backend API** to verify credentials
3. **Display credential details** in a clean, user-friendly interface

---

## 🎯 Tech Stack

- **React Native** with **TypeScript**
- **Expo** (for easier camera/QR handling)
- **React Navigation** (screen management)
- **expo-camera** (camera access)
- **expo-barcode-scanner** (QR code scanning)
- **Axios** (API calls to your verification backend)

---

## 🚀 Phase 1: Project Setup

### Step 1: Initialize Project

**Instruction for Cursor:**

```
Create a new Expo React Native app with TypeScript:
- Project name: "mattr-verifier"
- Use TypeScript template
- Include necessary dependencies for camera, QR scanning, and navigation
- Set up folder structure with /src/screens, /src/components, /src/services, /src/types
```

**Expected Commands:**
```bash
npx create-expo-app mattr-verifier --template expo-template-blank-typescript
cd mattr-verifier
```

### Step 2: Install Dependencies

**Instruction for Cursor:**

```
Install the following packages:
1. expo-camera - for camera access
2. expo-barcode-scanner - for QR code scanning
3. @react-navigation/native - navigation framework
4. @react-navigation/native-stack - stack navigator
5. react-native-screens and react-native-safe-area-context - navigation dependencies
6. axios - for API calls
7. @expo/vector-icons - icons

Add these to package.json and install them.
```

**Expected Commands:**
```bash
npx expo install expo-camera expo-barcode-scanner
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npm install axios
npx expo install @expo/vector-icons
```

---

## 📁 Phase 2: Project Structure

**Instruction for Cursor:**

```
Create the following folder structure:

/src
  /components
    - QRScanner.tsx (camera component for scanning)
    - CredentialCard.tsx (display credential info)
    - LoadingSpinner.tsx (loading indicator)
  /screens
    - HomeScreen.tsx (landing/start screen)
    - ScanScreen.tsx (QR scanning screen)
    - ResultScreen.tsx (display verification results)
  /services
    - verificationService.ts (API calls to backend)
  /types
    - credential.types.ts (TypeScript interfaces)
  /constants
    - config.ts (API endpoints, app config)
    
Update App.tsx to set up navigation between these screens.
```

---

## 🔧 Phase 3: TypeScript Interfaces

**Instruction for Cursor:**

```
In /src/types/credential.types.ts, create TypeScript interfaces for:

1. CredentialData interface with fields:
   - packageId: string
   - orchardName: string
   - orchardNZBN: string
   - packingFacilityNZBN: string
   - productType: string
   - packDate: string
   - status: 'active' | 'revoked'
   - valid: boolean

2. VerificationResponse interface with fields:
   - success: boolean
   - data: CredentialData | null
   - error?: string
   - fraudWarning?: {
       detected: boolean
       message: string
       deliveryDate?: string
     }

3. ScanResult interface with fields:
   - type: string
   - data: string (the scanned QR code content)
```

---

## ⚙️ Phase 4: Configuration

**Instruction for Cursor:**

```
In /src/constants/config.ts, create configuration constants:

1. API_BASE_URL - set to 'https://api.zespri-credentials.nz' (placeholder)
2. VERIFICATION_ENDPOINT - '/api/v1/verify'
3. API_TIMEOUT - 10000 (10 seconds)
4. Camera permissions request messages
5. Export these as constants

Add a note that API_BASE_URL should be changed to the actual backend URL.
```

---

## 📸 Phase 5: QR Scanner Component

**Instruction for Cursor:**

```
Create /src/components/QRScanner.tsx with the following requirements:

1. Use expo-camera's Camera component
2. Request camera permissions on mount using Camera.requestCameraPermissionsAsync()
3. If permission denied, show message asking user to enable camera in settings
4. Use expo-barcode-scanner's BarCodeScanner.Constants.BarCodeType.qr for QR detection
5. When QR code detected, call onScan callback prop with the scanned data
6. After successful scan, briefly show success indicator then stop scanning
7. Include a "Cancel" button to go back
8. Style the camera view to fill the screen with a semi-transparent overlay showing scan area
9. Add TypeScript types for all props

Props needed:
- onScan: (data: string) => void
- onCancel: () => void
```

**Key Implementation Notes:**
- Handle permission states: granted, denied, undetermined
- Prevent multiple rapid scans with a cooldown period
- Show visual feedback when QR detected

---

## 🌐 Phase 6: Verification Service

**Instruction for Cursor:**

```
Create /src/services/verificationService.ts with the following:

1. Import axios and config constants
2. Create verifyCredential async function that:
   - Takes qrData: string as parameter
   - Extracts credential ID or verification URL from QR data
   - Makes POST request to VERIFICATION_ENDPOINT
   - Request body should include: { credentialUrl: qrData, timestamp: new Date().toISOString() }
   - Sets timeout from config
   - Returns VerificationResponse type
   - Handles errors gracefully and returns error in response
   
3. Add proper error handling:
   - Network errors
   - Timeout errors
   - Invalid response format
   - HTTP error status codes

4. Export the verifyCredential function

Include detailed JSDoc comments explaining the API contract.
```

---

## 🏠 Phase 7: Home Screen

**Instruction for Cursor:**

```
Create /src/screens/HomeScreen.tsx with:

1. Simple welcome screen with:
   - App title "MATTR Credential Verifier"
   - Subtitle explaining the app (verify Zespri export credentials)
   - Large "Scan QR Code" button that navigates to ScanScreen
   - Information text about what to expect
   
2. Use React Navigation's navigation prop for screen navigation
3. Style with:
   - Centered content
   - Clean, professional design
   - Adequate padding and spacing
   - Use safe area view for proper device spacing

4. Add TypeScript types for navigation props
```

---

## 📱 Phase 8: Scan Screen

**Instruction for Cursor:**

```
Create /src/screens/ScanScreen.tsx with:

1. Import QRScanner component
2. Import verificationService
3. State management for:
   - isScanning: boolean
   - isVerifying: boolean
   - error: string | null

4. When QR scanned:
   - Set isScanning to false
   - Set isVerifying to true
   - Call verificationService.verifyCredential
   - On success: navigate to ResultScreen with credential data
   - On error: show error message, allow retry

5. Include:
   - Back navigation button
   - Loading indicator when verifying
   - Error display with retry button
   - Instructions text at top ("Position QR code within frame")

6. Handle navigation params using TypeScript types
```

**Implementation Details:**
- Use LoadingSpinner component during verification
- Clear error state when retrying scan
- Prevent multiple simultaneous verifications

---

## ✅ Phase 9: Result Screen

**Instruction for Cursor:**

```
Create /src/screens/ResultScreen.tsx with:

1. Accept credentialData as navigation param
2. Display verification result in two states:

   **If credential is ACTIVE (valid: true, status: 'active'):**
   - Show success icon (green checkmark)
   - Display "✅ Verified Zespri Product"
   - Show credential details in CredentialCard component:
     * Package ID
     * Orchard Name
     * Product Type
     * Pack Date (formatted nicely)
     * NZBN information
   - Buttons: "Scan Another" and "Done"

   **If credential is REVOKED or invalid:**
   - Show warning icon (red alert)
   - Display "⚠️ WARNING - COUNTERFEIT SUSPECTED"
   - Show fraud warning message
   - Display when it was originally delivered
   - Show "Report Fraud" button
   - Show "Scan Another" button

3. Format dates using JavaScript Date formatting
4. Use color coding: green for valid, red for fraud
5. Add smooth animations for content appearance
6. TypeScript types for all props and navigation params
```

---

## 🎨 Phase 10: Credential Card Component

**Instruction for Cursor:**

```
Create /src/components/CredentialCard.tsx with:

1. Props:
   - credentialData: CredentialData
   - variant: 'valid' | 'invalid'

2. Display fields in a card layout:
   - Package ID (bold, larger text)
   - Orchard Name with location icon
   - Product Type with product icon
   - Pack Date with calendar icon
   - Packing Facility NZBN
   - Status badge (colored based on variant)

3. Styling:
   - Card with shadow and rounded corners
   - Icon + text rows with proper spacing
   - Different background colors based on variant (light green for valid, light red for invalid)
   - Responsive layout that works on different screen sizes

4. Use @expo/vector-icons for icons (MaterialIcons or Ionicons)
```

---

## 🔄 Phase 11: Navigation Setup

**Instruction for Cursor:**

```
Update App.tsx to set up React Navigation:

1. Import NavigationContainer from @react-navigation/native
2. Import createNativeStackNavigator from @react-navigation/native-stack
3. Import all three screens: HomeScreen, ScanScreen, ResultScreen

4. Create a typed navigation stack with these screens:
   - Home (no params)
   - Scan (no params)
   - Result (params: credentialData: VerificationResponse)

5. Set up stack navigator with:
   - Header titles for each screen
   - Custom header styles (background color, text color)
   - Back button on Scan and Result screens

6. Wrap in NavigationContainer

7. Create proper TypeScript types for navigation (RootStackParamList)
```

---

## 🎨 Phase 12: Loading Spinner Component

**Instruction for Cursor:**

```
Create /src/components/LoadingSpinner.tsx:

1. Simple component with:
   - ActivityIndicator from react-native
   - Centered on screen with semi-transparent background
   - Text message prop (optional): "Verifying credential..."
   - Size: 'large'
   - Color: blue or brand color

2. Props:
   - message?: string
   - visible: boolean

3. Only render if visible is true
4. Use absolute positioning to overlay on content
```

---

## 🔐 Phase 13: App Configuration

**Instruction for Cursor:**

```
Update app.json (or app.config.js) with:

1. Camera permissions:
   - ios.infoPlist.NSCameraUsageDescription
   - android.permissions: CAMERA

2. App metadata:
   - name: "MATTR Verifier"
   - slug: "mattr-verifier"
   - version: "1.0.0"
   - orientation: "portrait"
   - icon: placeholder path
   - splash screen config

3. Build configuration:
   - iOS bundle identifier
   - Android package name
```

---

## 🧪 Phase 14: Testing Instructions

**Instruction for Cursor:**

```
Create a README.md with testing instructions:

1. Development mode:
   - Run: npx expo start
   - Scan QR code with Expo Go app
   - Test on both iOS and Android

2. Test cases to implement:
   - Scan valid credential QR
   - Scan revoked credential QR
   - Test with no network connection
   - Test camera permission denial
   - Test invalid QR data

3. Known limitations:
   - Backend API must be running
   - HTTPS required for production
   - Camera doesn't work in iOS Simulator (test on device)

4. Troubleshooting common issues:
   - Metro bundler connection errors
   - Camera permission issues
   - API timeout handling
```

---

## 📝 Phase 15: Error Handling Patterns

**Instruction for Cursor:**

```
Add comprehensive error handling throughout the app:

1. In verificationService.ts:
   - Wrap API calls in try-catch
   - Check for network availability
   - Parse error responses from backend
   - Return user-friendly error messages

2. In ScanScreen.tsx:
   - Handle camera permission errors
   - Handle QR parse errors
   - Handle verification timeout
   - Show retry UI for errors

3. In ResultScreen.tsx:
   - Handle missing credential data
   - Handle malformed response data
   - Graceful degradation if some fields missing

4. Create error message constants in config.ts for consistency
```

---

## 🎯 Implementation Checklist for Cursor

Use this checklist when implementing with Cursor:

### Initial Setup
- [ ] Create Expo TypeScript project
- [ ] Install all dependencies
- [ ] Create folder structure
- [ ] Set up TypeScript types

### Core Components
- [ ] Build QRScanner component with camera permissions
- [ ] Build CredentialCard component with styling
- [ ] Build LoadingSpinner component
- [ ] Create all three screens (Home, Scan, Result)

### Services & Logic
- [ ] Implement verificationService with API calls
- [ ] Add error handling throughout
- [ ] Configure navigation with TypeScript types
- [ ] Set up app configuration and permissions

### Testing & Polish
- [ ] Test camera scanning flow
- [ ] Test API integration with backend
- [ ] Test both valid and revoked credential flows
- [ ] Add loading states and animations
- [ ] Test error scenarios

---

## 🚀 Quick Start Commands

Copy these commands to get started:

```bash
# Create project
npx create-expo-app mattr-verifier --template expo-template-blank-typescript
cd mattr-verifier

# Install dependencies
npx expo install expo-camera expo-barcode-scanner
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npm install axios
npx expo install @expo/vector-icons

# Run development server
npx expo start

# Run on iOS (macOS only)
npx expo start --ios

# Run on Android
npx expo start --android
```

---

## 🔗 Integration with Your Verification Backend

Your backend API should expose this endpoint:

```
POST /api/v1/verify
Content-Type: application/json

Request Body:
{
  "credentialUrl": "string (from QR code)",
  "timestamp": "ISO 8601 timestamp",
  "location": { // optional
    "lat": number,
    "lng": number
  }
}

Response (200 OK):
{
  "success": true,
  "data": {
    "packageId": "PKG-2025-OR001-00123",
    "orchardName": "Te Puke Gold Orchard",
    "orchardNZBN": "9429000000123-OR001",
    "packingFacilityNZBN": "9429000000123-PF001",
    "productType": "Zespri Gold Kiwifruit",
    "packDate": "2025-01-15T08:30:00Z",
    "status": "active",
    "valid": true
  }
}

Response (200 OK - Revoked):
{
  "success": false,
  "valid": false,
  "fraudWarning": {
    "detected": true,
    "message": "This package was delivered on Jan 28, 2025",
    "deliveryDate": "2025-01-28T14:32:00Z"
  }
}

Response (400/500):
{
  "success": false,
  "error": "Invalid credential format"
}
```

---

## 📊 Expected User Flow

1. **App Launch** → HomeScreen
2. **Tap "Scan QR Code"** → Navigate to ScanScreen
3. **Grant Camera Permission** → QRScanner activates
4. **Point at QR Code** → Scanner detects and captures data
5. **Show Loading** → API call to verification backend
6. **Display Result** → Navigate to ResultScreen with data
7. **User Actions:**
   - If valid: View details, scan another, or done
   - If fraud: See warning, report fraud, scan another

---

## 🎨 Design Guidelines

**Color Scheme:**
- Primary: Blue (#007AFF)
- Success: Green (#34C759)
- Warning/Error: Red (#FF3B30)
- Background: White (#FFFFFF)
- Card Background: Light Gray (#F2F2F7)

**Typography:**
- Headers: Bold, 20-24px
- Body: Regular, 14-16px
- Labels: Semibold, 12-14px

**Spacing:**
- Standard padding: 16px
- Card margins: 12px
- Button padding: 12px vertical, 24px horizontal

---

## 🔧 Advanced Features (Future Phases)

Consider adding these in future iterations:

1. **Offline Mode**: Cache verified credentials locally
2. **Scan History**: Store recent scans with timestamps
3. **Multi-language**: Support for Chinese, Japanese markets
4. **Batch Scanning**: Scan multiple packages in sequence
5. **Analytics**: Track scan patterns and locations
6. **Push Notifications**: Alert users to fraud patterns
7. **Biometric Auth**: Secure verifier identity with fingerprint/face

---

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [MATTR VII Documentation](https://learn.mattr.global/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## ✅ Success Criteria

Your app is ready when:

- ✅ Camera opens and scans QR codes reliably
- ✅ Verification API calls work with proper error handling
- ✅ Valid credentials display correctly with all fields
- ✅ Revoked credentials show fraud warnings
- ✅ Navigation flows smoothly between screens
- ✅ Loading states provide feedback
- ✅ Errors are handled gracefully with retry options
- ✅ App works on both iOS and Android
- ✅ Permissions are requested and handled properly

---

## 🎯 Next Steps After Building

1. **Connect to Real Backend**: Replace placeholder API URL with your actual verification service
2. **Test with Real Credentials**: Use MATTR-issued test credentials
3. **User Testing**: Get feedback from warehouse staff and distributors
4. **Performance Optimization**: Profile and optimize render performance
5. **Security Audit**: Review data handling and storage practices
6. **Prepare for Release**: App store screenshots, descriptions, compliance

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Author:** Neil Mendes, Esra Innovate  
**Purpose:** Cursor AI implementation guide for MATTR verifier app

---

This guide provides everything you need to instruct Cursor to build a production-ready MATTR credential verifier app. Work through each phase systematically, and you'll have a working app that can scan QR codes, verify credentials through your backend API, and display results with fraud detection capabilities.
