// ============================================================
// TƯ VẤN VACCINE CHO NGƯỜI LỚN TUỔI (≥50-65) & NGƯỜI CAO TUỔI
// CÓ BỆNH MẠN TÍNH (tim mạch, đái tháo đường, COPD, thận, gan...)
// Mục đích học tập - cần đối chiếu phác đồ hiện hành của Bộ Y tế
// và khám sàng lọc, tư vấn của bác sĩ.
// ============================================================

// Người lớn tuổi khỏe mạnh
export const elderly = {
  title: 'Người lớn tuổi (≥ 50-65)',
  subtitle:
    'Miễn dịch suy giảm theo tuổi ("immunosenescence") làm tăng nguy cơ mắc và biến chứng nặng. Ưu tiên vaccine phòng bệnh hô hấp và tái hoạt virus.',
  vaccines: [
    {
      vaccineId: 'flu',
      name: 'Cúm mùa',
      timing: 'Tiêm nhắc HẰNG NĂM, tốt nhất trước mùa cúm.',
      reason: 'Người cao tuổi dễ biến chứng viêm phổi, đợt cấp bệnh nền, nhồi máu cơ tim sau cúm.',
      priority: 'Rất ưu tiên',
    },
    {
      vaccineId: 'pcv',
      name: 'Phế cầu (PCV/PPSV)',
      timing: 'Khuyến cáo từ 50-65 tuổi; phác đồ tùy loại (PCV13/15/20 ± PPSV23).',
      reason: 'Phòng viêm phổi, nhiễm khuẩn huyết, viêm màng não do phế cầu.',
      priority: 'Rất ưu tiên',
    },
    {
      vaccineId: 'zoster',
      name: 'Zona thần kinh (Shingrix)',
      timing: 'Khuyến cáo từ 50 tuổi: 2 mũi cách nhau 2-6 tháng.',
      reason: 'Phòng bệnh zona và đau thần kinh sau zona (biến chứng thường gặp, dai dẳng ở người già).',
      priority: 'Ưu tiên',
    },
    {
      vaccineId: 'rsv',
      name: 'RSV',
      timing: 'Khuyến cáo từ 60 tuổi (1 mũi theo hướng dẫn hiện hành).',
      reason: 'RSV gây viêm phổi và đợt cấp hô hấp nặng ở người cao tuổi.',
      priority: 'Ưu tiên',
    },
    {
      vaccineId: 'tdap',
      name: 'Bạch hầu - Ho gà - Uốn ván (Td/Tdap)',
      timing: 'Nhắc mỗi 10 năm; ít nhất 1 lần dùng Tdap.',
      reason: 'Duy trì miễn dịch uốn ván, bạch hầu, ho gà ở người lớn.',
      priority: 'Nên tiêm',
    },
    {
      vaccineId: 'covid19',
      name: 'COVID-19',
      timing: 'Tiêm nhắc theo khuyến cáo cho nhóm nguy cơ cao.',
      reason: 'Người cao tuổi nguy cơ bệnh nặng và tử vong do COVID-19 cao.',
      priority: 'Nên tiêm',
    },
  ],
  note:
    'Người cao tuổi nên rà soát tiền sử tiêm chủng; nhiều vaccine (cúm, phế cầu, zona, RSV) có thể phối hợp trong cùng buổi tư vấn.',
};

// Người cao tuổi có bệnh mạn tính - bổ sung theo từng bệnh nền
export const chronic = {
  title: 'Người cao tuổi có bệnh mạn tính',
  subtitle:
    'Bệnh nền làm tăng mạnh nguy cơ biến chứng. Ngoài các vaccine của người lớn tuổi, cần lưu ý thêm theo từng bệnh. Ưu tiên vaccine BẤT HOẠT; thận trọng vaccine sống nếu suy giảm miễn dịch.',
  conditions: [
    {
      id: 'cardio',
      name: '❤️ Tim mạch (suy tim, mạch vành)',
      vaccines: ['Cúm (giảm nguy cơ nhồi máu cơ tim, đột quỵ)', 'Phế cầu', 'COVID-19', 'RSV'],
      note: 'Cúm và phế cầu đặc biệt quan trọng - giảm biến cố tim mạch cấp.',
    },
    {
      id: 'diabetes',
      name: '🩸 Đái tháo đường',
      vaccines: ['Cúm', 'Phế cầu', 'Viêm gan B', 'COVID-19', 'Zona'],
      note: 'Đái tháo đường tăng nguy cơ nhiễm khuẩn; nên tiêm viêm gan B nếu chưa có miễn dịch.',
    },
    {
      id: 'copd',
      name: '🫁 Bệnh phổi mạn (COPD, hen)',
      vaccines: ['Cúm', 'Phế cầu', 'RSV', 'COVID-19'],
      note: 'Vaccine hô hấp giúp giảm đợt cấp và nhập viện.',
    },
    {
      id: 'ckd',
      name: '🧫 Bệnh thận mạn / lọc máu',
      vaccines: ['Cúm', 'Phế cầu', 'Viêm gan B (liều cao/nhắc)', 'COVID-19'],
      note: 'Đáp ứng miễn dịch giảm - có thể cần liều cao hoặc kiểm tra kháng thể (viêm gan B).',
    },
    {
      id: 'liver',
      name: '🫄 Bệnh gan mạn / xơ gan',
      vaccines: ['Viêm gan A', 'Viêm gan B', 'Cúm', 'Phế cầu'],
      note: 'Rất cần viêm gan A & B để tránh suy gan cấp trên nền bệnh gan.',
    },
    {
      id: 'immuno',
      name: '🛡️ Suy giảm miễn dịch / dùng thuốc ức chế miễn dịch',
      vaccines: ['Cúm (bất hoạt)', 'Phế cầu', 'COVID-19', 'Zona (Shingrix - bất hoạt, được phép)'],
      note: 'TRÁNH vaccine sống (sởi, thủy đậu, zona sống). Ưu tiên tiêm khi bệnh ổn định, trước khi bắt đầu thuốc ức chế miễn dịch nếu có thể.',
    },
    {
      id: 'asplenia',
      name: '🩹 Cắt lách / không có lách',
      vaccines: ['Phế cầu', 'Não mô cầu', 'Hib', 'Cúm'],
      note: 'Nguy cơ nhiễm khuẩn do vi khuẩn có vỏ rất cao - cần vaccine phế cầu, não mô cầu, Hib.',
    },
  ],
  note:
    'Cần đánh giá mức độ suy giảm miễn dịch trước khi chỉ định vaccine sống. Nên tiêm khi bệnh nền ổn định, không trong đợt cấp.',
};

export default { elderly, chronic };
