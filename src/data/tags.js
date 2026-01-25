// Tags data for Local Education System
// Categories: heritage, people, festival, location, period, topic

export const TAG_CATEGORIES = [
  { id: 'heritage', name: 'Di sản', nameEn: 'Heritage', color: 'red' },
  { id: 'people', name: 'Nhân vật', nameEn: 'People', color: 'gold' },
  { id: 'festival', name: 'Lễ hội', nameEn: 'Festival', color: 'green' },
  { id: 'location', name: 'Địa điểm', nameEn: 'Location', color: 'blue' },
  { id: 'period', name: 'Thời kỳ', nameEn: 'Period', color: 'purple' },
  { id: 'topic', name: 'Chủ đề', nameEn: 'Topic', color: 'orange' },
];

export const TAGS_DATA = [
  // Heritage tags
  { id: 1, name: 'Di tích lịch sử', nameEn: 'Historical Site', category: 'heritage', color: '#dc2626' },
  { id: 2, name: 'Di tích văn hóa', nameEn: 'Cultural Site', category: 'heritage', color: '#b91c1c' },
  { id: 3, name: 'Quốc gia đặc biệt', nameEn: 'National Special', category: 'heritage', color: '#991b1b' },
  { id: 4, name: 'Cấp quốc gia', nameEn: 'National Level', category: 'heritage', color: '#7f1d1d' },
  { id: 5, name: 'Cấp tỉnh', nameEn: 'Provincial Level', category: 'heritage', color: '#ef4444' },
  { id: 6, name: 'Chùa', nameEn: 'Temple', category: 'heritage', color: '#f87171' },
  { id: 7, name: 'Đền thờ', nameEn: 'Shrine', category: 'heritage', color: '#fca5a5' },
  { id: 8, name: 'Làng nghề', nameEn: 'Craft Village', category: 'heritage', color: '#fecaca' },

  // People tags
  { id: 9, name: 'Anh hùng dân tộc', nameEn: 'National Hero', category: 'people', color: '#d97706' },
  { id: 10, name: 'Nhà cách mạng', nameEn: 'Revolutionary', category: 'people', color: '#b45309' },
  { id: 11, name: 'Danh nhân văn hóa', nameEn: 'Cultural Figure', category: 'people', color: '#92400e' },
  { id: 12, name: 'Nghệ nhân', nameEn: 'Artisan', category: 'people', color: '#78350f' },
  { id: 13, name: 'Nhà giáo', nameEn: 'Educator', category: 'people', color: '#f59e0b' },
  { id: 14, name: 'Nhà khoa học', nameEn: 'Scientist', category: 'people', color: '#fbbf24' },

  // Festival tags
  { id: 15, name: 'Lễ hội truyền thống', nameEn: 'Traditional Festival', category: 'festival', color: '#16a34a' },
  { id: 16, name: 'Lễ hội dân gian', nameEn: 'Folk Festival', category: 'festival', color: '#15803d' },
  { id: 17, name: 'Lễ hội tôn giáo', nameEn: 'Religious Festival', category: 'festival', color: '#166534' },
  { id: 18, name: 'Lễ hội Khmer', nameEn: 'Khmer Festival', category: 'festival', color: '#14532d' },
  { id: 19, name: 'Tết Nguyên đán', nameEn: 'Lunar New Year', category: 'festival', color: '#22c55e' },
  { id: 20, name: 'Lễ Oóc Om Bóc', nameEn: 'Ooc Om Boc Festival', category: 'festival', color: '#4ade80' },

  // Location tags
  { id: 21, name: 'Thành phố Cà Mau', nameEn: 'Ca Mau City', category: 'location', color: '#2563eb' },
  { id: 22, name: 'Huyện Năm Căn', nameEn: 'Nam Can District', category: 'location', color: '#1d4ed8' },
  { id: 23, name: 'Huyện Ngọc Hiển', nameEn: 'Ngoc Hien District', category: 'location', color: '#1e40af' },
  { id: 24, name: 'Huyện Đầm Dơi', nameEn: 'Dam Doi District', category: 'location', color: '#1e3a8a' },
  { id: 25, name: 'Huyện Cái Nước', nameEn: 'Cai Nuoc District', category: 'location', color: '#3b82f6' },
  { id: 26, name: 'Huyện Trần Văn Thời', nameEn: 'Tran Van Thoi District', category: 'location', color: '#60a5fa' },
  { id: 27, name: 'Huyện U Minh', nameEn: 'U Minh District', category: 'location', color: '#93c5fd' },
  { id: 28, name: 'Huyện Thới Bình', nameEn: 'Thoi Binh District', category: 'location', color: '#bfdbfe' },
  { id: 29, name: 'Huyện Phú Tân', nameEn: 'Phu Tan District', category: 'location', color: '#dbeafe' },

  // Period tags
  { id: 30, name: 'Thời kỳ Pháp thuộc', nameEn: 'French Colonial Period', category: 'period', color: '#9333ea' },
  { id: 31, name: 'Kháng chiến chống Pháp', nameEn: 'Anti-French Resistance', category: 'period', color: '#7e22ce' },
  { id: 32, name: 'Kháng chiến chống Mỹ', nameEn: 'Anti-American Resistance', category: 'period', color: '#6b21a8' },
  { id: 33, name: 'Thời kỳ phong kiến', nameEn: 'Feudal Period', category: 'period', color: '#581c87' },
  { id: 34, name: 'Thời kỳ hiện đại', nameEn: 'Modern Period', category: 'period', color: '#a855f7' },
  { id: 35, name: 'Triều Nguyễn', nameEn: 'Nguyen Dynasty', category: 'period', color: '#c084fc' },

  // Topic tags
  { id: 36, name: 'Lịch sử địa phương', nameEn: 'Local History', category: 'topic', color: '#ea580c' },
  { id: 37, name: 'Văn hóa dân gian', nameEn: 'Folk Culture', category: 'topic', color: '#c2410c' },
  { id: 38, name: 'Địa lý tự nhiên', nameEn: 'Natural Geography', category: 'topic', color: '#9a3412' },
  { id: 39, name: 'Kinh tế địa phương', nameEn: 'Local Economy', category: 'topic', color: '#7c2d12' },
  { id: 40, name: 'Văn hóa Khmer', nameEn: 'Khmer Culture', category: 'topic', color: '#f97316' },
  { id: 41, name: 'Văn hóa Hoa', nameEn: 'Chinese Culture', category: 'topic', color: '#fb923c' },
  { id: 42, name: 'Sinh thái rừng ngập mặn', nameEn: 'Mangrove Ecology', category: 'topic', color: '#fdba74' },
  { id: 43, name: 'Nghề truyền thống', nameEn: 'Traditional Crafts', category: 'topic', color: '#fed7aa' },
  { id: 44, name: 'Ẩm thực địa phương', nameEn: 'Local Cuisine', category: 'topic', color: '#ffedd5' },
  { id: 45, name: 'Giáo dục', nameEn: 'Education', category: 'topic', color: '#fb7185' },
];

// Helper function to get tags by category
export const getTagsByCategory = (category) => {
  return TAGS_DATA.filter(tag => tag.category === category);
};

// Helper function to get tag by ID
export const getTagById = (id) => {
  return TAGS_DATA.find(tag => tag.id === id);
};

// Helper function to get category info
export const getCategoryInfo = (categoryId) => {
  return TAG_CATEGORIES.find(cat => cat.id === categoryId);
};

// Helper function to search tags
export const searchTags = (query) => {
  const lowerQuery = query.toLowerCase();
  return TAGS_DATA.filter(tag =>
    tag.name.toLowerCase().includes(lowerQuery) ||
    tag.nameEn.toLowerCase().includes(lowerQuery)
  );
};

export default TAGS_DATA;
