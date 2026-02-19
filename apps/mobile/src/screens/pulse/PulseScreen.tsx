import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GradientBackground, GlassCard } from '../../components/ui';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function PulseScreen() {
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={[typography.h2, styles.title]}>Market Pulse</Text>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Heatmap</Text>
          <Text style={typography.bodySmall}>Market heatmap visualization loading...</Text>
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Top Movers</Text>
          <Text style={typography.bodySmall}>Loading top movers...</Text>
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Alerts</Text>
          <Text style={typography.bodySmall}>No active alerts.</Text>
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
