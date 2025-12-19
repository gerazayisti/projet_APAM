import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

type ProgressCardProps = {
  percentage: number;
  label: string;
  description: string;
};

export default function ProgressCard({
  percentage,
  label,
  description,
}: ProgressCardProps) {
  const size = 120;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Calculate gradient stops based on percentage
  // Smooth transition from green to orange
  const gradientStart = 0;
  const gradientMiddle = percentage > 0 ? Math.min(percentage * 0.8 / 100, 0.8) : 0;
  const gradientEnd = percentage / 100;

  return (
    <View style={styles.card}>
      <View style={styles.progressContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          <Defs>
            <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#25b983" stopOpacity="1" />
              <Stop offset="70%" stopColor="#25b983" stopOpacity="1" />
              <Stop offset="75%" stopColor="#3EB86E" stopOpacity="1" />
              <Stop offset="80%" stopColor="#5AC359" stopOpacity="1" />
              <Stop offset="85%" stopColor="#7CCB44" stopOpacity="1" />
              <Stop offset="90%" stopColor="#9ED32F" stopOpacity="1" />
              <Stop offset="95%" stopColor="#D4B11A" stopOpacity="1" />
              <Stop offset="100%" stopColor="#42A5F5" stopOpacity="1" />
            </LinearGradient>
          </Defs>

          {/* Background circle - light gray */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E8E8E8"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Progress circle with continuous gradient */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>

        {/* Percentage text in center */}
        <View style={styles.percentageContainer}>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
      </View>

      <Text style={styles.label}>{label}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#C8E6C9',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 200,
    justifyContent: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  percentageContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  percentage: {
    fontSize: 36,
    fontWeight: '800',
    color: '#000000',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    opacity: 0.7,
  },
});