/**
 * Credential card component for displaying credential information
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CredentialData } from '../types/credential.types';

interface CredentialCardProps {
  credentialData: CredentialData;
  variant: 'valid' | 'invalid';
}

export const CredentialCard: React.FC<CredentialCardProps> = ({
  credentialData,
  variant,
}) => {
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const cardStyle =
    variant === 'valid' ? styles.validCard : styles.invalidCard;
  const statusColor = variant === 'valid' ? '#34C759' : '#FF3B30';
  const decoded = credentialData.decoded;

  return (
    <View style={[styles.card, cardStyle]}>
      <Text style={styles.packageId}>{decoded.binIdentifier}</Text>

      <View style={styles.row}>
        <MaterialIcons name="assignment" size={20} color="#666" />
        <Text style={styles.label}>Collection ID:</Text>
        <Text style={styles.value}>{decoded.collectionId}</Text>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="label" size={20} color="#666" />
        <Text style={styles.label}>Row Identifier:</Text>
        <Text style={styles.value}>{decoded.rowIdentifier}</Text>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="location-on" size={20} color="#666" />
        <Text style={styles.label}>Orchard ID:</Text>
        <Text style={styles.value}>{decoded.orchardId}</Text>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="business" size={20} color="#666" />
        <Text style={styles.label}>NZBN:</Text>
        <Text style={styles.value}>{decoded.nzbn}</Text>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="person" size={20} color="#666" />
        <Text style={styles.label}>Picker:</Text>
        <Text style={styles.value}>{decoded.pickerName} ({decoded.pickerId})</Text>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="access-time" size={20} color="#666" />
        <Text style={styles.label}>Harvest Start:</Text>
        <Text style={styles.value}>{formatDate(decoded.harvestStartDatetime)}</Text>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="event" size={20} color="#666" />
        <Text style={styles.label}>Harvest End:</Text>
        <Text style={styles.value}>{formatDate(decoded.harvestEndDatetime)}</Text>
      </View>

      <View style={styles.statusBadge}>
        <View
          style={[styles.statusIndicator, { backgroundColor: statusColor }]}
        />
        <Text style={[styles.statusText, { color: statusColor }]}>
          {credentialData.verified ? 'VERIFIED' : 'UNVERIFIED'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  validCard: {
    backgroundColor: '#F0F9F4',
  },
  invalidCard: {
    backgroundColor: '#FFF0F0',
  },
  packageId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 8,
    marginRight: 8,
  },
  value: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
