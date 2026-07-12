import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import schedule from '../data/schedule';

export default function ScheduleScreen() {
  const [done, setDone] = useState({});

  const toggle = (key) => setDone((prev) => ({ ...prev, [key]: !prev[key] }));

  const allKeys = [];
  schedule.forEach((g) => {
    (g.epi || []).forEach((_, i) => allKeys.push(`${g.id}-e-${i}`));
    (g.service || []).forEach((_, i) => allKeys.push(`${g.id}-s-${i}`));
  });
  const doneCount = allKeys.filter((k) => done[k]).length;

  const renderItems = (items, prefix, groupId, tagStyle, tagText) =>
    items.map((item, i) => {
      const key = `${groupId}-${prefix}-${i}`;
      const checked = !!done[key];
      return (
        <TouchableOpacity key={key} style={styles.item} onPress={() => toggle(key)} activeOpacity={0.7}>
          <Text style={styles.checkbox}>{checked ? '☑' : '☐'}</Text>
          <Text style={[styles.itemText, checked && styles.itemDone]}>{item}</Text>
          <View style={[styles.tag, tagStyle]}>
            <Text style={styles.tagText}>{tagText}</Text>
          </View>
        </TouchableOpacity>
      );
    });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Lịch tiêm chủng</Text>
      <Text style={styles.progress}>
        Đã đánh dấu: {doneCount}/{allKeys.length} mũi
      </Text>
      <View style={styles.legend}>
        <View style={[styles.tag, styles.tagEpi]}>
          <Text style={styles.tagText}>TCMR</Text>
        </View>
        <Text style={styles.legendText}>Miễn phí</Text>
        <View style={[styles.tag, styles.tagService, { marginLeft: 12 }]}>
          <Text style={styles.tagText}>DV</Text>
        </View>
        <Text style={styles.legendText}>Dịch vụ</Text>
      </View>

      {schedule.map((group) => (
        <View key={group.id} style={styles.group}>
          <Text style={styles.ageLabel}>{group.ageLabel}</Text>
          {renderItems(group.epi || [], 'e', group.id, styles.tagEpi, 'TCMR')}
          {renderItems(group.service || [], 's', group.id, styles.tagService, 'DV')}
          {(group.epi || []).length === 0 && (group.service || []).length === 0 && (
            <Text style={styles.none}>—</Text>
          )}
        </View>
      ))}
      <Text style={styles.disclaimer}>
        Lịch mang tính tham khảo. Thời điểm cụ thể có thể thay đổi theo hướng dẫn của cơ sở tiêm chủng.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  progress: { fontSize: 14, color: '#2e7d32', marginBottom: 10 },
  legend: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  legendText: { fontSize: 12, color: '#666', marginLeft: 4 },
  group: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  ageLabel: { fontSize: 16, fontWeight: '700', color: '#1976d2', marginBottom: 8 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  checkbox: { fontSize: 20, marginRight: 10 },
  itemText: { fontSize: 15, flex: 1 },
  itemDone: { textDecorationLine: 'line-through', color: '#999' },
  tag: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2, marginLeft: 6 },
  tagEpi: { backgroundColor: '#2e7d32' },
  tagService: { backgroundColor: '#ef6c00' },
  tagText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  none: { color: '#aaa' },
  disclaimer: { fontSize: 12, color: '#999', fontStyle: 'italic', marginTop: 8, marginBottom: 20 },
});
