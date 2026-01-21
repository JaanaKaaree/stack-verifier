/**
 * TypeScript interfaces for MATTR credential verification
 */

export interface DecodedCredential {
  iss: string;
  sub: string;
  binIdentifier: string;
  rowIdentifier: string;
  harvestStartDatetime: string;
  harvestEndDatetime: string;
  pickerId: string;
  pickerName: string;
  nzbn: string;
  orchardId: string;
  collectionId: string;
  jti: string;
}

export interface CredentialData {
  verified: boolean;
  decoded: DecodedCredential;
}

export interface FraudWarning {
  detected: boolean;
  message: string;
  deliveryDate?: string;
}

export interface VerificationResponse {
  success: boolean;
  data: CredentialData | null;
  error?: string;
  fraudWarning?: FraudWarning;
}

export interface ScanResult {
  type: string;
  data: string;
}
