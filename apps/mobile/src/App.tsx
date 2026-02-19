import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/RootNavigator';
import { useAuthStore } from './stores/auth';
import storage from './services/storage';
import { api } from './services/api';
import { authenticateWithBiometric, isBiometricAvailable } from './services/biometric';
import { colors } from './theme/colors';
import { typography } from './theme/typography';
import { GradientBackground, GlassButton } from './components/ui';

export default function App() {
  const { isAuthenticated, isLoading, setAuth, clearAuth, setLoading } = useAuthStore();
  const [biometricRequired, setBiometricRequired] = useState(false);
  const [biometricPassed, setBiometricPassed] = useState(false);

  useEffect(() => {
    bootstrapAuth();
  }, []);

  async function bootstrapAuth() {
    try {
      setLoading(true);
      const tokens = await storage.getTokens();
      if (!tokens) {
        clearAuth();
        return;
      }

      try {
        const { data: user } = await api.auth.me();
        setAuth(user, tokens);

        const bioEnabled = await storage.isBiometricEnabled();
        if (bioEnabled) {
          setBiometricRequired(true);
          await promptBiometric();
        }
      } catch {
        await storage.clearAll();
        clearAuth();
      }
    } catch {
      clearAuth();
    }
  }

  async function promptBiometric() {
    const available = await isBiometricAvailable();
    if (!available) {
      setBiometricPassed(true);
      return;
    }

    const success = await authenticateWithBiometric();
    if (success) {
      setBiometricPassed(true);
    }
  }

  if (isLoading) {
    return (
      <GradientBackground>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </GradientBackground>
    );
  }

  if (isAuthenticated && biometricRequired && !biometricPassed) {
    return (
      <GradientBackground>
        <View style={styles.center}>
          <Text style={[typography.h2, styles.bioTitle]}>Authentication Required</Text>
          <Text style={[typography.bodySmall, styles.bioSubtitle]}>
            Verify your identity to continue
          </Text>
          <GlassButton title="Authenticate" onPress={promptBiometric} />
        </View>
      </GradientBackground>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <RootNavigator isAuthenticated={isAuthenticated} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  bioTitle: { textAlign: 'center', marginBottom: 8 },
  bioSubtitle: { textAlign: 'center', color: colors.textSecondary, marginBottom: 24 },
});
