// Content Translation Utility
// Helps display content in multiple languages

import i18n from 'i18next';

// Get current language
export const getCurrentLanguage = () => {
  return i18n.language || 'vi';
};

// Get localized content from an object with language keys
export const getLocalizedContent = (contentObj, field, fallbackLang = 'vi') => {
  const currentLang = getCurrentLanguage();

  if (!contentObj) return '';

  // If content has language-specific fields
  if (contentObj[currentLang] && contentObj[currentLang][field]) {
    return contentObj[currentLang][field];
  }

  // Fallback to Vietnamese
  if (contentObj[fallbackLang] && contentObj[fallbackLang][field]) {
    return contentObj[fallbackLang][field];
  }

  // Direct field access (for non-translated content)
  if (contentObj[field]) {
    return contentObj[field];
  }

  return '';
};

// Ranking type translations
export const RANKING_TYPES = {
  vi: {
    'Quốc gia đặc biệt': 'Quốc gia đặc biệt',
    'Quốc gia': 'Quốc gia',
    'Cấp tỉnh': 'Cấp tỉnh'
  },
  en: {
    'Quốc gia đặc biệt': 'Special National',
    'Quốc gia': 'National',
    'Cấp tỉnh': 'Provincial'
  },
  zh: {
    'Quốc gia đặc biệt': '国家特别级',
    'Quốc gia': '国家级',
    'Cấp tỉnh': '省级'
  },
  km: {
    'Quốc gia đặc biệt': 'ជាតិពិសេស',
    'Quốc gia': 'ជាតិ',
    'Cấp tỉnh': 'ខេត្ត'
  }
};

// Get translated ranking type
export const getTranslatedRankingType = (rankingType) => {
  const currentLang = getCurrentLanguage();
  const translations = RANKING_TYPES[currentLang] || RANKING_TYPES['vi'];
  return translations[rankingType] || rankingType;
};

// Common location translations
export const LOCATION_TRANSLATIONS = {
  vi: {
    'Xã': 'Xã',
    'Phường': 'Phường',
    'Huyện': 'Huyện',
    'Thành phố': 'Thành phố',
    'Tỉnh': 'Tỉnh',
    'Ấp': 'Ấp'
  },
  en: {
    'Xã': 'Commune',
    'Phường': 'Ward',
    'Huyện': 'District',
    'Thành phố': 'City',
    'Tỉnh': 'Province',
    'Ấp': 'Hamlet'
  },
  zh: {
    'Xã': '社',
    'Phường': '坊',
    'Huyện': '县',
    'Thành phố': '市',
    'Tỉnh': '省',
    'Ấp': '村'
  },
  km: {
    'Xã': 'ឃុំ',
    'Phường': 'សង្កាត់',
    'Huyện': 'ស្រុក',
    'Thành phố': 'ទីក្រុង',
    'Tỉnh': 'ខេត្ត',
    'Ấp': 'ភូមិ'
  }
};

// Translate location prefix
export const translateLocationPrefix = (text) => {
  if (!text) return '';

  const currentLang = getCurrentLanguage();
  const translations = LOCATION_TRANSLATIONS[currentLang] || LOCATION_TRANSLATIONS['vi'];

  let translatedText = text;
  Object.keys(LOCATION_TRANSLATIONS['vi']).forEach(viKey => {
    if (text.includes(viKey)) {
      translatedText = translatedText.replace(viKey, translations[viKey]);
    }
  });

  return translatedText;
};

// Heritage type translations
export const HERITAGE_TYPES = {
  vi: {
    'heritage': 'Di sản',
    'people': 'Nhân vật',
    'festival': 'Lễ hội'
  },
  en: {
    'heritage': 'Heritage',
    'people': 'Historical Figure',
    'festival': 'Festival'
  },
  zh: {
    'heritage': '遗产',
    'people': '人物',
    'festival': '节日'
  },
  km: {
    'heritage': 'បេតិកភណ្ឌ',
    'people': 'បុគ្គល',
    'festival': 'បុណ្យ'
  }
};

// Get translated heritage type
export const getTranslatedHeritageType = (type) => {
  const currentLang = getCurrentLanguage();
  const translations = HERITAGE_TYPES[currentLang] || HERITAGE_TYPES['vi'];
  return translations[type] || type;
};

