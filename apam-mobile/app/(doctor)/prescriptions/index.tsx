import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Chip, IconButton, useTheme, Searchbar, SegmentedButtons } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const prescriptions = [
    {
        id: '1',
        patientName: 'Sophie Martin',
        date: '20/03/2024',
        status: 'active',
        medications: ['Doliprane 1000mg', 'Ibuprofène 400mg'],
    },
    {
        id: '2',
        patientName: 'Jean Dupont',
        date: '15/03/2024',
        status: 'active',
        medications: ['Amoxicilline 500mg'],
    },
    {
        id: '3',
        patientName: 'Marie Leclerc',
        date: '10/03/2024',
        status: 'archived',
        medications: ['Paracétamol 500mg', 'Vitamine D'],
    },
];

export default function PrescriptionsManagementScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredPrescriptions = prescriptions.filter(p => {
        if (filter === 'all') return true;
        return p.status === filter;
    });

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>
                        Mes Ordonnances
                    </Text>
                </View>
                <IconButton
                    icon="plus"
                    onPress={() => router.push('/(doctor)/prescription/create' as any)}
                    iconColor={theme.colors.primary}
                />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Searchbar
                    placeholder="Rechercher par patient ou médicament"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    elevation={0}
                />

                <SegmentedButtons
                    value={filter}
                    onValueChange={setFilter}
                    buttons={[
                        { value: 'all', label: 'Toutes' },
                        { value: 'active', label: 'Actives' },
                        { value: 'archived', label: 'Archivées' },
                    ]}
                    style={styles.filters}
                />

                {filteredPrescriptions.map((prescription) => (
                    <Surface key={prescription.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={{ flex: 1 }}>
                                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
                                    {prescription.patientName}
                                </Text>
                                <Text variant="bodySmall" style={{ color: theme.colors.secondary, marginTop: 4 }}>
                                    {prescription.date}
                                </Text>
                            </View>
                            <Chip
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

                        <View style={styles.medicationsList}>
                            {prescription.medications.map((med, index) => (
                                <View key={index} style={styles.medicationItem}>
                                    <MaterialCommunityIcons name="pill" size={16} color="#42A5F5" />
                                    <Text variant="bodyMedium" style={{ marginLeft: 8 }}>
                                        {med}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.cardActions}>
                            <IconButton icon="eye" size={20} onPress={() => { }} />
                            <IconButton icon="download" size={20} onPress={() => { }} />
                            <IconButton icon="share-variant" size={20} onPress={() => { }} />
                        </View>
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
        paddingHorizontal: 8,
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
    filters: {
        marginBottom: 20,
    },
    card: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    medicationsList: {
        marginBottom: 8,
    },
    medicationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
});
