import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme, IconButton, List, Searchbar, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';

const mockDrugs = [
    { id: '1', name: 'Doliprane 1000mg', form: 'Comprimé' },
    { id: '2', name: 'Amoxicilline 500mg', form: 'Gélule' },
    { id: '3', name: 'Ibuprofène 400mg', form: 'Comprimé' },
    { id: '4', name: 'Spasfon', form: 'Comprimé' },
    { id: '5', name: 'Smecta', form: 'Sachet' },
];

export default function CreatePrescriptionScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDrugs, setSelectedDrugs] = useState<any[]>([]);
    const [currentDosage, setCurrentDosage] = useState('');
    const [currentDuration, setCurrentDuration] = useState('');
    const [editingDrug, setEditingDrug] = useState<any>(null);

    const filteredDrugs = searchQuery.length > 1
        ? mockDrugs.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    const addDrug = (drug: any) => {
        setEditingDrug(drug);
        setSearchQuery('');
    };

    const confirmAddDrug = () => {
        if (editingDrug && currentDosage && currentDuration) {
            setSelectedDrugs([
                ...selectedDrugs,
                { ...editingDrug, dosage: currentDosage, duration: currentDuration }
            ]);
            setEditingDrug(null);
            setCurrentDosage('');
            setCurrentDuration('');
        }
    };

    const removeDrug = (id: string) => {
        setSelectedDrugs(selectedDrugs.filter(d => d.id !== id));
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>Nouvelle Ordonnance</Text>
                </View>
                <Text variant="bodyMedium" style={{ marginLeft: 50, color: theme.colors.secondary }}>Patient: Sophie Martin</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Search Section */}
                <Surface style={styles.searchSection}>
                    <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Ajouter un médicament</Text>
                    <Searchbar
                        placeholder="Rechercher (ex: Doliprane)"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchBar}
                        elevation={0}
                    />
                    {filteredDrugs.length > 0 && (
                        <Surface style={styles.searchResults}>
                            {filteredDrugs.map(drug => (
                                <List.Item
                                    key={drug.id}
                                    title={drug.name}
                                    description={drug.form}
                                    onPress={() => addDrug(drug)}
                                    left={props => <List.Icon {...props} icon="pill" />}
                                />
                            ))}
                        </Surface>
                    )}
                </Surface>

                {/* Editing Section */}
                {editingDrug && (
                    <Surface style={styles.editSection}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>{editingDrug.name}</Text>
                            <IconButton icon="close" size={20} onPress={() => setEditingDrug(null)} />
                        </View>

                        <TextInput
                            label="Posologie (ex: 1 comprimé matin et soir)"
                            value={currentDosage}
                            onChangeText={setCurrentDosage}
                            mode="outlined"
                            style={{ marginBottom: 12, backgroundColor: '#FFF' }}
                        />
                        <TextInput
                            label="Durée (ex: 5 jours)"
                            value={currentDuration}
                            onChangeText={setCurrentDuration}
                            mode="outlined"
                            style={{ marginBottom: 16, backgroundColor: '#FFF' }}
                        />
                        <Button mode="contained" onPress={confirmAddDrug}>
                            Ajouter à l'ordonnance
                        </Button>
                    </Surface>
                )}

                {/* List Section */}
                <View style={styles.listSection}>
                    <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Médicaments prescrits ({selectedDrugs.length})</Text>
                    {selectedDrugs.length === 0 ? (
                        <Text variant="bodyMedium" style={{ color: theme.colors.secondary, fontStyle: 'italic' }}>Aucun médicament ajouté.</Text>
                    ) : (
                        selectedDrugs.map((item, index) => (
                            <Surface key={index} style={styles.drugCard}>
                                <View style={{ flex: 1 }}>
                                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                    <Text variant="bodyMedium">Posologie : {item.dosage}</Text>
                                    <Text variant="bodyMedium">Durée : {item.duration}</Text>
                                </View>
                                <IconButton icon="delete" iconColor={theme.colors.error} onPress={() => removeDrug(item.id)} />
                            </Surface>
                        ))
                    )}
                </View>
            </ScrollView>

            <Surface style={styles.footer}>
                <Button
                    mode="contained"
                    onPress={() => router.back()}
                    disabled={selectedDrugs.length === 0}
                    style={{ borderRadius: 12 }}
                    contentStyle={{ height: 50 }}
                >
                    Générer et Signer
                </Button>
            </Surface>
        </KeyboardAvoidingView>
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
        paddingBottom: 100,
    },
    searchSection: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 24,
        zIndex: 10,
    },
    searchBar: {
        backgroundColor: '#F5F9FB',
        borderRadius: 12,
    },
    searchResults: {
        position: 'absolute',
        top: 100,
        left: 16,
        right: 16,
        backgroundColor: '#FFF',
        borderRadius: 12,
        maxHeight: 200,
    },
    editSection: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#E3F2FD',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#2196F3',
    },
    listSection: {
        marginBottom: 24,
    },
    drugCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#FFF',
        marginBottom: 12,
    },
    footer: {
        padding: 16,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
});
