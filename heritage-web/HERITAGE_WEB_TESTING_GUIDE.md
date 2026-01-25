# Testing Guide - Heritage Web Project

## 🧪 Testing Your Implementation

This guide helps you verify that all created files work correctly.

---

## ✅ Pre-Testing Checklist

### 1. Install Dependencies
```bash
cd heritage-web

# Install required packages
npm install react react-dom react-router-dom
npm install framer-motion
npm install leaflet react-leaflet
npm install tailwindcss postcss autoprefixer

# If not already installed
npm install
```

### 2. Add Leaflet CSS
Add to your `index.html` or main CSS file:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
```

Or in your main CSS/component:
```jsx
import 'leaflet/dist/leaflet.css';
```

---

## 🧭 Test 1: HomePage

### Steps:
1. Navigate to `/` route
2. Verify HeroSection displays
3. Check featured heritage items load
4. Test statistics counters animate
5. Click on quick access cards

### Expected Results:
- ✅ Hero section with gradient background
- ✅ "Khám Phá Di Sản Văn Hóa Việt Nam" heading
- ✅ 4 statistics boxes with animated numbers
- ✅ Featured heritage grid (3 items)
- ✅ 6 quick access cards
- ✅ All buttons are clickable
- ✅ Smooth animations on page load

### Test Commands:
```jsx
// In your router test
<Route path="/" element={<HomePage />} />
```

### Visual Checks:
- [ ] Hero section fills viewport
- [ ] Text is readable on dark background
- [ ] Images load properly
- [ ] Hover effects work on cards
- [ ] Mobile responsive (< 768px)
- [ ] Dark mode toggle works

---

## 🗺️ Test 2: MapPage

### Steps:
1. Navigate to `/map`
2. Verify map loads with markers
3. Test filter sidebar
4. Click on markers
5. Try filtering by category
6. Test search functionality

### Expected Results:
- ✅ Interactive map displays
- ✅ Heritage markers visible
- ✅ Sidebar with filters
- ✅ Marker popups show on click
- ✅ Filters update markers
- ✅ Map centers on selected heritage

### Test Commands:
```jsx
<Route path="/map" element={<MapPage />} />
```

### Visual Checks:
- [ ] Map tiles load correctly
- [ ] Markers have custom icons
- [ ] Popup shows image and details
- [ ] Filter panel is functional
- [ ] Search updates results
- [ ] Mobile: sidebar is scrollable

### Common Issues:
**Map not showing?**
```javascript
// Make sure container has height
.leaflet-container {
  height: 100%;
  width: 100%;
}
```

**Markers not appearing?**
- Check if coordinates are valid (lat, lng)
- Verify marker icon paths
- Check console for Leaflet errors

---

## ℹ️ Test 3: AboutPage

### Steps:
1. Navigate to `/about`
2. Scroll through sections
3. Check animations trigger
4. Test responsive layout

### Expected Results:
- ✅ Mission section displays
- ✅ Vision cards (4 boxes) with icons
- ✅ Contact information visible
- ✅ Smooth fade-in animations
- ✅ Responsive grid layout

### Visual Checks:
- [ ] Content is centered
- [ ] Icons display correctly (📚, 🌍, 🔬, 🎯)
- [ ] Cards have colored backgrounds
- [ ] Text is readable
- [ ] Mobile: single column layout

---

## ❤️ Test 4: FavoritesPage

### Steps:
1. Add items to favorites (from other pages)
2. Navigate to `/favorites`
3. Verify favorites display
4. Test remove functionality
5. Clear all favorites
6. Check empty state

### Expected Results:
- ✅ Favorites load from localStorage
- ✅ Items display in BentoGrid
- ✅ Remove button works
- ✅ Empty state shows when no favorites
- ✅ "Khám phá di sản" link works

### Test Commands:
```javascript
// Manually add to favorites for testing
localStorage.setItem('heritage_favorites', JSON.stringify([
  {
    id: '1',
    name: 'Test Heritage',
    category: 'Di tích lịch sử',
    image: '/placeholder.jpg',
    description: 'Test description'
  }
]));

// Refresh page and check /favorites
```

### Visual Checks:
- [ ] Grid layout (varied card sizes)
- [ ] Remove button visible on hover
- [ ] Empty state icon and message
- [ ] Count shows correct number
- [ ] Dark mode works

---

## 📖 Test 5: HeritageDetailPage

### Steps:
1. Navigate to `/heritage/1` (or any ID)
2. Check hero image and title
3. Test favorite button
4. Test social share dropdown
5. Verify breadcrumb navigation
6. Check sidebar information

### Expected Results:
- ✅ Hero image with overlay
- ✅ Heritage name and category
- ✅ Favorite button toggles
- ✅ Social share opens dropdown
- ✅ Breadcrumb shows correct path
- ✅ Sidebar has metadata
- ✅ Content sections display

### Test with URL:
```jsx
<Route path="/heritage/:id" element={<HeritageDetailPage />} />

// Test URLs:
// /heritage/1
// /heritage/test-heritage
// /heritage/999 (should show "not found")
```

### Visual Checks:
- [ ] Hero image is full width
- [ ] Title overlays image
- [ ] Favorite button animates
- [ ] Share dropdown appears
- [ ] Breadcrumb is clickable
- [ ] Two-column layout on desktop
- [ ] Single column on mobile

---

## 🧩 Test 6: Individual Components

### BentoGrid Component
```jsx
import { BentoGrid } from './components/heritage';

const testItems = [
  { id: '1', name: 'Item 1', category: 'Test', image: '/img1.jpg' },
  { id: '2', name: 'Item 2', category: 'Test', image: '/img2.jpg' },
  // ... more items
];

