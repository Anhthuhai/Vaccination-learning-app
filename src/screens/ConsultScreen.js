import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { vaccines } from '../data/vaccines';
import { getRecommendationsWithStatus, doseInfo } from '../data/advisor';
import { getPrice } from '../data/prices';
import { getSeasonalTips } from '../data/seasonal';
import { prePregnancy, duringPregnancy, postpartum } from '../data/pregnancy';
import { elderly, chronic } from '../data/elderly';
import { immunocompromised, occupationTravel } from '../data/special';
import { meningococcal } from '../data/meningococcal';
import DisclaimerNote from '../components/DisclaimerNote';
const vaccineById = {};
vaccines.forEach((v) => {
  vaccineById[v.id] = v;
});

// Cộng thêm số ngày vào một ngày dạng dd/mm/yyyy -> trả về dd/mm/yyyy hoặc null
function addDaysToDate(dateStr, days) {
  const m = (dateStr || '').trim().match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
  if (!m) return null;
  const d = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10);
  const y = parseInt(m[3], 10);
  const date = new Date(y, mo - 1, d);
  if (Number.isNaN(date.getTime())) return null;
  date.setDate(date.getDate() + days);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${date.getFullYear()}`;
}

// Nội dung tư vấn cho phụ nữ chuẩn bị mang thai / thai phụ / sau sinh
function PregnancyAdvice({ data }) {
  // Lưu ngày mũi gần nhất người dùng nhập cho từng vaccine có tính lịch hẹn
  const [lastDates, setLastDates] = useState({});

  return (
    <View style={styles.pregWrap}>
      <View style={styles.pregHeader}>
        <Text style={styles.pregTitle}>🤰 {data.title}</Text>
        <Text style={styles.pregSubtitle}>{data.subtitle}</Text>
      </View>

      {data.vaccines.map((item) => {
        const v = vaccineById[item.vaccineId];
        const hasInterval = item.intervalDays != null;
        const lastDate = lastDates[item.vaccineId] || '';
        const nextDate = hasInterval ? addDaysToDate(lastDate, item.intervalDays) : null;
        return (
          <View
            key={item.vaccineId}
            style={[styles.pregCard, item.live && styles.pregCardLive]}
          >
            <View style={styles.vaccineHeader}>
              <Text style={styles.vaccineName}>{item.name}</Text>
              {v && (
                <View style={[styles.badge, v.inEPI ? styles.badgeEpi : styles.badgeService]}>
                  <Text style={styles.badgeText}>{v.inEPI ? 'TCMR' : 'Dịch vụ'}</Text>
                </View>
              )}
            </View>
            <Text style={styles.pregLabel}>⏰ Thời điểm: <Text style={styles.pregValue}>{item.timing}</Text></Text>
            <Text style={styles.pregLabel}>🎯 Lý do: <Text style={styles.pregValue}>{item.reason}</Text></Text>
            <Text style={[styles.pregLabel, item.live && styles.pregWarnText]}>
              ⚠️ {item.warning}
            </Text>

            {/* Khoảng cách mũi & tính ngày hẹn */}
            {item.intervalLabel ? (
              <Text style={styles.pregLabel}>📆 Khoảng cách: <Text style={styles.pregValue}>{item.intervalLabel}</Text></Text>
            ) : null}
            {hasInterval && (
              <View style={styles.nextDoseBox}>
                <Text style={styles.nextDoseLabel}>Nhập ngày mũi gần nhất để tính lịch hẹn:</Text>
                <TextInput
                  style={styles.nextDoseInput}
                  value={lastDate}
                  onChangeText={(t) => setLastDates({ ...lastDates, [item.vaccineId]: t })}
                  placeholder="dd/mm/yyyy (VD: 01/07/2026)"
                  keyboardType="numbers-and-punctuation"
                />
                {lastDate ? (
                  nextDate ? (
                    <Text style={styles.nextDoseResult}>
                      ➡️ Ngày hẹn mũi tiếp theo (sớm nhất): <Text style={styles.nextDoseDate}>{nextDate}</Text>
                    </Text>
                  ) : (
                    <Text style={styles.nextDoseError}>Định dạng ngày chưa đúng (dd/mm/yyyy).</Text>
                  )
                ) : null}
              </View>
            )}

            {v && (
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>💰 Giá tham khảo: </Text>
                <Text style={styles.priceValue}>{getPrice(v.id, v.inEPI)}</Text>
              </View>
            )}
          </View>
        );
      })}

      {/* Danh sách cần tránh (chỉ có ở chế độ thai phụ) */}
      {data.avoid && (
        <View style={styles.avoidCard}>
          <Text style={styles.avoidTitle}>🚫 Vaccine cần TRÁNH trong thai kỳ</Text>
          {data.avoid.map((a, i) => (
            <Text key={i} style={styles.avoidItem}>• {a}</Text>
          ))}
          {data.note ? <Text style={styles.avoidNote}>{data.note}</Text> : null}
        </View>
      )}

      {/* Ghi chú chung (khi không có mục avoid, ví dụ sau sinh) */}
      {!data.avoid && data.note ? (
        <View style={styles.pregNoteCard}>
          <Text style={styles.pregNoteText}>💡 {data.note}</Text>
        </View>
      ) : null}

      <Text style={styles.disclaimer}>
        ⚠️ Nội dung tham khảo/học tập. Cần khám sàng lọc và tư vấn của bác sĩ sản
        khoa trước khi tiêm.
      </Text>
    </View>
  );
}

// Nội dung tư vấn người lớn tuổi khỏe mạnh
function ElderlyAdvice({ data }) {
  const priorityStyle = {
    'Rất ưu tiên': styles.prioHigh,
    'Ưu tiên': styles.prioMed,
    'Nên tiêm': styles.prioLow,
  };
  return (
    <View style={styles.pregWrap}>
      <View style={styles.pregHeader}>
        <Text style={styles.pregTitle}>🧓 {data.title}</Text>
        <Text style={styles.pregSubtitle}>{data.subtitle}</Text>
      </View>

      {data.vaccines.map((item) => {
        const v = vaccineById[item.vaccineId];
        return (
          <View key={item.vaccineId} style={styles.pregCard}>
            <View style={styles.vaccineHeader}>
              <Text style={styles.vaccineName}>{item.name}</Text>
              {v && (
                <View style={[styles.badge, v.inEPI ? styles.badgeEpi : styles.badgeService]}>
                  <Text style={styles.badgeText}>{v.inEPI ? 'TCMR' : 'Dịch vụ'}</Text>
                </View>
              )}
            </View>
            <View style={styles.statusRow}>
              <View style={[styles.statusBadge, priorityStyle[item.priority] || styles.prioLow]}>
                <Text style={styles.statusText}>{item.priority}</Text>
              </View>
            </View>
            <Text style={styles.pregLabel}>⏰ Thời điểm: <Text style={styles.pregValue}>{item.timing}</Text></Text>
            <Text style={styles.pregLabel}>🎯 Lý do: <Text style={styles.pregValue}>{item.reason}</Text></Text>
            {v && (
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>💰 Giá tham khảo: </Text>
                <Text style={styles.priceValue}>{getPrice(v.id, v.inEPI)}</Text>
              </View>
            )}
          </View>
        );
      })}

      {data.note ? (
        <View style={styles.pregNoteCard}>
          <Text style={styles.pregNoteText}>💡 {data.note}</Text>
        </View>
      ) : null}

      <Text style={styles.disclaimer}>
        ⚠️ Nội dung tham khảo/học tập. Cần khám sàng lọc và tư vấn của bác sĩ
        trước khi tiêm.
      </Text>
    </View>
  );
}

// Nội dung tư vấn người cao tuổi có bệnh mạn tính (theo từng bệnh nền)
function ChronicAdvice({ data, icon }) {
  return (
    <View style={styles.pregWrap}>
      <View style={styles.pregHeader}>
        <Text style={styles.pregTitle}>{icon || '🩺'} {data.title}</Text>
        <Text style={styles.pregSubtitle}>{data.subtitle}</Text>
      </View>

      {data.conditions.map((c) => (
        <View key={c.id} style={styles.chronicCard}>
          <Text style={styles.chronicName}>{c.name}</Text>
          <Text style={styles.chronicVacLabel}>Vaccine khuyến nghị:</Text>
          {c.vaccines.map((vac, i) => (
            <Text key={i} style={styles.chronicVacItem}>• {vac}</Text>
          ))}
          {c.note ? <Text style={styles.chronicNote}>📌 {c.note}</Text> : null}
        </View>
      ))}

      {data.note ? (
        <View style={styles.avoidCard}>
          <Text style={styles.avoidNote}>{data.note}</Text>
        </View>
      ) : null}

      <Text style={styles.disclaimer}>
        ⚠️ Nội dung tham khảo/học tập. Cần đánh giá bệnh nền và tư vấn của bác sĩ
        trước khi tiêm.
      </Text>
    </View>
  );
}

// Tư vấn vaccine não mô cầu: 2 dòng + nguyên tắc phối hợp + lịch ví dụ
function MeningoAdvice({ data }) {
  return (
    <View style={styles.pregWrap}>
      <View style={styles.pregHeader}>
        <Text style={styles.pregTitle}>🧠 {data.title}</Text>
        <Text style={styles.pregSubtitle}>{data.subtitle}</Text>
      </View>

      {data.lines.map((line) => (
        <View key={line.id} style={styles.chronicCard}>
          <Text style={styles.chronicName}>{line.name}</Text>
          <Text style={styles.meningoCover}>🛡️ Phủ: {line.cover}</Text>
          <Text style={styles.pregLabel}>🏭 Nguồn gốc: <Text style={styles.pregValue}>{line.origin}</Text></Text>
          <Text style={styles.pregLabel}>👶 Độ tuổi: <Text style={styles.pregValue}>{line.ageStart}</Text></Text>
          <Text style={styles.pregLabel}>💉 Lịch: <Text style={styles.pregValue}>{line.schedule}</Text></Text>
          <Text style={styles.pregLabel}>📍 Đường tiêm: <Text style={styles.pregValue}>{line.route}</Text></Text>
          <Text style={styles.pregLabel}>✅ Chọn khi: <Text style={styles.pregValue}>{line.chooseWhen}</Text></Text>
          <Text style={styles.pregWarnText}>⚠️ {line.note}</Text>
        </View>
      ))}

      {/* Nguyên tắc phối hợp */}
      <View style={styles.combineCard}>
        <Text style={styles.combineTitle}>🔀 Khi phối hợp cả hai dòng</Text>
        {data.combineRules.map((rule, i) => (
          <Text key={i} style={styles.combineItem}>• {rule}</Text>
        ))}
      </View>

      {/* Lịch ví dụ dạng bảng */}
      <View style={styles.combineCard}>
        <Text style={styles.combineTitle}>📅 {data.combineExample.title}</Text>
        {data.combineExample.rows.map((row, i) => (
          <View key={i} style={styles.scheduleRow}>
            <Text style={styles.scheduleTime}>{row.time}</Text>
            <Text style={styles.scheduleShot}>{row.shot}</Text>
          </View>
        ))}
      </View>

      {data.note ? (
        <View style={styles.avoidCard}>
          <Text style={styles.avoidNote}>{data.note}</Text>
        </View>
      ) : null}

      <Text style={styles.disclaimer}>
        ⚠️ Nội dung tham khảo/học tập. Lịch cụ thể do bác sĩ tiêm chủng quyết định.
      </Text>
    </View>
  );
}

export default function ConsultScreen() {
  const [mode, setMode] = useState('age'); // 'age' | 'pre' | 'pregnant' | 'post' | 'elderly' | 'chronic'
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [gender, setGender] = useState('all');
  const [filter, setFilter] = useState('all'); // 'all' | 'epi' | 'service'
  const [hideCompleted, setHideCompleted] = useState(false);
  // Danh sách vaccine đã tiêm: [{ id, dosesDone, lastDate }]
  const [taken, setTaken] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [pickId, setPickId] = useState('');
  const [pickDoses, setPickDoses] = useState('');
  const [pickDate, setPickDate] = useState('');
  const [result, setResult] = useState(null); // null = chưa tư vấn
  const [error, setError] = useState('');

  const seasonal = getSeasonalTips();

  const addTaken = () => {
    if (!pickId) {
      setError('Chọn loại vaccine đã tiêm.');
      return;
    }
    const d = parseInt(pickDoses || '0', 10);
    if (Number.isNaN(d) || d < 1) {
      setError('Nhập số mũi đã tiêm (>= 1).');
      return;
    }
    setError('');
    const next = taken.filter((t) => t.id !== pickId);
    next.push({ id: pickId, dosesDone: d, lastDate: pickDate.trim() });
    setTaken(next);
    setPickId('');
    setPickDoses('');
    setPickDate('');
    setShowPicker(false);
    // Nếu đã tư vấn rồi thì tính lại ngay
    if (result) recompute(next);
  };

  const removeTaken = (id) => {
    const next = taken.filter((t) => t.id !== id);
    setTaken(next);
    if (result) recompute(next);
  };

  const onAdvise = () => {
    Keyboard.dismiss();
    const y = parseInt(years || '0', 10);
    const m = parseInt(months || '0', 10);

    if (Number.isNaN(y) || Number.isNaN(m) || (years === '' && months === '')) {
      setError('Vui lòng nhập tuổi (năm và/hoặc tháng).');
      setResult(null);
      return;
    }
    if (m > 11) {
      setError('Số tháng chỉ nên từ 0 đến 11.');
      setResult(null);
      return;
    }
    setError('');
    const totalMonths = y * 12 + m;
    const takenMap = {};
    taken.forEach((t) => {
      takenMap[t.id] = { dosesDone: t.dosesDone, lastDate: t.lastDate };
    });
    const recs = getRecommendationsWithStatus(totalMonths, gender, takenMap);
    setResult({ totalMonths, y, m, recs });
  };

  // Tính lại kết quả khi thay đổi danh sách đã tiêm (giữ nguyên tuổi/giới)
  const recompute = (takenList) => {
    if (!result) return;
    const takenMap = {};
    takenList.forEach((t) => {
      takenMap[t.id] = { dosesDone: t.dosesDone, lastDate: t.lastDate };
    });
    const recs = getRecommendationsWithStatus(result.totalMonths, gender, takenMap);
    setResult({ ...result, recs });
  };

  const onReset = () => {
    setYears('');
    setMonths('');
    setGender('all');
    setFilter('all');
    setHideCompleted(false);
    setTaken([]);
    setShowPicker(false);
    setPickId('');
    setPickDoses('');
    setPickDate('');
    setResult(null);
    setError('');
  };

  const ageLabel = (r) => {
    const parts = [];
    if (r.y > 0) parts.push(`${r.y} tuổi`);
    if (r.m > 0) parts.push(`${r.m} tháng`);
    if (parts.length === 0) parts.push('Sơ sinh');
    return parts.join(' ');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Tư vấn tiêm chủng</Text>
      <Text style={styles.subtitle}>
        Nhập thông tin khách hàng để gợi ý các vaccine phù hợp để tư vấn/tiêm.
      </Text>
      <DisclaimerNote />

      {/* Chọn chế độ tư vấn */}
      <View style={styles.modeRow}>
        {[
          { key: 'age', label: 'Theo tuổi/giới' },
          { key: 'pre', label: 'Chuẩn bị\nmang thai' },
          { key: 'pregnant', label: 'Thai phụ' },
          { key: 'post', label: 'Sau sinh' },
        ].map((m) => (
          <TouchableOpacity
            key={m.key}
            style={[styles.modeBtn, mode === m.key && styles.modeBtnActive]}
            onPress={() => setMode(m.key)}
          >
            <Text style={[styles.modeText, mode === m.key && styles.modeTextActive]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.modeRow}>
        {[
          { key: 'elderly', label: 'Người\nlớn tuổi' },
          { key: 'chronic', label: 'Cao tuổi\ncó bệnh nền' },
          { key: 'immuno', label: 'Suy giảm\nmiễn dịch' },
          { key: 'travel', label: 'NVYT /\ndu lịch' },
        ].map((m) => (
          <TouchableOpacity
            key={m.key}
            style={[styles.modeBtn, mode === m.key && styles.modeBtnActive]}
            onPress={() => setMode(m.key)}
          >
            <Text style={[styles.modeText, mode === m.key && styles.modeTextActive]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.modeRow}>
        {[
          { key: 'meningo', label: 'Não mô cầu' },
        ].map((m) => (
          <TouchableOpacity
            key={m.key}
            style={[styles.modeBtn, mode === m.key && styles.modeBtnActive]}
            onPress={() => setMode(m.key)}
          >
            <Text style={[styles.modeText, mode === m.key && styles.modeTextActive]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chế độ tư vấn thai kỳ / sau sinh */}
      {(mode === 'pre' || mode === 'pregnant' || mode === 'post') && (
        <PregnancyAdvice
          data={mode === 'pre' ? prePregnancy : mode === 'pregnant' ? duringPregnancy : postpartum}
        />
      )}

      {/* Chế độ người lớn tuổi / bệnh mạn tính / nhóm đặc biệt */}
      {mode === 'elderly' && <ElderlyAdvice data={elderly} />}
      {mode === 'chronic' && <ChronicAdvice data={chronic} icon="🩺" />}
      {mode === 'immuno' && <ChronicAdvice data={immunocompromised} icon="🛡️" />}
      {mode === 'travel' && <ChronicAdvice data={occupationTravel} icon="✈️" />}
      {mode === 'meningo' && <MeningoAdvice data={meningococcal} />}

      {mode === 'age' && (
        <>
      {/* Gợi ý theo mùa */}
      {seasonal && (
        <View style={styles.seasonCard}>
          <Text style={styles.seasonTitle}>🗓️ Ưu tiên theo mùa · {seasonal.season}</Text>
          <Text style={styles.seasonReason}>{seasonal.reason}</Text>
          <View style={styles.seasonTags}>
            {seasonal.vaccineIds.map((id) => {
              const v = vaccineById[id];
              if (!v) return null;
              return (
                <View key={id} style={styles.seasonTag}>
                  <Text style={styles.seasonTagText}>{v.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Nhập tuổi */}
      <View style={styles.card}>
        <Text style={styles.label}>Tuổi khách hàng</Text>
        <View style={styles.row}>
          <View style={styles.ageInputWrap}>
            <TextInput
              style={styles.input}
              value={years}
              onChangeText={setYears}
              placeholder="0"
              keyboardType="number-pad"
              maxLength={3}
            />
            <Text style={styles.unit}>năm</Text>
          </View>
          <View style={styles.ageInputWrap}>
            <TextInput
              style={styles.input}
              value={months}
              onChangeText={setMonths}
              placeholder="0"
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.unit}>tháng</Text>
          </View>
        </View>

        {/* Giới tính */}
        <Text style={[styles.label, { marginTop: 16 }]}>Giới tính</Text>
        <View style={styles.row}>
          {[
            { key: 'all', label: 'Không xác định' },
            { key: 'female', label: 'Nữ' },
            { key: 'male', label: 'Nam' },
          ].map((g) => (
            <TouchableOpacity
              key={g.key}
              style={[styles.genderBtn, gender === g.key && styles.genderBtnActive]}
              onPress={() => setGender(g.key)}
            >
              <Text style={[styles.genderText, gender === g.key && styles.genderTextActive]}>
                {g.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Vaccine đã tiêm */}
        <Text style={[styles.label, { marginTop: 16 }]}>Vaccine đã tiêm (tùy chọn)</Text>
        {taken.length > 0 && (
          <View style={styles.takenList}>
            {taken.map((t) => {
              const v = vaccineById[t.id];
              const info = doseInfo[t.id] || { total: 1 };
              return (
                <View key={t.id} style={styles.takenItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.takenName}>{v ? v.name : t.id}</Text>
                    <Text style={styles.takenMeta}>
                      Đã tiêm {t.dosesDone}/{info.total} mũi
                      {t.lastDate ? ` · gần nhất: ${t.lastDate}` : ''}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => removeTaken(t.id)}>
                    <Text style={styles.takenRemove}>✕</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {!showPicker ? (
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowPicker(true)}>
            <Text style={styles.addBtnText}>+ Thêm vaccine đã tiêm</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.pickerBox}>
            <Text style={styles.pickerLabel}>Chọn vaccine</Text>
            <ScrollView style={styles.pickerScroll} nestedScrollEnabled>
              {vaccines.map((v) => (
                <TouchableOpacity
                  key={v.id}
                  style={[styles.pickerRow, pickId === v.id && styles.pickerRowActive]}
                  onPress={() => setPickId(v.id)}
                >
                  <Text style={[styles.pickerRowText, pickId === v.id && styles.pickerRowTextActive]}>
                    {v.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.pickerInputs}>
              <View style={styles.ageInputWrap}>
                <TextInput
                  style={styles.input}
                  value={pickDoses}
                  onChangeText={setPickDoses}
                  placeholder="Số mũi"
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <Text style={styles.unit}>mũi</Text>
              </View>
            </View>
            <TextInput
              style={[styles.input, { marginTop: 10, textAlign: 'left' }]}
              value={pickDate}
              onChangeText={setPickDate}
              placeholder="Ngày mũi gần nhất (VD: 10/05/2026)"
            />
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.adviseBtn} onPress={addTaken}>
                <Text style={styles.adviseBtnText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => {
                  setShowPicker(false);
                  setPickId('');
                  setPickDoses('');
                  setPickDate('');
                  setError('');
                }}
              >
                <Text style={styles.resetBtnText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.adviseBtn} onPress={onAdvise}>
            <Text style={styles.adviseBtnText}>Tư vấn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
            <Text style={styles.resetBtnText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Kết quả */}
      {result && (
        <View style={styles.resultWrap}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultHeaderText}>
              Khách hàng: {ageLabel(result)}
              {gender === 'female' ? ' · Nữ' : gender === 'male' ? ' · Nam' : ''}
            </Text>
            <Text style={styles.resultCount}>
              {result.recs.length} vaccine phù hợp · cần tiêm/nhắc:{' '}
              {result.recs.filter((r) => r.status !== 'completed').length}
            </Text>
          </View>

          {/* Bộ lọc TCMR / Dịch vụ */}
          {result.recs.length > 0 && (
            <View style={styles.filterRow}>
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'epi', label: 'TCMR (miễn phí)' },
                { key: 'service', label: 'Dịch vụ' },
              ].map((f) => (
                <TouchableOpacity
                  key={f.key}
                  style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
                  onPress={() => setFilter(f.key)}
                >
                  <Text style={[styles.filterChipText, filter === f.key && styles.filterChipTextActive]}>
                    {f.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Ẩn vaccine đã hoàn thành */}
          {result.recs.some((r) => r.status === 'completed') && (
            <TouchableOpacity
              style={styles.toggleRow}
              onPress={() => setHideCompleted(!hideCompleted)}
            >
              <View style={[styles.checkbox, hideCompleted && styles.checkboxOn]}>
                {hideCompleted && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={styles.toggleText}>Ẩn vaccine đã tiêm đủ mũi</Text>
            </TouchableOpacity>
          )}

          {(() => {
            const filtered = result.recs.filter((rec) => {
              const v = vaccineById[rec.id];
              if (!v) return false;
              if (filter === 'epi' && !v.inEPI) return false;
              if (filter === 'service' && v.inEPI) return false;
              if (hideCompleted && rec.status === 'completed') return false;
              return true;
            });

            if (result.recs.length === 0) {
              return (
                <View style={styles.card}>
                  <Text style={styles.empty}>
                    Không có vaccine phù hợp trong dữ liệu cho độ tuổi này. Vui
                    lòng kiểm tra lại thông tin hoặc tham khảo bác sĩ.
                  </Text>
                </View>
              );
            }

            if (filtered.length === 0) {
              return (
                <View style={styles.card}>
                  <Text style={styles.empty}>
                    Không có vaccine thuộc nhóm đã lọc. Thử bỏ lọc hoặc bỏ chọn
                    "Ẩn vaccine đã tiêm đủ mũi".
                  </Text>
                </View>
              );
            }

            const statusStyle = {
              new: { box: styles.stNew, label: 'Chưa tiêm' },
              inProgress: { box: styles.stProgress, label: 'Cần mũi tiếp theo' },
              completed: { box: styles.stDone, label: 'Đã đủ mũi' },
            };

            return filtered.map((rec) => {
              const v = vaccineById[rec.id];
              const st = statusStyle[rec.status] || statusStyle.new;
              return (
                <View
                  key={rec.id}
                  style={[
                    styles.vaccineCard,
                    rec.status === 'completed' && styles.vaccineCardDone,
                  ]}
                >
                  <View style={styles.vaccineHeader}>
                    <Text style={styles.vaccineName}>{v.name}</Text>
                    <View style={[styles.badge, v.inEPI ? styles.badgeEpi : styles.badgeService]}>
                      <Text style={styles.badgeText}>{v.inEPI ? 'TCMR' : 'Dịch vụ'}</Text>
                    </View>
                  </View>

                  {/* Trạng thái tiêm chủng */}
                  <View style={styles.statusRow}>
                    <View style={[styles.statusBadge, st.box]}>
                      <Text style={styles.statusText}>{st.label}</Text>
                    </View>
                    <Text style={styles.doseText}>
                      {rec.dosesDone}/{rec.total} mũi
                      {rec.repeat === 'annual' ? ' · nhắc hằng năm' : rec.repeat === 'booster' ? ' · cần nhắc định kỳ' : ''}
                    </Text>
                  </View>
                  {rec.lastDate ? (
                    <Text style={styles.lastDateText}>Mũi gần nhất: {rec.lastDate}</Text>
                  ) : null}

                  <Text style={styles.vaccineDisease}>Phòng: {v.disease}</Text>
                  <Text style={styles.vaccineNote}>💡 {rec.note}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.meta}>📋 {v.doses}</Text>
                    <Text style={styles.meta}>💉 {v.route}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>💰 Giá tham khảo: </Text>
                    <Text style={styles.priceValue}>{getPrice(v.id, v.inEPI)}</Text>
                  </View>
                </View>
              );
            });
          })()}

          <Text style={styles.disclaimer}>
            ⚠️ Kết quả chỉ mang tính tham khảo/học tập. Giá có thể thay đổi theo
            cơ sở tiêm. Cần khám sàng lọc và đối chiếu phác đồ hiện hành của Bộ Y
            tế trước khi chỉ định tiêm.
          </Text>
        </View>
      )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f7' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1a1a2e', marginTop: 16, marginHorizontal: 16 },
  subtitle: { fontSize: 13, color: '#667085', marginHorizontal: 16, marginTop: 4, marginBottom: 12 },
  modeRow: { flexDirection: 'row', gap: 8, marginHorizontal: 16, marginBottom: 12 },
  modeBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modeBtnActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  modeText: { fontSize: 12, color: '#344054', fontWeight: '600', textAlign: 'center' },
  modeTextActive: { color: '#fff' },
  // Tư vấn thai kỳ
  pregWrap: { marginBottom: 24 },
  pregHeader: { marginHorizontal: 16, marginBottom: 8 },
  pregTitle: { fontSize: 17, fontWeight: 'bold', color: '#6d28d9' },
  pregSubtitle: { fontSize: 13, color: '#667085', marginTop: 4, lineHeight: 18 },
  pregCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pregCardLive: { borderLeftColor: '#dc2626' },
  pregLabel: { fontSize: 13, color: '#344054', marginTop: 6, lineHeight: 18, fontWeight: '600' },
  pregValue: { fontWeight: '400', color: '#475467' },
  pregWarnText: { color: '#b91c1c' },
  avoidCard: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  avoidTitle: { fontSize: 14, fontWeight: 'bold', color: '#b91c1c', marginBottom: 6 },
  avoidItem: { fontSize: 13, color: '#7f1d1d', marginTop: 2, lineHeight: 19 },
  avoidNote: { fontSize: 12, color: '#991b1b', marginTop: 8, lineHeight: 18, fontStyle: 'italic' },
  pregNoteCard: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  pregNoteText: { fontSize: 13, color: '#1e40af', lineHeight: 19 },
  // Ưu tiên (người lớn tuổi)
  prioHigh: { backgroundColor: '#fecaca' },
  prioMed: { backgroundColor: '#fed7aa' },
  prioLow: { backgroundColor: '#e0e7ff' },
  // Bệnh mạn tính
  chronicCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#0ea5e9',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  chronicName: { fontSize: 15, fontWeight: 'bold', color: '#1a1a2e' },
  chronicVacLabel: { fontSize: 13, fontWeight: '600', color: '#344054', marginTop: 8 },
  chronicVacItem: { fontSize: 13, color: '#475467', marginTop: 3, lineHeight: 19 },
  chronicNote: { fontSize: 12, color: '#0369a1', marginTop: 8, lineHeight: 18, fontStyle: 'italic' },
  meningoCover: { fontSize: 13, fontWeight: '700', color: '#7c3aed', marginTop: 4, marginBottom: 4 },
  combineCard: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },
  combineTitle: { fontSize: 14, fontWeight: 'bold', color: '#1e40af', marginBottom: 8 },
  combineItem: { fontSize: 13, color: '#1e3a5f', marginTop: 4, lineHeight: 19 },
  scheduleRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
  },
  scheduleTime: { flex: 1, fontSize: 12, fontWeight: '600', color: '#1e40af', paddingRight: 8 },
  scheduleShot: { flex: 1.4, fontSize: 12, color: '#334155', lineHeight: 17 },
  nextDoseBox: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  nextDoseLabel: { fontSize: 12, color: '#166534', fontWeight: '600', marginBottom: 6 },
  nextDoseInput: {
    borderWidth: 1,
    borderColor: '#86efac',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  nextDoseResult: { fontSize: 13, color: '#166534', marginTop: 8, lineHeight: 18 },
  nextDoseDate: { fontWeight: 'bold', color: '#15803d' },
  nextDoseError: { fontSize: 12, color: '#b91c1c', marginTop: 8 },
  seasonCard: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  seasonTitle: { fontSize: 14, fontWeight: 'bold', color: '#047857' },
  seasonReason: { fontSize: 12, color: '#065f46', marginTop: 4, lineHeight: 18 },
  seasonTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  seasonTag: {
    backgroundColor: '#d1fae5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  seasonTagText: { fontSize: 12, color: '#047857', fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#344054', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 12 },
  ageInputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  unit: { fontSize: 14, color: '#667085' },
  genderBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  genderBtnActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  genderText: { fontSize: 13, color: '#344054', fontWeight: '500' },
  genderTextActive: { color: '#fff' },
  error: { color: '#d92d20', fontSize: 13, marginTop: 12 },
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  adviseBtn: {
    flex: 2,
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  adviseBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resetBtn: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  resetBtnText: { color: '#344054', fontSize: 16, fontWeight: '600' },
  resultWrap: { marginBottom: 24 },
  resultHeader: { marginHorizontal: 16, marginBottom: 8 },
  resultHeaderText: { fontSize: 15, fontWeight: 'bold', color: '#1a1a2e' },
  resultCount: { fontSize: 13, color: '#16a34a', fontWeight: '600', marginTop: 2 },
  filterRow: { flexDirection: 'row', gap: 8, marginHorizontal: 16, marginBottom: 10 },
  filterChip: {
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  filterChipActive: { backgroundColor: '#1a1a2e', borderColor: '#1a1a2e' },
  filterChipText: { fontSize: 12, color: '#344054', fontWeight: '500' },
  filterChipTextActive: { color: '#fff' },
  empty: { fontSize: 14, color: '#667085', lineHeight: 20 },
  vaccineCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  vaccineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vaccineName: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e', flex: 1, paddingRight: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeEpi: { backgroundColor: '#dcfce7' },
  badgeService: { backgroundColor: '#ffedd5' },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#344054' },
  vaccineDisease: { fontSize: 13, color: '#475467', marginTop: 4 },
  vaccineNote: { fontSize: 13, color: '#1d4ed8', marginTop: 6, lineHeight: 18 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  meta: { fontSize: 12, color: '#667085' },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f2f4f7',
  },
  priceLabel: { fontSize: 13, color: '#344054', fontWeight: '600' },
  priceValue: { fontSize: 13, color: '#b54708', fontWeight: '700' },
  // Vaccine đã tiêm - nhập liệu
  takenList: { marginBottom: 8, gap: 6 },
  takenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  takenName: { fontSize: 14, fontWeight: '600', color: '#1a1a2e' },
  takenMeta: { fontSize: 12, color: '#667085', marginTop: 2 },
  takenRemove: { fontSize: 16, color: '#d92d20', paddingHorizontal: 6, fontWeight: 'bold' },
  addBtn: {
    borderWidth: 1,
    borderColor: '#2563eb',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  addBtnText: { color: '#2563eb', fontSize: 14, fontWeight: '600' },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    backgroundColor: '#f8fafc',
  },
  pickerLabel: { fontSize: 13, fontWeight: '600', color: '#344054', marginBottom: 6 },
  pickerScroll: {
    maxHeight: 160,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  pickerRow: { paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#f2f4f7' },
  pickerRowActive: { backgroundColor: '#dbeafe' },
  pickerRowText: { fontSize: 14, color: '#344054' },
  pickerRowTextActive: { color: '#1d4ed8', fontWeight: '700' },
  pickerInputs: { flexDirection: 'row', marginTop: 10 },
  // Toggle ẩn hoàn thành
  toggleRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 10, gap: 8 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#94a3b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: '#1a1a2e', borderColor: '#1a1a2e' },
  checkMark: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  toggleText: { fontSize: 13, color: '#344054' },
  // Trạng thái tiêm
  vaccineCardDone: { opacity: 0.7, borderLeftColor: '#94a3b8' },
  statusRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  stNew: { backgroundColor: '#dbeafe' },
  stProgress: { backgroundColor: '#fef3c7' },
  stDone: { backgroundColor: '#e2e8f0' },
  statusText: { fontSize: 11, fontWeight: '700', color: '#344054' },
  doseText: { fontSize: 12, color: '#475467', fontWeight: '600' },
  lastDateText: { fontSize: 12, color: '#667085', marginTop: 4 },
  disclaimer: {
    fontSize: 12,
    color: '#b54708',
    backgroundColor: '#fffaeb',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    lineHeight: 18,
  },
});
