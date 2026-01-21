/**
 * NFC Result screen - Displays NFC tag data
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation.types';

type NFCResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NFCResult'
>;

type NFCResultScreenRouteProp = RouteProp<RootStackParamList, 'NFCResult'>;

interface NFCResultScreenProps {
  navigation: NFCResultScreenNavigationProp;
  route: NFCResultScreenRouteProp;
}

export const NFCResultScreen: React.FC<NFCResultScreenProps> = ({
  navigation,
  route,
}) => {
  const { tagData } = route.params;

  const renderDataRow = (label: string, value: string, icon: string) => (
    <View style={styles.dataRow}>
      <View style={styles.dataLabelContainer}>
        <MaterialIcons name={icon as any} size={20} color="#007AFF" />
        <Text style={styles.dataLabel}>{label}</Text>
      </View>
      <Text style={styles.dataValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.successBadge}>
            <MaterialIcons name="check-circle" size={64} color="#34C759" />
          </View>

          <Text style={styles.title}>Tag Read Successfully!</Text>
          <Text style={styles.subtitle}>Location Information</Text>

          <View style={styles.dataContainer}>
            {renderDataRow(
              'NZBN',
              tagData.nzbn,
              'business'
            )}
            {renderDataRow(
              'Location ID',
              tagData.location_id,
              'location-on'
            )}
            {renderDataRow(
              'Location Name',
              tagData.location_name,
              'place'
            )}
            {renderDataRow(
              'Bin ID',
              tagData.bin_id,
              'inventory-2'
            )}
            {renderDataRow(
              'Row ID',
              tagData.row_id,
              'view-agenda'
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.readAgainButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="nfc" size={24} color="#007AFF" />
              <Text style={styles.readAgainButtonText}>Read Another Tag</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.navigate('Home')}
            >
              <MaterialIcons name="home" size={24} color="#666666" />
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  successBadge: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 32,
    textAlign: 'center',
  },
  dataContainer: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataRow: {
    marginBottom: 20,
  },
  dataLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dataLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dataValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    marginLeft: 28,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  readAgainButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  readAgainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  homeButton: {
    backgroundColor: '#F2F2F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  homeButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
