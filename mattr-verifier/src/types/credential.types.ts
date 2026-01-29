/**
 * TypeScript interfaces for MATTR credential verification
 */

export interface DecodedCredential {
  iss: string;
  sub: string;
  jti: string;
  nzbn: string;
  collectionId: string;
  
  // Harvest credential fields
  binIdentifier?: string;
  rowIdentifier?: string;
  harvestStartDatetime?: string;
  harvestEndDatetime?: string;
  pickerId?: string;
  pickerName?: string;
  orchardId?: string;
  
  // Delivery credential fields
  deliveryId?: string;
  originAddress?: string;
  destinationAddress?: string;
  deliveryStartDatetime?: string;
  deliveryEndDatetime?: string;
  driverId?: string;
  driverName?: string;
  vehicleId?: string;
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
