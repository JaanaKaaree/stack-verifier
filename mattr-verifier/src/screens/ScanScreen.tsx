/**
 * Scan screen - QR code scanning interface
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { QRScanner } from '../components/QRScanner';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { verifyCredential } from '../services/verificationService';
import { RootStackParamList } from '../types/navigation.types';
import { VerificationResponse } from '../types/credential.types';
import { ERROR_MESSAGES } from '../constants/config';

type ScanScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Scan'
>;
type ScanScreenRouteProp = RouteProp<RootStackParamList, 'Scan'>;

interface ScanScreenProps {
  navigation: ScanScreenNavigationProp;
  route: ScanScreenRouteProp;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({ navigation, route }) => {
  const credentialType = route.params?.credentialType || 'OrgPartHarvertCredential';
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Log credential type for debugging
  React.useEffect(() => {
    console.log(`[ScanScreen] Scanning ${credentialType} credential`);
  }, [credentialType]);

  const handleScan = async (qrData: string) => {
    if (isVerifying) {
      return; // Prevent multiple simultaneous verifications
    }

    console.log('[ScanScreen] QR code scanned:', qrData);
    setIsVerifying(true);
    setError(null);

    try {
      const response: VerificationResponse = await verifyCredential(qrData, credentialType);
      console.log('[ScanScreen] Verification response:', response);

      setIsVerifying(false);

      // Navigate to result screen if we have data (verified or unverified)
      if (response.data) {
        console.log('[ScanScreen] Navigating to Result with payload:', qrData.substring(0, 50) + '...');
        console.log('[ScanScreen] Payload length:', qrData.length);
        // Use reset to ensure fresh navigation state and updated params
        navigation.reset({
          index: 1,
          routes: [
            { name: 'Home' },
            {
              name: 'Result',
              params: {
                verificationResponse: response,
                credentialType: credentialType,
                payload: qrData, // Pass the QR payload for revocation
              },
            },
          ],
        });
      } else {
        // Only show error if there's no data to display
        setError(response.error || ERROR_MESSAGES.API_ERROR);
      }
    } catch (err) {
      console.error('[ScanScreen] Unexpected error:', err);
      setIsVerifying(false);
      setError(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  };

  const handleCancel = () => {
    if (isVerifying) {
      Alert.alert(
        'Verification in Progress',
        'Verification is in progress. Are you sure you want to cancel?',
        [
          { text: 'Continue', style: 'cancel' },
          {
            text: 'Cancel',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleRetry = () => {
    setError(null);
    // QRScanner will handle rescanning
  };

  return (
    <SafeAreaView style={styles.container}>
      <QRScanner onScan={handleScan} onCancel={handleCancel} />
      <LoadingSpinner visible={isVerifying} />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
});
