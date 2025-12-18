# Material Design Reference - Job Club Style Guide

**Reference Site:** https://zoobiasaifullah.github.io/Material-Design-Website/  
**Reference Repo:** https://github.com/zoobiasaifullah/Material-Design-Website  
**Created:** December 10, 2025

---

## Design System Overview

Material Design is Google's comprehensive design system combining classic design principles with modern technology. This reference extracts key patterns from the Material Design website to guide Job Club's transformation.

---

## 🎨 Color System

### Primary Colors

```css
--primary: #6750a4; /* Purple 500 - Primary actions */
--primary-bg: #e8def8; /* Purple 100 - Backgrounds */
--secondary: #03dac6; /* Teal 200 - Accents */
```

### Surface & Background

```css
--surface: #ffffff; /* Cards, elevated surfaces */
--surface-var: #f7f2fa; /* Alternate surface */
--bg: #fefbff; /* Page background */
--outline: #79747e; /* Borders, dividers */
```

### Text Colors

```css
--text: #1c1b1f; /* Primary text */
--text-secondary: #49454f; /* Secondary text */
```

### Dark Mode

```css
body.dark {
  --bg: #1c1b1f;
  --surface: #2b2930;
  --text: #e6e1e5;
  --text-secondary: #cac4d0;
  --primary: #d0bcff;
}
```

### Usage

- **Primary color:** CTAs, links, key actions, FAB
- **Secondary color:** Accents, highlights, tags
- **Surface colors:** Cards, modals, elevated components
- **WCAG AA contrast minimum:** 4.5:1 for text

---

## 📝 Typography

### Font Stack

```css
font-family:
  "Google Sans",
  "Roboto",
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

### Type Scale

```css
/* Display - Hero headings */
.hero-title {
  font-family: "Google Sans", sans-serif;
  font-size: clamp(48px, 8vw, 72px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* Headlines - Section titles */
h1 {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 700;
  letter-spacing: -0.02em;
}

h2 {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  letter-spacing: -0.01em;
}

h3 {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0;
}

/* Body text */
body {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
}

/* Small text */
.small {
  font-size: 14px;
  line-height: 1.5;
}

/* Labels */
.label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

---

## 🏗️ Layout & Grid

### Container System

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}
```

### Responsive Grid

```css
/* Auto-fit card grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

/* 2-column grid */
.two-column {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

@media (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}
```

### Spacing Scale

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 80px;
```

### Section Padding

```css
.section {
  padding: 100px 0;
}

@media (max-width: 768px) {
  .section {
    padding: 60px 0;
  }
}
```

---

## 🎯 Elevation & Shadows

### Shadow Levels

```css
/* Level 1 - Cards at rest */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

/* Level 2 - Raised buttons */
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

/* Level 3 - Cards on hover */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

/* Level 4 - Navigation bar */
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

/* Level 5 - Modals/dialogs */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

/* Level 6 - FAB */
box-shadow: 0 4px 16px rgba(103, 80, 164, 0.3);
```

---

## 🧩 Components

### Navigation Bar

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 64px;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 500;
  color: var(--primary);
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-bg);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 12px;
  color: var(--text);
  text-decoration: none;
  transition: background 0.2s;
}

.nav-link:hover {
  background: var(--primary-bg);
}

.nav-link.active {
  background: var(--primary);
  color: white;
}

/* Mobile menu */
@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 64px;
    right: -100%;
    width: 320px;
    height: calc(100vh - 64px);
    background: white;
    flex-direction: column;
    padding: 32px 20px;
    gap: 8px;
    transition: right 0.3s;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
  }

  .nav-links.active {
    right: 0;
  }
}
```

### Cards

```css
.feature-card {
  position: relative;
  background: var(--surface);
  border-radius: 24px;
  padding: 32px;
  border: 1px solid var(--outline);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-icon-wrapper {
  position: relative;
  width: fit-content;
  margin-bottom: 24px;
}

.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 32px;
}

.card-icon i {
  font-size: 32px;
}

