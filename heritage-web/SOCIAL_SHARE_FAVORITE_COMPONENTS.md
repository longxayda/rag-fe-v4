# SocialShare and FavoriteButton Components - Implementation Summary

## Created Components

### 1. SocialShare Component (`src/components/ui/SocialShare.jsx`)

A social media sharing component with two display modes: compact popup and expanded button list.

**Features:**
- Share to Facebook and Twitter
- Copy link to clipboard functionality
- Compact mode: Popup menu triggered by a share button
- Expanded mode: Full button layout
- Animated transitions using Framer Motion
- Glass-morphism popup design
- Dark mode support

**Props:**
- `url`: URL to share (default: `window.location.href`)
- `title`: Title for sharing (default: 'Di sản văn hóa Cà Mau')
- `description`: Description text (default: '')
- `compact`: Display mode - true for popup, false for button list (default: false)

**Usage Examples:**

```jsx
// Compact mode (popup)
<SocialShare 
  url="https://example.com/heritage/123"
  title="Đình thần Năm Căn"
  compact={true}
/>

// Expanded mode (button list)
<SocialShare 
  url="https://example.com/heritage/123"
  title="Đình thần Năm Căn"
  compact={false}
/>
```

**Dependencies:**
- `lucide-react`: Share2, Facebook, Twitter, Link2, Check, X icons
- `framer-motion`: AnimatePresence, motion components

---

### 2. FavoriteButton Component (`src/components/ui/FavoriteButton.jsx`)

An interactive favorite/like button with heart animation that integrates with the Favorites context.

**Features:**
- Heart icon with fill animation when active
- Scale animation on click
- Three size variants (sm, md, lg)
- Optional text label
- Integration with FavoritesContext
- Heritage theme colors
- Dark mode support

**Props:**
- `heritageId`: ID of the heritage item (required)
- `size`: Button size - 'sm', 'md', or 'lg' (default: 'md')
- `showLabel`: Display text label (default: false)
- `className`: Additional CSS classes (default: '')

**Usage Examples:**

```jsx
// Basic usage
<FavoriteButton heritageId="heritage-123" />

// With label and large size
<FavoriteButton 
  heritageId="heritage-123"
  size="lg"
  showLabel={true}
/>

// Small size with custom styling
<FavoriteButton 
  heritageId="heritage-123"
  size="sm"
  className="absolute top-4 right-4"
/>
```

**Dependencies:**
- `lucide-react`: Heart icon
- `framer-motion`: motion component for animations
- `../../context/FavoritesContext`: useFavorites hook

---

### 3. UI Components Barrel Export (`src/components/ui/index.js`)

A centralized export file for all UI utility components.

**Exported Components:**
```javascript
export { default as GlassCard } from './GlassCard';
export { default as EmptyState } from './EmptyState';
export { default as AnimatedSection } from './AnimatedSection';
export { 
  default as SkeletonLoader,
  SkeletonCard,
  SkeletonList,
  SkeletonDetail,
  SkeletonHero
} from './SkeletonLoader';
export { default as SocialShare } from './SocialShare';
export { default as FavoriteButton } from './FavoriteButton';
```

**Usage:**
```javascript
import { 
  GlassCard, 
  SocialShare, 
  FavoriteButton, 
  EmptyState 
} from '../components/ui';
```

---

## File Structure

```
src/components/ui/
├── AnimatedSection.jsx      # Scroll-triggered animation wrapper
├── EmptyState.jsx           # Empty state component
├── FavoriteButton.jsx       # NEW: Favorite/like button
├── GlassCard.jsx            # Glass-morphism card
├── SkeletonLoader.jsx       # Loading skeleton components
├── SocialShare.jsx          # NEW: Social media sharing
└── index.js                 # Barrel export file
```

---

## Integration Notes

### FavoriteButton Requirements

The FavoriteButton requires the FavoritesContext to be set up. Make sure you have:

1. **FavoritesContext Provider** wrapping your app:
```jsx
import { FavoritesProvider } from './context/FavoritesContext';

<FavoritesProvider>
  <App />
</FavoritesProvider>
```

2. **FavoritesContext Implementation** with these methods:
- `isFavorite(heritageId)`: Check if item is favorited
- `toggleFavorite(heritageId)`: Toggle favorite status

### SocialShare Integration

The SocialShare component works out of the box and doesn't require additional context. It:
- Uses browser's Clipboard API for copy functionality
- Opens share links in new windows
- Handles errors gracefully

---

## Common Use Cases

### Heritage Detail Page
```jsx
import { SocialShare, FavoriteButton } from '../components/ui';

function HeritageDetail({ heritage }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>{heritage.name}</h1>
        <div className="flex gap-2">
          <FavoriteButton heritageId={heritage.id} />
          <SocialShare 
            url={window.location.href}
            title={heritage.name}
            compact={true}
          />
        </div>
      </div>
      {/* ... rest of content ... */}
    </div>
  );
}
```

