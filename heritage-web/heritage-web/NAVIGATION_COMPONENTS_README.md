# Heritage Web - Navigation Components

This document describes the navigation components created for the heritage-web project.

## Components Created

### 1. Breadcrumb.jsx
A breadcrumb navigation component that shows the current page path and allows navigation through the hierarchy.

**Features:**
- Automatically generates breadcrumb trail from current URL path
- Shows home icon for root navigation
- Displays Vietnamese route names
- Dark mode support
- Hover effects with heritage theme colors

**Props:**
None (uses React Router's `useLocation` hook)

**Usage:**
```jsx
import { Breadcrumb } from './components/navigation';

<Breadcrumb />
```

**Route Names:**
The component includes predefined Vietnamese names for common routes:
- '': 'Trang chủ' (Home)
- 'heritage': 'Di sản' (Heritage)
- 'map': 'Bản đồ' (Map)
- 'timeline': 'Dòng thời gian' (Timeline)
- 'about': 'Giới thiệu' (About)
- 'chat': 'Trò chuyện AI' (AI Chat)
- 'quiz': 'Đố vui' (Quiz)
- 'tts': 'Đọc văn bản' (Text to Speech)
- 'contribute': 'Đóng góp' (Contribute)
- 'favorites': 'Yêu thích' (Favorites)
- 'admin': 'Quản trị' (Admin)

### 2. MobileNav.jsx
A mobile-optimized bottom navigation bar for quick access to main features.

**Features:**
- Fixed bottom navigation for mobile devices
- Icon + label navigation items
- Active state highlighting
- Responsive design (hidden on medium+ screens)
- Dark mode support

**Props:**
None (uses React Router's `NavLink` for navigation)

**Navigation Items:**
- Home (/)
- Di sản - Heritage (/heritage)
- Bản đồ - Map (/map)
- Chat (/chat)
- Quiz (/quiz)

**Usage:**
```jsx
import { MobileNav } from './components/navigation';

<MobileNav />
```

**Styling:**
The component uses the `mobile-nav` class which should be styled in your CSS:
```css
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  z-index: 40;
}
```

### 3. PageTransition.jsx
A wrapper component that adds smooth page transition animations using Framer Motion.

**Features:**
- Multiple animation variants (fadeInUp, fadeIn, slideIn, scaleIn)
- Customizable duration and delay
- Smooth easing function
- Exit animations for page transitions

**Props:**
- `children`: React nodes to animate (required)
- `variant`: Animation type - 'fadeInUp', 'fadeIn', 'slideIn', or 'scaleIn' (default: 'fadeInUp')
- `duration`: Animation duration in seconds (default: 0.4)
- `delay`: Animation delay in seconds (default: 0)

**Animation Variants:**
1. **fadeInUp**: Fades in while moving up from below
2. **fadeIn**: Simple fade in/out
3. **slideIn**: Slides in from right, exits to left
4. **scaleIn**: Scales up from 95% while fading in

**Usage:**
```jsx
import { PageTransition } from './components/navigation';

<PageTransition variant="fadeInUp" duration={0.5} delay={0.1}>
  <div>Your page content here</div>
</PageTransition>
```

**Example with React Router:**
```jsx
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/navigation';

<AnimatePresence mode="wait">
  <Routes>
    <Route path="/" element={
      <PageTransition>
        <HomePage />
      </PageTransition>
    } />
    <Route path="/heritage" element={
      <PageTransition variant="slideIn">
        <HeritagePage />
      </PageTransition>
    } />
  </Routes>
</AnimatePresence>
```

## File Locations

All navigation components are located in:
```
/heritage-web/src/components/navigation/
├── Breadcrumb.jsx
├── MobileNav.jsx
├── PageTransition.jsx
└── index.js
```

## Dependencies

These components require:
- **React** (v18+)
- **react-router-dom** (v6+) - for Breadcrumb and MobileNav
- **framer-motion** (v10+) - for PageTransition
- **lucide-react** - for icons
- **react-i18next** - for translations in Breadcrumb
- **Tailwind CSS** - with custom heritage theme classes

## Integration Notes

### 1. Using with React Router
Make sure your app is wrapped with `BrowserRouter`:
```jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>
```

### 2. Heritage Theme Colors
The components use these custom Tailwind classes:
- `text-heritage-red-600`
- `dark:text-heritage-gold-400`
- `hover:text-heritage-red-600`
- `dark:hover:text-heritage-gold-400`

Ensure these are defined in your `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      'heritage-red': {
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
      },
      'heritage-gold': {
        300: '#FCD34D',
        400: '#FBBF24',
      }
    }
  }
}
```

### 3. Dark Mode
All components support dark mode through Tailwind's `dark:` variant.
Ensure dark mode is enabled in your Tailwind config:
```js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

## Example Layout Integration

```jsx
import { Outlet } from 'react-router-dom';
import { Breadcrumb, MobileNav, PageTransition } from './components/navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pb-16 md:pb-0">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb />
        </div>
        
        {/* Page content with transition */}
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
}
```

## Customization

### Adding New Routes to Breadcrumb
Edit the `routeNames` object in `Breadcrumb.jsx`:
```jsx
const routeNames = {
  'your-route': 'Tên hiển thị',
  // ...
};
```

### Adding New Mobile Nav Items
Edit the `navItems` array in `MobileNav.jsx`:
```jsx
const navItems = [
  { path: '/new-page', icon: YourIcon, label: 'Label' },
  // ...
];
```

### Creating Custom Animation Variants
Add new variants to the `variants` object in `PageTransition.jsx`:
```jsx
const variants = {
  yourCustomVariant: {
    initial: { /* initial state */ },
    animate: { /* animated state */ },
    exit: { /* exit state */ },
  },
  // ...
};
```

## Notes

- **Breadcrumb** automatically hides on the home page (when pathname is '/')
- **MobileNav** is hidden on medium+ screens (>= 768px)
- **PageTransition** works best with React Router's AnimatePresence
- All components are fully typed with PropTypes for better development experience
- Components follow the heritage-web design system and color scheme

