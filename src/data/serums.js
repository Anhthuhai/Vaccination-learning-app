// ============================================================
// HUYẾT THANH KHÁNG ĐỘC / KHÁNG DẠI (MIỄN DỊCH THỤ ĐỘNG)
// Huyết thanh cung cấp kháng thể có sẵn, tác dụng NGAY nhưng
// ngắn hạn - khác với vaccine (tạo miễn dịch chủ động, lâu dài).
// Mục đích học tập - cần đối chiếu phác đồ của Bộ Y tế.
// ============================================================

export const serums = [
  {
    id: 'rig',
    name: 'Huyết thanh kháng dại (RIG)',
    fullName: 'Rabies Immunoglobulin',
    types: ['HRIG (nguồn gốc người) - 150 IU/ml', 'ERIG (nguồn gốc ngựa) - 200 IU/ml'],
    indication:
      'Phối hợp với vaccine dại cho vết thương độ III (vết cắn sâu, nhiều vết, chảy máu, gần đầu-mặt-cổ-tay, hoặc niêm mạc) ở người CHƯA tiêm dự phòng dại đầy đủ.',
    dose: 'HRIG: 20 IU/kg cân nặng. ERIG: 40 IU/kg cân nặng.',
    timing:
      'Tiêm càng sớm càng tốt cùng ngày với mũi vaccine dại đầu tiên (ngày 0). Nếu chậm, có thể tiêm trong vòng 7 ngày kể từ mũi vaccine đầu.',
    route:
      'Thâm nhiễm tối đa quanh và trong vết thương; phần còn lại tiêm bắp ở vị trí xa chỗ tiêm vaccine.',
    notes: [
      'KHÔNG tiêm cùng bơm tiêm/cùng vị trí với vaccine dại.',
      'Người ĐÃ tiêm dự phòng dại đầy đủ thì KHÔNG cần RIG.',
      'ERIG cần thử phản ứng trước khi tiêm (nguy cơ phản vệ cao hơn HRIG).',
    ],
  },
  {
    id: 'tig-sat',
    name: 'Huyết thanh kháng uốn ván (SAT / TIG)',
    fullName: 'SAT (huyết thanh ngựa) / TIG (globulin miễn dịch người)',
    types: ['SAT - huyết thanh kháng độc tố uốn ván (ngựa)', 'TIG - Tetanus Immunoglobulin (người)'],
    indication:
      'Dự phòng uốn ván cho người có vết thương nguy cơ mà tiền sử tiêm chủng không rõ/không đầy đủ; hoặc điều trị khi đã mắc uốn ván.',
    dose:
      'Dự phòng: SAT 1.500 - 3.000 IU tiêm bắp; hoặc TIG 250-500 IU tiêm bắp. Điều trị: liều cao hơn theo chỉ định.',
    timing:
      'Tiêm càng sớm càng tốt sau khi bị thương, đồng thời phối hợp tiêm vaccine uốn ván (VAT) ở vị trí khác nếu cần tạo miễn dịch chủ động.',
    route: 'Tiêm bắp (SAT cần thử phản ứng/giải mẫn cảm trước khi tiêm).',
    notes: [
      'SAT (nguồn ngựa) phải thử test phản ứng trước, nguy cơ phản vệ; TIG (người) an toàn hơn.',
      'Huyết thanh chỉ bảo vệ tức thời, ngắn hạn - vẫn cần tiêm vaccine để có miễn dịch lâu dài.',
      'Xử trí vết thương: rửa sạch, cắt lọc, không khâu kín vết thương bẩn.',
    ],
  },
  {
    id: 'hbig',
    name: 'Huyết thanh kháng viêm gan B (HBIG)',
    fullName: 'Hepatitis B Immunoglobulin',
    types: ['HBIG - globulin miễn dịch viêm gan B'],
    indication:
      'Trẻ sơ sinh có mẹ nhiễm viêm gan B (HBsAg dương tính); người phơi nhiễm với máu/dịch nhiễm HBV chưa có miễn dịch.',
    dose: 'Trẻ sơ sinh: 0,5 ml (100 IU) tiêm bắp.',
    timing:
      'Trong vòng 12-24 giờ đầu sau sinh, đồng thời (vị trí khác) với mũi vaccine viêm gan B sơ sinh.',
    route: 'Tiêm bắp ở đùi đối bên với vaccine.',
    notes: [
      'Phối hợp HBIG + vaccine giúp giảm mạnh nguy cơ lây truyền mẹ - con.',
      'Không thay thế cho vaccine - vẫn tiêm đủ lịch viêm gan B sau đó.',
    ],
  },
  {
    id: 'dat-sad',
    name: 'Huyết thanh kháng bạch hầu (SAD / DAT)',
    fullName: 'Diphtheria Antitoxin (huyết thanh kháng độc tố bạch hầu, nguồn gốc ngựa)',
    types: ['SAD / DAT - Diphtheria Antitoxin (huyết thanh ngựa)'],
    indication:
      'ĐIỀU TRỊ (không phải dự phòng) bệnh bạch hầu: trung hòa độc tố bạch hầu còn tự do trong máu. Chỉ định càng sớm khi nghi ngờ lâm sàng, KHÔNG chờ kết quả xét nghiệm.',
    dose:
      'Liều theo mức độ nặng và thời gian mắc bệnh: nhẹ/khu trú (họng, thanh quản, <48h) 20.000 - 40.000 IU; hầu-họng lan rộng 40.000 - 60.000 IU; nặng/lan tỏa/muộn ≥3 ngày hoặc thể ác tính 80.000 - 120.000 IU.',
    timing:
      'Tiêm CÀNG SỚM CÀNG TỐT ngay khi nghi ngờ - hiệu quả giảm nhanh sau mỗi ngày do độc tố đã gắn vào mô. Dùng đồng thời với kháng sinh (penicillin hoặc erythromycin).',
    route:
      'Tiêm bắp; thể nặng có thể truyền tĩnh mạch chậm (pha loãng). BẮT BUỘC thử phản ứng (test da) và giải mẫn cảm (phương pháp Besredka) trước khi tiêm.',
    notes: [
      'Nguồn gốc ngựa → nguy cơ phản vệ và bệnh huyết thanh; chuẩn bị sẵn adrenaline, hộp chống sốc.',
      'Huyết thanh chỉ trung hòa độc tố CÒN TỰ DO, không có tác dụng với độc tố đã gắn vào tế bào → phải dùng sớm.',
      'Không thay thế kháng sinh và vaccine - người bệnh hồi phục vẫn cần tiêm vaccine vì bệnh không tạo miễn dịch bền vững.',
      'Cách ly người bệnh và tiêm phòng/theo dõi người tiếp xúc.',
    ],
  },
];

export default serums;
