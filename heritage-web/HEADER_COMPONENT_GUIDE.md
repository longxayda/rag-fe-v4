# Updated Header Component - Visual Guide

## Desktop Layout (≥768px)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                          HEADER (Red gradient)                          ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ [≡] [🏛️ Logo]     [🔍 Search heritage...     ⊗]    [Aa ▾] [🌙] [🌐 🇻🇳 ▾] ┃
┃     Title                                                                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
            └─────────────────┬─────────────────┘
                              │ (typing "chùa")
                              ▼
                    ┏━━━━━━━━━━━━━━━━━━━━━━┓
                    ┃ Autocomplete Results  ┃
                    ┣━━━━━━━━━━━━━━━━━━━━━━┫
                    ┃ 🏛️ Di tích chùa      ┃
                    ┃    KosThum           ┃
                    ┃    [Quốc gia]        ┃
                    ┣━━━━━━━━━━━━━━━━━━━━━━┫
                    ┃ 🏛️ Chùa Xiêm Cán    ┃
                    ┃    [Cấp tỉnh]        ┃
                    ┗━━━━━━━━━━━━━━━━━━━━━━┛
```

## Mobile Layout (<768px)

### Default State
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ [≡] [🏛️] Title  [🔍][🌙][🌐]┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Search Open State
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ [≡] [🏛️] Title  [🔍][🌙][🌐]┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ [🔍 Search...          ⊗]  ┃ ← Expanded search
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 🏛️ Di tích chùa KosThum    ┃ ← Results
┃    [Quốc gia]              ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 🏛️ Chùa Xiêm Cán          ┃
┃    [Cấp tỉnh]              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## Component Structure

```jsx
Header
├── Mobile Menu Button (< lg screens)
├── Logo (Link to home)
│   ├── Landmark Icon
│   └── Title Text
├── Search Bar (≥ md screens)
│   ├── Input Field
│   ├── Search Icon
│   ├── Clear Button (X)
│   └── Autocomplete Dropdown
│       └── Heritage Results (max 5)
├── Controls
│   ├── Search Button (< md screens)
│   ├── Font Size Dropdown
│   ├── Dark Mode Toggle
│   └── Language Dropdown
└── Mobile Search Section (when open)
    ├── Search Input
    └── Results Dropdown
```

## User Interactions

### Desktop Flow
1. User types in center search bar
2. Autocomplete shows matching results instantly
3. User clicks a result → navigates to `/heritage/:id`
4. Or user clicks X to clear search

### Mobile Flow
1. User taps search icon 🔍 in header
2. Search bar expands below header
3. Input auto-focuses
4. User types → autocomplete shows
5. User taps result → navigates to detail page
6. Clicking outside closes search

## Key Features

### Search Behavior
- **Debounced**: Uses React state (naturally debounced by React)
- **Multi-field**: Searches name, address, commune
- **Case-insensitive**: Lowercase comparison
- **Limited results**: Max 5 items shown
- **Click outside**: Closes dropdown automatically

### Navigation
- **Logo click**: Goes to home page (`/`)
- **Result click**: Goes to `/heritage/:id`
- **Uses React Router**: `Link` and `useNavigate`

### Responsive Breakpoints
- **Mobile**: < 768px (md)
  - Search button visible
  - Search expands below header
- **Desktop**: ≥ 768px (md)
  - Search bar in header
  - Autocomplete dropdown

### Styling Features
- Glassmorphism: `bg-white/10 backdrop-blur-sm`
- Border: `border-white/20`
- Hover states: `hover:bg-white/20`
- Dark mode: `dark:bg-gray-800`
- Animations: `animate-fade-in`

## Code Examples

### Using the Search
```jsx
// Search input in Header.jsx
<input
  type="text"
  value={searchQuery}
  onChange={handleSearchChange}
  placeholder={t('search.placeholder')}
  className="w-full px-4 py-2..."
/>
```

### Navigation on Select
```jsx
const handleSearchSelect = (item) => {
  navigate(`/heritage/${item.id}`);
  setSearchQuery('');
  setIsSearchOpen(false);
};
```

### Data Combination
```jsx
const allData = useMemo(() => [
  ...heritageData.map(item => ({ ...item, dataType: 'heritage' })),
  ...PEOPLE_DATA.map(item => ({ ...item, dataType: 'people' })),
  ...FESTIVAL_DATA.map(item => ({ ...item, dataType: 'festival' }))
], []);
```

## Translations

The component uses `t('search.placeholder')` which maps to:
- Vietnamese: "Tìm kiếm di sản..."
- English: "Search heritage..."
- Chinese: "搜索遗产..."
- Khmer: "ស្វែងរកបេតិកភណ្ឌ..."

All translation files have been updated in `src/i18n/locales/*.json`

