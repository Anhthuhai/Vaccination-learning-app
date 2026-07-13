import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import quizQuestions from '../data/quizQuestions';
import DisclaimerNote from '../components/DisclaimerNote';

const SET_SIZE = 10;

export default function QuizScreen() {
  const [started, setStarted] = useState(false);
  const [pool, setPool] = useState([]); // danh sách chỉ số câu hỏi trong phần đang làm
  const [pos, setPos] = useState(0); // vị trí hiện tại trong pool
  const [answers, setAnswers] = useState({}); // { chỉ số câu thật: đáp án đã chọn }
  const [finished, setFinished] = useState(false);
  const [showNav, setShowNav] = useState(false); // hiện lưới chọn câu

  const total = quizQuestions.length;

  // Bắt đầu một phần với danh sách chỉ số cho trước
  const startPool = (indices) => {
    if (!indices.length) return;
    setPool(indices);
    setPos(0);
    setAnswers({});
    setFinished(false);
    setShowNav(false);
    setStarted(true);
  };

  // Các bộ 10 câu
  const buildSets = () => {
    const sets = [];
    for (let i = 0; i < total; i += SET_SIZE) {
      const end = Math.min(total, i + SET_SIZE);
      const indices = [];
      for (let j = i; j < end; j += 1) indices.push(j);
      sets.push({ label: `Câu ${i + 1}–${end}`, indices });
    }
    return sets;
  };

  // Lọc theo mức độ
  const byDifficulty = (level) => {
    const indices = [];
    quizQuestions.forEach((q, idx) => {
      if (q.difficulty === level) indices.push(idx);
    });
    return indices;
  };

  const realIndex = pool[pos];
  const q = quizQuestions[realIndex];
  const selected = answers[realIndex];
  const answered = selected !== undefined;

  const score = pool.reduce((acc, idx) => {
    const a = answers[idx];
    return acc + (a !== undefined && a === quizQuestions[idx].correctIndex ? 1 : 0);
  }, 0);
  const answeredCount = pool.filter((idx) => answers[idx] !== undefined).length;

  const choose = (index) => {
    if (answered) return; // đã trả lời thì khóa lại
    setAnswers((prev) => ({ ...prev, [realIndex]: index }));
  };

  const goTo = (p) => {
    if (p < 0 || p >= pool.length) return;
    setPos(p);
    setShowNav(false);
  };

  const next = () => {
    if (pos + 1 >= pool.length) {
      setFinished(true);
      return;
    }
    setPos((p) => p + 1);
  };

  const prev = () => {
    if (pos > 0) setPos((p) => p - 1);
  };

  // ================= MÀN HÌNH CHỌN PHẦN =================
  if (!started) {
    const sets = buildSets();
    return (
      <ScrollView contentContainerStyle={styles.startContainer}>
        <Text style={styles.title}>Quiz kiểm tra kiến thức</Text>
        <Text style={styles.subtitle}>
          {total} câu về vaccine & tiêm chủng. Chọn phần bạn muốn luyện tập:
        </Text>
        <DisclaimerNote />

        <TouchableOpacity
          style={styles.allBtn}
          onPress={() => startPool(quizQuestions.map((_, i) => i))}
        >
          <Text style={styles.allBtnText}>▶️  Làm toàn bộ {total} câu</Text>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>📚 Theo bộ {SET_SIZE} câu</Text>
        <View style={styles.setWrap}>
          {sets.map((s) => (
            <TouchableOpacity
              key={s.label}
              style={styles.setBtn}
              onPress={() => startPool(s.indices)}
            >
              <Text style={styles.setBtnText}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>🎯 Theo mức độ</Text>
        <View style={styles.setWrap}>
          {[
            { label: 'Dễ', level: 'Dễ', color: '#2e7d32' },
            { label: 'Trung bình', level: 'Trung bình', color: '#ef6c00' },
            { label: 'Khó', level: 'Khó', color: '#c62828' },
          ].map((d) => {
            const indices = byDifficulty(d.level);
            return (
              <TouchableOpacity
                key={d.level}
                style={[styles.diffSelBtn, { borderColor: d.color }]}
                onPress={() => startPool(indices)}
              >
                <Text style={[styles.diffSelText, { color: d.color }]}>
                  {d.label} ({indices.length})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  // ================= MÀN HÌNH KẾT QUẢ =================
  if (finished) {
    const percent = pool.length ? Math.round((score / pool.length) * 100) : 0;
    let message = 'Cần ôn tập thêm nhé!';
    if (percent >= 80) message = 'Xuất sắc! 🎉';
    else if (percent >= 50) message = 'Khá tốt, cố gắng thêm!';
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Kết quả</Text>
        <Text style={styles.scoreText}>
          {score}/{pool.length} ({percent}%)
        </Text>
        <Text style={styles.subtitle}>{message}</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => setFinished(false)}>
          <Text style={styles.primaryBtnText}>Xem lại các câu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStarted(false)}>
          <Text style={styles.secondaryBtnText}>Chọn phần khác</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ================= MÀN HÌNH CÂU HỎI =================
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Thanh điều hướng trên cùng */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.navChip} onPress={() => setStarted(false)}>
          <Text style={styles.navChipText}>☰ Phần khác</Text>
        </TouchableOpacity>
        <Text style={styles.progress}>
          Câu {pos + 1}/{pool.length} · Điểm {score} · Đã làm {answeredCount}
        </Text>
        <TouchableOpacity style={styles.navChip} onPress={() => setShowNav((v) => !v)}>
          <Text style={styles.navChipText}>{showNav ? '✕ Đóng' : '🔢 Chọn câu'}</Text>
        </TouchableOpacity>
      </View>

      {/* Lưới chọn nhanh câu hỏi */}
      {showNav && (
        <View style={styles.navGrid}>
          {pool.map((idx, p) => {
            const a = answers[idx];
            let cellStyle = styles.navCell;
            let txtStyle = styles.navCellText;
            if (a !== undefined) {
              if (a === quizQuestions[idx].correctIndex) {
                cellStyle = [styles.navCell, styles.navCellCorrect];
                txtStyle = [styles.navCellText, styles.navCellTextLight];
              } else {
                cellStyle = [styles.navCell, styles.navCellWrong];
                txtStyle = [styles.navCellText, styles.navCellTextLight];
              }
            }
            if (p === pos) cellStyle = [cellStyle, styles.navCellCurrent];
            return (
              <TouchableOpacity key={idx} style={cellStyle} onPress={() => goTo(p)}>
                <Text style={txtStyle}>{p + 1}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

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
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>{opt}</Text>
              {answered && isCorrect && (
                <View style={[styles.tag, styles.tagCorrect]}>
                  <Text style={styles.tagCorrectText}>✓ Đáp án đúng</Text>
                </View>
              )}
              {answered && isSelected && !isCorrect && (
                <View style={[styles.tag, styles.tagWrong]}>
                  <Text style={styles.tagWrongText}>Bạn đã chọn</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}

      {answered && (
        <View style={styles.explainBox}>
          <Text style={styles.explainTitle}>
            {selected === q.correctIndex ? '✅ Chính xác!' : '❌ Chưa đúng'}
          </Text>
          <Text style={styles.explainText}>{q.explanation}</Text>
        </View>
      )}

      {/* Thanh đi tới / đi lui */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navBtn, pos === 0 && styles.navBtnDisabled]}
          onPress={prev}
          disabled={pos === 0}
        >
          <Text style={styles.navBtnText}>← Câu trước</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, styles.navBtnPrimary]} onPress={next}>
          <Text style={[styles.navBtnText, styles.navBtnTextPrimary]}>
            {pos + 1 >= pool.length ? 'Xem kết quả' : 'Câu sau →'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  startContainer: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center' },
  scoreText: { fontSize: 40, fontWeight: '800', color: '#2e7d32', marginBottom: 12 },
  progress: { fontSize: 12, color: '#555', flex: 1, textAlign: 'center' },

  // Màn hình chọn phần
  allBtn: {
    backgroundColor: '#1976d2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  allBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  sectionLabel: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 10, marginTop: 6 },
  setWrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  setBtn: {
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#e3f2fd',
  },
  setBtnText: { color: '#1565c0', fontSize: 13, fontWeight: '700' },
  diffSelBtn: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  diffSelText: { fontSize: 13, fontWeight: '700' },

  // Thanh trên
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  navChip: {
    backgroundColor: '#eef2f7',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  navChipText: { fontSize: 12, fontWeight: '700', color: '#37474f' },

  // Lưới chọn câu
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    marginBottom: 14,
  },
  navCell: {
    width: 38,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cfd8dc',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  navCellText: { fontSize: 13, fontWeight: '700', color: '#455a64' },
  navCellTextLight: { color: '#fff' },
  navCellCorrect: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  navCellWrong: { backgroundColor: '#c62828', borderColor: '#c62828' },
  navCellCurrent: { borderColor: '#1976d2', borderWidth: 3 },

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
  optionText: { fontSize: 16, flex: 1, paddingRight: 8 },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  tagCorrect: { backgroundColor: '#2e7d32' },
  tagCorrectText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  tagWrong: { backgroundColor: '#c62828' },
  tagWrongText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  explainBox: {
    marginTop: 8,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  explainTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  explainText: { fontSize: 15, color: '#444', lineHeight: 22 },

  // Thanh dưới
  bottomNav: { flexDirection: 'row', marginTop: 16, marginBottom: 24 },
  navBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#eceff1',
    marginHorizontal: 4,
  },
  navBtnDisabled: { opacity: 0.4 },
  navBtnPrimary: { backgroundColor: '#1976d2' },
  navBtnText: { fontSize: 15, fontWeight: '700', color: '#37474f' },
  navBtnTextPrimary: { color: '#fff' },
  primaryBtn: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#90a4ae',
  },
  secondaryBtnText: { color: '#546e7a', fontSize: 15, fontWeight: '700' },
});
