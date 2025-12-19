import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Chip, IconButton, useTheme, Button, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const teleconsultations = [
    {
        id: '1',
        doctor: 'Dr. Claire Ebene',
        specialty: 'Cardiologie',
        date: '20 Mars 2024',
        time: '16:00',
        status: 'upcoming',
        duration: '30 min',
    },
    {
        id: '2',
        doctor: 'Dr. Michel Ntsah',
        specialty: 'Neurologie',
        date: '15 Mars 2024',
        time: '14:30',
        status: 'completed',
        duration: '45 min',
        notes: 'Consultation de suivi, tout va bien',
    },
];

export default function TeleconsultationScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [filter, setFilter] = useState<'upcoming' | 'completed'>('upcoming');

    const filteredConsultations = teleconsultations.filter(c => c.status === filter);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>Téléconsultations</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Filters */}
                <View style={styles.filtersContainer}>
                    <Chip
                        selected={filter === 'upcoming'}
                        onPress={() => setFilter('upcoming')}
                        style={styles.filterChip}
                        icon="calendar-clock"
                    >
                        À venir
                    </Chip>
                    <Chip
                        selected={filter === 'completed'}
                        onPress={() => setFilter('completed')}
                        style={styles.filterChip}
                        icon="check-circle"
                    >
                        Passées
                    </Chip>
                </View>

                {/* Consultations List */}
                {filteredConsultations.map((consultation) => (
                    <Surface key={consultation.id} style={styles.card} elevation={1}>
                        <View style={styles.cardHeader}>
                            <Avatar.Text
                                size={56}
                                label={consultation.doctor.split(' ')[1][0] + consultation.doctor.split(' ')[2][0]}
                                style={{ backgroundColor: '#E3F2FD' }}
                                labelStyle={{ color: '#42A5F5' }}
                            />
                            <View style={{ marginLeft: 16, flex: 1 }}>
                                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{consultation.doctor}</Text>
                                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{consultation.specialty}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                    <MaterialCommunityIcons name="calendar" size={16} color={theme.colors.secondary} />
                                    <Text variant="bodySmall" style={{ color: theme.colors.secondary, marginLeft: 4 }}>
                                        {consultation.date} à {consultation.time}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                    <MaterialCommunityIcons name="clock-outline" size={16} color={theme.colors.secondary} />
                                    <Text variant="bodySmall" style={{ color: theme.colors.secondary, marginLeft: 4 }}>
                                        {consultation.duration}
                                    </Text>
                                </View>
                            </View>
                            <Chip
                                icon={consultation.status === 'upcoming' ? 'video' : 'check'}
                                style={{
                                    backgroundColor: consultation.status === 'upcoming' ? '#E3F2FD' : '#F5F5F5',
                                }}
                                textStyle={{
                                    color: consultation.status === 'upcoming' ? '#42A5F5' : theme.colors.secondary,
                                }}
                            >
                                {consultation.status === 'upcoming' ? 'À venir' : 'Terminée'}
                            </Chip>
                        </View>

                        {consultation.notes && (
                            <View style={styles.notesContainer}>
                                <Text variant="bodySmall" style={{ color: theme.colors.secondary, fontStyle: 'italic' }}>
                                    {consultation.notes}
                                </Text>
                            </View>
                        )}

                        {/* Actions */}
                        <View style={styles.cardActions}>
                            {consultation.status === 'upcoming' ? (
                                <>
                                    <Button
                                        mode="contained"
                                        icon="video"
                                        onPress={() => { }}
                                        style={{ flex: 1, marginRight: 8 }}
                                    >
                                        Rejoindre
                                    </Button>
                                    <Button
                                        mode="outlined"
                                        icon="calendar-remove"
                                        onPress={() => { }}
                                        style={{ flex: 1 }}
                                    >
                                        Annuler
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        mode="outlined"
                                        icon="file-document"
                                        onPress={() => { }}
                                        style={{ flex: 1, marginRight: 8 }}
                                    >
                                        Compte-rendu
                                    </Button>
                                    <Button
                                        mode="outlined"
                                        icon="calendar-plus"
                                        onPress={() => { }}
                                        style={{ flex: 1 }}
                                    >
                                        Reprendre RDV
                                    </Button>
                                </>
                            )}
                        </View>
                    </Surface>
                ))}

                {filteredConsultations.length === 0 && (
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons name="video-off" size={64} color={theme.colors.secondary} />
                        <Text variant="titleMedium" style={{ color: theme.colors.secondary, marginTop: 16 }}>
                            Aucune téléconsultation {filter === 'upcoming' ? 'à venir' : 'passée'}
                        </Text>
                    </View>
                )}
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
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    content: {
        padding: 20,
    },
    filtersContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
    },
    filterChip: {
        marginRight: 8,
    },
    card: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    notesContainer: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    cardActions: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 8,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
});
