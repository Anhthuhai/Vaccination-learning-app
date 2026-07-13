import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DATA_DISCLAIMER } from '../data/appMeta';

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
    backgroundColor: '#fff8e1',
    borderWidth: 1,
    borderColor: '#ffe082',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  icon: { fontSize: 14, marginRight: 6 },
  text: { flex: 1, fontSize: 12, color: '#8d6e00', lineHeight: 17 },
});
