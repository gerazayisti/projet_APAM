import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, SegmentedButtons } from 'react-native-paper';
import { router } from 'expo-router';
import { theme } from '../../theme';

export default function LoginScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState<'patient' | 'doctor'>('patient');

    const handleLogin = () => {
        // TODO: Implement login logic with role validation
        if (role === 'doctor') {
            router.replace('/(doctor)/(tabs)' as any);
        } else {
            router.replace('/(patient)/(tabs)' as any);
        }
    };

    return (
        <View style={styles.container}>
            <Text variant="displayMedium" style={styles.title}>AP.A.M</Text>
            <Text variant="headlineMedium" style={styles.subtitle}>Connexion</Text>

            {/* Role Selector */}
            <SegmentedButtons
                value={role}
                onValueChange={(value) => setRole(value as 'patient' | 'doctor')}
                buttons={[
                    {
                        value: 'patient',
                        label: 'Patient',
                        icon: 'account',
                    },
                    {
                        value: 'doctor',
                        label: 'Médecin',
                        icon: 'doctor',
                    },
                ]}
                style={styles.roleSelector}
            />

            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
            />

            <TextInput
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                style={styles.input}
            />

            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Se connecter
            </Button>

            <Button
                mode="text"
                onPress={() => router.push('/(auth)/register-doctor' as any)}
                textColor={(theme.colors as any).secondary}
                style={{ marginTop: 16 }}
            >
                Vous êtes médecin ? Rejoignez-nous
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        color: theme.colors.primary,
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 30,
    },
    roleSelector: {
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
    },
});
