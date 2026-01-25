# Quick Reference: SocialShare & FavoriteButton

## Import
```jsx
import { SocialShare, FavoriteButton } from './components/ui';
```

## SocialShare

### Compact Mode (Popup)
```jsx
<SocialShare 
  url={window.location.href}
  title="Di sản văn hóa Cà Mau"
  compact={true}
/>
```

### Expanded Mode (Buttons)
```jsx
<SocialShare 
  url="https://example.com"
  title="Heritage Site"
  description="Amazing heritage site"
  compact={false}
/>
```

### Props
- `url` - URL to share (default: current page)
- `title` - Title for sharing (default: 'Di sản văn hóa Cà Mau')
- `description` - Description text (default: '')
- `compact` - Display mode (default: false)

---

## FavoriteButton

### Basic Usage
```jsx
<FavoriteButton heritageId="heritage-123" />
```

### With Label
```jsx
<FavoriteButton 
  heritageId="heritage-123"
  showLabel={true}
/>
```

### Sizes & Custom Styling
```jsx
{/* Small */}
<FavoriteButton heritageId="123" size="sm" />

{/* Medium (default) */}
<FavoriteButton heritageId="123" size="md" />

{/* Large */}
<FavoriteButton heritageId="123" size="lg" />

{/* With custom class */}
<FavoriteButton 
  heritageId="123" 
  className="absolute top-4 right-4"
/>
```

### Props
- `heritageId` - **Required** - Heritage item ID
- `size` - Button size: 'sm', 'md', 'lg' (default: 'md')
- `showLabel` - Show text label (default: false)
- `className` - Additional CSS classes (default: '')

---

## Common Patterns

### Heritage Detail Header
```jsx
<div className="flex justify-between items-center">
  <h1>{heritage.name}</h1>
  <div className="flex gap-2">
    <FavoriteButton heritageId={heritage.id} />
    <SocialShare compact={true} />
  </div>
</div>
```

### Card Overlay
```jsx
<div className="relative glass-card">
  <FavoriteButton 
    heritageId={heritage.id}
    size="sm"
    className="absolute top-2 right-2 z-10"
  />
  {/* card content */}
</div>
```

### Mobile Floating Actions
```jsx
<div className="absolute top-4 right-4 flex flex-col gap-2">
  <FavoriteButton heritageId={heritage.id} />
  <SocialShare compact={true} />
</div>
```

---

## Required Setup

### FavoriteButton Context
```jsx
// App.jsx or main entry
import { FavoritesProvider } from './context/FavoritesContext';

<FavoritesProvider>
  <App />
</FavoritesProvider>
```

---

## Files Location
```
src/components/ui/
├── SocialShare.jsx       # Social sharing component
├── FavoriteButton.jsx    # Favorite button component
└── index.js              # Exports all UI components
```

---

## Dependencies
- `framer-motion` - Animations
- `lucide-react` - Icons
- `FavoritesContext` - Only for FavoriteButton

---

## Features
✅ Dark mode support
✅ Responsive design
✅ Smooth animations
✅ Accessibility (ARIA labels)
✅ Vietnamese text
✅ Heritage theme colors

