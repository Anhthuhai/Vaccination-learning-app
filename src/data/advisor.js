// ============================================================
// QUY TẮC TƯ VẤN VACCINE THEO TUỔI & GIỚI TÍNH
// Dùng cho tab "Tư vấn": nhập tuổi (năm/tháng) + giới tính của
// khách hàng -> gợi ý các vaccine PHÙ HỢP để tư vấn/tiêm.
// Tuổi quy đổi ra THÁNG để so sánh (1 tuổi = 12 tháng).
// Mục đích học tập - luôn đối chiếu phác đồ hiện hành của Bộ Y tế
// và khám sàng lọc thực tế trước khi chỉ định.
// ============================================================

// gender: 'all' | 'female' | 'male'
// ranges: khoảng tuổi phù hợp tính theo THÁNG [{ min, max }]
//   min/max: số tháng (max = null nghĩa là không giới hạn trên)
// note: lý do / gợi ý tư vấn ngắn gọn
export const advisorRules = [
  { id: 'bcg', gender: 'all', ranges: [{ min: 0, max: 12 }], note: 'Tiêm càng sớm càng tốt sau sinh, ưu tiên trong tháng đầu.' },
  { id: 'hepb', gender: 'all', ranges: [{ min: 0, max: null }], note: 'Liều sơ sinh trong 24h đầu; người lớn chưa tiêm vẫn nên tiêm phác đồ 0-1-6.' },
  { id: 'dpt-vgb-hib', gender: 'all', ranges: [{ min: 2, max: 24 }], note: '5in1 TCMR: 2-3-4 tháng, nhắc lúc 18 tháng.' },
  { id: 'hexa', gender: 'all', ranges: [{ min: 2, max: 24 }], note: '6in1 dịch vụ: thay thế cho 5in1, thêm bại liệt (IPV).' },
  { id: 'pentaxim', gender: 'all', ranges: [{ min: 2, max: 48 }], note: '5in1 dịch vụ (không có viêm gan B).' },
  { id: 'opv', gender: 'all', ranges: [{ min: 2, max: 6 }], note: 'Bại liệt uống trong TCMR: 2-3-4 tháng.' },
  { id: 'ipv', gender: 'all', ranges: [{ min: 2, max: 24 }], note: 'Bại liệt tiêm: mũi TCMR lúc 5 tháng hoặc trong 6in1.' },
  { id: 'measles', gender: 'all', ranges: [{ min: 9, max: 120 }], note: 'Sởi đơn TCMR: mũi 1 lúc 9 tháng.' },
  { id: 'mr', gender: 'all', ranges: [{ min: 18, max: 120 }], note: 'Sởi - Rubella TCMR: nhắc lúc 18 tháng.' },
  { id: 'mmr', gender: 'all', ranges: [{ min: 12, max: null }], note: 'Sởi-Quai bị-Rubella (dịch vụ): từ 12 tháng, người lớn chưa có miễn dịch vẫn tiêm.' },
  { id: 'rota', gender: 'all', ranges: [{ min: 2, max: 8 }], note: 'Rotavirus (uống): bắt đầu sớm, hoàn tất trước ~6-8 tháng tuổi.' },
  { id: 'pcv', gender: 'all', ranges: [{ min: 2, max: null }], note: 'Phế cầu: trẻ nhỏ và người lớn ≥50 tuổi/nguy cơ cao.' },
  { id: 'flu', gender: 'all', ranges: [{ min: 6, max: null }], note: 'Cúm: tiêm nhắc hằng năm cho mọi lứa tuổi từ 6 tháng.' },
  { id: 'varicella', gender: 'all', ranges: [{ min: 12, max: null }], note: 'Thủy đậu: từ 12 tháng, người lớn chưa mắc bệnh.' },
  { id: 'hepa', gender: 'all', ranges: [{ min: 12, max: null }], note: 'Viêm gan A: từ 12 tháng và người lớn.' },
  { id: 'je', gender: 'all', ranges: [{ min: 9, max: null }], note: 'Viêm não Nhật Bản: Imojev từ 9 tháng, Jevax từ 12 tháng.' },
  { id: 'meningo', gender: 'all', ranges: [{ min: 6, max: 600 }], note: 'Não mô cầu: BC từ 6 tháng, ACYW từ 9 tháng/2 tuổi.' },
  { id: 'hpv', gender: 'all', ranges: [{ min: 108, max: 540 }], note: 'HPV: khuyến cáo 9-26 tuổi (đến 45 tuổi), ưu tiên nữ, hiện có cả nam.' },
  { id: 'rabies', gender: 'all', ranges: [{ min: 0, max: null }], note: 'Dại: dự phòng trước/sau phơi nhiễm ở mọi lứa tuổi khi có chỉ định.' },
  { id: 'typhoid', gender: 'all', ranges: [{ min: 24, max: null }], note: 'Thương hàn: từ 2 tuổi, vùng lưu hành/đi du lịch.' },
  { id: 'cholera', gender: 'all', ranges: [{ min: 24, max: null }], note: 'Tả (uống): từ 2 tuổi, vùng nguy cơ dịch.' },
  { id: 'tetanus', gender: 'all', ranges: [{ min: 0, max: null }], note: 'Uốn ván (VAT): người có vết thương nguy cơ; phụ nữ mang thai.' },
  { id: 'tdap', gender: 'all', ranges: [{ min: 48, max: null }], note: 'Bạch hầu-Ho gà-Uốn ván (Tdap/Boostrix): nhắc ở trẻ lớn, người lớn, thai phụ.' },
  { id: 'covid19', gender: 'all', ranges: [{ min: 6, max: null }], note: 'COVID-19: theo khuyến cáo hiện hành cho nhóm nguy cơ.' },
  { id: 'zoster', gender: 'all', ranges: [{ min: 600, max: null }], note: 'Zona thần kinh: khuyến cáo từ 50 tuổi.' },
  { id: 'rsv', gender: 'all', ranges: [{ min: 0, max: 24 }, { min: 720, max: null }], note: 'RSV: bảo vệ trẻ nhỏ và người lớn ≥60 tuổi; có vaccine cho thai phụ.' },
  { id: 'dengue', gender: 'all', ranges: [{ min: 48, max: null }], note: 'Sốt xuất huyết (Qdenga): từ 4 tuổi.' },
  { id: 'mpox', gender: 'all', ranges: [{ min: 216, max: null }], note: 'Đậu mùa khỉ: người lớn thuộc nhóm nguy cơ cao.' },
  { id: 'diphtheria', gender: 'all', ranges: [{ min: 48, max: null }], note: 'Bạch hầu (Td/Tdap nhắc): trẻ lớn và người lớn theo lịch nhắc.' },
];

