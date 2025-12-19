import * as React from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import { Dimensions } from 'react-native';
import ScreenTransition, { defaultColors } from './ScreenTransition';

const { width } = Dimensions.get('window');

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

type ScreenTransitionWrapperProps = {
  children?: React.ReactNode;
  onNext?: () => void;
  colors?: Array<{
    initialBgColor: string;
    bgColor: string;
    nextBgColor: string;
  }>;
  icon?: string;
  iconColor?: string;
  showTransition?: boolean;
};

/**
 * Composant wrapper pour gérer les transitions d'écran avec animation de cercle
 * Utilisation :
 * 
 * const [index, setIndex] = useState(0);
 * const animatedValue = useRef(new Animated.Value(0)).current;
 * const animatedValue2 = useRef(new Animated.Value(0)).current;
 * const sliderAnimatedValue = useRef(new Animated.Value(0)).current;
 * 
 * const handleNext = () => {
 *   animatedValue.setValue(0);
 *   animatedValue2.setValue(0);
 *   // Animation
 *   Animated.parallel([
 *     Animated.timing(sliderAnimatedValue, {
 *       toValue: (index + 1) % colors.length,
 *       duration: TEXT_DURATION,
 *       useNativeDriver: true,
 *     }),
 *     Animated.timing(animatedValue, {
 *       toValue: 1,
 *       duration: DURATION,
 *       useNativeDriver: true,
 *     }),
 *     Animated.timing(animatedValue2, {
 *       toValue: 1,
 *       duration: DURATION,
 *       useNativeDriver: false,
 *     }),
 *   ]).start();
 *   setIndex((index + 1) % colors.length);
 * };
 */
export default function ScreenTransitionWrapper({
  children,
  onNext,
  colors = defaultColors,
  icon = 'arrow-forward',
  iconColor = 'white',
  showTransition = true,
}: ScreenTransitionWrapperProps) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      animatedValue.setValue(0);
      animatedValue2.setValue(0);
      
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue2, {
          toValue: 1,
          duration: DURATION,
          useNativeDriver: false,
        }),
      ]).start();
      
      setIndex((index + 1) % colors.length);
    }
  };

  return (
    <View style={styles.container}>
      {children}
      {showTransition && (
        <ScreenTransition
          onPress={handleNext}
          index={index}
          animatedValue={animatedValue}
          animatedValue2={animatedValue2}
          colors={colors}
          icon={icon}
          iconColor={iconColor}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});







