# Interactive Map Components Documentation

## Overview
This document describes the InteractiveMap component and MapPage created for the heritage-web project.

## Files Created

### 1. `src/components/map/InteractiveMap.jsx`
A reusable interactive map component built with React-Leaflet that displays heritage sites on a map.

**Features:**
- **Custom Markers**: Color-coded markers based on heritage ranking
  - Red: Quốc gia đặc biệt (Special National)
  - Amber: Quốc gia (National)
  - Green: Cấp tỉnh (Provincial)
- **Interactive Popups**: Click on markers to see heritage details
- **Responsive Design**: Adapts to different screen sizes
- **Customizable**: Accepts props for center, zoom, and height

**Props:**
- `heritages` (array): Array of heritage objects to display
- `center` (array): Initial map center [lat, lng] (default: Ca Mau coordinates)
- `zoom` (number): Initial zoom level (default: 10)
- `selectedHeritage` (object): Currently selected heritage
- `onMarkerClick` (function): Callback when a marker is clicked
- `height` (string): Map container height (default: '100%')

**Dependencies:**
- react-leaflet
- leaflet
- lucide-react (for icons)
- react-router-dom (for navigation)

### 2. `src/components/map/index.js`
Barrel export file for the map components.

### 3. `src/pages/MapPage.jsx`
A complete page component that provides an interface for exploring heritages on a map.

**Features:**
- **Search Functionality**: Search heritages by name or commune
- **Filter by Ranking**: Filter heritages by their ranking level
- **Interactive Legend**: Color-coded legend showing ranking categories
- **Responsive Layout**: Optimized for mobile and desktop
- **Dark Mode Support**: Respects user's theme preference

**State Management:**
- `searchTerm`: Current search query
- `selectedRanking`: Selected ranking filter
- `showFilters`: Toggle filter panel visibility
- `selectedHeritage`: Currently selected heritage on map

## Usage

### Basic Implementation
```jsx
import { InteractiveMap } from '../components/map';
import heritages from '../data/heritages.json';

function MyMapComponent() {
  return (
    <InteractiveMap 
      heritages={heritages}
      center={[9.1766, 105.1500]}
      zoom={10}
      height="500px"
    />
  );
}
```

### With Event Handling
```jsx
import { InteractiveMap } from '../components/map';
import heritages from '../data/heritages.json';

function MyMapComponent() {
  const [selected, setSelected] = useState(null);

  return (
    <InteractiveMap 
      heritages={heritages}
      onMarkerClick={setSelected}
      selectedHeritage={selected}
    />
  );
}
```

## Routing

The MapPage is already configured in the router at `/map`:
```jsx
// Access the map page at:
// http://localhost:5173/map
```

## Styling

The components use Tailwind CSS with custom heritage theme colors:
- `heritage-red-600`: Primary red color
- `heritage-gold-500`: Gold/amber color
- `heritage-cream-50`: Light cream background

Additional CSS is required for the custom markers (already included in the component).

## Important Notes

1. **Leaflet CSS**: The component imports Leaflet CSS automatically
2. **Marker Icons**: Custom marker icons are generated programmatically
3. **Coordinates**: The component generates random coordinates near Ca Mau for demo purposes since the data doesn't include actual coordinates
4. **Performance**: Uses `useMemo` for optimizing heritage filtering

## Future Enhancements

Potential improvements:
- Add clustering for better performance with many markers
- Implement real GPS coordinates from the data
- Add route planning between heritage sites
- Include street view integration
- Add export/print map functionality
- Implement offline map support

## Dependencies Required

Make sure these packages are installed:
```bash
npm install react-leaflet leaflet
```

These are already included in the project's package.json.

## Browser Compatibility

The map component works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- SVG graphics

## Accessibility

- Keyboard navigation supported within popups
- Screen reader friendly with ARIA labels
- High contrast mode compatible
- Focus indicators on interactive elements

