import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type RecentVisitCardProps = {
  doctorName: string;
  specialty: string;
  date?: string;
  time?: string;
  location?: string;
  status: 'completed' | 'upcoming' | 'cancelled' | 'available';
  visitType?: 'video' | 'in-person' | 'phone';
  image?: ImageSourcePropType;
  onPress?: () => void;
  onBook?: () => void;
};

export default function RecentVisitCard({
  doctorName,
  specialty,
  date,
  time,
  location,
  status,
  visitType = 'in-person',
  image,
  onPress,
  onBook,
}: RecentVisitCardProps) {
  const statusConfig = {
    completed: { label: 'Complété', color: '#25b983', bgColor: '#E6FFE6' },
    upcoming: { label: 'À venir', color: '#1791CC', bgColor: '#E6F7FF' },
    cancelled: { label: 'Annulé', color: '#FF6B6B', bgColor: '#FFE6E6' },
    available: { label: 'Disponible', color: '#1791CC', bgColor: '#E6F7FF' },
  };

  const statusInfo = statusConfig[status];

  const formatDetails = () => {
    const parts = [];
    if (date) parts.push(date);
    if (time) parts.push(time);
    if (location) parts.push(location);
    return parts.join(' | ');
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image Section */}
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={image} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="medical" size={40} color="#1791CC" />
          </View>
        )}

        {/* Overlay Icons (Top Left) */}
        <View style={styles.overlayIcons}>
          {visitType === 'video' && (
            <View style={styles.iconBadge}>
              <Ionicons name="videocam" size={16} color="#FFFFFF" />
            </View>
          )}
          {visitType === 'phone' && (
            <View style={styles.iconBadge}>
              <Ionicons name="call" size={16} color="#FFFFFF" />
            </View>
          )}
          {visitType === 'in-person' && (
            <View style={styles.iconBadge}>
              <MaterialCommunityIcons name="hospital-building" size={16} color="#FFFFFF" />
            </View>
          )}
        </View>

        {/* Status Tag (Top Right) */}
        <View style={[styles.statusTag, { backgroundColor: statusInfo.bgColor }]}>
          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {statusInfo.label}
          </Text>
        </View>
      </View>

      {/* Information Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoContent}>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.details}>
            {specialty}
            {formatDetails() && ` • ${formatDetails()}`}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: statusInfo.color }]}
          onPress={onBook}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>
            {status === 'completed' ? 'Voir détails' : status === 'upcoming' ? 'Rejoindre' : 'Réserver'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ADD8E6',
    overflow: 'hidden',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
    backgroundColor: '#F5F9FB',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E6F7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayIcons: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'column',
    gap: 8,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 12,
  },
  infoContent: {
    flex: 1,
    marginRight: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#193759',
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: '#9BA5B3',
    lineHeight: 18,
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 90,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
