import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GradientBackground, GlassCard, GlassButton } from '../../components/ui';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { useAuthStore } from '../../stores/auth';

export function SettingsScreen() {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={[typography.h2, styles.title]}>Settings</Text>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Account</Text>
          <Text style={typography.bodySmall}>Manage your account settings</Text>
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Security</Text>
          <Text style={typography.bodySmall}>Biometric authentication, change password</Text>
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Preferences</Text>
          <Text style={typography.bodySmall}>Currency, notifications, theme</Text>
        </GlassCard>
        <GlassButton title="Sign Out" onPress={clearAuth} variant="secondary" style={styles.signOut} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingTop: 60 },
  title: { marginBottom: spacing.lg },
  section: { marginBottom: spacing.md, padding: spacing.lg },
  signOut: { marginTop: spacing.lg },
});
