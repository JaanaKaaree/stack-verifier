/**
 * Home screen - Landing page with scan button
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation.types';
import { CredentialType } from '../types/navigation.types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [showTestMenu, setShowTestMenu] = useState(false);
  const [titlePressCount, setTitlePressCount] = useState(0);

  const handleTitlePress = () => {
    const newCount = titlePressCount + 1;
    setTitlePressCount(newCount);
    
    // Show test menu after 5 taps
    if (newCount >= 5) {
      setShowTestMenu(true);
      setTitlePressCount(0);
    }
    
    // Reset count after 2 seconds
    setTimeout(() => setTitlePressCount(0), 2000);
  };

  const handleScanHarvest = () => {
    navigation.navigate('Scan', { credentialType: 'OrgPartHarvertCredential' });
  };

  const handleScanDelivery = () => {
    navigation.navigate('Scan', { credentialType: 'DeliveryCredential' });
  };

  const handleOpenNFC = () => {
    setShowTestMenu(false);
    navigation.navigate('NFCReader');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons name="verified-user" size={80} color="#007AFF" />
        <Pressable onPress={handleTitlePress}>
          <Text style={styles.title}>MATTR Credential Verifier</Text>
        </Pressable>
        <Text style={styles.subtitle}>
          Verify Zespri export credentials by scanning QR codes
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.credentialButton, styles.harvestButton]}
            onPress={handleScanHarvest}
          >
            <MaterialIcons name="agriculture" size={28} color="#FFFFFF" />
            <Text style={styles.credentialButtonText}>Scan Harvest Credential</Text>
            <Text style={styles.credentialButtonSubtext}>
              Verify harvest credentials
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.credentialButton, styles.deliveryButton]}
            onPress={handleScanDelivery}
          >
            <MaterialIcons name="local-shipping" size={28} color="#FFFFFF" />
            <Text style={styles.credentialButtonText}>Scan Delivery Credential</Text>
            <Text style={styles.credentialButtonSubtext}>
              Verify delivery credentials
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.credentialButton, styles.nfcButton]}
            onPress={() => navigation.navigate('NFCReader')}
          >
            <MaterialIcons name="nfc" size={28} color="#FFFFFF" />
            <Text style={styles.credentialButtonText}>Read NFC Tag</Text>
            <Text style={styles.credentialButtonSubtext}>
              Scan NFC tags for location verification
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <MaterialIcons name="info" size={20} color="#666" />
          <Text style={styles.infoText}>
            Select the type of credential you want to verify, scan the QR code, or read an NFC tag.
          </Text>
        </View>
      </View>

      {/* Hidden Test Menu Modal */}
      <Modal
        visible={showTestMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTestMenu(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowTestMenu(false)}
        >
          <View style={styles.testMenu}>
            <Text style={styles.testMenuTitle}>Test Menu</Text>
            <Text style={styles.testMenuSubtitle}>
              Hidden developer options
            </Text>
            
            <TouchableOpacity
              style={styles.testMenuButton}
              onPress={handleOpenNFC}
            >
              <MaterialIcons name="nfc" size={24} color="#007AFF" />
              <Text style={styles.testMenuButtonText}>Read RFID/NFC Tag</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.testMenuButton, styles.testMenuButtonClose]}
              onPress={() => setShowTestMenu(false)}
            >
              <Text style={styles.testMenuButtonCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
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
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
    marginBottom: 32,
  },
  credentialButton: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  harvestButton: {
    backgroundColor: '#34C759',
  },
  deliveryButton: {
    backgroundColor: '#007AFF',
  },
  nfcButton: {
    backgroundColor: '#5856D6',
  },
  credentialButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  credentialButtonSubtext: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
    marginTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 24,
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
  // Test Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  testMenuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  testMenuSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  testMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    marginBottom: 12,
  },
  testMenuButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 12,
    fontWeight: '600',
  },
  testMenuButtonClose: {
    backgroundColor: 'transparent',
    marginTop: 8,
    marginBottom: 0,
  },
  testMenuButtonCloseText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});
