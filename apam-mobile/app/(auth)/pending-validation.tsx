import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PendingValidationScreen() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Surface style={styles.card} elevation={2}>
                <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                    <MaterialCommunityIcons name="clock-check-outline" size={64} color={theme.colors.primary} />
                </View>

                <Text variant="headlineSmall" style={styles.title}>Inscription en attente</Text>

                <Text variant="bodyLarge" style={styles.description}>
                    Merci pour votre inscription, Dr.
                </Text>

                <Text variant="bodyMedium" style={[styles.description, { color: theme.colors.secondary, marginTop: 8 }]}>
                    Votre dossier est actuellement en cours d'examen par l'équipe de validation APAM. Nous vérifions vos informations professionnelles (N° RPPS, Spécialité) pour garantir la sécurité du réseau.
                </Text>

                <View style={styles.infoBox}>
                    <MaterialCommunityIcons name="information" size={24} color={theme.colors.primary} />
                    <Text variant="bodySmall" style={{ flex: 1, marginLeft: 12, color: '#193759' }}>
                        Vous recevrez un email de confirmation sous 24 à 48 heures une fois votre compte validé.
                    </Text>
                </View>

                <Button
                    mode="contained"
                    onPress={() => router.replace('/(auth)/login' as any)}
                    style={styles.button}
                    contentStyle={{ height: 50 }}
                >
                    Retour à la connexion
                </Button>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        padding: 32,
        borderRadius: 24,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontWeight: 'bold',
        color: '#193759',
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        lineHeight: 24,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#F5F9FB',
        padding: 16,
        borderRadius: 12,
        marginTop: 24,
        marginBottom: 32,
        alignItems: 'center',
    },
    button: {
        width: '100%',
        borderRadius: 12,
    },
});
