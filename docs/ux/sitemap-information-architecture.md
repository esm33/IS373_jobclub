# Sitemap & Information Architecture

## Site Structure Overview

```
Job Club
│
├── Home (/)
│
├── About (/about)
│   ├── Mission & Vision
│   ├── How It Works
│   ├── Team
│   └── FAQ
│
├── Onboarding (/onboarding)
│   ├── Welcome
│   ├── Choose Your Path
│   ├── Set Goals
│   ├── Join Community
│   └── First Project
│
├── Community (/community)
│   ├── Members Directory
│   ├── Discussion Forums
│   ├── Showcase Gallery
│   └── Mentorship
│
├── Learn (/learn)
│   ├── Resource Library
│   │   ├── AI Fundamentals
│   │   ├── Career Skills
│   │   ├── Project Templates
│   │   └── Tool Guides
│   ├── Learning Paths
│   │   ├── Beginner Path
│   │   ├── Intermediate Path
│   │   └── Advanced Path
│   └── Workshops & Tutorials
│
├── Events (/events)
│   ├── Upcoming Events
│   ├── Past Events
│   ├── Event Calendar
│   └── Submit Event
│
├── Projects (/projects)
│   ├── Browse Projects
│   ├── My Projects
│   ├── Start New Project
│   └── Project Showcase
│
├── Career Hub (/career)
│   ├── Portfolio Builder
│   ├── Resume Templates
│   ├── Interview Prep
│   ├── Job Board
│   └── Success Stories
│
├── Blog (/blog)
│   ├── Latest Posts
│   ├── Categories
│   │   ├── AI & Career
│   │   ├── Skills Development
│   │   ├── Industry Insights
│   │   └── Member Stories
│   └── Article Archive
│
└── Account (/account)
    ├── Dashboard
    ├── Profile
    ├── Settings
    └── Progress Tracking
```

---

## Information Architecture Principles

### 1. User-Centered Navigation
- **Primary audience**: Students at various AI learning stages
- **Navigation reflects user journeys**: Discovery → Learning → Building → Career
- **Clear entry points**: Different paths for different personas

### 2. Progressive Disclosure
- **Surface essential information first**
- **Deep dive options available** for engaged users
- **Onboarding guides new users** to relevant sections

### 3. Findability
- **Multiple paths to content**: Navigation, search, recommendations
- **Clear labeling**: User language, not internal jargon
- **Breadcrumbs**: Always know where you are

---

## Primary Navigation Structure

### Top-Level Navigation
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] Home  Learn  Events  Projects  Career  Blog    │
│                                              [Account]  │
└─────────────────────────────────────────────────────────┘
```

**Order rationale**:
1. **Learn** - Core value proposition
2. **Events** - Community engagement
3. **Projects** - Hands-on application
4. **Career** - End goal/outcomes
5. **Blog** - Thought leadership/content

### Mobile Navigation
```
┌──────────────────┐
│  ☰  Job Club  👤 │
├──────────────────┤
│  Home            │
│  Learn           │
│  Events          │
│  Projects        │
│  Career          │
│  Blog            │
│  About           │
│  Account         │
└──────────────────┘
```

---

## Page-Level Architecture

### Homepage
**Purpose**: Orient, inspire, convert visitors to members

**Information Hierarchy**:
1. **Hero Section**
   - Value proposition
   - Primary CTA (Join / Get Started)
   - Visual hook

2. **Social Proof**
   - Member count
   - Success metrics
   - Testimonials

3. **How It Works**
   - 3-4 step process
   - Visual journey map

4. **Featured Content**
   - Latest blog posts
   - Upcoming events
   - Project showcase

5. **Call to Action**
   - Start onboarding
   - Explore resources

---

### Onboarding Flow
**Purpose**: Guide new members to first value

**Steps** (5-screen flow):

**Screen 1: Welcome**
- Welcome message
- What to expect
- Estimated time (5 min)

**Screen 2: Choose Your Path**
- Select persona/experience level
- Beginner / Intermediate / Advanced
- Career goals selection

**Screen 3: Set Goals**
- What do you want to achieve?
- Select interests (AI areas)
- Timeline preference

**Screen 4: Join Community**
- Create profile
- Add intro (optional)
- Connect with similar members

**Screen 5: First Project**
- Recommended starting project
- Access resources
- Join discussion channel

---

### Learn / Resource Library
**Purpose**: Provide curated, accessible learning content

**Information Architecture**:

```
Resource Library
│
├── Browse by Category
│   ├── AI Fundamentals
│   ├── Career Skills
│   ├── Tools & Platforms
│   └── Industry Insights
│
├── Browse by Format
│   ├── Articles
│   ├── Videos
│   ├── Templates
│   └── Checklists
│
├── Browse by Level
│   ├── Beginner
│   ├── Intermediate
│   └── Advanced
│
└── Curated Collections
    ├── Getting Started Pack
    ├── Portfolio Building Kit
    └── Interview Prep Bundle
