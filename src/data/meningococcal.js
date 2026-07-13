// Dữ liệu tư vấn vaccine não mô cầu (meningococcus)
// Gồm 2 dòng chính tại Việt Nam và hướng dẫn phối hợp khi cần bảo vệ toàn diện.

export const meningococcal = {
  title: 'Tư vấn vaccine Não mô cầu',
  subtitle:
    'Không có vaccine đơn lẻ nào phủ đủ cả 5 nhóm (A, B, C, Y, W-135). Cần chọn dòng phù hợp theo dịch tễ, độ tuổi và nhu cầu.',

  // Hai dòng vaccine chính
  lines: [
    {
      id: 'bc',
      name: 'VA-Mengoc-BC',
      cover: 'Nhóm B + C',
      origin: 'Finlay Institute (Cuba)',
      ageStart: 'Từ 6 tháng tuổi',
      schedule: '2 mũi cách nhau 6–8 tuần (tối thiểu 45 ngày)',
      route: 'Tiêm bắp',
      chooseWhen:
        'Khi dịch tễ lưu hành nhóm B, hoặc muốn bảo vệ sớm cho TRẺ NHŨ NHI (nhóm B hay gây bệnh ở trẻ nhỏ).',
      note: 'KHÔNG phủ nhóm A, Y, W-135.',
    },
    {
      id: 'acyw',
      name: 'Menactra / MenQuadfi',
      cover: 'Nhóm A, C, Y, W-135',
      origin: 'Sanofi Pasteur (Mỹ/Pháp) — vaccine cộng hợp',
      ageStart: 'Menactra: 9 tháng • MenQuadfi: ≥12 tháng',
      schedule:
        'Menactra 9–23 tháng: 2 mũi cách 3 tháng • ≥2 tuổi: 1 mũi. Nhắc mỗi 3–5 năm nếu còn nguy cơ.',
      route: 'Tiêm bắp',
      chooseWhen:
        'Khi du lịch/hành hương tới vùng "vành đai viêm màng não" châu Phi, hoặc Hajj (Ả Rập Xê Út yêu cầu), hoặc cần phủ rộng A, C, Y, W-135.',
      note: 'KHÔNG phòng nhóm B.',
    },
  ],

  // Nguyên tắc khi phối hợp cả 2 dòng
  combineRules: [
    'Đây là 2 vaccine riêng biệt, KHÔNG thay thế nhau.',
    'Có thể tiêm CÙNG NGÀY ở 2 vị trí khác nhau (2 bên đùi/cánh tay).',
    'Hoặc tiêm cách nhau tùy lịch — đều là vaccine bất hoạt nên không bắt buộc khoảng cách tối thiểu giữa 2 dòng khác loại.',
    'Mỗi dòng vẫn phải hoàn thành đủ số mũi và khoảng cách nội bộ của riêng nó.',
  ],

  // Ví dụ lịch phối hợp cho trẻ bắt đầu lúc 9 tháng tuổi
  combineExample: {
    title: 'Ví dụ lịch phối hợp (trẻ bắt đầu lúc 9 tháng)',
    rows: [
      { time: 'Tháng 0 (9 tháng tuổi)', shot: 'VA-Mengoc-BC mũi 1 + Menactra mũi 1 (2 vị trí)' },
      { time: 'Tháng 2 (~11 tháng)', shot: 'VA-Mengoc-BC mũi 2' },
      { time: 'Tháng 3 (12 tháng)', shot: 'Menactra mũi 2' },
      { time: 'Sau 3–5 năm', shot: 'Nhắc Menactra/MenQuadfi nếu còn nguy cơ' },
    ],
  },

  note:
    '⚠️ Lịch cụ thể phải do bác sĩ tiêm chủng quyết định theo tuổi bắt đầu, tiền sử và khuyến cáo của nhà sản xuất/Bộ Y tế tại thời điểm tiêm.',
};

export default meningococcal;
