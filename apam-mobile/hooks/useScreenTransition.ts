import * as React from 'react';
import { Animated } from 'react-native';

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

type TransitionColors = Array<{
  initialBgColor: string;
  bgColor: string;
  nextBgColor: string;
}>;

type UseScreenTransitionReturn = {
  index: number;
  animatedValue: Animated.Value;
  animatedValue2: Animated.Value;
  sliderAnimatedValue: Animated.Value;
  animate: (nextIndex: number) => Animated.CompositeAnimation;
  onPress: () => void;
  goToIndex: (newIndex: number) => void;
};

/**
 * Hook personnalisé pour gérer les transitions d'écran avec animation de cercle
 * 
 * @param colors - Tableau de couleurs pour les transitions
 * @param initialIndex - Index initial (par défaut: 0)
 * @returns Objet contenant les valeurs animées, l'index actuel et les fonctions de contrôle
 * 
 * @example
 * const { index, animatedValue, animatedValue2, animate, onPress } = useScreenTransition(defaultColors);
 * 
 * // Dans votre composant
 * <ScreenTransition
 *   index={index}
 *   animatedValue={animatedValue}
 *   animatedValue2={animatedValue2}
 *   colors={defaultColors}
 *   onPress={onPress}
 * />
 */
export function useScreenTransition(
  colors: TransitionColors,
  initialIndex: number = 0
): UseScreenTransitionReturn {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(initialIndex);

  const animate = React.useCallback(
    (nextIndex: number) => {
      return Animated.parallel([
        Animated.timing(sliderAnimatedValue, {
          toValue: nextIndex,
          duration: TEXT_DURATION,
          useNativeDriver: true,
        }),
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
      ]);
    },
    [animatedValue, animatedValue2, sliderAnimatedValue]
  );

  const onPress = React.useCallback(() => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    const nextIndex = (index + 1) % colors.length;
    animate(nextIndex).start();
    setIndex(nextIndex);
  }, [index, colors.length, animate, animatedValue, animatedValue2]);

  const goToIndex = React.useCallback(
    (newIndex: number) => {
      if (newIndex >= 0 && newIndex < colors.length) {
        animatedValue.setValue(0);
        animatedValue2.setValue(0);
        animate(newIndex).start();
        setIndex(newIndex);
      }
    },
    [colors.length, animate, animatedValue, animatedValue2]
  );

  return {
    index,
    animatedValue,
    animatedValue2,
    sliderAnimatedValue,
    animate,
    onPress,
    goToIndex,
  };
}







