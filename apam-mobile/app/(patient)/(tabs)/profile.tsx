import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Surface, List, Avatar, Button, useTheme, Divider, Switch } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const medicalRecordItems = [
  {
    id: '1',
    title: 'Antécédents',
    icon: 'file-document-outline' as const,
    color: '#2196F3',
  },
  {
    id: '2',
    title: 'Allergies',
    icon: 'alert-circle-outline' as const,
    color: '#E91E63',
  },
  {
    id: '3',
    title: 'Ordonnances',
    icon: 'pill' as const,
    color: '#42A5F5',
  },
  {
    id: '4',
    title: 'Résultats',
    icon: 'flask-outline' as const,
    color: '#42A5F5',
  },
];

const authorizedDoctors = [
  {
    id: '1',
    name: 'Dr. Martin Sarah',
    specialty: 'Généraliste',
    accessLevel: 'Complet',
  },
  {
    id: '2',
    name: 'Dr. Dubois Claire',
    specialty: 'Cardiologie',
    accessLevel: 'Lecture seule',
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileHeader}>
            <Avatar.Text size={80} label="JD" style={{ backgroundColor: theme.colors.primary }} />
            <View style={{ marginLeft: 20, flex: 1 }}>
              <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>Jean Dupont</Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Né le 12/05/1985</Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Groupe Sanguin: O+</Text>
            </View>
          </View>
        </View>

        {/* Carnet Médical Virtuel */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Carnet Médical Virtuel</Text>
            <MaterialCommunityIcons name="shield-check" size={20} color={theme.colors.primary} />
          </View>

          <View style={styles.grid}>
            {medicalRecordItems.map((item) => (
              <Surface key={item.id} style={styles.gridItem} elevation={1}>
                <View style={[styles.gridIcon, { backgroundColor: item.color + '20' }]}>
                  <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
                </View>
                <Text variant="bodyMedium" style={{ marginTop: 8, fontWeight: '600' }}>{item.title}</Text>
              </Surface>
            ))}
          </View>
        </View>

        {/* Médecins Autorisés */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Médecins Autorisés</Text>
            <TouchableOpacity>
              <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Gérer</Text>
            </TouchableOpacity>
          </View>

          {authorizedDoctors.map((doctor) => (
            <Surface key={doctor.id} style={styles.doctorCard} elevation={0}>
              <Avatar.Text size={40} label={doctor.name.split(' ').map(n => n[0]).join('')} style={{ backgroundColor: theme.colors.secondaryContainer }} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>{doctor.name}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{doctor.specialty} • {doctor.accessLevel}</Text>
              </View>
              <Switch value={true} onValueChange={() => { }} color={theme.colors.primary} />
            </Surface>
          ))}

          <Button
            mode="outlined"
            onPress={() => { }}
            style={{ marginTop: 12, borderColor: theme.colors.primary }}
            textColor={theme.colors.primary}
            icon="account-plus"
          >
            Autoriser un nouveau médecin
          </Button>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          <List.Section>
            <List.Subheader style={styles.sectionTitle}>Paramètres</List.Subheader>
            <List.Item
              title="Notifications"
              left={props => <List.Icon {...props} icon="bell-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Sécurité & Confidentialité"
              left={props => <List.Icon {...props} icon="lock-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Aide & Support"
              left={props => <List.Icon {...props} icon="help-circle-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </List.Section>
        </View>

        {/* Logout */}
        <View style={{ padding: 20 }}>
          <Button
            mode="contained"
            onPress={() => router.replace('/(auth)/login' as any)}
            buttonColor={theme.colors.error}
            icon="logout"
            style={{ borderRadius: 8 }}
          >
            Se déconnecter
          </Button>
        </View>
      </ScrollView>
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
    paddingBottom: 30,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#193759',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  gridIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F9FB',
    borderRadius: 12,
    marginBottom: 8,
  },
});
