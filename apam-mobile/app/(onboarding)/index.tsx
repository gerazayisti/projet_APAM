import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding1 from '@/components/onboarding/Onboarding1';
import Onboarding2 from '@/components/onboarding/Onboarding2';
import Onboarding3 from '@/components/onboarding/Onboarding3';
import Onboarding4 from '@/components/onboarding/Onboarding4';

export default function OnboardingScreen() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const finishOnboarding = async () => {
        try {
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
            router.replace('/(auth)/login' as any);
        } catch (error) {
            console.error('Error saving onboarding status:', error);
            router.replace('/(auth)/login' as any);
        }
    };

    const handleContinue = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            finishOnboarding();
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    let content = null;
    switch (step) {
        case 1:
            content = <Onboarding1 onContinue={handleContinue} />;
            break;
        case 2:
            content = <Onboarding2 onContinue={handleContinue} onBack={handleBack} />;
            break;
        case 3:
            content = <Onboarding3 onContinue={handleContinue} onBack={handleBack} />;
            break;
        case 4:
            content = <Onboarding4 onContinue={handleContinue} onBack={handleBack} />;
            break;
        default:
            content = <Onboarding1 onContinue={handleContinue} />;
    }

    return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
