import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type CalendarProps = {
  pastAppointmentDates?: number[]; // Dates passées avec rendez-vous (ex: [1, 5, 12, 20])
  onDatePress?: (date: number) => void;
};

export default function Calendar({ pastAppointmentDates = [], onDatePress }: CalendarProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  // Premier jour du mois et nombre de jours
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Noms des jours
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // Noms des mois
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Générer les cases du calendrier
  const calendarDays = [];

  // Cases vides pour le début du mois
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Jours du mois
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <View style={styles.container}>
      {/* En-tête du calendrier */}
      <View style={styles.header}>
        <Text style={styles.monthText}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
      </View>

      {/* Noms des jours */}
      <View style={styles.dayNamesRow}>
        {dayNames.map((dayName, index) => (
          <View key={index} style={styles.dayNameCell}>
            <Text style={styles.dayNameText}>{dayName}</Text>
          </View>
        ))}
      </View>

      {/* Grille du calendrier */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <View key={`empty-${index}`} style={styles.calendarCell} />;
          }

          const isPast = day < currentDate;
          const hasAppointment = pastAppointmentDates.includes(day);
          const isToday = day === currentDate;

          return (
            <TouchableOpacity
              key={day}
              style={styles.calendarCell}
              onPress={() => onDatePress?.(day)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.dateContainer,
                  isToday && styles.todayContainer,
                  isPast && hasAppointment && styles.pastAppointmentContainer,
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    isToday && styles.todayText,
                    isPast && !hasAppointment && styles.pastDateText,
                    isPast && hasAppointment && styles.pastAppointmentText,
                  ]}
                >
                  {day}
                </Text>
                {isPast && hasAppointment && (
                  <View style={styles.appointmentMark} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#193759',
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dayNameCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9BA5B3',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: '14.28%', // 100% / 7 jours
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  dateContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'relative',
  },
  todayContainer: {
    backgroundColor: '#1791CC',
    borderRadius: 8,
  },
  pastAppointmentContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#193759',
  },
  todayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  pastDateText: {
    color: '#D0D0D0',
  },
  pastAppointmentText: {
    color: '#25b983',
    fontWeight: '700',
  },
  appointmentMark: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#25b983',
  },
});






