import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type ServiceCardProps = {
  title: string;
  icon: string;
  iconType: 'Ionicons' | 'MaterialCommunityIcons';
  color: string;
  label?: string;
  value?: string;
  onPress?: () => void;
};

export default function ServiceCard({
  title,
  icon,
  iconType,
  color,
  label = 'Disponible',
  value = '24/7',
  onPress,
}: ServiceCardProps) {
  const IconComponent = iconType === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons;
  
  // Couleur de gradient vert clair pastel (comme dans le design)
  const gradientColor = '#E6FFE6'; // Pale green pastel

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Gradient vert clair en haut à droite */}
      <View style={[styles.gradient, { backgroundColor: gradientColor }]} />

      {/* Contenu principal */}
      <View style={styles.content}>
        {/* Texte à gauche */}
        <View style={styles.textContent}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>

        {/* Conteneur blanc avec icône en haut à droite */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconContainer}>
            <IconComponent name={icon as any} size={28} color={color} />
          </View>
        </View>
      </View>

      {/* Titre en bas */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '65%',
    height: '45%',
    borderTopRightRadius: 20,
    opacity: 0.7,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    zIndex: 1,
    marginBottom: 12,
  },
  textContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  label: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '500',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  value: {
    fontSize: 38,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  iconWrapper: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  titleContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#193759',
    lineHeight: 20,
  },
});
