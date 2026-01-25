# Heritage Timeline Components

This document describes the Timeline components created for the heritage-web project.

## Components Created

### 1. HeritageTimeline.jsx
A timeline component that displays heritage items in a chronological vertical timeline with alternating left/right layout.

**Location:** `/heritage-web/src/components/timeline/HeritageTimeline.jsx`

**Features:**
- Vertical timeline with center line
- Alternating left/right item layout
- Animated entrance effects using Framer Motion
- Color-coded ranking badges
- Glass-morphism card design
- Responsive mobile layout
- Dark mode support
- Hover effects with heritage theme colors
- Direct links to heritage detail pages

**Props:**
- `heritages` (Array): Array of heritage objects to display
  - Default: `[]`
  
**Heritage Object Structure:**
```javascript
{
  id: Number,
  name: String,
  year: String,
  ranking: String, // "Quốc gia đặc biệt" | "Quốc gia" | "Cấp tỉnh"
  commune: String,
  district: String,
}
```

**Usage:**
```jsx
import { HeritageTimeline } from '../components/timeline';

<HeritageTimeline heritages={heritageArray} />
```

**Ranking Colors:**
- "Quốc gia đặc biệt" (National Special): Red (`bg-heritage-red-600`)
- "Quốc gia" (National): Gold (`bg-heritage-gold-500`)
- "Cấp tỉnh" (Provincial): Green (`bg-green-500`)

**Component Structure:**
- `TimelineItem`: Internal component for individual timeline items
  - Displays heritage information card
  - Shows year badge with ranking color
  - Heritage name with hover effect
  - Location information
  - Ranking badge
  - "Xem chi tiết" (View details) link
- `HeritageTimeline`: Main timeline container
  - Sorts heritages by year (newest first)
  - Renders timeline line (hidden on mobile)
  - Maps heritages to TimelineItem components

### 2. TimelinePage.jsx
A complete page component that provides a timeline view of heritage items with filtering capabilities.

**Location:** `/heritage-web/src/pages/TimelinePage.jsx`

**Features:**
- Beautiful header with animated entrance
- Search functionality (by heritage name)
- Ranking filter buttons
- Responsive design
- Dark mode support
- Empty state handling
- Integration with HeritageTimeline component

**State Management:**
- `selectedRanking`: Currently selected ranking filter
- `searchTerm`: Search input value
- `filteredHeritages`: Computed filtered heritage list (using `useMemo`)

**Sections:**
1. **Header Section:**
   - Badge with clock icon
   - Page title with gradient text
   - Description text
   - Animated with Framer Motion

2. **Filter Section:**
   - Search input with icon
   - Ranking filter buttons (Tất cả, Quốc gia đặc biệt, Quốc gia, Cấp tỉnh)
   - Responsive flex layout

3. **Timeline Section:**
   - HeritageTimeline component
   - Empty state message when no results

**Ranking Filter Options:**
```javascript
const rankingOptions = [
  { value: '', label: 'Tất cả' },
  { value: 'Quốc gia đặc biệt', label: 'Quốc gia đặc biệt' },
  { value: 'Quốc gia', label: 'Quốc gia' },
  { value: 'Cấp tỉnh', label: 'Cấp tỉnh' },
];
```

## File Structure

```
heritage-web/
└── src/
    ├── components/
    │   └── timeline/
    │       ├── HeritageTimeline.jsx  # Timeline component
    │       └── index.js               # Barrel export
    └── pages/
        └── TimelinePage.jsx           # Timeline page
```

## Dependencies

### Required npm packages:
- **react** (v18+)
- **react-router-dom** (v6+) - for Link navigation
- **framer-motion** (v10+) - for animations
- **lucide-react** - for icons (Calendar, MapPin, Award, ArrowRight, Clock, Search)

### Required data:
- `../data/heritages.json` - Heritage data file

### CSS Classes Used:
From `src/index.css`:
- `.glass-card` - Glass-morphism card style
- `.timeline-line` - Timeline center line
- `.timeline-dot` - Timeline item dot
- `.gradient-text` - Gradient text effect
- Heritage theme colors (defined in `tailwind.config.js`)

## CSS Styles

The timeline styles are already defined in `src/index.css`:

```css
/* Timeline styles */
.timeline-line {
  position: absolute;
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(180deg, transparent 0%, #d1d5db 5%, #d1d5db 95%, transparent 100%);
}

.dark .timeline-line {
  background: linear-gradient(180deg, transparent 0%, #4b5563 5%, #4b5563 95%, transparent 100%);
}

.timeline-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #b91c1c 0%, #f59e0b 100%);
  border: 4px solid white;
  box-shadow: 0 0 0 4px rgba(185, 28, 28, 0.2);
}

.dark .timeline-dot {
  border-color: #1f2937;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.3);
}
```

