/**
 * Verification service for MATTR credentials
 * Handles API calls to the verification backend
 */

import axios, { AxiosError } from 'axios';
import { API_BASE_URL, VERIFICATION_ENDPOINT, API_TIMEOUT, ERROR_MESSAGES } from '../constants/config';
import { VerificationResponse } from '../types/credential.types';

/**
 * Verifies a credential by calling the backend API
 * @param qrData - The QR code data scanned from the credential
 * @returns Promise resolving to VerificationResponse
 */
export const verifyCredential = async (qrData: string): Promise<VerificationResponse> => {
  const apiUrl = `${API_BASE_URL}${VERIFICATION_ENDPOINT}`;
  const requestBody = {
    payload: qrData,
  };

  console.log('[VerificationService] Starting verification...');
  console.log('[VerificationService] API URL:', apiUrl);
  console.log('[VerificationService] QR Data (payload):', qrData.substring(0, 50) + '...');

  try {
    const response = await axios.post(
      apiUrl,
      requestBody,
      {
        timeout: API_TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('[VerificationService] Response status:', response.status);
    console.log('[VerificationService] Response data:', JSON.stringify(response.data, null, 2));

    // Handle successful response (201 Created or 200 OK)
    if (response.status === 201 || response.status === 200) {
      const responseData = response.data;
      
      // Check if response has the expected structure
      if (responseData?.data && typeof responseData.data === 'object') {
        const credentialData = responseData.data;
        
        // If verified is false, treat as fraud/unverified
        if (credentialData.verified === false) {
          return {
            success: false,
            data: credentialData,
            error: 'Credential verification failed',
            fraudWarning: {
              detected: true,
              message: 'This credential could not be verified.',
            },
          };
        }
        
        // Successfully verified
        return {
          success: true,
          data: credentialData,
        };
      }
      
      // Unexpected response structure
      return {
        success: false,
        data: null,
        error: ERROR_MESSAGES.API_ERROR,
      };
    }

    // Unexpected status code
    return {
      success: false,
      data: null,
      error: ERROR_MESSAGES.API_ERROR,
    };
  } catch (error) {
    console.error('[VerificationService] Error occurred:', error);
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      console.error('[VerificationService] Axios error details:');
      console.error('  - Code:', axiosError.code);
      console.error('  - Message:', axiosError.message);
      console.error('  - Response:', axiosError.response?.status, axiosError.response?.statusText);
      console.error('  - Response data:', axiosError.response?.data);

      // Network error
      if (!axiosError.response) {
        console.error('[VerificationService] Network error - no response received');
        console.error('  - This usually means the server is unreachable or the URL is incorrect');
        console.error('  - Check if API_BASE_URL is correct:', API_BASE_URL);
        return {
          success: false,
          data: null,
          error: ERROR_MESSAGES.NETWORK_ERROR,
        };
      }

      // Timeout error
      if (axiosError.code === 'ECONNABORTED') {
        return {
          success: false,
          data: null,
          error: ERROR_MESSAGES.TIMEOUT_ERROR,
        };
      }

      // HTTP error response
      if (axiosError.response.status >= 400) {
        const responseData = axiosError.response.data as { error?: string; message?: string } | undefined;
        const errorMessage =
          responseData?.error ||
          responseData?.message ||
          ERROR_MESSAGES.API_ERROR;

        return {
          success: false,
          data: null,
          error: errorMessage,
        };
      }
    }

    // Unknown error
    return {
      success: false,
      data: null,
      error: ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};
