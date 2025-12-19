import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Surface, Button, useTheme, Avatar, Badge } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const consultationTypes = [
  {
    id: '1',
    title: 'Vidéo',
    description: 'Visio avec médecin',
    icon: 'videocam' as const,
    color: '#42A5F5',
  },
  {
    id: '2',
    title: 'Audio',
    description: 'Appel vocal',
    icon: 'call' as const,
    color: '#2196F3',
  },
  {
    id: '3',
    title: 'Chat',
    description: 'Messagerie',
    icon: 'chatbubbles' as const,
    color: '#42A5F5',
  },
];

const activeConsultations = [
  {
    id: '1',
    doctorName: 'Dr. Martin Sarah',
    specialty: 'Généraliste',
    date: 'Aujourd\'hui',
    time: '14:30',
    type: 'video' as const,
    status: 'upcoming' as const,
  },
];

export default function ConsultationsScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>Consultations</Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>Téléconsultations et chat</Text>
      </View>

      {/* Live Consultation (New Feature) */}
      <View style={styles.section}>
        <Surface style={[styles.liveCard, { backgroundColor: theme.colors.errorContainer }]} elevation={2}>
          <View style={styles.liveHeader}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>EN DIRECT</Text>
            </View>
            <Text variant="labelMedium" style={{ color: theme.colors.onErrorContainer }}>Salle d'attente ouverte</Text>
          </View>

          <View style={styles.doctorInfo}>
            <Avatar.Text size={48} label="DM" style={{ backgroundColor: theme.colors.primary }} />
            <View style={{ marginLeft: 12 }}>
              <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Dr. Martin Sarah</Text>
              <Text variant="bodyMedium">Généraliste • Vidéo</Text>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={() => { }}
            style={styles.joinBtn}
            buttonColor={theme.colors.error}
            icon="video"
          >
            Rejoindre la consultation
          </Button>
        </Surface>
      </View>

      {/* Types de consultation */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Nouvelle consultation</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typesScroll}>
          {consultationTypes.map((type) => (
            <Surface key={type.id} style={styles.typeCard} elevation={1}>
              <View style={[styles.typeIcon, { backgroundColor: type.color + '20' }]}>
                <Ionicons name={type.icon} size={28} color={type.color} />
              </View>
              <Text variant="titleSmall" style={styles.typeTitle}>{type.title}</Text>
              <Text variant="bodySmall" style={styles.typeDesc}>{type.description}</Text>
            </Surface>
          ))}
        </ScrollView>
      </View>

      {/* Liste des consultations à venir */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>À venir</Text>
        {activeConsultations.map((consultation) => (
          <Surface key={consultation.id} style={styles.consultationCard} elevation={1}>
            <View style={styles.consultationRow}>
              <View style={styles.dateBox}>
                <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>14</Text>
                <Text variant="bodySmall">30</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{consultation.doctorName}</Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>{consultation.specialty}</Text>
              </View>
              <Badge style={{ backgroundColor: theme.colors.primaryContainer, color: theme.colors.onPrimaryContainer }}>
                Confirmé
              </Badge>
            </View>
          </Surface>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#193759',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#193759',
  },
  liveCard: {
    borderRadius: 16,
    padding: 16,
  },
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFF',
    marginRight: 6,
  },
  liveText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  joinBtn: {
    borderRadius: 8,
  },
  typesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  typeCard: {
    width: 120,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  typeDesc: {
    textAlign: 'center',
    color: '#757575',
  },
  consultationCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
    marginBottom: 12,
  },
  consultationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    width: 50,
    height: 50,
  },
});
