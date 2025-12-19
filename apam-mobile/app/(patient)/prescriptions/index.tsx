import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Chip, IconButton, useTheme, Searchbar, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const prescriptions = [
    {
        id: '1',
        date: '10/01/2024',
        doctor: 'Dr. Dubois',
        status: 'active',
        medications: [
            { name: 'Doliprane 1000mg', dosage: '1 comprimé 3x/jour', duration: '7 jours' },
            { name: 'Ibuprofène 400mg', dosage: '1 comprimé si douleur', duration: '5 jours' },
        ],
    },
    {
        id: '2',
        date: '05/12/2023',
        doctor: 'Dr. Martin',
        status: 'archived',
        medications: [
            { name: 'Amoxicilline 500mg', dosage: '1 gélule 3x/jour', duration: '10 jours' },
        ],
    },
];

export default function PrescriptionsScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('all');

    const filteredPrescriptions = prescriptions.filter(p => {
        if (filter === 'all') return true;
        return p.status === filter;
    });

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>Mes Ordonnances</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Search */}
                <Searchbar
                    placeholder="Rechercher une ordonnance"
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
                        Toutes
                    </Chip>
                    <Chip
                        selected={filter === 'active'}
                        onPress={() => setFilter('active')}
                        style={styles.filterChip}
                    >
                        Actives
                    </Chip>
                    <Chip
                        selected={filter === 'archived'}
                        onPress={() => setFilter('archived')}
                        style={styles.filterChip}
                    >
                        Archivées
                    </Chip>
                </View>

                {/* Prescriptions List */}
                {filteredPrescriptions.map((prescription) => (
                    <Surface key={prescription.id} style={styles.card} elevation={1}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{prescription.doctor}</Text>
                                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{prescription.date}</Text>
                            </View>
                            <Chip
                                icon={prescription.status === 'active' ? 'check-circle' : 'archive'}
                                style={{
                                    backgroundColor: prescription.status === 'active' ? '#E3F2FD' : '#F5F5F5',
                                }}
                                textStyle={{
                                    color: prescription.status === 'active' ? '#42A5F5' : theme.colors.secondary,
                                }}
                            >
                                {prescription.status === 'active' ? 'Active' : 'Archivée'}
                            </Chip>
                        </View>

                        {/* Medications */}
                        <View style={{ marginTop: 16 }}>
                            {prescription.medications.map((med, index) => (
                                <View key={index} style={styles.medicationItem}>
                                    <MaterialCommunityIcons name="pill" size={20} color="#42A5F5" />
                                    <View style={{ marginLeft: 12, flex: 1 }}>
                                        <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{med.name}</Text>
                                        <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{med.dosage}</Text>
                                        <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>Durée: {med.duration}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Actions */}
                        <View style={styles.cardActions}>
                            <IconButton icon="download" size={20} onPress={() => { }} />
                            <IconButton icon="share-variant" size={20} onPress={() => { }} />
                        </View>
                    </Surface>
                ))}
            </ScrollView>

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => { }}
                label="Demander renouvellement"
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
    },
    searchBar: {
        marginBottom: 16,
        backgroundColor: '#F5F5F5',
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
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    medicationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
        gap: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 30,
    },
});
