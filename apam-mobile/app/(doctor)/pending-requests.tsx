import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Button, IconButton, useTheme, Avatar, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const pendingRequests = [
    {
        id: '1',
        type: 'record-access',
        patient: 'Sophie Martin',
        avatar: 'SM',
        date: '21/03/2024',
        message: 'Demande d\'accès au dossier médical pour suivi cardiologique',
    },
    {
        id: '2',
        type: 'appointment',
        patient: 'Jean Dupont',
        avatar: 'JD',
        date: '20/03/2024',
        preferredDate: '25/03/2024 à 14:00',
        reason: 'Consultation urgente - douleurs abdominales',
    },
    {
        id: '3',
        type: 'record-access',
        patient: 'Marie Leclerc',
        avatar: 'ML',
        date: '19/03/2024',
        message: 'Autorisation pour mise à jour des allergies',
    },
];

export default function PendingRequestsScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [requests, setRequests] = useState(pendingRequests);

    const handleAccept = (id: string) => {
        setRequests(requests.filter(r => r.id !== id));
        // TODO: API call to accept request
    };

    const handleReject = (id: string) => {
        setRequests(requests.filter(r => r.id !== id));
        // TODO: API call to reject request
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>
                        Demandes en Attente
                    </Text>
                </View>
                {requests.length > 0 && (
                    <Text variant="bodyLarge" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                        {requests.length}
                    </Text>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {requests.length === 0 ? (
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons name="check-circle-outline" size={64} color={theme.colors.secondary} />
                        <Text variant="titleMedium" style={{ color: theme.colors.secondary, marginTop: 16 }}>
                            Aucune demande en attente
                        </Text>
                        <Text variant="bodyMedium" style={{ color: theme.colors.secondary, marginTop: 8, textAlign: 'center' }}>
                            Toutes les demandes ont été traitées
                        </Text>
                    </View>
                ) : (
                    requests.map((request, index) => (
                        <View key={request.id}>
                            <Surface style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Avatar.Text
                                        size={48}
                                        label={request.avatar}
                                        style={{ backgroundColor: '#E3F2FD' }}
                                        labelStyle={{ color: '#42A5F5' }}
                                    />
                                    <View style={{ marginLeft: 12, flex: 1 }}>
                                        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{request.patient}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                            <MaterialCommunityIcons
                                                name={request.type === 'record-access' ? 'file-document-edit' : 'calendar-clock'}
                                                size={16}
                                                color={theme.colors.secondary}
                                            />
                                            <Text variant="bodySmall" style={{ color: theme.colors.secondary, marginLeft: 4 }}>
                                                {request.type === 'record-access' ? 'Accès dossier médical' : 'Demande de RDV'}
                                            </Text>
                                        </View>
                                        <Text variant="bodySmall" style={{ color: theme.colors.secondary, marginTop: 2 }}>
                                            {request.date}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.cardContent}>
                                    {request.type === 'record-access' ? (
                                        <Text variant="bodyMedium" style={{ fontStyle: 'italic' }}>
                                            {request.message}
                                        </Text>
                                    ) : (
                                        <>
                                            <Text variant="bodyMedium" style={{ fontWeight: 'bold', marginBottom: 4 }}>
                                                Date souhaitée : {request.preferredDate}
                                            </Text>
                                            <Text variant="bodyMedium" style={{ fontStyle: 'italic' }}>
                                                {request.reason}
                                            </Text>
                                        </>
                                    )}
                                </View>

                                <View style={styles.cardActions}>
                                    <Button
                                        mode="outlined"
                                        onPress={() => handleReject(request.id)}
                                        style={{ flex: 1, marginRight: 8 }}
                                        textColor={theme.colors.error}
                                    >
                                        Refuser
                                    </Button>
                                    <Button
                                        mode="contained"
                                        onPress={() => handleAccept(request.id)}
                                        style={{ flex: 1 }}
                                    >
                                        Accepter
                                    </Button>
                                </View>
                            </Surface>
                            {index < requests.length - 1 && <Divider style={{ marginVertical: 8 }} />}
                        </View>
                    ))
                )}
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
        paddingHorizontal: 16,
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
    card: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cardContent: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    cardActions: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 8,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
});
