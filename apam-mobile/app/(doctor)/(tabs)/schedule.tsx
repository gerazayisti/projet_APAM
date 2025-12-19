import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Surface, Avatar, useTheme, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const dates = [
    { day: 'Lun', date: '12', full: '2024-03-12' },
    { day: 'Mar', date: '13', full: '2024-03-13' },
    { day: 'Mer', date: '14', full: '2024-03-14' },
    { day: 'Jeu', date: '15', full: '2024-03-15' },
    { day: 'Ven', date: '16', full: '2024-03-16' },
];

const appointments = [
    {
        id: '1',
        time: '09:00',
        patient: 'Sophie Martin',
        type: 'Consultation Vidéo',
        status: 'confirmed',
        duration: '30 min',
        avatar: 'SM',
    },
    {
        id: '2',
        time: '10:00',
        patient: 'Jean Dupont',
        type: 'Suivi Mensuel',
        status: 'confirmed',
        duration: '45 min',
        avatar: 'JD',
    },
    {
        id: '3',
        time: '11:30',
        patient: 'Marie Curie',
        type: 'Urgence',
        status: 'pending',
        duration: '15 min',
        avatar: 'MC',
    },
    {
        id: '4',
        time: '14:00',
        patient: 'Pierre Durand',
        type: 'Renouvellement',
        status: 'confirmed',
        duration: '15 min',
        avatar: 'PD',
    },
];

export default function ScheduleScreen() {
    const theme = useTheme();
    const [selectedDate, setSelectedDate] = useState('2024-03-12');

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text variant="headlineMedium" style={styles.headerTitle}>Planning</Text>
                <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>Mars 2024</Text>
            </View>

            {/* Calendar Strip */}
            <View style={styles.calendarStrip}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                    {dates.map((item) => {
                        const isSelected = selectedDate === item.full;
                        return (
                            <TouchableOpacity
                                key={item.full}
                                style={[
                                    styles.dateItem,
                                    isSelected && { backgroundColor: theme.colors.primary }
                                ]}
                                onPress={() => setSelectedDate(item.full)}
                            >
                                <Text variant="labelMedium" style={{ color: isSelected ? '#FFF' : theme.colors.secondary }}>{item.day}</Text>
                                <Text variant="titleLarge" style={{ fontWeight: 'bold', color: isSelected ? '#FFF' : '#193759' }}>{item.date}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Timeline */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
                {appointments.map((apt) => (
                    <View key={apt.id} style={styles.timelineItem}>
                        <View style={styles.timeColumn}>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold', color: '#193759' }}>{apt.time}</Text>
                            <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>{apt.duration}</Text>
                        </View>
                        <Surface style={styles.appointmentCard}>
                            <View style={[styles.statusIndicator, { backgroundColor: apt.status === 'confirmed' ? '#42A5F5' : '#90CAF9' }]} />
                            <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                                <Avatar.Text size={40} label={apt.avatar} style={{ backgroundColor: theme.colors.secondaryContainer }} />
                                <View style={{ marginLeft: 12, flex: 1 }}>
                                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{apt.patient}</Text>
                                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>{apt.type}</Text>
                                </View>
                                <TouchableOpacity>
                                    <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.secondary} />
                                </TouchableOpacity>
                            </View>
                        </Surface>
                    </View>
                ))}
            </ScrollView>

            <FAB
                icon="plus"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                color="#FFF"
                onPress={() => { }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#FFF',
    },
    headerTitle: {
        fontWeight: 'bold',
        color: '#193759',
    },
    calendarStrip: {
        backgroundColor: '#FFF',
        paddingBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 2,
    },
    dateItem: {
        width: 60,
        height: 80,
        borderRadius: 30,
        backgroundColor: '#F5F9FB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    timeColumn: {
        width: 60,
        alignItems: 'center',
        paddingTop: 16,
    },
    appointmentCard: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: '#FFF',
        overflow: 'hidden',
    },
    statusIndicator: {
        width: 4,
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 30,
    },
});
