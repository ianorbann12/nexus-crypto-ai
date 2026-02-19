import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GradientBackground, GlassCard } from '../../components/ui';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';

export function OracleScreen() {
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={[typography.h2, styles.title]}>AI Oracle</Text>
        <GlassCard elevated style={styles.section}>
          <Text style={typography.h3}>Price Predictions</Text>
          <Text style={typography.bodySmall}>Select an asset to view AI predictions.</Text>
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Pattern Detection</Text>
          <Text style={typography.bodySmall}>Analyzing chart patterns...</Text>
        </GlassCard>
        <GlassCard style={styles.section}>
          <Text style={typography.h3}>Sentiment Analysis</Text>
          <Text style={typography.bodySmall}>Aggregating social sentiment data...</Text>
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
