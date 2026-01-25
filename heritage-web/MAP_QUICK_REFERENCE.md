# Quick Reference: Map Components File Structure

## Created Files

```
heritage-web/
├── src/
│   ├── components/
│   │   └── map/                          ← NEW DIRECTORY
│   │       ├── InteractiveMap.jsx        ← NEW FILE (170 lines)
│   │       └── index.js                  ← NEW FILE (1 line)
│   │
│   ├── pages/
│   │   └── MapPage.jsx                   ← NEW FILE (126 lines)
│   │
│   └── index.css                         ← UPDATED (added Leaflet styles)
│
├── MAP_COMPONENTS_README.md              ← NEW DOCUMENTATION
└── MAP_IMPLEMENTATION_SUMMARY.md         ← NEW SUMMARY
```

## Modified Files

### src/index.css
Added lines 712-749:
- Leaflet container styles
- Popup styles with dark mode
- Custom marker styles with hover effects

## Route Configuration

Already configured in `src/router/index.jsx`:
- Route: `/map`
- Component: `MapPage` (lazy loaded)
- Layout: `MainLayout`

## Import Examples

### Using InteractiveMap Component
```jsx
import { InteractiveMap } from '../components/map';
```

### Using MapPage
```jsx
// Already imported in router
const MapPage = lazy(() => import('../pages/MapPage'));
```

## Key Props

### InteractiveMap
```jsx
<InteractiveMap 
  heritages={[]}           // Array of heritage objects
  center={[lat, lng]}      // Map center coordinates
  zoom={10}                // Zoom level (1-18)
  selectedHeritage={null}  // Currently selected heritage
  onMarkerClick={fn}       // Marker click handler
  height="100%"            // Container height
/>
```

## Component Hierarchy

```
MapPage
└── InteractiveMap
    ├── MapContainer (react-leaflet)
    │   ├── TileLayer
    │   ├── MapController
    │   └── Marker[] (for each heritage)
    │       └── Popup
    │           └── HeritagePopup
    │               ├── Image
    │               ├── Ranking Badge
    │               ├── Heritage Name
    │               ├── Location Info
    │               └── Link to Detail
    └── Legend (in MapPage)
```

## Styling Classes

### Custom Tailwind Classes Used
- `heritage-red-600` - Primary red
- `heritage-gold-500` - Gold/amber
- `heritage-cream-50` - Light background
- `glass` - Glass morphism effect

### Custom CSS Classes
- `.leaflet-container` - Map container
- `.leaflet-popup-content-wrapper` - Popup styling
- `.custom-marker` - Marker styling

## Testing URLs

- Development: `http://localhost:5173/map`
- Production: `https://yourdomain.com/map`

## Dependencies (Already Installed)

- ✅ react-leaflet@5.0.0
- ✅ leaflet@1.9.4
- ✅ lucide-react@0.562.0
- ✅ framer-motion@12.26.1
- ✅ react-router-dom@7.12.0

