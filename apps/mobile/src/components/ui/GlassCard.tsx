import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { glass } from '../../theme';
import { spacing } from '../../theme/spacing';

interface GlassCardProps extends ViewProps {
  elevated?: boolean;
  padding?: keyof typeof spacing;
}

export function GlassCard({ elevated, padding = 'md', style, children, ...props }: GlassCardProps) {
  return (
    <View
      style={[elevated ? glass.cardElevated : glass.card, { padding: spacing[padding] }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
