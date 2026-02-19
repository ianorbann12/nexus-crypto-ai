import { StyleSheet, ViewStyle } from 'react-native';
import { colors } from './colors';

export const glass: Record<string, ViewStyle> = StyleSheet.create({
  card: {
    backgroundColor: colors.glassBg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardElevated: {
    backgroundColor: colors.glassBg,
    borderWidth: 1,
    borderColor: colors.glassHighlight,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  input: {
    backgroundColor: colors.glassBg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
