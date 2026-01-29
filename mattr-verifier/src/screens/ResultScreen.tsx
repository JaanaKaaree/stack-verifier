/**
 * Result screen - Display verification results
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { CredentialCard } from '../components/CredentialCard';
import { RootStackParamList, CredentialType, getCredentialTypeLabel, isDeliveryCredential } from '../types/navigation.types';
import { VerificationResponse } from '../types/credential.types';
import { revokeCredential } from '../services/verificationService';

type ResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Result'
>;

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

interface ResultScreenProps {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  navigation,
}) => {
  // Use useRoute hook to get the latest route params (ensures we get updated params)
  const route = useRoute<ResultScreenRouteProp>();
  const { verificationResponse, credentialType, payload } = route.params;
  const credentialTypeLabel = getCredentialTypeLabel(credentialType);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const isDelivery = isDeliveryCredential(credentialType);

  // Log payload when component mounts or params change
  React.useEffect(() => {
    console.log('[ResultScreen] Route params updated');
    console.log('[ResultScreen] Payload:', payload ? `${payload.substring(0, 50)}...` : 'NOT AVAILABLE');
    console.log('[ResultScreen] Payload length:', payload?.length || 0);
    console.log('[ResultScreen] Credential Type:', credentialType);
    console.log('[ResultScreen] Full route params:', JSON.stringify({
      hasPayload: !!payload,
      payloadLength: payload?.length,
      credentialType,
    }));
  }, [payload, credentialType, route.params]);

  const isValid =
    verificationResponse.success &&
    verificationResponse.data?.verified === true;

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
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

  const handleScanAnother = () => {
    navigation.navigate('Scan', { credentialType: credentialType });
  };

  const handleDone = () => {
    navigation.navigate('Home');
  };

  const handleReportFraud = () => {
    // TODO: Implement fraud reporting functionality
    alert('Fraud reporting feature coming soon');
  };

  const handleAcceptDelivery = async () => {
    // Get fresh params from route to ensure we have the latest payload
    const currentPayload = route.params?.payload;
    const currentCredentialType = route.params?.credentialType;

    console.log('[ResultScreen] handleAcceptDelivery called');
    console.log('[ResultScreen] Current payload:', currentPayload ? `${currentPayload.substring(0, 50)}...` : 'NOT AVAILABLE');
    console.log('[ResultScreen] Current payload length:', currentPayload?.length || 0);
    console.log('[ResultScreen] Current credential type:', currentCredentialType);

    if (!currentPayload) {
      Alert.alert('Error', 'Payload not available. Please scan the credential again.');
      return;
    }

    if (!currentCredentialType) {
      Alert.alert('Error', 'Credential type not available.');
      return;
    }

    // Show confirmation dialog
    Alert.alert(
      'Accept Delivery',
      'Are you sure you want to accept and revoke this delivery credential?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Accept',
          style: 'default',
          onPress: async () => {
            try {
              console.log('[ResultScreen] Calling revokeCredential with payload:', currentPayload.substring(0, 50) + '...');
              const result = await revokeCredential(currentPayload, currentCredentialType);
              
              if (result.success) {
                Alert.alert(
                  'Success',
                  'Delivery credential has been accepted and revoked successfully.',
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.navigate('Home'),
                    },
                  ]
                );
              } else {
                Alert.alert(
                  'Error',
                  result.error || 'Failed to revoke credential. Please try again.'
                );
              }
            } catch (error) {
              console.error('[ResultScreen] Error revoking credential:', error);
              Alert.alert('Error', 'An unexpected error occurred. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleViewRawJson = () => {
    console.log('[ResultScreen] View Raw JSON button pressed');
    console.log('[ResultScreen] Verification response:', verificationResponse);
    setShowJsonModal(true);
  };

  const handleCloseJsonModal = () => {
    setShowJsonModal(false);
  };

  const getRawJsonString = (): string => {
    try {
      if (!verificationResponse.data) {
        const json = JSON.stringify(verificationResponse, null, 2);
        console.log('[ResultScreen] Raw JSON (full response):', json);
        return json;
      }
      const json = JSON.stringify(verificationResponse.data, null, 2);
      console.log('[ResultScreen] Raw JSON (credential data):', json);
      return json;
    } catch (error) {
      console.error('[ResultScreen] Error stringifying JSON:', error);
      return 'Error displaying JSON data';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          {isValid ? (
            <>
              <MaterialIcons name="check-circle" size={80} color="#34C759" />
              <Text style={styles.title}>Verified {credentialTypeLabel} Credential</Text>
            </>
          ) : (
            <>
              <MaterialIcons name="warning" size={80} color="#FF3B30" />
              <Text style={styles.titleWarning}>
                WARNING - COUNTERFEIT SUSPECTED
              </Text>
              <Text style={styles.credentialTypeLabel}>{credentialTypeLabel} Credential</Text>
            </>
          )}
        </View>

        {verificationResponse.fraudWarning?.detected && (
          <View style={styles.fraudWarning}>
            <MaterialIcons name="error" size={24} color="#FF3B30" />
            <Text style={styles.fraudWarningText}>
              {verificationResponse.fraudWarning.message}
            </Text>
            {verificationResponse.fraudWarning.deliveryDate && (
              <Text style={styles.deliveryDate}>
                Originally delivered: {formatDate(verificationResponse.fraudWarning.deliveryDate)}
              </Text>
            )}
          </View>
        )}

        {verificationResponse.data && (
          <>
            <CredentialCard
              credentialData={verificationResponse.data}
              variant={isValid ? 'valid' : 'invalid'}
              credentialType={credentialType}
            />
            <TouchableOpacity
              style={styles.viewJsonButton}
              onPress={handleViewRawJson}
            >
              <MaterialIcons name="code" size={20} color="#007AFF" />
              <Text style={styles.viewJsonButtonText}>View Raw JSON</Text>
            </TouchableOpacity>
          </>
        )}

        {verificationResponse.error && !verificationResponse.data && (
          <View style={styles.errorBox}>
            <MaterialIcons name="error-outline" size={48} color="#FF3B30" />
            <Text style={styles.errorText}>{verificationResponse.error}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          {isValid ? (
            <>
              {isDelivery && (
                <TouchableOpacity
                  style={styles.acceptDeliveryButton}
                  onPress={handleAcceptDelivery}
                >
                  <MaterialIcons name="check-circle" size={24} color="#FFFFFF" />
                  <Text style={styles.acceptDeliveryButtonText}>Accept Delivery</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleScanAnother}
              >
                <Text style={styles.secondaryButtonText}>Scan Another</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={handleDone}>
                <Text style={styles.primaryButtonText}>Done</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {verificationResponse.fraudWarning?.detected && (
                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={handleReportFraud}
                >
                  <MaterialIcons name="report" size={20} color="#FFFFFF" />
                  <Text style={styles.reportButtonText}>Report Fraud</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleScanAnother}
              >
                <Text style={styles.secondaryButtonText}>Scan Another</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showJsonModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseJsonModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Raw JSON</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseJsonModal}
              >
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView 
              style={styles.jsonContainer}
              contentContainerStyle={styles.jsonContent}
            >
              <Text style={styles.jsonText} selectable={true}>
                {getRawJsonString()}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759',
    marginTop: 16,
    textAlign: 'center',
  },
  titleWarning: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginTop: 16,
    textAlign: 'center',
  },
  credentialTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  fraudWarning: {
    backgroundColor: '#FFF0F0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FF3B30',
    alignItems: 'center',
  },
  fraudWarningText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  deliveryDate: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  errorBox: {
    alignItems: 'center',
    padding: 24,
    marginVertical: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    marginTop: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F2F2F7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  },
  reportButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  acceptDeliveryButton: {
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 8,
  },
  acceptDeliveryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  viewJsonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 8,
    gap: 8,
  },
  viewJsonButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    minHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  jsonContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  jsonContent: {
    padding: 16,
    flexGrow: 1,
  },
  jsonText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 14,
    color: '#000000',
    lineHeight: 22,
  },
});