.feature-card h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text);
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}
```

### Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 2px 6px rgba(103, 80, 164, 0.3);
}

.btn-primary:hover {
  background: #5a3e96;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(103, 80, 164, 0.4);
}

.btn-outlined {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-outlined:hover {
  background: var(--primary-bg);
}
```

### Floating Action Button (FAB)

```css
.fab {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--primary);
  color: white;
  border: none;
  box-shadow: 0 4px 16px rgba(103, 80, 164, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 100;
}

.fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(103, 80, 164, 0.4);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: var(--primary-bg);
  color: var(--primary);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

---

## 🎬 Motion & Animation

### Easing Curves

```css
/* Standard easing - Most UI transitions */
cubic-bezier(0.4, 0, 0.2, 1)

/* Deceleration - Entering elements */
cubic-bezier(0, 0, 0.2, 1)

/* Acceleration - Exiting elements */
cubic-bezier(0.4, 0, 1, 1)

/* Sharp - Quick transitions */
cubic-bezier(0.4, 0, 0.6, 1)
```

### Duration Tokens

```css
--duration-short: 200ms; /* Quick feedback */
--duration-medium: 300ms; /* Standard transitions */
--duration-long: 500ms; /* Complex animations */
```

### Common Animations

```css
/* Fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale in */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Float */
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}
```

### Hover Effects

```css
/* Card lift */
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Button press */
.btn:active {
  transform: scale(0.95);
}

/* Icon rotation */
.icon:hover {
  transform: rotate(15deg) scale(1.1);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 🌈 Background Animations

### Floating Shapes

```css
.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: 10%;
  left: 10%;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  top: 60%;
  right: 10%;
  animation-delay: -5s;
}

.shape-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  bottom: 10%;
  left: 50%;
  animation-delay: -10s;
}
```

### Gradient Backgrounds

```css
/* Hero gradient */
background: linear-gradient(135deg, var(--primary-bg) 0%, var(--surface) 100%);

/* Card gradient overlay */
background: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.98) 0%,
  rgba(249, 247, 255, 0.98) 100%
);
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 480px) {
  .hero-title {
    font-size: 36px;
  }
  .section {
    padding: 60px 0;
  }
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet */
@media (min-width: 481px) and (max-width: 768px) {
  .hero-title {
    font-size: 48px;
  }
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

/* Large Desktop */
@media (min-width: 1025px) {
  .container {
    max-width: 1200px;
  }
}
```

### Mobile Navigation

```css
.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
  }

  .nav-links.active {
    display: flex;
  }
}
```

---

## 🎨 Icon System

### Material Icons Implementation

```html
<!-- In <head> -->
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
  rel="stylesheet"
/>

<!-- Usage -->
<i class="material-icons-round">home</i>
<i class="material-icons-round">widgets</i>
<i class="material-icons-round">palette</i>
```

### Common Icons for Job Club

- `home` - Home page
- `group` - Community/Members
- `event` - Events calendar
- `school` - Learning/Resources
- `work` - Jobs/Careers
- `person` - Profile
- `star` - Featured/Premium
- `trending_up` - Progress/Growth
- `chat` - Messaging
- `notifications` - Alerts

---

## ♿ Accessibility

### Focus States

```css
:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 4px;
  border-radius: 4px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### ARIA Labels

```html
<button aria-label="Toggle theme">
  <i class="material-icons-round">dark_mode</i>
</button>

<nav aria-label="Main navigation">
  <!-- nav content -->
</nav>
```

---

## 🌙 Dark Mode

### Implementation

```css
/* Light mode (default) */
:root {
  --bg: #fefbff;
  --surface: #ffffff;
  --text: #1c1b1f;
  --primary: #6750a4;
}

/* Dark mode */
body.dark {
  --bg: #1c1b1f;
  --surface: #2b2930;
  --text: #e6e1e5;
  --text-secondary: #cac4d0;
  --primary: #d0bcff;
  --primary-bg: #4a4458;
}

/* Toggle implementation */
body {
  background: var(--bg);
  color: var(--text);
  transition:
    background-color 0.5s,
    color 0.5s;
}
```

### JavaScript Toggle

```javascript
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light",
  );
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
```

---

## 📐 Page Structure Templates

### Hero Section

```html
<section class="hero">
  <div class="container">
    <div class="hero-badge">
      <i class="material-icons-round">celebration</i>
      <span>Badge Text</span>
    </div>
    <h1 class="hero-title">Main Headline</h1>
    <p class="hero-subtitle">
      Supporting text that explains the value proposition
    </p>
    <div class="hero-actions">
      <a href="#" class="btn btn-primary">
        Primary Action
        <i class="material-icons-round">arrow_forward</i>
      </a>
      <a href="#" class="btn btn-outlined"> Secondary Action </a>
    </div>
    <div class="hero-stats">
      <div class="stat-item">
        <div class="stat-number">3B+</div>
        <div class="stat-label">Statistic Label</div>
      </div>
    </div>
  </div>
