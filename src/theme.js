// Hệ thống theme tập trung cho toàn app — dùng chung màu sắc, khoảng cách, bo góc, đổ bóng
// Import: import { colors, spacing, radius, shadow, typography } from '../theme';

export const colors = {
  // Thương hiệu
  primary: '#0d9488',        // teal 600 — màu chủ đạo (y tế, tin cậy)
  primaryDark: '#0f766e',    // teal 700
  primaryLight: '#ccfbf1',   // teal 100 — nền nhạt
  accent: '#2563eb',         // blue 600 — nhấn phụ

  // Trạng thái
  success: '#16a34a',
  successLight: '#dcfce7',
  danger: '#dc2626',
  dangerLight: '#fee2e2',
  warning: '#d97706',
  warningLight: '#fff8e1',
  info: '#0891b2',
  infoLight: '#e0f2fe',

  // Nền & bề mặt
  background: '#f1f5f9',     // slate 100 — nền màn hình
  surface: '#ffffff',        // nền thẻ/card
  surfaceAlt: '#f8fafc',     // nền phụ

  // Chữ
  text: '#0f172a',           // slate 900
  textMuted: '#475569',      // slate 600
  textFaint: '#94a3b8',      // slate 400
  onPrimary: '#ffffff',

  // Đường viền
  border: '#e2e8f0',         // slate 200
  borderStrong: '#cbd5e1',   // slate 300
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 24, fontWeight: '800', color: colors.text },
  h2: { fontSize: 20, fontWeight: '700', color: colors.text },
  h3: { fontSize: 17, fontWeight: '700', color: colors.text },
  body: { fontSize: 15, color: colors.text, lineHeight: 22 },
  muted: { fontSize: 13, color: colors.textMuted, lineHeight: 19 },
  label: { fontSize: 12, fontWeight: '600', color: colors.textMuted },
};

export const shadow = {
  // Đổ bóng nhẹ cho thẻ (iOS + Android)
  card: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  // Đổ bóng đậm hơn cho phần nổi
  raised: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
};

export default { colors, spacing, radius, typography, shadow };
