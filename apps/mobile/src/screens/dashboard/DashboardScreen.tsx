import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GradientBackground, GlassCard } from '../../components/ui';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';

export function DashboardScreen() {
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={[typography.h2, styles.title]}>Dashboard</Text>
        <GlassCard elevated style={styles.portfolioCard}>
          <Text style={typography.caption}>Total Portfolio Value</Text>
          <Text style={[typography.h1, styles.value]}>$0.00</Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>+0.00%</Text>
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Market Overview</Text>
          <Text style={typography.bodySmall}>Loading market data...</Text>
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>AI Insights</Text>
          <Text style={typography.bodySmall}>No predictions yet</Text>
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingTop: 60 },
  title: { marginBottom: spacing.lg },
  portfolioCard: { marginBottom: spacing.md, padding: spacing.lg },
  value: { marginVertical: spacing.xs },
  section: { marginBottom: spacing.md, padding: spacing.lg },
});
