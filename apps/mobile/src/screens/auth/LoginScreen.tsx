import React, { useState } from 'react';
import { Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientBackground, GlassCard, GlassButton, GlassInput } from '../../components/ui';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { api } from '../../services/api';
import storage from '../../services/storage';
import { useAuthStore } from '../../stores/auth';
import { isBiometricAvailable, authenticateWithBiometric } from '../../services/biometric';
import type { AuthStackParamList } from '../../navigation/AuthStack';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin() {
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await api.auth.login({ email: email.trim(), password });
      await storage.saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
      await storage.saveUser(data.user);
      setAuth(data.user, data.tokens);

      // Prompt biometric setup if available and not yet enabled
      const bioAvailable = await isBiometricAvailable();
      const bioEnabled = await storage.isBiometricEnabled();
      if (bioAvailable && !bioEnabled) {
        Alert.alert(
          'Enable Biometric Login',
          'Use Face ID / fingerprint to unlock Nexus?',
          [
            { text: 'Not Now', style: 'cancel' },
            {
              text: 'Enable',
              onPress: async () => {
                const success = await authenticateWithBiometric();
                if (success) await storage.setBiometricEnabled(true);
              },
            },
          ],
        );
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Login failed. Please try again.';
      Alert.alert('Login Error', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={[typography.h1, styles.title]}>Nexus</Text>
        <Text style={[typography.bodySmall, styles.subtitle]}>Crypto AI Portfolio Tracker</Text>
        <GlassCard style={styles.card}>
          <GlassInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <GlassInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />
          <GlassButton title="Sign In" onPress={handleLogin} loading={loading} disabled={loading} />
          <GlassButton
            title="Create Account"
            onPress={() => navigation.navigate('Register')}
            variant="ghost"
            style={styles.registerBtn}
          />
        </GlassCard>
      </KeyboardAvoidingView>
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
