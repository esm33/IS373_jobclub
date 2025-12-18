# Events Page Setup Guide

## Overview

The Events page displays all upcoming Job Club events with filtering by event type. Events are stored in Sanity CMS and displayed with a modern Material Design interface.

## Features

- 📅 Dynamic event listing from Sanity CMS
- 🔍 Filter by event type (Workshops, Office Hours, Meetups, Guest Speakers, Hack Nights)
- 🎨 Material Design UI with smooth animations
- 📱 Fully responsive design
- 🌐 Support for both virtual and in-person events
- 👥 Speaker information display
- 📝 Registration links integration

## Event Types

1. **Workshops** 🛠️ - Hands-on technical training sessions
2. **Office Hours** 🕐 - Drop-in career advice and resume reviews
3. **Meetups** 🤝 - Networking events with local tech community
4. **Guest Speakers** 🎤 - Industry panels and talks
5. **Hack Nights** 💻 - Collaborative coding sessions
6. **Town Halls** 🏛️ - Community-wide announcements and updates

## File Structure

```
src/
  events.njk           # Events page template
  js/
    events.js          # Events logic and Sanity integration

sanity/
  schemas/
    event.js           # Event schema definition
```

## Sanity Schema

The event schema includes:

- **Basic Info**: title, slug, description, full description
- **Event Type**: workshop, office-hours, meetup, guest-speaker, hack-night, town-hall
- **Date/Time**: start date, end date (optional)
- **Location**: venue, room, address, virtual link
- **Registration**: required flag, registration link, capacity
- **Speakers**: array of speaker objects (name, title, company, bio, photo)
- **Status**: draft, published, cancelled, completed
- **Media**: featured image URL
- **Metadata**: tags, featured flag

## Usage

### Adding Events in Sanity

1. Open Sanity Studio
2. Navigate to "Events"
3. Click "Create new Event"
4. Fill in required fields:
   - Title
   - Event Type
   - Date
   - Location details
   - Description
5. Add speakers (optional)
6. Set registration details
7. Publish

### Display Logic

The events page:

- Shows only **published** events
- Filters events with `date >= now()` (upcoming events only)
- Orders by date ascending (soonest first)
- Displays 5 mock events in demo mode (before Sanity connection)

## Connecting to Sanity

### Step 1: Get Sanity Project ID

```bash
cd sanity
npm run dev
# Note the project ID from the URL: https://[PROJECT_ID].sanity.studio
```

### Step 2: Update events.js

Replace `YOUR_SANITY_PROJECT_ID` in `/src/js/events.js`:

```javascript
getApiEndpoint() {
  const projectId = 'abc123xyz'; // Your actual project ID
  const dataset = 'production';
  return `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`;
}
```

### Step 3: Rebuild and Test

```bash
npm run dev
# Visit http://localhost:8080/events/
```

## Mock Data

In demo mode (before Sanity connection), the page displays 5 sample events:

1. React Fundamentals Workshop
2. Career Q&A Office Hours
3. AI in Healthcare Industry Panel
4. January Tech Meetup
5. Hack Night: Build Your Portfolio

## Event Card Features

Each event card displays:

- ✅ Event type badge with emoji
- ✅ Registration status indicator
- ✅ Event title and description
- ✅ Date and time (formatted: "Friday, January 15, 2026 at 6:00 PM")
- ✅ Location (with venue/room or "Virtual Event")
- ✅ Capacity (if set)
- ✅ Featured speaker (if applicable)
- ✅ CTA button (Register Now or Learn More)

## Filtering

Users can filter events by:

- All Events (default)
- Workshops
- Office Hours
- Meetups
- Guest Speakers
- Hack Nights

Filters update instantly with smooth animations.

## Styling

The events page uses:

- **Material Design** elevation and shadows
- **Google Sans** typography
- **Primary color** (#0072FF) for accents
- **Gradient backgrounds** for hero section
- **Smooth animations** (fade-in, hover effects)
- **Responsive grid** (1 column mobile, 3 columns desktop)

## API Integration

### Sanity Query

```javascript
*[_type == "event" && status == "published" && date >= now()] | order(date asc) {
  _id,
  title,
  slug,
  eventType,
  description,
  fullDescription,
  date,
  endDate,
  location,
  capacity,
  registrationRequired,
  registrationLink,
  speakers,
  tags,
  featured,
  imageUrl
}
```

### Data Flow

1. Page loads → Show loading spinner
2. Fetch events from Sanity API
3. If API fails → Fallback to mock data
4. Hide loading → Render events
5. User clicks filter → Re-render with filtered data

## Future Enhancements

- [ ] Calendar integration (Google Calendar, iCal)
- [ ] Event search functionality
- [ ] Past events archive page
- [ ] RSVP tracking system
- [ ] Email reminders for registered users
- [ ] Event check-in QR codes
- [ ] Live event updates
- [ ] Event feedback/ratings

## Troubleshooting

### Events not loading

1. Check Sanity project ID is correct
2. Verify events are **published** (not draft)
3. Check event dates are in the future
4. Open browser console for API errors

### Filters not working

1. Check JavaScript is loaded: `/js/events.js`
2. Verify `eventType` field matches schema values
3. Clear browser cache

### Styling issues

1. Verify Tailwind CSS is built: `npm run build:css`
2. Check Material Design variables in `/src/css/`
3. Hard refresh browser (Cmd+Shift+R)

## Support

For issues or questions:

- Email: kwilliams@njit.edu
- Check Sanity logs: `cd sanity && npm run dev`
- Review browser console for JavaScript errors
