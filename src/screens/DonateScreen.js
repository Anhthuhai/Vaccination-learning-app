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
} from 'react-native';
import { colors, spacing, radius, shadow, typography } from '../theme';

// ⚙️ THÔNG TIN THANH TOÁN — bạn hãy sửa lại cho đúng tài khoản của mình
const PAYMENT_INFO = {
  bankName: 'Vietcombank',
  accountName: 'LUONG THI NGOC ANH',
  accountNumber: '1015800772',
  note: 'Ung ho app Hoc Tiem Chung',
};

function copyToClipboard(label, value) {
  Clipboard.setString(value);
  const msg = `Đã sao chép ${label}`;
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert('✓', msg);
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
          Cảm ơn bạn đã sử dụng app! Mọi đóng góp của bạn giúp duy trì và phát
          triển thêm nhiều nội dung hữu ích về tiêm chủng. 🙏
        </Text>
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

  footerNote: {
    ...typography.muted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
