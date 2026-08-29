// Nút chuyển đổi ngôn ngữ hiển thị trên header (🇻🇳 / 🇬🇧)
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';
import { colors } from '../theme';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  // Hiển thị ngôn ngữ SẼ chuyển sang (để người dùng biết bấm vào sẽ đổi sang gì)
  const nextIsEnglish = lang === 'vi';
  const flag = nextIsEnglish ? '🇬🇧' : '🇻🇳';
  const label = nextIsEnglish ? 'EN' : 'VI';

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={toggleLang}
      accessibilityLabel="Toggle language"
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={styles.flag}>{flag}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  flag: { fontSize: 16, marginRight: 5 },
  label: { color: colors.onPrimary, fontWeight: '800', fontSize: 13 },
});
