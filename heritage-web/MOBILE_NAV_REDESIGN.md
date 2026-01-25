# MobileNav Component - luuniensuki-lms Style Redesign

## Overview
The MobileNav component has been redesigned to match the modern, floating bottom navigation style with glassmorphism effects and smooth animations.

## Key Features

### 1. **Floating Pill-Shaped Design**
- Positioned at the bottom with margins (`mx-4 mb-4`)
- Rounded corners with `rounded-2xl`
- Centered with `max-w-md mx-auto`
- Pointer-events management for proper touch handling

### 2. **Glassmorphism Effect**
- Uses existing `.glass` CSS class
- Backdrop blur for modern frosted glass effect
- Shadow with `shadow-2xl`
- Works in both light and dark modes

### 3. **Animated Active Indicator**
- **Golden pill background** that slides between active items
- Gradient from `heritage-gold-400` to `heritage-gold-500`
- Spring animation with smooth transitions
- Uses framer-motion for fluid movement
- Configuration:
  - Stiffness: 300
  - Damping: 30

### 4. **Navigation Items**
- **5 Items**: Home, Heritage, Map, Chat, Quiz
- Icons from lucide-react
- Translation support with `useTranslation`

### 5. **Active State Styling**
- **Filled icons** for active state (`fill="currentColor"`)
- **Outlined icons** for inactive state (`fill="none"`)
- Heritage red color for active items (`heritage-red-700`)
- Gray color for inactive items
- Bolder stroke width for active icons (`stroke-[2.5]` vs `stroke-[2]`)
- Scale animation (1.1x for icons, 1.05x for labels)
- Vertical lift animation (-2px for active icons)

### 6. **Press/Tap Animation**
- `whileTap={{ scale: 0.9 }}` for tactile feedback
- Quick 0.1s duration for responsive feel

### 7. **Responsive Design**
- Hidden on desktop (`md:hidden`)
- Safe area inset support for notched devices
- `env(safe-area-inset-bottom)` for iOS devices

## Technical Implementation

### State Management
```javascript
const [activeIndex, setActiveIndex] = useState(0);
```
- Tracks which navigation item is active
- Syncs with current route via `useLocation`

### Animation System
```javascript
const indicatorX = useMotionValue(0);
const itemWidth = 100 / navItems.length;
```
- Motion value for smooth indicator position
- Percentage-based width calculation (20% per item for 5 items)

### Navigation Handler
```javascript
const handleNavClick = (path, index) => {
  setActiveIndex(index);
  navigate(path);
};
```
- Updates active state
- Navigates to target route using `useNavigate`

## Color Scheme

### Active State
- **Icons & Text**: `heritage-red-700` (light), `heritage-red-800` (dark)
- **Indicator Background**: `heritage-gold-400` to `heritage-gold-500` gradient

### Inactive State
- **Icons & Text**: `gray-600` (light), `gray-400` (dark)

## Dependencies
- `react` - Core React hooks
- `react-router-dom` - useLocation, useNavigate
- `lucide-react` - Icon components
- `react-i18next` - Translation support
- `framer-motion` - Animation library

## Animations Breakdown

### 1. Indicator Pill Movement
- Type: Spring animation
- Smooth slide between positions
- Visual feedback for navigation

### 2. Icon Animations
- Scale up when active (1.1x)
- Slight upward movement (-2px)
- Fill color change

### 3. Label Animations
- Scale up when active (1.05x)
- Font weight increase (500 → 600)

### 4. Tap Feedback
- Scale down to 0.9 on press
- Quick 100ms duration

## CSS Classes Used

### Custom Classes
- `.glass` - Glassmorphism effect (backdrop-blur, transparency)

### Tailwind Classes
- Layout: `fixed`, `bottom-0`, `left-0`, `right-0`, `z-50`
- Spacing: `px-4`, `pb-4`, `mx-auto`, `py-2`
- Sizing: `max-w-md`, `w-5`, `h-5`, `h-12`
- Effects: `rounded-2xl`, `shadow-2xl`, `shadow-lg`
- Colors: Heritage theme colors (red, gold)
- Typography: `text-xs`, `font-medium`
- Positioning: `relative`, `absolute`, `top-2`

## Browser Support
- Modern browsers with CSS backdrop-filter support
- Fallback to solid background on older browsers
- Safe area inset support for iOS devices

## Accessibility
- Semantic `<nav>` element
- Button elements for navigation items
- Clear visual feedback for active state
- Touch-friendly tap targets

## Performance Optimizations
- Uses `motion.div` and `motion.button` for hardware-accelerated animations
- Spring animations with optimal stiffness/damping
- Efficient re-renders with useEffect dependencies

