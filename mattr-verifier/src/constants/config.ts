/**
 * Application configuration constants
 */

// API Configuration
// TODO: Update this to your actual backend API URL
//
// IMPORTANT NOTES:
// - CORS is NOT needed for React Native (unlike web browsers)
// - For emulator/simulator: use 'http://localhost:3001' or 'http://10.0.2.2:3001' (Android emulator)
// - For physical device on same network: use 'http://YOUR_COMPUTER_IP:3001' (find IP with ipconfig/ifconfig)
// - For tunnel (different networks): use your tunnel URL (e.g., 'https://xxxx-xxxx-xxxx.ngrok.io' or 'https://xxxx.loca.lt')
//   NOTE: If you're using Expo tunnel (--tunnel flag), you ALSO need a tunnel for your backend API!
//   Set up a separate tunnel for your backend (ngrok, localtunnel, etc.) and use that URL here.
// - For production: use HTTPS (required): 'https://your-api-domain.com'
// - HTTP is allowed in development (configured in app.json)
//
// EXAMPLES:
// - Same network: 'http://192.168.1.59:3001'
// - Ngrok tunnel: 'https://abc123def456.ngrok.io' (or 'https://abc123def456.ngrok-free.app')
// - Localtunnel: 'https://xxxx.loca.lt'
// - Cloudflare tunnel: 'https://xxxx.trycloudflare.com'
// export const API_BASE_URL = 'http://192.168.1.59:3001';
// export const API_BASE_URL = 'http://10.10.10.211:3001';
export const API_BASE_URL = 'https://settled-ample-hippo.ngrok-free.app'; // Uncomment and replace with your tunnel URL
export const VERIFICATION_ENDPOINT = '/api/v1/verify';
export const REVOKE_ENDPOINT = '/api/v1/revoke';
export const API_TIMEOUT = 10000; // 10 seconds

// Camera Permissions
export const CAMERA_PERMISSION_MESSAGES = {
  ios: 'This app needs camera access to scan QR codes for credential verification.',
  android: 'Camera permission is required to scan QR codes.',
};

// NFC Configuration
export const NFC_MESSAGES = {
  SCANNING: 'Hold your phone near the NFC tag',
  NOT_SUPPORTED: 'NFC is not supported on this device',
  NOT_ENABLED: 'NFC is not enabled. Please enable NFC in your device settings.',
  READ_ERROR: 'Failed to read NFC tag. Please try again.',
  INVALID_DATA: 'Invalid NFC tag data format.',
  SUCCESS: 'NFC tag read successfully!',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  INVALID_QR: 'Invalid QR code format. Please scan a valid credential QR code.',
  PERMISSION_DENIED: 'Camera permission denied. Please enable camera access in settings.',
  API_ERROR: 'Verification failed. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  NFC_ERROR: 'NFC reading failed. Please try again.',
};

// App Configuration
export const APP_CONFIG = {
  name: 'MATTR Verifier',
  version: '1.0.0',
};

// User and Application Identification
// TODO: These will eventually come from user profile/onboarding
// For now, these are hardcoded unique IDs for this app instance
// Format: UUID v4 (e.g., '550e8400-e29b-41d4-a716-446655440000')
export const USER_ID = 'a1b2c3d4-e5f6-4789-a012-3456789abcde'; // Unique user ID
export const MOBILE_APPLICATION_ID = 'f9e8d7c6-b5a4-3210-9876-543210fedcba'; // Unique mobile app instance ID
