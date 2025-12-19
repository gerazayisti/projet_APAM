import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Chip, IconButton, useTheme, Searchbar, SegmentedButtons } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const results = [
    {
        id: '1',
        type: 'biology',
        name: 'Bilan sanguin complet',
        date: '15/01/2024',
        doctor: 'Dr. Dubois',
        status: 'available',
        summary: 'Résultats normaux',
    },
    {
        id: '2',
        type: 'imaging',
        name: 'Radiographie thorax',
        date: '10/01/2024',
        doctor: 'Dr. Martin',
        status: 'available',
        summary: 'Aucune anomalie détectée',
    },
    {
        id: '3',
        type: 'biology',
        name: 'Test COVID-19',
        date: '05/01/2024',
        doctor: 'Dr. Laurent',
        status: 'pending',
        summary: 'En attente',
    },
];

export default function ResultsScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredResults = results.filter(r => {
        if (filter === 'all') return true;
        return r.type === filter;
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'biology':
                return 'flask';
            case 'imaging':
                return 'image-outline';
            default:
                return 'file-document';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'biology':
                return 'Biologie';
            case 'imaging':
                return 'Imagerie';
            default:
                return 'Autre';
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>Mes Résultats</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Search */}
                <Searchbar
                    placeholder="Rechercher un résultat"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    elevation={0}
                />

                {/* Filters */}
                <SegmentedButtons
                    value={filter}
                    onValueChange={setFilter}
                    buttons={[
                        { value: 'all', label: 'Tous' },
                        { value: 'biology', label: 'Biologie' },
                        { value: 'imaging', label: 'Imagerie' },
                    ]}
                    style={styles.filters}
                />

                {/* Results List */}
                {filteredResults.map((result) => (
                    <Surface key={result.id} style={styles.card} elevation={1}>
                        <View style={styles.cardHeader}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <MaterialCommunityIcons
                                    name={getTypeIcon(result.type) as any}
                                    size={32}
                                    color="#42A5F5"
                                />
                                <View style={{ marginLeft: 12, flex: 1 }}>
                                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{result.name}</Text>
                                    <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{result.doctor}</Text>
                                    <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{result.date}</Text>
                                </View>
                            </View>
                            <Chip
                                icon={result.status === 'available' ? 'check-circle' : 'clock-outline'}
                                style={{
                                    backgroundColor: result.status === 'available' ? '#E3F2FD' : '#FFF3E0',
                                }}
                                textStyle={{
                                    color: result.status === 'available' ? '#42A5F5' : '#FF9800',
                                }}
                            >
                                {result.status === 'available' ? 'Disponible' : 'En attente'}
                            </Chip>
                        </View>

                        <View style={styles.cardContent}>
                            <Chip icon="information" style={{ backgroundColor: '#F5F5F5', alignSelf: 'flex-start' }}>
                                {getTypeLabel(result.type)}
                            </Chip>
                            <Text variant="bodyMedium" style={{ marginTop: 12 }}>{result.summary}</Text>
                        </View>

                        {result.status === 'available' && (
                            <View style={styles.cardActions}>
                                <IconButton icon="eye" size={20} onPress={() => { }} />
                                <IconButton icon="download" size={20} onPress={() => { }} />
                                <IconButton icon="share-variant" size={20} onPress={() => { }} />
                            </View>
                        )}
                    </Surface>
                ))}
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
    searchBar: {
        marginBottom: 16,
        backgroundColor: '#F5F5F5',
    },
    filters: {
        marginBottom: 20,
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
    cardContent: {
        marginTop: 16,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
        gap: 8,
    },
});
