import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Button, TextInput, IconButton, useTheme, Avatar, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const doctorProfile = {
    name: 'Dr. Jean Martin',
    specialty: 'Cardiologie',
    license: 'RPPS: 123456789',
    email: 'atangana.martin@apam.com',
    phone: '+237 6 22 34 56 78',
    cabinet: 'Hopital Médical Central, yaounde',
    stats: {
        patients: 127,
        consultations: 45,
    },
};

export default function DoctorProfileScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" onPress={() => router.back()} />
                <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759', flex: 1 }}>
                    Mon Profil
                </Text>
                <IconButton
                    icon={isEditing ? 'check' : 'pencil'}
                    onPress={() => setIsEditing(!isEditing)}
                    iconColor={theme.colors.primary}
                />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Header */}
                <Surface style={styles.profileCard}>
                    <Avatar.Text
                        size={80}
                        label="JM"
                        style={{ backgroundColor: '#E3F2FD', alignSelf: 'center' }}
                        labelStyle={{ color: '#42A5F5', fontSize: 32 }}
                    />
                    <Text variant="headlineSmall" style={{ textAlign: 'center', marginTop: 16, fontWeight: 'bold' }}>
                        {doctorProfile.name}
                    </Text>
                    <Text variant="bodyLarge" style={{ textAlign: 'center', color: theme.colors.secondary, marginTop: 4 }}>
                        {doctorProfile.specialty}
                    </Text>
                    <Text variant="bodySmall" style={{ textAlign: 'center', color: theme.colors.secondary, marginTop: 4 }}>
                        {doctorProfile.license}
                    </Text>
                </Surface>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <Surface style={styles.statCard}>
                        <MaterialCommunityIcons name="account-group" size={32} color="#42A5F5" />
                        <Text variant="headlineMedium" style={{ fontWeight: 'bold', marginTop: 8 }}>
                            {doctorProfile.stats.patients}
                        </Text>
                        <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
                            Patients suivis
                        </Text>
                    </Surface>
                    <Surface style={styles.statCard}>
                        <MaterialCommunityIcons name="calendar-check" size={32} color="#42A5F5" />
                        <Text variant="headlineMedium" style={{ fontWeight: 'bold', marginTop: 8 }}>
                            {doctorProfile.stats.consultations}
                        </Text>
                        <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
                            Ce mois-ci
                        </Text>
                    </Surface>
                </View>

                {/* Contact Info */}
                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Coordonnées</Text>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="email" size={20} color={theme.colors.primary} />
                        <Text variant="bodyMedium" style={{ marginLeft: 12 }}>
                            {doctorProfile.email}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="phone" size={20} color={theme.colors.primary} />
                        <Text variant="bodyMedium" style={{ marginLeft: 12 }}>
                            {doctorProfile.phone}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="map-marker" size={20} color={theme.colors.primary} />
                        <Text variant="bodyMedium" style={{ marginLeft: 12, flex: 1 }}>
                            {doctorProfile.cabinet}
                        </Text>
                    </View>
                </Surface>

                {/* Settings */}
                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Paramètres</Text>

                    <Button
                        mode="outlined"
                        icon="bell-outline"
                        onPress={() => { }}
                        style={styles.settingButton}
                        contentStyle={{ justifyContent: 'flex-start' }}
                    >
                        Notifications
                    </Button>

                    <Button
                        mode="outlined"
                        icon="clock-outline"
                        onPress={() => { }}
                        style={styles.settingButton}
                        contentStyle={{ justifyContent: 'flex-start' }}
                    >
                        Horaires de consultation
                    </Button>

                    <Button
                        mode="outlined"
                        icon="translate"
                        onPress={() => { }}
                        style={styles.settingButton}
                        contentStyle={{ justifyContent: 'flex-start' }}
                    >
                        Langue
                    </Button>
                </Surface>

                {/* Logout */}
                <Button
                    mode="contained"
                    icon="logout"
                    onPress={() => router.replace('/(auth)/login' as any)}
                    style={styles.logoutButton}
                    buttonColor={theme.colors.error}
                >
                    Déconnexion
                </Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 8,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        padding: 20,
    },
    profileCard: {
        padding: 24,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    card: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    sectionTitle: {
        fontWeight: 'bold',
        color: '#193759',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    settingButton: {
        marginBottom: 8,
    },
    logoutButton: {
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 32,
    },
});
