# CSS Architecture Analysis - Job Club NJIT

**Date:** December 17, 2025  
**Source:** EAiKW reference site + Material Design implementation  
**Purpose:** Document CSS architecture patterns and organization

---

## Architecture Overview

### Design System: Material Design 3

**Core Principles:**
- Design tokens (CSS custom properties)
- Component-based architecture
- Utility-first with Tailwind CSS
- Responsive by default
- Accessibility-first approach

---

## File Structure

```
src/css/
├── tailwind.css           # Main Tailwind entry point
├── material-design.css    # Material Design tokens & components
├── utilities.css          # Custom utility classes
└── components/
    ├── buttons.css
    ├── cards.css
    ├── forms.css
    └── navigation.css

_site/css/
└── main.css              # Compiled output (PurgeCSS applied)
```

---

## Design Tokens (CSS Custom Properties)

### Color Palette
```css
:root {
  /* Primary Colors */
  --primary: #6750A4;              /* Material Purple */
  --primary-dark: #5E35B1;
  --primary-light: #E8DEF8;
  
  /* Secondary Colors */
  --secondary: #00BFA5;            /* Teal Accent */
  --secondary-dark: #00897B;
  --secondary-light: #B2DFDB;
  
  /* Semantic Colors */
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #F44336;
  --info: #2196F3;
  
  /* Neutral Colors */
  --text: #1C1B1F;                 /* Near black */
  --text-secondary: #49454F;
  --background: #FFFBFE;           /* Warm white */
  --surface: #FFFFFF;
  --surface-variant: #E7E0EC;
  --outline: #79747E;
}
```

### Spacing Scale
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

### Typography Scale (Fluid)
```css
:root {
  /* Fluid typography using clamp() */
  --text-display: clamp(2.5rem, 6vw, 4rem);        /* 40-64px */
  --text-h1: clamp(2rem, 5vw, 3rem);               /* 32-48px */
  --text-h2: clamp(1.5rem, 4vw, 2.25rem);          /* 24-36px */
  --text-h3: clamp(1.25rem, 3vw, 1.75rem);         /* 20-28px */
  --text-body: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);  /* 16-18px */
  --text-small: clamp(0.875rem, 0.5vw, 1rem);      /* 14-16px */
}
```

### Elevation (Shadows)
```css
:root {
  --elevation-1: 0 1px 2px rgba(0, 0, 0, 0.05);
  --elevation-2: 0 2px 8px rgba(0, 0, 0, 0.08);
  --elevation-3: 0 4px 16px rgba(0, 0, 0, 0.12);
  --elevation-4: 0 8px 24px rgba(0, 0, 0, 0.15);
  --elevation-5: 0 16px 32px rgba(0, 0, 0, 0.18);
}
```

---

## Component Architecture

### Button Components
```css
/* Base button */
.btn {
  padding: var(--space-3) var(--space-6);
  border-radius: 24px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: 44px;  /* WCAG touch target */
}

/* Primary variant */
.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
}

/* Hover state */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--elevation-3);
}

/* Focus state (accessibility) */
.btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### Card Components
```css
.card {
  background: var(--surface);
  border-radius: 24px;
  padding: var(--space-8);
  box-shadow: var(--elevation-2);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--elevation-4);
}
```

---

## Responsive Patterns

### Mobile-First Breakpoints
```css
/* Tailwind default breakpoints used */
/* sm:  640px */
/* md:  768px */
/* lg:  1024px */
/* xl:  1280px */
/* 2xl: 1536px */
```

### Container System
```css
.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

### Grid System
```css
.grid-responsive {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## Accessibility Features

### Focus Indicators
```css
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  .card {
    border: 2px solid var(--outline);
  }
  
  .btn {
    border: 2px solid currentColor;
  }
}
```

---

## Performance Optimizations

### PurgeCSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,njk,md,js}",
    "./src/_includes/**/*.njk"
  ],
  // Removes unused CSS in production
  // Reduces CSS from ~300KB to ~24KB (92% reduction)
};
```

### Critical CSS Strategy
1. Inline critical above-the-fold CSS
2. Defer non-critical CSS loading
3. Minimize render-blocking resources

---

## Best Practices Applied

1. ✅ **CSS Custom Properties** - Easy theming and consistency
2. ✅ **Utility-First** - Rapid development with Tailwind
3. ✅ **Component Classes** - Reusable patterns
4. ✅ **Mobile-First** - Better progressive enhancement
5. ✅ **Accessibility** - WCAG 2.1 AA compliant
6. ✅ **Performance** - PurgeCSS removes unused styles
7. ✅ **Maintainability** - Design tokens prevent magic numbers

---

## File References

- Main CSS: [src/css/tailwind.css](../../src/css/tailwind.css)
- Tailwind Config: [tailwind.config.js](../../tailwind.config.js)
- Compiled Output: [_site/css/main.css](../../_site/css/main.css)

**Document Version:** 1.0  
**Last Updated:** December 17, 2025
