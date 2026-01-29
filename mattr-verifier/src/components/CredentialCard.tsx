/**
 * Credential card component for displaying credential information
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CredentialData } from '../types/credential.types';
import { CredentialType, isDeliveryCredential } from '../types/navigation.types';

interface CredentialCardProps {
  credentialData: CredentialData;
  variant: 'valid' | 'invalid';
  credentialType?: CredentialType;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({
  credentialData,
  variant,
  credentialType = 'OrgPartHarvertCredential',
}) => {
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
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

  const isDelivery = isDeliveryCredential(credentialType);

  // Get the main identifier based on credential type
  const mainIdentifier = isDelivery 
    ? decoded.deliveryId || 'N/A'
    : decoded.binIdentifier || 'N/A';

  return (
    <View style={[styles.card, cardStyle]}>
      <View style={styles.headerRow}>
        <Text style={styles.packageId}>{mainIdentifier}</Text>
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>
            {isDelivery ? 'DELIVERY' : 'HARVEST'}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="assignment" size={20} color="#666" />
        <Text style={styles.label}>Collection ID:</Text>
        <Text style={styles.value}>{decoded.collectionId || 'N/A'}</Text>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="business" size={20} color="#666" />
        <Text style={styles.label}>NZBN:</Text>
        <Text style={styles.value}>{decoded.nzbn || 'N/A'}</Text>
      </View>

      {isDelivery ? (
        <>
          <View style={styles.row}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <Text style={styles.label}>Origin Address:</Text>
            <Text style={styles.value}>{decoded.originAddress || 'N/A'}</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="place" size={20} color="#666" />
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.value}>{decoded.destinationAddress || 'N/A'}</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="person" size={20} color="#666" />
            <Text style={styles.label}>Driver:</Text>
            <Text style={styles.value}>
              {decoded.driverName || 'N/A'} {decoded.driverId ? `(${decoded.driverId})` : ''}
            </Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="directions-car" size={20} color="#666" />
            <Text style={styles.label}>Vehicle ID:</Text>
            <Text style={styles.value}>{decoded.vehicleId || 'N/A'}</Text>
          </View>

          {decoded.deliveryStartDatetime && (
            <View style={styles.row}>
              <MaterialIcons name="access-time" size={20} color="#666" />
              <Text style={styles.label}>Delivery Start:</Text>
              <Text style={styles.value}>{formatDate(decoded.deliveryStartDatetime)}</Text>
            </View>
          )}

          {decoded.deliveryEndDatetime && (
            <View style={styles.row}>
              <MaterialIcons name="event" size={20} color="#666" />
              <Text style={styles.label}>Delivery End:</Text>
              <Text style={styles.value}>{formatDate(decoded.deliveryEndDatetime)}</Text>
            </View>
          )}
        </>
      ) : (
        <>
          {decoded.rowIdentifier && (
            <View style={styles.row}>
              <MaterialIcons name="label" size={20} color="#666" />
              <Text style={styles.label}>Row Identifier:</Text>
              <Text style={styles.value}>{decoded.rowIdentifier}</Text>
            </View>
          )}

          {decoded.orchardId && (
            <View style={styles.row}>
              <MaterialIcons name="location-on" size={20} color="#666" />
              <Text style={styles.label}>Orchard ID:</Text>
              <Text style={styles.value}>{decoded.orchardId}</Text>
            </View>
          )}

          {decoded.pickerName && decoded.pickerId && (
            <View style={styles.row}>
              <MaterialIcons name="person" size={20} color="#666" />
              <Text style={styles.label}>Picker:</Text>
              <Text style={styles.value}>{decoded.pickerName} ({decoded.pickerId})</Text>
            </View>
          )}

          {decoded.harvestStartDatetime && (
            <View style={styles.row}>
              <MaterialIcons name="access-time" size={20} color="#666" />
              <Text style={styles.label}>Harvest Start:</Text>
              <Text style={styles.value}>{formatDate(decoded.harvestStartDatetime)}</Text>
            </View>
          )}

          {decoded.harvestEndDatetime && (
            <View style={styles.row}>
              <MaterialIcons name="event" size={20} color="#666" />
              <Text style={styles.label}>Harvest End:</Text>
              <Text style={styles.value}>{formatDate(decoded.harvestEndDatetime)}</Text>
            </View>
          )}
        </>
      )}

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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  packageId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  typeBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  typeBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
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
