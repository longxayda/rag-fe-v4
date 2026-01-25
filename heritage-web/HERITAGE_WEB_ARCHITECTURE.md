# Heritage Web - Component Architecture Diagram

## 🏗️ Application Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP ROUTER                              │
│                    (React Router DOM)                           │
└───────────┬─────────────────────────────────────────────────────┘
            │
            ├─────────────────────────────────────────────────────┐
            │                                                     │
    ┌───────▼────────┐                                   ┌────────▼────────┐
    │   HomePage     │                                   │    MapPage      │
    │   Route: /     │                                   │   Route: /map   │
    └───────┬────────┘                                   └────────┬────────┘
            │                                                     │
            │ Uses:                                               │ Uses:
            ├─► HeroSection                                       ├─► InteractiveMap
            ├─► FeaturedHeritage                                  └─► FilterPanel
            ├─► StatisticsSection
            └─► QuickAccessCards

            │
    ┌───────▼────────────┐
    │   AboutPage        │
    │   Route: /about    │
    └────────────────────┘

            │
    ┌───────▼─────────────┐
    │  FavoritesPage      │
    │  Route: /favorites  │
    └───────┬─────────────┘
            │
            │ Uses:
            ├─► BentoGrid
            └─► EmptyState

            │
    ┌───────▼──────────────────┐
    │  HeritageDetailPage      │
    │  Route: /heritage/:id    │
    └───────┬──────────────────┘
            │
            │ Uses:
            ├─► FavoriteButton
            ├─► SocialShare
            ├─► GlassCard
            └─► Breadcrumb
```

---

## 📦 Component Dependencies

### Page → Component Relationships

```
HomePage
├── HeroSection (home)
│   └── Uses: motion, useNavigate
├── FeaturedHeritage (home)
│   ├── Uses: GlassCard (ui)
│   └── Uses: motion, useNavigate
├── StatisticsSection (home)
│   └── Uses: motion
└── QuickAccessCards (home)
    └── Uses: motion, useNavigate

MapPage
├── InteractiveMap (map)
│   ├── Uses: react-leaflet
│   └── Uses: Leaflet
└── FilterPanel (heritage)
    └── Uses: motion

AboutPage
└── Uses: motion

FavoritesPage
├── BentoGrid (heritage)
│   ├── Uses: motion
│   ├── Uses: FavoriteButton (ui)
│   └── Uses: useNavigate
└── EmptyState (ui)
    └── Uses: useNavigate

HeritageDetailPage
├── FavoriteButton (ui)
│   └── Uses: motion
├── SocialShare (ui)
│   └── Uses: motion
├── GlassCard (ui)
└── Breadcrumb (navigation)
    └── Uses: useNavigate
```

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Actions                            │
└───────────────────────┬─────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
   Navigate        Favorite          Filter
        │               │               │
        │               │               │
        ▼               ▼               ▼
  React Router    LocalStorage     State Update
        │               │               │
        ▼               ▼               ▼
  Load Page      Save/Load        Re-render
                  Data          Components
```

### LocalStorage Structure
```javascript
// Favorites data structure
{
  "heritage_favorites": [
    {
      id: "1",
      name: "Heritage Name",
      category: "Category",
      image: "url",
      description: "...",
      location: { address: "...", coordinates: {...} }
    }
  ]
}
```

---

## 🎨 Component Hierarchy

```
App
│
├── Router
│   │
│   ├── HomePage
│   │   ├── HeroSection
│   │   │   ├── motion.div
│   │   │   ├── Headline
│   │   │   ├── CTA Buttons
│   │   │   └── Stats Grid
│   │   │
│   │   ├── FeaturedHeritage
│   │   │   └── GlassCard (×3)
│   │   │       ├── Image
│   │   │       ├── Title
│   │   │       └── Description
│   │   │
│   │   ├── StatisticsSection
│   │   │   └── Stat Cards (×4)
│   │   │       ├── Icon
│   │   │       ├── Number
│   │   │       └── Label
│   │   │
│   │   └── QuickAccessCards
│   │       └── Cards (×6)
│   │           ├── Icon
│   │           ├── Title
│   │           └── Description
│   │
│   ├── MapPage
│   │   ├── FilterPanel (Sidebar)
│   │   │   ├── Search Input
│   │   │   ├── Category Buttons
│   │   │   ├── Region Select
│   │   │   └── Sort Select
│   │   │
│   │   └── InteractiveMap
│   │       ├── MapContainer
│   │       ├── TileLayer
│   │       └── Markers
│   │           └── Popup
│   │
│   ├── AboutPage
│   │   ├── Mission Section
│   │   ├── Vision Cards (×4)
│   │   └── Contact Section
│   │
│   ├── FavoritesPage
│   │   ├── Header
│   │   └── BentoGrid | EmptyState
│   │       └── Cards (varied sizes)
│   │           ├── Image
│   │           ├── Category Badge
│   │           ├── Title
│   │           └── Remove Button
│   │
│   └── HeritageDetailPage
│       ├── Breadcrumb
│       ├── Hero Image
│       ├── Actions Bar
│       │   ├── FavoriteButton
│       │   └── SocialShare
│       │       └── Dropdown
│       │           ├── Platform Buttons (×5)
│       │           └── Copy Link Button
│       │
│       └── Content Grid
│           ├── Main Content (GlassCard ×2)
│           └── Sidebar (GlassCard)
```