</section>
```

### Feature Cards Section

```html
<section class="section">
  <div class="container">
    <div class="section-header">
      <div class="section-badge">Category</div>
      <h2>Section Title</h2>
      <p class="section-subtitle">Section description text</p>
    </div>

    <div class="cards-grid">
      <div class="feature-card">
        <div class="card-icon-wrapper">
          <div class="card-icon">
            <i class="material-icons-round">palette</i>
          </div>
        </div>
        <h3>Card Title</h3>
        <p>Card description text explaining the feature or benefit.</p>
      </div>
    </div>
  </div>
</section>
```

### Footer

```html
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-brand">
        <div class="footer-logo">
          <i class="material-icons-round">layers</i>
          <span>Job Club</span>
        </div>
        <p>Platform description text</p>
        <div class="social-links">
          <a href="#" class="social-link">
            <i class="material-icons-round">link</i>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Job Club. All rights reserved.</p>
    </div>
  </div>
</footer>
```

---

## 🎯 Job Club Specific Applications

### Onboarding Form Styling

- Use elevated cards for form sections
- Material icons for field labels
- Primary color for submit button
- Smooth transitions between steps
- Progress indicator with primary color

### Event Cards

- Elevated surface with hover lift
- Date badge in primary color
- Location icon with text
- RSVP button as primary action
- Capacity indicator with progress bar

### Member Profiles

- Avatar with primary color background
- Badge system for achievements
- Card layout for profile sections
- FAB for quick actions

### Navigation Structure

- Fixed navbar with blur backdrop
- Material icons for menu items
- Active state with primary background
- Mobile drawer from right
- Smooth transitions

---

## ✅ Implementation Checklist

### Phase 1: Foundation

- [ ] Set up CSS variables for Material Design colors
- [ ] Implement Google Sans + Roboto font stack
- [ ] Create container and grid system
- [ ] Add elevation shadow system
- [ ] Set up responsive breakpoints

### Phase 2: Components

- [ ] Build navigation bar with blur backdrop
- [ ] Create card component with hover effects
- [ ] Implement button variants (primary, outlined)
- [ ] Add FAB component
- [ ] Create badge component
- [ ] Build footer with social links

### Phase 3: Pages

- [ ] Transform home page with hero section
- [ ] Update onboarding with Material Design forms
- [ ] Style events page with elevated cards
- [ ] Apply Material Design to all navigation

### Phase 4: Enhancements

- [ ] Add floating shape backgrounds
- [ ] Implement dark mode toggle
- [ ] Add smooth scroll animations
- [ ] Polish hover states and transitions
- [ ] Test accessibility (keyboard, screen reader)

### Phase 5: Optimization

- [ ] Optimize animations for performance
- [ ] Test responsive design on all devices
- [ ] Validate color contrast (WCAG AA)
- [ ] Add loading states
- [ ] Final polish and QA

---

## 📚 Resources

- **Material Design 3:** https://m3.material.io/
- **Material Icons:** https://fonts.google.com/icons
- **Google Fonts:** https://fonts.google.com/
- **Color Tool:** https://material.io/resources/color/

---

**Status:** Reference documentation complete  
**Next Step:** Begin Phase 1 implementation  
**Last Updated:** December 10, 2025
