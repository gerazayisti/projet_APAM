import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DoctorTabsLayout() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const bottomMargin = 15 + insets.bottom;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: '#9BA5B3',
                tabBarStyle: {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderTopWidth: 0,
                    elevation: 0,
                    marginBottom: bottomMargin,
                    marginHorizontal: 10,
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
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="patients"
                options={{
                    title: 'Patients',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-group" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="schedule"
                options={{
                    title: 'Planning',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
