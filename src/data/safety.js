// Thông tin an toàn, tác dụng phụ và kiến thức nền (mục đích học tập)

export const safety = {
  common: [
    'Đau, sưng, đỏ tại chỗ tiêm',
    'Sốt nhẹ (dưới 38.5°C)',
    'Quấy khóc, mệt mỏi, khó chịu',
    'Chán ăn tạm thời',
    'Nổi nốt/cứng nhẹ tại chỗ tiêm',
  ],
  rare: [
    'Sốt cao co giật (hiếm)',
    'Phản ứng dị ứng: nổi mề đay, phát ban',
    'Khóc thét kéo dài > 3 giờ (hiếm)',
    'Sốc phản vệ (rất hiếm, cần cấp cứu ngay)',
    'Áp xe tại chỗ tiêm (rất hiếm, do kỹ thuật/vô khuẩn)',
  ],
  whenToSeekHelp: [
    'Khó thở, thở rít, sưng môi/lưỡi/mặt',
    'Co giật',
    'Sốt cao ≥ 39°C không hạ hoặc kéo dài',
    'Li bì, khó đánh thức, tím tái',
    'Khóc thét bất thường kéo dài',
    'Phát ban toàn thân, nôn ói nhiều',
  ],
  homeCare: [
    'Cho trẻ nghỉ ngơi, bú/ăn uống đủ nước',
    'Chườm mát chỗ tiêm nếu sưng đau (không chườm nóng, không đắp lá)',
    'Dùng hạ sốt (paracetamol) đúng liều theo cân nặng khi sốt ≥ 38.5°C',
    'Mặc thoáng, không ủ ấm quá mức',
    'Theo dõi ít nhất 30 phút tại cơ sở y tế và 24-48h tại nhà',
  ],
  beforeVaccination: [
    'Mang sổ tiêm chủng, thông báo tiền sử dị ứng/bệnh lý',
    'Báo cán bộ y tế nếu trẻ đang sốt, ốm hoặc dùng thuốc ức chế miễn dịch',
    'Không để trẻ quá đói hoặc quá no trước tiêm',
    'Hỏi rõ loại vaccine, mũi tiêm và lịch hẹn mũi tiếp theo',
  ],
  principles: [
    {
      title: 'Vaccine hoạt động thế nào?',
      content:
        'Vaccine đưa vào cơ thể kháng nguyên (hoặc thông tin tạo kháng nguyên) để hệ miễn dịch "tập dượt", tạo trí nhớ miễn dịch mà không gây bệnh. Khi gặp mầm bệnh thật, cơ thể phản ứng nhanh và mạnh hơn.',
    },
    {
      title: 'Miễn dịch cộng đồng',
      content:
        'Khi đủ tỷ lệ dân số được tiêm chủng, mầm bệnh khó lây lan, gián tiếp bảo vệ những người chưa thể tiêm (trẻ quá nhỏ, người suy giảm miễn dịch).',
    },
    {
      title: 'Chống chỉ định chung',
      content:
        'Phản vệ với liều trước hoặc thành phần vaccine là chống chỉ định tuyệt đối. Vaccine sống thường tránh ở người suy giảm miễn dịch nặng và phụ nữ có thai.',
    },
    {
      title: 'Hoãn tiêm (tạm thời)',
      content:
        'Đang sốt cao, mắc bệnh cấp tính nặng thì hoãn tiêm đến khi ổn định. Sốt nhẹ, cảm nhẹ không phải lý do hoãn.',
    },
  ],
};

export default safety;
