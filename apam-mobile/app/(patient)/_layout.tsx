import { Stack } from 'expo-router';

export default function PatientLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="health-record" />
            <Stack.Screen name="prescriptions/index" />
            <Stack.Screen name="results/index" />
            <Stack.Screen name="teleconsultation/index" />
            <Stack.Screen name="notifications/requests" />
            <Stack.Screen name="medications/index" />
            <Stack.Screen name="medications/add" />
        </Stack>
    );
}