<BentoGrid
  items={testItems}
  onRemoveFavorite={(id) => console.log('Remove:', id)}
  showRemoveButton={true}
/>
```

**Expected:**
- [ ] Grid with varied sizes
- [ ] Images load
- [ ] Hover effects work
- [ ] Click navigates to detail
- [ ] Remove button works

---

### FilterPanel Component
```jsx
import { FilterPanel } from './components/heritage';

const [filters, setFilters] = useState({
  category: 'all',
  region: 'all',
  searchQuery: ''
});

<FilterPanel
  filters={filters}
  onFilterChange={(f) => {
    console.log('New filters:', f);
    setFilters({ ...filters, ...f });
  }}
/>
```

**Expected:**
- [ ] All filter options visible
- [ ] Category buttons toggle
- [ ] Search input updates
- [ ] Region dropdown works
- [ ] Reset button clears all

---

### SocialShare Component
```jsx
import { SocialShare } from './components/ui';

<SocialShare
  url="https://test.com"
  title="Test Title"
  description="Test description"
/>
```

**Test Actions:**
1. Click share button
2. Verify dropdown appears
3. Click each platform button
4. Verify new window opens
5. Click "Copy link"
6. Verify success message

**Expected:**
- [ ] Dropdown opens smoothly
- [ ] 5 platform buttons visible
- [ ] Copy link works
- [ ] Success message shows
- [ ] Dropdown closes on outside click

---

### FavoriteButton Component
```jsx
import { FavoriteButton } from './components/ui';

const [fav, setFav] = useState(false);

<FavoriteButton
  isFavorite={fav}
  onToggle={() => setFav(!fav)}
  size="medium"
/>
```

**Expected:**
- [ ] Heart icon visible
- [ ] Toggles between filled/outline
- [ ] Animation on click
- [ ] Size prop works (small, medium, large)
- [ ] Ripple effect when favorited

---

## 🎨 Design System Tests

### Dark Mode
Toggle dark mode and verify:
- [ ] All pages render correctly
- [ ] Text is readable
- [ ] Background colors change
- [ ] Borders visible
- [ ] Images have proper contrast

### Responsive Design

Test at these breakpoints:
- [ ] Mobile (375px) - iPhone SE
- [ ] Tablet (768px) - iPad
- [ ] Desktop (1024px) - Laptop
- [ ] Large (1920px) - Desktop

**What to check:**
- Grid layouts collapse properly
- Text sizes scale
- Navigation is accessible
- Images resize
- Buttons are tap-friendly (min 44px)

---

## 🔍 Browser Testing

Test in:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 📊 Performance Tests

### Load Times
```javascript
// Add to component to measure
useEffect(() => {
  const start = performance.now();
  // Component logic
  const end = performance.now();
  console.log(`Load time: ${end - start}ms`);
}, []);
```

**Targets:**
- HomePage: < 1000ms
- MapPage: < 2000ms (map loading)
- Other pages: < 500ms

### Memory Usage
Open DevTools > Performance
- [ ] No memory leaks on navigation
- [ ] Animations don't cause jank
- [ ] Scroll is smooth (60fps)

---

## 🐛 Common Issues & Fixes

### Issue: "Module not found: Can't resolve 'leaflet'"
**Fix:**
```bash
npm install leaflet react-leaflet
```

### Issue: Map markers not showing
**Fix:**
```javascript
// Add to InteractiveMap.jsx
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
```

### Issue: Framer Motion animations not working
**Fix:**
```bash
npm install framer-motion
```

### Issue: Dark mode not working
**Fix:**
Ensure Tailwind config has:
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

---

## ✅ Final Checklist

Before considering testing complete:

### Functionality
- [ ] All pages load without errors
- [ ] Navigation works between pages
- [ ] Favorites persist in localStorage
- [ ] Map markers are interactive
- [ ] Filters update results
- [ ] Share buttons open correct URLs
- [ ] Animations are smooth

### Visual
- [ ] No layout shifts
- [ ] Images load properly
- [ ] Icons display correctly
- [ ] Text is readable
- [ ] Colors match design
- [ ] Dark mode works

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Color contrast passes WCAG

### Performance
- [ ] No console errors
- [ ] No console warnings
- [ ] Smooth scrolling
- [ ] Fast page transitions
- [ ] Responsive to user input

---

## 📝 Test Report Template

```markdown
## Test Results - [Date]

### Environment
- Browser: 
- OS: 
- Screen Size: 

### Pages Tested
- [ ] HomePage - PASS/FAIL - Notes:
- [ ] MapPage - PASS/FAIL - Notes:
- [ ] AboutPage - PASS/FAIL - Notes:
- [ ] FavoritesPage - PASS/FAIL - Notes:
- [ ] HeritageDetailPage - PASS/FAIL - Notes:

### Issues Found
1. [Issue description]
   - Severity: High/Medium/Low
   - Steps to reproduce:
   - Expected:
   - Actual:

### Performance
- HomePage load: XXXms
- MapPage load: XXXms
- Navigation speed: Fast/Medium/Slow

### Overall Status: PASS / FAIL
```

---

## 🎯 Success Criteria

All tests pass when:
1. ✅ All pages render without errors
2. ✅ All interactive elements work
3. ✅ Responsive on all screen sizes
4. ✅ Dark mode functional
5. ✅ Performance targets met
6. ✅ No console errors
7. ✅ Cross-browser compatible
8. ✅ Accessible (keyboard, screen readers)

---

Happy Testing! 🚀

