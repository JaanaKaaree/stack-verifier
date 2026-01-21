# MATTR Verifier React Native App

A React Native mobile app built with Expo that scans QR codes from MATTR credentials and displays verified credential information.

## Features

- QR code scanning using device camera
- Credential verification via backend API
- Display credential details in a clean interface
- Fraud detection and warnings
- Support for both iOS and Android

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app installed on your physical device (recommended for QR scanning testing)
- Android Studio (optional, for Android emulator testing)
- Xcode (optional, for iOS Simulator - macOS only)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Scan the QR code with Expo Go app on your device, or press:
   - `a` for Android emulator
   - `i` for iOS Simulator (macOS only)
   - `w` for web browser

## Testing QR Code Scanning

### Recommended: Physical Device Testing

1. Install **Expo Go** app on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Ensure your phone and computer are on the same Wi-Fi network

3. Run `npx expo start` and scan the QR code with Expo Go

4. Test QR scanning by pointing your camera at a test QR code

### Android Emulator Testing

1. Install Android Studio and create an Android Virtual Device (AVD)
2. Configure emulator camera to use your computer's webcam:
   - Settings → Camera → VirtualScene or Webcam0
3. Run `npx expo start --android` or press `a` in Expo CLI

**Note**: Camera performance on emulator is limited. Use physical device for best results.

### iOS Simulator Testing

1. Install Xcode (macOS only)
2. Run `npx expo start --ios` or press `i` in Expo CLI

**Note**: iOS Simulator has limited camera support. Use physical iPhone for QR scanning.

## Creating Test QR Codes

You can create test QR codes using:

1. **Online QR Code Generator**: [qrcode-monkey.com](https://www.qrcode-monkey.com/)
   - Generate QR codes with test credential URLs
   - Display on another device or print

2. **Backend API**: Use your backend to generate test credential URLs and embed in QR codes

## Project Structure

```
mattr-verifier/
├── src/
│   ├── components/
│   │   ├── QRScanner.tsx          # Camera and QR scanning
│   │   ├── CredentialCard.tsx     # Display credential data
│   │   └── LoadingSpinner.tsx     # Loading indicator
│   ├── screens/
│   │   ├── HomeScreen.tsx         # Landing page
│   │   ├── ScanScreen.tsx         # QR scanning interface
│   │   └── ResultScreen.tsx       # Verification results
│   ├── services/
│   │   └── verificationService.ts # API integration
│   ├── types/
│   │   ├── credential.types.ts    # TypeScript interfaces
│   │   └── navigation.types.ts    # Navigation types
│   └── constants/
│       └── config.ts              # Configuration constants
├── App.tsx                        # Navigation setup
└── app.json                       # App configuration
```

## Configuration

Update `src/constants/config.ts` to configure:

- `API_BASE_URL`: Your backend API URL (default: 'https://api.zespri-credentials.nz')
- `VERIFICATION_ENDPOINT`: API endpoint path (default: '/api/v1/verify')
- `API_TIMEOUT`: Request timeout in milliseconds (default: 10000)

## API Integration

The app expects your backend API to expose:

```
POST /api/v1/verify
Content-Type: application/json

Request Body:
{
  "payload": "string (QR code data from credential)"
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
```

## Development Tips

- **Fast Refresh**: Changes appear instantly when you save files
- **Debugging**: Shake device → "Debug Remote JS" → Opens Chrome DevTools
- **Console Logs**: Use `console.log()` - appears in Expo CLI terminal
- **Reload**: Shake device → "Reload" or press `r` in Expo CLI

## Known Limitations

- Backend API must be running and accessible
- HTTPS required for production
- Camera doesn't work well in iOS Simulator (use physical device)
- Android emulator camera performance is limited

## Troubleshooting

### "java.io.IOException, failed to download remote update" Error

This error typically occurs when Expo Go cannot connect to the Metro bundler. Try these solutions:

1. **Clear Expo cache and restart**:
   ```bash
   npx expo start --clear
   ```

2. **Check network connectivity**:
   - Ensure your phone and computer are on the **same Wi-Fi network**
   - Disable VPN if active (can block local network connections)
   - Try disconnecting and reconnecting to Wi-Fi

3. **Use tunnel mode** (if same network doesn't work):
   ```bash
   npx expo start --tunnel
   ```
   Note: Tunnel mode is slower but works across different networks

4. **Check firewall settings**:
   - Windows: Allow Node.js through Windows Firewall
   - Ensure port 8081 (Metro bundler) is not blocked

5. **Update Expo Go app**:
   - Update Expo Go to the latest version from App Store/Play Store
   - Older versions may have compatibility issues

6. **Try LAN mode explicitly**:
   ```bash
   npx expo start --lan
   ```

7. **Check your computer's IP address**:
   - Find your computer's local IP (e.g., `ipconfig` on Windows)
   - Ensure phone can reach this IP address

### Metro Bundler Connection Errors
- Ensure phone and computer are on the same Wi-Fi network
- Try restarting Expo server: `npx expo start --clear`
- Use tunnel mode if network issues persist: `npx expo start --tunnel`

### Camera Permission Issues
- Check that camera permissions are granted in device settings
- For iOS: Settings → Privacy → Camera → Enable for Expo Go
- For Android: Settings → Apps → Expo Go → Permissions → Camera

### API Timeout Handling
- Check network connectivity
- Verify API_BASE_URL is correct
- Ensure backend API is running and accessible

## Production Build

When ready to deploy:

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for Android
eas build --platform android

# Build for iOS (requires Apple Developer account)
eas build --platform ios
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Camera Guide](https://docs.expo.dev/versions/latest/sdk/camera/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

Private - Esra Innovate
