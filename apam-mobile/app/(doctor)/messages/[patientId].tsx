import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Surface, IconButton, useTheme, TextInput } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';

const mockMessages = [
    { id: '1', sender: 'patient', text: 'Bonjour docteur, j\'ai une question', timestamp: '09:30' },
    { id: '2', sender: 'doctor', text: 'Bonjour, je vous écoute', timestamp: '09:32' },
    { id: '3', sender: 'patient', text: 'Puis-je prendre du paracétamol avec mon traitement actuel ?', timestamp: '09:33' },
    { id: '4', sender: 'doctor', text: 'Oui, pas de contre-indication. 1g maximum 3 fois par jour.', timestamp: '09:35' },
];

export default function ChatScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { patientId } = useLocalSearchParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(mockMessages);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                sender: 'doctor',
                text: message.trim(),
                timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            <View style={styles.header}>
                <IconButton icon="arrow-left" onPress={() => router.back()} />
                <Text variant="titleLarge" style={{ fontWeight: 'bold', color: '#193759', flex: 1 }}>
                    Sophie Martin
                </Text>
                <IconButton icon="phone" onPress={() => { }} />
                <IconButton icon="video" onPress={() => { }} />
            </View>

            <ScrollView contentContainerStyle={styles.messagesContainer}>
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageBubble,
                            msg.sender === 'doctor' ? styles.doctorMessage : styles.patientMessage,
                        ]}
                    >
                        <Text variant="bodyMedium" style={{ color: msg.sender === 'doctor' ? '#FFF' : '#000' }}>
                            {msg.text}
                        </Text>
                        <Text
                            variant="bodySmall"
                            style={{
                                color: msg.sender === 'doctor' ? 'rgba(255,255,255,0.7)' : theme.colors.secondary,
                                marginTop: 4,
                                alignSelf: 'flex-end',
                            }}
                        >
                            {msg.timestamp}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <Surface style={styles.inputContainer}>
                <IconButton icon="attachment" size={24} onPress={() => { }} />
                <TextInput
                    placeholder="Écrire un message..."
                    value={message}
                    onChangeText={setMessage}
                    mode="outlined"
                    style={styles.input}
                    multiline
                    maxLength={500}
                />
                <IconButton icon="send" size={24} onPress={sendMessage} iconColor={theme.colors.primary} />
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
        paddingBottom: 8,
        paddingHorizontal: 8,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    messagesContainer: {
        padding: 16,
        flexGrow: 1,
    },
    messageBubble: {
        maxWidth: '75%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
    },
    doctorMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#42A5F5',
    },
    patientMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    input: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        maxHeight: 100,
    },
});
