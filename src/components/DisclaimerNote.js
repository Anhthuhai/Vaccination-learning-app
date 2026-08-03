import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DATA_DISCLAIMER } from '../data/appMeta';
import { colors, radius, spacing } from '../theme';

// Ghi chú nhắc người dùng kiểm chứng dữ liệu với văn bản hiện hành của Bộ Y tế
export default function DisclaimerNote({ style }) {
  return (
    <View style={[styles.box, style]}>
      <Text style={styles.icon}>ℹ️</Text>
      <Text style={styles.text}>{DATA_DISCLAIMER}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    backgroundColor: colors.warningLight,
    borderWidth: 1,
    borderColor: '#ffe082',
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  icon: { fontSize: 14, marginRight: 6 },
  text: { flex: 1, fontSize: 12, color: '#8d6e00', lineHeight: 17 },
});
