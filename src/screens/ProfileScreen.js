import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Linking } from 'react-native';
import vaccines from '../data/vaccines';

const OFFICIAL_SOURCES = [
  {
    label: 'Bộ Y tế Việt Nam',
    url: 'https://moh.gov.vn',
    desc: 'Cơ quan quản lý nhà nước về y tế',
  },
  {
    label: 'Chương trình Tiêm chủng mở rộng Quốc gia',
    url: 'https://tiemchungmorong.vn',
    desc: 'Thông tin chính thức về TCMR',
  },
  {
    label: 'Viện Vệ sinh Dịch tễ Trung ương (NIHE)',
    url: 'https://nihe.org.vn',
    desc: 'Nghiên cứu & hướng dẫn tiêm chủng',
  },
];

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

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Không mở được liên kết', url);
      }
    } catch (e) {
      Alert.alert('Không mở được liên kết', url);
    }
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

      <View style={styles.sourcesCard}>
        <Text style={styles.sourcesTitle}>🔗 Nguồn thông tin chính thức</Text>
        <Text style={styles.sourcesIntro}>
          Thông tin trong ứng dụng được tham khảo và tổng hợp từ các nguồn chính thức của cơ quan
          nhà nước Việt Nam. Vui lòng truy cập để xem thông tin gốc và cập nhật mới nhất:
        </Text>
        {OFFICIAL_SOURCES.map((s) => (
          <TouchableOpacity key={s.url} style={styles.sourceItem} onPress={() => openLink(s.url)}>
            <Text style={styles.sourceLabel}>{s.label}</Text>
            <Text style={styles.sourceDesc}>{s.desc}</Text>
            <Text style={styles.sourceUrl}>{s.url}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.disclaimerCard}>
        <Text style={styles.disclaimerTitle}>⚠️ Tuyên bố miễn trừ trách nhiệm</Text>
        <Text style={styles.disclaimerBody}>
          Đây là ứng dụng giáo dục độc lập.{' '}
          <Text style={styles.disclaimerBold}>
            Ứng dụng KHÔNG phải là ứng dụng chính thức của chính phủ, KHÔNG đại diện, KHÔNG liên kết
            và KHÔNG được ủy quyền bởi bất kỳ cơ quan chính phủ nào
          </Text>{' '}
          (bao gồm Bộ Y tế Việt Nam). Mọi thông tin chỉ mang tính tham khảo và giáo dục, không thay
          thế cho tư vấn y tế chuyên nghiệp. Vui lòng đối chiếu hướng dẫn chính thức của Bộ Y tế, nhà
          sản xuất và tham khảo ý kiến bác sĩ trước khi tiêm chủng.
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
  savedName: { fontSize: 18, fontWeight: '700', color: '#0d9488' },
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
    backgroundColor: '#0d9488',
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
  sourcesCard: {
    backgroundColor: '#eef6ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#bcd8ff',
  },
  sourcesTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#0d47a1' },
  sourcesIntro: { fontSize: 13, color: '#444', marginBottom: 12, lineHeight: 19 },
  sourceItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d6e6fb',
  },
  sourceLabel: { fontSize: 14, fontWeight: '700', color: '#1565c0' },
  sourceDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  sourceUrl: { fontSize: 12, color: '#1e88e5', marginTop: 4, textDecorationLine: 'underline' },
  disclaimerCard: {
    backgroundColor: '#fff8e1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  disclaimerTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8, color: '#b26a00' },
  disclaimerBody: { fontSize: 13, color: '#5d4037', lineHeight: 20 },
  disclaimerBold: { fontWeight: '700', color: '#bf360c' },
  disclaimer: { fontSize: 12, color: '#999', fontStyle: 'italic', marginBottom: 20 },
});
