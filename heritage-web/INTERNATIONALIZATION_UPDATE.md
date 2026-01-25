# Internationalization Update - Vietnamese Hardcoded Strings Removed

## Summary
Successfully internationalized hardcoded Vietnamese strings in three key navigation components. All strings now use the i18n translation system with proper language support for Vietnamese, English, Chinese, and Khmer.

## Files Updated

### 1. Components

#### `/src/components/navigation/Breadcrumb.jsx`
**Changes:**
- ✅ Added `useTranslation` hook import
- ✅ Removed hardcoded `routeNames` object with Vietnamese strings
- ✅ Created `getRouteTranslation()` function to map routes to translation keys
- ✅ All route names now use `t('nav.xxx')` for translations

**Before:**
```javascript
const routeNames = {
  'heritage': 'Di sản',
  'map': 'Bản đồ',
  // ... hardcoded Vietnamese strings
};
```

**After:**
```javascript
const getRouteTranslation = (routeName) => {
  const routeKeyMap = {
    'heritage': 'nav.heritage',
    'map': 'nav.map',
    // ... translation keys
  };
  return routeKeyMap[routeName] ? t(routeKeyMap[routeName]) : routeName;
};
```

#### `/src/components/navigation/MobileNav.jsx`
**Changes:**
- ✅ Added `useTranslation` hook import
- ✅ Moved `navItems` array inside component to access `t()` function
- ✅ Replaced hardcoded labels with `t('nav.xxx')` calls

**Before:**
```javascript
const navItems = [
  { path: '/heritage', icon: BookOpen, label: 'Di sản' },
  // ... hardcoded labels
];
```

**After:**
```javascript
const { t } = useTranslation();
const navItems = [
  { path: '/heritage', icon: BookOpen, label: t('nav.heritage') },
  // ... translated labels
];
```

#### `/src/components/ui/SocialShare.jsx`
**Changes:**
- ✅ Added `useTranslation` hook import
- ✅ Replaced "Chia sẻ" with `t('common.share')`
- ✅ Replaced "Sao chép" with `t('common.copy')`
- ✅ Replaced "Đã sao chép" with `t('common.copied')`

**Before:**
```javascript
<span>Chia sẻ</span>
// ...
Sao chép
// ...
Đã sao chép
```

**After:**
```javascript
<span>{t('common.share')}</span>
// ...
{t('common.copy')}
// ...
{t('common.copied')}
```

### 2. Translation Files

#### All locale files updated with new translation keys:

**Added to `nav` section:**
- `heritage` - Di sản / Heritage / 文化遗产 / បេតិកភណ្ឌ
- `map` - Bản đồ / Map / 地图 / ផែនទី
- `timeline` - Dòng thời gian / Timeline / 时间线 / កាលបរិច្ឆេទ
- `about` - Giới thiệu / About / 关于 / អំពី
- `tts` - Đọc văn bản / Text to Speech / 文字转语音 / អានអត្ថបទ
- `contribute` - Đóng góp / Contribute / 贡献内容 / រួមចំណែក
- `favorites` - Yêu thích / Favorites / 收藏 / សំណព្វ

**Added to `common` section:**
- `share` - Chia sẻ / Share / 分享 / ចែករំលែក
- `copy` - Sao chép / Copy / 复制 / ចម្លង
- `copied` - Đã sao chép / Copied / 已复制 / បានចម្លង

**Files updated:**
- `/src/i18n/locales/vi.json` - Vietnamese translations
- `/src/i18n/locales/en.json` - English translations
- `/src/i18n/locales/zh.json` - Chinese translations
- `/src/i18n/locales/km.json` - Khmer translations

## Benefits

✅ **Multi-language Support**: All components now properly support 4 languages (Vietnamese, English, Chinese, Khmer)

✅ **Maintainability**: Translation changes can be made in one place (locale files) instead of modifying component code

✅ **Consistency**: All navigation labels use the same translation keys across components

✅ **Scalability**: Easy to add new languages by creating new locale files

✅ **User Experience**: Users can switch languages and see all navigation elements in their chosen language

## Testing Recommendations

1. **Test language switching** - Verify all three components update properly when changing language
2. **Test breadcrumb navigation** - Visit different routes and confirm correct translations
3. **Test mobile navigation** - Check mobile view for proper label translations
4. **Test social share** - Verify share button and copy text translations
5. **Test all 4 languages** - Confirm Vietnamese, English, Chinese, and Khmer all display correctly

## Notes

- All existing functionality remains unchanged
- No breaking changes introduced
- Compatible with existing i18n setup
- Translation keys follow established naming conventions

