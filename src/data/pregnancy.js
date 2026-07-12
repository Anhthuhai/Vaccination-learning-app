// ============================================================
// TƯ VẤN VACCINE CHO PHỤ NỮ CHUẨN BỊ MANG THAI & THAI PHỤ
// Mục đích học tập - cần đối chiếu phác đồ hiện hành của Bộ Y tế
// và khám sàng lọc, tư vấn của bác sĩ sản khoa.
// ============================================================

// Vaccine nên tiêm TRƯỚC khi mang thai (thời điểm lý tưởng: 1-3 tháng trước)
export const prePregnancy = {
  title: 'Phụ nữ chuẩn bị mang thai',
  subtitle:
    'Nên hoàn tất trước khi có thai (đặc biệt vaccine sống cần tránh thai tối thiểu 1-3 tháng sau tiêm).',
  vaccines: [
    {
      vaccineId: 'mmr',
      name: 'Sởi - Quai bị - Rubella (MMR)',
      timing: 'Hoàn tất trước mang thai ÍT NHẤT 1 tháng (khuyến nghị 3 tháng).',
      reason: 'Rubella khi mang thai gây hội chứng Rubella bẩm sinh (dị tật tim, điếc, đục thủy tinh thể).',
      warning: 'Vaccine sống - CHỐNG CHỈ ĐỊNH khi đã có thai. Tránh thai sau tiêm.',
      live: true,
    },
    {
      vaccineId: 'varicella',
      name: 'Thủy đậu',
      timing: 'Hoàn tất trước mang thai ít nhất 1-3 tháng (2 mũi cách nhau).',
      reason: 'Thủy đậu khi mang thai gây hội chứng thủy đậu bẩm sinh và biến chứng nặng cho mẹ.',
      warning: 'Vaccine sống - CHỐNG CHỈ ĐỊNH khi đã có thai.',
      live: true,
    },
    {
      vaccineId: 'hepb',
      name: 'Viêm gan B',
      timing: 'Nên xét nghiệm và tiêm đủ phác đồ 0-1-6 trước khi mang thai.',
      reason: 'Phòng lây truyền viêm gan B từ mẹ sang con.',
      warning: 'Có thể tiêm khi mang thai nếu có nguy cơ (vaccine bất hoạt, an toàn).',
      live: false,
    },
    {
      vaccineId: 'flu',
      name: 'Cúm',
      timing: 'Tiêm hằng năm; có thể tiêm cả trước và trong thai kỳ.',
      reason: 'Phụ nữ mang thai mắc cúm dễ biến chứng nặng.',
      warning: 'An toàn trong thai kỳ (vaccine bất hoạt).',
      live: false,
    },
    {
      vaccineId: 'hpv',
      name: 'HPV (nếu trong độ tuổi & chưa tiêm)',
      timing: 'Hoàn tất phác đồ trước khi mang thai.',
      reason: 'Phòng ung thư cổ tử cung và bệnh do HPV.',
      warning: 'KHÔNG khuyến cáo tiêm khi đang mang thai - hoãn các mũi còn lại đến sau sinh.',
      live: false,
    },
  ],
};

