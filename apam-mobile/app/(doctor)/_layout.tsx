import { Stack } from 'expo-router';

export default function DoctorLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="consultation/[id]" />
            <Stack.Screen name="patient/[id]" />
            <Stack.Screen name="patient/[id]/notes" />
            <Stack.Screen name="patient/[id]/record-edit" />
            <Stack.Screen name="prescription/create" />
            <Stack.Screen name="today-patients" />
            <Stack.Screen name="pending-requests" />
            <Stack.Screen name="messages" />
            <Stack.Screen name="appointments" />
            <Stack.Screen name="patients" />
            <Stack.Screen name="prescriptions" />
            <Stack.Screen name="profile" />
        </Stack>
    );
}
