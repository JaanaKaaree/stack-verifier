/**
 * Application configuration constants
 */

// API Configuration
// TODO: Update this to your actual backend API URL
//
// IMPORTANT NOTES:
// - CORS is NOT needed for React Native (unlike web browsers)
// - For emulator/simulator: use 'http://localhost:3001' or 'http://10.0.2.2:3001' (Android emulator)
// - For physical device: use 'http://YOUR_COMPUTER_IP:3001' (find IP with ipconfig/ifconfig)
// - For production: use HTTPS (required): 'https://your-api-domain.com'
// - HTTP is allowed in development (configured in app.json)
export const API_BASE_URL = 'http://192.168.1.59:3001';
export const VERIFICATION_ENDPOINT = '/api/v1/verify';
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
