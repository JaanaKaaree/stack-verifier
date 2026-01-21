/**
 * Home screen - Landing page with scan button
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation.types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons name="verified-user" size={80} color="#007AFF" />
        <Text style={styles.title}>MATTR Credential Verifier</Text>
        <Text style={styles.subtitle}>
          Verify Zespri export credentials by scanning QR codes
        </Text>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate('Scan')}
        >
          <MaterialIcons name="qr-code-scanner" size={24} color="#FFFFFF" />
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nfcButton}
          onPress={() => navigation.navigate('NFCReader')}
        >
          <MaterialIcons name="nfc" size={24} color="#FFFFFF" />
          <Text style={styles.nfcButtonText}>Read NFC Tag</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <MaterialIcons name="info" size={20} color="#666" />
          <Text style={styles.infoText}>
            Point your camera at a credential QR code to verify its authenticity
            and view package details.
          </Text>
        </View>
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
    marginBottom: 16,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  nfcButton: {
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 200,
    shadowColor: '#34C759',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nfcButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
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
});
