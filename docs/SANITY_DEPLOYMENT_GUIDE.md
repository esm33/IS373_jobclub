# Sanity CMS Deployment & Configuration Guide

**Status:** ✅ PRODUCTION READY - Sanity project configured with Event & Member Profile schemas

---

## 📊 Current Setup

| Component | Status | Details |
|-----------|--------|---------|
| Sanity Project | ✅ Active | ID: 2nqkaqwe, Dataset: production |
| Member Schema | ✅ Ready | `memberProfile.js` - stores onboarding submissions |
| Event Schema | ✅ Ready | `event.js` - stores event listings (8945 bytes) |
| Write Token | ✅ Configured | In `.env.local` - has Editor permissions |
| Sanity Studio | ✅ Ready | Local dev at `http://localhost:3333` |

---

## 🚀 Quick Start: Deploy Events to Production

### Step 1: Populate Sample Events (5 minutes)

```bash
# This creates 5 sample events in your Sanity CMS
npm run populate:events
```

**What this does:**
- Reads from `scripts/populate-events.js`
- Creates 5 sample events with full data:
  1. React Fundamentals Workshop
  2. AI Career Paths Office Hours
  3. Tech Industry Networking Night
  4. Portfolio Building Masterclass
  5. Hack Night: Build Your Portfolio
- Each event includes: date, location, speakers, tags, capacity, registration links

**Example Output:**
```
🚀 Starting to populate Sanity with sample events...

✅ Created: React Fundamentals Workshop
   ID: aB1cD2eF3gH4iJ5kL6mN7oP8
   URL: /events/react-fundamentals-workshop/

✅ Created: AI Career Paths Office Hours
   ID: qR9sTuV8wXyZ1aB2cD3eF4gH
   URL: /events/ai-career-paths-office-hours/

...

🎉 Finished populating events!
```

### Step 2: Rebuild Site with Real Data (2 minutes)

```bash
npm run build
```

This rebuilds the site and fetches real event data from Sanity:
- `src/_data/events.js` queries Sanity for all published events
- Events are embedded into the build
- Events page now shows real data instead of fallback sample data

### Step 3: Test Events Page (2 minutes)

```bash
npm run dev
# Visit: http://localhost:8080/events/
```

**What you should see:**
- ✅ 5 real events from Sanity displayed
- ✅ Filter buttons working (click to filter by event type)
- ✅ Event details showing (date, location, capacity, speakers)
- ✅ Registration links working
- ✅ Add to Calendar button functional

### Step 4: Verify Sanity Studio (Optional, 2 minutes)

View events in the Sanity Studio visual editor:

```bash
npm run sanity:studio
# Visit: http://localhost:3333
```

You should see:
- Left sidebar with "Content" menu
- "Events" section showing 5 created events
- Ability to edit, delete, or create new events
- Real-time changes reflected when you rebuild

---

## 🔧 How to Add More Events

### Method 1: Use Sanity Studio (Recommended for Team)

1. Start the Sanity Studio:
   ```bash
   npm run sanity:studio
   # Visit: http://localhost:3333
   ```

2. Click on "Events" in the left sidebar

3. Click "Create new"

4. Fill in the event details:
   - Title (required)
   - Slug (auto-generated from title)
   - Event Type (dropdown: workshop, office-hours, meetup, guest-speaker, hack-night, town-hall)
   - Date & End Date
   - Location (virtual or in-person)
   - Description & Full Description
   - Speakers (array - add multiple speakers)
   - Tags, Target Audience, Capacity, Registration Link
   - Status: **MUST set to "published"** for event to appear on site

5. Click "Publish"

6. Rebuild site:
   ```bash
   npm run build
   ```

### Method 2: Add to populate-events.js Script

1. Edit `scripts/populate-events.js`

2. Add new event object to `sampleEvents` array:
   ```javascript
   {
     _type: 'event',
     title: 'Your Event Title',
     slug: { _type: 'slug', current: 'your-event-slug' },
     description: 'Short description...',
     fullDescription: 'Long description...',
     eventType: 'workshop', // or other type
     date: '2026-03-15T18:00:00Z',
     endDate: '2026-03-15T20:00:00Z',
     location: {
       isVirtual: false,
       venue: 'NJIT Campus',
       room: 'GITC 3700',
       address: 'Newark, NJ'
     },
     capacity: 30,
     registrationRequired: true,
     registrationLink: 'https://forms.gle/yourform',
     speakers: [{ name: 'Speaker Name', title: '...', company: '...' }],
     tags: ['tag1', 'tag2'],
     status: 'published',
     publishedAt: new Date().toISOString()
   }
   ```

3. Run script:
   ```bash
   npm run populate:events
   ```

---

