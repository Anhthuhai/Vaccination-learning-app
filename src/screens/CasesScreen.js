import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import cases from '../data/cases';
import { useLanguage } from '../i18n/LanguageContext';

function CaseCard({ item }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.scenario}>{item.scenario}</Text>
      <Text style={styles.question}>{item.question}</Text>

      {item.options.map((opt, i) => {
        const isCorrect = i === item.correctIndex;
        const isSelected = i === selected;
        let optStyle = styles.option;
        if (answered) {
          if (isCorrect) optStyle = [styles.option, styles.optionCorrect];
          else if (isSelected) optStyle = [styles.option, styles.optionWrong];
        }
        return (
          <TouchableOpacity
            key={i}
            style={optStyle}
            onPress={() => !answered && setSelected(i)}
            disabled={answered}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}

      {answered && (
        <View style={styles.explainBox}>
          <Text style={styles.explainTitle}>
            {selected === item.correctIndex ? t('cases.correct') : t('cases.wrong')}
          </Text>
          <Text style={styles.explainText}>{item.explanation}</Text>
          <TouchableOpacity onPress={() => setSelected(null)}>
            <Text style={styles.retry}>{t('cases.retry')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function CasesScreen() {
  const { t } = useLanguage();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{t('cases.heading')}</Text>
      {cases.map((c) => (
        <CaseCard key={c.id} item={c} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  title: { fontSize: 17, fontWeight: '700', color: '#0d9488', marginBottom: 6 },
  scenario: { fontSize: 15, color: '#333', lineHeight: 21, marginBottom: 10 },
  question: { fontSize: 15, fontWeight: '600', marginBottom: 10 },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  optionCorrect: { borderColor: '#2e7d32', backgroundColor: '#e8f5e9' },
  optionWrong: { borderColor: '#c62828', backgroundColor: '#ffebee' },
  optionText: { fontSize: 15 },
  explainBox: { marginTop: 4, padding: 12, borderRadius: 10, backgroundColor: '#f5f5f5' },
  explainTitle: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  explainText: { fontSize: 14, color: '#444', lineHeight: 20, marginBottom: 8 },
  retry: { fontSize: 14, color: '#0d9488', fontWeight: '600' },
});
