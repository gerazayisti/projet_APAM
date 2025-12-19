import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Button, TextInput, IconButton, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function AddPatientScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleAdd = () => {
        // TODO: API call to add patient and send invitation
        router.back();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>
                        Ajouter un Patient
                    </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Informations Personnelles</Text>

                    <TextInput
                        label="Prénom *"
                        value={firstName}
                        onChangeText={setFirstName}
                        mode="outlined"
                        style={styles.input}
                    />

                    <TextInput
                        label="Nom *"
                        value={lastName}
                        onChangeText={setLastName}
                        mode="outlined"
                        style={styles.input}
                    />

                    <TextInput
                        label="Date de naissance *"
                        value={birthDate}
                        onChangeText={setBirthDate}
                        mode="outlined"
                        placeholder="JJ/MM/AAAA"
                        style={styles.input}
                        left={<TextInput.Icon icon="calendar" />}
                    />
                </Surface>

                <Surface style={styles.card}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Coordonnées</Text>

                    <TextInput
                        label="Email *"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        left={<TextInput.Icon icon="email" />}
                    />

                    <TextInput
                        label="Téléphone"
                        value={phone}
                        onChangeText={setPhone}
                        mode="outlined"
                        keyboardType="phone-pad"
                        style={styles.input}
                        left={<TextInput.Icon icon="phone" />}
                    />
                </Surface>

                <Surface style={styles.infoCard}>
                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
                        Une invitation à rejoindre AP.A.M sera envoyée au patient par email.
                    </Text>
                </Surface>

                <Button
                    mode="contained"
                    onPress={handleAdd}
                    style={styles.addButton}
                    contentStyle={{ height: 50 }}
                    icon="account-plus"
                >
                    Ajouter et Inviter
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
    infoCard: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#E3F2FD',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#90CAF9',
    },
    addButton: {
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 32,
    },
});
