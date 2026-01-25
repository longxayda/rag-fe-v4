# Quick Reference - Cập Nhật Dữ Liệu Di Sản Văn Hóa

## 📊 Tóm Tắt Nhanh

### Số Liệu
- **Trước**: 9 mục
- **Sau**: 85 mục  
- **Thêm mới**: +76 mục

### Tính Năng Mới
- ✅ Hiển thị video YouTube (1 video)
- ✅ Audio giới thiệu (5 audio)
- ✅ Thông tin chi tiết đầy đủ hơn
- ✅ Phân loại theo xếp hạng

## 📁 Files Quan Trọng

### Dữ Liệu
- `src/data/heritages.json` - Dữ liệu chính (85 mục)
- `src/data/heritages_backup.json` - Backup dữ liệu cũ

### Code
- `src/components/Detail.jsx` - Thêm hiển thị video YouTube
- `scripts/parse_csv.py` - Script chuyển đổi CSV → JSON

### Tài Liệu
- `DATA_UPDATE_REPORT.md` - Báo cáo chi tiết
- `HUONG_DAN_SU_DUNG.md` - Hướng dẫn sử dụng
- `DANH_SACH_DI_SAN.txt` - Danh sách 85 mục

## 🎯 Các Mục Có Nội Dung Đa Phương Tiện

### Audio (5 mục)
1. Di tích căn cứ Cái Chanh
2. Đền thờ Trần Quang Diệu
3. Di tích chùa KosThum
4. Làng nghề đan đát truyền thống ấp Mỹ I
5. Chùa Đìa Muồng

### Video (1 mục)
1. Đền thờ Chủ tịch Hồ Chí Minh - Trận đánh Mỹ Trinh

## 🏛️ Phân Loại

### Theo Xếp Hạng
- Quốc gia đặc biệt: 2
- Quốc gia: 11
- Cấp tỉnh: 21
- Chưa xếp hạng: 43
- Không: 8

### Theo Loại
- Di tích Lịch sử - Văn hóa: 18
- Di tích Kiến trúc - Nghệ thuật: 10
- Lễ hội: 6
- Khu tưởng niệm: 3
- Làng nghề: 2
- Khác: 46

## 🔧 Sử Dụng Script Parser

```bash
# Parse CSV thành JSON
python3 scripts/parse_csv.py "DI SAN, DI TICH, NHAN VAT CM - Văn hóa.csv" "output.json"
```

## ✨ Cấu Trúc Dữ Liệu JSON

```json
{
  "id": 1,
  "name": "Tên di sản",
  "address": "Địa chỉ đầy đủ",
  "commune": "Xã/Phường",
  "yearRanked": 2011,
  "rankingType": "Quốc gia đặc biệt",
  "yearBuilt": 1949,
  "information": "Thông tin chi tiết...",
  "notes": "Ghi chú",
  "audioFile": "file.wav",
  "youtubeUrl": "https://youtube.com/...",
  "image": "https://..."
}
```

## 🚀 Cách Kiểm Tra

### Xem tổng số mục
```bash
python3 -c "import json; print(len(json.load(open('src/data/heritages.json'))))"
```

### Đếm mục có audio
```bash
python3 -c "import json; data=json.load(open('src/data/heritages.json')); print(len([x for x in data if x.get('audioFile')]))"
```

### Đếm mục có video
```bash
python3 -c "import json; data=json.load(open('src/data/heritages.json')); print(len([x for x in data if x.get('youtubeUrl') and x['youtubeUrl'].strip()]))"
```

## 📝 TODO - Cần Cải Thiện

### Ưu Tiên Cao
- [ ] Thêm ảnh cho các di sản (0/85 hiện có)
- [ ] Chuẩn hóa loại xếp hạng (có 2 cách viết khác nhau)
- [ ] Bổ sung phân loại cho 33 mục chưa rõ

### Ưu Tiên Trung Bình  
- [ ] Thêm audio cho nhiều di sản hơn (5/85)
- [ ] Quay video giới thiệu (1/85)
- [ ] Thêm tọa độ GPS

### Ưu Tiên Thấp
- [ ] Thêm giờ mở cửa
- [ ] Thêm thông tin liên hệ
- [ ] Thêm giá vé (nếu có)

## 🎨 Các Di Sản Nổi Bật

### Lâu Đời Nhất
1. Phước Đức Cổ Miếu (1810) - 214 năm
2. Chùa KosThum (1832) - 192 năm
3. Đình Tân Long (1852) - 172 năm

### Xếp Hạng Cao Nhất
1. Di tích căn cứ Cái Chanh (Quốc gia đặc biệt)
2. Di tích Khảo cổ Tháp cổ Vĩnh Hưng (Quốc gia đặc biệt)

### Có Đầy Đủ Tính Năng
- Đền thờ Chủ tịch Hồ Chí Minh (có video)
- Di tích căn cứ Cái Chanh (có audio)
- Chùa KosThum (có audio + thông tin chi tiết)

## 🔍 Tìm Kiếm Nhanh

### Tìm theo loại di sản
- Chùa: 20+ mục
- Đền/Miếu: 10+ mục  
- Lễ hội: 6 mục
- Làng nghề: 2 mục

### Tìm theo địa điểm
- Xã Phước Long: nhiều mục
- Xã Ninh Thạnh Lợi: nhiều mục
- Phường Bạc Liêu: nhiều mục

## ⚡ Commands Hữu Ích

```bash
# Xem 5 mục đầu tiên
head -100 src/data/heritages.json

# Tìm tất cả di sản có audio
grep -o '"audioFile": "[^"]*"' src/data/heritages.json

# Đếm số dòng trong file
wc -l src/data/heritages.json

# Backup dữ liệu
cp src/data/heritages.json src/data/heritages_backup_$(date +%Y%m%d).json
```

## 📞 Liên Hệ & Hỗ Trợ

- Xem chi tiết: `DATA_UPDATE_REPORT.md`
- Hướng dẫn đầy đủ: `HUONG_DAN_SU_DUNG.md`
- Danh sách đầy đủ: `DANH_SACH_DI_SAN.txt`

---

**Cập nhật lần cuối**: Hôm nay  
**Tổng số thay đổi**: 4 files mới, 2 files cập nhật  
**Trạng thái**: ✅ Hoàn thành