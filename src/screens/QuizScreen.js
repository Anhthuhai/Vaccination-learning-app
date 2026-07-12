import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import quizQuestions from '../data/quizQuestions';

export default function QuizScreen() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = quizQuestions.length;
  const q = quizQuestions[current];

  const start = () => {
    setStarted(true);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  const choose = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const next = () => {
    if (current + 1 >= total) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  // Màn hình bắt đầu
  if (!started) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Quiz kiểm tra kiến thức</Text>
        <Text style={styles.subtitle}>{total} câu hỏi về vaccine và tiêm chủng</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={start}>
          <Text style={styles.primaryBtnText}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Màn hình kết quả
  if (finished) {
    const percent = Math.round((score / total) * 100);
    let message = 'Cần ôn tập thêm nhé!';
    if (percent >= 80) message = 'Xuất sắc! 🎉';
    else if (percent >= 50) message = 'Khá tốt, cố gắng thêm!';
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Kết quả</Text>
        <Text style={styles.scoreText}>
          {score}/{total} ({percent}%)
        </Text>
        <Text style={styles.subtitle}>{message}</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={start}>
          <Text style={styles.primaryBtnText}>Làm lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Màn hình câu hỏi
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.progress}>
        Câu {current + 1}/{total} · Điểm: {score}
      </Text>
      {!!q.difficulty && (
        <View style={styles.diffBadge}>
          <Text style={styles.diffText}>Mức độ: {q.difficulty}</Text>
        </View>
      )}
      <Text style={styles.question}>{q.question}</Text>

      {q.options.map((opt, i) => {
        const isCorrect = i === q.correctIndex;
        const isSelected = i === selected;
        let optStyle = styles.option;
        if (answered) {
          if (isCorrect) optStyle = [styles.option, styles.optionCorrect];
          else if (isSelected) optStyle = [styles.option, styles.optionWrong];
        }
        return (
          <TouchableOpacity key={i} style={optStyle} onPress={() => choose(i)} disabled={answered}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}

      {answered && (
        <View style={styles.explainBox}>
          <Text style={styles.explainTitle}>
            {selected === q.correctIndex ? '✅ Chính xác!' : '❌ Chưa đúng'}
          </Text>
          <Text style={styles.explainText}>{q.explanation}</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={next}>
            <Text style={styles.primaryBtnText}>
              {current + 1 >= total ? 'Xem kết quả' : 'Câu tiếp theo'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 24, textAlign: 'center' },
  scoreText: { fontSize: 40, fontWeight: '800', color: '#2e7d32', marginBottom: 12 },
  progress: { fontSize: 14, color: '#777', marginBottom: 12 },
  question: { fontSize: 20, fontWeight: '600', marginBottom: 20 },
  diffBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ede7f6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  diffText: { fontSize: 12, fontWeight: '700', color: '#5e35b1' },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  optionCorrect: { borderColor: '#2e7d32', backgroundColor: '#e8f5e9' },
  optionWrong: { borderColor: '#c62828', backgroundColor: '#ffebee' },
  optionText: { fontSize: 16 },
  explainBox: {
    marginTop: 8,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  explainTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  explainText: { fontSize: 15, color: '#444', marginBottom: 16, lineHeight: 22 },
  primaryBtn: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
