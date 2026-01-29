/**
 * Navigation type definitions for React Navigation
 */

import { VerificationResponse } from './credential.types';

export type NFCTagData = {
  nzbn: string;
  location_id: string;
  location_name: string;
  bin_id: string;
  row_id: string;
};

export type CredentialType = 'OrgPartHarvertCredential' | 'DeliveryCredential';

/**
 * Gets a user-friendly label for a credential type
 */
export const getCredentialTypeLabel = (credentialType?: CredentialType): string => {
  if (!credentialType) return 'Credential';
  return credentialType === 'DeliveryCredential' ? 'Delivery' : 'Harvest';
};

/**
 * Checks if a credential type is a delivery credential
 */
export const isDeliveryCredential = (credentialType?: CredentialType): boolean => {
  return credentialType === 'DeliveryCredential';
};

export type RootStackParamList = {
  Home: undefined;
  Scan: {
    credentialType?: CredentialType;
  };
  Result: {
    verificationResponse: VerificationResponse;
    credentialType?: CredentialType;
    payload?: string; // QR code payload for revocation
  };
  NFCReader: undefined;
  NFCResult: {
    tagData: NFCTagData;
  };
};
