import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import safety from '../data/safety';
import serums from '../data/serums';
import DisclaimerNote from '../components/DisclaimerNote';

function Section({ title, items, color }) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
      {items.map((item, i) => (
        <Text key={i} style={styles.item}>
          • {item}
        </Text>
      ))}
    </View>
  );
}

export default function SafetyScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>An toàn & Tác dụng phụ</Text>
      <DisclaimerNote />
      <Section title="✅ Chuẩn bị trước khi tiêm" items={safety.beforeVaccination} color="#1976d2" />      <Section title="Phản ứng thường gặp (nhẹ)" items={safety.common} color="#2e7d32" />
      <Section title="Phản ứng hiếm gặp" items={safety.rare} color="#e65100" />
      <Section title="⚠️ Khi nào cần đến cơ sở y tế ngay" items={safety.whenToSeekHelp} color="#c62828" />
      <Section title="Chăm sóc tại nhà" items={safety.homeCare} color="#1976d2" />

      <Text style={styles.subHeading}>📚 Kiến thức nền</Text>
      {safety.principles.map((p, i) => (
        <View key={i} style={styles.principle}>
          <Text style={styles.principleTitle}>{p.title}</Text>
          <Text style={styles.principleBody}>{p.content}</Text>
        </View>
      ))}

      <Text style={styles.subHeading}>💉 Huyết thanh (miễn dịch thụ động)</Text>
      <Text style={styles.serumIntro}>
        Huyết thanh cung cấp kháng thể có sẵn, tác dụng ngay nhưng ngắn hạn - thường phối hợp cùng vaccine.
      </Text>
      {serums.map((s) => (
        <View key={s.id} style={styles.serumCard}>
          <Text style={styles.serumName}>{s.name}</Text>
          <Text style={styles.serumFull}>{s.fullName}</Text>
          {s.types.map((t, i) => (
            <Text key={i} style={styles.serumType}>• {t}</Text>
          ))}
          <Text style={styles.serumLabel}>🎯 Chỉ định:</Text>
          <Text style={styles.serumBody}>{s.indication}</Text>
          <Text style={styles.serumLabel}>💊 Liều:</Text>
          <Text style={styles.serumBody}>{s.dose}</Text>
          <Text style={styles.serumLabel}>⏱️ Thời điểm dùng:</Text>
          <Text style={styles.serumBody}>{s.timing}</Text>
          <Text style={styles.serumLabel}>💉 Đường dùng:</Text>
          <Text style={styles.serumBody}>{s.route}</Text>
          <Text style={styles.serumLabel}>📌 Lưu ý:</Text>
          {s.notes.map((n, i) => (
            <Text key={i} style={styles.serumBody}>- {n}</Text>
          ))}
        </View>
      ))}

      <Text style={styles.disclaimer}>
        Thông tin mang tính tham khảo, học tập. Luôn tuân theo hướng dẫn của cán bộ y tế.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  subHeading: { fontSize: 19, fontWeight: '700', marginTop: 8, marginBottom: 10 },
  section: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  item: { fontSize: 15, marginBottom: 4, lineHeight: 21 },
  principle: {
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  principleTitle: { fontSize: 15, fontWeight: '700', color: '#1976d2', marginBottom: 6 },
  principleBody: { fontSize: 14, color: '#444', lineHeight: 21 },
  serumIntro: { fontSize: 13, color: '#666', fontStyle: 'italic', marginBottom: 10 },
  serumCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  serumName: { fontSize: 16, fontWeight: '700', color: '#c62828' },
  serumFull: { fontSize: 12, color: '#888', fontStyle: 'italic', marginBottom: 6 },
  serumType: { fontSize: 13, color: '#333', marginBottom: 2 },
  serumLabel: { fontSize: 14, fontWeight: '700', marginTop: 8 },
  serumBody: { fontSize: 14, color: '#444', lineHeight: 20 },
  disclaimer: { fontSize: 13, color: '#777', fontStyle: 'italic', marginTop: 8, marginBottom: 20 },
});
