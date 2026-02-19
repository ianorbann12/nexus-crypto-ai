import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GradientBackground, GlassCard } from '../../components/ui';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function PortfolioScreen() {
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={[typography.h2, styles.title]}>Portfolio</Text>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Holdings</Text>
          <Text style={typography.bodySmall}>No holdings yet. Add a wallet or exchange to get started.</Text>
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Recent Transactions</Text>
          <Text style={typography.bodySmall}>No transactions found.</Text>
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingTop: 60 },
  title: { marginBottom: spacing.lg },
  section: { marginBottom: spacing.md, padding: spacing.lg },
});
