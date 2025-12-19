import * as React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

type ScreenTransitionProps = {
  onPress: () => void;
  index: number;
  animatedValue: Animated.Value;
  animatedValue2: Animated.Value;
  colors: Array<{
    initialBgColor: string;
    bgColor: string;
    nextBgColor: string;
  }>;
  icon?: string;
  iconColor?: string;
};

const Circle = ({
  onPress,
  index,
  animatedValue,
  animatedValue2,
  colors,
  icon = 'arrow-forward',
  iconColor = 'white',
}: ScreenTransitionProps) => {
  const { initialBgColor, nextBgColor, bgColor } = colors[index] || colors[0];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];

  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });

  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        { backgroundColor },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: dotBgColor,
            transform: [
              { perspective: 200 },
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },
              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }),
              },
              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0%', '50%', '0%'],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                    }),
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ['0deg', '180deg', '180deg', '180deg'],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}
          >
            <AnimatedIonicons name={icon as any} size={28} color={iconColor} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function ScreenTransition({
  onPress,
  index,
  animatedValue,
  animatedValue2,
  colors,
  icon,
  iconColor,
}: ScreenTransitionProps) {
  return (
    <Circle
      onPress={onPress}
      index={index}
      animatedValue={animatedValue}
      animatedValue2={animatedValue2}
      colors={colors}
      icon={icon}
      iconColor={iconColor}
    />
  );
}

// Couleurs par défaut pour AP.A.M (peuvent être personnalisées)
export const defaultColors = [
  {
    initialBgColor: '#1791CC',
    bgColor: '#FFFFFF',
    nextBgColor: '#64B5F6',
  },
  {
    initialBgColor: '#FFFFFF',
    bgColor: '#64B5F6',
    nextBgColor: '#BBDEFB',
  },
  {
    initialBgColor: '#64B5F6',
    bgColor: '#BBDEFB',
    nextBgColor: '#1791CC',
  },
  {
    initialBgColor: '#BBDEFB',
    bgColor: '#1791CC',
    nextBgColor: '#FFFFFF',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 50,
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#1791CC',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});







