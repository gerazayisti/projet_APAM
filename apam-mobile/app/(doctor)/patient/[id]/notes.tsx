import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme, IconButton, Chip } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';

const templates = [
    { label: 'Consultation Générale', text: 'Motif: Bilan de santé annuel.\n\nExamen clinique:\n- TA: 12/8\n- Auscultation: Claire\n\nConclusion: RAS.' },
    { label: 'Syndrome Grippal', text: 'Motif: Fièvre et courbatures.\n\nSymptômes:\n- Fièvre > 38.5°C\n- Toux sèche\n\nDiagnostic: Syndrome grippal probable.\n\nCAT: Repos, Hydratation, Paracétamol.' },
    { label: 'Renouvellement', text: 'Motif: Renouvellement ordonnance.\n\nTraitement actuel bien toléré.\nPas de nouveaux symptômes.\n\nOrdonnance renouvelée pour 3 mois.' },
];

export default function MedicalNotesScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [noteContent, setNoteContent] = useState('');

    const applyTemplate = (text: string) => {
        setNoteContent(text);
    };

    const saveNote = () => {
        // Simulate save
        router.back();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>Notes de Consultation</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Templates */}
                <View style={styles.templatesContainer}>
                    <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Modèles rapides</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                        {templates.map((t, i) => (
                            <Chip
                                key={i}
                                onPress={() => applyTemplate(t.text)}
                                style={{ marginRight: 8, backgroundColor: '#E3F2FD' }}
                                textStyle={{ color: '#1976D2' }}
                            >
                                {t.label}
                            </Chip>
                        ))}
                    </ScrollView>
                </View>

                {/* Editor */}
                <Surface style={styles.editorCard}>
                    <TextInput
                        mode="flat"
                        placeholder="Rédigez vos observations ici..."
                        value={noteContent}
                        onChangeText={setNoteContent}
                        multiline
                        style={styles.editorInput}
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                    />
                </Surface>
            </ScrollView>

            <Surface style={styles.footer}>
                <Button
                    mode="contained"
                    onPress={saveNote}
                    style={{ borderRadius: 12 }}
                    contentStyle={{ height: 50 }}
                    icon="content-save"
                >
                    Enregistrer la note
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
        flexGrow: 1,
    },
    templatesContainer: {
        marginBottom: 24,
    },
    editorCard: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        minHeight: 300,
    },
    editorInput: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
        fontSize: 16,
        lineHeight: 24,
    },
    footer: {
        padding: 16,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
});