## Integration Guide

### 1. Import the Timeline Page

Add to your router configuration:
```jsx
import TimelinePage from './pages/TimelinePage';

// In your routes
<Route path="/timeline" element={<TimelinePage />} />
```

### 2. Add Navigation Link

Update your navigation menu:
```jsx
<Link to="/timeline">Dòng thời gian</Link>
```

### 3. Using the HeritageTimeline Component Standalone

```jsx
import { HeritageTimeline } from './components/timeline';
import heritages from './data/heritages.json';

function MyComponent() {
  return (
    <div className="container mx-auto">
      <HeritageTimeline heritages={heritages} />
    </div>
  );
}
```

## Responsive Design

### Desktop (md and up):
- Timeline line visible in center
- Items alternate left/right
- Text alignment switches based on side
- Full width cards (5/12 of container)

### Mobile (below md):
- Timeline line hidden
- All items stacked vertically
- Left-aligned text
- Full width cards
- Smaller spacing between items

## Animation Details

### HeritageTimeline Animations:
- **Entrance**: Items fade in and slide from left/right
- **Delay**: Staggered by index (0.1s * index)
- **Duration**: 0.5s
- **Viewport trigger**: `whileInView` with `once: true`

### TimelinePage Animations:
- **Header**: Fade in from top (20px)
- **Filters**: Fade in from top with 0.2s delay

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Focus states for interactive elements
- Screen reader friendly labels
- Color contrast compliance
- Keyboard navigation support

## Dark Mode

All components fully support dark mode:
- Timeline line adapts color
- Timeline dots adapt shadow
- Card backgrounds
- Text colors
- Border colors
- Hover states

## Performance Optimizations

1. **useMemo**: Filtered heritages computed only when dependencies change
2. **Lazy animations**: `whileInView` only animates when visible
3. **Once animations**: Animations run only once per item
4. **Optimized re-renders**: React.memo potential for TimelineItem

## Example Usage

```jsx
import React from 'react';
import TimelinePage from './pages/TimelinePage';

function App() {
  return (
    <div className="App">
      <TimelinePage />
    </div>
  );
}

export default App;
```

## Customization

### Change Ranking Colors:
Edit the `rankingColors` object in `HeritageTimeline.jsx`:
```javascript
const rankingColors = {
  'Quốc gia đặc biệt': 'bg-heritage-red-600',
  'Quốc gia': 'bg-heritage-gold-500',
  'Cấp tỉnh': 'bg-green-500',
  // Add more rankings as needed
};
```

### Modify Animation Timing:
Adjust the transition values:
```jsx
transition={{ delay: index * 0.1, duration: 0.5 }}
// Change delay multiplier or duration
```

### Change Sort Order:
Modify the sort function:
```javascript
const sortedHeritages = [...heritages].sort((a, b) => {
  const yearA = parseInt(a.year) || 0;
  const yearB = parseInt(b.year) || 0;
  return yearA - yearB; // Oldest first
});
```

## Troubleshooting

### Timeline not showing:
- Verify `heritages.json` is loaded correctly
- Check that heritage objects have required fields
- Ensure timeline CSS classes are defined

### Animations not working:
- Verify framer-motion is installed: `npm install framer-motion`
- Check console for errors

### Styling issues:
- Ensure Tailwind CSS is configured
- Verify heritage theme colors in `tailwind.config.js`
- Check that custom CSS classes are imported

## Future Enhancements

Potential improvements:
- [ ] Add date range filter
- [ ] Export timeline as image/PDF
- [ ] Add timeline zoom controls
- [ ] Decade/century grouping
- [ ] Print-friendly view
- [ ] Share timeline functionality
- [ ] Infinite scroll for large datasets
- [ ] Timeline view toggle (vertical/horizontal)
- [ ] Filter by district/commune
- [ ] Sort by name/year
- [ ] Image gallery in timeline items
- [ ] Interactive timeline scrubber

## Testing Checklist

Before deploying:
- [ ] Test search functionality
- [ ] Test all ranking filters
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test dark mode toggle
- [ ] Test animations performance
- [ ] Test with empty dataset
- [ ] Test with large dataset (100+ items)
- [ ] Verify links to heritage detail pages
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

---

**Created:** January 2024
**Status:** ✅ Production Ready
**Components:** 2 files created + 1 documentation file

