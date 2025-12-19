import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Avatar, Surface, Chip, useTheme, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '@/config/api';

export default function DoctorPatientsScreen() {
    const router = useRouter();
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [patients, setPatients] = useState([]);
    const [proId, setProId] = useState(1); // TODO: Get from auth
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMyPatients();
    }, []);

    const fetchMyPatients = async () => {
        setLoading(true);
        try {
            const data = await api.getDoctorPatients(proId);
            if (data && data.length > 0) {
                const transformed = data.map((p: any) => ({
                    id: p.id_patient?.toString(),
                    name: `${p.nom} ${p.prenom}`,
                    age: new Date().getFullYear() - new Date(p.date_nais).getFullYear(),
                    lastVisit: new Date(p.date_debut).toLocaleDateString('fr-FR'),
                    condition: p.allergies !== 'Aucune' ? 'Allergies' : 'Aucune condition',
                    status: 'active', // All patients from API will have 'active' status for now
                    avatar: `${p.prenom.charAt(0)}${p.nom.charAt(0)}`.toUpperCase(),
                }));
                setPatients(transformed);
            } else {
                setPatients([]); // Clear patients if no data
            }
        } catch (error) {
            console.error('Failed to fetch patients:', error);
            setPatients([]); // Clear patients on error
        } finally {
            setLoading(false);
        }
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedFilter === 'all' ||
            (selectedFilter === 'critical' && patient.status === 'critical') ||
            (selectedFilter === 'attention' && patient.status === 'attention') ||
            (selectedFilter === 'active' && patient.status === 'active')) // Added 'active' filter
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'critical': return theme.colors.error;
            case 'attention': return (theme.colors as any).warning; // Assuming warning exists or use orange
            case 'stable': return theme.colors.primary;
            default: return theme.colors.secondary;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text variant="headlineMedium" style={styles.headerTitle}>Mes Patients</Text>
                <Searchbar
                    placeholder="Rechercher un patient..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    elevation={0}
                />
                <View style={styles.filters}>
                    <Chip
                        selected={selectedFilter === 'all'}
                        onPress={() => setSelectedFilter('all')}
                        style={{ marginRight: 8 }}
                        showSelectedOverlay
                    >
                        Tous
                    </Chip>
                    <Chip
                        selected={selectedFilter === 'critical'}
                        onPress={() => setSelectedFilter('critical')}
                        style={{ marginRight: 8 }}
                        showSelectedOverlay
                    >
                        Critiques
                    </Chip>
                    <Chip
                        selected={selectedFilter === 'attention'}
                        onPress={() => setSelectedFilter('attention')}
                        showSelectedOverlay
                    >
                        À surveiller
                    </Chip>
                </View>
            </View>

            {/* List */}
            <FlatList
                data={filteredPatients}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/(doctor)/patient/${item.id}` as any)}>
                        <Surface style={styles.patientCard}>
                            <Avatar.Text size={50} label={item.avatar} style={{ backgroundColor: getStatusColor(item.status) + '20' }} color={getStatusColor(item.status)} />
                            <View style={{ flex: 1, marginLeft: 16 }}>
                                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>{item.age} ans • {item.condition}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>Dernière visite</Text>
                                <Text variant="bodySmall" style={{ fontWeight: 'bold' }}>{item.lastVisit}</Text>
                            </View>
                        </Surface>
                    </TouchableOpacity>
                )}
            />

            <FAB
                icon="plus"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                color="#FFF"
                onPress={() => router.push('/(doctor)/patients/add' as any)}
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
        marginBottom: 16,
    },
    searchBar: {
        backgroundColor: '#F5F9FB',
        borderRadius: 12,
        marginBottom: 16,
    },
    filters: {
        flexDirection: 'row',
    },
    patientCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
        backgroundColor: '#FFF',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 30,
    },
});