### Heritage Card
```jsx
import { FavoriteButton } from '../components/ui';

function HeritageCard({ heritage }) {
  return (
    <div className="relative glass-card p-4">
      <FavoriteButton 
        heritageId={heritage.id}
        size="sm"
        className="absolute top-2 right-2"
      />
      {/* ... card content ... */}
    </div>
  );
}
```

---

## Styling Requirements

These components use the heritage theme colors defined in `tailwind.config.js`:

**Required Colors:**
- `heritage-red-*`: Primary red color palette
- `heritage-gold-*`: Gold accent colors

**Required CSS Classes:**
- `.glass-card`: Glass-morphism styling (used in SocialShare popup)

---

## Browser Compatibility

- **Clipboard API**: Modern browsers (Chrome 63+, Firefox 53+, Safari 13.1+)
- **Framer Motion**: All modern browsers with ES6 support
- **Intersection Observer**: Built-in fallback in AnimatedSection

---

## Next Steps

1. **Test Components**: Verify functionality in different browsers
2. **Add to Pages**: Integrate into Heritage detail pages and cards
3. **Context Setup**: Ensure FavoritesContext is properly configured
4. **Accessibility**: Test with screen readers and keyboard navigation
5. **Analytics**: Consider adding tracking for share and favorite actions

---

## Files Created

✅ `src/components/ui/SocialShare.jsx` (142 lines)
✅ `src/components/ui/FavoriteButton.jsx` (64 lines)
✅ `src/components/ui/index.js` (15 lines)

Also copied from heritage-web:
✅ `src/components/ui/GlassCard.jsx`
✅ `src/components/ui/SkeletonLoader.jsx`
✅ `src/components/ui/EmptyState.jsx`
✅ `src/components/ui/AnimatedSection.jsx`

**Total**: 9 component files in `src/components/ui/`

---

## Additional Features

### SocialShare Component Details

**Compact Mode Features:**
- Fixed overlay backdrop (dismisses popup on click)
- Animated popup with scale and fade transitions
- Close button (X icon) in popup header
- Z-index layering (backdrop: z-40, popup: z-50)
- Minimum width of 200px for popup
- Automatic positioning (right-aligned below trigger button)

**Copy Link Feedback:**
- Visual feedback with checkmark icon when copied
- Auto-revert to copy icon after 2 seconds
- Green color for success state
- Console error logging for failures

**Social Platform URLs:**
- **Facebook**: `https://www.facebook.com/sharer/sharer.php?u={url}`
- **Twitter**: `https://twitter.com/intent/tweet?url={url}&text={title}`

### FavoriteButton Component Details

**Animation Sequence:**
1. Click: `scale(0.9)` tap animation
2. Active state: Heart scales `[1, 1.2, 1]` over 0.3s
3. Fill animation: Solid fill when active
4. Color transition: Gray → Heritage Red

**State Management:**
- Uses `useFavorites()` hook from context
- Calls `isFavorite(heritageId)` to check state
- Calls `toggleFavorite(heritageId)` on click
- Event propagation stopped (e.preventDefault, e.stopPropagation)

**Accessibility:**
- Dynamic aria-label based on state
- Keyboard accessible
- Focus visible states
- Screen reader friendly

---

## Theme Integration

These components are designed for the **Ca Mau Heritage** project and use Vietnamese text:

**Vietnamese Text Used:**
- "Chia sẻ" - Share
- "Đã sao chép" - Copied
- "Sao chép" - Copy
- "Yêu thích" - Favorite
- "Đã thích" - Favorited
- "Thêm yêu thích" - Add to favorites
- "Bỏ yêu thích" - Remove from favorites

**Color Scheme:**
- Heritage Red: Primary action color
- Heritage Gold: Accent color
- Glass morphism: Translucent backgrounds with backdrop blur

---

## Performance Considerations

1. **Lazy State Updates**: FavoriteButton only re-renders when favorite state changes
2. **Memoization**: Consider wrapping in React.memo if used in lists
3. **Debouncing**: Copy action includes automatic timeout cleanup
4. **Animation Performance**: Uses GPU-accelerated transforms (scale, opacity)

---

## Error Handling

**SocialShare:**
- Clipboard API failure: Logs error to console, user sees no feedback
- Network errors: Handled by browser when opening share links

**FavoriteButton:**
- Missing context: Will throw error if FavoritesContext not provided
- Invalid heritageId: Context should handle gracefully

---

## Testing Checklist

- [ ] FavoriteButton adds/removes items from favorites
- [ ] FavoriteButton shows correct active/inactive state
- [ ] SocialShare compact mode opens/closes popup
- [ ] SocialShare copy link works and shows feedback
- [ ] Social links open in new tabs with correct URLs
- [ ] Dark mode styling works correctly
- [ ] Mobile responsiveness verified
- [ ] Keyboard navigation works
- [ ] Screen reader announces state changes
- [ ] Animation performance is smooth

---

## Future Enhancements

**Possible additions:**
1. More social platforms (LinkedIn, WhatsApp, Email)
2. Native Web Share API support for mobile
3. Share analytics tracking
4. Custom share message templates
5. Pinterest image pinning support
6. QR code generation for sharing
7. Favorite count display
8. Favorite synchronization across devices

