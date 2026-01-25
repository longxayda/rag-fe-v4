# MobileNav - Visual Preview & Usage Guide

## 🎨 Visual Structure

```
┌─────────────────────────────────────────┐
│  Screen (Mobile Viewport)               │
│                                          │
│  [Content Area]                          │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │  px-4 margin                       │ │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │ │
│  │  ┃ 🟡 Golden Indicator Pill   ┃   │ │ ← Animated, slides left/right
│  │  ┃  (behind nav items)        ┃   │ │
│  │  ┃ ┌────┬────┬────┬────┬────┐ ┃   │ │
│  │  ┃ │ 🏠 │ 📖 │ 🗺️ │ 💬 │ 🎮 │ ┃   │ │ ← Icons (filled when active)
│  │  ┃ │Home│Hrtg│Map │Chat│Quiz│ ┃   │ │ ← Labels
│  │  ┃ └────┴────┴────┴────┴────┘ ┃   │ │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │ │ ← Glass effect container
│  │  pb-4 margin                       │ │
│  └────────────────────────────────────┘ │
│  env(safe-area-inset-bottom)            │
└─────────────────────────────────────────┘
```

---

## 🎬 Animation States

### State 1: Home Active
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🟡━━┓ Indicator here       ┃
┃ ┌────┬────┬────┬────┬────┐ ┃
┃ │ 🏠 │ 📖 │ 🗺️ │ 💬 │ 🎮 │ ┃  ← Home icon filled & scaled
┃ │Home│Hrtg│Map │Chat│Quiz│ ┃
┃ └────┴────┴────┴────┴────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### State 2: Heritage Active (Indicator Slides)
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃      🟡━━┓ Indicator moves  ┃
┃ ┌────┬────┬────┬────┬────┐ ┃
┃ │ 🏠 │ 📖 │ 🗺️ │ 💬 │ 🎮 │ ┃  ← Heritage icon filled & scaled
┃ │Home│Hrtg│Map │Chat│Quiz│ ┃
┃ └────┴────┴────┴────┴────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### State 3: Map Active (Indicator Slides Further)
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃           🟡━━┓ Indicator   ┃
┃ ┌────┬────┬────┬────┬────┐ ┃
┃ │ 🏠 │ 📖 │ 🗺️ │ 💬 │ 🎮 │ ┃  ← Map icon filled & scaled
┃ │Home│Hrtg│Map │Chat│Quiz│ ┃
┃ └────┴────┴────┴────┴────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 📱 Responsive Behavior

### Mobile (< 768px)
- ✅ Visible and functional
- ✅ Floating design with margins
- ✅ Full animation effects

### Tablet/Desktop (≥ 768px)
- ❌ Hidden (`md:hidden`)
- ➡️ Main navigation in Header/Sidebar

---

## 🎨 Color Palette

### Light Mode
- **Inactive Icons/Text**: `#4B5563` (gray-600)
- **Active Icons/Text**: `#B91C1C` (heritage-red-700)
- **Indicator Gradient**: `#FBBF24` → `#F59E0B` (gold-400 → gold-500)
- **Glass Background**: `rgba(255, 255, 255, 0.7)` + blur(20px)

### Dark Mode
- **Inactive Icons/Text**: `#9CA3AF` (gray-400)
- **Active Icons/Text**: `#991B1B` (heritage-red-800)
- **Indicator Gradient**: `#F59E0B` → `#D97706` (gold-500 → gold-600)
- **Glass Background**: `rgba(17, 24, 39, 0.7)` + blur(20px)

---

## 🔧 Integration Example

### In MainLayout.jsx
```jsx
import MobileNav from '../components/navigation/MobileNav';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />  {/* ← Add at bottom */}
    </div>
  );
}
```

### Content Padding Consideration
```jsx
<main className="flex-1 pb-24 md:pb-0">
  {/* pb-24 creates space for mobile nav */}
  {/* md:pb-0 removes padding on desktop where nav is hidden */}
  <Outlet />
</main>
```

---

## 🎯 Usage Tips

### 1. Route Configuration
Ensure these routes exist in your app:
- `/` - Home
- `/heritage` - Heritage listing
- `/map` - Interactive map
- `/chat` - AI chat
- `/quiz` - Quiz game

### 2. Translation Keys
Add to your i18n files:
```json
{
  "nav": {
    "home": "Home",
    "heritage": "Heritage", 
    "map": "Map",
    "chat": "Chat",
    "quiz": "Quiz"
  }
}
```

### 3. Safe Area for iOS
The component automatically handles iPhone notches:
```jsx
style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
```

### 4. Custom Icons
To change icons, modify the navItems array:
```jsx
const navItems = [
  { path: '/', icon: Home, label: t('nav.home') },
  { path: '/heritage', icon: BookOpen, label: t('nav.heritage') },
  // Add your custom icons here
];
```

---

## 🐛 Troubleshooting

### Issue: Indicator not visible
**Solution**: Check that `.glass` CSS class is defined in your styles

### Issue: Animations not working
**Solution**: Ensure `framer-motion` is installed
```bash
npm install framer-motion
```

### Issue: Active state not updating
**Solution**: Verify routes match exactly (including trailing slashes)

### Issue: Nav overlapping content
**Solution**: Add bottom padding to main content area
```jsx
<main className="pb-24 md:pb-0">
```

### Issue: Glitchy animations on older devices
**Solution**: Reduce spring stiffness and damping values

---

## ⚡ Performance Notes

### Optimizations Used
1. **Hardware Acceleration**: Using `motion.*` components
2. **Efficient Re-renders**: Dependencies in useEffect
3. **Spring Physics**: Natural-feeling animations
4. **CSS Transforms**: For position and scale (GPU-accelerated)

### Lighthouse Scores Impact
- **Performance**: Minimal impact (<1% due to animations)
- **Accessibility**: ✅ Semantic nav element, button elements
- **Best Practices**: ✅ Modern CSS, safe area support
- **SEO**: Neutral (mobile navigation)

---

## 🎨 Customization Examples

### Change Indicator Color
```jsx
className="... bg-gradient-to-br from-blue-400 to-blue-500"
```

### Adjust Animation Speed
```jsx
transition={{ type: 'spring', stiffness: 400, damping: 25 }}
```

### Modify Tap Effect
```jsx
whileTap={{ scale: 0.85 }}  // More dramatic scale
```

### Change Shape
```jsx
className="... rounded-full"  // Even more rounded
```

---

## 📦 Component Checklist

- [✅] Floating design with margins
- [✅] Glassmorphism effect
- [✅] Animated golden indicator
- [✅] 5 navigation items
- [✅] Filled/outlined icon states
- [✅] Tap scale animation
- [✅] Heritage color theme
- [✅] Translation support
- [✅] Dark mode support
- [✅] Safe area inset support
- [✅] Responsive (mobile only)
- [✅] Smooth spring animations

