import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Button, TextInput, IconButton, useTheme, SegmentedButtons, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CreateAppointmentScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('30');
    const [type, setType] = useState<'video' | 'in-person'>('video');
    const [reason, setReason] = useState('');

    const handleCreate = () => {
        // TODO: API call to create appointment
        router.back();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>
                        Nouveau Rendez-vous
                    </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Informations Patient</Text>

                    <TextInput
                        label="Nom du patient"
                        value={patientName}
                        onChangeText={setPatientName}
                        mode="outlined"
                        style={styles.input}
                        left={<TextInput.Icon icon="account" />}
                    />

                    <Text variant="bodySmall" style={{ color: theme.colors.secondary, marginTop: 8 }}>
                        ou
                    </Text>

                    <Button
                        mode="outlined"
                        icon="account-plus"
                        onPress={() => router.push('/(doctor)/patients/add' as any)}
                        style={{ marginTop: 8 }}
                    >
                        Ajouter un nouveau patient
                    </Button>
                </Surface>

                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Date et Heure</Text>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <TextInput
                            label="Date"
                            value={date}
                            onChangeText={setDate}
                            mode="outlined"
                            style={[styles.input, { flex: 1 }]}
                            placeholder="JJ/MM/AAAA"
                            left={<TextInput.Icon icon="calendar" />}
                        />
                        <TextInput
                            label="Heure"
                            value={time}
                            onChangeText={setTime}
                            mode="outlined"
                            style={[styles.input, { flex: 1 }]}
                            placeholder="HH:MM"
                            left={<TextInput.Icon icon="clock-outline" />}
                        />
                    </View>

                    <TextInput
                        label="Durée (minutes)"
                        value={duration}
                        onChangeText={setDuration}
                        mode="outlined"
                        keyboardType="numeric"
                        style={styles.input}
                        left={<TextInput.Icon icon="timer-outline" />}
                    />
                </Surface>

                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Type de Consultation</Text>

                    <SegmentedButtons
                        value={type}
                        onValueChange={(value) => setType(value as 'video' | 'in-person')}
                        buttons={[
                            {
                                value: 'video',
                                label: 'Téléconsultation',
                                icon: 'video',
                            },
                            {
                                value: 'in-person',
                                label: 'Présentiel',
                                icon: 'hospital-building',
                            },
                        ]}
                        style={{ marginTop: 8 }}
                    />
                </Surface>

                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Motif de Consultation</Text>

                    <TextInput
                        label="Motif"
                        value={reason}
                        onChangeText={setReason}
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        style={styles.input}
                        placeholder="Ex: Contrôle annuel, Douleurs..."
                    />
                </Surface>

                <Button
                    mode="contained"
                    onPress={handleCreate}
                    style={styles.createButton}
                    contentStyle={{ height: 50 }}
                    icon="calendar-check"
                >
                    Créer le Rendez-vous
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
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    content: {
        padding: 20,
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
    input: {
        marginBottom: 12,
        backgroundColor: '#FFF',
    },
    createButton: {
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 32,
    },
});
