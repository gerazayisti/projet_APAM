import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simuler un chargement (2s), puis aller à l'onboarding
    setTimeout(() => {
      router.replace('/onboarding' as any);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/icon.png')}
        style={{ width: 120, height: 120, marginBottom: 30 }}
        resizeMode="contain"
      />
      <Text style={styles.title}>AP.A.M</Text>
      <Text style={styles.subtitle}>ASSISTANT MÉDICAL</Text>
      <Text style={styles.loading}>Chargement...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CBECF7',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1791CC',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#1791CC',
    marginTop: 10,
    letterSpacing: 1,
  },
  loading: {
    marginTop: 40,
    fontSize: 16,
    color: '#1791CC',
    fontStyle: 'italic',
  },
});
