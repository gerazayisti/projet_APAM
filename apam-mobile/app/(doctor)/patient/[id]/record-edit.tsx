import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Surface, Button, useTheme, TextInput, Chip, IconButton, Divider } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock initial data
const initialRecord = {
    allergies: ['Pénicilline', 'Arachides'],
    history: [
        { id: '1', date: '12/03/2024', note: 'Migraine persistante' },
        { id: '2', date: '10/02/2024', note: 'Douleurs thoraciques' },
    ],
};

export default function EditRecordScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { id } = useLocalSearchParams();

    // Mock permission state: false initially to show request flow
    const [hasPermission, setHasPermission] = useState(false);
    const [requestPending, setRequestPending] = useState(false);

    const [allergies, setAllergies] = useState(initialRecord.allergies);
    const [newAllergy, setNewAllergy] = useState('');
    const [history, setHistory] = useState(initialRecord.history);
    const [newHistoryNote, setNewHistoryNote] = useState('');

    const requestAccess = () => {
        setRequestPending(true);
        // Simulate patient approval delay
        setTimeout(() => {
            Alert.alert(
                "Demande envoyée",
                "Le patient a reçu une notification pour valider votre accès.",
                [{ text: "OK" }]
            );
            // For demo purposes, auto-grant after alert
            setHasPermission(true);
            setRequestPending(false);
        }, 1000);
    };

    const addAllergy = () => {
        if (newAllergy.trim()) {
            setAllergies([...allergies, newAllergy.trim()]);
            setNewAllergy('');
        }
    };

    const removeAllergy = (index: number) => {
        setAllergies(allergies.filter((_, i) => i !== index));
    };

    const addHistoryEntry = () => {
        if (newHistoryNote.trim()) {
            const newEntry = {
                id: Date.now().toString(),
                date: new Date().toLocaleDateString('fr-FR'),
                note: newHistoryNote.trim(),
            };
            setHistory([newEntry, ...history]);
            setNewHistoryNote('');
        }
    };

    if (!hasPermission) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
                <MaterialCommunityIcons name="shield-lock" size={80} color={theme.colors.secondary} />
                <Text variant="headlineSmall" style={{ textAlign: 'center', marginTop: 24, fontWeight: 'bold', color: '#193759' }}>
                    Accès Restreint
                </Text>
                <Text variant="bodyLarge" style={{ textAlign: 'center', marginTop: 12, color: theme.colors.secondary }}>
                    Vous devez obtenir l'autorisation du patient pour modifier son Carnet Médical Virtuel.
                </Text>
                <Button
                    mode="contained"
                    onPress={requestAccess}
                    loading={requestPending}
                    disabled={requestPending}
                    style={{ marginTop: 32, borderRadius: 12, width: '100%' }}
                    contentStyle={{ height: 50 }}
                >
                    {requestPending ? "En attente de validation..." : "Demander l'autorisation d'écriture"}
                </Button>
                <Button mode="text" onPress={() => router.back()} style={{ marginTop: 16 }}>
                    Retour
                </Button>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>Édition Dossier</Text>
                </View>
                <Chip icon="check-circle" style={{ backgroundColor: '#E3F2FD', marginRight: 16 }} textStyle={{ color: '#42A5F5' }}>Mode Écriture</Chip>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Allergies Section */}
                <Surface style={styles.section}>
                    <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 12, color: theme.colors.error }}>Allergies & Intolérances</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                        {allergies.map((allergy, index) => (
                            <Chip key={index} onClose={() => removeAllergy(index)} style={{ backgroundColor: '#FFEBEE' }}>{allergy}</Chip>
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            placeholder="Nouvelle allergie..."
                            value={newAllergy}
                            onChangeText={setNewAllergy}
                            mode="outlined"
                            style={{ flex: 1, backgroundColor: '#FFF', height: 40 }}
                        />
                        <IconButton icon="plus-circle" iconColor={theme.colors.primary} size={30} onPress={addAllergy} />
                    </View>
                </Surface>

                {/* History Section */}
                <Surface style={styles.section}>
                    <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 12, color: theme.colors.primary }}>Historique Médical</Text>

                    <View style={{ marginBottom: 24 }}>
                        <TextInput
                            label="Ajouter une note au dossier"
                            value={newHistoryNote}
                            onChangeText={setNewHistoryNote}
                            mode="outlined"
                            multiline
                            numberOfLines={3}
                            style={{ backgroundColor: '#FFF', marginBottom: 8 }}
                        />

                        {/* OCR Image Capture Button */}
                        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                            <Button
                                mode="outlined"
                                icon="camera"
                                onPress={() => {
                                    Alert.alert(
                                        "Capture d'image",
                                        "Fonctionnalité OCR : Prenez une photo d'une note manuscrite. Le texte sera extrait automatiquement via OCR. Si l'extraction échoue, l'image sera enregistrée telle quelle.",
                                        [{ text: "OK" }]
                                    );
                                }}
                                style={{ flex: 1 }}
                            >
                                Capturer note manuscrite
                            </Button>
                            <Button
                                mode="outlined"
                                icon="image"
                                onPress={() => {
                                    Alert.alert(
                                        "Galerie",
                                        "Sélectionnez une image depuis la galerie. L'OCR tentera d'extraire le texte.",
                                        [{ text: "OK" }]
                                    );
                                }}
                                style={{ flex: 1 }}
                            >
                                Depuis galerie
                            </Button>
                        </View>

                        <Button mode="contained-tonal" onPress={addHistoryEntry} style={{ alignSelf: 'flex-end' }}>
                            Ajouter l'entrée
                        </Button>
                    </View>

                    {history.map((item, index) => (
                        <View key={item.id}>
                            <View style={styles.historyItem}>
                                <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>{item.date}</Text>
                                <Text variant="bodyMedium" style={{ marginTop: 4 }}>{item.note}</Text>
                            </View>
                            {index < history.length - 1 && <Divider />}
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
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        padding: 20,
        paddingBottom: 100,
    },
    section: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 24,
    },
    historyItem: {
        paddingVertical: 12,
    },
});
