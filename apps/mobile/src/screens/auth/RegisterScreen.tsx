import React, { useState } from 'react';
import { Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientBackground, GlassCard, GlassButton, GlassInput } from '../../components/ui';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { api } from '../../services/api';
import storage from '../../services/storage';
import { useAuthStore } from '../../stores/auth';

export function RegisterScreen() {
  const navigation = useNavigation();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    else if (username.trim().length < 3) newErrors.username = 'Must be at least 3 characters';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleRegister() {
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await api.auth.register({
        email: email.trim(),
        username: username.trim(),
        password,
      });
      await storage.saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
      await storage.saveUser(data.user);
      setAuth(data.user, data.tokens);
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Registration failed. Please try again.';
      Alert.alert('Registration Error', message);
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
        <Text style={[typography.h2, styles.title]}>Create Account</Text>
        <GlassCard style={styles.card}>
          <GlassInput
            label="Username"
            placeholder="Choose a username"
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
            error={errors.username}
          />
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
            placeholder="Create a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />
          <GlassButton title="Sign Up" onPress={handleRegister} loading={loading} disabled={loading} />
          <GlassButton
            title="Already have an account? Sign In"
            onPress={() => navigation.goBack()}
            variant="ghost"
            style={styles.backBtn}
          />
        </GlassCard>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: spacing.lg },
  title: { textAlign: 'center', marginBottom: spacing.lg },
  card: { padding: spacing.lg },
  backBtn: { marginTop: spacing.sm },
});
