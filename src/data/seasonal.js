// ============================================================
// GỢI Ý VACCINE ƯU TIÊN THEO MÙA (theo khí hậu Việt Nam)
// Dùng để nhắc nhở ưu tiên tư vấn theo thời điểm trong năm.
// Mục đích học tập - dịch tễ thực tế thay đổi theo năm/vùng miền.
// ============================================================

// Mỗi tháng (1-12) map tới danh sách vaccine ưu tiên + lý do.
// vaccineIds tham chiếu id trong vaccines.js
export const seasonalByMonth = {
  1: { season: 'Mùa đông - xuân (lạnh, ẩm)', vaccineIds: ['flu', 'measles', 'mr', 'mmr', 'meningo'], reason: 'Thời tiết lạnh ẩm dịp Tết, tụ tập đông người: tăng nguy cơ cúm, sởi, não mô cầu.' },
  2: { season: 'Mùa xuân (nồm ẩm)', vaccineIds: ['measles', 'mr', 'mmr', 'varicella', 'meningo'], reason: 'Nồm ẩm sau Tết: dễ bùng phát sởi, thủy đậu, quai bị, não mô cầu.' },
  3: { season: 'Mùa xuân (nồm ẩm)', vaccineIds: ['varicella', 'measles', 'mmr', 'meningo'], reason: 'Cao điểm thủy đậu và các bệnh phát ban mùa xuân.' },
  4: { season: 'Cuối xuân - đầu hè', vaccineIds: ['je', 'varicella', 'flu'], reason: 'Bắt đầu mùa viêm não Nhật Bản; chuẩn bị vào hè.' },
  5: { season: 'Mùa hè (nắng nóng)', vaccineIds: ['je', 'typhoid', 'cholera', 'hepa'], reason: 'Cao điểm viêm não Nhật Bản; nắng nóng dễ mắc bệnh tiêu hóa (thương hàn, tả, viêm gan A).' },
  6: { season: 'Mùa hè (mưa nhiều)', vaccineIds: ['je', 'dengue', 'typhoid', 'cholera'], reason: 'Đỉnh viêm não Nhật Bản; mưa nhiều làm muỗi phát triển - sốt xuất huyết tăng.' },
  7: { season: 'Mùa mưa', vaccineIds: ['dengue', 'je', 'cholera', 'hepa'], reason: 'Cao điểm sốt xuất huyết mùa mưa; nguy cơ bệnh đường tiêu hóa.' },
  8: { season: 'Mùa mưa', vaccineIds: ['dengue', 'flu', 'cholera'], reason: 'Sốt xuất huyết đạt đỉnh; chuẩn bị tiêm cúm trước mùa cúm.' },
  9: { season: 'Đầu thu (tựu trường)', vaccineIds: ['flu', 'dengue', 'measles', 'meningo'], reason: 'Trẻ tựu trường tập trung đông: cúm, sởi, não mô cầu; sốt xuất huyết vẫn cao.' },
  10: { season: 'Mùa thu', vaccineIds: ['flu', 'dengue', 'meningo'], reason: 'Vào mùa cúm; sốt xuất huyết còn lưu hành.' },
  11: { season: 'Cuối thu - đầu đông', vaccineIds: ['flu', 'pcv', 'rsv'], reason: 'Trời trở lạnh: tăng bệnh hô hấp (cúm, phế cầu, RSV).' },
  12: { season: 'Mùa đông (lạnh)', vaccineIds: ['flu', 'pcv', 'rsv', 'meningo'], reason: 'Lạnh sâu, tụ tập cuối năm: cúm, phế cầu, RSV, não mô cầu.' },
};

// Lấy gợi ý theo mùa cho tháng hiện tại (mặc định = tháng hệ thống)
export function getSeasonalTips(month) {
  const m = month || new Date().getMonth() + 1;
  return seasonalByMonth[m] || null;
}

export default seasonalByMonth;
