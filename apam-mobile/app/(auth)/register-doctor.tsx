import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    fullName: yup.string().required('Le nom complet est requis'),
    email: yup.string().email('Email invalide').required('L\'email est requis'),
    password: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),
    specialty: yup.string().required('La spécialité est requise'),
    licenseNumber: yup.string().required('Le numéro de licence/RPPS est requis'),
    experience: yup.number().typeError('Doit être un nombre').required('L\'expérience est requise'),
});

export default function RegisterDoctorScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            specialty: '',
            licenseNumber: '',
            experience: '' as any,
        }
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.replace('/(auth)/pending-validation' as any);
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>Inscription Médecin</Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary, marginTop: 8 }}>
                        Rejoignez le réseau APAM et gérez vos patients efficacement.
                    </Text>
                </View>

                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="fullName"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                label="Nom complet (Dr.)"
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                style={styles.input}
                                error={!!errors.fullName}
                            />
                        )}
                    />
                    <HelperText type="error" visible={!!errors.fullName}>{errors.fullName?.message}</HelperText>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                label="Email professionnel"
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                style={styles.input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                error={!!errors.email}
                            />
                        )}
                    />
                    <HelperText type="error" visible={!!errors.email}>{errors.email?.message}</HelperText>

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                label="Mot de passe"
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                secureTextEntry
                                style={styles.input}
                                error={!!errors.password}
                            />
                        )}
                    />
                    <HelperText type="error" visible={!!errors.password}>{errors.password?.message}</HelperText>

                    <Controller
                        control={control}
                        name="specialty"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                label="Spécialité (ex: Cardiologue)"
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                style={styles.input}
                                error={!!errors.specialty}
                            />
                        )}
                    />
                    <HelperText type="error" visible={!!errors.specialty}>{errors.specialty?.message}</HelperText>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Controller
                                control={control}
                                name="licenseNumber"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        label="N° RPPS / Licence"
                                        value={value}
                                        onChangeText={onChange}
                                        mode="outlined"
                                        style={styles.input}
                                        error={!!errors.licenseNumber}
                                    />
                                )}
                            />
                            <HelperText type="error" visible={!!errors.licenseNumber}>{errors.licenseNumber?.message}</HelperText>
                        </View>
                        <View style={{ flex: 0.6 }}>
                            <Controller
                                control={control}
                                name="experience"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        label="Exp. (ans)"
                                        value={value ? String(value) : ''}
                                        onChangeText={onChange}
                                        mode="outlined"
                                        keyboardType="numeric"
                                        style={styles.input}
                                        error={!!errors.experience}
                                    />
                                )}
                            />
                            <HelperText type="error" visible={!!errors.experience}>{errors.experience?.message as any}</HelperText>
                        </View>
                    </View>

                    <Button
                        mode="contained"
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        style={styles.button}
                        contentStyle={{ height: 50 }}
                    >
                        S'inscrire
                    </Button>

                    <Button
                        mode="text"
                        onPress={() => router.back()}
                        style={{ marginTop: 16 }}
                    >
                        Déjà un compte ? Se connecter
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 60,
    },
    header: {
        marginBottom: 32,
    },
    form: {
        gap: 4,
    },
    input: {
        backgroundColor: '#FFF',
    },
    button: {
        marginTop: 24,
        borderRadius: 8,
    },
});
