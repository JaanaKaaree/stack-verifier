/**
 * NFC Reader screen - Reads NFC tags and displays location data
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  Vibration,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { RootStackParamList, NFCTagData } from '../types/navigation.types';
import { NFC_MESSAGES } from '../constants/config';

type NFCReaderScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NFCReader'
>;

interface NFCReaderScreenProps {
  navigation: NFCReaderScreenNavigationProp;
}

export const NFCReaderScreen: React.FC<NFCReaderScreenProps> = ({
  navigation,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [nfcSupported, setNfcSupported] = useState(true);

  useEffect(() => {
    // Initialize NFC on component mount
    initNfc();

    return () => {
      // Cleanup on unmount
      cleanupNfc();
    };
  }, []);

  const initNfc = async () => {
    try {
      const supported = await NfcManager.isSupported();
      setNfcSupported(supported);

      if (!supported) {
        Alert.alert('NFC Not Supported', NFC_MESSAGES.NOT_SUPPORTED);
        return;
      }

      await NfcManager.start();
    } catch (error) {
      console.error('Error initializing NFC:', error);
      Alert.alert('Error', 'Failed to initialize NFC');
    }
  };

  const cleanupNfc = async () => {
    try {
      await NfcManager.cancelTechnologyRequest();
    } catch (error) {
      console.error('Error cleaning up NFC:', error);
    }
  };

  const checkNfcEnabled = async (): Promise<boolean> => {
    try {
      const enabled = await NfcManager.isEnabled();
      if (!enabled) {
        Alert.alert(
          'NFC Disabled',
          NFC_MESSAGES.NOT_ENABLED,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => {
                if (Platform.OS === 'android') {
                  NfcManager.goToNfcSetting();
                }
              },
            },
          ]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking NFC status:', error);
      return false;
    }
  };

  const readNfcTag = async () => {
    if (!nfcSupported) {
      Alert.alert('NFC Not Supported', NFC_MESSAGES.NOT_SUPPORTED);
      return;
    }

    const enabled = await checkNfcEnabled();
    if (!enabled) {
      return;
    }

    try {
      setIsScanning(true);

      // Request NFC technology
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // Read NDEF message
      const tag = await NfcManager.getTag();
      console.log('Tag found:', tag);

      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        // Parse NDEF records
        const ndefRecords = tag.ndefMessage;
        let tagData: NFCTagData | null = null;

        for (const record of ndefRecords) {
          try {
            // Convert payload to string
            const payload = Ndef.text.decodePayload(new Uint8Array(record.payload));
            console.log('Payload:', payload);

            // Try to parse as JSON
            const parsedData = JSON.parse(payload);
            
            // Validate the expected structure
            if (
              parsedData.nzbn &&
              parsedData.location_id &&
              parsedData.location_name &&
              parsedData.bin_id &&
              parsedData.row_id
            ) {
              tagData = parsedData as NFCTagData;
              break;
            }
          } catch (parseError) {
            console.log('Could not parse record as JSON:', parseError);
          }
        }

        if (tagData) {
          // Success! Play sound/vibration
          Vibration.vibrate(200);
          
          // Navigate to result screen
          navigation.navigate('NFCResult', { tagData });
        } else {
          Alert.alert('Invalid Tag', NFC_MESSAGES.INVALID_DATA);
        }
      } else {
        Alert.alert('Empty Tag', 'The NFC tag appears to be empty.');
      }
    } catch (error: any) {
      console.error('Error reading NFC tag:', error);
      
      if (error.toString().includes('cancelled')) {
        // User cancelled, no need to show error
      } else {
        Alert.alert('Read Error', NFC_MESSAGES.READ_ERROR);
      }
    } finally {
      setIsScanning(false);
      // Cancel technology request
      try {
        await NfcManager.cancelTechnologyRequest();
      } catch (error) {
        console.error('Error cancelling technology request:', error);
      }
    }
  };

  const cancelScanning = async () => {
    try {
      await NfcManager.cancelTechnologyRequest();
      setIsScanning(false);
    } catch (error) {
      console.error('Error cancelling scan:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons
          name="nfc"
          size={80}
          color={isScanning ? '#34C759' : '#007AFF'}
        />
        <Text style={styles.title}>NFC Tag Reader</Text>
        <Text style={styles.subtitle}>
          {isScanning
            ? NFC_MESSAGES.SCANNING
            : 'Tap the button below to start reading'}
        </Text>

        {!isScanning ? (
          <TouchableOpacity
            style={styles.scanButton}
            onPress={readNfcTag}
            disabled={!nfcSupported}
          >
            <MaterialIcons name="nfc" size={24} color="#FFFFFF" />
            <Text style={styles.scanButtonText}>Read NFC Tag</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.scanningContainer}>
            <View style={styles.pulseCircle} />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={cancelScanning}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoBox}>
          <MaterialIcons name="info" size={20} color="#666" />
          <Text style={styles.infoText}>
            Hold your phone close to the NFC tag. The tag will be read
            automatically when detected.
          </Text>
        </View>

        {!nfcSupported && (
          <View style={styles.warningBox}>
            <MaterialIcons name="warning" size={20} color="#FF9500" />
            <Text style={styles.warningText}>
              {NFC_MESSAGES.NOT_SUPPORTED}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
    textAlign: 'center',
    marginBottom: 48,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 200,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  scanningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#34C759',
    opacity: 0.3,
    marginBottom: 24,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 48,
    padding: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    maxWidth: 320,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#FF9500',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },
});
