/**
 * Main App component with navigation setup
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { ScanScreen } from './src/screens/ScanScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { NFCReaderScreen } from './src/screens/NFCReaderScreen';
import { NFCResultScreen } from './src/screens/NFCResultScreen';
import { RootStackParamList, CredentialType, getCredentialTypeLabel } from './src/types/navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'MATTR Verifier',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Scan"
          component={ScanScreen}
          options={({ route }) => {
            const credentialType = (route.params as { credentialType?: CredentialType })?.credentialType;
            const label = getCredentialTypeLabel(credentialType);
            const title = `Scan ${label} Credential`;
            return {
              title,
              headerShown: true,
            };
          }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{
            title: 'Verification Result',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="NFCReader"
          component={NFCReaderScreen}
          options={{
            title: 'NFC Tag Reader',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="NFCResult"
          component={NFCResultScreen}
          options={{
            title: 'NFC Tag Data',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