## 📱 Architecture: How Events Flow

```
Sanity CMS (Cloud)
    ↓ (Query via @sanity/client)
src/_data/events.js
    ↓ (During build)
Eleventy Build Process
    ↓ (Creates pages)
src/events.njk (Listing page with filter)
src/event-detail-dynamic.njk (Individual event pages)
    ↓
Built Site (_site/events/)
    ↓ (User visits)
http://localhost:8080/events/
```

### Key Files:

- **sanity/schemas/event.js** - Event data model (8945 bytes)
- **src/_data/events.js** - Fetches events from Sanity during build (156 lines)
- **src/events.njk** - Events listing page with Material Design (238 lines)
- **src/event-detail-dynamic.njk** - Dynamic event detail pages
- **src/js/events.js** - Client-side filtering and interactions
- **scripts/populate-events.js** - Utility to create sample events (249 lines)

---

## 🔐 Environment Variables

Required in `.env.local`:

```bash
SANITY_PROJECT_ID=2nqkaqwe
SANITY_DATASET=production
SANITY_WRITE_TOKEN=skOii1Xu...  # Your write token (starts with 'sk')
```

### Getting Credentials:

1. Go to https://manage.sanity.io
2. Select "job-club-njit" project
3. Click "Settings" → "API"
4. Copy **Project ID** and **Dataset** name
5. Create/copy **Write Token** with "Editor" permissions

---

## 🌐 Publishing to Production

When ready to go live:

### Option 1: Vercel (Recommended - Free)

```bash
# 1. Connect GitHub repo to Vercel
# 2. Vercel auto-detects Eleventy
# 3. Set environment variables in Vercel dashboard:
#    SANITY_PROJECT_ID=2nqkaqwe
#    SANITY_DATASET=production
#    SANITY_WRITE_TOKEN=your_token

# 4. Commit changes to main branch
git add .
git commit -m "Add sample events and deployment config"
git push

# Vercel auto-builds and deploys on push
```

### Option 2: Netlify (Also Free)

```bash
# 1. Connect GitHub repo to Netlify
# 2. Build command: npm run build
# 3. Publish directory: _site
# 4. Set environment variables (Settings → Environment)
# 5. Deploy

# Push to trigger rebuild:
git push
```

### Option 3: GitHub Pages

```bash
# Already configured with GitHub Actions
# Just push to main branch

git push

# GitHub Actions workflow (.github/workflows/deploy.yml) 
# automatically builds and deploys to GitHub Pages
```

---

## ✅ Testing Checklist

Before declaring "ready for team":

- [ ] Sanity project accessible at https://manage.sanity.io
- [ ] 5+ sample events created in Sanity
- [ ] Event status set to "published"
- [ ] Local site shows real events: `npm run dev` → `/events/`
- [ ] Filtering works (click event type filters)
- [ ] Individual event pages work (click "Learn More")
- [ ] Add to Calendar button works
- [ ] Share button works
- [ ] Sanity Studio accessible: `npm run sanity:studio`
- [ ] Team members can access Sanity Studio
- [ ] New events can be created in Studio
- [ ] Site rebuilds with new events

---

## 📚 Next Steps

1. **Populate more events** using Sanity Studio or script
2. **Invite team members** to Sanity project (sanity.io/manage → Settings → Members)
3. **Set up automation** for email & Discord (see AUTOMATION_SETUP.md)
4. **Configure analytics** (optional - see analytics setup)
5. **Deploy to production** using Vercel/Netlify/GitHub Pages

---

## 🆘 Troubleshooting

### Events not showing on site

1. Check Sanity connection:
   ```bash
   # Verify credentials in .env.local
   cat .env.local | grep SANITY
   ```

2. Check event status:
   - Events must have status = "published"
   - Draft events won't appear

3. Rebuild site:
   ```bash
   npm run build
   ```

4. Check Sanity query:
   - Open `src/_data/events.js`
   - Verify `status == "published"` filter is there

### Populate script fails

1. Check token:
   ```bash
   echo $SANITY_WRITE_TOKEN
   # Should start with 'sk'
   ```

2. Check permissions:
   - Token must have "Editor" role (read + write)
   - Go to sanity.io/manage → Settings → Tokens

3. Check credentials:
   ```bash
   node -e "console.log(process.env.SANITY_PROJECT_ID)"
   # Should output: 2nqkaqwe
   ```

### Sanity Studio won't connect

1. Check project ID in `sanity/sanity.config.js` matches `.env.local`
2. Check dataset name (should be "production")
3. Try clearing cache:
   ```bash
   cd sanity && npm run clean && npm install
   ```

---

**Last Updated:** December 13, 2025  
**Status:** Production Ready ✅  
**Team:** Ready to populate events and test system
