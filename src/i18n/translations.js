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
  },
};
