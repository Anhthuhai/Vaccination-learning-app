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

// ⚙️ THÔNG TIN THANH TOÁN — bạn hãy sửa lại cho đúng tài khoản của mình
const PAYMENT_INFO = {
  bankName: 'Vietcombank',
  accountName: 'LUONG THI NGOC ANH',
  accountNumber: '1015800772',
  note: 'Ung ho app Hoc Tiem Chung',
};

// Các mức ủng hộ gợi ý (giúp người dùng quyết định nhanh hơn)
const SUGGESTED_AMOUNTS = [
  { emoji: '☕', label: '20.000đ', desc: 'Một ly cà phê' },
  { emoji: '🍜', label: '50.000đ', desc: 'Một bữa ăn' },
  { emoji: '💐', label: '100.000đ', desc: 'Người hùng thầm lặng' },
];

// Giá trị app mang lại (tăng động lực ủng hộ)
const APP_VALUES = [
  '📚 Thông tin vaccine đầy đủ, cập nhật theo Bộ Y tế',
  '📝 Ngân hàng câu hỏi ôn tập phong phú',
  '🗓️ Tra cứu lịch tiêm & liều lượng chi tiết',
  '💬 Tư vấn theo từng đối tượng (thai phụ, trẻ em, người cao tuổi...)',
  '🆓 Hoàn toàn miễn phí, không quảng cáo',
];

function showToast(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert('✓', msg);
  }
}

function copyToClipboard(label, value) {
  Clipboard.setString(value);
  showToast(`Đã sao chép ${label}`);
}

async function shareApp() {
  try {
    await Share.share({
      message:
        'Mình đang dùng app "Học Tiêm Chủng" — tra cứu vaccine, lịch tiêm và ôn tập rất tiện. Bạn thử nhé! 💉📚',
    });
  } catch (e) {
    // Người dùng huỷ chia sẻ — bỏ qua
  }
}

function InfoRow({ label, value }) {
  return (
    <TouchableOpacity
      style={styles.infoRow}
      activeOpacity={0.7}
      onPress={() => copyToClipboard(label, value)}
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
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Lời cảm ơn */}
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>💝</Text>
        <Text style={styles.heroTitle}>Ủng hộ ứng dụng</Text>
        <Text style={styles.heroSubtitle}>
          App được phát triển hoàn toàn miễn phí bởi tâm huyết cá nhân. Nếu thấy
          hữu ích, một ly cà phê từ bạn sẽ tiếp thêm động lực để mình duy trì và
          phát triển thêm nội dung mới. 🙏
        </Text>
      </View>

      {/* Giá trị app mang lại */}
      <View style={styles.valueCard}>
        <Text style={styles.valueTitle}>Ứng dụng mang lại cho bạn</Text>
        {APP_VALUES.map((v, i) => (
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
            <Text style={styles.amountDesc}>{a.desc}</Text>
          </View>
        ))}
      </View>

      {/* Mã QR thanh toán */}
      <View style={styles.qrCard}>
        <Text style={styles.qrTitle}>Quét mã QR để chuyển khoản</Text>
        <View style={styles.qrFrame}>
          <Image
            source={require('../../assets/donate-qr.png')}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.qrHint}>
          Mở app ngân hàng / ví điện tử → Quét mã QR
        </Text>
      </View>

      {/* Thông tin chuyển khoản thủ công */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Hoặc chuyển khoản thủ công</Text>
        <Text style={styles.infoCardHint}>Chạm vào từng dòng để sao chép</Text>
        <InfoRow label="Ngân hàng" value={PAYMENT_INFO.bankName} />
        <InfoRow label="Chủ tài khoản" value={PAYMENT_INFO.accountName} />
        <InfoRow label="Số tài khoản" value={PAYMENT_INFO.accountNumber} />
        <InfoRow label="Nội dung" value={PAYMENT_INFO.note} />

        {/* Nút sao chép nhanh số tài khoản */}
        <TouchableOpacity
          style={styles.copyBtn}
          activeOpacity={0.85}
          onPress={() => copyToClipboard('số tài khoản', PAYMENT_INFO.accountNumber)}
        >
          <Text style={styles.copyBtnText}>📋 Sao chép số tài khoản</Text>
        </TouchableOpacity>
      </View>

      {/* Chia sẻ app thay lời cảm ơn */}
      <View style={styles.shareCard}>
        <Text style={styles.shareTitle}>Chưa tiện ủng hộ?</Text>
        <Text style={styles.shareDesc}>
          Chia sẻ app cho bạn bè, người thân cũng là một cách ủng hộ tuyệt vời! 💚
        </Text>
        <TouchableOpacity
          style={styles.shareBtn}
          activeOpacity={0.85}
          onPress={shareApp}
        >
          <Text style={styles.shareBtnText}>🔗 Chia sẻ ứng dụng</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerNote}>
        ❤️ Mọi sự ủng hộ dù nhỏ đều là nguồn động viên lớn. Xin chân thành cảm ơn!
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
