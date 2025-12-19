import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Button, TextInput, IconButton, useTheme, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function AddMedicationScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [times, setTimes] = useState<string[]>(['']);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [notes, setNotes] = useState('');

    const addTimeSlot = () => {
        setTimes([...times, '']);
    };

    const updateTime = (index: number, value: string) => {
        const newTimes = [...times];
        newTimes[index] = value;
        setTimes(newTimes);
    };

    const removeTimeSlot = (index: number) => {
        setTimes(times.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        // TODO: Save medication to backend
        router.back();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>
                        Ajouter un Médicament
                    </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Informations du Médicament</Text>

                    <TextInput
                        label="Nom du médicament *"
                        value={name}
                        onChangeText={setName}
                        mode="outlined"
                        style={styles.input}
                        placeholder="Ex: Doliprane 1000mg"
                    />

                    <TextInput
                        label="Dosage *"
                        value={dosage}
                        onChangeText={setDosage}
                        mode="outlined"
                        style={styles.input}
                        placeholder="Ex: 1 comprimé, 2 gélules..."
                    />

                    <TextInput
                        label="Fréquence *"
                        value={frequency}
                        onChangeText={setFrequency}
                        mode="outlined"
                        style={styles.input}
                        placeholder="Ex: 3x par jour, 1x le matin..."
                    />
                </Surface>

                <Surface style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <Text variant="titleMedium" style={styles.sectionTitle}>Horaires de Prise</Text>
                        <Button mode="outlined" icon="plus" onPress={addTimeSlot} compact>
                            Ajouter
                        </Button>
                    </View>

                    {times.map((time, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <TextInput
                                label={`Heure ${index + 1}`}
                                value={time}
                                onChangeText={(value) => updateTime(index, value)}
                                mode="outlined"
                                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                                placeholder="HH:MM"
                                left={<TextInput.Icon icon="clock-outline" />}
                            />
                            {times.length > 1 && (
                                <IconButton
                                    icon="delete"
                                    size={20}
                                    onPress={() => removeTimeSlot(index)}
                                    iconColor={theme.colors.error}
                                />
                            )}
                        </View>
                    ))}
                </Surface>

                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Durée du Traitement</Text>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <TextInput
                            label="Date de début"
                            value={startDate}
                            onChangeText={setStartDate}
                            mode="outlined"
                            style={[styles.input, { flex: 1 }]}
                            placeholder="JJ/MM/AAAA"
                            left={<TextInput.Icon icon="calendar" />}
                        />
                        <TextInput
                            label="Date de fin"
                            value={endDate}
                            onChangeText={setEndDate}
                            mode="outlined"
                            style={[styles.input, { flex: 1 }]}
                            placeholder="JJ/MM/AAAA ou 'Continu'"
                            left={<TextInput.Icon icon="calendar" />}
                        />
                    </View>
                </Surface>

                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Notes (optionnel)</Text>

                    <TextInput
                        label="Notes"
                        value={notes}
                        onChangeText={setNotes}
                        mode="outlined"
                        multiline
                        numberOfLines={3}
                        style={styles.input}
                        placeholder="Remarques, effets secondaires..."
                    />
                </Surface>

                <Button
                    mode="contained"
                    onPress={handleSave}
                    style={styles.saveButton}
                    contentStyle={{ height: 50 }}
                    icon="check"
                >
                    Enregistrer le Médicament
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
    saveButton: {
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 32,
    },
});
