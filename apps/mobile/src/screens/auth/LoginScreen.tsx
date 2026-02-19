import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GradientBackground, GlassCard, GlassButton, GlassInput } from '../../components/ui';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function LoginScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={[typography.h1, styles.title]}>Nexus</Text>
        <Text style={[typography.bodySmall, styles.subtitle]}>Crypto AI Portfolio Tracker</Text>
        <GlassCard style={styles.card}>
          <GlassInput label="Email" placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" />
          <GlassInput label="Password" placeholder="Enter your password" secureTextEntry />
          <GlassButton title="Sign In" onPress={() => {}} />
          <GlassButton title="Create Account" onPress={() => {}} variant="ghost" style={styles.registerBtn} />
        </GlassCard>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: spacing.lg },
  title: { textAlign: 'center', marginBottom: spacing.xs },
  subtitle: { textAlign: 'center', marginBottom: spacing.xl, color: colors.textSecondary },
  card: { padding: spacing.lg },
  registerBtn: { marginTop: spacing.sm },
});
