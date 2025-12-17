# Sitemap & Information Architecture

![Job Club Sitemap](./images/sitemap-visual.png)
*Visual sitemap diagram*

## Site Structure Overview

```
Job Club
│
├── Home (/)
│
├── Resource Library (/resources/)
│   ├── LinkedIn Optimization Guide
│   ├── GitHub Profile Setup Guide
│   ├── Portfolio Website Guide
│   └── AI Skills Career Success Guide
│
├── Events (/events/)
│   ├── Upcoming Events
│   ├── Event Details (individual)
│   └── Event Filters (Workshop, Office Hours, Meetup, Guest Speaker, Hack Night)
│
├── About (/about/)
│
└── Join Now (/onboarding/)
```

**Navigation Structure:**
- **Primary Nav**: Home, Resource Library, Events, About
- **CTA Button**: Join Now (prominent in header)

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
┌──────────────────────────────────────────────────────────────────┐
│  [Logo] Home  Resource Library  Events  About  [Join Now]       │
└──────────────────────────────────────────────────────────────────┘
```

**Navigation elements**:
- **Home** - Landing page
- **Resource Library** - Guides and resources
- **Events** - Workshops and meetups
- **About** - Background and mission
- **Join Now** - Primary CTA (styled as button)

### Mobile Navigation
```
┌──────────────────┐
│  ☰  Job Club    │
├──────────────────┤
│  Home            │
│  Resource Library│
│  Events          │
│  About           │
│  Join Now        │
└──────────────────┘
```

---

## Page-Level Architecture

### Homepage
**Purpose**: Introduce the brand, showcase community, drive engagement

**Information Hierarchy**:
1. **Hero Section**
   - Personal brand (Eriberto S. Marte)
   - Value proposition: "Build your future with AI education, real connections, and career opportunities"
   - Primary CTAs: "Join Town Hall" and "Learn More"

2. **Stats Row**
   - 23 Years teaching
   - 10,000+ Students
   - AI Impact metrics

3. **About Preview**
   - Brief background
   - Experience highlights
   - Link to full About page

4. **Key Sections**
   - Projects showcase
   - Town Hall preview
   - Event highlights

---

### Resource Library Page
**Purpose**: Provide curated career development guides

**Content Structure**:
- Page title and description
- Grid of resource cards (2-column layout)
- Each resource card includes:
  - Icon with gradient background
  - Title and category
  - Description
  - "What You'll Learn" highlights
  - Time estimate
  - Download/access button

**Current Resources**:
1. LinkedIn Optimization Guide
2. GitHub Profile Setup Guide
3. Portfolio Website Guide
4. AI Skills Career Success Guide

---

### Events Page
**Purpose**: Showcase workshops, meetups, and networking opportunities

**Page Structure**:
1. **Hero Section**
   - Page title: "Upcoming Events"
   - Description
   - Event type filters:
     - All Events
     - 🛠️ Workshops
     - 💼 Office Hours
     - 🤝 Meetups
     - 🎤 Guest Speakers
     - 💻 Hack Nights

2. **Events Grid**
   - Card-based layout (3-column on desktop)
   - Each event card shows:
     - Event type badge
     - Featured badge (if applicable)
     - Title
     - Date and time
     - Location (Virtual/In-person)
     - Duration and attendee count
     - Brief description
     - RSVP button
     - Link to event details

3. **Individual Event Detail Pages**
   - Full event information
   - Schedule and agenda
   - Registration/RSVP
   - Speaker information (if applicable)
   - Location details

---

### About Page
**Purpose**: Share background, experience, and mission

**Content Sections**:
1. **Page Header**
   - Section number and title
   - Structural divider

2. **Introduction**
   - "Twenty-Three Years. Ten Thousand Students."
   - Teaching background and evolution
   - Technology journey

3. **Experience Highlights**
   - NJIT background
   - Course development
   - Student impact

4. **Current Work**
   - Enterprise AI program
   - EverydayAI Community
   - Teaching philosophy

5. **Skills & Expertise**
   - Technical skills
   - Leadership experience
   - Educational approach

---

### Onboarding/Join Now Page
**Purpose**: Collect member information and complete registration

**Form Structure**:
1. **Header**
   - Welcome message
   - "Welcome to Job Club" title
   - Description

2. **Form Sections**
   - Personal Information:
     - Full Name
     - Email Address
   - Academic Information:
     - NJIT ID
     - Graduation Year
     - Major
   - Career Interests:
     - AI Interest Areas (checkboxes)
     - Career Goals
     - Skill Level
   - Commitment:
     - Weekly Time Commitment
     - Participation Agreement
   - Success message on submission

---

### Onboarding Flow
**Purpose**: Welcome new members and guide initial setup

**Current Implementation**:
- Single-page form with all fields
- Material Design 3 styling
- Icon-enhanced sections
- Gradient backgrounds
- Success confirmation
   - Latest blog posts
   - Upcoming events
   - Project showcase

5. **Call to Action**
   - Start onboarding
   - Explore resources

---

### Onboarding Flow
**Purpose**: Guide new members to first value

**Steps** (4-screen flow):

**Screen 1: Welcome**
- Welcome message
- What to expect
- Estimated time (3 min)

**Screen 2: Choose Path**
- Select persona/experience level
- Beginner / Intermediate / Advanced
- Career goals selection

**Screen 3: Email Subscription**
- Subscribe to updates
- Frequency preferences
- Content interests

**Screen 4: Join Community**
- Connect to Discord
- Community guidelines
- Get started in Discord

---

### About Page
**Purpose**: Explain Job Club's mission and how it works

**Information Architecture**:

**Mission Section**
- Vision statement
- Why Job Club exists
- Core values

**How It Works**
- Step-by-step process
- Member journey
- Value proposition

**Team**
- Leadership bios
- Advisors
- Contact information

**FAQ**
- Common questions
- Getting started help
- Technical support

---

### Events Page
**Purpose**: Showcase community activities, drive participation

**Information Architecture**:

**Upcoming Events**
- Featured event (hero)
- Event cards with:
  - Title, date, time
  - Format (virtual/in-person)
  - Brief description
  - RSVP button
- Filter by: format, topic, date

**Past Events**
- Event archive
- Recordings (if available)
- Event summaries
- Key takeaways

**Calendar View**
- Monthly calendar grid
- Event markers
- Quick view details
- Export to personal calendar

---

### Community Page
**Purpose**: Connect members to Discord community

**Information Architecture**:

**Discord Integration**
- Discord server invite
- Channel overview
- Community guidelines
- Getting started guide
- Member count/activity stats

### Career Hub
**Purpose**: Support career preparation and job search

**Information Architecture**:

```
Career Hub
│
├── Portfolio Template
│   ├── Template gallery
│   ├── Customization guide
│   └── Portfolio examples
│
├── Resume
│   ├── AI-focused resume templates
│   ├── Resume writing tips
│   └── Cover letter guides
│
└── Interview Prep
    ├── Common AI interview questions
    ├── Mock interview resources
    └── Behavioral interview guide
