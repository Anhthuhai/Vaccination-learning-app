// ============================================================
// GIÁ THAM KHẢO VACCINE DỊCH VỤ (VND / liều)
// Số liệu MANG TÍNH THAM KHẢO cho mục đích học tập, thay đổi
// theo thời điểm, cơ sở tiêm chủng và nhà cung cấp.
// Vaccine trong TCMR (inEPI = true) thường MIỄN PHÍ tại trạm y tế.
// ============================================================

// id -> khoảng giá tham khảo (chuỗi hiển thị)
export const prices = {
  bcg: 'Miễn phí (TCMR)',
  hepb: '150.000 - 300.000đ',
  'dpt-vgb-hib': 'Miễn phí (TCMR)',
  hexa: '1.000.000 - 1.100.000đ',
  pentaxim: '750.000 - 850.000đ',
  opv: 'Miễn phí (TCMR)',
  ipv: 'Miễn phí (TCMR) / DV ~450.000đ',
  measles: 'Miễn phí (TCMR)',
  mr: 'Miễn phí (TCMR)',
  mmr: '270.000 - 450.000đ',
  rota: '480.000 - 850.000đ/liều',
  pcv: '1.000.000 - 1.600.000đ',
  flu: '300.000 - 500.000đ',
  varicella: '700.000 - 1.100.000đ',
  hepa: '500.000 - 900.000đ',
  je: '200.000 - 800.000đ',
  meningo: '700.000 - 1.500.000đ',
  hpv: '850.000 - 2.700.000đ/liều',
  rabies: '300.000 - 450.000đ/liều',
  typhoid: '300.000 - 500.000đ',
  cholera: '150.000 - 300.000đ/liều',
  tetanus: '100.000 - 200.000đ',
  tdap: '700.000 - 900.000đ',
  covid19: 'Theo chương trình',
  zoster: '3.500.000 - 4.000.000đ/liều',
  rsv: '1.500.000 - 4.500.000đ',
  dengue: '1.300.000 - 1.500.000đ/liều',
  mpox: 'Theo chương trình',
  diphtheria: '150.000 - 300.000đ',
};

export function getPrice(id, inEPI) {
  if (prices[id]) return prices[id];
  return inEPI ? 'Miễn phí (TCMR)' : 'Liên hệ cơ sở tiêm';
}

export default prices;
