import { Stack, useRouter, useSegments, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { store } from '../store/store';
import { theme } from '../theme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const unstable_settings = {
  initialRouteName: '(onboarding)',
};

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasSeen = await AsyncStorage.getItem('hasSeenOnboarding');
        setIsReady(true);

        // Use setTimeout to defer navigation until after mount
        setTimeout(() => {
          if (hasSeen !== 'true') {
            router.replace('/(onboarding)' as any);
          } else {
            // Only redirect if we are at the root or onboarding
            if ((segments as string[]).length === 0 || (segments as string[])[0] === '(onboarding)') {
              router.replace('/(auth)/login' as any);
            }
          }
        }, 0);
      } catch (e) {
        console.error(e);
        setIsReady(true);
      }
    };

    checkOnboarding();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme as any}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(patient)" />
          <Stack.Screen name="(doctor)" />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </Provider>
  );
}
