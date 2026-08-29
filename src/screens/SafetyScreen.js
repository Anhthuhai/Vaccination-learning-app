import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import safety from '../data/safety';
import serums from '../data/serums';
import DisclaimerNote from '../components/DisclaimerNote';
import { useLanguage } from '../i18n/LanguageContext';

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
  const { t } = useLanguage();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{t('safety.heading')}</Text>
      <DisclaimerNote />
      <Section title={t('safety.before')} items={safety.beforeVaccination} color="#0d9488" />
      <Section title={t('safety.common')} items={safety.common} color="#2e7d32" />
      <Section title={t('safety.rare')} items={safety.rare} color="#e65100" />
      <Section title={t('safety.seekHelp')} items={safety.whenToSeekHelp} color="#c62828" />
      <Section title={t('safety.homeCare')} items={safety.homeCare} color="#0d9488" />

      <Text style={styles.subHeading}>{t('safety.principles')}</Text>
      {safety.principles.map((p, i) => (
        <View key={i} style={styles.principle}>
          <Text style={styles.principleTitle}>{p.title}</Text>
          <Text style={styles.principleBody}>{p.content}</Text>
        </View>
      ))}

      <Text style={styles.subHeading}>{t('safety.serumTitle')}</Text>
      <Text style={styles.serumIntro}>
        {t('safety.serumIntro')}
      </Text>
      {serums.map((s) => (
        <View key={s.id} style={styles.serumCard}>
          <Text style={styles.serumName}>{s.name}</Text>
          <Text style={styles.serumFull}>{s.fullName}</Text>
          {s.types.map((ty, i) => (
            <Text key={i} style={styles.serumType}>• {ty}</Text>
          ))}
          <Text style={styles.serumLabel}>{t('safety.serumIndication')}</Text>
          <Text style={styles.serumBody}>{s.indication}</Text>
          <Text style={styles.serumLabel}>{t('safety.serumDose')}</Text>
          <Text style={styles.serumBody}>{s.dose}</Text>
          <Text style={styles.serumLabel}>{t('safety.serumTiming')}</Text>
          <Text style={styles.serumBody}>{s.timing}</Text>
          <Text style={styles.serumLabel}>{t('safety.serumRoute')}</Text>
          <Text style={styles.serumBody}>{s.route}</Text>
          <Text style={styles.serumLabel}>{t('safety.serumNotes')}</Text>
          {s.notes.map((n, i) => (
            <Text key={i} style={styles.serumBody}>- {n}</Text>
          ))}
        </View>
      ))}

      <Text style={styles.disclaimer}>
        {t('safety.footer')}
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
  principleTitle: { fontSize: 15, fontWeight: '700', color: '#0d9488', marginBottom: 6 },
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
