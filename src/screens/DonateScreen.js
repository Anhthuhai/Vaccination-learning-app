import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Platform,
  ToastAndroid,
  Alert,
  Share,
} from 'react-native';
import { colors, spacing, radius, shadow, typography } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';

// ⚙️ THÔNG TIN THANH TOÁN — bạn hãy sửa lại cho đúng tài khoản của mình
const PAYMENT_INFO = {
  bankName: 'Vietcombank',
  accountName: 'LUONG THI NGOC ANH',
  accountNumber: '1015800772',
  note: 'Ung ho app Hoc Tiem Chung',
};

// Các mức ủng hộ gợi ý (song ngữ)
const SUGGESTED_AMOUNTS = [
  { emoji: '☕', label: '20.000đ', desc: { vi: 'Một ly cà phê', en: 'A cup of coffee' } },
  { emoji: '🍜', label: '50.000đ', desc: { vi: 'Một bữa ăn', en: 'A meal' } },
  { emoji: '💐', label: '100.000đ', desc: { vi: 'Người hùng thầm lặng', en: 'A silent hero' } },
];

// Giá trị app mang lại (song ngữ)
const APP_VALUES = {
  vi: [
    '📚 Thông tin vaccine đầy đủ, cập nhật theo Bộ Y tế',
    '📝 Ngân hàng câu hỏi ôn tập phong phú',
    '🗓️ Tra cứu lịch tiêm & liều lượng chi tiết',
    '💬 Tư vấn theo từng đối tượng (thai phụ, trẻ em, người cao tuổi...)',
    '🆓 Hoàn toàn miễn phí, không quảng cáo',
  ],
  en: [
    '📚 Comprehensive vaccine info, updated per Ministry of Health',
    '📝 Rich question bank for review',
    '🗓️ Look up schedules & detailed dosages',
    '💬 Advice by group (pregnant women, children, elderly...)',
    '🆓 Completely free, no ads',
  ],
};

function showToast(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert('✓', msg);
  }
}

function copyToClipboard(value, copiedMsg) {
  Clipboard.setString(value);
  showToast(copiedMsg);
}

async function shareApp(lang) {
  const message =
    lang === 'en'
      ? 'I am using the "Vaccination Learning" app — look up vaccines, schedules, and review knowledge easily. Give it a try! 💉📚'
      : 'Mình đang dùng app "Học Tiêm Chủng" — tra cứu vaccine, lịch tiêm và ôn tập rất tiện. Bạn thử nhé! 💉📚';
  try {
    await Share.share({ message });
  } catch (e) {
    // Người dùng huỷ chia sẻ — bỏ qua
  }
}

function InfoRow({ label, value, copiedMsg }) {
  return (
    <TouchableOpacity
      style={styles.infoRow}
      activeOpacity={0.7}
      onPress={() => copyToClipboard(value, copiedMsg)}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
      <Text style={styles.copyIcon}>📋</Text>
    </TouchableOpacity>
  );
}

