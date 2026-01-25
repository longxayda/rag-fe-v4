# 📝 BÁO CÁO FORMAT MARKDOWN CHO DI SẢN

## ✅ Hoàn Thành

Đã thêm format markdown cho **82/85 di sản** trong file `heritages.json`

## 🎨 Format Đã Thêm

### 1. Tiêu Đề Chính (##)
- Các section lớn với chữ in hoa
- Ví dụ: `## **LỊCH SỬ HÌNH THÀNH**`

### 2. Tiêu Đề Phụ (###)
- Các phần con, subsection
- Ví dụ: `### **Kiến trúc:**`, `### **Giá trị lịch sử:**`

### 3. In Đậm Inline (**)
Các từ khóa quan trọng được in đậm:
- **Quốc gia đặc biệt**, **Quốc gia**, **Cấp tỉnh**
- **Di tích**, **Lễ hội**, **Chùa**, **Đền**, **Miếu**, **Đình**
- **Năm XXXX** (các năm lịch sử)
- **Tổng quan**, **Lịch sử**, **Kiến trúc**, **Giá trị**, **Ý nghĩa**, **Kết luận**

### 4. Ngắt Đoạn
- Tự động thêm line breaks giữa các đoạn
- Dễ đọc hơn trên web

## 📊 Thống Kê

| Chỉ Số | Số Lượng |
|--------|----------|
| Tổng di sản | 85 |
| Đã format | 82 |
| Chưa format | 3 |
| Tỷ lệ | 96.5% |

## 💡 Lợi Ích

### Cho Người Dùng
- ✅ Dễ đọc hơn với tiêu đề rõ ràng
- ✅ Từ khóa nổi bật, dễ tìm
- ✅ Cấu trúc rõ ràng

### Cho Quản Trị
- ✅ Có thể chỉnh sửa markdown trực tiếp
- ✅ Format chuẩn, dễ maintain
- ✅ Tương thích với markdown editor

## 📝 Cách Chỉnh Sửa Sau Này

### Sửa Tiêu Đề
```json
{
  "information": "## **TIÊU ĐỀ CHÍNH MỚI**\n\nNội dung..."
}
```

### Thêm In Đậm
```json
{
  "information": "Đây là **từ khóa quan trọng** trong văn bản"
}
```

### Thêm Tiêu Đề Phụ
```json
{
  "information": "### **Phần mới:**\n\nNội dung phần mới..."
}
```

## 🛠️ Script Sử Dụng

File: `scripts/format_markdown.py`

### Chạy Lại
```bash
python3 scripts/format_markdown.py src/data/heritages.json
```

### Backup Trước Khi Format
```bash
cp src/data/heritages.json src/data/heritages_backup_$(date +%Y%m%d).json
python3 scripts/format_markdown.py src/data/heritages.json
```

## 🚀 Deploy

Sau khi format, cần deploy để áp dụng:

```bash
# Sync files
sshpass -p 'PASSWORD' rsync -avz --exclude 'node_modules' \
  ~/Documents/rag-fe/ \
  root@36.50.26.18:/root/heritage-web/

# Restart server
ssh root@36.50.26.18 "cd /root/heritage-web && pkill -f vite && npm run dev -- --host 0.0.0.0 --port 4173 &"
```

## 📖 Ví Dụ Trước/Sau

### Trước Format
```
Di tích căn cứ Cái Chanh
Lịch sử hình thành
Căn cứ Cái Chanh là địa điểm...
```

### Sau Format
```
## **Di tích căn cứ Cái Chanh**

### **Lịch sử hình thành:**

Căn cứ Cái Chanh là địa điểm quan trọng trong **kháng chiến**...
```

## ✨ Kết Quả

- ✅ 82/85 di sản đã có markdown format
- ✅ Dễ đọc và dễ chỉnh sửa
- ✅ Tương thích với các markdown editor
- ✅ Sẵn sàng để deploy

---

**Ngày format**: Hôm nay  
**Script**: `scripts/format_markdown.py`  
**Trạng thái**: ✅ Hoàn thành
