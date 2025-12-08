# Harvest Notes - Reusable Design Patterns

**Date Created:** December 7, 2025  
**Date Updated:** December 7, 2025  
**Purpose:** Extract generalizable, framework-agnostic design patterns, accessibility features, and performance optimizations for the Job Club project.

> **Note:** Patterns are documented in a style-agnostic way. Swiss design references are translated to universal principles that work with any visual style.

---

## Table of Contents
1. [Critical Accessibility Features](#critical-accessibility-features)
2. [Universal Responsive Patterns](#universal-responsive-patterns)
3. [Flexible Grid Systems](#flexible-grid-systems)
4. [Performance Best Practices](#performance-best-practices)
5. [Typography Foundations](#typography-foundations)
6. [Interactive Component Patterns](#interactive-component-patterns)
7. [Form & Input Patterns](#form--input-patterns)
8. [Print & Document Styles](#print--document-styles)
9. [Job Club Specific Recommendations](#job-club-specific-recommendations)

---

## Critical Accessibility Features

### 1. ✅ WCAG 2.1 AA Compliant Touch Targets
**Requirement:** Minimum 44x44px for all interactive elements

```css
/* Universal button base - works with any design style */
.interactive-element {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}

/* Premium variant for better UX */
.interactive-element-large {
  min-height: 56px;
  padding: 1rem 2rem;
}
```

**Job Club Application:**
- All buttons (Join Now, Sign Up, Submit forms)
- Navigation menu items
- Social media icons
- Mobile menu toggle
- Card click targets
- Checkbox/radio inputs

---

### 2. ✅ Keyboard Navigation & Focus Management
**Critical for accessibility and power users**

```css
/* Modern focus-visible approach */
*:focus {
  outline: none; /* Remove default */
}

*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Custom focus for branded components */
.btn-primary:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
```

**JavaScript Focus Management:**
```javascript
// Trap focus in modal/overlay (essential for Job Club forms)
class FocusTrap {
  constructor(element) {
    this.element = element;
    this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.firstFocusable = null;
    this.lastFocusable = null;
  }
  
  activate() {
    const focusables = this.element.querySelectorAll(this.focusableElements);
    this.firstFocusable = focusables[0];
    this.lastFocusable = focusables[focusables.length - 1];
    
    this.element.addEventListener('keydown', this.handleTab.bind(this));
    this.firstFocusable?.focus();
  }
  
  handleTab(e) {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusable) {
        this.lastFocusable?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === this.lastFocusable) {
        this.firstFocusable?.focus();
        e.preventDefault();
      }
    }
  }
  
  deactivate() {
    this.element.removeEventListener('keydown', this.handleTab);
  }
}
```

**Job Club Use Cases:**
- Onboarding form modals
- Profile setup wizards
- Discord integration popups
- Calendar booking overlays

---

### 3. ✅ Escape Key Handling
**Pattern from mobile menu - universal for overlays**

```javascript
// Close any overlay with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlayIsOpen) {
    closeOverlay();
  }
});
```

**Job Club Application:**
- Close onboarding modals
- Exit event registration forms
- Cancel profile editing
- Dismiss notifications

---

### 4. ✅ ARIA Labels & Semantic HTML
**Found throughout templates:**

```html
<!-- Button with clear purpose -->
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .hover-lift:hover, .hover-scale:hover {
    transform: none !important;
  }
}
```

**Accessibility Impact:**
- Respects user's motion sensitivity preferences
- Disables all animations and transitions
- Prevents vestibular disorders triggers
- Essential for WCAG 2.1 compliance

### 4. High Contrast Mode Support
```css
@media (prefers-contrast: high) {
  .project-card {
    border-width: 3px;
  }
}
```

**Implementation:**
- Thicker borders for better visibility
- Can be extended to increase color contrast
- Helps users with vision impairments

### 5. Reduced Transparency Support
```css
@media (prefers-reduced-transparency: reduce) {
  .glass-light {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: none !important;
  }
  
  .glass-dark {
    background: rgba(0, 0, 0, 0.9) !important;
    backdrop-filter: none !important;
  }
}
```

**Purpose:**
- Helps users with vision issues who struggle with transparency
- Makes content more readable
- System preference-based

### 6. Screen Reader Support
```css
/* Visual-only elements hidden from screen readers */
[aria-hidden="true"] {
  /* Decorative elements */
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### 7. Semantic Color Usage
```css
::selection {
  background-color: #2563eb;
  color: #ffffff;
  /* High contrast ratio for text selection */
}
```

---

## Responsive Design Patterns

### 1. Mobile-First CSS Variables
```css
:root {
  /* Fluid spacing that scales with viewport */
  --space-xs: 0.25rem;  /* 4px */
  --space-sm: 0.5rem;   /* 8px */
  --space-md: 0.75rem;  /* 12px */
  --space-lg: 1rem;     /* 16px */
  --space-xl: 1.5rem;   /* 24px */
  --space-2xl: 2rem;    /* 32px */
  --space-3xl: 2.5rem;  /* 40px */
  --space-4xl: 3rem;    /* 48px */
  --space-5xl: 4rem;    /* 64px */
  
  /* Fluid spacing with clamp */
  --swiss-section-inline: clamp(1rem, 3vw, 3rem);
  --swiss-section-block: clamp(4rem, 8vw, 8rem);
  --swiss-container-padding: clamp(1rem, 4vw, 2rem);
}
```

**Benefits:**
- Scales smoothly across all viewport sizes
- Reduces need for multiple media queries
- Maintains consistent spacing ratios

### 2. Fluid Typography with Clamp
```css
:root {
  /* Mobile-first responsive typography */
  --fluid-display: clamp(2rem, 6vw + 1rem, 3.5rem);      /* 32-56px */
  --fluid-h1: clamp(1.75rem, 5vw + 0.5rem, 3rem);        /* 28-48px */
  --fluid-h2: clamp(1.5rem, 4vw + 0.5rem, 2.25rem);      /* 24-36px */
  --fluid-h3: clamp(1.25rem, 3vw + 0.5rem, 1.75rem);     /* 20-28px */
  --fluid-h4: clamp(1.125rem, 2vw + 0.25rem, 1.375rem);  /* 18-22px */
  --fluid-body-lg: clamp(1.125rem, 1vw + 0.5rem, 1.25rem);
  --fluid-body: clamp(1rem, 0.5vw + 0.75rem, 1.125rem);
  --fluid-body-sm: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  --fluid-caption: clamp(0.75rem, 0.5vw + 0.25rem, 0.875rem);
}
```

**Key Advantages:**
- No media query breakpoints needed for font sizes
- Smooth scaling between min and max
- Better readability across devices
- Reduces code complexity

### 3. Swiss Grid System - 12 Column Responsive
```css
.swiss-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--swiss-grid-gutter);
  padding-left: var(--swiss-grid-margin);
  padding-right: var(--swiss-grid-margin);
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .swiss-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  /* All columns become full width on mobile */
  .swiss-col-1, .swiss-col-2, .swiss-col-3, .swiss-col-4,
  .swiss-col-5, .swiss-col-6, .swiss-col-7, .swiss-col-8,
  .swiss-col-9, .swiss-col-10, .swiss-col-11, .swiss-col-12 {
    grid-column: span 4;
  }
}
```

**Usage Pattern:**
- Desktop: 12-column grid
- Mobile: 4-column grid (automatically full-width)
- Mathematical precision in spacing
- Content-driven layout

### 4. Asymmetric Grid Patterns
```css
.swiss-asymmetric-hero {
  display: grid;
  grid-template-columns: 5fr 7fr;  /* Golden ratio inspired */
  gap: var(--space-4xl);
}

.swiss-asymmetric-content {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: var(--space-3xl);
}

@media (max-width: 768px) {
  .swiss-asymmetric-hero,
  .swiss-asymmetric-content {
    grid-template-columns: 1fr;
  }
}
```

**Design Philosophy:**
- Creates visual interest with asymmetry
- Mobile collapses to single column
- Swiss design principle: mathematical precision

### 5. Responsive Projects Grid
```css
.projects-grid-advanced {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: var(--space-xl);
  contain: layout; /* Performance optimization */
}

/* Specific breakpoints for fine control */
@media (min-width: 1600px) {
  .projects-grid-advanced {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) and (max-width: 1599px) {
  .projects-grid-advanced {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .projects-grid-advanced {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
}
```

**Smart Features:**
- auto-fit automatically fills available space
- minmax ensures cards never get too small
- Graceful degradation to single column

### 6. Mobile Typography Adjustments
```css
@media (max-width: 640px) {
  /* Enable hyphenation on narrow screens */
  p, li, dd {
    hyphens: auto;
    hyphenate-limit-chars: 6 3 2;
  }
  
  /* Prose adjustments */
  .prose-swiss {
    font-size: clamp(0.9375rem, 2vw, 1rem);
  }
  
  .prose-swiss h2 {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }
}
```

---

## Swiss Design System

### 1. Minimal Color Palette
```css
:root {
  /* Core colors - extremely limited for bold visual impact */
  --swiss-black: #000000;
  --swiss-white: #ffffff;
  
  /* Grayscale system */
  --swiss-gray-100: #f5f5f5;
  --swiss-gray-200: #e5e5e5;
  --swiss-gray-300: #d4d4d4;
  --swiss-gray-400: #a3a3a3;
  --swiss-gray-500: #737373;
  --swiss-gray-600: #525252;
  --swiss-gray-700: #404040;
  --swiss-gray-800: #262626;
  --swiss-gray-900: #171717;
  
  /* Accent - use sparingly! */
  --swiss-red: #e53e3e;
  --swiss-red-dark: #c53030;
}
```

**Swiss Design Principles:**
- Maximum 3 colors in use at once
- Black and white as primary
- Red as accent (sparingly)
- Rely on typography and spacing, not color

### 2. Geometric Button System
```css
.btn-swiss {
  /* Perfect geometric squares/rectangles */
  min-h-[56px];
  px-8 py-4;
  
  /* Bold uppercase typography */
  font-bold uppercase tracking-wider text-sm;
  
  /* Clean 2px borders */
  border-2;
  border-color: var(--swiss-black);
  
  /* Sharp, precise interactions */
  transition-all duration-200;
}

.btn-swiss:hover {
  /* Complete color inversion on hover */
  background-color: var(--swiss-black);
  color: var(--swiss-white);
}
```

### 3. Structural Lines & Dividers
```css
.swiss-divider {
  border-top: 3px solid var(--swiss-black);
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.swiss-divider-thin {
  border-top: 1px solid var(--swiss-gray-300);
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}
```

**Usage:**
- Creates visual hierarchy
- Separates content sections
- Defines page structure
- No decorative elements - purely functional

### 4. Prose Typography System
```css
.prose-swiss {
  color: var(--swiss-black);
  font-size: var(--fluid-body);
  line-height: 1.6;
  max-width: 65ch; /* Optimal reading width */
}

/* Custom list styling */
.prose-swiss ul > li::before {
  content: "—";  /* Em dash, not hyphen */
  color: var(--swiss-red);
  font-weight: 700;
}

/* Bold underlined links */
.prose-swiss a {
  color: var(--swiss-black);
  text-decoration: underline;
  text-decoration-color: var(--swiss-red);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  font-weight: 600;
}

.prose-swiss a:hover {
  background-color: var(--swiss-red);
  color: var(--swiss-white);
  text-decoration: none;
}
```

---

## Performance Optimizations

### 1. Content Visibility API
```css
@supports (content-visibility: auto) {
  [data-section] {
    content-visibility: auto;
    contain-intrinsic-size: 0 800px;
  }
  
  [data-component="blog-card"],
  [data-component="project-card"] {
    content-visibility: auto;
    contain-intrinsic-size: 0 400px;
  }
}
```

**Performance Benefits:**
- Browser skips rendering off-screen content
- Dramatically improves initial page load
- Lazy rendering for better performance
- 50-60% faster page rendering on long pages

### 2. Hardware Acceleration
```css
.project-card {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: auto;
  contain: layout;
}
```

**Why This Works:**
- Forces GPU acceleration
- Prevents repaint issues
- Smoother animations
- Better performance on mobile

### 3. Font Feature Settings
```css
html {
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
}

body {
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "onum" 1;
  font-variant-numeric: oldstyle-nums;
}
```

**OpenType Features:**
- `kern`: Better letter spacing
- `liga`: Ligatures (fi, fl, etc.)
- `calt`: Contextual alternates
- `onum`: Old-style numbers for elegance

### 4. Backdrop Filter Fallback
```css
.glass-light {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

@supports not (backdrop-filter: blur(12px)) {
  .glass-light {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

**Progressive Enhancement:**
- Modern browsers get glassmorphism
- Older browsers get solid background
- No functionality lost

### 5. Image Loading Skeleton
```css
.image-skeleton {
  background: linear-gradient(
    to right,
    #e5e5e5 0%,
    #f5f5f5 50%,
    #e5e5e5 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## Typography System

### 1. Text Wrapping & Balance
```css
/* Prevents orphans in headlines */
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}
```

**CSS Text Level 4:**
- Balances line lengths in multi-line headings
- Prevents single-word last lines
- Better visual hierarchy

### 2. Optimal Line Length
```css
.prose-swiss {
  max-width: 65ch; /* 65 characters */
}
```

**Typography Best Practice:**
- 45-75 characters per line is optimal
- 65ch is the sweet spot
- Improves readability significantly

### 3. Letter Spacing Scale
```css
/* Swiss design uses precise spacing */
tracking-tighter: letter-spacing: -0.025em;
tracking-tight: letter-spacing: -0.02em;
tracking-normal: letter-spacing: 0;
tracking-wide: letter-spacing: 0.025em;
tracking-wider: letter-spacing: 0.05em;
tracking-widest: letter-spacing: 0.1em;
```

**Usage:**
- Large headings: negative tracking (-0.025em)
- Uppercase text: positive tracking (0.1em+)
- Body text: normal (0)

---

## Component Patterns

### 1. Hover States for Non-Touch Devices
```css
@media (hover: hover) {
  .hover-lift {
    transition: transform var(--transition-base), 
                box-shadow var(--transition-base);
  }
  
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
  }
}
```

**Smart Pattern:**
- Only applies hover effects on devices that can hover
- Prevents "stuck" hover states on mobile
- Better UX for touch devices

### 2. Shadow System
```css
:root {
  --shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.06), 
                   0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-medium: 0 4px 12px rgba(16, 21, 34, 0.08), 
                   0 2px 4px rgba(16, 21, 34, 0.04);
  --shadow-strong: 0 24px 48px rgba(16, 21, 34, 0.12), 
                   0 12px 24px rgba(16, 21, 34, 0.08);
  --shadow-hover: 0 40px 80px rgba(16, 21, 34, 0.16), 
                  0 20px 40px rgba(16, 21, 34, 0.12);
}
```

**Layered Shadows:**
- Multiple shadows for depth
- Subtle -> Strong progression
- Realistic elevation

### 3. Transition Timing
```css
:root {
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Easing Function:**
- `cubic-bezier(0.4, 0, 0.2, 1)` = "ease-out"
- Feels responsive and snappy
- Not too slow, not too fast

---

## Print Styles

### 1. Print-Specific Layout
```css
@media print {
  @page {
    size: A4;
    margin: 20mm 15mm;
  }
  
  html, body {
    width: 210mm;
    height: 297mm;
  }
  
  /* Hide non-print elements */
  header, footer, nav, button, .no-print {
    display: none !important;
  }
}
```

### 2. Print Typography
```css
@media print {
  body {
    font-size: 11pt;
    line-height: 1.5;
    color: #000;
    background: #fff;
  }
  
  h1 {
    font-size: 28pt;
    break-after: avoid;
  }
  
  p {
    orphans: 3;
    widows: 3;
  }
}
```

**Print Best Practices:**
- Use points (pt) instead of pixels
- Prevent widows and orphans
- Avoid page breaks after headings
- Ensure high contrast (black on white)

### 3. Print Links
```css
@media print {
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 9pt;
    color: #666;
  }
}
```

**User Experience:**
- Shows URLs when printed
- Allows people to manually type URLs
- Essential for printed reference materials

---

## Advanced Features

### 1. Wide Color Gamut Support
```css
@media (color-gamut: p3) {
  :root {
    --color-primary-p3: color(display-p3 0.231 0.51 0.961);
  }
}
```

### 2. HDR Display Support
```css
@media (dynamic-range: high) {
  :root {
    --color-primary-hdr: color(display-p3 0.25 0.55 1);
  }
  
  img, video {
    filter: contrast(1.05) brightness(1.02);
  }
}
```

### 3. View Transitions API
```css
@supports (view-transition-name: none) {
  ::view-transition-new(root) {
    animation: slide-from-bottom 0.3s ease-out;
  }
}
```

---

## Recommendations for Job Club Project

### Must-Have Patterns:
1. ✅ **Accessibility first** - All focus states, ARIA labels, motion preferences
2. ✅ **Mobile-first responsive** - Fluid typography and spacing with clamp()
3. ✅ **Performance** - Content visibility, hardware acceleration
4. ✅ **Button system** - WCAG compliant touch targets (44px min)
5. ✅ **Grid system** - Swiss 12-column grid with mobile collapse

### Consider Adapting:
- Swiss color system (may want more colors for job categories)
- Typography scale (already excellent)
- Shadow system (very polished)
- Print styles (useful for résumés, checklists)

### Skip/Modify:
- Extreme minimalism (Job Club may need more visual variety)
- Asymmetric grids (may prefer balanced layouts for forms)
- Glassmorphism effects (may not fit job-focused aesthetic)

---

## Code Snippets to Reuse Directly

### Essential Accessibility Snippet
```css
/* Copy-paste this entire block */
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

@media (prefers-contrast: high) {
  * {
    border-width: 2px !important;
  }
}
```

### Essential Responsive Grid
```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
}
```

### Essential Button Base
```css
.btn-base {
  min-height: 44px;
  padding: 0.75rem 1.5rem;
  border: 2px solid currentColor;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-base:focus-visible {
  outline: 2px solid;
  outline-offset: 2px;
}
```

---

**End of Harvest Notes**

*For Job Club implementation, prioritize accessibility and responsive patterns. The Swiss design aesthetic can be adapted to a more colorful, student-friendly visual language while maintaining the excellent technical foundation.*