// Vaccine nên tiêm TRONG thai kỳ
export const duringPregnancy = {
  title: 'Thai phụ (đang mang thai)',
  subtitle:
    'Ưu tiên vaccine BẤT HOẠT. Tránh vaccine sống giảm độc lực trong suốt thai kỳ.',
  vaccines: [
    {
      vaccineId: 'tetanus',
      name: 'Uốn ván (VAT)',
      timing: 'Thai lần đầu: 2 mũi (mũi 1 từ tuần 20, mũi 2 cách ≥1 tháng và trước sinh ≥1 tháng). Thai lần sau: 1 mũi nhắc.',
      reason: 'Phòng uốn ván sơ sinh và uốn ván cho mẹ khi sinh.',
      warning: 'Vaccine giải độc tố, an toàn và được khuyến cáo trong TCMR.',
      live: false,
      intervalDays: 30,
      intervalLabel: 'Mũi 2 cách mũi 1 tối thiểu 1 tháng (30 ngày)',
    },
    {
      vaccineId: 'tdap',
      name: 'Bạch hầu - Ho gà - Uốn ván (Tdap/Boostrix)',
      timing: 'Tốt nhất ở tuần 27-36 mỗi thai kỳ.',
      reason: 'Kháng thể truyền qua nhau bảo vệ trẻ sơ sinh khỏi ho gà trong những tháng đầu.',
      warning: 'An toàn trong thai kỳ (vaccine bất hoạt).',
      live: false,
      intervalDays: null,
      intervalLabel: 'Thường 1 mũi nhắc mỗi thai kỳ (không cần mũi 2).',
    },
    {
      vaccineId: 'flu',
      name: 'Cúm',
      timing: 'Tiêm ở bất kỳ giai đoạn nào của thai kỳ, đặc biệt trong mùa cúm.',
      reason: 'Giảm nguy cơ biến chứng cúm cho mẹ và bảo vệ trẻ sau sinh.',
      warning: 'An toàn (vaccine bất hoạt). KHÔNG dùng vaccine cúm sống dạng xịt mũi.',
      live: false,
    },
    {
      vaccineId: 'rsv',
      name: 'RSV (cho thai phụ)',
      timing: 'Tuần 24-36 theo khuyến cáo, trong mùa RSV.',
      reason: 'Kháng thể truyền cho con giúp phòng bệnh hô hấp nặng do RSV ở trẻ sơ sinh.',
      warning: 'Dùng loại vaccine RSV được chỉ định cho thai phụ (theo hướng dẫn hiện hành).',
      live: false,
    },
  ],
  avoid: [
    'MMR (Sởi - Quai bị - Rubella) - vaccine sống',
    'Thủy đậu - vaccine sống',
    'BCG - vaccine sống',
    'Cúm dạng xịt mũi (sống giảm độc lực)',
    'HPV - hoãn đến sau sinh',
    'Zona (zoster) - hoãn',
  ],
  note:
    'Vaccine sống giảm độc lực bị chống chỉ định trong thai kỳ. Nếu phơi nhiễm dại/uốn ván có chỉ định, vẫn xử trí theo phác đồ (lợi ích > nguy cơ) dưới hướng dẫn của bác sĩ.',
};

// Vaccine cho phụ nữ SAU SINH / đang cho con bú
export const postpartum = {
  title: 'Sau sinh / cho con bú',
  subtitle:
    'Giai đoạn sau sinh là thời điểm tốt để "tiêm bù" các vaccine sống bị hoãn trong thai kỳ. Hầu hết vaccine đều AN TOÀN khi cho con bú.',
  vaccines: [
    {
      vaccineId: 'mmr',
      name: 'Sởi - Quai bị - Rubella (MMR)',
      timing: 'Tiêm ngay sau sinh nếu chưa có miễn dịch Rubella (có thể tiêm khi đang cho con bú).',
      reason: 'Tiêm bù mũi đã hoãn trong thai kỳ, bảo vệ cho lần mang thai sau.',
      warning: 'An toàn khi cho con bú dù là vaccine sống. Tránh có thai trong 1 tháng sau tiêm.',
      live: true,
    },
    {
      vaccineId: 'varicella',
      name: 'Thủy đậu',
      timing: 'Tiêm bù sau sinh nếu chưa có miễn dịch (2 mũi).',
      reason: 'Hoàn tất miễn dịch bị hoãn khi mang thai.',
      warning: 'An toàn khi cho con bú. Tránh có thai 1-3 tháng sau tiêm.',
      live: true,
    },
    {
      vaccineId: 'tdap',
      name: 'Bạch hầu - Ho gà - Uốn ván (Tdap)',
      timing: 'Tiêm ngay sau sinh nếu chưa tiêm trong thai kỳ.',
      reason: 'Bảo vệ mẹ và giảm nguy cơ lây ho gà cho trẻ sơ sinh (chiến lược "kén tổ").',
      warning: 'An toàn khi cho con bú.',
      live: false,
    },
    {
      vaccineId: 'flu',
      name: 'Cúm',
      timing: 'Tiêm nếu chưa tiêm trong mùa cúm.',
      reason: 'Bảo vệ mẹ và gián tiếp bảo vệ trẻ.',
      warning: 'An toàn khi cho con bú.',
      live: false,
    },
    {
      vaccineId: 'hpv',
      name: 'HPV (nếu trong độ tuổi & còn mũi dở)',
      timing: 'Tiếp tục hoàn tất phác đồ đã hoãn trong thai kỳ.',
      reason: 'Phòng ung thư cổ tử cung và bệnh do HPV.',
      warning: 'An toàn khi cho con bú.',
      live: false,
    },
  ],
  note:
    'Người xung quanh trẻ sơ sinh (bố, ông bà, người chăm sóc) cũng nên tiêm cúm và Tdap để tạo "vòng bảo vệ" cho bé.',
};

export default { prePregnancy, duringPregnancy, postpartum };
