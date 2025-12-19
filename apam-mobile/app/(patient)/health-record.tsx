import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Chip, Divider, useTheme, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock data
const medicalRecord = {
    patient: {
        name: 'Sophie Martin',
        birthDate: '15/03/1990',
        bloodType: 'A+',
        allergies: ['Pénicilline', 'Arachides'],
    },
    medicalHistory: [
        { id: '1', date: '10/01/2024', condition: 'Grippe saisonnière', doctor: 'Dr. Dubois' },
        { id: '2', date: '05/12/2023', condition: 'Contrôle annuel', doctor: 'Dr. Martin' },
        { id: '3', date: '20/09/2023', condition: 'Entorse cheville', doctor: 'Dr. Laurent' },
    ],
    currentTreatments: [
        { id: '1', name: 'Doliprane 1000mg', dosage: '1 comprimé 3x/jour', startDate: '10/01/2024' },
    ],
    vaccinations: [
        { id: '1', name: 'COVID-19', date: '15/10/2023', nextDue: '15/10/2024' },
        { id: '2', name: 'Grippe', date: '01/11/2023', nextDue: '01/11/2024' },
    ],
};

export default function HealthRecordScreen() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>Carnet de Santé</Text>
                </View>
                <Chip icon="lock" style={{ backgroundColor: '#E3F2FD' }} textStyle={{ color: '#42A5F5' }}>
                    Lecture seule
                </Chip>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Patient Info */}
                <Surface style={styles.card} elevation={1}>
                    <Text variant="titleMedium" style={styles.cardTitle}>Informations Personnelles</Text>
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="account" size={20} color={theme.colors.primary} />
                        <Text style={styles.infoText}>{medicalRecord.patient.name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="calendar" size={20} color={theme.colors.primary} />
                        <Text style={styles.infoText}>Né(e) le {medicalRecord.patient.birthDate}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="water" size={20} color={theme.colors.primary} />
                        <Text style={styles.infoText}>Groupe sanguin: {medicalRecord.patient.bloodType}</Text>
                    </View>
                </Surface>

                {/* Allergies */}
                <Surface style={styles.card} elevation={1}>
                    <Text variant="titleMedium" style={styles.cardTitle}>Allergies</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {medicalRecord.patient.allergies.map((allergy, index) => (
                            <Chip key={index} icon="alert-circle" style={{ backgroundColor: '#FFEBEE' }} textStyle={{ color: '#F44336' }}>
                                {allergy}
                            </Chip>
                        ))}
                    </View>
                </Surface>

                {/* Current Treatments */}
                <Surface style={styles.card} elevation={1}>
                    <Text variant="titleMedium" style={styles.cardTitle}>Traitements en Cours</Text>
                    {medicalRecord.currentTreatments.map((treatment) => (
                        <View key={treatment.id} style={styles.treatmentItem}>
                            <MaterialCommunityIcons name="pill" size={24} color="#42A5F5" />
                            <View style={{ marginLeft: 12, flex: 1 }}>
                                <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>{treatment.name}</Text>
                                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{treatment.dosage}</Text>
                                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>Depuis le {treatment.startDate}</Text>
                            </View>
                        </View>
                    ))}
                </Surface>

                {/* Medical History */}
                <Surface style={styles.card} elevation={1}>
                    <Text variant="titleMedium" style={styles.cardTitle}>Historique Médical</Text>
                    {medicalRecord.medicalHistory.map((visit, index) => (
                        <View key={visit.id}>
                            <View style={styles.historyItem}>
                                <View>
                                    <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>{visit.condition}</Text>
                                    <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{visit.doctor}</Text>
                                    <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{visit.date}</Text>
                                </View>
                            </View>
                            {index < medicalRecord.medicalHistory.length - 1 && <Divider style={{ marginVertical: 12 }} />}
                        </View>
                    ))}
                </Surface>

                {/* Vaccinations */}
                <Surface style={styles.card} elevation={1}>
                    <Text variant="titleMedium" style={styles.cardTitle}>Vaccinations</Text>
                    {medicalRecord.vaccinations.map((vaccine) => (
                        <View key={vaccine.id} style={styles.vaccineItem}>
                            <MaterialCommunityIcons name="needle" size={24} color="#42A5F5" />
                            <View style={{ marginLeft: 12, flex: 1 }}>
                                <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>{vaccine.name}</Text>
                                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>Dernière dose: {vaccine.date}</Text>
                                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>Prochain rappel: {vaccine.nextDue}</Text>
                            </View>
                        </View>
                    ))}
                </Surface>
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
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        padding: 20,
    },
    card: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#193759',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoText: {
        marginLeft: 12,
        fontSize: 16,
    },
    treatmentItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    historyItem: {
        paddingVertical: 4,
    },
    vaccineItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
});
