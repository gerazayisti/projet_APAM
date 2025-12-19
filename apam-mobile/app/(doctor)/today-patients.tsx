import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Chip, IconButton, useTheme, Searchbar, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const todayPatients = [
    {
        id: '1',
        name: 'Sophie Martin',
        time: '09:00',
        type: 'video',
        status: 'waiting',
        reason: 'Contrôle annuel',
        avatar: 'SM',
    },
    {
        id: '2',
        name: 'Jean Dupont',
        time: '10:30',
        type: 'in-person',
        status: 'in-progress',
        reason: 'Douleurs thoraciques',
        avatar: 'JD',
    },
    {
        id: '3',
        name: 'Marie Leclerc',
        time: '14:00',
        type: 'video',
        status: 'completed',
        reason: 'Renouvellement ordonnance',
        avatar: 'ML',
    },
    {
        id: '4',
        name: 'Pierre Dubois',
        time: '15:30',
        type: 'in-person',
        status: 'waiting',
        reason: 'Consultation grippe',
        avatar: 'PD',
    },
];

export default function TodayPatientsScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'waiting' | 'in-progress' | 'completed'>('all');

    const filteredPatients = todayPatients.filter(p => {
        if (filter === 'all') return true;
        return p.status === filter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'waiting':
                return { bg: '#FFF3E0', text: '#FF9800' };
            case 'in-progress':
                return { bg: '#E3F2FD', text: '#42A5F5' };
            case 'completed':
                return { bg: '#F5F5F5', text: theme.colors.secondary };
            default:
                return { bg: '#F5F5F5', text: theme.colors.secondary };
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'waiting':
                return 'En attente';
            case 'in-progress':
                return 'En cours';
            case 'completed':
                return 'Terminé';
            default:
                return status;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>
                        Patients du Jour
                    </Text>
                </View>
                <Chip icon="calendar-today" style={{ backgroundColor: '#E3F2FD' }} textStyle={{ color: '#42A5F5' }}>
                    {new Date().toLocaleDateString('fr-FR')}
                </Chip>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Search */}
                <Searchbar
                    placeholder="Rechercher un patient"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    elevation={0}
                />

                {/* Filters */}
                <View style={styles.filtersContainer}>
                    <Chip
                        selected={filter === 'all'}
                        onPress={() => setFilter('all')}
                        style={styles.filterChip}
                    >
                        Tous ({todayPatients.length})
                    </Chip>
                    <Chip
                        selected={filter === 'waiting'}
                        onPress={() => setFilter('waiting')}
                        style={styles.filterChip}
                    >
                        En attente
                    </Chip>
                    <Chip
                        selected={filter === 'in-progress'}
                        onPress={() => setFilter('in-progress')}
                        style={styles.filterChip}
                    >
                        En cours
                    </Chip>
                    <Chip
                        selected={filter === 'completed'}
                        onPress={() => setFilter('completed')}
                        style={styles.filterChip}
                    >
                        Terminés
                    </Chip>
                </View>

                {/* Patients List */}
                {filteredPatients.map((patient) => {
                    const statusColors = getStatusColor(patient.status);
                    return (
                        <Surface key={patient.id} style={styles.card} elevation={1}>
                            <View style={styles.cardHeader}>
                                <Avatar.Text
                                    size={48}
                                    label={patient.avatar}
                                    style={{ backgroundColor: '#E3F2FD' }}
                                    labelStyle={{ color: '#42A5F5' }}
                                />
                                <View style={{ marginLeft: 12, flex: 1 }}>
                                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{patient.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                        <MaterialCommunityIcons name="clock-outline" size={16} color={theme.colors.secondary} />
                                        <Text variant="bodySmall" style={{ color: theme.colors.secondary, marginLeft: 4 }}>
                                            {patient.time}
                                        </Text>
                                        <MaterialCommunityIcons
                                            name={patient.type === 'video' ? 'video' : 'hospital-building'}
                                            size={16}
                                            color={theme.colors.secondary}
                                            style={{ marginLeft: 12 }}
                                        />
                                        <Text variant="bodySmall" style={{ color: theme.colors.secondary, marginLeft: 4 }}>
                                            {patient.type === 'video' ? 'Vidéo' : 'Présentiel'}
                                        </Text>
                                    </View>
                                    <Text variant="bodySmall" style={{ color: theme.colors.secondary, marginTop: 4 }}>
                                        {patient.reason}
                                    </Text>
                                </View>
                                <Chip
                                    style={{ backgroundColor: statusColors.bg }}
                                    textStyle={{ color: statusColors.text }}
                                >
                                    {getStatusLabel(patient.status)}
                                </Chip>
                            </View>

                            {/* Actions */}
                            {patient.status === 'waiting' && (
                                <View style={styles.cardActions}>
                                    <IconButton
                                        icon="account-details"
                                        size={20}
                                        onPress={() => router.push(`/(doctor)/patient/${patient.id}` as any)}
                                    />
                                    <IconButton
                                        icon={patient.type === 'video' ? 'video' : 'stethoscope'}
                                        size={20}
                                        onPress={() => router.push(`/(doctor)/consultation/${patient.id}` as any)}
                                    />
                                </View>
                            )}
                        </Surface>
                    );
                })}
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
    searchBar: {
        marginBottom: 16,
        backgroundColor: '#F5F5F5',
    },
    filtersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    filterChip: {
        marginRight: 8,
        marginBottom: 8,
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
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
        gap: 8,
    },
});
