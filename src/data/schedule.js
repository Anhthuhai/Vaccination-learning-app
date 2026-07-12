// Lịch tiêm chủng mở rộng + gợi ý mũi dịch vụ theo độ tuổi (mục đích học tập)
// Nguồn: dựa trên lịch TCMR Việt Nam và khuyến cáo tiêm chủng phổ biến.

export const schedule = [
  {
    id: 'birth',
    ageLabel: 'Sơ sinh',
    epi: ['Viêm gan B (trong 24h đầu)', 'BCG (Lao)'],
    service: [],
  },
  {
    id: '6w',
    ageLabel: '6 tuần - 2 tháng',
    epi: ['5 trong 1 mũi 1 (DPT-VGB-Hib)', 'Bại liệt uống (OPV) mũi 1'],
    service: ['6 trong 1 mũi 1', 'Rotavirus liều 1', 'Phế cầu mũi 1 (cơ bản)'],
  },
  {
    id: '3m',
    ageLabel: '3 tháng',
    epi: ['5 trong 1 mũi 2', 'OPV mũi 2'],
    service: ['6 trong 1 mũi 2', 'Rotavirus liều 2', 'Phế cầu mũi 2 (cơ bản)'],
  },
  {
    id: '4m',
    ageLabel: '4 tháng',
    epi: ['5 trong 1 mũi 3', 'OPV mũi 3'],
    service: ['6 trong 1 mũi 3', 'Rotavirus liều 3 (RotaTeq)', 'Phế cầu mũi 3 (cơ bản)'],
  },
  {
    id: '5m',
    ageLabel: '5 tháng',
    epi: ['Bại liệt tiêm (IPV)'],
    service: [],
  },
  {
    id: '6m',
    ageLabel: '6 tháng',
    epi: [],
    service: ['Cúm mùa (mũi đầu, có thể cần 2 mũi)', 'Não mô cầu B,C (VA-Mengoc-BC)'],
  },
  {
    id: '9m',
    ageLabel: '9 tháng',
    epi: ['Sởi mũi 1 (MVVac)'],
    service: ['Viêm não Nhật Bản (Imojev) mũi 1', 'Não mô cầu ACYW (Menactra)'],
  },
  {
    id: '12m',
    ageLabel: '12 tháng',
    epi: ['Viêm não Nhật Bản (Jevax) mũi 1-2'],
    service: ['Phế cầu mũi nhắc (11-15 tháng)', 'Thủy đậu mũi 1', 'MMR mũi 1', 'Viêm gan A mũi 1'],
  },
  {
    id: '18m',
    ageLabel: '18 tháng',
    epi: ['5 trong 1 nhắc lại / DPT nhắc', 'Sởi - Rubella (MR) mũi 2'],
    service: ['Viêm gan A mũi 2', 'Thủy đậu mũi 2'],
  },
  {
    id: '24m',
    ageLabel: '2 tuổi',
    epi: ['Viêm não Nhật Bản mũi nhắc'],
    service: ['Thương hàn', 'Não mô cầu nhắc'],
  },
  {
    id: '9y',
    ageLabel: '9 tuổi trở lên',
    epi: [],
    service: ['HPV (2-3 liều)', 'Cúm nhắc hằng năm', 'Bạch hầu-ho gà-uốn ván nhắc (Tdap)', 'Sốt xuất huyết Dengue (Qdenga, từ 4 tuổi)'],
  },
  {
    id: 'pregnant',
    ageLabel: 'Phụ nữ mang thai',
    epi: ['Uốn ván (VAT) theo phác đồ'],
    service: ['Cúm', 'Bạch hầu-ho gà-uốn ván (Tdap)', 'RSV (tuần 32-36 thai kỳ)'],
  },
  {
    id: 'elderly',
    ageLabel: 'Người lớn ≥ 50-60 tuổi',
    epi: [],
    service: [
      'Zona thần kinh (Shingrix) - từ 50 tuổi, 2 liều',
      'RSV - từ 60 tuổi, 1 liều',
      'Cúm nhắc hằng năm',
      'Phế cầu (Prevenar 13 / Pneumovax 23)',
    ],
  },
];

export default schedule;
