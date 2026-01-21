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

export type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  Result: {
    verificationResponse: VerificationResponse;
  };
  NFCReader: undefined;
  NFCResult: {
    tagData: NFCTagData;
  };
};
