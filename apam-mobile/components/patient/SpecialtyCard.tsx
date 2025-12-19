import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type SpecialtyCardProps = {
  title: string;
  icon: string;
  iconType: 'Ionicons' | 'MaterialCommunityIcons';
  color: string;
  onPress?: () => void;
};

export default function SpecialtyCard({
  title,
  icon,
  iconType,
  color,
  onPress,
}: SpecialtyCardProps) {
  const IconComponent = iconType === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons;
  
  // Convert Ionicons to outlined version
  const outlinedIcon = iconType === 'Ionicons' && !icon.includes('-outline') 
    ? `${icon}-outline` 
    : icon;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconComponent name={outlinedIcon as any} size={32} color={color} />
      <Text style={[styles.title, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 110,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    padding: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});
