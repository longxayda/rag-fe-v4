# Quick Reference Guide - Heritage Web Components

## 🚀 Quick Start

### Pages Usage

#### 1. HomePage
```jsx
import HomePage from './pages/HomePage';

// Use in router
<Route path="/" element={<HomePage />} />
```

#### 2. MapPage  
```jsx
import MapPage from './pages/MapPage';

// Use in router
<Route path="/map" element={<MapPage />} />
```

#### 3. AboutPage
```jsx
import AboutPage from './pages/AboutPage';

// Use in router
<Route path="/about" element={<AboutPage />} />
```

#### 4. FavoritesPage
```jsx
import FavoritesPage from './pages/FavoritesPage';

// Use in router
<Route path="/favorites" element={<FavoritesPage />} />
```

#### 5. HeritageDetailPage
```jsx
import HeritageDetailPage from './pages/HeritageDetailPage';

// Use in router with dynamic ID
<Route path="/heritage/:id" element={<HeritageDetailPage />} />
```

---

## 🧩 Component Examples

### Home Components

#### HeroSection
```jsx
import { HeroSection } from './components/home';

<HeroSection />
// No props needed - fully self-contained
```

#### FeaturedHeritage
```jsx
import { FeaturedHeritage } from './components/home';

<FeaturedHeritage />
// Loads featured items automatically
// Click on items navigates to detail page
```

#### StatisticsSection
```jsx
import { StatisticsSection } from './components/home';

<StatisticsSection />
// Shows animated counters automatically
```

#### QuickAccessCards
```jsx
import { QuickAccessCards } from './components/home';

<QuickAccessCards />
// Navigation cards with icons
// Click to navigate to different sections
```

---

### Map Components

#### InteractiveMap
```jsx
import { InteractiveMap } from './components/map';

const [filters, setFilters] = useState({
  category: 'all',
  region: 'all',
  searchQuery: ''
});

const [selectedHeritage, setSelectedHeritage] = useState(null);

<InteractiveMap
  filters={filters}
  selectedHeritage={selectedHeritage}
  onMarkerClick={(heritage) => setSelectedHeritage(heritage)}
/>
```

**Props:**
- `filters`: Object with category, region, searchQuery
- `selectedHeritage`: Currently selected heritage item
- `onMarkerClick`: Callback when marker is clicked

---

### Heritage Components

#### BentoGrid
```jsx
import { BentoGrid } from './components/heritage';

const items = [
  {
    id: '1',
    name: 'Hoàng Thành Thăng Long',
    category: 'Di tích lịch sử',
    image: '/image.jpg',
    description: '...',
    location: { address: 'Hà Nội' },
    yearBuilt: '1900'
  }
];

<BentoGrid
  items={items}
  onRemoveFavorite={(id) => console.log('Remove', id)}
  showRemoveButton={true}
/>
```

**Props:**
- `items`: Array of heritage items
- `onRemoveFavorite`: Callback for remove button
- `showRemoveButton`: Show/hide remove button (default: false)

#### FilterPanel
```jsx
import { FilterPanel } from './components/heritage';

const [filters, setFilters] = useState({
  category: 'all',
  region: 'all',
  searchQuery: '',
  sort: 'name'
});

<FilterPanel
  filters={filters}
  onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
/>
```

**Props:**
- `filters`: Current filter state
- `onFilterChange`: Callback with updated filters

---

### UI Components

#### SocialShare
```jsx
import { SocialShare } from './components/ui';

<SocialShare
  url="https://example.com/heritage/123"
  title="Heritage Title"
  description="Description text"
/>
```

**Props:**
- `url`: URL to share (optional, defaults to current page)
- `title`: Title for sharing (optional, defaults to page title)
- `description`: Description text (optional)

**Features:**
- Facebook, Twitter, LinkedIn, WhatsApp, Telegram
- Copy link to clipboard
- Animated dropdown menu

#### FavoriteButton
```jsx
import { FavoriteButton } from './components/ui';

const [isFavorite, setIsFavorite] = useState(false);

<FavoriteButton
  isFavorite={isFavorite}
  onToggle={() => setIsFavorite(!isFavorite)}
  size="medium"
  className="custom-class"
/>
```

**Props:**
- `isFavorite`: Boolean state
- `onToggle`: Click handler
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `className`: Additional CSS classes (optional)

