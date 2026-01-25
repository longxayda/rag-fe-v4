# Filter System - Quick Reference

## Filter Categories

### 1. Loại hình (Type Filter)
```
Tất cả loại hình (All Types)
├── Di sản (Heritage)
├── Di tích (Historical Site)
├── Ẩm thực (Cuisine)
├── Âm nhạc (Music)
├── Mỹ thuật (Fine Arts)
├── Văn học (Literature)
└── Địa lý (Geography)
```

### 2. Cấp độ xếp hạng (Ranking Filter)
```
○ Tất cả cấp độ (All Levels)
○ Quốc gia đặc biệt (National Special)
○ Quốc gia (National)
○ Cấp tỉnh (Provincial)
```

### 3. Xã/Phường (Commune Filter)
```
All 64 administrative units from communes.js:
- 55 Xã (Communes)
- 9 Phường (Wards)

Examples:
├── Xã Tân Thuận
├── Xã Ninh Thạnh Lợi
├── Phường Bạc Liêu
├── Phường Vĩnh Trạch
└── ... (60 more)
```

### 4. Sắp xếp theo (Sort Options)
```
├── Tên A-Z (Name Ascending)
├── Tên Z-A (Name Descending)
└── Cấp độ (By Ranking)
```

## Category Mapping Logic

Heritage items are automatically categorized based on their `notes` field:

```javascript
Notes Field Content          →  Category
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Di tích Quốc gia Đặc biệt"  →  historical-site
"Di tích Lịch sử"            →  historical-site
"Ẩm thực Việt Nam"           →  cuisine
"Âm nhạc truyền thống"       →  music
"Mỹ thuật đương đại"         →  fine-arts
"Văn học cổ điển"            →  literature
"Địa lý văn hóa"             →  geography
Default (no match)           →  heritage
```

## i18n Keys Reference

### Vietnamese (vi)
```json
"heritage.typeFilter": "Loại hình"
"heritage.heritageType": "Di sản"
"heritage.historicalSiteType": "Di tích"
"heritage.cuisineType": "Ẩm thực"
"heritage.musicType": "Âm nhạc"
"heritage.fineArtsType": "Mỹ thuật"
"heritage.literatureType": "Văn học"
"heritage.geographyType": "Địa lý"
"heritage.rankingFilter": "Cấp độ xếp hạng"
"heritage.communeFilter": "Xã/Phường"
"heritage.sortBy": "Sắp xếp theo"
```

### English (en)
```json
"heritage.typeFilter": "Category"
"heritage.heritageType": "Heritage"
"heritage.historicalSiteType": "Historical Site"
"heritage.cuisineType": "Cuisine"
"heritage.musicType": "Music"
"heritage.fineArtsType": "Fine Arts"
"heritage.literatureType": "Literature"
"heritage.geographyType": "Geography"
```

## Usage Example

```javascript
// In FilterPanel component
const { t } = useTranslation();
const typeOptions = getTypeOptions(t);
const allCommunes = COMMUNES; // All 64 units

// In HeritageList component
const categorizeHeritageType = (notes) => {
  if (notesLower.includes('di tích')) return 'historical-site';
  // ... other mappings
  return 'heritage';
};

// Filter logic
const matchesType = itemCategory === filters.type;
const matchesRanking = item.rankingType === filters.ranking;
const matchesCommune = itemCommune === filters.commune;
```

## Filter Behavior

1. **Type Filter**: Applies to heritage items only, categorized by notes
2. **Ranking Filter**: Works for all items with rankingType field
3. **Commune Filter**: Shows all 64 units, filters by exact or partial match
4. **Sort**: Applies to filtered results (name or ranking)

All filters work together with AND logic.

