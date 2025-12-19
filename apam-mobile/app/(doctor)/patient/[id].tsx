import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Surface, Avatar, Button, useTheme, Chip, List, Divider } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const patientData = {
    id: '1',
    name: 'Sophie Martin',
    age: 34,
    gender: 'Femme',
    bloodType: 'A+',
    height: '165 cm',
    weight: '62 kg',
    avatar: 'SM',
    authorized: true,
    history: [
        { date: '12 Mars 2024', type: 'Consultation', note: 'Migraine persistante' },
        { date: '10 Fév 2024', type: 'Urgence', note: 'Douleurs thoraciques' },
    ],
    allergies: ['Pénicilline', 'Arachides'],
    prescriptions: ['Ibuprofène 400mg', 'Sumatriptan'],
};

export default function PatientDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const theme = useTheme();

    // In a real app, fetch patient data based on id
    const patient = patientData;

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
                        <Ionicons name="arrow-back" size={24} color="#193759" />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar.Text size={64} label={patient.avatar} style={{ backgroundColor: theme.colors.primary }} />
                        <View style={{ marginLeft: 16, flex: 1 }}>
                            <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>{patient.name}</Text>
                            <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>{patient.age} ans • {patient.gender}</Text>
                            {patient.authorized && (
                                <Chip icon="check-circle" style={{ alignSelf: 'flex-start', marginTop: 8, backgroundColor: '#E3F2FD' }} textStyle={{ color: '#42A5F5' }}>
                                    Accès Autorisé
                                </Chip>
                            )}
                        </View>
                    </View>

                    <View style={styles.vitalsGrid}>
                        <View style={styles.vitalItem}>
                            <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>Groupe</Text>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{patient.bloodType}</Text>
                        </View>
                        <View style={styles.vitalItem}>
                            <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>Taille</Text>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{patient.height}</Text>
                        </View>
                        <View style={styles.vitalItem}>
                            <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>Poids</Text>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{patient.weight}</Text>
                        </View>
                    </View>
                </View>

                {/* Medical Record (Read Only) */}
                {patient.authorized ? (
                    <View style={styles.content}>
                        {/* Allergies */}
                        <Surface style={styles.card}>
                            <View style={styles.cardHeader}>
                                <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#E91E63" />
                                <Text variant="titleMedium" style={{ fontWeight: 'bold', marginLeft: 8 }}>Allergies</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                                {patient.allergies.map((allergy, index) => (
                                    <Chip key={index} style={{ backgroundColor: '#FCE4EC' }} textStyle={{ color: '#E91E63' }}>{allergy}</Chip>
                                ))}
                            </View>
                        </Surface>

                        {/* Prescriptions */}
                        <Surface style={styles.card}>
                            <View style={styles.cardHeader}>
                                <MaterialCommunityIcons name="pill" size={24} color="#2196F3" />
                                <Text variant="titleMedium" style={{ fontWeight: 'bold', marginLeft: 8 }}>Traitements en cours</Text>
                            </View>
                            {patient.prescriptions.map((med, index) => (
                                <View key={index} style={{ marginTop: 8 }}>
                                    <Text variant="bodyLarge">• {med}</Text>
                                </View>
                            ))}
                        </Surface>

                        {/* History */}
                        <Surface style={styles.card}>
                            <View style={styles.cardHeader}>
                                <MaterialCommunityIcons name="history" size={24} color="#42A5F5" />
                                <Text variant="titleMedium" style={{ fontWeight: 'bold', marginLeft: 8 }}>Historique</Text>
                            </View>
                            {patient.history.map((visit, index) => (
                                <View key={index}>
                                    <List.Item
                                        title={visit.type}
                                        description={visit.note}
                                        right={() => <Text variant="bodySmall" style={{ alignSelf: 'center' }}>{visit.date}</Text>}
                                        left={props => <List.Icon {...props} icon="calendar-clock" />}
                                    />
                                    {index < patient.history.length - 1 && <Divider />}
                                </View>
                            ))}
                        </Surface>
                    </View>
                ) : (
                    <View style={{ padding: 20, alignItems: 'center', marginTop: 40 }}>
                        <MaterialCommunityIcons name="lock" size={48} color={theme.colors.secondary} />
                        <Text variant="titleMedium" style={{ textAlign: 'center', marginTop: 16, color: theme.colors.secondary }}>
                            Vous n'avez pas l'autorisation d'accéder au dossier médical complet de ce patient.
                        </Text>
                        <Button mode="contained" style={{ marginTop: 24 }} onPress={() => { }}>
                            Demander l'accès
                        </Button>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Action */}
            <Surface style={styles.bottomBar}>
                <Button mode="contained" icon="video" onPress={() => { }} style={{ flex: 1, marginRight: 8 }}>
                    Téléconsultation
                </Button>
                <Button mode="outlined" icon="message" onPress={() => { }} style={{ flex: 1, marginLeft: 8 }}>
                    Message
                </Button>
            </Surface>
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
        paddingBottom: 24,
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 2,
    },
    vitalsGrid: {
        flexDirection: 'row',
        marginTop: 24,
        backgroundColor: '#F5F9FB',
        borderRadius: 16,
        padding: 16,
        justifyContent: 'space-around',
    },
    vitalItem: {
        alignItems: 'center',
    },
    content: {
        padding: 20,
        gap: 16,
    },
    card: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
});
