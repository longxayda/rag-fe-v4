# Heritage Web - UI Utility Components

This document describes the UI utility components created for the heritage-web project.

## Components Created

### 1. GlassCard.jsx
A reusable glass-morphism card component with optional hover effects and glow animations.

**Props:**
- `children`: React nodes to render inside the card
- `className`: Additional CSS classes (default: '')
- `hover`: Enable hover animation effects (default: false)
- `glow`: Glow effect type - 'gold' or 'red' (default: null)
- `onClick`: Click handler function (default: null)

**Usage:**
```jsx
<GlassCard hover glow="gold" className="p-6">
  <h2>Content here</h2>
</GlassCard>
```

### 2. SkeletonLoader.jsx
Loading skeleton components for different content types.

**Exported Components:**
- `SkeletonCard`: Card-style skeleton loader
- `SkeletonList`: List item skeleton loader
- `SkeletonDetail`: Detail page skeleton loader
- `SkeletonHero`: Hero section skeleton loader
- `SkeletonLoader` (default): Configurable skeleton loader

**Props (SkeletonLoader):**
- `type`: Skeleton type - 'card', 'list', 'detail', or 'hero' (default: 'card')
- `count`: Number of skeleton items to render (default: 1)

**Usage:**
```jsx
<SkeletonLoader type="card" count={3} />
<SkeletonList />
```

### 3. EmptyState.jsx
Empty state component with icons and optional action button.

**Props:**
- `type`: Icon type - 'search', 'location', 'favorites', 'chat', or 'default' (default: 'default')
- `title`: Main heading text (default: 'Không có dữ liệu')
- `description`: Description text (default: 'Chưa có nội dung để hiển thị')
- `action`: Action object with `onClick` and `label` properties (default: null)

**Usage:**
```jsx
<EmptyState 
  type="search" 
  title="No results found" 
  description="Try different search terms"
  action={{ 
    label: "Clear filters", 
    onClick: () => clearFilters() 
  }}
/>
```

### 4. AnimatedSection.jsx
Scroll-triggered animation wrapper using Intersection Observer API.

**Props:**
- `children`: React nodes to animate
- `className`: Additional CSS classes (default: '')
- `animation`: Animation class name (default: 'fadeInUp')
- `delay`: Animation delay in milliseconds (default: 0)
- `threshold`: Intersection observer threshold (default: 0.1)

**Usage:**
```jsx
<AnimatedSection animation="fadeInUp" delay={200}>
  <div>Content to animate</div>
</AnimatedSection>
```

## File Locations

All components are located in:
```
/Users/nguyennt/Documents/rag-fe/heritage-web/src/components/ui/
├── GlassCard.jsx
├── SkeletonLoader.jsx
├── EmptyState.jsx
└── AnimatedSection.jsx
```

## Dependencies

These components require:
- React
- lucide-react (for icons in EmptyState)
- Tailwind CSS with custom heritage theme classes
- Custom CSS classes: glass, skeleton, glow-gold, glow-red, animate-float, animate-fadeInUp

## Notes

- All components use Vietnamese text by default for the heritage theme
- Components are designed to work with dark mode
- Glass morphism effect requires custom CSS class 'glass'
- Skeleton loaders require custom CSS class 'skeleton'
- AnimatedSection requires custom animation classes in CSS
