import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GradientBackground, GlassCard, GlassButton, GlassInput } from '../../components/ui';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function RegisterScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={[typography.h2, styles.title]}>Create Account</Text>
        <GlassCard style={styles.card}>
          <GlassInput label="Username" placeholder="Choose a username" autoCapitalize="none" />
          <GlassInput label="Email" placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" />
          <GlassInput label="Password" placeholder="Create a password" secureTextEntry />
          <GlassButton title="Sign Up" onPress={() => {}} />
        </GlassCard>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: spacing.lg },
  title: { textAlign: 'center', marginBottom: spacing.lg },
  card: { padding: spacing.lg },
});