// Kiểm tra tuổi (theo tháng) có nằm trong 1 khoảng nào không
function matchAge(ageMonths, ranges) {
  return ranges.some((r) => {
    const okMin = ageMonths >= r.min;
    const okMax = r.max == null || ageMonths <= r.max;
    return okMin && okMax;
  });
}

// Tổng số mũi cơ bản để hoàn thành phác đồ (tham khảo, đơn giản hóa).
// repeat: 'annual' = nhắc hằng năm; 'booster' = cần tiêm nhắc định kỳ.
export const doseInfo = {
  bcg: { total: 1 },
  hepb: { total: 4 },
  'dpt-vgb-hib': { total: 4 },
  hexa: { total: 4 },
  pentaxim: { total: 4 },
  opv: { total: 3 },
  ipv: { total: 3 },
  measles: { total: 1 },
  mr: { total: 1 },
  mmr: { total: 2 },
  rota: { total: 3 },
  pcv: { total: 4 },
  flu: { total: 1, repeat: 'annual' },
  varicella: { total: 2 },
  hepa: { total: 2 },
  je: { total: 3, repeat: 'booster' },
  meningo: { total: 2 },
  hpv: { total: 3 },
  rabies: { total: 5 },
  typhoid: { total: 1, repeat: 'booster' },
  cholera: { total: 2 },
  tetanus: { total: 3, repeat: 'booster' },
  tdap: { total: 1, repeat: 'booster' },
  covid19: { total: 2, repeat: 'booster' },
  zoster: { total: 2 },
  rsv: { total: 1 },
  dengue: { total: 2 },
  mpox: { total: 2 },
  diphtheria: { total: 3, repeat: 'booster' },
};

// Trả về danh sách id vaccine phù hợp theo tuổi (tháng) & giới tính
export function getRecommendations(ageMonths, gender) {
  return advisorRules
    .filter((rule) => {
      const genderOk = rule.gender === 'all' || rule.gender === gender;
      return genderOk && matchAge(ageMonths, rule.ranges);
    })
    .map((rule) => ({ id: rule.id, note: rule.note }));
}

// Trả về danh sách vaccine phù hợp KÈM trạng thái tiêm chủng.
// takenMap: { [vaccineId]: { dosesDone: number, lastDate: string } }
// Mỗi phần tử trả về: { id, note, total, repeat, dosesDone, lastDate, status }
//   status: 'new' (chưa tiêm) | 'inProgress' (đang tiêm dở) | 'completed' (đủ mũi)
export function getRecommendationsWithStatus(ageMonths, gender, takenMap = {}) {
  return advisorRules
    .filter((rule) => {
      const genderOk = rule.gender === 'all' || rule.gender === gender;
      return genderOk && matchAge(ageMonths, rule.ranges);
    })
    .map((rule) => {
      const info = doseInfo[rule.id] || { total: 1 };
      const taken = takenMap[rule.id];
      const dosesDone = taken ? Number(taken.dosesDone) || 0 : 0;
      const lastDate = taken ? taken.lastDate : null;

      let status = 'new';
      if (dosesDone > 0) {
        // Vaccine nhắc hằng năm/định kỳ: luôn có thể cần mũi tiếp -> inProgress
        if (info.repeat) {
          status = 'inProgress';
        } else {
          status = dosesDone >= info.total ? 'completed' : 'inProgress';
        }
      }

      return {
        id: rule.id,
        note: rule.note,
        total: info.total,
        repeat: info.repeat || null,
        dosesDone,
        lastDate,
        status,
      };
    });
}

export default advisorRules;
