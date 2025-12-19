import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';


const { width, height } = Dimensions.get('window');

type OnboardingXProps = { onContinue: () => void; onBack: () => void };
export default function OnboardingX({ onContinue, onBack }: OnboardingXProps) {

  return (
    <View style={styles.container}>
      {/* Lien Retour */}
      <TouchableOpacity style={styles.retourBtn} onPress={onBack}>
        <Text style={styles.retourText}>Retour</Text>
      </TouchableOpacity>

      {/* Vague verte en haut */}
      <View style={styles.bgTopWave} />

      {/* Sticker */}
      <View style={styles.illuBox}>
        <Image
          source={require('../../assets/stickers/consultation-en-ligne.png')}
          style={styles.sticker}
          resizeMode="contain"
        />
      </View>

      {/* Carte bleue en bas */}
      <View style={styles.card}>
        {/* Logo et nom */}
        <View style={styles.logoRow}>
          <Image
            source={require('../../assets/logo/logo-apam.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.brand}>AP.A.M</Text>
            <Text style={styles.desc}>ASSISTANT MÉDICAL</Text>
          </View>
        </View>

        {/* Titre */}
        <Text style={styles.title}>Consultez{'\n'}en ligne</Text>

        {/* Pagination */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        {/* Bouton continuer */}
        <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
          <Text style={styles.continueText}>continuer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: '#FFFFFF',
  },
  retourBtn: {
    position: 'absolute',
    top: 45,
    right: 20,
    zIndex: 10,
  },
  retourText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  bgTopWave: {
    width: '100%',
    height: height * 0.5,
    backgroundColor: '#64B5F6',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  illuBox: {
    marginTop: height * 0.15,
    alignSelf: 'center',
    width: width * 0.85,
    height: height * 0.35,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sticker: {
    width: '100%',
    height: '100%',
  },
  card: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#B8E5F7',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 50,
    alignItems: 'center',
    zIndex: 3,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 65,
    height: 65,
    marginRight: 12,
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#1791CC',
    letterSpacing: 2,
  },
  desc: {
    fontSize: 11,
    color: '#1791CC',
    marginTop: -2,
    letterSpacing: 1.5,
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    lineHeight: 36,
    color: '#1791CC',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
  dotActive: {
    backgroundColor: '#1791CC',
    opacity: 1,
  },
  continueBtn: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  continueText: {
    fontSize: 18,
    color: '#1791CC',
    fontWeight: '600',
  },
});