import { colors } from './colors';
import { typography } from './typography';
import { MD3LightTheme } from 'react-native-paper';

export const theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...colors,
        secondary: colors.textSecondary,
    },
    typography,
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48,
    },
    roundness: 4,
};

export type Theme = typeof theme;