```

**Filtering & Search**:
- Search bar (prominent)
- Filter by: category, level, format, duration
- Sort by: newest, popular, recommended

---

### Events Page
**Purpose**: Showcase community activities, drive participation

**Information Architecture**:

**Primary View**: Upcoming Events (Card Grid)

**Event Card Contains**:
- Event title
- Date/time
- Format (Virtual/In-person)
- Category/tags
- RSVP status
- Brief description

**Filters**:
- Timeframe (This week, This month, All)
- Format (Virtual, In-person, Hybrid)
- Category (Workshop, Discussion, Showcase, Social)
- My Events (RSVPs, Hosted)

**Secondary Sections**:
- Calendar View (toggle option)
- Past Events (archive)
- Submit Your Event (CTA)

---

### Projects Page
**Purpose**: Showcase work, inspire new projects, facilitate collaboration

**Views**:

**1. Browse Projects (Default)**
- Grid of project cards
- Filters: Category, Difficulty, Status
- Sort: Recent, Popular, Featured

**2. My Projects**
- Active projects
- Completed projects
- Saved/bookmarked projects

**3. Start New Project**
- Project templates
- Blank project option
- Collaboration requests

**Project Detail Page**:
- Title & description
- Creator profile(s)
- Tech stack/tools used
- Documentation/learnings
- Comments/feedback
- Like/save actions

---

### Career Hub
**Purpose**: Support career preparation and job search

**Information Architecture**:

```
Career Hub
│
├── Portfolio Builder
│   ├── My Portfolio
│   ├── Portfolio Templates
│   └── Portfolio Examples
│
├── Resume & Cover Letter
│   ├── AI-focused resume templates
│   ├── Cover letter guides
│   └── Review requests
│
├── Interview Preparation
│   ├── Common AI interview questions
│   ├── Mock interview practice
│   └── Behavioral interview guide
│
├── Job Board
│   ├── Entry-level AI roles
│   ├── Internships
│   └── Remote opportunities
│
└── Success Stories
    ├── Member spotlights
    ├── Career transition stories
    └── Interview with alumni
```

---

## User Flows

### New Visitor → Member Flow
```
1. Land on Homepage
   ↓
2. Browse content (Blog, Events, Projects)
   ↓
3. Click "Get Started" CTA
   ↓
4. Complete Onboarding (5 screens)
   ↓
5. Access Member Dashboard
   ↓
6. Engage with first resource/project
```

### Member Learning Flow
```
1. Dashboard
   ↓
2. Browse Resource Library
   ↓
3. Select learning path or resource
   ↓
4. Consume content
   ↓
5. Apply to project
   ↓
6. Share progress/learnings
   ↓
7. Get feedback from community
```

### Career Preparation Flow
```
1. Career Hub
   ↓
2. Build portfolio (add projects)
   ↓
3. Create/update resume
   ↓
4. Practice interviews
   ↓
5. Browse job board
   ↓
6. Apply with Job Club portfolio
   ↓
7. Share success story
```

---

## Navigation Patterns

### Global Navigation (All Pages)
- **Header**: Logo, primary nav, search, account
- **Footer**: Secondary links, social, newsletter signup
- **Breadcrumbs**: For deep pages (>2 levels)

### Contextual Navigation
- **Related Resources**: "You might also like..."
- **Next Steps**: "Ready for the next step?"
- **Community Suggestions**: "Members are discussing..."

### User Account Navigation
```
Account Menu (Dropdown)
│
├── My Dashboard
├── My Profile
├── My Projects
├── Saved Resources
├── Settings
└── Logout
```

---

## Search Strategy

### Global Search
- **Location**: Header (all pages)
- **Searches across**: Resources, Events, Projects, Blog, Members
- **Features**:
  - Auto-complete suggestions
  - Recent searches
  - Popular searches
  - Filter results by type

### Contextual Search
- **Resource Library**: Search within resources
- **Events**: Search events
- **Projects**: Search projects
- **Members**: Search member directory

---

## Content Taxonomy

### Primary Categories
1. **AI Fundamentals**
   - Machine Learning Basics
   - Generative AI
   - AI Tools & Platforms
   - AI Ethics

2. **Career Skills**
   - Portfolio Building
   - Resume Writing
   - Interview Prep
   - Networking

3. **Industry Knowledge**
   - AI in Different Industries
   - Job Market Trends
   - Emerging Technologies
   - Company Insights

4. **Soft Skills**
   - Communication
   - Critical Thinking
   - Collaboration
   - Adaptability

### Tags System
- **Skill Level**: Beginner, Intermediate, Advanced
- **Format**: Article, Video, Template, Checklist, Workshop
- **Time**: <15min, 15-30min, 30-60min, 1hr+
- **Tool**: ChatGPT, Midjourney, GitHub Copilot, etc.

---

## Mobile-First Considerations

### Mobile Navigation Priority
1. **Bottom Navigation** (Primary actions)
   - Home
   - Learn
   - Projects
   - Account

2. **Hamburger Menu** (Secondary pages)
   - Events
   - Career Hub
   - Blog
   - About

### Mobile Content Strategy
- **Card-based layouts**: Easily scannable
- **Progressive disclosure**: Show summaries, expand for details
- **Touch-friendly**: Buttons min 44x44px
- **Offline access**: Key resources downloadable

---

## Accessibility Considerations

### Navigation
- **Keyboard navigation**: Tab through all interactive elements
- **Skip links**: Jump to main content
- **ARIA labels**: Screen reader friendly
- **Focus indicators**: Clear visual focus states

### Content Hierarchy
- **Semantic HTML**: Proper heading structure (H1-H6)
- **Landmarks**: Main, nav, aside, footer
- **Alt text**: All images and icons
- **Color contrast**: WCAG AA minimum (4.5:1)

---

## Scalability Plan

### Future Expansion Areas
1. **Mentorship Portal** (dedicated section)
2. **Company Partnerships** (recruiting hub)
3. **Certification Program** (badge system)
4. **Regional Chapters** (location-based communities)
5. **Premium Resources** (tiered access)

### IA Flexibility
- **Modular structure**: Easy to add new sections
- **Consistent patterns**: Reusable templates
- **Clear hierarchy**: Room for growth without complexity
