/**
 * Home screen - Landing page with scan options and bottom action bar
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
  ScrollView,
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
  const [showTestMenu, setShowTestMenu] = useState(false);
  const [titlePressCount, setTitlePressCount] = useState(0);

  const handleTitlePress = () => {
    const newCount = titlePressCount + 1;
    setTitlePressCount(newCount);

    if (newCount >= 5) {
      setShowTestMenu(true);
      setTitlePressCount(0);
    }
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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <MaterialIcons name="verified-user" size={72} color="#007AFF" />
          <Pressable onPress={handleTitlePress}>
            <Text style={styles.title}>STACK Credential Verifier</Text>
          </Pressable>
          <Text style={styles.subtitle}>
            Verify Zespri export credentials by scanning QR codes or NFC tags
          </Text>
        </View>

        {/* Default content: Scan harvest & delivery */}
        <View style={styles.defaultCard}>
          <View style={styles.defaultCardHeader}>
            <MaterialIcons name="qr-code-scanner" size={32} color="#007AFF" />
            <Text style={styles.defaultCardTitle}>Scan harvest & delivery</Text>
          </View>
          <Text style={styles.defaultCardDescription}>
            Choose an option below to scan a harvest credential, delivery credential, or read an NFC tag for location verification.
          </Text>
          <View style={styles.quickActions}>
            <View style={styles.quickActionItem}>
              <MaterialIcons name="agriculture" size={20} color="#34C759" />
              <Text style={styles.quickActionText}>Harvest</Text>
            </View>
            <View style={styles.quickActionItem}>
              <MaterialIcons name="local-shipping" size={20} color="#007AFF" />
              <Text style={styles.quickActionText}>Delivery</Text>
            </View>
            <View style={styles.quickActionItem}>
              <MaterialIcons name="nfc" size={20} color="#5856D6" />
              <Text style={styles.quickActionText}>Tag</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <MaterialIcons name="info-outline" size={20} color="#666" />
          <Text style={styles.infoText}>
            Select Harvest, Delivery, or Tag below to start verifying.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom bar: 3 smaller buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.bottomButton, styles.bottomButtonHarvest]}
          onPress={handleScanHarvest}
          activeOpacity={0.8}
        >
          <MaterialIcons name="agriculture" size={24} color="#FFFFFF" />
          <Text style={styles.bottomButtonText}>Harvest</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomButton, styles.bottomButtonDelivery]}
          onPress={handleScanDelivery}
          activeOpacity={0.8}
        >
          <MaterialIcons name="local-shipping" size={24} color="#FFFFFF" />
          <Text style={styles.bottomButtonText}>Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomButton, styles.bottomButtonTag]}
          onPress={() => navigation.navigate('NFCReader')}
          activeOpacity={0.8}
        >
          <MaterialIcons name="nfc" size={24} color="#FFFFFF" />
          <Text style={styles.bottomButtonText}>Tag</Text>
        </TouchableOpacity>
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
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  defaultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  defaultCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  defaultCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  defaultCardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  quickActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quickActionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 10,
  },
  bottomButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
  },
  bottomButtonHarvest: {
    backgroundColor: '#34C759',
  },
  bottomButtonDelivery: {
    backgroundColor: '#007AFF',
  },
  bottomButtonTag: {
    backgroundColor: '#5856D6',
  },
  bottomButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
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
