// Từ điển dịch đa ngôn ngữ (Việt / Anh)
// Cách dùng: const { t } = useLanguage(); t('tab.vaccine')

export const translations = {
  vi: {
    // Tên các tab
    'tab.vaccine': 'Vaccine',
    'tab.schedule': 'Lịch',
    'tab.quiz': 'Quiz',
    'tab.cases': 'Tình huống',
    'tab.safety': 'An toàn',
    'tab.consult': 'Tư vấn',
    'tab.donate': 'Ủng hộ',

    // Chung
    'common.language': 'Ngôn ngữ',
    'common.vietnamese': 'Tiếng Việt',
    'common.english': 'Tiếng Anh',
    'common.back': 'Quay lại',
    'common.next': 'Tiếp theo',
    'common.close': 'Đóng',
    'common.save': 'Lưu',
    'common.cancel': 'Hủy',
    'common.copy': 'Sao chép',
    'common.copied': 'Đã sao chép',
    'common.share': 'Chia sẻ',
    'common.result': 'Kết quả',
    'common.male': 'Nam',
    'common.female': 'Nữ',
    'common.undefined': 'Không xác định',

    // Miễn trừ trách nhiệm
    'disclaimer.title': '⚠️ Tuyên bố miễn trừ trách nhiệm',
    'disclaimer.note':
      'Mọi thông tin chỉ mang tính tham khảo và giáo dục, không thay thế tư vấn y tế chuyên nghiệp.',

    // Màn hình Quiz
    'quiz.title': 'Quiz kiểm tra kiến thức',
    'quiz.subtitle': 'câu về vaccine & tiêm chủng. Chọn phần bạn muốn luyện tập:',
    'quiz.doAll': 'Làm toàn bộ',
    'quiz.questions': 'câu',
    'quiz.otherParts': 'Phần khác',
    'quiz.selectQuestion': 'Chọn câu',
    'quiz.question': 'Câu',
    'quiz.score': 'Điểm',
    'quiz.done': 'Đã làm',
    'quiz.correct': '✅ Chính xác!',
    'quiz.wrong': '❌ Chưa đúng',
    'quiz.prevQuestion': '← Câu trước',
    'quiz.nextQuestion': 'Câu sau →',
    'quiz.viewResult': 'Xem kết quả',
    'quiz.level': 'Mức độ',
    'quiz.reviewQuestions': 'Xem lại các câu',
    'quiz.selectOtherPart': 'Chọn phần khác',
    'quiz.close': 'Đóng',
    'quiz.correctAnswer': '✓ Đáp án đúng',
    'quiz.youChose': 'Bạn đã chọn',
    'quiz.resultTitle': 'Kết quả',

    // Màn hình Ủng hộ
    'donate.title': 'Ủng hộ ứng dụng',
    'donate.subtitle':
      'App được phát triển hoàn toàn miễn phí bởi tâm huyết cá nhân. Nếu thấy hữu ích, một ly cà phê từ bạn sẽ tiếp thêm động lực để mình duy trì và phát triển thêm nội dung mới. 🙏',
    'donate.valueTitle': 'Ứng dụng mang lại cho bạn',
    'donate.qrTitle': 'Quét mã QR để chuyển khoản',
    'donate.qrHint': 'Mở app ngân hàng và quét mã để chuyển khoản',
    'donate.bank': 'Ngân hàng',
    'donate.accountName': 'Chủ tài khoản',
    'donate.accountNumber': 'Số tài khoản',
    'donate.note': 'Nội dung',
    'donate.copyAccount': '📋 Sao chép số tài khoản',
    'donate.shareApp': '📤 Chia sẻ ứng dụng',

    // Ghi chú kiểm chứng dữ liệu (DisclaimerNote)
    'data.disclaimer':
      'Dữ liệu tham khảo, cập nhật đến {date}. Vui lòng đối chiếu văn bản hiện hành của Bộ Y tế và hướng dẫn của nhà sản xuất trước khi áp dụng.',

    // Màn hình Vaccine
    'vaccine.heading': 'Vaccine tại Việt Nam',
    'vaccine.count': '{n} loại vaccine · TCMR & dịch vụ',
    'vaccine.search': 'Tìm theo tên vaccine, bệnh hoặc hãng...',
    'vaccine.empty': 'Không tìm thấy vaccine phù hợp.',
    'vaccine.cat.all': 'Tất cả',
    'vaccine.cat.epi': 'TCMR',
    'vaccine.cat.combo': 'Phối hợp',
    'vaccine.cat.respiratory': 'Hô hấp',
    'vaccine.cat.gi': 'Tiêu hóa',
    'vaccine.cat.hepatitis': 'Viêm gan',
    'vaccine.cat.neuro': 'Não - Màng não',
    'vaccine.cat.other': 'Khác',
    'vaccine.epi': 'TCMR',
    'vaccine.service': 'Dịch vụ',
    'vaccine.prevents': 'Phòng',
    'vaccine.type': '🧬 Loại',
    'vaccine.route': '💉 Đường dùng',
    'vaccine.ageGroup': '👶 Đối tượng',
    'vaccine.doses': '🔢 Số liều',
    'vaccine.schedule': '🗓️ Lịch',
    'vaccine.contraindications': '⛔ Chống chỉ định:',
    'vaccine.sideEffects': '⚠️ Tác dụng phụ:',
    'vaccine.notes': 'Lưu ý',
    'vaccine.dosingByGroup': '💊 Liều lượng & đường tiêm theo đối tượng:',
    'vaccine.collapse': 'Thu gọn ▲',
    'vaccine.expand': 'Xem chi tiết ▼',
    'vaccine.footer':
      'Thông tin tham khảo học tập. Vui lòng đối chiếu hướng dẫn của Bộ Y tế và nhà sản xuất.',

    // Màn hình Lịch tiêm
    'schedule.heading': 'Lịch tiêm chủng',
    'schedule.progress': 'Đã đánh dấu: {done}/{total} mũi',
    'schedule.free': 'Miễn phí',
    'schedule.serviceShort': 'DV',
    'schedule.service': 'Dịch vụ',
    'schedule.footer':
      'Lịch mang tính tham khảo. Thời điểm cụ thể có thể thay đổi theo hướng dẫn của cơ sở tiêm chủng.',

    // Màn hình Tình huống
    'cases.heading': 'Tình huống lâm sàng',
    'cases.correct': '✅ Chính xác!',
    'cases.wrong': '❌ Chưa đúng',
    'cases.retry': '↺ Thử lại',

    // Màn hình An toàn
    'safety.heading': 'An toàn & Tác dụng phụ',
    'safety.before': '✅ Chuẩn bị trước khi tiêm',
    'safety.common': 'Phản ứng thường gặp (nhẹ)',
    'safety.rare': 'Phản ứng hiếm gặp',
    'safety.seekHelp': '⚠️ Khi nào cần đến cơ sở y tế ngay',
    'safety.homeCare': 'Chăm sóc tại nhà',
    'safety.principles': '📚 Kiến thức nền',
    'safety.serumTitle': '💉 Huyết thanh (miễn dịch thụ động)',
    'safety.serumIntro':
      'Huyết thanh cung cấp kháng thể có sẵn, tác dụng ngay nhưng ngắn hạn - thường phối hợp cùng vaccine.',
    'safety.serumIndication': '🎯 Chỉ định:',
    'safety.serumDose': '💊 Liều:',
    'safety.serumTiming': '⏱️ Thời điểm dùng:',
    'safety.serumRoute': '💉 Đường dùng:',
    'safety.serumNotes': '📌 Lưu ý:',
    'safety.footer':
      'Thông tin mang tính tham khảo, học tập. Luôn tuân theo hướng dẫn của cán bộ y tế.',

    // Quiz — bổ sung
    'quiz.doAllN': '▶️  Làm toàn bộ {n} câu',
    'quiz.bySet': '📚 Theo bộ {n} câu',
    'quiz.byLevel': '🎯 Theo mức độ',
    'quiz.setLabel': 'Câu {from}–{to}',
    'quiz.easy': 'Dễ',
    'quiz.medium': 'Trung bình',
    'quiz.hard': 'Khó',
    'quiz.needReview': 'Cần ôn tập thêm nhé!',
    'quiz.excellent': 'Xuất sắc! 🎉',
    'quiz.good': 'Khá tốt, cố gắng thêm!',

    // Tư vấn
    'consult.title': 'Tư vấn tiêm chủng',
    'consult.subtitle': 'Nhập thông tin khách hàng để gợi ý các vaccine phù hợp để tư vấn/tiêm.',
    'consult.gender': 'Giới tính',
    'consult.mode.age': 'Theo tuổi/giới',
    'consult.mode.pre': 'Chuẩn bị\nmang thai',
    'consult.mode.pregnant': 'Thai phụ',
    'consult.mode.post': 'Sau sinh',
    'consult.mode.elderly': 'Người\nlớn tuổi',
    'consult.mode.chronic': 'Cao tuổi\ncó bệnh nền',
    'consult.mode.immuno': 'Suy giảm\nmiễn dịch',
    'consult.mode.travel': 'NVYT /\ndu lịch',
    'consult.mode.meningo': 'Não mô cầu',
  },

  en: {
    // Tab names
    'tab.vaccine': 'Vaccine',
    'tab.schedule': 'Schedule',
    'tab.quiz': 'Quiz',
    'tab.cases': 'Cases',
    'tab.safety': 'Safety',
    'tab.consult': 'Consult',
    'tab.donate': 'Donate',

    // Common
    'common.language': 'Language',
    'common.vietnamese': 'Vietnamese',
    'common.english': 'English',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.copy': 'Copy',
    'common.copied': 'Copied',
    'common.share': 'Share',
    'common.result': 'Result',
    'common.male': 'Male',
    'common.female': 'Female',
    'common.undefined': 'Unspecified',

    // Disclaimer
    'disclaimer.title': '⚠️ Disclaimer',
    'disclaimer.note':
      'All information is for reference and educational purposes only and does not replace professional medical advice.',

    // Quiz screen
    'quiz.title': 'Knowledge Quiz',
    'quiz.subtitle': 'questions about vaccines & immunization. Choose a section to practice:',
    'quiz.doAll': 'Do all',
    'quiz.questions': 'questions',
    'quiz.otherParts': 'Other parts',
    'quiz.selectQuestion': 'Select question',
    'quiz.question': 'Question',
    'quiz.score': 'Score',
    'quiz.done': 'Done',
    'quiz.correct': '✅ Correct!',
    'quiz.wrong': '❌ Incorrect',
    'quiz.prevQuestion': '← Previous',
    'quiz.nextQuestion': 'Next →',
    'quiz.viewResult': 'View result',
    'quiz.level': 'Level',
    'quiz.reviewQuestions': 'Review questions',
    'quiz.selectOtherPart': 'Choose another section',
    'quiz.close': 'Close',
    'quiz.correctAnswer': '✓ Correct answer',
    'quiz.youChose': 'You chose',
    'quiz.resultTitle': 'Result',

    // Donate screen
    'donate.title': 'Support the app',
    'donate.subtitle':
      'This app is developed completely free out of personal passion. If you find it useful, a cup of coffee from you will motivate me to maintain and add new content. 🙏',
    'donate.valueTitle': 'What this app brings you',
    'donate.qrTitle': 'Scan the QR code to transfer',
    'donate.qrHint': 'Open your banking app and scan the code to transfer',
    'donate.bank': 'Bank',
    'donate.accountName': 'Account holder',
    'donate.accountNumber': 'Account number',
    'donate.note': 'Message',
    'donate.copyAccount': '📋 Copy account number',
    'donate.shareApp': '📤 Share the app',

    // Data verification note (DisclaimerNote)
    'data.disclaimer':
      'Reference data, updated as of {date}. Please cross-check with the current documents of the Ministry of Health and the manufacturer\u2019s guidelines before applying.',

    // Vaccine screen
    'vaccine.heading': 'Vaccines in Vietnam',
    'vaccine.count': '{n} vaccines · EPI & service',
    'vaccine.search': 'Search by vaccine name, disease or brand...',
    'vaccine.empty': 'No matching vaccine found.',
    'vaccine.cat.all': 'All',
    'vaccine.cat.epi': 'EPI',
    'vaccine.cat.combo': 'Combination',
    'vaccine.cat.respiratory': 'Respiratory',
    'vaccine.cat.gi': 'Digestive',
    'vaccine.cat.hepatitis': 'Hepatitis',
    'vaccine.cat.neuro': 'Brain - Meningitis',
    'vaccine.cat.other': 'Other',
    'vaccine.epi': 'EPI',
    'vaccine.service': 'Service',
    'vaccine.prevents': 'Prevents',
    'vaccine.type': '🧬 Type',
    'vaccine.route': '💉 Route',
    'vaccine.ageGroup': '👶 Target group',
    'vaccine.doses': '🔢 Doses',
    'vaccine.schedule': '🗓️ Schedule',
    'vaccine.contraindications': '⛔ Contraindications:',
    'vaccine.sideEffects': '⚠️ Side effects:',
    'vaccine.notes': 'Note',
    'vaccine.dosingByGroup': '💊 Dosage & route by target group:',
    'vaccine.collapse': 'Collapse ▲',
    'vaccine.expand': 'View details ▼',
    'vaccine.footer':
      'For educational reference. Please cross-check with Ministry of Health and manufacturer guidelines.',

    // Schedule screen
    'schedule.heading': 'Vaccination Schedule',
    'schedule.progress': 'Checked: {done}/{total} doses',
    'schedule.free': 'Free',
    'schedule.serviceShort': 'SV',
    'schedule.service': 'Service',
    'schedule.footer':
      'The schedule is for reference. Exact timing may vary per your vaccination facility\u2019s guidance.',

    // Cases screen
    'cases.heading': 'Clinical Scenarios',
    'cases.correct': '✅ Correct!',
    'cases.wrong': '❌ Not quite',
    'cases.retry': '↺ Try again',

    // Safety screen
    'safety.heading': 'Safety & Side Effects',
    'safety.before': '✅ Preparation before vaccination',
    'safety.common': 'Common reactions (mild)',
    'safety.rare': 'Rare reactions',
    'safety.seekHelp': '⚠️ When to seek medical care immediately',
    'safety.homeCare': 'Home care',
    'safety.principles': '📚 Background knowledge',
    'safety.serumTitle': '💉 Serum (passive immunity)',
    'safety.serumIntro':
      'Serum provides ready-made antibodies with immediate but short-term effect - usually combined with vaccines.',
    'safety.serumIndication': '🎯 Indication:',
    'safety.serumDose': '💊 Dose:',
    'safety.serumTiming': '⏱️ Timing:',
    'safety.serumRoute': '💉 Route:',
    'safety.serumNotes': '📌 Notes:',
    'safety.footer':
      'Information is for educational reference. Always follow the guidance of healthcare staff.',

    // Quiz — extra
    'quiz.doAllN': '▶️  Do all {n} questions',
    'quiz.bySet': '📚 By sets of {n}',
    'quiz.byLevel': '🎯 By difficulty',
    'quiz.setLabel': 'Q {from}–{to}',
    'quiz.easy': 'Easy',
    'quiz.medium': 'Medium',
    'quiz.hard': 'Hard',
    'quiz.needReview': 'Needs more review!',
    'quiz.excellent': 'Excellent! 🎉',
    'quiz.good': 'Pretty good, keep going!',

    // Consult
    'consult.title': 'Vaccination Advice',
    'consult.subtitle': 'Enter client information to suggest suitable vaccines to advise/administer.',
    'consult.gender': 'Gender',
    'consult.mode.age': 'By age/gender',
    'consult.mode.pre': 'Pre-\npregnancy',
    'consult.mode.pregnant': 'Pregnant',
    'consult.mode.post': 'Postpartum',
    'consult.mode.elderly': 'Elderly',
    'consult.mode.chronic': 'Elderly with\nchronic illness',
    'consult.mode.immuno': 'Immuno-\ncompromised',
    'consult.mode.travel': 'HCW /\ntravel',
    'consult.mode.meningo': 'Meningococcal',
  },
};
