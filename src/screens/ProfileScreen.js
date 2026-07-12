import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import vaccines from '../data/vaccines';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [relation, setRelation] = useState('');
  const [saved, setSaved] = useState(null);

  const save = () => {
    if (!name.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập họ tên.');
      return;
    }
    setSaved({ name: name.trim(), age: age.trim(), relation: relation.trim() });
  };

  const reset = () => {
    setName('');
    setAge('');
    setRelation('');
    setSaved(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Hồ sơ người dùng</Text>

      {saved && (
        <View style={styles.savedCard}>
          <Text style={styles.savedName}>{saved.name}</Text>
          {!!saved.age && <Text style={styles.savedLine}>Tuổi: {saved.age}</Text>}
          {!!saved.relation && <Text style={styles.savedLine}>Quan hệ: {saved.relation}</Text>}
        </View>
      )}

      <Text style={styles.label}>Họ và tên</Text>
      <TextInput style={styles.input} placeholder="Nhập họ tên" value={name} onChangeText={setName} />

      <Text style={styles.label}>Tuổi</Text>
      <TextInput
        style={styles.input}
        placeholder="Ví dụ: 2 tuổi"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Quan hệ (con, bản thân...)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ví dụ: Con"
        value={relation}
        onChangeText={setRelation}
      />

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.primaryBtn} onPress={save}>
          <Text style={styles.primaryBtnText}>Lưu hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={reset}>
          <Text style={styles.secondaryBtnText}>Xóa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>📊 Thống kê học tập</Text>
        <Text style={styles.statsLine}>Tổng số vaccine trong app: {vaccines.length}</Text>
        <Text style={styles.statsLine}>
          Vaccine TCMR: {vaccines.filter((v) => v.inEPI).length} · Dịch vụ:{' '}
          {vaccines.filter((v) => !v.inEPI).length}
        </Text>
      </View>

      <Text style={styles.disclaimer}>
        Dữ liệu hồ sơ hiện lưu tạm trong phiên. Có thể nâng cấp lưu vĩnh viễn bằng AsyncStorage.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  savedCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  savedName: { fontSize: 18, fontWeight: '700', color: '#1976d2' },
  savedLine: { fontSize: 14, color: '#333', marginTop: 4 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 15,
  },
  btnRow: { flexDirection: 'row', marginTop: 4, marginBottom: 20 },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c62828',
  },
  secondaryBtnText: { color: '#c62828', fontSize: 16, fontWeight: '700' },
  statsCard: {
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  statsLine: { fontSize: 14, color: '#444', marginBottom: 4 },
  disclaimer: { fontSize: 12, color: '#999', fontStyle: 'italic', marginBottom: 20 },
});
