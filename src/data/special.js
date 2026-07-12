// ============================================================
// TƯ VẤN VACCINE CHO NHÓM ĐẶC BIỆT
// - Suy giảm miễn dịch KHÔNG do tuổi (HIV, ung thư, ghép tạng)
// - Nhân viên y tế / Người đi du lịch
// Mục đích học tập - cần đối chiếu phác đồ hiện hành của Bộ Y tế,
// CDC/WHO và tư vấn chuyên khoa.
// ============================================================

// Suy giảm miễn dịch không do tuổi - tư vấn theo từng tình trạng
export const immunocompromised = {
  title: 'Suy giảm miễn dịch (HIV, ung thư, ghép tạng)',
  subtitle:
    'Ưu tiên vaccine BẤT HOẠT. Vaccine sống thường CHỐNG CHỈ ĐỊNH khi suy giảm miễn dịch nặng. Nên tiêm khi bệnh ổn định và trước khi bắt đầu điều trị ức chế miễn dịch nếu có thể.',
  conditions: [
    {
      id: 'hiv',
      name: '🦠 Nhiễm HIV',
      vaccines: [
        'Cúm (bất hoạt) - hằng năm',
        'Phế cầu (PCV + PPSV23)',
        'Viêm gan B (kiểm tra kháng thể, có thể liều cao)',
        'Viêm gan A',
        'HPV (đến 26-45 tuổi)',
        'Não mô cầu',
        'COVID-19',
      ],
      note: 'Vaccine sống (sởi, thủy đậu, MMR) CHỈ cân nhắc khi CD4 ≥ 200 và không ức chế miễn dịch nặng. Tránh BCG, cúm sống xịt mũi.',
    },
    {
      id: 'cancer',
      name: '🎗️ Ung thư đang hóa/xạ trị',
      vaccines: [
        'Cúm (bất hoạt)',
        'Phế cầu',
        'COVID-19',
        'Viêm gan B',
        'Zona (Shingrix - bất hoạt)',
      ],
      note: 'Tránh vaccine sống trong và ít nhất 3 tháng sau hóa trị. Tiêm tốt nhất TRƯỚC khi bắt đầu điều trị hoặc giữa các chu kỳ khi bạch cầu hồi phục.',
    },
    {
      id: 'transplant',
      name: '🫀 Ghép tạng đặc / ghép tủy',
      vaccines: [
        'Cúm (bất hoạt)',
        'Phế cầu',
        'Viêm gan B',
        'Não mô cầu, Hib',
        'COVID-19',
        'Zona (Shingrix)',
      ],
      note: 'Hoàn tất vaccine (kể cả vaccine sống nếu cần) TRƯỚC ghép 4 tuần. Sau ghép: CHỐNG CHỈ ĐỊNH vaccine sống; ghép tủy cần tiêm lại toàn bộ theo lịch tái chủng.',
    },
    {
      id: 'asplenia',
      name: '🩹 Cắt lách / không lách chức năng',
      vaccines: ['Phế cầu', 'Não mô cầu (ACYW + B)', 'Hib', 'Cúm'],
      note: 'Nguy cơ nhiễm khuẩn có vỏ rất cao - ưu tiên phế cầu, não mô cầu, Hib. Tiêm trước cắt lách ≥2 tuần nếu mổ chương trình.',
    },
  ],
  note:
    'Người sống chung nhà và người chăm sóc nên tiêm đầy đủ (cúm, ho gà, sởi, thủy đậu) để tạo "vòng bảo vệ" cho người suy giảm miễn dịch.',
};

// Nhân viên y tế / Người đi du lịch
export const occupationTravel = {
  title: 'Nhân viên y tế / Người đi du lịch',
  subtitle:
    'Nhóm có nguy cơ phơi nhiễm nghề nghiệp hoặc theo vùng dịch tễ nơi đến.',
  conditions: [
    {
      id: 'hcw',
      name: '🩺 Nhân viên y tế',
      vaccines: [
        'Viêm gan B (bắt buộc, kiểm tra kháng thể)',
        'Cúm - hằng năm',
        'Sởi - Quai bị - Rubella (nếu chưa có miễn dịch)',
        'Thủy đậu (nếu chưa mắc)',
        'Bạch hầu - Ho gà - Uốn ván (Tdap)',
        'COVID-19',
      ],
      note: 'Viêm gan B và cúm là quan trọng nhất. Cần bằng chứng miễn dịch sởi/thủy đậu; tiêm Tdap để tránh lây ho gà cho bệnh nhi.',
    },
    {
      id: 'travel-basic',
      name: '✈️ Du lịch - vaccine nền',
      vaccines: [
        'Cúm',
        'Bạch hầu - Ho gà - Uốn ván (nhắc)',
        'Sởi - Quai bị - Rubella',
        'COVID-19',
      ],
      note: 'Rà soát và cập nhật các mũi thường quy trước mọi chuyến đi.',
    },
    {
      id: 'travel-endemic',
      name: '🌏 Du lịch vùng dịch tễ',
      vaccines: [
        'Viêm gan A & B',
        'Thương hàn',
        'Tả',
        'Viêm não Nhật Bản (châu Á)',
        'Não mô cầu (bắt buộc khi hành hương Hajj)',
        'Dại (dự phòng trước phơi nhiễm)',
      ],
      note: 'Tùy điểm đến: châu Á (viêm não Nhật Bản), châu Phi/Nam Mỹ (sốt vàng - bắt buộc có chứng nhận), vùng nguy cơ dại cao.',
    },
    {
      id: 'yellow-fever',
      name: '🟡 Sốt vàng (Yellow fever)',
      vaccines: ['Vaccine sốt vàng (1 liều, hiệu lực trọn đời)'],
      note: 'BẮT BUỘC và cần Chứng nhận tiêm chủng quốc tế (thẻ vàng) khi đến/đi qua vùng lưu hành châu Phi & Nam Mỹ. Là vaccine sống - thận trọng ở người suy giảm miễn dịch, thai phụ, >60 tuổi.',
    },
  ],
  note:
    'Nên tư vấn trước chuyến đi 4-6 tuần để kịp hoàn tất phác đồ nhiều mũi. Tham khảo khuyến cáo của CDC/WHO theo từng quốc gia.',
};

export default { immunocompromised, occupationTravel };
