/**
 * Result screen - Display verification results
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
import { CredentialCard } from '../components/CredentialCard';
import { RootStackParamList } from '../types/navigation.types';
import { VerificationResponse } from '../types/credential.types';

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
  route,
}) => {
  const { verificationResponse } = route.params;

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
    navigation.navigate('Scan');
  };

  const handleDone = () => {
    navigation.navigate('Home');
  };

  const handleReportFraud = () => {
    // TODO: Implement fraud reporting functionality
    alert('Fraud reporting feature coming soon');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          {isValid ? (
            <>
              <MaterialIcons name="check-circle" size={80} color="#34C759" />
              <Text style={styles.title}>Verified Zespri Product</Text>
            </>
          ) : (
            <>
              <MaterialIcons name="warning" size={80} color="#FF3B30" />
              <Text style={styles.titleWarning}>
                WARNING - COUNTERFEIT SUSPECTED
              </Text>
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
          <CredentialCard
            credentialData={verificationResponse.data}
            variant={isValid ? 'valid' : 'invalid'}
          />
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
});