---

## 📋 Data Models

### Heritage Item Structure
```javascript
{
  id: '1',                              // Unique ID
  name: 'Hoàng Thành Thăng Long',      // Heritage name
  category: 'Di tích lịch sử',         // Category
  description: '...',                   // Description
  significance: '...',                  // Historical significance
  images: ['/img1.jpg', '/img2.jpg'],  // Array of images
  location: {
    address: 'Hà Nội, Việt Nam',       // Address
    coordinates: {
      lat: 21.0285,                     // Latitude
      lng: 105.8542                     // Longitude
    }
  },
  yearBuilt: '1900',                    // Year built
  status: 'Được bảo tồn tốt'           // Current status
}
```

### Filter Object Structure
```javascript
{
  category: 'all',          // 'all' | 'Di tích lịch sử' | etc.
  region: 'all',           // 'all' | 'Miền Bắc' | 'Miền Trung' | 'Miền Nam'
  searchQuery: '',         // Search text
  sort: 'name'            // 'name' | 'date' | 'popular'
}
```

---

## 🎨 Styling Notes

All components use:
- **Tailwind CSS** for styling
- **Dark mode** support (`dark:` classes)
- **Responsive** breakpoints (sm, md, lg)
- **Framer Motion** for animations

### Color Scheme
- Primary: Blue (blue-500, blue-600)
- Secondary: Purple (purple-500, purple-600)
- Accent: Various gradients
- Background: Gray scale with dark mode

---

## 🔧 LocalStorage Keys

Components use these localStorage keys:
- `heritage_favorites`: Array of favorite heritage items

Example:
```javascript
// Get favorites
const favorites = JSON.parse(localStorage.getItem('heritage_favorites') || '[]');

// Save favorites
localStorage.setItem('heritage_favorites', JSON.stringify(favorites));
```

---

## 📦 Required Dependencies

Make sure these are installed:

```bash
npm install react react-router-dom
npm install framer-motion
npm install leaflet react-leaflet
npm install tailwindcss
```

---

## 🌐 Navigation Examples

### Using React Router
```jsx
import { useNavigate } from 'react-router-dom';

const Component = () => {
  const navigate = useNavigate();
  
  // Navigate to pages
  navigate('/');                    // Home
  navigate('/map');                 // Map
  navigate('/about');              // About
  navigate('/favorites');          // Favorites
  navigate('/heritage/123');       // Heritage detail
  navigate('/heritage');           // Heritage list
};
```

---

## 🎯 Common Patterns

### Adding to Favorites
```javascript
const addToFavorites = (heritage) => {
  const favorites = JSON.parse(localStorage.getItem('heritage_favorites') || '[]');
  favorites.push(heritage);
  localStorage.setItem('heritage_favorites', JSON.stringify(favorites));
};
```

### Removing from Favorites
```javascript
const removeFromFavorites = (heritageId) => {
  const favorites = JSON.parse(localStorage.getItem('heritage_favorites') || '[]');
  const updated = favorites.filter(item => item.id !== heritageId);
  localStorage.setItem('heritage_favorites', JSON.stringify(updated));
};
```

### Checking if Favorite
```javascript
const isFavorite = (heritageId) => {
  const favorites = JSON.parse(localStorage.getItem('heritage_favorites') || '[]');
  return favorites.some(item => item.id === heritageId);
};
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
/* Default: Mobile (< 640px) */

sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

---

## ✅ Checklist for Integration

- [ ] Install required dependencies
- [ ] Add Leaflet CSS to HTML
- [ ] Set up React Router routes
- [ ] Import components where needed
- [ ] Configure dark mode (if not already)
- [ ] Test responsive design
- [ ] Test navigation between pages
- [ ] Test favorite functionality
- [ ] Test social sharing
- [ ] Test map interactions

---

## 🆘 Troubleshooting

### Map not showing
- Check if Leaflet CSS is loaded
- Verify coordinates are valid
- Check container has height

### Favorites not persisting
- Check localStorage permissions
- Verify data structure
- Check for errors in console

### Navigation not working
- Ensure React Router is configured
- Check route paths match
- Verify useNavigate is from react-router-dom

---

## 📞 Support

For issues or questions:
1. Check console for errors
2. Verify all dependencies are installed
3. Review component props
4. Check data structure matches examples

