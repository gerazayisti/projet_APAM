import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Searchbar, SegmentedButtons, FAB, useTheme, Surface, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Calendar from '@/components/common/Calendar';
import RecentVisitCard from '@/components/patient/RecentVisitCard';
import { api } from '@/config/api';

const upcomingAppointments = [
  {
    id: '1',
    doctorName: 'Dr. Martin',
    specialty: 'Radiologie',
    date: '18 Mars 2024',
    time: '10:00',
    location: 'Hôpital Principal',
    type: 'in-person' as const,
    status: 'upcoming' as const,
  },
  {
    id: '2',
    doctorName: 'Dr. ebene Claire',
    specialty: 'Cardiologie',
    date: '20 Mars 2024',
    time: '16:00',
    type: 'video' as const,
    status: 'upcoming' as const,
  },
  {
    id: '3',
    doctorName: 'Dr. Laurent kassongo',
    specialty: 'Dermatologie',
    date: '22 Mars 2024',
    time: '14:30',
    location: 'Cabinet Médical',
    type: 'in-person' as const,
    status: 'upcoming' as const,
  },
];

const pastAppointments = [
  {
    id: '4',
    doctorName: 'Dr. Ntsah Michel',
    specialty: 'Neurologie',
    date: '15 Mars 2024',
    time: '14:30',
    status: 'completed' as const,
    type: 'video' as const,
    location: 'Consultation Vidéo',
  },
  {
    id: '5',
    doctorName: 'Dr. Bernard Jean',
    specialty: 'Généraliste',
    date: '10 Mars 2024',
    time: '09:00',
    status: 'completed' as const,
    type: 'in-person' as const,
    location: 'Hôpital Central',
  },
  {
    id: '2',
    doctorName: 'Dr. Dubois Claire',
    specialty: 'Cardiologie',
    date: '10 Fév',
    time: '09:30',
    status: 'completed' as const,
    type: 'in-person' as const,
    location: 'Hôpital Central',
  },
];

export default function AppointmentsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const pastAppointmentDates = [1, 5, 12, 15, 18, 20];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.headerTitle}>Mes rendez-vous</Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>Gérez vos consultations</Text>

          <Searchbar
            placeholder="Rechercher un rendez-vous"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            elevation={0}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <SegmentedButtons
            value={selectedTab}
            onValueChange={setSelectedTab}
            buttons={[
              {
                value: 'upcoming',
                label: 'À venir',
                icon: 'calendar-clock',
              },
              {
                value: 'past',
                label: 'Passés',
                icon: 'history',
              },
            ]}
            style={styles.segmentedButtons}
          />
        </View>

        {/* Calendrier */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Calendrier</Text>
          <Calendar pastAppointmentDates={pastAppointmentDates} />
        </View>

        {/* Liste des rendez-vous */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {selectedTab === 'upcoming' ? 'Prochains rendez-vous' : 'Historique'}
            </Text>
          </View>

          <View style={styles.appointmentsList}>
            {selectedTab === 'upcoming' ? (
              upcomingAppointments.map((appointment) => (
                <RecentVisitCard
                  key={appointment.id}
                  doctorName={appointment.doctorName}
                  specialty={appointment.specialty}
                  date={appointment.date}
                  time={appointment.time}
                  location={appointment.location}
                  status={appointment.status}
                  visitType={appointment.type}
                  onBook={() => { }}
                />
              ))
            ) : (
              pastAppointments.map((appointment) => (
                <RecentVisitCard
                  key={appointment.id}
                  doctorName={appointment.doctorName}
                  specialty={appointment.specialty}
                  date={appointment.date}
                  time={appointment.time}
                  location={appointment.location}
                  status={appointment.status}
                  visitType={appointment.type}
                  onBook={() => { }}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        label="Prendre RDV"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color="#FFF"
        onPress={() => router.push('/(patient)/(tabs)/appointments' as any)} // Placeholder link
      />
    </View>
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
  searchBar: {
    marginTop: 16,
    backgroundColor: '#F5F9FB',
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 14,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  segmentedButtons: {
    marginBottom: 10,
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
    color: '#193759',
  },
  appointmentsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 30,
  },
});