```

---

### Account Pages
**Purpose**: Personal dashboard and settings

**Information Architecture**:

**Dashboard**
- Activity overview
- Upcoming events
- Recent updates
- Quick actions

**Profile**
- Personal information
- Bio and interests
- Social links
- Privacy settings

**Settings**
- Account preferences
- Email notifications
- Privacy controls
- Connected accounts

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
4. Complete Onboarding (4 screens)
   ↓
5. Join Discord Community
   ↓
6. Access Member Dashboard
```

### Member Engagement Flow
```
1. Dashboard
   ↓
2. Discover upcoming events
   ↓
3. RSVP to event
   ↓
4. Participate in event
   ↓
5. Connect on Discord
   ↓
6. Continue engagement
```

### Career Preparation Flow
```
1. Career Hub
   ↓
2. Choose portfolio template
   ↓
3. Customize portfolio
   ↓
4. Create/update resume
   ↓
5. Practice interview prep
   ↓
6. Share success on Discord
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
├── Dashboard
├── Profile
├── Settings
└── Logout
```

---

## Search Strategy

### Global Search
- **Location**: Header (all pages)
- **Searches across**: Events, Career Resources
- **Features**:
  - Auto-complete suggestions
  - Recent searches
  - Popular searches
  - Filter results by type

### Contextual Search
- **Events**: Search by date, topic, format
- **Career Hub**: Search templates and resources

---

## Content Taxonomy

### Primary Categories
1. **Community**
   - Discord channels
   - Member connections
   - Community guidelines

2. **Events**
   - Workshops
   - Discussions
   - Social meetups

3. **Career Resources**
   - Portfolio templates
   - Resume templates
   - Interview preparation

### Tags System
- **Skill Level**: Beginner, Intermediate, Advanced
- **Event Type**: Workshop, Social, Discussion
- **Format**: Virtual, In-person, Hybrid
- **Resource Type**: Template, Guide, Reference

---

## Mobile-First Considerations

### Mobile Navigation Priority
1. **Bottom Navigation** (Primary actions)
   - Home
   - Events
   - Community
   - Account

2. **Hamburger Menu** (Secondary pages)
   - About
   - Career Hub

### Mobile Content Strategy
- **Card-based layouts**: Easily scannable
- **Progressive disclosure**: Show summaries, expand for details
- **Touch-friendly**: Buttons min 44x44px
- **Responsive design**: Optimized for all screen sizes

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
1. **Resource Library** (curated learning content)
2. **Project Showcase** (member portfolios)
3. **Blog** (insights and member stories)
4. **Mentorship Portal** (dedicated mentorship matching)
5. **Job Board** (internships and entry-level roles)

### IA Flexibility
- **Modular structure**: Easy to add new sections
- **Consistent patterns**: Reusable templates
- **Clear hierarchy**: Room for growth without complexity