---

## 🔌 External Dependencies

```
React Ecosystem
├── react
├── react-dom
└── react-router-dom
    ├── useNavigate
    ├── useParams
    ├── Route
    └── Routes

Animation
└── framer-motion
    ├── motion
    ├── AnimatePresence
    └── variants

Maps
├── leaflet
└── react-leaflet
    ├── MapContainer
    ├── TileLayer
    ├── Marker
    ├── Popup
    └── useMap

Styling
└── tailwindcss
    ├── Utility classes
    ├── Dark mode
    └── Responsive breakpoints

Browser APIs
└── LocalStorage
    ├── getItem
    └── setItem
```

---

## 📡 Component Communication

```
Parent → Child (Props)
┌─────────────────────────────────────┐
│  MapPage                            │
│  ├── filters = { ... }              │
│  └── onMarkerClick = (heritage) => │
│                                     │
│      ↓ Props ↓                      │
│                                     │
│  InteractiveMap                     │
│  ├── receives: filters              │
│  └── receives: onMarkerClick        │
└─────────────────────────────────────┘

Child → Parent (Callbacks)
┌─────────────────────────────────────┐
│  FilterPanel                        │
│  └── onFilterChange({ ... })        │
│                                     │
│      ↑ Callback ↑                   │
│                                     │
│  MapPage                            │
│  └── handleFilterChange(filters)   │
│      └── setFilters(filters)        │
└─────────────────────────────────────┘

Sibling Communication (via Parent State)
┌─────────────────────────────────────┐
│  MapPage (Parent)                   │
│  └── state: selectedHeritage        │
│      │                              │
│      ├─► FilterPanel (sibling 1)    │
│      │   └── selects item           │
│      │       └── triggers callback  │
│      │           └── updates state  │
│      │                              │
│      └─► InteractiveMap (sibling 2) │
│          └── receives updated state │
│              └── centers on marker  │
└─────────────────────────────────────┘
```

---

## 🎯 State Management

```
Component State (useState)
├── HomePage - None (stateless presentation)
├── MapPage
│   ├── selectedHeritage
│   └── filters { category, region, searchQuery }
├── FavoritesPage
│   ├── favorites (from localStorage)
│   └── isLoading
├── HeritageDetailPage
│   ├── heritage (from API/mock)
│   ├── isLoading
│   └── isFavorite
├── FilterPanel
│   └── isExpanded
├── SocialShare
│   ├── isOpen
│   └── copied
├── FavoriteButton
│   └── (controlled by parent)
└── StatisticsSection
    └── stats (animated counters)

Persistent State (LocalStorage)
└── heritage_favorites
    └── Array of favorite heritage items
```

---

## 🔄 User Flows

### 1. Browse Heritage Items
```
User → HomePage
  └─► Click "Bắt Đầu Khám Phá"
      └─► Navigate to /heritage (HeritageList)
          └─► BentoGrid shows items
              └─► Click item
                  └─► Navigate to /heritage/:id
                      └─► HeritageDetailPage
```

### 2. Add to Favorites
```
User → HeritageDetailPage
  └─► Click FavoriteButton
      └─► Toggle isFavorite state
          └─► Save to localStorage
              └─► Show animation
                  └─► Item appears in /favorites
```

### 3. Use Map
```
User → HomePage
  └─► Click "Xem Bản Đồ"
      └─► Navigate to /map
          └─► MapPage loads
              ├─► InteractiveMap shows markers
              └─► FilterPanel ready
                  └─► User filters
                      └─► Map updates markers
                          └─► Click marker
                              └─► Popup shows
                                  └─► Click "Xem chi tiết"
                                      └─► Navigate to detail
```

### 4. Share Heritage
```
User → HeritageDetailPage
  └─► Click SocialShare button
      └─► Dropdown opens
          ├─► Click platform
          │   └─► Opens new window
          │       └─► Platform share dialog
          └─► Click "Copy link"
              └─► Copy to clipboard
                  └─► Show success message
                      └─► Dropdown closes
```

---

## 📱 Responsive Breakpoints

```
Mobile (< 640px)
├── Single column layouts
├── Stacked cards
├── Collapsed navigation
└── Smaller text/spacing

Tablet (640px - 1024px)
├── 2-column grids
├── Side-by-side elements
├── Medium spacing
└── Touch-friendly targets

Desktop (> 1024px)
├── 3-4 column grids
├── Full sidebars
├── Hover effects
└── Optimal spacing
```

---

## 🎨 Theme System

```
Light Mode (default)
├── bg-gray-50
├── text-gray-900
└── border-gray-200

Dark Mode (class: 'dark')
├── dark:bg-gray-900
├── dark:text-white
└── dark:border-gray-700

Colors
├── Primary: blue-500 → blue-600
├── Secondary: purple-500 → purple-600
├── Success: green-500
├── Danger: red-500
└── Warning: amber-500
```

---

## ✅ Component Checklist

All components have:
- ✅ JSDoc documentation
- ✅ PropTypes or descriptive comments
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Accessibility features
- ✅ Smooth animations
- ✅ Error handling
- ✅ Loading states

---

This architecture diagram shows how all pieces fit together!

