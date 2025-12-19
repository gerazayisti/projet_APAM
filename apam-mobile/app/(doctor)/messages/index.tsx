import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Surface, Searchbar, IconButton, useTheme, Avatar, Badge } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '@/config/api';

export default function DoctorMessagesScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [conversations, setConversations] = useState<any[]>([]);
    const [proId, setProId] = useState(1); // TODO: Get from auth
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        setLoading(true);
        try {
            const data = await api.getConversations(proId);
            if (data && data.length > 0) {
                const transformed = data.map((conv: any) => ({
                    id: conv.other_user_id?.toString(),
                    patientId: conv.other_user_id?.toString(),
                    patientName: 'Patient ' + conv.other_user_id,
                    avatar: 'PT',
                    lastMessage: 'Cliquez pour voir les messages',
                    timestamp: new Date(conv.last_message_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                    unread: 0,
                }));
                setConversations(transformed);
            }
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredConversations = conversations.filter(conv =>
        conv.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#193759' }}>
                        Messagerie
                    </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Searchbar
                    placeholder="Rechercher une conversation"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    elevation={0}
                />

                {loading ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Chargement...</Text>
                ) : filteredConversations.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.secondary }}>
                        Aucune conversation
                    </Text>
                ) : (
                    filteredConversations.map((conv) => (
                        <Surface
                            key={conv.id}
                            style={styles.conversationCard}
                            onTouchEnd={() => router.push(`/(doctor)/messages/${conv.patientId}` as any)}
                        >
                            <View style={styles.conversationHeader}>
                                <Avatar.Text
                                    size={56}
                                    label={conv.avatar}
                                    style={{ backgroundColor: '#E3F2FD' }}
                                    labelStyle={{ color: '#42A5F5' }}
                                />
                                <View style={{ marginLeft: 12, flex: 1 }}>
                                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
                                        {conv.patientName}
                                    </Text>
                                    <Text
                                        variant="bodyMedium"
                                        style={{ color: theme.colors.secondary, marginTop: 4 }}
                                        numberOfLines={1}
                                    >
                                        {conv.lastMessage}
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
                                        {conv.timestamp}
                                    </Text>
                                    {conv.unread > 0 && (
                                        <Badge style={{ backgroundColor: theme.colors.primary, marginTop: 8 }}>
                                            {conv.unread}
                                        </Badge>
                                    )}
                                </View>
                            </View>
                        </Surface>
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
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    content: {
        padding: 20,
    },
    searchBar: {
        marginBottom: 16,
        backgroundColor: '#F5F5F5',
    },
    conversationCard: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    conversationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
