// ============================================================
// LIỀU LƯỢNG & ĐƯỜNG TIÊM THEO ĐỐI TƯỢNG / TÊN THƯƠNG MẠI
// Khi cùng một bệnh nhưng khác tên thương mại / lứa tuổi có
// liều hoặc đường dùng khác nhau, được biểu thị thành từng dòng.
// Mục đích học tập - cần đối chiếu tờ hướng dẫn nhà sản xuất.
// ============================================================
//
// Cấu trúc mỗi dòng:
//   { brand, group, dose, route, note }
//   - brand: tên thương mại áp dụng (hoặc 'Chung' nếu áp dụng mọi loại)
//   - group: đối tượng/lứa tuổi
//   - dose:  liều lượng
//   - route: đường tiêm
//   - note:  ghi chú (lịch, số mũi...)

export const dosing = {
  bcg: [
    { brand: 'BCG (IVAC)', group: 'Trẻ sơ sinh (< 1 tháng)', dose: '0,05 ml', route: 'Tiêm trong da', note: 'Trẻ sơ sinh dùng liều 0,05 ml.' },
    { brand: 'BCG (IVAC)', group: 'Trẻ ≥ 1 tuổi', dose: '0,1 ml', route: 'Tiêm trong da', note: 'Trẻ lớn hơn dùng liều 0,1 ml.' },
  ],
  hepb: [
    { brand: 'Gene-Hbvax (TCMR) / Engerix B / Euvax B / Heberbiovac HB', group: 'Liều sơ sinh (trong 24h đầu)', dose: '0,5 ml (10 mcg)', route: 'Tiêm bắp (đùi trước ngoài)', note: 'Bắt buộc dùng vaccine ĐƠN GIÁ, không dùng 5in1/6in1. Trẻ có mẹ HBsAg(+) tiêm thêm HBIG.' },
    { brand: 'Engerix B / Euvax B', group: 'Trẻ em (< 16 tuổi)', dose: '0,5 ml (10 mcg)', route: 'Tiêm bắp', note: 'Đùi trước ngoài ở trẻ nhỏ.' },
    { brand: 'Engerix B / Euvax B', group: 'Người lớn (≥ 16 tuổi)', dose: '1 ml (20 mcg)', route: 'Tiêm bắp', note: 'Cơ delta ở người lớn.' },
    { brand: 'Engerix B', group: 'Bệnh nhân thận nhân tạo', dose: '2 ml (40 mcg)', route: 'Tiêm bắp', note: 'Liều tăng cường do đáp ứng kém.' },
  ],
  'dpt-vgb-hib': [
    { brand: 'SII / ComBE Five', group: 'Trẻ 2-4 tháng', dose: '0,5 ml', route: 'Tiêm bắp', note: '3 liều cách nhau tối thiểu 1 tháng.' },
  ],
  hexa: [
    { brand: 'Hexaxim / Infanrix Hexa', group: 'Trẻ từ 6 tuần - 24 tháng', dose: '0,5 ml', route: 'Tiêm bắp', note: '3 mũi cơ bản + 1 nhắc lại.' },
  ],
  pentaxim: [
    { brand: 'Pentaxim', group: 'Trẻ từ 2 tháng - 24 tháng', dose: '0,5 ml', route: 'Tiêm bắp', note: '3 mũi cơ bản + 1 nhắc lại; tiêm viêm gan B riêng.' },
  ],
  opv: [
    { brand: 'bOPV', group: 'Trẻ 2-4 tháng', dose: '2 giọt', route: 'Uống', note: '3 liều theo lịch.' },
  ],
  ipv: [
    { brand: 'IPV / Imovax Polio', group: 'Trẻ nhỏ', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Theo lịch TCMR hoặc vaccine phối hợp.' },
  ],
  measles: [
    { brand: 'MVVac', group: 'Trẻ từ 9 tháng', dose: '0,5 ml', route: 'Tiêm dưới da', note: 'Mũi sởi đầu tiên.' },
  ],
  mr: [
    { brand: 'MRVac / MR', group: 'Trẻ từ 18 tháng', dose: '0,5 ml', route: 'Tiêm dưới da', note: 'Mũi sởi thứ hai.' },
  ],
  mmr: [
    { brand: 'MMR II / Priorix', group: 'Trẻ em & người lớn', dose: '0,5 ml', route: 'Tiêm dưới da', note: '2 liều cách nhau tối thiểu 1 tháng.' },
  ],
  rota: [
    { brand: 'Rotarix', group: 'Trẻ từ 6 tuần', dose: '1,5 ml', route: 'Uống', note: '2 liều: mũi 1 lúc 6 tuần, mũi 2 lúc 10 tuần (cách ≥ 4 tuần). Hoàn thành trước 24 tuần tuổi.' },
    { brand: 'Rotavin-M1 (Việt Nam)', group: 'Trẻ từ 6 tuần', dose: '2 ml', route: 'Uống', note: '2 liều cách nhau tối thiểu 1 tháng. Hoàn thành trước 6 tháng tuổi.' },
    { brand: 'RotaTeq', group: 'Trẻ từ 6 tuần', dose: '2 ml', route: 'Uống', note: '3 liều: 2-3-4 tháng (cách nhau ≥ 4 tuần). Hoàn thành trước 32 tuần tuổi.' },
    { brand: 'Chung', group: 'Lưu ý liều đầu', dose: '—', route: 'Uống', note: 'Liều đầu nên uống trong khoảng 6-12 tuần, không bắt đầu sau 15 tuần tuổi.' },
  ],
  pcv: [
    { brand: 'Synflorix / Prevenar 13', group: 'Bắt đầu 6 tuần - 6 tháng', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Phác đồ 3+1: 3 mũi cách nhau ≥ 1 tháng (thường 2-3-4 tháng) + 1 mũi nhắc lúc 11-15 tháng.' },
    { brand: 'Synflorix / Prevenar 13', group: 'Bắt đầu 7 - 11 tháng', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Phác đồ 2+1: 2 mũi cách nhau ≥ 1 tháng + 1 mũi nhắc sau sinh nhật 1 tuổi (cách mũi 2 ≥ 2 tháng).' },
    { brand: 'Synflorix / Prevenar 13', group: 'Bắt đầu 12 - 23 tháng', dose: '0,5 ml', route: 'Tiêm bắp', note: '2 mũi cách nhau ≥ 2 tháng.' },
    { brand: 'Synflorix (PCV10)', group: 'Bắt đầu 2 - 5 tuổi', dose: '0,5 ml', route: 'Tiêm bắp', note: '1 mũi duy nhất.' },
    { brand: 'Prevenar 13 (PCV13)', group: 'Người lớn ≥ 18 tuổi & ≥ 65 tuổi', dose: '0,5 ml', route: 'Tiêm bắp', note: '1 mũi.' },
    { brand: 'Pneumovax 23', group: 'Người lớn nguy cơ / ≥ 65 tuổi', dose: '0,5 ml', route: 'Tiêm bắp hoặc dưới da', note: 'Polysaccharide 23 týp; thường tiêm sau Prevenar 13 ≥ 8 tuần.' },
  ],
  flu: [
    { brand: 'Vaxigrip Tetra / Influvac', group: 'Trẻ 6-35 tháng', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Lần đầu cần 2 mũi cách ≥ 4 tuần.' },
    { brand: 'Vaxigrip Tetra / Influvac', group: 'Trẻ ≥ 3 tuổi & người lớn', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Nhắc lại hằng năm.' },
    { brand: 'Ivacflu-S', group: 'Người lớn 18-60 tuổi', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Vaccine cúm sản xuất tại Việt Nam.' },
  ],
  varicella: [
    { brand: 'Varivax / Varilrix', group: 'Trẻ 9-12 tháng đến 12 tuổi', dose: '0,5 ml', route: 'Tiêm dưới da', note: '2 liều cách nhau ≥ 3 tháng (trẻ nhỏ).' },
    { brand: 'Varivax / Varilrix', group: 'Người lớn (≥ 13 tuổi)', dose: '0,5 ml', route: 'Tiêm dưới da', note: '2 liều cách nhau 4-8 tuần.' },
  ],
  hepa: [
    { brand: 'Avaxim 80U', group: 'Trẻ em 12 tháng - 15 tuổi', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Hàm lượng kháng nguyên thấp cho trẻ.' },
    { brand: 'Avaxim 160U', group: 'Người lớn (≥ 16 tuổi)', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Hàm lượng cao hơn cho người lớn.' },
    { brand: 'Twinrix (A+B)', group: 'Người lớn', dose: '1 ml', route: 'Tiêm bắp', note: 'Phối hợp viêm gan A + B, 3 liều.' },
  ],
  je: [
    { brand: 'Jevax (bất hoạt)', group: 'Trẻ 12 - 36 tháng', dose: '0,5 ml', route: 'Tiêm dưới da', note: 'Mũi 1 lúc 12 tháng; mũi 2 cách mũi 1 từ 1-2 tuần; mũi 3 cách mũi 2 một năm.' },
    { brand: 'Jevax (bất hoạt)', group: 'Trẻ > 36 tháng & người lớn', dose: '1 ml', route: 'Tiêm dưới da', note: 'Cùng phác đồ 3 mũi; nhắc lại mỗi 3 năm đến 15 tuổi.' },
    { brand: 'Imojev (sống giảm độc lực)', group: 'Trẻ 9 tháng - < 18 tuổi', dose: '0,5 ml', route: 'Tiêm dưới da', note: 'Mũi 1 từ 9 tháng; mũi 2 cách mũi 1 từ 12-24 tháng.' },
    { brand: 'Imojev (sống giảm độc lực)', group: 'Người lớn ≥ 18 tuổi', dose: '0,5 ml', route: 'Tiêm dưới da', note: 'Chỉ cần 1 mũi duy nhất.' },
  ],
  meningo: [
    { brand: 'VA-Mengoc-BC (B, C)', group: 'Trẻ từ 6 tháng & người lớn', dose: '0,5 ml', route: 'Tiêm bắp', note: '2 mũi cách nhau 6-8 tuần.' },
    { brand: 'Menactra (A,C,Y,W-135)', group: 'Trẻ 9 - 23 tháng', dose: '0,5 ml', route: 'Tiêm bắp', note: '2 liều cách nhau ≥ 3 tháng.' },
    { brand: 'Menactra (A,C,Y,W-135)', group: 'Từ 2 - 55 tuổi', dose: '0,5 ml', route: 'Tiêm bắp', note: '1 liều duy nhất.' },
    { brand: 'Bexsero (nhóm B)', group: 'Trẻ 2 - 5 tháng', dose: '0,5 ml', route: 'Tiêm bắp', note: '3 mũi cơ bản cách ≥ 1 tháng + 1 mũi nhắc lúc 12-15 tháng.' },
    { brand: 'Bexsero (nhóm B)', group: 'Trẻ lớn & người lớn', dose: '0,5 ml', route: 'Tiêm bắp', note: '2 mũi cách nhau ≥ 1 tháng.' },
  ],
  hpv: [
    { brand: 'Gardasil / Gardasil 9 / Cervarix', group: 'Từ 9 đến < 15 tuổi', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Phác đồ 2 liều: mũi 2 cách mũi 1 từ 6-12 tháng.' },
    { brand: 'Gardasil / Gardasil 9 / Cervarix', group: 'Từ 15 - 45 tuổi', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Phác đồ 3 liều: 0 - 2 - 6 tháng (Cervarix: 0 - 1 - 6 tháng).' },
    { brand: 'Chung', group: 'Người suy giảm miễn dịch', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Luôn dùng phác đồ 3 liều dù ở độ tuổi nào.' },
  ],
  rabies: [
    { brand: 'Verorab / Abhayrab', group: 'Dự phòng trước phơi nhiễm', dose: '0,5 ml (bắp) hoặc 0,1 ml (trong da)', route: 'Tiêm bắp hoặc trong da', note: '3 mũi: ngày 0 - 7 - 21 (hoặc 28).' },
    { brand: 'Verorab / Abhayrab', group: 'Sau phơi nhiễm - CHƯA tiêm dự phòng (tiêm bắp)', dose: '0,5 ml/mũi', route: 'Tiêm bắp', note: 'Phác đồ Essen: 5 mũi ngày 0-3-7-14-28.' },
    { brand: 'Verorab / Abhayrab', group: 'Sau phơi nhiễm - CHƯA tiêm dự phòng (trong da)', dose: '0,1 ml x 2 điểm/lần', route: 'Tiêm trong da', note: 'Phác đồ rút gọn ngày 0-3-7 (theo cơ sở đủ điều kiện).' },
    { brand: 'Verorab / Abhayrab', group: 'Sau phơi nhiễm - ĐÃ tiêm dự phòng đầy đủ', dose: '0,5 ml/mũi', route: 'Tiêm bắp', note: 'Chỉ 2 mũi ngày 0 và 3.' },
    { brand: 'Huyết thanh kháng dại (RIG)', group: 'Vết thương độ III (nặng)', dose: 'Theo cân nặng', route: 'Tiêm quanh vết thương', note: 'Phối hợp cùng vaccine khi vết thương sâu/nhiều, gần thần kinh trung ương.' },
  ],
  typhoid: [
    { brand: 'Typhim Vi / Typhoid VI', group: 'Trẻ từ 2 tuổi & người lớn', dose: '0,5 ml', route: 'Tiêm bắp hoặc dưới da', note: '1 liều, nhắc lại mỗi 3 năm nếu còn nguy cơ.' },
  ],
  cholera: [
    { brand: 'mORCVAX', group: 'Trẻ 2-5 tuổi', dose: '1,5 ml/liều', route: 'Uống', note: '2 liều cách nhau tối thiểu 2 tuần.' },
    { brand: 'mORCVAX', group: 'Trên 5 tuổi & người lớn', dose: '1,5 ml/liều', route: 'Uống', note: '2 liều; vùng nguy cơ nhắc lại trước mùa dịch.' },
  ],
  tetanus: [
    { brand: 'VAT', group: 'Phụ nữ có thai', dose: '0,5 ml', route: 'Tiêm bắp', note: '2 mũi cách ≥ 1 tháng, mũi 2 trước sinh ≥ 1 tháng.' },
    { brand: 'VAT', group: 'Người có vết thương nguy cơ', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Theo tình trạng miễn dịch trước đó.' },
    { brand: 'SAT (huyết thanh ngựa)', group: 'Vết thương nguy cơ, miễn dịch không rõ', dose: '1.500 - 3.000 IU', route: 'Tiêm bắp (thử phản ứng trước)', note: 'Miễn dịch thụ động tức thời; tiêm cùng VAT ở vị trí khác.' },
    { brand: 'TIG (globulin người)', group: 'Vết thương nguy cơ, miễn dịch không rõ', dose: '250 - 500 IU', route: 'Tiêm bắp', note: 'An toàn hơn SAT; phối hợp với vaccine uốn ván.' },
  ],
  tdap: [
    { brand: 'Adacel / Boostrix', group: 'Trẻ ≥ 4 tuổi, người lớn, thai phụ', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Nhắc lại mỗi 10 năm; thai phụ tiêm 3 tháng giữa/cuối.' },
  ],
  covid19: [
    { brand: 'Pfizer (trẻ 5-11)', group: 'Trẻ 5-11 tuổi', dose: '0,2 ml (10 mcg)', route: 'Tiêm bắp', note: 'Công thức nhi, hàm lượng thấp hơn.' },
    { brand: 'Pfizer (≥ 12 tuổi)', group: 'Từ 12 tuổi & người lớn', dose: '0,3 ml (30 mcg)', route: 'Tiêm bắp', note: 'Công thức người lớn.' },
    { brand: 'Moderna', group: 'Người lớn', dose: '0,5 ml (100 mcg) liều cơ bản', route: 'Tiêm bắp', note: 'Liều nhắc thường bằng 1/2.' },
  ],
  zoster: [
    { brand: 'Shingrix', group: 'Người lớn ≥ 50 tuổi', dose: '0,5 ml', route: 'Tiêm bắp', note: '2 liều cách nhau 2-6 tháng.' },
    { brand: 'Shingrix', group: 'Người ≥ 18 tuổi suy giảm miễn dịch', dose: '0,5 ml', route: 'Tiêm bắp', note: '2 liều, có thể rút ngắn còn 1-2 tháng.' },
  ],
  rsv: [
    { brand: 'Arexvy / Abrysvo', group: 'Người lớn ≥ 60 tuổi', dose: '0,5 ml', route: 'Tiêm bắp', note: '1 liều.' },
    { brand: 'Abrysvo', group: 'Phụ nữ mang thai 32-36 tuần', dose: '0,5 ml', route: 'Tiêm bắp', note: '1 liều để bảo vệ trẻ sơ sinh.' },
  ],
  dengue: [
    { brand: 'Qdenga (TAK-003)', group: 'Từ 4 tuổi trở lên', dose: '0,5 ml', route: 'Tiêm dưới da', note: '2 liều cách nhau 3 tháng; không cần xét nghiệm trước.' },
    { brand: 'Dengvaxia (CYD-TDV)', group: '9-45 tuổi đã từng nhiễm Dengue', dose: '0,5 ml', route: 'Tiêm dưới da', note: '3 liều (0-6-12 tháng).' },
  ],
  mpox: [
    { brand: 'Jynneos (Imvanex)', group: 'Người lớn ≥ 18 tuổi nguy cơ cao', dose: '0,5 ml', route: 'Tiêm dưới da', note: '2 liều cách nhau 28 ngày.' },
    { brand: 'ACAM2000', group: 'Người lớn (không suy giảm miễn dịch)', dose: '1 giọt (nhiều mũi kim)', route: 'Chủng qua da', note: '1 liều; nhiều chống chỉ định.' },
  ],
  diphtheria: [
    { brand: 'Td', group: 'Trẻ ≥ 7 tuổi & người lớn', dose: '0,5 ml', route: 'Tiêm bắp', note: 'Liều bạch hầu thấp (d); nhắc lại mỗi 10 năm.' },
  ],
};

export default dosing;
