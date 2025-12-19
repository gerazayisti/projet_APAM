import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {

  const insets = useSafeAreaInsets();
  const bottomMargin = 15 + insets.bottom;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1791CC',
        tabBarInactiveTintColor: '#9BA5B3',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderTopWidth: 0,
          elevation: 0,
          marginBottom: bottomMargin,
          marginHorizontal: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          height: 65,
          paddingBottom: 20,
          paddingTop: 8,
          borderRadius: 50,
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={focused ? '#1791CC' : '#9BA5B3'} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Rendez-vous',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={24} color={focused ? '#1791CC' : '#9BA5B3'} />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Santé',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={24} color={focused ? '#1791CC' : '#9BA5B3'} />
          ),
        }}
      />
      <Tabs.Screen
        name="consultations"
        options={{
          title: 'Consultations',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={focused ? '#1791CC' : '#9BA5B3'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={focused ? '#1791CC' : '#9BA5B3'} />
          ),
        }}
      />
    </Tabs>
  );
}

