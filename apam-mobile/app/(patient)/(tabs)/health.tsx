import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Surface, FAB, useTheme, Chip, IconButton } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProgressCard from '@/components/common/ProgressCard';
import HealthInfoCard from '@/components/patient/HealthInfoCard';
import { api } from '@/config/api';

const { width } = Dimensions.get('window');

const healthMetrics = [
  {
    id: '1',
    title: 'Tension',
    value: '120/80',
    unit: 'mmHg',
    icon: 'heart-pulse' as const,
    status: 'normal',
    color: '#E91E63',
  },
  {
    id: '2',
    title: 'Glycémie',
    value: '5.5',
    unit: 'mmol/L',
    icon: 'water' as const,
    status: 'normal',
    color: '#2196F3',
  },
  {
    id: '3',
    title: 'Poids',
    value: '72',
    unit: 'kg',
    icon: 'scale' as const,
    status: 'normal',
    color: '#42A5F5',
  },
  {
    id: '4',
    title: 'Temp.',
    value: '36.6',
    unit: '°C',
    icon: 'thermometer' as const,
    status: 'normal',
    color: '#42A5F5',
  },
];

const healthEntries = [
  {
    id: '1',
    date: '15 Mars 2024',
    type: 'symptome',
    description: 'Maux de tête légers',
    value: '3/10',
    icon: 'medical' as const,
  },
  {
    id: '2',
    date: '14 Mars 2024',
    type: 'mesure',
    description: 'Tension artérielle',
    value: '120/80',
    icon: 'stats-chart' as const,
  },
];

export default function HealthScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [patientId, setPatientId] = useState(1); // TODO: Get from auth
  const [entries, setEntries] = useState(healthEntries);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJournal();
  }, []);

  const fetchJournal = async () => {
    setLoading(true);
    try {
      const data = await api.getHealthJournal(patientId);
      if (data && data.length > 0) {
        // Transform API data to match UI format
        const transformed = data.map((entry: any) => ({
          id: entry.id_entree?.toString(),
          date: new Date(entry.date_entree).toLocaleDateString('fr-FR'),
          type: entry.niveau_douleur ? 'symptome' : 'mesure',
          description: entry.description,
          value: entry.niveau_douleur ? `${entry.niveau_douleur}/10` : entry.humeur,
          icon: 'medical' as const,
        }));
        setEntries(transformed);
      }
    } catch (error) {
      console.error('Failed to fetch health journal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.headerTitle}>Santé</Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>Suivi quotidien</Text>
        </View>

        {/* Cartes de progression */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            <ProgressCard
              percentage={75}
              label="Objectif santé"
              description="3/4 objectifs"
            />
            <HealthInfoCard
              category="Bien-être"
              title="Excellent"
              subtitle="État général"
            />
          </View>
        </View>

        {/* Indicateurs */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Mes constantes</Text>
          <View style={styles.metricsGrid}>
            {healthMetrics.map((metric) => (
              <Surface key={metric.id} style={styles.metricCard} elevation={1}>
                <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                  <MaterialCommunityIcons name={metric.icon} size={24} color={metric.color} />
                </View>
                <Text variant="bodySmall" style={{ marginTop: 8, color: theme.colors.secondary }}>{metric.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{metric.value}</Text>
                  <Text variant="bodySmall" style={{ marginLeft: 2 }}>{metric.unit}</Text>
                </View>
              </Surface>
            ))}
          </View>
        </View>

        {/* Filtres */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 20 }}>
            {['Tout', 'Symptômes', 'Mesures', 'Notes'].map((filter) => (
              <Chip
                key={filter}
                selected={selectedFilter === filter}
                onPress={() => setSelectedFilter(filter)}
                style={{ marginRight: 8 }}
                showSelectedOverlay
              >
                {filter}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* Journal */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Journal</Text>
          {healthEntries.map((entry) => (
            <Surface key={entry.id} style={styles.entryCard} elevation={0}>
              <View style={[styles.entryIcon, { backgroundColor: theme.colors.secondaryContainer }]}>
                <Ionicons name={entry.icon} size={20} color={theme.colors.onSecondaryContainer} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>{entry.description}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{entry.date}</Text>
              </View>
              <Text variant="labelLarge" style={{ fontWeight: 'bold', color: theme.colors.primary }}>{entry.value}</Text>
            </Surface>
          ))}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color="#FFF"
        onPress={() => { }}
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
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 12,
    fontWeight: 'bold',
    color: '#193759',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  metricCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    marginTop: 24,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#F5F9FB',
  },
  entryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 30,
  },
});