// Notes/Category translations for heritage items
export const NOTES_TRANSLATIONS = {
  vi: {
    'Di tích Quốc gia Đặc biệt': 'Di tích Quốc gia Đặc biệt',
    'Di tích Lịch sử - Văn hóa cấp Tỉnh': 'Di tích Lịch sử - Văn hóa cấp Tỉnh',
    'Di tích Lịch sử - Văn hóa cấp Quốc gia': 'Di tích Lịch sử - Văn hóa cấp Quốc gia',
    'Di sản Văn hóa Phi vật thể (Làng nghề)': 'Di sản Văn hóa Phi vật thể (Làng nghề)',
    'Công trình văn hóa': 'Công trình văn hóa',
    'Công trình lịch sử': 'Công trình lịch sử',
    'Khu tưởng niệm': 'Khu tưởng niệm',
    'Khu du lịch sinh thái': 'Khu du lịch sinh thái'
  },
  en: {
    'Di tích Quốc gia Đặc biệt': 'Special National Historical Site',
    'Di tích Lịch sử - Văn hóa cấp Tỉnh': 'Provincial Historical-Cultural Site',
    'Di tích Lịch sử - Văn hóa cấp Quốc gia': 'National Historical-Cultural Site',
    'Di sản Văn hóa Phi vật thể (Làng nghề)': 'Intangible Cultural Heritage (Craft Village)',
    'Công trình văn hóa': 'Cultural Monument',
    'Công trình lịch sử': 'Historical Monument',
    'Khu tưởng niệm': 'Memorial Site',
    'Khu du lịch sinh thái': 'Ecotourism Site'
  },
  zh: {
    'Di tích Quốc gia Đặc biệt': '国家特别历史遗迹',
    'Di tích Lịch sử - Văn hóa cấp Tỉnh': '省级历史文化遗迹',
    'Di tích Lịch sử - Văn hóa cấp Quốc gia': '国家级历史文化遗迹',
    'Di sản Văn hóa Phi vật thể (Làng nghề)': '非物质文化遗产（手工艺村）',
    'Công trình văn hóa': '文化建筑',
    'Công trình lịch sử': '历史建筑',
    'Khu tưởng niệm': '纪念区',
    'Khu du lịch sinh thái': '生态旅游区'
  },
  km: {
    'Di tích Quốc gia Đặc biệt': 'តំបន់ប្រវត្តិសាស្ត្រជាតិពិសេស',
    'Di tích Lịch sử - Văn hóa cấp Tỉnh': 'តំបន់ប្រវត្តិសាស្ត្រវប្បធម៌ថ្នាក់ខេត្ត',
    'Di tích Lịch sử - Văn hóa cấp Quốc gia': 'តំបន់ប្រវត្តិសាស្ត្រវប្បធម៌ថ្នាក់ជាតិ',
    'Di sản Văn hóa Phi vật thể (Làng nghề)': 'បេតិកភណ្ឌវប្បធម៌អរូបី',
    'Công trình văn hóa': 'សំណង់វប្បធម៌',
    'Công trình lịch sử': 'សំណង់ប្រវត្តិសាស្ត្រ',
    'Khu tưởng niệm': 'តំបន់រំឭក',
    'Khu du lịch sinh thái': 'តំបន់ទេសចរណ៍បរិស្ថាន'
  }
};

// Get translated notes
export const getTranslatedNotes = (notes) => {
  if (!notes) return '';
  const currentLang = getCurrentLanguage();
  const translations = NOTES_TRANSLATIONS[currentLang] || NOTES_TRANSLATIONS['vi'];
  return translations[notes] || notes;
};

// Format year with translation
export const formatYear = (year, type = 'built') => {
  if (!year) return '';

  const currentLang = getCurrentLanguage();
  const labels = {
    vi: { built: 'Năm xây dựng', ranked: 'Năm xếp hạng' },
    en: { built: 'Year built', ranked: 'Year ranked' },
    zh: { built: '建造年份', ranked: '评级年份' },
    km: { built: 'ឆ្នាំសាងសង់', ranked: 'ឆ្នាំចាត់ថ្នាក់' }
  };

  const label = labels[currentLang]?.[type] || labels['vi'][type];
  return `${label}: ${year}`;
};

// Common UI labels
export const UI_LABELS = {
  vi: {
    readMore: 'Đọc thêm',
    viewDetails: 'Xem chi tiết',
    address: 'Địa chỉ',
    yearBuilt: 'Năm xây dựng',
    yearRanked: 'Năm xếp hạng',
    rankingType: 'Loại xếp hạng',
    information: 'Thông tin',
    listenAudio: 'Nghe audio',
    noData: 'Không có dữ liệu'
  },
  en: {
    readMore: 'Read more',
    viewDetails: 'View details',
    address: 'Address',
    yearBuilt: 'Year built',
    yearRanked: 'Year ranked',
    rankingType: 'Ranking type',
    information: 'Information',
    listenAudio: 'Listen audio',
    noData: 'No data'
  },
  zh: {
    readMore: '阅读更多',
    viewDetails: '查看详情',
    address: '地址',
    yearBuilt: '建造年份',
    yearRanked: '评级年份',
    rankingType: '评级类型',
    information: '信息',
    listenAudio: '收听音频',
    noData: '无数据'
  },
  km: {
    readMore: 'អានបន្ថែម',
    viewDetails: 'មើលព័ត៌មានលម្អិត',
    address: 'អាសយដ្ឋាន',
    yearBuilt: 'ឆ្នាំសាងសង់',
    yearRanked: 'ឆ្នាំចាត់ថ្នាក់',
    rankingType: 'ប្រភេទចាត់ថ្នាក់',
    information: 'ព័ត៌មាន',
    listenAudio: 'ស្តាប់សំឡេង',
    noData: 'គ្មានទិន្នន័យ'
  }
};

// Get UI label
export const getUILabel = (key) => {
  const currentLang = getCurrentLanguage();
  const labels = UI_LABELS[currentLang] || UI_LABELS['vi'];
  return labels[key] || key;
};

export default {
  getCurrentLanguage,
  getLocalizedContent,
  getTranslatedRankingType,
  translateLocationPrefix,
  getTranslatedHeritageType,
  getTranslatedNotes,
  formatYear,
  getUILabel
};