export default function DonateScreen() {
  const { t, lang } = useLanguage();
  const copiedText = (label) => `${t('common.copied')} ${label}`;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Lời cảm ơn */}
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>💝</Text>
        <Text style={styles.heroTitle}>{t('donate.title')}</Text>
        <Text style={styles.heroSubtitle}>{t('donate.subtitle')}</Text>
      </View>

      {/* Giá trị app mang lại */}
      <View style={styles.valueCard}>
        <Text style={styles.valueTitle}>{t('donate.valueTitle')}</Text>
        {APP_VALUES[lang].map((v, i) => (
          <Text key={i} style={styles.valueItem}>
            {v}
          </Text>
        ))}
      </View>

      {/* Mức ủng hộ gợi ý */}
      <View style={styles.amountRow}>
        {SUGGESTED_AMOUNTS.map((a, i) => (
          <View key={i} style={styles.amountChip}>
            <Text style={styles.amountEmoji}>{a.emoji}</Text>
            <Text style={styles.amountLabel}>{a.label}</Text>
            <Text style={styles.amountDesc}>{a.desc[lang]}</Text>
          </View>
        ))}
      </View>

      {/* Mã QR thanh toán */}
      <View style={styles.qrCard}>
        <Text style={styles.qrTitle}>{t('donate.qrTitle')}</Text>
        <View style={styles.qrFrame}>
          <Image
            source={require('../../assets/donate-qr.png')}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.qrHint}>{t('donate.qrHint')}</Text>
      </View>

      {/* Thông tin chuyển khoản thủ công */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>
          {lang === 'en' ? 'Or transfer manually' : 'Hoặc chuyển khoản thủ công'}
        </Text>
        <Text style={styles.infoCardHint}>
          {lang === 'en' ? 'Tap each row to copy' : 'Chạm vào từng dòng để sao chép'}
        </Text>
        <InfoRow label={t('donate.bank')} value={PAYMENT_INFO.bankName} copiedMsg={copiedText(t('donate.bank'))} />
        <InfoRow label={t('donate.accountName')} value={PAYMENT_INFO.accountName} copiedMsg={copiedText(t('donate.accountName'))} />
        <InfoRow label={t('donate.accountNumber')} value={PAYMENT_INFO.accountNumber} copiedMsg={copiedText(t('donate.accountNumber'))} />
        <InfoRow label={t('donate.note')} value={PAYMENT_INFO.note} copiedMsg={copiedText(t('donate.note'))} />

        {/* Nút sao chép nhanh số tài khoản */}
        <TouchableOpacity
          style={styles.copyBtn}
          activeOpacity={0.85}
          onPress={() => copyToClipboard(PAYMENT_INFO.accountNumber, copiedText(t('donate.accountNumber')))}
        >
          <Text style={styles.copyBtnText}>{t('donate.copyAccount')}</Text>
        </TouchableOpacity>
      </View>

      {/* Chia sẻ app thay lời cảm ơn */}
      <View style={styles.shareCard}>
        <Text style={styles.shareTitle}>
          {lang === 'en' ? 'Not ready to donate?' : 'Chưa tiện ủng hộ?'}
        </Text>
        <Text style={styles.shareDesc}>
          {lang === 'en'
            ? 'Sharing the app with friends and family is also a wonderful way to support! 💚'
            : 'Chia sẻ app cho bạn bè, người thân cũng là một cách ủng hộ tuyệt vời! 💚'}
        </Text>
        <TouchableOpacity
          style={styles.shareBtn}
          activeOpacity={0.85}
          onPress={() => shareApp(lang)}
        >
          <Text style={styles.shareBtnText}>{t('donate.shareApp')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerNote}>
        {lang === 'en'
          ? '❤️ Every bit of support, however small, means a lot. Thank you sincerely!'
          : '❤️ Mọi sự ủng hộ dù nhỏ đều là nguồn động viên lớn. Xin chân thành cảm ơn!'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  // Hero
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadow.raised,
  },
  heroEmoji: {
    fontSize: 44,
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.onPrimary,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.onPrimary,
    textAlign: 'center',
    opacity: 0.95,
  },

  // Value card
  valueCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  valueTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  valueItem: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 24,
  },

  // Suggested amounts
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  amountChip: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    marginHorizontal: spacing.xs / 2,
  },
  amountEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  amountDesc: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },

  // QR
  qrCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  qrTitle: {
    ...typography.h3,
    marginBottom: spacing.lg,
  },
  qrFrame: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  qrImage: {
    width: 240,
    height: 240,
  },
  qrHint: {
    ...typography.muted,
    marginTop: spacing.lg,
    textAlign: 'center',
  },

  // Info
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  infoCardTitle: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  infoCardHint: {
    ...typography.label,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  infoLabel: {
    ...typography.label,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  copyIcon: {
    fontSize: 18,
    marginLeft: spacing.md,
  },
  copyBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  copyBtnText: {
    color: colors.onPrimary,
    fontSize: 15,
    fontWeight: '700',
  },

  // Share card
  shareCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  shareTitle: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  shareDesc: {
    ...typography.muted,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  shareBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  shareBtnText: {
    color: colors.onPrimary,
    fontSize: 15,
    fontWeight: '700',
  },

  footerNote: {
    ...typography.muted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
