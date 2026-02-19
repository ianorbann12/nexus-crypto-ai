import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, Switch, View } from 'react-native';
import { GradientBackground, GlassCard, GlassButton } from '../../components/ui';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';
import { useAuthStore } from '../../stores/auth';
import { api } from '../../services/api';
import storage from '../../services/storage';
import { isBiometricAvailable, authenticateWithBiometric } from '../../services/biometric';

export function SettingsScreen() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const user = useAuthStore((s) => s.user);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const available = await isBiometricAvailable();
      setBiometricAvailable(available);
      if (available) {
        const enabled = await storage.isBiometricEnabled();
        setBiometricEnabled(enabled);
      }
    })();
  }, []);

  async function toggleBiometric(value: boolean) {
    if (value) {
      const success = await authenticateWithBiometric();
      if (success) {
        await storage.setBiometricEnabled(true);
        setBiometricEnabled(true);
      }
    } else {
      await storage.setBiometricEnabled(false);
      setBiometricEnabled(false);
    }
  }

  async function handleSignOut() {
    try {
      await api.auth.logout();
    } catch {
      // Clear local state even if server logout fails
    }
    await storage.clearAll();
    clearAuth();
  }

  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={[typography.h2, styles.title]}>Settings</Text>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Account</Text>
          {user && (
            <>
              <Text style={[typography.bodySmall, styles.detail]}>{user.username}</Text>
              <Text style={[typography.bodySmall, styles.detail]}>{user.email}</Text>
            </>
          )}
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Security</Text>
          {biometricAvailable && (
            <View style={styles.row}>
              <Text style={typography.body}>Biometric Login</Text>
              <Switch
                value={biometricEnabled}
                onValueChange={toggleBiometric}
                trackColor={{ false: colors.surfaceLight, true: colors.primary }}
                thumbColor={colors.text}
              />
            </View>
          )}
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Preferences</Text>
          <Text style={typography.bodySmall}>Currency, notifications, theme</Text>
        </GlassCard>
        <GlassButton title="Sign Out" onPress={handleSignOut} variant="secondary" style={styles.signOut} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingTop: 60 },
  title: { marginBottom: spacing.lg },
  section: { marginBottom: spacing.md, padding: spacing.lg },
  detail: { marginTop: spacing.xs, color: colors.textSecondary },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  signOut: { marginTop: spacing.lg },
});
