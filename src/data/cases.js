// Tình huống lâm sàng mở rộng để thực hành ra quyết định (mục đích học tập)

export const cases = [
  {
    id: 'case1',
    title: 'Trẻ sốt nhẹ đến lịch tiêm',
    scenario:
      'Bé 2 tháng tuổi đến tiêm chủng theo lịch, đo nhiệt độ 37.8°C, ăn bú bình thường, không dấu hiệu bệnh nặng.',
    question: 'Hướng xử trí phù hợp nhất là gì?',
    options: [
      'Hoãn tiêm vô thời hạn',
      'Vẫn có thể tiêm vì sốt nhẹ không phải chống chỉ định',
      'Chuyển cấp cứu ngay',
      'Chỉ tiêm nếu hết sốt trong 1 tuần',
    ],
    correctIndex: 1,
    explanation:
      'Sốt nhẹ và bệnh nhẹ không phải chống chỉ định tiêm chủng. Sốt cao/bệnh cấp nặng mới nên hoãn.',
  },
  {
    id: 'case2',
    title: 'Tiền sử phản vệ với liều trước',
    scenario: 'Trẻ có tiền sử sốc phản vệ nặng sau liều vaccine trước cùng loại.',
    question: 'Quyết định phù hợp là gì?',
    options: [
      'Tiêm lại liều tiếp theo bình thường',
      'Chống chỉ định liều tiếp theo của cùng vaccine đó',
      'Tăng liều để tạo dung nạp',
      'Đổi sang đường uống',
    ],
    correctIndex: 1,
    explanation:
      'Tiền sử phản vệ nặng với một vaccine hoặc thành phần của nó là chống chỉ định tuyệt đối với liều tiếp theo của vaccine đó.',
  },
  {
    id: 'case3',
    title: 'Trẻ suy giảm miễn dịch và vaccine sống',
    scenario:
      'Trẻ đang điều trị ức chế miễn dịch mạnh, cha mẹ hỏi về vaccine sởi (vaccine sống).',
    question: 'Tư vấn nào phù hợp?',
    options: [
      'Tiêm ngay vaccine sống',
      'Vaccine sống thường chống chỉ định; cần đánh giá chuyên khoa',
      'Không cần bất kỳ vaccine nào',
      'Chỉ dùng vaccine sống liều đôi',
    ],
    correctIndex: 1,
    explanation:
      'Ở người suy giảm miễn dịch nặng, vaccine sống giảm độc lực thường chống chỉ định. Cần đánh giá chuyên khoa trước khi quyết định.',
  },
  {
    id: 'case4',
    title: 'Trẻ bị chó cắn',
    scenario:
      'Bé 5 tuổi bị chó lạ cắn chảy máu ở chân, con chó chạy mất không theo dõi được.',
    question: 'Xử trí đúng là gì?',
    options: [
      'Chỉ rửa vết thương, không cần tiêm',
      'Rửa vết thương kỹ và đến cơ sở y tế để tiêm vaccine/huyết thanh dại',
      'Chờ 10 ngày xem có triệu chứng không',
      'Uống kháng sinh là đủ',
    ],
    correctIndex: 1,
    explanation:
      'Cần rửa vết thương bằng xà phòng dưới vòi nước 15 phút và đến cơ sở y tế ngay để đánh giá điều trị dự phòng dại sau phơi nhiễm.',
  },
  {
    id: 'case5',
    title: 'Lỡ lịch tiêm nhiều tuần',
    scenario:
      'Trẻ trễ mũi 5 trong 1 thứ 2 khoảng 3 tuần so với lịch hẹn. Cha mẹ lo phải tiêm lại từ đầu.',
    question: 'Tư vấn đúng là gì?',
    options: [
      'Phải bắt đầu lại toàn bộ phác đồ từ mũi 1',
      'Tiêm tiếp mũi còn thiếu, không cần bắt đầu lại',
      'Bỏ luôn mũi bị trễ',
      'Tăng gấp đôi liều để bù',
    ],
    correctIndex: 1,
    explanation:
      'Trễ lịch không cần tiêm lại từ đầu. Tiếp tục tiêm các mũi còn thiếu; lịch tiêm là khoảng tối thiểu, trễ vẫn có hiệu lực.',
  },
  {
    id: 'case6',
    title: 'Thai phụ chưa tiêm uốn ván',
    scenario:
      'Sản phụ mang thai lần đầu, thai 20 tuần, chưa từng tiêm uốn ván.',
    question: 'Khuyến cáo tiêm chủng phù hợp?',
    options: [
      'Không cần tiêm gì trong thai kỳ',
      'Tiêm 2 mũi uốn ván (VAT), mũi 2 trước sinh ít nhất 1 tháng',
      'Chỉ tiêm sau khi sinh',
      'Tiêm vaccine sống giảm độc lực',
    ],
    correctIndex: 1,
    explanation:
      'Thai phụ chưa có miễn dịch nên tiêm 2 mũi uốn ván cách nhau ≥ 1 tháng, mũi 2 trước sinh ≥ 1 tháng để phòng uốn ván sơ sinh. Vaccine sống chống chỉ định khi mang thai.',
  },
  {
    id: 'case7',
    title: 'Phản ứng sưng đau sau tiêm',
    scenario:
      'Sau tiêm 6 trong 1, trẻ sốt 38.5°C, quấy khóc, sưng đỏ nhẹ chỗ tiêm, vẫn bú tốt.',
    question: 'Xử trí tại nhà phù hợp?',
    options: [
      'Đưa đi cấp cứu ngay lập tức',
      'Theo dõi, hạ sốt theo hướng dẫn, chườm mát chỗ tiêm',
      'Ngừng tất cả các mũi tiêm sau này',
      'Bôi thuốc kháng sinh lên chỗ tiêm',
    ],
    correctIndex: 1,
    explanation:
      'Đây là phản ứng thông thường sau tiêm. Theo dõi, cho hạ sốt đúng liều, chườm mát, đảm bảo bú/ăn đủ. Đến khám nếu có dấu hiệu nặng (khó thở, co giật, li bì).',
  },
];

export default cases;
