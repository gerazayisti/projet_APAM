import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type HealthInfoCardProps = {
  category: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

export default function HealthInfoCard({
  category,
  title,
  subtitle,
  onPress,
}: HealthInfoCardProps) {
  return (
    <View style={styles.card}>
 

      {/* Icons container */}
      <View style={styles.iconsContainer}>
        {/* Green medical icon - no background */}
        <MaterialCommunityIcons name="heart-pulse" size={82} color="#ffffff" />
      </View>

      {/* Category tag (white with black text) */}
      <View style={styles.categoryTag}>
        <Text style={styles.categoryText}>#{category}</Text>
      </View>

      {/* Title and subtitle (black text) */}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      {/* Navigation button (dark gray circular) */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={onPress}
        activeOpacity={0.4}
      >
        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#C8E6C9', // Light green background (uniform)
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    overflow: 'visible',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'space-between',
  },
  floatingElement: {
    position: 'absolute',
    top: -12,
    right: -8,
    zIndex: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  categoryTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000000',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
  },
  navButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5A5A5A', // Dark gray
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});