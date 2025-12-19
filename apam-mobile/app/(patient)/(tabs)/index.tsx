import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, Animated } from 'react-native';
import { Text, Button, Surface, IconButton, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ServiceCard from '@/components/patient/ServiceCard';
import SpecialtyCard from '@/components/patient/SpecialtyCard';
import RecentVisitCard from '@/components/patient/RecentVisitCard';
import ProgressCard from '@/components/common/ProgressCard';
import HealthInfoCard from '@/components/patient/HealthInfoCard';
import Calendar from '@/components/common/Calendar';
import { theme as appTheme } from '@/theme';

const { width } = Dimensions.get('window');

// Données des cartes de réduction
const promotionCards = [
  {
    id: '1',
    percentage: '115%',
    title: 'DE RÉDUCTION',
    subtitle: 'Obtenez votre première consultation gratuitement !',
    icon: 'medical' as const,
  },
  {
    id: '2',
    percentage: '20%',
    title: 'SUR LES ANALYSES',
    subtitle: 'Réduction sur tous vos examens médicaux',
    icon: 'flask' as const,
  },
  {
    id: '3',
    percentage: '70%',
    title: 'TÉLÉCONSULTATION',
    subtitle: 'Profitez de nos consultations en ligne',
    icon: 'videocam' as const,
  },
] as const;

const specialties = [
  { id: 'cardio', title: 'Cardiologie', icon: 'heart' as const, iconType: 'Ionicons' as const, color: appTheme.colors.primary },
  { id: 'pediatrie', title: 'Pédiatrie', icon: 'baby' as const, iconType: 'MaterialCommunityIcons' as const, color: appTheme.colors.primary },
  { id: 'urologie', title: 'Urologie', icon: 'medical' as const, iconType: 'Ionicons' as const, color: appTheme.colors.primary },
  { id: 'oncologie', title: 'Oncologie', icon: 'star' as const, iconType: 'Ionicons' as const, color: appTheme.colors.primary },
  { id: 'dermatologie', title: 'Dermatologie', icon: 'medical-bag' as const, iconType: 'MaterialCommunityIcons' as const, color: appTheme.colors.primary },
];

const recentVisits = [
  {
    id: '1',
    doctorName: 'Dr. Weber Michel',
    specialty: 'Neurologie',
    date: '15 Mars 2024',
    time: '14:30',
    location: 'Cabinet Central',
    status: 'completed' as const,
    visitType: 'video' as const,
  },
  {
    id: '2',
    doctorName: 'Dr. Martin Sarah',
    specialty: 'Radiologie',
    date: '18 Mars 2024',
    time: '10:00',
    location: 'Hôpital Principal',
    status: 'upcoming' as const,
    visitType: 'in-person' as const,
  },
];

const apamServices = [
  { id: 'journal', title: 'Journal de santé', icon: 'clipboard-text' as const, iconType: 'MaterialCommunityIcons' as const, color: appTheme.colors.primary, description: 'Suivez vos symptômes' },
  { id: 'medicaments', title: 'Médicaments', icon: 'pill' as const, iconType: 'MaterialCommunityIcons' as const, color: appTheme.colors.primary, description: 'Gérez vos traitements' },
  { id: 'dossier', title: 'Dossier médical', icon: 'folder' as const, iconType: 'Ionicons' as const, color: appTheme.colors.primary, description: 'Accès sécurisé' },
  { id: 'consultation', title: 'Consultation en ligne', icon: 'laptop' as const, iconType: 'Ionicons' as const, color: appTheme.colors.primary, description: 'Téléconsultation' },
];

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [opacity] = useState(new Animated.Value(1));
  const [prevCardIndex, setPrevCardIndex] = useState(0);
  const [dropAnimation] = useState(new Animated.Value(0));

  // Auto-chargement des cartes
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevCardIndex(currentCardIndex);
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % promotionCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentCardIndex]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, [currentCardIndex, opacity]);

  useEffect(() => {
    dropAnimation.setValue(0);
    if (currentCardIndex !== prevCardIndex) {
      Animated.timing(dropAnimation, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    }
  }, [currentCardIndex, prevCardIndex, dropAnimation]);

  const currentCard = promotionCards[currentCardIndex];
  const pastAppointmentDates = [1, 5, 12, 15, 18, 20];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.greeting}>
            <Surface style={styles.avatarSurface} elevation={1}>
              <Ionicons name="person" size={24} color={theme.colors.primary} />
            </Surface>
            <View>
              <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>Bonjour,</Text>
              <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Jean Dupont</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.sosBtn, { backgroundColor: theme.colors.error }]}>
              <Ionicons name="warning" size={20} color="#FFF" />
              <Text style={styles.sosText}>SOS</Text>
            </TouchableOpacity>
            <IconButton icon="bell-outline" size={24} onPress={() => { }} />
          </View>
        </View>

        <View style={[styles.searchContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Ionicons name="search" size={20} color={theme.colors.secondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.onSurface }]}
            placeholder="Rechercher un médecin, une spécialité..."
            placeholderTextColor={theme.colors.secondary}
          />
        </View>
      </View>

      {/* Actions Rapides */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(patient)/(tabs)/appointments' as any)}>
          <Surface style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]} elevation={0}>
            <Ionicons name="calendar" size={24} color={theme.colors.primary} />
          </Surface>
          <Text variant="labelSmall" style={styles.actionLabel}>Prendre RDV</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(patient)/prescriptions/index' as any)}>
          <Surface style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]} elevation={0}>
            <MaterialCommunityIcons name="pill" size={24} color="#42A5F5" />
          </Surface>
          <Text variant="labelSmall" style={styles.actionLabel}>Ordonnances</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(patient)/results/index' as any)}>
          <Surface style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]} elevation={0}>
            <Ionicons name="document-text" size={24} color="#42A5F5" />
          </Surface>
          <Text variant="labelSmall" style={styles.actionLabel}>Résultats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(patient)/teleconsultation/index' as any)}>
          <Surface style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]} elevation={0}>
            <Ionicons name="videocam" size={24} color="#42A5F5" />
          </Surface>
          <Text variant="labelSmall" style={styles.actionLabel}>Téléconsult.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(patient)/medications/index' as any)}>
          <Surface style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]} elevation={0}>
            <MaterialCommunityIcons name="pill-multiple" size={24} color="#42A5F5" />
          </Surface>
          <Text variant="labelSmall" style={styles.actionLabel}>Médicaments</Text>
        </TouchableOpacity>
      </View>

      {/* Prochain Rendez-vous (Prioritaire) */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Prochain rendez-vous</Text>
        </View>
        <RecentVisitCard
          doctorName="Dr. Martin Sarah"
          specialty="Radiologie"
          date="18 Mars 2024"
          time="10:00"
          location="Hôpital Principal"
          status="upcoming"
          visitType="in-person"
        />
      </View>

      {/* Stats & Suivi */}
      <View style={styles.statsSection}>
        <View style={styles.statsRow}>
          <ProgressCard
            percentage={82}
            label="Progression"
            description="4/5 médicaments"
          />
          <HealthInfoCard
            category="Constantes"
            title="Tension"
            subtitle="12/8 mmHg"
          />
        </View>
      </View>

      {/* Promotions (Banner) */}
      <View style={styles.promotionContainer}>
        <Animated.View style={[styles.banner, { opacity, backgroundColor: '#E3F2FD' }]}>
          <View style={styles.bannerContent}>
            <Text style={[styles.bannerPercentage, { color: theme.colors.primary }]}>{currentCard.percentage}</Text>
            <Text style={styles.bannerTitle}>{currentCard.title}</Text>
            <Text style={styles.bannerSubtitle}>{currentCard.subtitle}</Text>
            <Button mode="contained" compact style={styles.bannerBtn} labelStyle={{ fontSize: 12 }}>
              Voir l'offre
            </Button>
          </View>
          <View style={styles.bannerImage}>
            <Ionicons name={currentCard.icon} size={50} color={theme.colors.primary} />
          </View>
        </Animated.View>
      </View>

      {/* Spécialités */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Spécialiste Disponible</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specialtiesScroll}>
          {specialties.map((spec) => (
            <SpecialtyCard
              key={spec.id}
              title={spec.title}
              icon={spec.icon}
              iconType={spec.iconType}
              color={spec.color}
            />
          ))}
        </ScrollView>
      </View>

      {/* Services */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Services AP.A.M</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
          {apamServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              icon={service.icon}
              iconType={service.iconType}
              color={service.color}
              label="24/7"
              value=""
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarSurface: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sosBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  sosText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  actionItem: {
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  promotionContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  banner: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
  },
  bannerPercentage: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 12,
  },
  bannerBtn: {
    alignSelf: 'flex-start',
  },
  bannerImage: {
    marginLeft: 12,
  },
  specialtiesScroll: {
    paddingLeft: 20,
  },
  servicesScroll: {
    paddingLeft: 20,
  },
});
