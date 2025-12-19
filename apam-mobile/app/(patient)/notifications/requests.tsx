import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Surface, Button, useTheme, Avatar, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';

const initialRequests = [
    {
        id: '1',
        doctorName: 'Dr. Watson',
        specialty: 'Généraliste',
        reason: 'Mise à jour du dossier suite consultation',
        time: 'Il y a 2 min',
        avatar: 'DW',
    },
    {
        id: '2',
        doctorName: 'Dr. House',
        specialty: 'Diagnostiqueur',
        reason: 'Vérification antécédents',
        time: 'Il y a 1 heure',
        avatar: 'DH',
    },
];

export default function AccessRequestsScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [requests, setRequests] = useState(initialRequests);

    const handleAction = (id: string, action: 'accept' | 'deny') => {
        // In real app, send API call
        setRequests(requests.filter(r => r.id !== id));
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>Demandes d'accès</Text>
                </View>
            </View>

            <FlatList
                data={requests}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 20 }}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>Aucune demande en attente.</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <Surface style={styles.requestCard} elevation={2}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <Avatar.Text size={48} label={item.avatar} style={{ backgroundColor: theme.colors.primaryContainer }} />
                            <View style={{ marginLeft: 12, flex: 1 }}>
                                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{item.doctorName}</Text>
                                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{item.specialty}</Text>
                            </View>
                            <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>{item.time}</Text>
                        </View>

                        <Text variant="bodyMedium" style={{ marginBottom: 16, color: '#193759' }}>
                            Souhaite accéder à votre Carnet Médical Virtuel pour : <Text style={{ fontWeight: 'bold' }}>{item.reason}</Text>
                        </Text>

                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <Button
                                mode="outlined"
                                onPress={() => handleAction(item.id, 'deny')}
                                style={{ flex: 1, borderColor: theme.colors.error }}
                                textColor={theme.colors.error}
                            >
                                Refuser
                            </Button>
                            <Button
                                mode="contained"
                                onPress={() => handleAction(item.id, 'accept')}
                                style={{ flex: 1, backgroundColor: '#42A5F5' }}
                            >
                                Autoriser
                            </Button>
                        </View>
                    </Surface>
                )}
            />
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
    requestCard: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },
});
