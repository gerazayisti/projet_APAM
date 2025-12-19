import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Text, Surface, Avatar, IconButton, useTheme, Button } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ConsultationScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    return (
        <View style={styles.container}>
            {/* Main Video Feed (Patient) */}
            <View style={styles.videoFeed}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/400?img=5' }}
                    style={styles.videoImage}
                />
                <View style={styles.patientLabel}>
                    <Text variant="titleMedium" style={{ color: '#FFF', fontWeight: 'bold' }}>Sophie Martin</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#42A5F5', marginRight: 6 }} />
                        <Text variant="labelSmall" style={{ color: '#FFF' }}>00:12:45</Text>
                    </View>
                </View>
            </View>

            {/* Self View (Doctor) */}
            {!isVideoOff && (
                <View style={styles.selfView}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
                        style={styles.selfImage}
                    />
                </View>
            )}

            {/* Controls */}
            <View style={styles.controlsContainer}>
                <IconButton
                    icon={isMuted ? "microphone-off" : "microphone"}
                    mode="contained"
                    containerColor={isMuted ? theme.colors.error : '#FFF'}
                    iconColor={isMuted ? '#FFF' : '#000'}
                    size={32}
                    onPress={() => setIsMuted(!isMuted)}
                />
                <IconButton
                    icon="phone-hangup"
                    mode="contained"
                    containerColor={theme.colors.error}
                    iconColor="#FFF"
                    size={40}
                    onPress={() => router.back()}
                    style={{ marginHorizontal: 24 }}
                />
                <IconButton
                    icon={isVideoOff ? "video-off" : "video"}
                    mode="contained"
                    containerColor={isVideoOff ? theme.colors.error : '#FFF'}
                    iconColor={isVideoOff ? '#FFF' : '#000'}
                    size={32}
                    onPress={() => setIsVideoOff(!isVideoOff)}
                />
            </View>

            {/* Top Actions */}
            <View style={styles.topActions}>
                <TouchableOpacity onPress={() => setShowSummary(!showSummary)}>
                    <Surface style={styles.actionButton}>
                        <MaterialCommunityIcons name="file-document-outline" size={24} color={theme.colors.primary} />
                        <Text variant="labelSmall" style={{ marginTop: 4 }}>Dossier</Text>
                    </Surface>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/(doctor)/prescription/create' as any)}>
                    <Surface style={styles.actionButton}>
                        <MaterialCommunityIcons name="pill" size={24} color={theme.colors.primary} />
                        <Text variant="labelSmall" style={{ marginTop: 4 }}>Ordonnance</Text>
                    </Surface>
                </TouchableOpacity>
            </View>

            {/* Patient Summary Sidebar (Overlay) */}
            {showSummary && (
                <Surface style={styles.summaryOverlay}>
                    <View style={styles.summaryHeader}>
                        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Résumé Patient</Text>
                        <IconButton icon="close" size={20} onPress={() => setShowSummary(false)} />
                    </View>
                    <View style={styles.summaryContent}>
                        <View style={styles.summaryItem}>
                            <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>Âge</Text>
                            <Text variant="bodyMedium">34 ans</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>Dernière visite</Text>
                            <Text variant="bodyMedium">12 Mars 2024</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>Allergies</Text>
                            <Text variant="bodyMedium" style={{ color: theme.colors.error }}>Pénicilline</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>Traitement</Text>
                            <Text variant="bodyMedium">Ibuprofène</Text>
                        </View>
                        <Button mode="outlined" style={{ marginTop: 16 }} onPress={() => router.push(`/(doctor)/patient/${id}/notes` as any)}>
                            Prendre des notes
                        </Button>
                    </View>
                </Surface>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    videoFeed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.9,
    },
    patientLabel: {
        position: 'absolute',
        top: 60,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 8,
    },
    selfView: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 100,
        height: 140,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFF',
        elevation: 5,
    },
    selfImage: {
        width: '100%',
        height: '100%',
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topActions: {
        position: 'absolute',
        right: 20,
        top: 220,
        gap: 12,
    },
    actionButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryOverlay: {
        position: 'absolute',
        left: 20,
        top: 150,
        width: 200,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 12,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    summaryContent: {
        gap: 8,
    },
    summaryItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 4,
    },
});
