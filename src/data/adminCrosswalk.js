export const ADMIN_LEGAL_BASIS = [
  {
    id: 'nq202_2025_qh15',
    title: 'Nghị quyết 202/2025/QH15 (sắp xếp đơn vị hành chính cấp tỉnh)',
    url: 'https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-202-2025-qh15-ve-sap-xep-don-vi-hanh-chinh-cap-tinh-119250612174148722.htm',
  },
  {
    id: 'nq1655_ubtvqh15',
    title: 'Nghị quyết 1655/NQ-UBTVQH15 (sắp xếp đơn vị hành chính cấp xã tỉnh Cà Mau)',
    url: 'https://xaydungchinhsach.chinhphu.vn/sap-xep-dvhc-danh-sach-64-xa-phuong-cua-tinh-ca-mau-moi-119250622173910849.htm',
  },
  {
    id: 'qd694_2024_ttgp',
    title: 'Quyết định 694/QĐ-TTg (xếp hạng di tích quốc gia đặc biệt)',
    url: 'https://chinhphu.vn/?docid=210688&pageid=27160',
  },
];

// Crosswalk cũ -> mới theo NQ 1655/NQ-UBTVQH15.
// confidence: high | medium | low
export const ADMIN_CROSSWALK = {
  province: [
    {
      old: 'Tỉnh Bạc Liêu',
      new: 'Tỉnh Cà Mau',
      status: 'merged',
      confidence: 'high',
      legalBasisId: 'nq202_2025_qh15',
    },
    {
      old: 'Tỉnh Cà Mau',
      new: 'Tỉnh Cà Mau',
      status: 'exact_match',
      confidence: 'high',
      legalBasisId: 'nq202_2025_qh15',
    },
  ],
  district: [
    {
      old: 'Huyện U Minh',
      new: 'Xã U Minh',
      status: 'merged',
      confidence: 'medium',
      legalBasisId: 'nq1655_ubtvqh15',
    },
    {
      old: 'Huyện Ngọc Hiển',
      new: 'Xã Phan Ngọc Hiển',
      status: 'merged',
      confidence: 'medium',
      legalBasisId: 'nq1655_ubtvqh15',
    },
    {
      old: 'Huyện Hồng Dân',
      new: 'Xã Hồng Dân',
      status: 'merged',
      confidence: 'high',
      legalBasisId: 'nq1655_ubtvqh15',
    },
  ],
  communeOrWard: [
    {
      old: 'Xã Ninh Thạnh Lợi A',
      new: 'Xã Ninh Thạnh Lợi',
      status: 'merged',
      confidence: 'high',
      legalBasisId: 'nq1655_ubtvqh15',
    },
    {
      old: 'Thị trấn Rạch Gốc',
      new: 'Xã Phan Ngọc Hiển',
      status: 'merged',
      confidence: 'high',
      legalBasisId: 'nq1655_ubtvqh15',
    },
    {
      old: 'Phường 1 (TP Cà Mau cũ)',
      new: 'Phường An Xuyên',
      status: 'merged',
      confidence: 'high',
      legalBasisId: 'nq1655_ubtvqh15',
    },
    {
      old: 'Phường 2 (TP Cà Mau cũ)',
      new: 'Phường An Xuyên',
      status: 'merged',
      confidence: 'high',
      legalBasisId: 'nq1655_ubtvqh15',
    },
    {
      old: 'Phường 5 (TP Bạc Liêu cũ)',
      new: 'Phường Vĩnh Trạch',
      status: 'merged',
      confidence: 'high',
      legalBasisId: 'nq1655_ubtvqh15',
    },
    {
      old: 'Phường 7 (TP Bạc Liêu cũ)',
      new: 'Phường Bạc Liêu',
      status: 'merged',
      confidence: 'high',
      legalBasisId: 'nq1655_ubtvqh15',
    },
  ],
};
