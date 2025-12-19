import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Button, IconButton, useTheme, FAB, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '@/config/api';

const medications = [
    {
        id: '1',
        name: 'Doliprane 1000mg',
        dosage: '1 comprimé',
        frequency: '3x par jour',
        times: ['08:00', '14:00', '20:00'],
        startDate: '10/03/2024',
        endDate: '17/03/2024',
        taken: [true, true, false],
        prescribedBy: 'Dr. Dubois',
    },
    {
        id: '2',
        name: 'Vitamine D',
        dosage: '1 gélule',
        frequency: '1x par jour',
        times: ['09:00'],
        startDate: '01/03/2024',
        endDate: 'Traitement continu',
        taken: [true],
        prescribedBy: 'Auto-ajouté',
    },
];

export default function MedicationTrackingScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [meds, setMeds] = useState(medications);
    const [patientId, setPatientId] = useState(1); // TODO: Get from auth
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMedications();
    }, []);

    const fetchMedications = async () => {
        setLoading(true);
        try {
            const data = await api.getPatientMedications(patientId);
            if (data && data.length > 0) {
                // Transform API data to match UI
                const transformed = data.map((med: any) => ({
                    id: med.id_suivi?.toString(),
                    name: med.nom_commercial,
                    dosage: med.dosage,
                    frequency: med.frequence,
                    times: ['08:00', '14:00', '20:00'], // TODO: Parse from frequence
                    startDate: new Date(med.date_debut).toLocaleDateString('fr-FR'),
                    endDate: med.date_fin ? new Date(med.date_fin).toLocaleDateString('fr-FR') : 'Traitement continu',
                    taken: [med.pris, false, false], // TODO: Better tracking
                    prescribedBy: 'Via ordonnance',
                }));
                setMeds(transformed);
            }
        } catch (error) {
            console.error('Failed to fetch medications:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTaken = async (medId: string, timeIndex: number) => {
        const updatedMeds = meds.map(med => {
            if (med.id === medId) {
                const newTaken = [...med.taken];
                newTaken[timeIndex] = !newTaken[timeIndex];

                // Update backend
                api.updateMedicationTracking(parseInt(medId), newTaken[timeIndex])
                    .catch(err => console.error('Failed to update:', err));

                return { ...med, taken: newTaken };
            }
            return med;
        });
        setMeds(updatedMeds);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>
                        Suivi Médicamenteux
                    </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Today's Schedule */}
                <Surface style={styles.todayCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <MaterialCommunityIcons name="calendar-today" size={24} color={theme.colors.primary} />
                        <Text variant="titleMedium" style={{ fontWeight: 'bold', marginLeft: 8 }}>
                            Aujourd'hui
                        </Text>
                    </View>
                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
                        {meds.reduce((acc, med) => acc + med.times.length, 0)} prises à effectuer
                    </Text>
                </Surface>

                {/* Medications List */}
                {meds.map((med) => (
                    <Surface key={med.id} style={styles.medCard}>
                        <View style={styles.medHeader}>
                            <View style={{ flex: 1 }}>
                                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
                                    {med.name}
                                </Text>
                                <Text variant="bodySmall" style={{ color: theme.colors.secondary, marginTop: 4 }}>
                                    {med.dosage} • {med.frequency}
                                </Text>
                                <Chip
                                    icon="doctor"
                                    style={{ backgroundColor: '#F5F5F5', marginTop: 8, alignSelf: 'flex-start' }}
                                    textStyle={{ fontSize: 11 }}
                                >
                                    {med.prescribedBy}
                                </Chip>
                            </View>
                            <IconButton
                                icon="pencil"
                                size={20}
                                onPress={() => router.push(`/(patient)/medications/edit/${med.id}` as any)}
                            />
                        </View>

                        {/* Time Schedule */}
                        <View style={styles.scheduleContainer}>
                            <Text variant="labelMedium" style={{ marginBottom: 8, color: theme.colors.secondary }}>
                                Horaires du jour
                            </Text>
                            {med.times.map((time, index) => (
                                <View key={index} style={styles.timeSlot}>
                                    <MaterialCommunityIcons
                                        name="clock-outline"
                                        size={20}
                                        color={theme.colors.secondary}
                                    />
                                    <Text variant="bodyMedium" style={{ marginLeft: 8, flex: 1 }}>
                                        {time}
                                    </Text>
                                    <Chip
                                        icon={med.taken[index] ? 'check' : 'close'}
                                        style={{
                                            backgroundColor: med.taken[index] ? '#E3F2FD' : '#FFEBEE',
                                        }}
                                        textStyle={{
                                            color: med.taken[index] ? '#42A5F5' : '#F44336',
                                        }}
                                        onPress={() => toggleTaken(med.id, index)}
                                    >
                                        {med.taken[index] ? 'Pris' : 'Non pris'}
                                    </Chip>
                                </View>
                            ))}
                        </View>

                        {/* Duration */}
                        <View style={styles.durationContainer}>
                            <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
                                Du {med.startDate} au {med.endDate}
                            </Text>
                        </View>
                    </Surface>
                ))}

                {meds.length === 0 && (
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons name="pill-off" size={64} color={theme.colors.secondary} />
                        <Text variant="titleMedium" style={{ color: theme.colors.secondary, marginTop: 16 }}>
                            Aucun médicament
                        </Text>
                        <Text variant="bodyMedium" style={{ color: theme.colors.secondary, marginTop: 8, textAlign: 'center' }}>
                            Ajoutez vos médicaments pour suivre vos prises
                        </Text>
                    </View>
                )}
            </ScrollView>

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => router.push('/(patient)/medications/add' as any)}
                label="Ajouter médicament"
            />
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
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    content: {
        padding: 20,
        paddingBottom: 100,
    },
    todayCard: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#E3F2FD',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#90CAF9',
    },
    medCard: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    medHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    scheduleContainer: {
        backgroundColor: '#F5F5F5',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
    },
    timeSlot: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    durationContainer: {
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 30,
    },
});
