import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import vaccines, { categories } from '../data/vaccines';
import dosing from '../data/dosing';
import DisclaimerNote from '../components/DisclaimerNote';

export default function VaccineInfoScreen() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = vaccines.filter((v) => {
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      v.name.toLowerCase().includes(q) ||
      v.disease.toLowerCase().includes(q) ||
      (v.brands || []).some((b) => b.toLowerCase().includes(q));
    const matchCat = cat === 'all' || v.category === cat;
    return matchQuery && matchCat;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Vaccine tại Việt Nam</Text>
      <Text style={styles.count}>{vaccines.length} loại vaccine · TCMR & dịch vụ</Text>
      <DisclaimerNote />
      <TextInput
        style={styles.search}
        placeholder="Tìm theo tên vaccine, bệnh hoặc hãng..."
        value={query}
        onChangeText={setQuery}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
        {categories.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.chip, cat === c.id && styles.chipActive]}
            onPress={() => setCat(c.id)}
          >
            <Text style={[styles.chipText, cat === c.id && styles.chipTextActive]}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filtered.length === 0 && <Text style={styles.empty}>Không tìm thấy vaccine phù hợp.</Text>}

      {filtered.map((v) => {
        const expanded = expandedId === v.id;
        return (
          <TouchableOpacity
            key={v.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => setExpandedId(expanded ? null : v.id)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{v.name}</Text>
              <View style={[styles.badge, v.inEPI ? styles.badgeEpi : styles.badgeService]}>
                <Text style={styles.badgeText}>{v.inEPI ? 'TCMR' : 'Dịch vụ'}</Text>
              </View>
            </View>
            <Text style={styles.cardSub}>Phòng: {v.disease}</Text>
            {!!(v.brands && v.brands.length) && (
              <Text style={styles.brands}>🏷️ {v.brands.join(', ')}</Text>
            )}

            {expanded && (
              <View style={styles.details}>
                <Text style={styles.detailRow}>🧬 Loại: {v.type}</Text>
                <Text style={styles.detailRow}>💉 Đường dùng: {v.route}</Text>
                <Text style={styles.detailRow}>👶 Đối tượng: {v.ageGroup}</Text>
                <Text style={styles.detailRow}>🔢 Số liều: {v.doses}</Text>
                <Text style={styles.detailRow}>🗓️ Lịch: {v.schedule}</Text>
                <Text style={styles.detailDesc}>{v.description}</Text>
                <Text style={styles.detailLabel}>⛔ Chống chỉ định:</Text>
                <Text style={styles.detailBody}>{v.contraindications}</Text>
                <Text style={styles.detailLabel}>⚠️ Tác dụng phụ:</Text>
                <Text style={styles.detailBody}>{v.sideEffects}</Text>
                <Text style={styles.detailNote}>Lưu ý: {v.notes}</Text>

                {!!(dosing[v.id] && dosing[v.id].length) && (
                  <View style={styles.doseSection}>
                    <Text style={styles.detailLabel}>💊 Liều lượng & đường tiêm theo đối tượng:</Text>
                    {dosing[v.id].map((d, idx) => (
                      <View key={idx} style={styles.doseRow}>
                        <Text style={styles.doseBrand}>{d.brand}</Text>
                        <Text style={styles.doseLine}>👤 {d.group}</Text>
                        <View style={styles.doseChips}>
                          <View style={styles.doseChip}>
                            <Text style={styles.doseChipText}>💉 {d.dose}</Text>
                          </View>
                          <View style={[styles.doseChip, styles.doseChipRoute]}>
                            <Text style={styles.doseChipText}>{d.route}</Text>
                          </View>
                        </View>
                        {!!d.note && <Text style={styles.doseNote}>{d.note}</Text>}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
            <Text style={styles.expandHint}>{expanded ? 'Thu gọn ▲' : 'Xem chi tiết ▼'}</Text>
          </TouchableOpacity>
        );
      })}
      <Text style={styles.disclaimer}>
        Thông tin tham khảo học tập. Vui lòng đối chiếu hướng dẫn của Bộ Y tế và nhà sản xuất.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 22, fontWeight: '700' },
  count: { fontSize: 13, color: '#777', marginBottom: 12, marginTop: 2 },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 15,
  },
  chipRow: { flexDirection: 'row', marginBottom: 14 },
  chip: {
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  chipActive: { backgroundColor: '#1976d2' },
  chipText: { color: '#1976d2', fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  empty: { color: '#777', fontStyle: 'italic' },
  card: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#1976d2', flex: 1, marginRight: 8 },
  badge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeEpi: { backgroundColor: '#e8f5e9' },
  badgeService: { backgroundColor: '#fff3e0' },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#444' },
  cardSub: { fontSize: 14, color: '#555', marginTop: 4 },
  brands: { fontSize: 13, color: '#777', marginTop: 4 },
  details: { marginTop: 10 },
  detailRow: { fontSize: 14, marginBottom: 4 },
  detailDesc: { fontSize: 14, color: '#333', marginTop: 6, lineHeight: 20 },
  detailLabel: { fontSize: 14, fontWeight: '700', marginTop: 8 },
  detailBody: { fontSize: 14, color: '#444', lineHeight: 20 },
  detailNote: { fontSize: 13, color: '#c62828', marginTop: 8, fontStyle: 'italic' },
  expandHint: { fontSize: 13, color: '#1976d2', marginTop: 8 },
  doseSection: { marginTop: 12 },
  doseRow: {
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  doseBrand: { fontSize: 14, fontWeight: '700', color: '#1976d2' },
  doseLine: { fontSize: 13, color: '#333', marginTop: 2 },
  doseChips: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 },
  doseChip: {
    backgroundColor: '#e3f2fd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 4,
  },
  doseChipRoute: { backgroundColor: '#e8f5e9' },
  doseChipText: { fontSize: 12, fontWeight: '600', color: '#333' },
  doseNote: { fontSize: 12, color: '#666', marginTop: 4, fontStyle: 'italic' },
  disclaimer: { fontSize: 12, color: '#999', fontStyle: 'italic', marginTop: 8, marginBottom: 20 },
});
