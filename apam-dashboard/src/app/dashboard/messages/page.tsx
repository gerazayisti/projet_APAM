'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';
import { api } from '@/lib/api';
import { MOCK_PATIENTS } from '@/lib/mockData';

export default function MessagesPage() {
    const [conversations, setConversations] = useState<any[]>([]);
    const [activeConvo, setActiveConvo] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    // New conversation modal
    const [showNewConvModal, setShowNewConvModal] = useState(false);
    const [myPatients, setMyPatients] = useState<any[]>([]);
    const [patientSearch, setPatientSearch] = useState('');

    useEffect(() => {
        // Get current user ID from localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setCurrentUserId(user.id_pro || user.id_patient);
        }
    }, []);

    useEffect(() => {
        if (currentUserId) {
            fetchConversations();
            fetchMyPatients();
        }
    }, [currentUserId]);

    const fetchMyPatients = async () => {
        if (!currentUserId) return;
        try {
            const data = await api.getDoctorPatients(currentUserId);
            setMyPatients(data || []);
        } catch (error) {
            console.error('Failed to fetch patients:', error);
        }
    };

    const fetchConversations = async () => {
        if (!currentUserId) return;

        setLoading(true);
        try {
            const convos = await api.getConversations(currentUserId);
            // Enrich with patient/user details
            const enrichedConvos = await Promise.all(
                convos.map(async (c: any) => {
                    // Try to get patient details
                    try {
                        const patient = await api.getPatientById(c.other_user_id);
                        return {
                            ...c,
                            name: `${patient.nom} ${patient.prenom}`,
                            preview: 'Cliquez pour voir les messages',
                        };
                    } catch {
                        // Fallback if patient not found
                        return {
                            ...c,
                            name: `Utilisateur ${c.other_user_id}`,
                            preview: 'Cliquez pour voir les messages',
                        };
                    }
                })
            );
            setConversations(enrichedConvos);
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
            // Fallback to mock data
            const mockConvos = MOCK_PATIENTS.slice(0, 3).map((p, idx) => ({
                id: String(p.id_patient),
                other_user_id: p.id_patient,
                name: `${p.nom} ${p.prenom}`,
                preview: 'Conversation de démonstration',
                last_message_time: new Date().toISOString(),
            }));
            setConversations(mockConvos);
        } finally {
            setLoading(false);
        }
    };

    const selectConversation = async (convo: any) => {
        if (!currentUserId) return;

        setActiveConvo(convo);
        setLoading(true);
        try {
            const msgs = await api.getMessages(currentUserId, convo.other_user_id);
            setMessages(msgs);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            // Fallback to empty or mock messages
            setMessages([
                { id_message: 1, sender_id: currentUserId, content: 'Bonjour, comment allez-vous ?', created_at: new Date().toISOString(), is_read: true },
                { id_message: 2, sender_id: convo.other_user_id, content: 'Bonjour Docteur, ça va bien merci.', created_at: new Date().toISOString(), is_read: true },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConvo || !currentUserId) return;

        try {
            await api.sendMessage({
                sender_id: currentUserId,
                receiver_id: activeConvo.other_user_id,
                content: newMessage.trim(),
            });

            // Add optimistically to UI
            const optimisticMessage = {
                id_message: Date.now(),
                sender_id: currentUserId,
                receiver_id: activeConvo.other_user_id,
                content: newMessage.trim(),
                created_at: new Date().toISOString(),
                is_read: false,
            };
            setMessages([...messages, optimisticMessage]);
            setNewMessage('');

            // Refresh messages from server
            setTimeout(() => selectConversation(activeConvo), 500);
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Erreur lors de l\'envoi du message');
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (hours < 24) {
            return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        } else {
            return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
        }
    };

    return (
        <div className={styles.container}>
            {/* Sidebar with conversations */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h1 className={styles.sidebarTitle}>Messages</h1>
                </div>

                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Rechercher une conversation..."
                        className={styles.searchBar}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={styles.conversationsList}>
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#667781' }}>
                            Chargement...
                        </div>
                    ) : conversations.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#667781' }}>
                            Aucune conversation
                        </div>
                    ) : (
                        conversations
                            .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((convo) => (
                                <div
                                    key={convo.other_user_id}
                                    className={`${styles.conversationItem} ${activeConvo?.other_user_id === convo.other_user_id ? styles.active : ''}`}
                                    onClick={() => selectConversation(convo)}
                                >
                                    <div className={styles.conversationAvatar}>
                                        {convo.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2) || 'PA'}
                                    </div>
                                    <div className={styles.conversationInfo}>
                                        <div className={styles.conversationName}>{convo.name}</div>
                                        <div className={styles.conversationPreview}>{convo.preview}</div>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={styles.chatArea}>
                {!activeConvo ? (
                    <div className={styles.emptyChat}>
                        <Icons.MessageSquare size={100} />
                        <h3>Sélectionnez une conversation</h3>
                        <p>Choisissez un patient pour commencer à discuter</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.chatHeader}>
                            <div className={styles.chatHeaderAvatar}>
                                {activeConvo.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2) || 'PA'}
                            </div>
                            <div className={styles.chatHeaderInfo}>
                                <h3>{activeConvo.name}</h3>
                                <p>En ligne</p>
                            </div>
                        </div>

                        <div className={styles.messagesContainer}>
                            {messages.length === 0 ? (
                                <div style={{ textAlign: 'center', color: '#667781', padding: '2rem' }}>
                                    Aucun message. Commencez la conversation!
                                </div>
                            ) : (
                                messages.map((msg, idx) => {
                                    const isSent = msg.sender_id === currentUserId;
                                    return (
                                        <div
                                            key={idx}
                                            className={`${styles.messageGroup} ${isSent ? styles.sent : styles.received}`}
                                        >
                                            <div className={`${styles.messageBubble} ${isSent ? styles.sent : styles.received}`}>
                                                <div className={styles.messageContent}>{msg.content}</div>
                                                <div className={styles.messageTime}>
                                                    {new Date(msg.created_at || msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                    {isSent && <Icons.Check size={14} style={{ color: '#53bdeb' }} />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <div className={styles.inputContainer}>
                            <textarea
                                className={styles.messageInput}
                                placeholder="Écrivez un message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                rows={1}
                            />
                            <button
                                className={styles.sendButton}
                                onClick={() => handleSendMessage()}
                                disabled={!newMessage.trim()}
                            >
                                <Icons.Send size={20} />
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* FAB for New Conversation */}
            <button
                className={styles.fab}
                onClick={() => setShowNewConvModal(true)}
                title="Nouvelle conversation"
            >
                <Icons.Plus size={24} />
            </button>

            {/* New Conversation Modal */}
            {showNewConvModal && (
                <div className={styles.modalOverlay} onClick={() => setShowNewConvModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Nouvelle Conversation</h2>
                            <button onClick={() => setShowNewConvModal(false)} className={styles.closeBtn}>
                                <Icons.X size={24} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <input
                                type="text"
                                placeholder="Rechercher un patient..."
                                value={patientSearch}
                                onChange={(e) => setPatientSearch(e.target.value)}
                                className={styles.searchInput}
                            />
                            <div className={styles.patientsList}>
                                {myPatients
                                    .filter(p =>
                                        `${p.nom} ${p.prenom}`.toLowerCase().includes(patientSearch.toLowerCase())
                                    )
                                    .map(patient => (
                                        <div
                                            key={patient.id_patient}
                                            className={styles.patientItem}
                                            onClick={() => {
                                                setActiveConvo({
                                                    other_user_id: patient.id_patient,
                                                    name: `${patient.nom} ${patient.prenom}`,
                                                });
                                                setShowNewConvModal(false);
                                                setMessages([]);
                                            }}
                                        >
                                            <div className={styles.patientAvatar}>
                                                {patient.nom?.charAt(0)}{patient.prenom?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className={styles.patientName}>{patient.nom} {patient.prenom}</div>
                                                <div className={styles.patientInfo}>{patient.email}</div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
